export const countFormatter = (count: number): string => {
  if (count / 1000000 >= 1) return `${(count / 1000000).toFixed(1)}M`;
  if (count / 1000 >= 1) return `${(count / 1000).toFixed(1)}K`;
  return count.toString();
};
