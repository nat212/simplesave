import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { OnlineProfileStore } from './online-profile.store';

@Injectable({ providedIn: 'root' })
export class OnlineProfileService {

  constructor(private onlineProfileStore: OnlineProfileStore, private http: HttpClient) {
  }


}
