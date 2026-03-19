export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { brand, domain, branche, email } = req.body

  if (!brand || !email) {
    return res.status(400).json({ error: 'Brand und E-Mail sind erforderlich.' })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Ungültige E-Mail-Adresse.' })
  }

  const timestamp = new Date().toLocaleString('de-DE', { timeZone: 'Europe/Berlin' })

  // 1. INSERT into audit_requests
  const dbUrl = process.env.DATABASE_URL
  if (dbUrl) {
    try {
      const pg = await import('pg')
      const pool = new pg.default.Pool({ connectionString: dbUrl, ssl: { rejectUnauthorized: false } })
      await pool.query(
        `INSERT INTO audit_requests (brand, domain, email, industry, status, source)
         VALUES ($1, $2, $3, $4, 'pending', $5)`,
        [brand, domain || null, email, branche || null, 'gpt-seo-agentur.de']
      )
      await pool.end()
    } catch (dbErr) {
      console.error('DB insert failed:', dbErr.message)
    }
  }

  // 2. Slack notification
  const slackToken = process.env.SLACK_BOT_TOKEN
  const slackChannel = process.env.SLACK_CHANNEL_ID
  if (slackToken && slackChannel) {
    try {
      await fetch('https://slack.com/api/chat.postMessage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${slackToken}` },
        body: JSON.stringify({
          channel: slackChannel,
          blocks: [
            { type: 'header', text: { type: 'plain_text', text: '🎯 Neuer AI Visibility Audit Lead', emoji: true } },
            { type: 'section', fields: [
              { type: 'mrkdwn', text: `*Brand:*\n${brand}` },
              { type: 'mrkdwn', text: `*E-Mail:*\n${email}` },
            ]},
            { type: 'section', fields: [
              { type: 'mrkdwn', text: `*Domain:*\n${domain || '–'}` },
              { type: 'mrkdwn', text: `*Branche:*\n${branche || '–'}` },
            ]},
            { type: 'context', elements: [
              { type: 'mrkdwn', text: `📅 ${timestamp} | 🌐 gpt-seo-agentur.de | ✅ Audit queued` },
            ]},
          ],
          text: `Neuer Audit Lead: ${brand} (${email}) via gpt-seo-agentur.de`,
        }),
      })
    } catch (e) { console.error('Slack failed:', e.message) }
  }

  return res.status(200).json({
    success: true,
    message: 'Vielen Dank! Dein AI Visibility Audit wird bearbeitet — du erhältst das Ergebnis innerhalb der nächsten 24h per Mail.',
  })
}
