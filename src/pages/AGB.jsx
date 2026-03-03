import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

export default function AGB() {
    return (
        <div className="legal-page">
            <Helmet>
                <title>AGB | GPT SEO Agentur – famefact</title>
                <meta name="description" content="Allgemeine Geschäftsbedingungen der GPT SEO Agentur gpt-seo-agentur.de – track by track GmbH." />
                <meta name="robots" content="noindex, follow" />
            </Helmet>
            <div className="container">
                <Link to="/" className="back-link">← Zurück zur Startseite</Link>
                <h1>Allgemeine Geschäftsbedingungen (AGB)</h1>

                <h2>§ 1 Geltungsbereich</h2>
                <p>
                    Die nachstehenden Allgemeinen Geschäftsbedingungen gelten für alle gegenwärtigen und zukünftigen
                    Geschäftsbeziehungen zwischen der track by track GmbH (nachfolgend „Agentur") und dem Auftraggeber
                    (nachfolgend „Kunde"). Abweichende Bedingungen des Kunden werden nicht anerkannt, es sei denn,
                    die Agentur hat ausdrücklich schriftlich ihrer Geltung zugestimmt.
                </p>

                <h2>§ 2 Termine und Fristen</h2>
                <p>
                    Von der Agentur genannte Termine und Fristen gelten stets nur annähernd, es sei denn, dass
                    ausdrücklich ein fester Termin oder eine feste Frist zugesagt oder vereinbart wurde. Sofern eine
                    Lieferung vereinbart wurde, beginnen Lieferfristen erst dann, wenn alle technischen Fragen
                    zwischen den Parteien geklärt sind.
                </p>

                <h2>§ 3 Leistungsumfang</h2>
                <p>
                    Der Umfang der zu erbringenden Leistungen ergibt sich aus der Leistungsbeschreibung der Agentur
                    oder, soweit eine solche nicht vorhanden ist, aus dem jeweiligen Einzelauftrag/Einzelvertrag.
                    Nebenabreden, Änderungen und Ergänzungen bedürfen zu ihrer Wirksamkeit der Schriftform. Bei Kreativ-,
                    Beratungs-, Schulungs- und Umsetzungsleistungen beschränkt sich die Leistungspflicht der Agentur
                    auf den vereinbarten Umfang.
                </p>

                <h2>§ 4 Haftung</h2>
                <p>
                    Die Agentur haftet unbeschränkt für Vorsatz und grobe Fahrlässigkeit. Bei leichter Fahrlässigkeit
                    haftet die Agentur nur bei Verletzung wesentlicher Vertragspflichten und begrenzt auf den
                    vorhersehbaren, vertragstypischen Schaden. Die Haftung für mittelbare und unvorhersehbare Schäden,
                    Produktionsausfälle, entgangenen Gewinn, ausgebliebene Einsparungen und Vermögensschäden wegen
                    Ansprüchen Dritter ist bei leichter Fahrlässigkeit ausgeschlossen.
                </p>

                <h2>§ 5 Abnahme</h2>
                <p>
                    Der Kunde ist verpflichtet, die vertragsgemäß erbrachten Leistungen innerhalb von 14 Tagen
                    abzunehmen. Beanstandungen müssen unverzüglich, spätestens jedoch innerhalb von einer Woche
                    nach Ablieferung, schriftlich mitgeteilt werden. Erfolgt keine fristgemäße Beanstandung, gilt
                    die Leistung als abgenommen.
                </p>

                <h2>§ 6 Rechnungsstellung und Zahlungsbedingungen</h2>
                <p>
                    Rechnungen sind innerhalb von 14 Tagen nach Zugang ohne Abzug fällig. Bei Überschreitung der
                    Zahlungsfrist ist die Agentur berechtigt, Verzugszinsen in Höhe von 9 Prozentpunkten über dem
                    Basiszinssatz der EZB zu berechnen. Die Agentur ist berechtigt, Vorauszahlungen zu verlangen.
                </p>

                <h2>§ 7 Aufwendungen</h2>
                <p>
                    Alle Aufwendungen, die nicht durch die vereinbarte Vergütung abgedeckt sind (z.B. Reisekosten,
                    Fremdleistungen, Material), werden dem Kunden gesondert in Rechnung gestellt. Dies setzt eine
                    vorherige Zustimmung des Kunden voraus, sofern die Aufwendungen nicht unerheblich sind.
                </p>

                <h2>§ 8 Urheberrecht und Nutzungsrechte</h2>
                <p>
                    An den Arbeitsergebnissen der Agentur werden dem Kunden nach vollständiger Bezahlung einfache
                    Nutzungsrechte für die Vertragsdauer eingeräumt. Eine Übertragung auf Dritte bedarf der vorherigen
                    schriftlichen Zustimmung der Agentur. Die Agentur behält sich das Recht vor, Arbeiten zu
                    Präsentationszwecken zu verwenden.
                </p>

                <h2>§ 9 Vertraulichkeit</h2>
                <p>
                    Beide Parteien verpflichten sich, alle im Rahmen der Zusammenarbeit erlangten vertraulichen
                    Informationen geheim zu halten und nicht an Dritte weiterzugeben. Diese Verpflichtung besteht
                    auch nach Beendigung des Vertragsverhältnisses fort.
                </p>

                <h2>§ 10 Besprechungsberichte</h2>
                <p>
                    Über Besprechungen, in denen verbindliche Absprachen getroffen werden, fertigt die Agentur
                    Besprechungsberichte an. Diese gelten als genehmigt, wenn nicht innerhalb von fünf Werktagen
                    nach Zugang schriftlich Einwände erhoben werden.
                </p>

                <h2>§ 11 Schlussbestimmungen</h2>
                <p>
                    Es gilt das Recht der Bundesrepublik Deutschland. Gerichtsstand ist Berlin. Sollte eine
                    Bestimmung dieser AGB unwirksam sein oder werden, bleibt die Wirksamkeit der übrigen
                    Bestimmungen hiervon unberührt.
                </p>
            </div>
        </div>
    )
}
