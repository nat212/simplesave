import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { OnlineProfileStore, OnlineProfileState } from './online-profile.store';

@Injectable({ providedIn: 'root' })
export class OnlineProfileQuery extends Query<OnlineProfileState> {

  constructor(protected store: OnlineProfileStore) {
    super(store);
  }

}
