export function formatDistance(meters: number): string {
  const kilometers = meters / 1000;

  if (kilometers < 1) {
    return `${Math.round(meters)} m`;
  }

  if (kilometers < 10) {
    return `${kilometers.toFixed(1)} km`;
  }

  return `${kilometers.toFixed(0)} km`;
}

export function formatDistanceShort(meters: number): string {
  const kilometers = meters / 1000;

  if (kilometers < 1) {
    return `${Math.round(meters)}m`;
  }

  return `${kilometers.toFixed(1)}km`;
}
