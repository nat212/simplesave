import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface OnlineProfileState {
  key: string;
}

export function createInitialState(): OnlineProfileState {
  return {
    key: '',
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'online-profile' })
export class OnlineProfileStore extends Store<OnlineProfileState> {
  constructor() {
    super(createInitialState());
  }
}
