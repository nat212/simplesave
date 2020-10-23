import { ChangeDetectorRef, Component, Inject, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Goal } from '@modules/goal/state/goal.model';
import { GoalQuery } from '@modules/goal/state/goal.query';
import { Observable } from 'rxjs';

export interface TransactDialogData {
  goal: Goal;
}

@Component({
  selector: 'ss-transact-dialog',
  templateUrl: './transact-dialog.component.html',
  styleUrls: ['./transact-dialog.component.scss'],
})
export class TransactDialogComponent implements OnInit {
  public goals$: Observable<Goal[]>;
  public transactForm: FormGroup;

  constructor(
    private goalQuery: GoalQuery,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: TransactDialogData,
    private cdRef: ChangeDetectorRef,
  ) {}

  public ngOnInit(): void {
    this.goals$ = this.goalQuery.selectAll();
    this.transactForm = this.formBuilder.group({
      type: ['deposit', Validators.required],
      amount: [null, Validators.required],
      toGoal: [null],
    });
    this.transactForm.get('type').valueChanges.subscribe((value) => {
      if (value === 'transfer') {
        this.transactForm.get('toGoal').setValidators([Validators.required]);
        this.transactForm.get('toGoal').updateValueAndValidity();
      } else {
        this.transactForm.get('toGoal').clearValidators();
        this.transactForm.get('toGoal').setValue(null);
        this.transactForm.get('toGoal').markAsUntouched();
        this.transactForm.get('toGoal').updateValueAndValidity();
      }
      this.cdRef.markForCheck();
    });
  }
}
