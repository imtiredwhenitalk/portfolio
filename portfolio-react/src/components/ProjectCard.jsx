import Reveal from './Reveal';

export default function ProjectCard({ project, index }) {
  return (
    <Reveal
      as="article"
      className="project-card"
      delay={index * 50}
      aria-labelledby={`project-${project.id}`}
    >
      <div className="project-card-accent" aria-hidden="true" data-tone={project.tone || 'default'} />

      <div className="project-card-inner">
        <header className="project-card-head">
          <div>
            <h3 id={`project-${project.id}`}>{project.title}</h3>
            <p className="project-sub">{project.subtitle}</p>
          </div>
          <a className="btn btn-ghost btn-sm" href={project.href} target="_blank" rel="noreferrer">
            {project.hrefLabel}
            <span className="btn-arrow" aria-hidden="true">
              ↗
            </span>
          </a>
        </header>

        <p className="project-highlight">{project.highlight}</p>

        <div className="project-meta-row">
          <span className="project-role">
            <span className="project-meta-label">Role</span>
            {project.role}
          </span>
        </div>

        <div className="project-blocks">
          {project.blocks.map((block) => (
            <div key={block.title} className="project-block">
              <h4>{block.title}</h4>
              <ul>
                {block.bullets.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <footer className="project-card-foot">
          <ul className="tag-list" aria-label="Tech stack">
            {project.stack.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </footer>
      </div>
    </Reveal>
  );
}
