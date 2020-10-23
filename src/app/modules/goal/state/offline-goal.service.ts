import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { tap } from 'rxjs/operators';
import { OfflineGoal } from './offline-goal.model';
import { OfflineGoalStore } from './offline-goal.store';

@Injectable({ providedIn: 'root' })
export class OfflineGoalService {
  constructor(private offlineGoalStore: OfflineGoalStore, private http: HttpClient) {}

  get() {
    return this.http.get<OfflineGoal[]>('https://api.com').pipe(
      tap((entities) => {
        this.offlineGoalStore.set(entities);
      }),
    );
  }

  add(offlineGoal: OfflineGoal) {
    this.offlineGoalStore.add(offlineGoal);
  }

  update(id, offlineGoal: Partial<OfflineGoal>) {
    this.offlineGoalStore.update(id, offlineGoal);
  }

  remove(id: ID) {
    this.offlineGoalStore.remove(id);
  }
}
