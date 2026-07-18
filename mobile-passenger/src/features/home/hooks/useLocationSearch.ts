import { useState, useCallback } from 'react';
import { useDebounce } from '../../../shared/hooks/useDebounce';
import { SearchResult } from '../../../shared/types/location';
import { config } from '../../../shared/constants/config';

export function useLocationSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const debouncedQuery = useDebounce(query, config.map.searchDebounceMs);

  const search = useCallback(async (q: string) => {
    if (!q || q.length < 2) {
      setResults([]);
      return;
    }

    setIsSearching(true);
    try {
      // API call would go here
      // const { data } = await locationApi.search(q);
      // setResults(data);
      setResults([]);
    } catch {
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

  const clearSearch = useCallback(() => {
    setQuery('');
    setResults([]);
  }, []);

  return {
    query,
    setQuery,
    results,
    isSearching,
    debouncedQuery,
    search,
    clearSearch,
  };
}
