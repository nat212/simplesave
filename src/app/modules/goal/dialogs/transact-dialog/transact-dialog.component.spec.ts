import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactDialogComponent } from './transact-dialog.component';

describe('TransactDialogComponent', () => {
  let component: TransactDialogComponent;
  let fixture: ComponentFixture<TransactDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransactDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
