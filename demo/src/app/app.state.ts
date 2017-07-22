import { IAppPermissionState } from './permission/permission.state';

export interface IAppState {
  readonly permissions: IAppPermissionState;
}
