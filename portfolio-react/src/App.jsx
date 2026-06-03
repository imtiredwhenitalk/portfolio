import './styles.css';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';

function App() {
  return (
    <>
      <a className="skip-link" href="#about">
        Skip to content
      </a>
      <div className="page-noise" aria-hidden="true" />
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
      </main>
      <Contact />
    </>
  );
}

export default App;
