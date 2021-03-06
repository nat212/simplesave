import { Injectable } from '@angular/core';
import { CollectionConfig, FireAuthService } from 'akita-ng-fire';
import { AuthState, AuthStore } from './auth.store';

@Injectable({ providedIn: 'root' })
@CollectionConfig({ path: 'users' })
export class AuthService extends FireAuthService<AuthState> {
  public userId: string;
  constructor(store: AuthStore) {
    super(store);
    this.auth.authState.subscribe((authState) => {
      this.userId = authState?.uid;
    });
  }
}
