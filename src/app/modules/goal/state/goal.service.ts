import { Injectable } from '@angular/core';
import { CollectionConfig, CollectionService } from 'akita-ng-fire';
import { GoalStore, GoalState } from './goal.store';

@Injectable({ providedIn: 'root' })
@CollectionConfig({ path: 'goals' })
export class GoalService extends CollectionService<GoalState> {
  constructor(store: GoalStore) {
    super(store);
  }
}
