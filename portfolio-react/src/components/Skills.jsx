import { skills } from '../data/site';
import Reveal from './Reveal';

export default function Skills() {
  return (
    <section className="section section-tight" id="skills" aria-labelledby="skills-heading">
      <div className="shell">
        <Reveal>
          <header className="section-head">
            <p className="section-label">Stack i use in my projects</p>
            <h2 id="skills-heading">Tools I use</h2>
          </header>
        </Reveal>

        <ul className="skills-grid">
          {skills.map((group, index) => (
            <Reveal as="li" key={group.group} className="skill-card" delay={index * 50}>
              <h3>{group.group}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
