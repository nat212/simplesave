import { ApplicationRef, Injectable } from '@angular/core';
import { SwUpdate, UpdateAvailableEvent } from '@angular/service-worker';
import { concat, interval, Observable } from 'rxjs';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UpdateService {
  private readonly updateCheckIntervalSeconds = 30;
  public updatesAvailable$: Observable<UpdateAvailableEvent>;

  constructor(private update: SwUpdate, private appRef: ApplicationRef) {
    this.updatesAvailable$ = this.update.available.pipe(first((u) => !!u));
  }

  public subscribe(): void {
    const appIsStable$ = this.appRef.isStable.pipe(first((stable) => stable));
    const checkInterval$ = interval(this.updateCheckIntervalSeconds * 1000);
    concat(appIsStable$, checkInterval$).subscribe(() => this.update.checkForUpdate());
  }

  public activateUpdate(): void {
    this.update.activateUpdate().then(() => document.location.reload());
  }
}
