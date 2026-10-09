export interface Habit {
  id: string;
  title: string;
  description: string;
  trackedDates: string[];
  startDate: string;
  updatedAt: string;
  slug: string;
}

export type CreateHabitInput = Pick<
  Habit,
  "title" | "description" | "trackedDates" | "startDate"
>;
