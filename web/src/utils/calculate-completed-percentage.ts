export function calculateCompletedPercentage(availableHabits: number, completedHabits: number) {
  return availableHabits > 0 ? Math.round((completedHabits / availableHabits) * 100) : 0;
}