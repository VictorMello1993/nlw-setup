export function calculateCompletedPercentage(available: number, completed: number) {
  return available > 0 ? Math.round((completed / available) * 100) : 0;
}