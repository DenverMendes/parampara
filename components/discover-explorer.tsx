'use client';

import { useEffect, useMemo, useState } from 'react';
import { Languages, MapPin, Search, SlidersHorizontal, X } from 'lucide-react';
import { CustodianCard } from '@/components/custodian-card';
import { custodians } from '@/lib/cultural-data';

const filters = ['All', 'Performance', 'Craft', 'Story'] as const;
const regions = ['All India', 'Kerala', 'Karnataka', 'Madhya Pradesh'] as const;
const languages = ['All languages', 'Malayalam', 'Kannada', 'Hindi', 'English'] as const;

export function DiscoverExplorer() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<(typeof filters)[number]>('All');
  const [region, setRegion] = useState<(typeof regions)[number]>('All India');
  const [language, setLanguage] = useState<(typeof languages)[number]>('All languages');
  const [moreOpen, setMoreOpen] = useState(false);

  useEffect(() => {
    const initialQuery = new URLSearchParams(window.location.search).get('query');
    if (initialQuery) setQuery(initialQuery);
  }, []);

  const results = useMemo(() => {
    const needle = query.toLowerCase().trim();
    return custodians.filter((person) => {
      const matchesFilter = filter === 'All' || person.category === filter;
      const matchesRegion = region === 'All India' || person.location.includes(region);
      const matchesLanguage = language === 'All languages' || person.languages.includes(language);
      const haystack = `${person.name} ${person.tradition} ${person.location} ${person.languages.join(' ')}`.toLowerCase();
      return matchesFilter && matchesRegion && matchesLanguage && (!needle || haystack.includes(needle));
    });
  }, [filter, language, query, region]);

  const filtersActive = Boolean(query.trim()) || filter !== 'All' || region !== 'All India' || language !== 'All languages';
  const clearFilters = () => {
    setQuery('');
    setFilter('All');
    setRegion('All India');
    setLanguage('All languages');
  };

  return (
    <section className="discover-explorer" aria-label="Discover custodians">
      <div className="discover-toolbar">
        <label>
          <Search />
          <span className="sr-only">Search traditions, people, or places</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search a person, place, or tradition…"
          />
        </label>
        <div className="filter-row" aria-label="Filter by category">
          {filters.map((item) => (
            <button
              key={item}
              className={filter === item ? 'active' : ''}
              onClick={() => setFilter(item)}
              aria-pressed={filter === item}
            >
              {item}
            </button>
          ))}
          <button className={`filter-more ${moreOpen ? 'active' : ''}`} onClick={() => setMoreOpen((value) => !value)} aria-expanded={moreOpen} aria-controls="more-discovery-filters"><SlidersHorizontal /> {moreOpen ? 'Fewer filters' : 'More filters'}</button>
        </div>
        <p><strong>{results.length}</strong> {results.length === 1 ? 'voice' : 'voices'} found</p>
      </div>

      {moreOpen && (
        <section className="advanced-filters" id="more-discovery-filters" aria-label="More discovery filters">
          <div><p><MapPin /> Region</p><span>{regions.map((item) => <button key={item} className={region === item ? 'active' : ''} onClick={() => setRegion(item)} aria-pressed={region === item}>{item}</button>)}</span></div>
          <div><p><Languages /> Language</p><span>{languages.map((item) => <button key={item} className={language === item ? 'active' : ''} onClick={() => setLanguage(item)} aria-pressed={language === item}>{item}</button>)}</span></div>
          {filtersActive && <button className="clear-discovery" onClick={clearFilters}><X /> Clear all</button>}
        </section>
      )}

      <div className="discover-result-heading">
        <p><strong>{results.length}</strong> {results.length === 1 ? 'person carries' : 'people carry'} a tradition matching your search.</p>
        {filtersActive && <button onClick={clearFilters}><X /> Start over</button>}
      </div>

      {results.length > 0 ? (
        <div className="discover-grid">
          {results.map((custodian, index) => (
            <CustodianCard key={custodian.slug} custodian={custodian} index={index} />
          ))}
        </div>
      ) : (
        <div className="empty-result">
          <span>प</span>
          <h2>No voice matched that search.</h2>
          <p>Try a tradition, state, or language instead.</p>
          <button onClick={clearFilters}>Show every custodian</button>
        </div>
      )}
    </section>
  );
}
