import { useState } from 'react';
import { profile, siteText } from '../../content';
import { getNavigation } from '../../utils/selectors';

export function Header() {
  const [open, setOpen] = useState(false);
  const navigation = getNavigation();
  const initials = profile.name.split(/\s+/).map(word => word[0]).slice(0, 2).join('');
  return <header className="header">
    <a className="brand" href="#top" aria-label={`${profile.name} · ${siteText.backToTop}`} onClick={() => setOpen(false)}>{initials}<span aria-hidden="true">.</span></a>
    <button className="menu-toggle" type="button" aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen(!open)}>{open ? siteText.closeMenu : siteText.menu}</button>
    <nav id="main-navigation" className={open ? 'navigation is-open' : 'navigation'} aria-label={siteText.menu} onKeyDown={event => { if (event.key === 'Escape') setOpen(false); }}>
      {navigation.map(item => <a key={item.id} href={`#${item.id}`} onClick={() => setOpen(false)}>{item.label}</a>)}
    </nav>
  </header>;
}
