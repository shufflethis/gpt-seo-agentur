import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

export default function Datenschutz() {
    return (
        <div className="legal-page">
            <Helmet>
                <title>Datenschutzerklärung | GPT SEO Agentur – famefact</title>
                <meta name="description" content="Datenschutzerklärung der GPT SEO Agentur gpt-seo-agentur.de – Informationen zum Datenschutz gemäß DSGVO." />
                <meta name="robots" content="noindex, follow" />
            </Helmet>
            <div className="container">
                <Link to="/" className="back-link">← Zurück zur Startseite</Link>
                <h1>Datenschutzerklärung</h1>

                <h2>1. Verantwortliche Stelle</h2>
                <p>
                    track by track GmbH<br />
                    Schliemannstr. 23<br />
                    10437 Berlin<br />
                    E-Mail: <a href="mailto:info@famefact.com">info@famefact.com</a>
                </p>
                <p>
                    Vertreten durch: Tobias Sander
                </p>

                <h2>2. Datenschutzbeauftragter</h2>
                <p>
                    Jan Kriedner<br />
                    E-Mail: <a href="mailto:info@famefact.com">info@famefact.com</a>
                </p>

                <h2>3. Allgemeines zur Datenverarbeitung</h2>
                <p>
                    Wir verarbeiten personenbezogene Daten unserer Nutzer grundsätzlich nur, soweit dies zur
                    Bereitstellung einer funktionsfähigen Website sowie unserer Inhalte und Leistungen erforderlich
                    ist. Die Verarbeitung personenbezogener Daten erfolgt auf Grundlage der DSGVO (EU) 2016/679
                    und des BDSG.
                </p>

                <h2>4. Hosting</h2>
                <p>
                    Diese Website wird bei Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA, gehostet.
                    Vercel verarbeitet die anfallenden Daten in unserem Auftrag gemäß Art. 28 DSGVO. Beim Aufruf
                    dieser Website werden durch den Hostingprovider automatisch Informationen in sogenannten
                    Server-Logfiles erfasst, die Ihr Browser automatisch übermittelt (IP-Adresse, Datum und Uhrzeit
                    des Zugriffs, angeforderte Seite, Browsertyp und -version, Betriebssystem).
                </p>

                <h2>5. Kontaktformular</h2>
                <p>
                    Wenn Sie uns über unser Kontaktformular kontaktieren, werden die von Ihnen eingegebenen Daten
                    (Name, E-Mail-Adresse, Unternehmen, Nachricht) zum Zweck der Bearbeitung Ihrer Anfrage an
                    unseren internen Kommunikationsdienst (Slack) übermittelt und dort verarbeitet. Rechtsgrundlage
                    hierfür ist Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung) bzw. Art. 6 Abs. 1 lit. f DSGVO
                    (berechtigtes Interesse an der Bearbeitung von Anfragen).
                </p>
                <p>
                    Ihre Daten werden ausschließlich für die Bearbeitungdauer Ihrer Anfrage gespeichert und
                    anschließend gelöscht, sofern keine gesetzlichen Aufbewahrungspflichten bestehen.
                </p>

                <h2>6. Cookies und Tracking</h2>
                <p>
                    Diese Website verwendet keine Cookies und keine Tracking-Tools. Es werden keine personenbezogenen
                    Daten zu Analyse- oder Marketingzwecken erhoben. Wir setzen keine Tools wie Google Analytics,
                    Facebook Pixel oder ähnliche Dienste ein.
                </p>

                <h2>7. Google Fonts</h2>
                <p>
                    Diese Website nutzt Google Fonts zur einheitlichen Darstellung von Schriftarten. Beim Aufruf
                    einer Seite lädt Ihr Browser die benötigten Schriftarten von Google-Servern. Dabei wird Ihre
                    IP-Adresse an Google LLC übermittelt. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Weitere
                    Informationen finden Sie in der Datenschutzerklärung von Google unter{' '}
                    <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
                        policies.google.com/privacy
                    </a>.
                </p>

                <h2>8. Ihre Rechte als Betroffener</h2>
                <p>Sie haben folgende Rechte gemäß DSGVO:</p>
                <ul>
                    <li><strong>Auskunftsrecht</strong> (Art. 15 DSGVO): Sie können Auskunft über Ihre bei uns gespeicherten personenbezogenen Daten verlangen.</li>
                    <li><strong>Recht auf Berichtigung</strong> (Art. 16 DSGVO): Sie können die unverzügliche Berichtigung unrichtiger Daten verlangen.</li>
                    <li><strong>Recht auf Löschung</strong> (Art. 17 DSGVO): Sie können die Löschung Ihrer personenbezogenen Daten verlangen.</li>
                    <li><strong>Recht auf Einschränkung der Verarbeitung</strong> (Art. 18 DSGVO): Sie können die Einschränkung der Verarbeitung Ihrer Daten verlangen.</li>
                    <li><strong>Recht auf Datenübertragbarkeit</strong> (Art. 20 DSGVO): Sie können verlangen, Ihre Daten in einem maschinenlesbaren Format zu erhalten.</li>
                    <li><strong>Widerspruchsrecht</strong> (Art. 21 DSGVO): Sie können der Verarbeitung Ihrer Daten widersprechen.</li>
                    <li><strong>Beschwerderecht</strong>: Sie können sich bei der zuständigen Datenschutzaufsichtsbehörde beschweren.</li>
                </ul>
                <p>
                    Die zuständige Datenschutzaufsichtsbehörde ist:<br />
                    Berliner Beauftragte für Datenschutz und Informationsfreiheit<br />
                    Friedrichstr. 219<br />
                    10969 Berlin
                </p>

                <h2>9. Änderungen dieser Datenschutzerklärung</h2>
                <p>
                    Wir behalten uns vor, diese Datenschutzerklärung anzupassen, um stets den aktuellen rechtlichen
                    Anforderungen zu entsprechen oder Änderungen unserer Leistungen umzusetzen. Für Ihren erneuten
                    Besuch gilt dann die neue Datenschutzerklärung.
                </p>

                <p style={{ marginTop: 'var(--space-lg)', color: 'var(--color-white-40)', fontSize: '0.85rem' }}>
                    Stand: März 2026
                </p>
            </div>
        </div>
    )
}
