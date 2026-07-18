import { useState, useCallback } from 'react';
import { MapRegion } from '../../../shared/types/location';
import { defaultRegion } from '../../../shared/utils/mapUtils';

export function useMapRegion(initialRegion?: MapRegion) {
  const [region, setRegion] = useState<MapRegion>(
    initialRegion || defaultRegion(),
  );

  const onRegionChange = useCallback((newRegion: MapRegion) => {
    setRegion(newRegion);
  }, []);

  const resetRegion = useCallback(() => {
    setRegion(defaultRegion());
  }, []);

  return {
    region,
    setRegion,
    onRegionChange,
    resetRegion,
  };
}
