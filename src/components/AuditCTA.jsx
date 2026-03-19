import { useState, useEffect, useCallback } from 'react'

export default function AuditCTA() {
    const [open, setOpen] = useState(false)
    const [form, setForm] = useState({ brand: '', domain: '', branche: '', email: '' })
    const [gdpr, setGdpr] = useState(false)
    const [status, setStatus] = useState('idle') // idle | sending | sent | error
    const [message, setMessage] = useState('')

    const openModal = useCallback(() => {
        setOpen(true)
        document.body.style.overflow = 'hidden'
        if (window.plausible) window.plausible('Audit Modal Opened')
    }, [])

    const closeModal = useCallback(() => {
        setOpen(false)
        document.body.style.overflow = ''
        setForm({ brand: '', domain: '', branche: '', email: '' })
        setGdpr(false)
        setStatus('idle')
        setMessage('')
    }, [])

    // Expose global openAuditModal so other buttons can trigger it
    useEffect(() => {
        window.openAuditModal = openModal
        return () => { delete window.openAuditModal }
    }, [openModal])

    // Listen for data-open-audit clicks
    useEffect(() => {
        const handler = (e) => {
            const trigger = e.target.closest('[data-open-audit]')
            if (trigger) {
                e.preventDefault()
                e.stopImmediatePropagation()
                openModal()
            }
        }
        document.addEventListener('click', handler, { capture: true })
        return () => document.removeEventListener('click', handler, { capture: true })
    }, [openModal])

    // ESC to close
    useEffect(() => {
        const handler = (e) => { if (e.key === 'Escape') closeModal() }
        document.addEventListener('keydown', handler)
        return () => document.removeEventListener('keydown', handler)
    }, [closeModal])

    // Auto-focus first input when modal opens
    useEffect(() => {
        if (open) {
            const timer = setTimeout(() => {
                const el = document.getElementById('auditBrand')
                if (el) el.focus()
            }, 150)
            return () => clearTimeout(timer)
        }
    }, [open])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!form.brand || !form.email) {
            setMessage('Bitte fülle mindestens Brand und E-Mail aus.')
            setStatus('error')
            return
        }
        if (!gdpr) {
            setMessage('Bitte akzeptiere die Datenschutzerklärung.')
            setStatus('error')
            return
        }

        setStatus('sending')
        setMessage('')

        try {
            const res = await fetch('/api/audit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            })
            const result = await res.json()

            if (res.ok) {
                setStatus('sent')
                setMessage(result.message || 'Vielen Dank! Wir melden uns in Kürze.')
                setForm({ brand: '', domain: '', branche: '', email: '' })
                setGdpr(false)

                if (window.plausible) {
                    window.plausible('Audit CTA Submitted', {
                        props: { brand: form.brand, branche: form.branche || '–' },
                    })
                }

                setTimeout(closeModal, 4000)
            } else {
                setStatus('error')
                setMessage(result.error || 'Etwas ist schiefgelaufen.')
            }
        } catch {
            setStatus('error')
            setMessage('Netzwerkfehler — bitte versuche es erneut.')
        }
    }

    return (
        <>
            {/* ── Floating Button ── */}
            <button
                id="auditFloatingBtn"
                className="audit-floating-btn"
                onClick={openModal}
                aria-label="Gratis GEO Audit anfordern"
            >
                <span className="audit-floating-icon">✦</span>
                Gratis GEO Audit
            </button>

            {/* ── Overlay ── */}
            <div
                className={`audit-modal-overlay ${open ? 'active' : ''}`}
                onClick={closeModal}
            />

            {/* ── Modal ── */}
            <div className={`audit-modal ${open ? 'active' : ''}`} role="dialog" aria-modal="true">
                <div className="audit-modal-inner">
                    {/* Close */}
                    <button className="audit-modal-close" onClick={closeModal} aria-label="Schließen">✕</button>

                    {/* Header */}
                    <div className="audit-modal-header">
                        <div className="audit-modal-badge">✦ Kostenlos &amp; unverbindlich</div>
                        <h2>Starte jetzt kostenlos — dein AI Visibility Audit</h2>
                        <p>Marke eingeben, Ergebnis per Mail. Kein Abo, kein Vertrag, kein Risiko. Inkl. AI-Readiness Score und Quick Wins.</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} noValidate>
                        <div className="audit-form-grid">
                            <div className="audit-form-group">
                                <label htmlFor="auditBrand">Brand / Firmenname <span className="required">*</span></label>
                                <input
                                    id="auditBrand"
                                    type="text"
                                    required
                                    placeholder="z.B. famefact"
                                    value={form.brand}
                                    onChange={(e) => setForm({ ...form, brand: e.target.value })}
                                />
                            </div>
                            <div className="audit-form-group">
                                <label htmlFor="auditDomain">Domain</label>
                                <input
                                    id="auditDomain"
                                    type="text"
                                    placeholder="z.B. famefact.com"
                                    value={form.domain}
                                    onChange={(e) => setForm({ ...form, domain: e.target.value })}
                                />
                            </div>
                            <div className="audit-form-group">
                                <label htmlFor="auditBranche">Branche</label>
                                <input
                                    id="auditBranche"
                                    type="text"
                                    placeholder="z.B. Marketing"
                                    value={form.branche}
                                    onChange={(e) => setForm({ ...form, branche: e.target.value })}
                                />
                            </div>
                            <div className="audit-form-group">
                                <label htmlFor="auditEmail">E-Mail <span className="required">*</span></label>
                                <input
                                    id="auditEmail"
                                    type="email"
                                    required
                                    placeholder="ihre@email.de"
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* GDPR */}
                        <div className="audit-gdpr">
                            <input
                                type="checkbox"
                                id="auditGdpr"
                                checked={gdpr}
                                onChange={(e) => setGdpr(e.target.checked)}
                            />
                            <label htmlFor="auditGdpr" className="audit-gdpr-text">
                                Ich stimme der Verarbeitung meiner Daten gemäß der{' '}
                                <a href="/datenschutz" target="_blank" rel="noopener noreferrer">Datenschutzerklärung</a>{' '}
                                zu. Meine Daten werden ausschließlich zur Erstellung des Audits verwendet.
                            </label>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            className="audit-submit-btn"
                            disabled={status === 'sending'}
                        >
                            {status === 'sending' ? (
                                <>
                                    <span className="audit-btn-text">Wird gesendet…</span>
                                    <span className="audit-spinner" />
                                </>
                            ) : (
                                <>
                                    <span className="audit-btn-text">Sichtbarkeit checken</span>
                                    <span className="audit-btn-icon">→</span>
                                </>
                            )}
                        </button>

                        {/* Message */}
                        {message && (
                            <div className={`audit-message ${status === 'sent' ? 'success' : 'error'}`}>
                                {message}
                            </div>
                        )}
                    </form>

                    {/* Trust Row */}
                    <div className="audit-trust-row">
                        <div className="audit-trust-item">
                            <svg viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>
                            DSGVO-konform
                        </div>
                        <div className="audit-trust-item">
                            <svg viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1v2z"/></svg>
                            SSL-verschlüsselt
                        </div>
                        <div className="audit-trust-item">
                            <svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/></svg>
                            Ergebnis in 24h
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
