/**
 * Vercel Serverless Function for Free AI Visibility Audit
 * 1. INSERTs into PostgreSQL audit_requests (audit-kit picks up pending rows)
 * 2. Sends Slack notification for instant team awareness
 *
 * The actual audit report email is sent by the audit-kit runner on the server.
 */

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { brand, domain, branche, email } = req.body;

    // Validate required fields
    if (!brand || !email) {
      return res.status(400).json({ error: 'Brand und E-Mail sind erforderlich.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Ungültige E-Mail-Adresse.' });
    }

    const timestamp = new Date().toLocaleString('de-DE', { timeZone: 'Europe/Berlin' });

    // ─── 1. INSERT into audit_requests (audit-kit queue) ───────────
    const dbUrl = process.env.DATABASE_URL;
    if (dbUrl) {
      try {
        const { Pool } = await import('pg');
        const pool = new Pool({
          connectionString: dbUrl,
          ssl: { rejectUnauthorized: false },
        });

        await pool.query(
          `INSERT INTO audit_requests (brand, domain, email, industry, status)
           VALUES ($1, $2, $3, $4, 'pending')`,
          [brand, domain || null, email, branche || null]
        );

        await pool.end();
        console.log(`Audit queued: ${brand} (${email})`);
      } catch (dbErr) {
        console.error('DB insert failed:', dbErr.message);
        // Non-blocking — still send Slack
      }
    } else {
      console.warn('DATABASE_URL not configured — audit not queued');
    }

    // ─── 2. Send Slack notification ────────────────────────────────
    const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;
    if (slackWebhookUrl) {
      const slackPayload = {
        blocks: [
          {
            type: 'header',
            text: { type: 'plain_text', text: '🎯 Neuer AI Visibility Audit Lead', emoji: true },
          },
          {
            type: 'section',
            fields: [
              { type: 'mrkdwn', text: `*Brand / Firma:*\n${brand}` },
              { type: 'mrkdwn', text: `*E-Mail:*\n${email}` },
            ],
          },
          {
            type: 'section',
            fields: [
              { type: 'mrkdwn', text: `*Domain:*\n${domain || '–'}` },
              { type: 'mrkdwn', text: `*Branche:*\n${branche || '–'}` },
            ],
          },
          {
            type: 'context',
            elements: [
              { type: 'mrkdwn', text: `📅 ${timestamp} | 📍 gpt-seo-agentur.de | ✅ Audit queued` },
            ],
          },
          { type: 'divider' },
          {
            type: 'actions',
            elements: [
              {
                type: 'button',
                text: { type: 'plain_text', text: '📧 Antworten', emoji: true },
                url: `mailto:${email}`,
                style: 'primary',
              },
            ],
          },
        ],
      };

      try {
        await fetch(slackWebhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(slackPayload),
        });
      } catch (slackErr) {
        console.error('Slack failed:', slackErr.message);
      }
    }

    console.log(`Audit lead: ${email} — Brand: ${brand}`);

    return res.status(200).json({
      success: true,
      message: 'Vielen Dank! Dein AI Visibility Audit wird bearbeitet — du erhältst das Ergebnis innerhalb der nächsten 24h per Mail.',
    });
  } catch (error) {
    console.error('Error processing audit form:', error);
    return res.status(500).json({
      error: 'Ein Fehler ist aufgetreten. Bitte versuche es erneut.',
    });
  }
}
