import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Goal } from '@modules/goal/state/goal.model';

@Component({
  selector: 'ss-goal-card',
  templateUrl: './goal-card.component.html',
  styleUrls: ['./goal-card.component.scss'],
})
export class GoalCardComponent {
  @Input() public goal: Goal;
  @Output() public deleteClick = new EventEmitter<void>();
  @Output() public editClick = new EventEmitter<void>();
  @Output() public depositWithdrawClick = new EventEmitter<void>();
  @Output() public goalClick = new EventEmitter<void>();
  @Output() public achievedClick = new EventEmitter<void>();

  public menuClick(event: MouseEvent): void {
    event.cancelBubble = true;
  }
}
