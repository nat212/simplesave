import { Injectable } from '@angular/core';
import { ActiveState, EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Goal } from './goal.model';

export interface GoalState extends EntityState<Goal, string>, ActiveState<string> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'goal' })
export class GoalStore extends EntityStore<GoalState> {
  constructor() {
    super();
  }
}
