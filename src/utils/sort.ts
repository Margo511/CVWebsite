import type { Experience, Project } from '../types/content';

// Explicit order values come first (ascending); unnumbered entries follow.
export function sortByOrder<T extends { order?: number }>(items: readonly T[], fallback: (a: T, b: T) => number = () => 0): T[] {
  return [...items].sort((a, b) => {
    const first = a.order ?? Infinity;
    const second = b.order ?? Infinity;
    return first === second ? fallback(a, b) : first < second ? -1 : 1;
  });
}
export function sortExperiences(items: readonly Experience[]): Experience[] {
  return sortByOrder(items, (a, b) => Number(b.current) - Number(a.current) || b.startDate.localeCompare(a.startDate));
}
export function getVisibleProjects(items: readonly Project[]): Project[] {
  return sortByOrder(items.filter(project => project.visible));
}
export const formatIndex = (index: number) => String(index + 1).padStart(2, '0');
