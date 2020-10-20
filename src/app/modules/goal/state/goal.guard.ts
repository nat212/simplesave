import { Injectable } from '@angular/core';
import { DocumentChangeAction } from '@angular/fire/firestore';
import { CollectionGuard } from 'akita-ng-fire';
import { Observable } from 'rxjs';
import { Goal } from './goal.model';
import { GoalService } from './goal.service';
import { GoalState } from './goal.store';
import { OnlineGoalService } from './online-goal.service';

@Injectable({ providedIn: 'root' })
export class GoalGuard extends CollectionGuard<GoalState> {
  constructor(protected service: OnlineGoalService, private goalService: GoalService) {
    super(service);
  }

  public sync(): Observable<DocumentChangeAction<Goal>[] | boolean> {
    return this.goalService.syncOnline();
  }
}
