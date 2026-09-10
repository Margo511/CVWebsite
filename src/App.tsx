import { useEffect } from 'react';
import { siteConfig } from './content';
import { Header } from './components/layout/Header';
import { Hero } from './components/sections/Hero';
import { About, Certifications, Contact, Education, Skills } from './components/sections/ContentSections';
import { Experience } from './components/sections/Experience';
import { Projects } from './components/sections/Projects';
import { Systems } from './components/sections/Systems';
import { Terminal } from './components/sections/Terminal';
import { getNavigation } from './utils/selectors';
import { formatIndex } from './utils/sort';
import type { SectionId } from './types/content';
import { usePreferences } from './components/Preferences';
import { getProfile, getSiteText } from './utils/i18n';
import './styles.css';
import './components/layout/editorial-shell.css';

const sections: Record<SectionId, React.ComponentType> = {
  about: About, experience: Experience, projects: Projects, systems: Systems,
  skills: Skills, education: Education, certifications: Certifications, terminal: Terminal, contact: Contact,
};

export default function App() {
  const { language } = usePreferences();
  const profile = getProfile(language);
  const siteText = getSiteText(language);
  useEffect(() => {
    document.title = `${profile.name} · ${profile.headline}`;
    document.querySelector('meta[name="description"]')?.setAttribute('content', profile.shortDescription);
  }, [language, profile.headline, profile.name, profile.shortDescription]);
  return <div id="top" data-accent={siteConfig.accentColor}>
    <a className="skip-link" href="#main">{siteText.skipToContent}</a>
    <div className="page"><Header /><main id="main"><Hero />
      {getNavigation(siteConfig, language).map((item, index) => {
        const Component = sections[item.id];
        return <section className={`content-section section-${item.id}`} id={item.id} key={item.id} aria-labelledby={`heading-${item.id}`}>
          <div className="section-heading"><div className="section-title"><span className="section-number" aria-hidden="true">{formatIndex(index)}</span><h2 id={`heading-${item.id}`} tabIndex={-1}>{item.label}</h2></div><p>{item.eyebrow}</p></div>
          <Component />
        </section>;
      })}
    </main><footer><p>© {new Date().getFullYear()} {profile.name}<span>{profile.specialization.join(' · ')}</span></p><a href="#top" aria-label={siteText.backToTop}>↑</a></footer></div>
  </div>;
}
