import { projects } from '../data/projects';
import ProjectCard from './ProjectCard';
import Reveal from './Reveal';

export default function Projects() {
  return (
    <section className="section" id="work" aria-labelledby="work-heading">
      <div className="shell">
        <Reveal>
          <header className="section-head">
            <p className="section-label">My projects</p>
            <h2 id="work-heading">Selected projects</h2>
            <p className="section-desc text-muted">
              Case studies with what shipped, what broke in prod, and how it was fixed.
            </p>
          </header>
        </Reveal>

        <div className="project-list">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
