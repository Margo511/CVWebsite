import { useRef, useState } from 'react';
import { profile, siteConfig } from '../../content';
import { getNavigation } from '../../utils/selectors';
import { usePreferences } from '../Preferences';
import { getSiteText } from '../../utils/i18n';
import { primaryNavigation } from '../../content/navigation';

export function Header() {
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const { language, setLanguage, theme, toggleTheme } = usePreferences();
  const siteText = getSiteText(language);
  const navigation = getNavigation(siteConfig, language).filter(item => primaryNavigation.includes(item.id));
  const closeMenu = () => { setOpen(false); menuButton.current?.focus(); };
  const initials = profile.name.split(/\s+/).map(word => word[0]).slice(0, 2).join('');
  return <header className="header editorial-header" onKeyDown={event => {
    if (event.key === 'Escape' && open) { event.preventDefault(); closeMenu(); }
  }} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}>
    <a className="brand" href="#top" aria-label={`${profile.name} · ${siteText.backToTop}`} onClick={() => setOpen(false)}>{initials}<span aria-hidden="true">.</span></a>
    <div className="header-actions">
      <div className="preferences">
        <div className="language-switch" data-language={language} role="group" aria-label={siteText.language}>
          {(['es', 'en'] as const).map(code => <button type="button" key={code} className={language === code ? 'active' : ''} aria-pressed={language === code} onClick={() => setLanguage(code)}><span key={language}>{code.toUpperCase()}</span></button>)}
        </div>
        <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label={theme === 'dark' ? siteText.lightMode : siteText.darkMode} title={theme === 'dark' ? siteText.lightMode : siteText.darkMode}>
          <span className={`theme-icon theme-icon-sun${theme === 'dark' ? ' is-visible' : ''}`} aria-hidden="true">☀</span>
          <span className={`theme-icon theme-icon-moon${theme === 'light' ? ' is-visible' : ''}`} aria-hidden="true">☾</span>
        </button>
        {navigation.length > 0 && <button ref={menuButton} className="menu-toggle" type="button" aria-label={open ? siteText.closeMenu : siteText.menu} aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen(!open)}><span aria-hidden="true">{open ? '×' : '☰'}</span></button>}
      </div>
      <nav id="main-navigation" className={open ? 'navigation is-open' : 'navigation'} aria-label={siteText.menu}>
        {navigation.map(item => <a key={item.id} href={`#${item.id}`} onClick={() => {
          setOpen(false);
          const heading = document.getElementById(`heading-${item.id}`);
          // The native anchor jump runs after click; restore heading focus afterwards.
          requestAnimationFrame(() => heading?.focus({ preventScroll: true }));
        }}>{item.label}</a>)}
      </nav>
    </div>
  </header>;
}
