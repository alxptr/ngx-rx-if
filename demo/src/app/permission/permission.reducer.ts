import { Action } from '@ngrx/store';

import { IAppPermissionState } from './permission.state';
import { PermissionService } from './permission.service';

const DEFAULT_STATE: IAppPermissionState = {
  loading: false,
  values: null
};

export function permissionReducer(state = DEFAULT_STATE, action: Action): IAppPermissionState {
  switch (action.type) {
    case PermissionService.PERMISSIONS_APPLY:
      return {
        ...state,
        values: action.payload
      };
    case PermissionService.PERMISSION_APPLY:
      return {
        ...state,
        values: {
          ...state.values,
          [action.payload.permission]: action.payload.hasPermission
        }
      };
    case PermissionService.PERMISSIONS_CLEAR:
      return {
        ...state,
        values: null
      };
    default:
      return state;
  }
}
