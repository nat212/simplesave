import { Injectable } from '@angular/core';
import { DocumentChangeAction } from '@angular/fire/firestore';
import { AuthService } from '@modules/session/state/auth.service';
import { CollectionConfig } from 'akita-ng-fire';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Goal } from './goal.model';
import { GoalStore } from './goal.store';
import { OnlineGoalService } from './online-goal.service';

@Injectable({ providedIn: 'root' })
@CollectionConfig({ path: 'goals' })
export class GoalService {
  public loggedIn$: Observable<boolean>;
  public loggedIn: boolean;
  constructor(
    private store: GoalStore,
    private auth: AuthService,
    private onlineGoals: OnlineGoalService,
  ) {
    this.loggedIn$ = this.auth.auth.authState.pipe(map((state) => !!state));
    this.loggedIn$.subscribe((loggedIn) => (this.loggedIn = loggedIn));
  }

  public syncOnline(): Observable<boolean | DocumentChangeAction<Goal>[]> {
    return this.loggedIn$.pipe(
      switchMap((loggedIn) =>
        loggedIn
          ? this.onlineGoals.syncCollection({ params: { userId: this.auth.userId } })
          : of(true),
      ),
    );
  }
}
