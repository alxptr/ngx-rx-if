import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';

import { PermissionService } from './permission.service';
import { IAppPermissions } from './permission.state';

@Injectable()
export class PermissionEffects {

  constructor(private actions: Actions) {}

  @Effect()
  loadPermissionsEffect = this.actions
    .ofType(PermissionService.PERMISSIONS_LOAD)
    .switchMap(_ => this.loadPermissions()
        .mergeMap((permissions: IAppPermissions) => ([
          {
            type: PermissionService.PERMISSIONS_APPLY,
            payload: permissions
          },
          {
            type: PermissionService.PERMISSIONS_CLEAR_BY_DELAY
          }
        ]))
    );

  @Effect()
  clearPermissionsByDelayEffect = this.actions
    .ofType(PermissionService.PERMISSIONS_CLEAR_BY_DELAY)
    .switchMap(_ => this.clearPermissionsByDelay()
      .map(_ => ({
        type: PermissionService.PERMISSIONS_CLEAR
      }))
    );

  private loadPermissions(): Observable<IAppPermissions> {
    return Observable.of({
      4487: true,
      4488: false,
      4489: true
    }).delay(1000);
  }

  private clearPermissionsByDelay(): Observable<boolean> {
    return Observable.of(true).delay(3000);
  }
}
