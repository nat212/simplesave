import { Injectable } from '@angular/core';
import { AuthService } from '@modules/session/state/auth.service';
import { CollectionConfig, CollectionService } from 'akita-ng-fire';
import { GoalState, GoalStore } from './goal.store';

@Injectable({ providedIn: 'root' })
@CollectionConfig({ path: 'users/:userId/goals' })
export class OnlineGoalService extends CollectionService<GoalState> {
  constructor(store: GoalStore, private auth: AuthService) {
    super(store);
  }

  get path(): string {
    const userId = this.auth.userId;
    return `users/${userId}/goals`;
  }
}
