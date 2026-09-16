'use client';

import { useEffect, useState } from 'react';
import { ArrowRight, Menu, Search, Sparkles, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function SiteHeader({ activeHref }: { activeHref?: string }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMode, setProfileMode] = useState<'visitor' | 'custodian' | null>(null);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).has('choose')) return;
    const savedMode = window.sessionStorage.getItem('parampara-mode');
    if (savedMode === 'visitor' || savedMode === 'custodian') setProfileMode(savedMode);

    const updateMode = (event: Event) => {
      const nextMode = (event as CustomEvent<'visitor' | 'custodian'>).detail;
      if (nextMode === 'visitor' || nextMode === 'custodian') setProfileMode(nextMode);
    };
    window.addEventListener('parampara-mode-change', updateMode);
    return () => window.removeEventListener('parampara-mode-change', updateMode);
  }, []);

  const navigation = profileMode === 'visitor'
    ? [
        { label: 'Discover', href: '/discover' },
        { label: 'My journey', href: '/journey' },
        { label: 'Experiences', href: '/book' },
      ]
    : profileMode === 'custodian'
      ? [
          { label: 'Workspace', href: '/dashboard' },
          { label: 'My stories', href: '/story-studio' },
          { label: 'Cultural controls', href: '/permissions' },
        ]
      : [
          { label: 'Discover', href: '/discover' },
          { label: 'Story studio', href: '/story-studio' },
          { label: 'Experiences', href: '/book' },
        ];

  const isActive = (href: string) => activeHref === href;

  useEffect(() => {
    if (!searchOpen && !menuOpen) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSearchOpen(false);
        setMenuOpen(false);
      }
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', close);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', close);
    };
  }, [menuOpen, searchOpen]);

  return (
    <>
      <header className="site-header">
        <a href="/" className="brand" aria-label="Parampara home">
          <span>प</span>
          <div>
            <strong>Parampara</strong>
            <small>Living culture network</small>
          </div>
        </a>
        <nav aria-label="Main navigation">
          {navigation.map((item) => <a key={item.href} className={isActive(item.href) ? 'active' : ''} href={item.href} aria-current={isActive(item.href) ? 'page' : undefined}>{item.label}</a>)}
        </nav>
        <div className="header-actions">
          <Button variant="ghost" size="icon" aria-label="Search" aria-expanded={searchOpen} onClick={() => setSearchOpen(true)}>
            <Search />
          </Button>
          <a className="header-signin hidden sm:inline-flex" href={profileMode === 'visitor' ? '/journey' : profileMode === 'custodian' ? '/dashboard' : '/?choose=1'}>
            {profileMode === 'visitor' ? 'My journey' : profileMode === 'custodian' ? 'My workspace' : 'Choose your path'}
          </a>
          <a className="header-cta hidden sm:inline-flex" href={profileMode === 'custodian' ? '/story-studio' : profileMode === 'visitor' ? '/discover' : '/onboarding'}>
            {profileMode === 'custodian' ? 'Add a story' : profileMode === 'visitor' ? 'Keep exploring' : 'Share your tradition'} <Sparkles />
          </a>
          <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(true)}>
            <Menu />
          </Button>
        </div>
      </header>

      {searchOpen && (
        <div className="native-dialog-overlay" onMouseDown={() => setSearchOpen(false)}>
          <section className="native-dialog-panel search-dialog" role="dialog" aria-modal="true" aria-labelledby="search-title" onMouseDown={(event) => event.stopPropagation()}>
            <button className="native-dialog-close" onClick={() => setSearchOpen(false)} aria-label="Close search"><X /></button>
            <div>
              <h2 id="search-title">Find a living tradition</h2>
              <p>Search people, practices, places, or ask in your own words.</p>
            </div>
            <form className="search-form" action="/discover">
              <input autoFocus name="query" placeholder="Try “stories from coastal Karnataka”" aria-label="Search Parampara" />
              <button type="submit" aria-label="Submit search"><ArrowRight /></button>
            </form>
            <div className="search-suggestions">
              <a href="/discover?query=Theyyam">Theyyam custodians <ArrowRight /></a>
              <a href="/discover?query=weaving">Weaving experiences <ArrowRight /></a>
              <a href="/discover?query=Kannada">Stories in Kannada <ArrowRight /></a>
            </div>
          </section>
        </div>
      )}

      {menuOpen && (
        <div className="native-dialog-overlay native-menu-overlay" onMouseDown={() => setMenuOpen(false)}>
          <section className="native-dialog-panel mobile-menu" role="dialog" aria-modal="true" aria-label="Explore Parampara" onMouseDown={(event) => event.stopPropagation()}>
            <button className="native-dialog-close" onClick={() => setMenuOpen(false)} aria-label="Close menu"><X /></button>
            <p className="eyebrow">{profileMode === 'visitor' ? 'Your visitor experience' : profileMode === 'custodian' ? 'Your custodian workspace' : 'Explore Parampara'}</p>
            {navigation.map((item) => <a key={item.href} href={item.href} aria-current={isActive(item.href) ? 'page' : undefined}>{item.label} <ArrowRight /></a>)}
            <a href="/?choose=1">Switch experience <ArrowRight /></a>
          </section>
        </div>
      )}
    </>
  );
}
