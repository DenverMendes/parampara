'use client';

import { useEffect, useMemo, useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { CustodianCard } from '@/components/custodian-card';
import { custodians } from '@/lib/cultural-data';

const filters = ['All', 'Performance', 'Craft', 'Story'] as const;

export function DiscoverExplorer() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<(typeof filters)[number]>('All');

  useEffect(() => {
    const initialQuery = new URLSearchParams(window.location.search).get('query');
    if (initialQuery) setQuery(initialQuery);
  }, []);

  const results = useMemo(() => {
    const needle = query.toLowerCase().trim();
    return custodians.filter((person) => {
      const matchesFilter = filter === 'All' || person.category === filter;
      const haystack = `${person.name} ${person.tradition} ${person.location} ${person.languages.join(' ')}`.toLowerCase();
      return matchesFilter && (!needle || haystack.includes(needle));
    });
  }, [filter, query]);

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
          <button className="filter-more"><SlidersHorizontal /> More</button>
        </div>
        <p><strong>{results.length}</strong> {results.length === 1 ? 'voice' : 'voices'} found</p>
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
          <button onClick={() => { setFilter('All'); setQuery(''); }}>Show every custodian</button>
        </div>
      )}
    </section>
  );
}
