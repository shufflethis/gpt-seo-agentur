import { useState, useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet-async'

/* ————— Intersection Observer Hook ————— */
function useInView(options = {}) {
    const ref = useRef(null)
    const [visible, setVisible] = useState(false)
    useEffect(() => {
        const el = ref.current
        if (!el) return
        const obs = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) { setVisible(true); obs.unobserve(el) }
        }, { threshold: 0.15, ...options })
        obs.observe(el)
        return () => obs.disconnect()
    }, [])
    return [ref, visible]
}

function FadeIn({ children, className = '', delay = 0 }) {
    const [ref, visible] = useInView()
    return (
        <div ref={ref} className={`fade-in ${visible ? 'visible' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
            {children}
        </div>
    )
}

/* ————— FAQ Item ————— */
function FaqItem({ question, answer }) {
    const [open, setOpen] = useState(false)
    return (
        <div className={`faq-item ${open ? 'faq-item--open' : ''}`}>
            <button className="faq-item__question" onClick={() => setOpen(!open)} aria-expanded={open}>
                <span>{question}</span>
                <span className="faq-item__icon">+</span>
            </button>
            <div className="faq-item__answer" role="region">
                <p>{answer}</p>
            </div>
        </div>
    )
}

/* ————— Contact Form ————— */
function ContactForm() {
    const [form, setForm] = useState({ name: '', email: '', company: '', message: '' })
    const [status, setStatus] = useState('idle') // idle | sending | sent | error

    const handleSubmit = async (e) => {
        e.preventDefault()
        setStatus('sending')
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            })
            if (res.ok) {
                setStatus('sent')
                setForm({ name: '', email: '', company: '', message: '' })
            } else {
                setStatus('error')
            }
        } catch {
            setStatus('error')
        }
    }

    if (status === 'sent') {
        return (
            <div className="form-success">
                ✓ Vielen Dank! Ihre Anfrage wurde erfolgreich gesendet. Wir melden uns innerhalb von 24 Stunden bei Ihnen.
            </div>
        )
    }

    return (
        <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="contact-name">Name *</label>
                <input id="contact-name" type="text" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Ihr vollständiger Name" />
            </div>
            <div className="form-group">
                <label htmlFor="contact-email">E-Mail *</label>
                <input id="contact-email" type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="ihre@email.de" />
            </div>
            <div className="form-group">
                <label htmlFor="contact-company">Unternehmen</label>
                <input id="contact-company" type="text" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} placeholder="Firmenname" />
            </div>
            <div className="form-group">
                <label htmlFor="contact-message">Nachricht *</label>
                <textarea id="contact-message" required value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Wie können wir Ihnen helfen?" rows={5} />
            </div>
            <button type="submit" className="btn btn--primary form-submit" disabled={status === 'sending'}>
                {status === 'sending' ? 'Wird gesendet…' : 'Kostenlose Beratung anfordern →'}
            </button>
            {status === 'error' && (
                <p style={{ color: 'var(--color-light-orange)', marginTop: '0.5rem', fontSize: '0.9rem' }}>
                    Ein Fehler ist aufgetreten. Bitte senden Sie Ihre Anfrage an <a href="mailto:hi@gpt-seo-agentur.de">hi@gpt-seo-agentur.de</a>.
                </p>
            )}
        </form>
    )
}

/* ————— MAIN LANDING PAGE ————— */
export default function LandingPage() {
    return (
        <>
            <Helmet>
                <title>ChatGPT SEO Agentur: KI, GPT & Geo Optimierung für Sichtbarkeit</title>
                <meta name="description" content="ChatGPT SEO Agentur: KI & GPT Optimierung für mehr Sichtbarkeit. Wir optimieren Ihre Webseite für Chat GPT, Perplexity & Co. Steigern Sie Ihre Sichtbarkeit!" />
            </Helmet>

            {/* ═══════════════════════════════════════
          HERO
      ═══════════════════════════════════════ */}
            <section className="hero" id="hero">
                <div className="hero__bg" aria-hidden="true" />
                <div className="container">
                    <div className="hero__content">
                        <div className="hero__badge">🚀 ChatGPT SEO & GEO Optimierung für Deutschland</div>
                        <h1>
                            <span className="gradient-text">ChatGPT SEO Agentur</span><br />
                            Mehr Sichtbarkeit in KI-Suchsystemen
                        </h1>
                        <p className="hero__subtitle">
                            Wir sind Ihre spezialisierte ChatGPT SEO Agentur für <strong>Generative Engine Optimization (GEO)</strong> und
                            KI-Suchmaschinenoptimierung. Wir optimieren Ihre Webseite spezifisch für Chat GPT, Perplexity und
                            weitere KI-Systemen – damit Ihr Unternehmen bei ChatGPT als vertrauenswürdige Quelle zitiert wird
                            und Sie mehr Sichtbarkeit und Reichweite in den Antworten der KI erzielen.
                        </p>
                        <div className="hero__actions">
                            <a href="#" className="btn btn--primary" data-open-audit>Kostenlose Analyse per E-Mail →</a>
                            <a href="#was-ist-geo" className="btn btn--secondary">Was ist GPT SEO?</a>
                        </div>
                        <div className="hero__trust">
                            <span>Vertraut von:</span>
                            <div className="trust-badges">
                                <span className="trust-badge">famefact</span>
                                <span className="trust-badge">Berlin</span>
                                <span className="trust-badge">Seit 2010</span>
                                <span className="trust-badge">100+ Kunden</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════
          PROBLEM / PAIN SECTION
      ═══════════════════════════════════════ */}
            <section className="section section--alt" id="problem">
                <div className="container">
                    <FadeIn>
                        <div className="text-center">
                            <span className="section-label">Das Problem</span>
                            <h2 className="headline-lg">KI verändert die Suche grundlegend – sind Sie vorbereitet?</h2>
                            <p className="body-lg" style={{ maxWidth: 700, margin: '0 auto' }}>
                                Die Art, wie Menschen nach Informationen suchen, hat sich grundlegend verändert. Millionen von Nutzern
                                stellen ihre Suchanfragen nicht mehr bei klassischen Suchmaschinen, sondern direkt bei ChatGPT oder Perplexity.
                                KI-Modelle generieren Antworten von ChatGPT und anderen Large Language Models – ohne dass Nutzer auf eine Website klicken müssen.
                                Unternehmen, die jetzt nicht in ChatGPT SEO und SEO Optimierung für KI-Systemen investieren, werden unsichtbar.
                                Traditionelle SEO allein reicht nicht mehr aus: Wer bei Chat GPT und anderen Suchsystemen sichtbar sein will,
                                braucht eine spezifische Optimierung für ChatGPT und KI-gestützte Suchanfragen.
                            </p>
                        </div>
                    </FadeIn>

                    <div className="pain__grid">
                        <FadeIn delay={100}>
                            <div className="glass-card pain-card">
                                <div className="pain-card__icon">📉</div>
                                <div className="pain-card__stat">40%+</div>
                                <div className="pain-card__text">
                                    der Google-Suchen enden bereits ohne einen einzigen Klick auf eine Website. AI Overviews liefern die Antwort direkt.
                                </div>
                            </div>
                        </FadeIn>
                        <FadeIn delay={200}>
                            <div className="glass-card pain-card">
                                <div className="pain-card__icon">🤖</div>
                                <div className="pain-card__stat">200 Mio.</div>
                                <div className="pain-card__text">
                                    wöchentlich aktive Nutzer hat ChatGPT weltweit. Immer mehr davon nutzen es als primäre Suchmaschine.
                                </div>
                            </div>
                        </FadeIn>
                        <FadeIn delay={300}>
                            <div className="glass-card pain-card">
                                <div className="pain-card__icon">⚠️</div>
                                <div className="pain-card__stat">80%</div>
                                <div className="pain-card__text">
                                    der deutschen Unternehmen haben noch keine GEO-Strategie und riskieren den Verlust ihrer digitalen Sichtbarkeit.
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════
          WAS IST GEO?
      ═══════════════════════════════════════ */}
            <section className="section" id="was-ist-geo">
                <div className="container">
                    <FadeIn>
                        <span className="section-label">Grundlagen</span>
                        <h2 className="headline-lg">Was ist ChatGPT SEO – Optimierung für KI-Suchmaschinen</h2>
                    </FadeIn>

                    <div className="geo-explain__grid">
                        <FadeIn className="geo-explain__content slide-in-left">
                            <p>
                                <strong>ChatGPT SEO</strong> – auch bekannt als <strong>GEO (Generative Engine Optimization)</strong> oder
                                <strong> LLMO (Large Language Model Optimization)</strong> – ist die nächste Evolution der Suchmaschinenoptimierung.
                                Während klassisches SEO darauf abzielt, in den Suchergebnissen der Suchmaschinen möglichst weit oben zu erscheinen,
                                geht ChatGPT SEO einen entscheidenden Schritt weiter: Es optimiert Ihre digitale Präsenz so, dass
                                KI-gestützte Suchsysteme Ihr Unternehmen als vertrauenswürdige Quelle erkennen und in ki-generierten Antworten zitieren.
                            </p>
                            <p>
                                Das Prinzip ist einfach, aber die Umsetzung komplex: KI-Modelle wie Chat GPT, Perplexity
                                oder Google Gemini generieren ihre Antworten auf Basis von Trainingsdaten und Echtzeitrecherchen.
                                ChatGPT bevorzugt dabei Quellen mit hoher Autorität, Konsistenz und semantischer Eindeutigkeit. Nur
                                hochwertiger Content, der diese strengen Kriterien erfüllt, wird als Quelle zitiert – und damit Ihren
                                potenziellen Kunden als Empfehlung präsentiert. SEO-Strategien müssen daher gezielt auf die
                                Anforderungen von KI-Systemen und Large Language Models ausgerichtet werden.
                            </p>
                            <p>
                                Als <strong>ChatGPT SEO Agentur</strong> und <strong>GEO Agentur</strong> aus Berlin kombinieren wir
                                tiefes technisches Verständnis der LLM-Architektur mit bewährten Content-Strategien und strukturierter
                                Datenoptimierung. Wir analysieren, wie KI-Modelle Ihre Branche, Ihre Marke und Ihre Wettbewerber sehen –
                                und entwickeln eine maßgeschneiderte SEO-Strategie, die die Sichtbarkeit Ihrer Inhalte in
                                ChatGPT Search und anderen KI-Suchmaschinen systematisch aufbaut.
                            </p>
                            <p>
                                Der Unterschied zu traditioneller SEO: Bei der Optimierung für ChatGPT und Perplexity geht es nicht nur
                                um Keywords und Backlinks, sondern um technische Optimierung, Entity Authority und die spezifische
                                Aufbereitung von Content für KI-Systemen. Unsere SEO Berater analysieren, wie ChatGPT oder Perplexity
                                Ihr Unternehmen bei ChatGPT wahrnehmen, und entwickeln daraus konkrete Maßnahmen für mehr Reichweite
                                und Sichtbarkeit in den Antworten von ChatGPT.
                            </p>

                            <table className="comparison-table">
                                <thead>
                                    <tr>
                                        <th>Kriterium</th>
                                        <th>Klassisches SEO</th>
                                        <th>GPT SEO / GEO</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Ziel</td>
                                        <td>Top-Rankings in Suchergebnissen</td>
                                        <td>Zitierung in AI-Antworten</td>
                                    </tr>
                                    <tr>
                                        <td>Fokus</td>
                                        <td>Keywords & Backlinks</td>
                                        <td>Entity Authority & Semantik</td>
                                    </tr>
                                    <tr>
                                        <td>Plattformen</td>
                                        <td>Google, Bing</td>
                                        <td>ChatGPT, Perplexity, AI Overviews, Copilot</td>
                                    </tr>
                                    <tr>
                                        <td>Bewertungsfaktor</td>
                                        <td>PageRank-Algorithmus</td>
                                        <td>E-E-A-T, Citation Signals, Knowledge Graphs</td>
                                    </tr>
                                    <tr>
                                        <td>Ergebnis</td>
                                        <td>Klick auf Website</td>
                                        <td>Direkte Empfehlung durch KI</td>
                                    </tr>
                                </tbody>
                            </table>
                        </FadeIn>

                        <FadeIn className="slide-in-right">
                            <h3 className="headline-md" style={{ marginBottom: 'var(--space-md)' }}>Für diese KI-Plattformen optimieren wir</h3>
                            <div className="ai-platforms">
                                <div className="ai-platform">
                                    <span className="ai-platform__icon">💬</span>
                                    <div>
                                        <div className="ai-platform__name">ChatGPT</div>
                                        <small style={{ color: 'var(--color-white-40)' }}>OpenAI</small>
                                    </div>
                                </div>
                                <div className="ai-platform">
                                    <span className="ai-platform__icon">🔍</span>
                                    <div>
                                        <div className="ai-platform__name">Perplexity AI</div>
                                        <small style={{ color: 'var(--color-white-40)' }}>AI Search Engine</small>
                                    </div>
                                </div>
                                <div className="ai-platform">
                                    <span className="ai-platform__icon">✨</span>
                                    <div>
                                        <div className="ai-platform__name">Google AI Overviews</div>
                                        <small style={{ color: 'var(--color-white-40)' }}>SGE / Gemini</small>
                                    </div>
                                </div>
                                <div className="ai-platform">
                                    <span className="ai-platform__icon">🧠</span>
                                    <div>
                                        <div className="ai-platform__name">Bing Copilot</div>
                                        <small style={{ color: 'var(--color-white-40)' }}>Microsoft</small>
                                    </div>
                                </div>
                                <div className="ai-platform">
                                    <span className="ai-platform__icon">🎯</span>
                                    <div>
                                        <div className="ai-platform__name">Claude</div>
                                        <small style={{ color: 'var(--color-white-40)' }}>Anthropic</small>
                                    </div>
                                </div>
                                <div className="ai-platform">
                                    <span className="ai-platform__icon">🌐</span>
                                    <div>
                                        <div className="ai-platform__name">Meta AI</div>
                                        <small style={{ color: 'var(--color-white-40)' }}>Social Search</small>
                                    </div>
                                </div>
                            </div>

                            <div className="glass-card" style={{ marginTop: 'var(--space-md)', padding: 'var(--space-md)' }}>
                                <p style={{ color: 'var(--color-white-80)', fontSize: '0.95rem', fontStyle: 'italic', lineHeight: 1.7 }}>
                                    „<strong>Generative Engine Optimization</strong> ist nicht die Zukunft – es ist die Gegenwart.
                                    Unternehmen, die jetzt nicht handeln, werden in 12 Monaten nicht mehr in den relevantesten
                                    Informationsquellen ihrer Kunden erscheinen."
                                </p>
                                <p style={{ color: 'var(--color-positive-green)', fontSize: '0.85rem', marginTop: '0.5rem', marginBottom: 0 }}>
                                    — Tobias Sander, Geschäftsführer famefact
                                </p>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════
          LEISTUNGEN / SERVICES
      ═══════════════════════════════════════ */}
            <section className="section section--alt" id="leistungen">
                <div className="container">
                    <FadeIn>
                        <div className="text-center">
                            <span className="section-label">Unsere Leistungen</span>
                            <h2 className="headline-lg">ChatGPT SEO: Ganzheitliche KI-Optimierung für Ihre Marke</h2>
                            <p className="body-lg" style={{ maxWidth: 700, margin: '0 auto' }}>
                                Unsere ChatGPT SEO Agentur bietet ein umfassendes Leistungsspektrum –
                                von der technischen Optimierung und SEO für ChatGPT bis zum kontinuierlichen Sichtbarkeits-Monitoring
                                mit spezialisierten Tools. Wir optimieren Ihren Content gezielt für KI-Suchmaschinen.
                            </p>
                        </div>
                    </FadeIn>

                    <div className="services__grid">
                        <FadeIn delay={100}>
                            <article className="glass-card service-card">
                                <span className="service-card__number">01</span>
                                <div className="service-card__icon">🔬</div>
                                <h3>ChatGPT SEO Audit & Sichtbarkeitsanalyse</h3>
                                <p>
                                    Wir analysieren systematisch, wie Chat GPT, Perplexity und weitere KI-Suchsysteme Ihr Unternehmen
                                    bei ChatGPT und anderen Plattformen aktuell wahrnehmen. Dabei identifizieren wir Lücken in der
                                    Sichtbarkeit Ihrer Inhalte, falsche oder fehlende Informationen und ungenutzte Potenziale.
                                    Der Audit umfasst eine vollständige Entity-Analyse, Wettbewerbsvergleich und
                                    Handlungsempfehlungen mit priorisierten Maßnahmen für SEO für Chat GPT.
                                </p>
                            </article>
                        </FadeIn>

                        <FadeIn delay={200}>
                            <article className="glass-card service-card">
                                <span className="service-card__number">02</span>
                                <div className="service-card__icon">📝</div>
                                <h3>Content-Optimierung für ChatGPT & KI-Suchmaschinen</h3>
                                <p>
                                    Wir optimieren Ihre bestehenden Inhalte und erstellen spezifisch neuen Content, der von Large Language Models
                                    als hochwertige, zitierbare Quelle erkannt wird. Dazu gehören semantisch eindeutige
                                    Definitionen, faktenbasierte Aussagen mit Quellenangaben, strukturierte Informationsblöcke
                                    und die strategische Platzierung von E-E-A-T-Signalen (Experience, Expertise, Authoritativeness, Trustworthiness).
                                    So wird Ihre Webseite zur bevorzugten Quelle für Suchanfragen in KI-gestützten Suchmaschinen.
                                </p>
                            </article>
                        </FadeIn>

                        <FadeIn delay={300}>
                            <article className="glass-card service-card">
                                <span className="service-card__number">03</span>
                                <div className="service-card__icon">🏗️</div>
                                <h3>Strukturierte Daten & Schema Markup</h3>
                                <p>
                                    Strukturierte Daten sind das Rückgrat der GPT SEO Optimierung. Wir implementieren
                                    umfassende JSON-LD Schema Markups – von Organization und FAQPage über ProfessionalService
                                    bis hin zu speziellen Branchenschemata. Diese maschinenlesbaren Daten helfen KI-Modellen,
                                    Ihr Unternehmen korrekt zu verstehen, einzuordnen und in relevanten Kontexten zu zitieren.
                                </p>
                            </article>
                        </FadeIn>

                        <FadeIn delay={400}>
                            <article className="glass-card service-card">
                                <span className="service-card__number">04</span>
                                <div className="service-card__icon">🏛️</div>
                                <h3>Entity Building & Knowledge Graph</h3>
                                <p>
                                    Wir bauen Ihre digitale Entität systematisch auf – über Wikipedia-Einträge, Wikidata-Objekte,
                                    Google Knowledge Panel Optimierung und konsistente NAP-Daten (Name, Address, Phone) über
                                    alle relevanten Plattformen hinweg. Je stärker Ihre Entity im Knowledge Graph verankert ist,
                                    desto häufiger und selbstbewusster werden KI-Systeme Ihr Unternehmen in ihren Antworten nennen.
                                </p>
                            </article>
                        </FadeIn>

                        <FadeIn delay={500}>
                            <article className="glass-card service-card">
                                <span className="service-card__number">05</span>
                                <div className="service-card__icon">📊</div>
                                <h3>Citation Optimization</h3>
                                <p>
                                    Citation Optimization ist der strategische Aufbau von Erwähnungen und Zitierungen Ihres
                                    Unternehmens auf externen Plattformen, die von KI-Modellen als vertrauenswürdige Quellen
                                    herangezogen werden. Dazu gehören Branchenverzeichnisse, Fachportale, Reddit, Stack Overflow,
                                    Quora sowie gezielte Digital-PR-Maßnahmen. Jede Zitierung stärkt Ihre Autorität in den Augen
                                    der AI-Systeme.
                                </p>
                            </article>
                        </FadeIn>

                        <FadeIn delay={600}>
                            <article className="glass-card service-card">
                                <span className="service-card__number">06</span>
                                <div className="service-card__icon">📡</div>
                                <h3>AI Visibility Monitoring & Reporting</h3>
                                <p>
                                    Wir überwachen kontinuierlich, wie und wo Ihre Marke in KI-Antworten genannt wird. Unser
                                    Monitoring umfasst regelmäßige Abfragen Ihrer Kernthemen in ChatGPT, Perplexity und
                                    Google AI Overviews, Sentiment-Analyse der AI-Antworten, Tracking von Referral-Traffic
                                    aus AI-Plattformen und monatliche Reports mit klaren KPIs: Citation Rate, AI Visibility
                                    Score und Share of Voice im Vergleich zum Wettbewerb.
                                </p>
                            </article>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════
          WARUM FAMEFACT
      ═══════════════════════════════════════ */}
            <section className="section" id="warum-famefact">
                <div className="container">
                    <FadeIn>
                        <span className="section-label">Ihre Vorteile</span>
                        <h2 className="headline-lg">Warum famefact als ChatGPT SEO Agentur wählen?</h2>
                    </FadeIn>

                    <div className="why__grid">
                        <FadeIn className="why__content slide-in-left">
                            <p>
                                Als eine der ersten spezialisierten ChatGPT SEO Agenturen in Deutschland bringen wir eine einzigartige
                                Kombination aus Social-Media-Expertise, technischer SEO Optimierung und tiefem Verständnis für
                                KI-Systemen mit. Seit unserer Gründung 2010 in Berlin haben wir über 100 Unternehmen bei
                                ihrer digitalen Transformation begleitet – und verstehen daher genau, wie digitale Autorität
                                und mehr Sichtbarkeit in KI-Suchmaschinen aufgebaut wird.
                            </p>
                            <p>
                                Der entscheidende Unterschied zu anderen SEO Agenturen: Wir kommen aus der Social-Media-Welt und wissen,
                                dass <strong>echte Community-Signale</strong> das stärkste Trust-Signal für KI-Systeme sind.
                                Während andere Agenturen noch an veralteten Linkbuilding-Strategien und klassischen SEO-Tools festhalten,
                                setzen wir auf den Aufbau authentischer digitaler Autorität – genau das, was ChatGPT, Perplexity und
                                Co. bevorzugen. Unsere Expertise in der Optimierung für ChatGPT sorgt dafür, dass Ihr
                                Unternehmen bei ChatGPT und anderen KI-Modellen als vertrauenswürdige Quelle erkannt wird.
                            </p>

                            <div className="usp-list">
                                <div className="usp-item">
                                    <div className="usp-item__icon">🏢</div>
                                    <div className="usp-item__content">
                                        <h4>Berliner Agentur mit 15+ Jahren Erfahrung</h4>
                                        <p>Seit 2010 im digitalen Marketing – wir kennen jede Evolutionsstufe der Suche.</p>
                                    </div>
                                </div>
                                <div className="usp-item">
                                    <div className="usp-item__icon">🔬</div>
                                    <div className="usp-item__content">
                                        <h4>KI-First Strategie</h4>
                                        <p>Wir denken jede Maßnahme zuerst aus der Perspektive der KI-Suchsysteme.</p>
                                    </div>
                                </div>
                                <div className="usp-item">
                                    <div className="usp-item__icon">📈</div>
                                    <div className="usp-item__content">
                                        <h4>Messbare Ergebnisse</h4>
                                        <p>AI Visibility Score, Citation Tracking und transparente monatliche Reports.</p>
                                    </div>
                                </div>
                                <div className="usp-item">
                                    <div className="usp-item__icon">🤝</div>
                                    <div className="usp-item__content">
                                        <h4>Community als Trust-Signal</h4>
                                        <p>Aufbau echter digitaler Autorität durch Community-Engagement und Social Proof.</p>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>

                        <FadeIn className="slide-in-right">
                            <div className="why__stats">
                                <div className="glass-card stat-card">
                                    <div className="stat-card__number">15+</div>
                                    <div className="stat-card__label">Jahre Erfahrung</div>
                                </div>
                                <div className="glass-card stat-card">
                                    <div className="stat-card__number">100+</div>
                                    <div className="stat-card__label">Zufriedene Kunden</div>
                                </div>
                                <div className="glass-card stat-card">
                                    <div className="stat-card__number">6x</div>
                                    <div className="stat-card__label">Mehr AI-Zitierungen</div>
                                </div>
                                <div className="glass-card stat-card">
                                    <div className="stat-card__number">Berlin</div>
                                    <div className="stat-card__label">Standort & ♥</div>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════
          PROZESS
      ═══════════════════════════════════════ */}
            <section className="section section--alt" id="prozess">
                <div className="container">
                    <FadeIn>
                        <div className="text-center">
                            <span className="section-label">So arbeiten wir</span>
                            <h2 className="headline-lg">Unser ChatGPT SEO Prozess – SEO für ChatGPT & KI</h2>
                            <p className="body-lg" style={{ maxWidth: 700, margin: '0 auto' }}>
                                In vier klar definierten Phasen bringen wir Ihr Unternehmen bei ChatGPT und anderen KI-Suchmaschinen
                                an die Spitze der Suchergebnisse. Jede Phase baut auf der vorherigen auf und wird durch
                                datengetriebene SEO-Strategien und spezialisierte Tools gesteuert.
                            </p>
                        </div>
                    </FadeIn>

                    <div className="process__steps">
                        {[
                            { num: 1, title: 'Analyse', desc: 'Umfassender GEO Audit: Wie sehen ChatGPT, Perplexity & Co. Ihr Unternehmen? Wettbewerbs­analyse und Potenzial­identifikation.' },
                            { num: 2, title: 'Strategie', desc: 'Maßgeschneiderte GEO-Strategie mit priorisierten Handlungsfeldern, Content-Plan und technischer Roadmap für maximale AI-Sichtbarkeit.' },
                            { num: 3, title: 'Umsetzung', desc: 'Implementierung aller Optimierungen: Content, Schema Markup, Entity Building, Citation Optimization und technische Anpassungen.' },
                            { num: 4, title: 'Monitoring', desc: 'Kontinuierliches AI Visibility Monitoring, monatliche Reports und iterative Optimierung auf Basis aktueller KI-Algorithmus-Entwicklungen.' },
                        ].map((step, i) => (
                            <FadeIn key={step.num} delay={i * 150}>
                                <div className="step-card">
                                    <div className="step-card__number">{step.num}</div>
                                    <h3>{step.title}</h3>
                                    <p>{step.desc}</p>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════
          FAQ
      ═══════════════════════════════════════ */}
            <section className="section" id="faq">
                <div className="container">
                    <FadeIn>
                        <div className="text-center">
                            <span className="section-label">Häufige Fragen</span>
                            <h2 className="headline-lg">ChatGPT SEO & Suchmaschinenoptimierung für KI – FAQ</h2>
                            <p className="body-lg" style={{ maxWidth: 700, margin: '0 auto' }}>
                                Die wichtigsten Fragen und Antworten rund um ChatGPT SEO, GEO und die Optimierung
                                für KI-gestützte Suchsysteme und Suchmaschinen – verständlich erklärt.
                            </p>
                        </div>
                    </FadeIn>

                    <FadeIn>
                        <div className="faq__list" itemScope itemType="https://schema.org/FAQPage">
                            <FaqItem
                                question="Was ist GPT SEO und Generative Engine Optimization (GEO)?"
                                answer="GPT SEO bzw. Generative Engine Optimization (GEO) ist die systematische Optimierung von Webinhalten, damit sie von KI-gestützten Suchsystemen wie ChatGPT, Perplexity, Google AI Overviews und Bing Copilot als vertrauenswürdige Quelle zitiert und empfohlen werden. Im Gegensatz zu klassischem SEO geht es nicht nur um Rankings in Suchergebnislisten, sondern um die direkte Nennung in AI-generierten Antworten. Synonyme Begriffe sind LLMO (Large Language Model Optimization) und AIO (AI Optimization)."
                            />
                            <FaqItem
                                question="Warum brauche ich eine GPT SEO Agentur?"
                                answer="Über 40% der Google-Suchen enden bereits ohne Klick auf eine Website – Tendenz steigend. KI-Suchsysteme wie ChatGPT und Perplexity liefern direkte Antworten und zitieren dabei nur die autoritativsten Quellen. Eine spezialisierte GPT SEO Agentur stellt sicher, dass Ihr Unternehmen in diesen AI-Antworten präsent ist und nicht an die Konkurrenz verliert. Ohne professionelle GEO-Optimierung riskieren Sie, in der wichtigsten Informationsquelle Ihrer Zielgruppe unsichtbar zu werden."
                            />
                            <FaqItem
                                question="Was kostet GPT SEO bzw. Generative Engine Optimization?"
                                answer="Die Kosten für GPT SEO variieren je nach Branche, Wettbewerbsumfeld und Umfang der Optimierung. Typische monatliche Investitionen beginnen bei 1.500€ für fokussierte GEO-Kampagnen und können je nach Komplexität und Anzahl der zu optimierenden Themenbereiche bis zu 5.000€+ betragen. Wir erstellen Ihnen ein individuelles Angebot nach einer kostenlosen Erstanalyse, die bereits wertvolle Einblicke in Ihre aktuelle AI-Sichtbarkeit liefert."
                            />
                            <FaqItem
                                question="Wie lange dauert es, bis GPT SEO Ergebnisse zeigt?"
                                answer="Erste Verbesserungen in der AI-Sichtbarkeit können bereits nach 4–8 Wochen sichtbar werden, besonders bei der Korrektur falscher Informationen und der Optimierung strukturierter Daten. Für nachhaltige, stabile Positionierungen in KI-Suchsystemen empfehlen wir eine kontinuierliche Optimierung über mindestens 3–6 Monate. Der genaue Zeitrahmen hängt von der Ausgangslage, dem Wettbewerb und der gewählten Strategie ab."
                            />
                            <FaqItem
                                question="Was unterscheidet GPT SEO von klassischem SEO?"
                                answer="Klassisches SEO optimiert für Suchmaschinen-Rankings (Position 1–10 bei Google). GPT SEO bzw. GEO optimiert für die Zitierung in KI-generierten Antworten. Dabei spielen Faktoren wie Entity Authority, strukturierte Daten, Quellenglaubwürdigkeit (E-E-A-T), semantische Eindeutigkeit und Citation Optimization eine entscheidende Rolle. In der Praxis ergänzen sich beide Disziplinen: Starkes klassisches SEO ist eine gute Basis für GPT SEO, aber ohne spezifische GEO-Maßnahmen reicht es nicht aus."
                            />
                            <FaqItem
                                question="Für welche AI-Suchsysteme optimiert eine GPT SEO Agentur?"
                                answer="Als GPT SEO Agentur optimieren wir für alle relevanten KI-Suchsysteme: ChatGPT (OpenAI), Google AI Overviews (SGE), Perplexity AI, Bing Copilot (Microsoft), Claude (Anthropic) sowie aufkommende AI-Search-Plattformen wie Meta AI und You.com. Unser Ansatz ist plattformübergreifend, da die Grundprinzipien der GEO-Optimierung – Autorität, Konsistenz, semantische Eindeutigkeit – universell wirken."
                            />
                            <FaqItem
                                question="Kann man GPT SEO Ergebnisse messen?"
                                answer="Ja, GPT SEO Ergebnisse sind messbar. Wir tracken AI-Zitierungen über spezialisierte Monitoring-Tools, analysieren Referral-Traffic von AI-Plattformen, messen die Häufigkeit der Markennennung in AI-Antworten und erstellen monatliche Reports mit konkreten KPIs wie Citation Rate, AI Visibility Score und Sentiment Analysis. So sehen Sie genau, welchen ROI Ihre GEO-Investition bringt."
                            />
                            <FaqItem
                                question="Ist GPT SEO nur für große Unternehmen relevant?"
                                answer="Nein, GPT SEO ist für Unternehmen jeder Größe relevant. Gerade für KMUs bietet GEO eine einzigartige Chance: Während große Marken bei klassischem SEO mit riesigen Budgets dominieren, können auch kleinere Unternehmen durch gezielte AI-Optimierung als Experten-Quelle in KI-Antworten zitiert werden. Die Einstiegshürden sind oft niedriger als bei klassischem SEO, da Nischenexpertise von KI-Systemen besonders geschätzt wird."
                            />
                            <FaqItem
                                question="Was ist LLMO und wie hängt es mit GPT SEO zusammen?"
                                answer="LLMO steht für Large Language Model Optimization und ist ein Synonym für GPT SEO bzw. Generative Engine Optimization (GEO). Alle drei Begriffe beschreiben das gleiche Ziel: die Optimierung von Inhalten, damit sie von KI-Modellen (LLMs) als vertrauenswürdige Quelle erkannt, zitiert und empfohlen werden. In der Praxis verwenden wir die Begriffe synonym, wobei ‚GPT SEO' im deutschen Markt am geläufigsten ist."
                            />
                            <FaqItem
                                question="Welche Branchen profitieren am meisten von GPT SEO?"
                                answer="Besonders profitieren Branchen mit hohem Informationsbedarf: Beratungsunternehmen, Rechtsanwälte, Ärzte und Gesundheitsdienstleister, Finanzdienstleister, SaaS-Unternehmen, E-Commerce, Immobilien sowie Bildungsanbieter. Grundsätzlich profitiert jedes Unternehmen, das als Experte in seinem Bereich wahrgenommen werden möchte. Je wissensintensiver Ihre Branche, desto größer der Hebel durch professionelles GPT SEO."
                            />
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* ═══════════════════════════════════════
          KONTAKT / CTA
      ═══════════════════════════════════════ */}
            <section className="section contact" id="kontakt">
                <div className="container">
                    <FadeIn>
                        <div className="text-center">
                            <span className="section-label">Jetzt starten</span>
                            <h2 className="headline-lg">Bereit für mehr Sichtbarkeit bei ChatGPT & KI-Suchmaschinen?</h2>
                            <p className="body-lg" style={{ maxWidth: 700, margin: '0 auto' }}>
                                Lassen Sie uns in einem kostenlosen Erstgespräch analysieren, wie Ihr Unternehmen aktuell
                                bei ChatGPT oder Perplexity sichtbar ist – und welches Potenzial wir
                                durch gezielte SEO für ChatGPT gemeinsam erschließen können.
                            </p>
                        </div>
                    </FadeIn>

                    <div className="contact__grid">
                        <FadeIn className="slide-in-left">
                            <ContactForm />
                        </FadeIn>

                        <FadeIn className="slide-in-right">
                            <div className="contact-info">
                                <h3>Direkt Kontakt aufnehmen</h3>
                                <p>
                                    Sie möchten lieber direkt mit uns sprechen? Kein Problem – schreiben Sie uns eine E-Mail
                                    und wir melden uns innerhalb von 24 Stunden bei Ihnen zurück.
                                </p>

                                <div className="contact-detail">
                                    <div className="contact-detail__icon">📧</div>
                                    <div className="contact-detail__text">
                                        <a href="mailto:hi@gpt-seo-agentur.de">hi@gpt-seo-agentur.de</a>
                                    </div>
                                </div>

                                <div className="contact-detail">
                                    <div className="contact-detail__icon">📍</div>
                                    <div className="contact-detail__text">
                                        Schliemannstr. 23, 10437 Berlin
                                    </div>
                                </div>

                                <div className="contact-detail">
                                    <div className="contact-detail__icon">🌐</div>
                                    <div className="contact-detail__text">
                                        <a href="https://gpt-seo-agentur.de" target="_blank" rel="noopener noreferrer">gpt-seo-agentur.de</a>
                                    </div>
                                </div>

                                <div className="glass-card" style={{ marginTop: 'var(--space-lg)', padding: 'var(--space-md)' }}>
                                    <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>✓ Kostenlose Erstanalyse</h4>
                                    <p style={{ color: 'var(--color-white-60)', fontSize: '0.9rem', marginBottom: 0, lineHeight: 1.7 }}>
                                        Wir prüfen Ihre aktuelle AI-Sichtbarkeit kostenlos und unverbindlich.
                                        Sie erhalten einen kompakten Report mit den wichtigsten Erkenntnissen und
                                        konkreten Handlungsempfehlungen.
                                    </p>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>
        </>
    )
}
