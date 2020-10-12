export interface Goal {
  id: string;
  name: string;
  amount: number;
  saved: number;
  achieved: boolean;
}

export function createGoal(params: Partial<Goal>): Goal {
  return {
    amount: 0,
    saved: 0,
    achieved: false,
    ...params,
  } as Goal;
}
