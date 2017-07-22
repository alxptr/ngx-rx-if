export interface IAppPermissions {
  [index: number]: boolean;
}

export interface IAppPermissionState {
  loading: boolean;
  values: IAppPermissions;
}
