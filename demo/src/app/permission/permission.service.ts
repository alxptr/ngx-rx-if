import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/distinctUntilChanged';

import { IAppState } from '../app.state';

@Injectable()
export class PermissionService {
  static PERMISSIONS_LOAD = "PERMISSIONS_LOAD";
  static PERMISSIONS_APPLY = "PERMISSIONS_APPLY";
  static PERMISSIONS_CLEAR = "PERMISSIONS_CLEAR";
  static PERMISSION_APPLY = "PERMISSION_APPLY";
  static PERMISSIONS_CLEAR_BY_DELAY = "PERMISSIONS_CLEAR_BY_DELAY";

  constructor(private store: Store<IAppState>) {
  }

  getPermission(value: number): Observable<boolean> {
    return this.store
      .select((state: IAppState) => state.permissions.values && state.permissions.values[value])
      .map(Boolean)
      .distinctUntilChanged();
  }

  loadPermissions(): void {
    this.store.dispatch({
      type: PermissionService.PERMISSIONS_LOAD
    });
  }
}
