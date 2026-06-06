import { site } from '../data/site';
import Reveal from './Reveal';

export default function About() {
  return (
    <section className="section" id="about" aria-labelledby="about-heading">
      <div className="shell">
        <Reveal>
          <header className="section-head">
            <p className="section-label">About me</p>
            <h2 id="about-heading">How I work</h2>
          </header>
        </Reveal>

        <div className="about-layout">
          <Reveal className="about-copy" delay={60}>
            <p>
              I&apos;m a <strong>LNTU</strong> student in <strong>Cybersecurity</strong>. I learn by
              shipping: repos on{' '}
              <a href={site.github} target="_blank" rel="noreferrer">
                {site.githubHandle}
              </a>
              , broken things in staging, and fixes that stay fixed in production.
            </p>
            <p className="text-muted">
              On the security side I drill networking (TCP/IP, DNS, HTTP), Linux permissions and
              logging, and lab tooling on Kali. On the dev side I care about reproducible deploys,
              readable APIs, and UIs that don&apos;t fall apart on mobile.
            </p>
            <p className="text-muted">
              When something breaks I start with logs and a minimal repro — same habit for CTF
              challenges and for a 500 on a live shop.
            </p>
          </Reveal>

          <Reveal className="about-card" delay={120}>
            <dl className="fact-list">
              <div>
                <dt>GitHub</dt>
                <dd>
                  <a href={site.github} target="_blank" rel="noreferrer">
                    {site.githubHandle}
                  </a>
                </dd>
              </div>
              <div>
                <dt>Telegram</dt>
                <dd>
                  <a href={site.telegram} target="_blank" rel="noreferrer">
                    {site.telegramHandle}
                  </a>
                </dd>
              </div>
              <div>
                <dt>Location</dt>
                <dd>{site.location}</dd>
              </div>
              <div>
                <dt>Status</dt>
                <dd className="status-pill">Building & learning</dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
