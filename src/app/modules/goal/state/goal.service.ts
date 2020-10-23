import { Injectable } from '@angular/core';
import { DocumentChangeAction } from '@angular/fire/firestore';
import { AuthService } from '@modules/session/state/auth.service';
import { CollectionConfig } from 'akita-ng-fire';
import { concat, from, Observable, of, zip } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import * as uuid from 'uuid';
import { createGoal, Goal } from './goal.model';
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

  private handleAuthStatus<T>(
    loggedInFn: () => Observable<T>,
    loggedOutFn: () => Observable<T>,
  ): Observable<T> {
    return this.loggedIn$.pipe(switchMap((loggedIn) => (loggedIn ? loggedInFn() : loggedOutFn())));
  }

  private createGoalOnline(goal: Partial<Goal>): Observable<string> {
    return from(this.onlineGoals.add(createGoal(goal)));
  }

  private createGoalOffline(goal: Partial<Goal>): Observable<string> {
    const id = uuid.v4();
    this.store.add(createGoal({ ...goal, id }));
    return of(id);
  }

  public addGoal(goal: Partial<Goal>): Observable<string> {
    return this.loggedIn$.pipe(
      switchMap((loggedIn) =>
        loggedIn ? this.createGoalOnline(goal) : this.createGoalOffline(goal),
      ),
    );
  }

  private deleteGoalOffline(id: string): Observable<void> {
    this.store.remove(id);
    return of(null);
  }

  private deleteGoalOnline(id: string): Observable<void> {
    return from(this.onlineGoals.remove(id));
  }

  public deleteGoal(goal: Goal | string): Observable<void> {
    const id = typeof goal === 'string' ? goal : goal.id;
    return this.loggedIn$.pipe(
      switchMap((loggedIn) => (loggedIn ? this.deleteGoalOnline(id) : this.deleteGoalOffline(id))),
    );
  }

  private updateGoalOffline(id: string, callback: (entity: Goal) => Goal): Observable<void> {
    this.store.update(id, callback);
    return of(null);
  }

  private updateGoalOnline(id: string, callback: (entity: Goal) => Goal): Observable<void> {
    return from(this.onlineGoals.update(id, callback)).pipe(map(() => {}));
  }

  private updateGoalWithCallback(id: string, callbackFn: (entity: Goal) => Goal): Observable<void> {
    return this.handleAuthStatus<void>(
      () => this.updateGoalOnline(id, callbackFn),
      () => this.updateGoalOffline(id, callbackFn),
    );
  }

  public updateGoal(id: string, goal: Partial<Goal>): Observable<void> {
    const callbackFn = (entity: Goal) => ({ ...entity, ...goal });
    return this.updateGoalWithCallback(id, callbackFn);
  }

  public withdraw(id: string, amount: number): Observable<void> {
    const callbackFn = (entity: Goal) => ({ ...entity, saved: entity.saved - amount });
    return this.updateGoalWithCallback(id, callbackFn);
  }

  public deposit(id: string, amount: number): Observable<void> {
    const callbackFn = (entity: Goal) => ({ ...entity, saved: entity.saved + amount });
    return this.updateGoalWithCallback(id, callbackFn);
  }

  public transfer(fromId: string, toId: string, amount: number): Observable<void> {
    return zip(this.withdraw(fromId, amount), this.deposit(toId, amount)).pipe(map(() => null));
  }
}
