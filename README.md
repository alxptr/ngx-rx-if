# ngx-rx-if

An implementation of conditional reactive directive based on @ngrx/store (Redux) [Angular 4.3.1 compatible].

## Installation

```sh
npm install ngx-rx-if --save
```

```typescript
import { RxIfModule } from 'ngx-rx-if';

@NgModule({
    imports: [
        ...,
        RxIfModule.forRoot(),
    ]
})
```

## Usage

```html
<button (click)="load()">Load permissions</button>

<ng-container *rxIf="{ bindTo: 'permissions.values.4487', elseMsgCmp: messageCmp, elseMsgCmpCtx: { view: 'View1', permission: '4487' } }">
	<div>
		View1
	</div>
</ng-container>

<ng-container *rxIf="{ bindTo: 'permissions.values.4489', elseMsg: 'The view &laquo;View2&raquo; is not accessible because user has no 4489 permission.' }">
	<div>
		View2
	</div>
</ng-container>
```

```typescript
...
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  ...
  messageCmp = PermissionElseMessageComponent;
  load(): void {
    this.permissionService.loadPermissions();
  }
}
```

```typescript
...
@Injectable()
export class PermissionEffects {
  ...
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
```

```typescript
@Injectable()
export class PermissionService {
  ...
  loadPermissions(): void {
    this.store.dispatch({
      type: PermissionService.PERMISSIONS_LOAD
    });
  }
}
```

```typescript
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
```

## Demo

[Live demo](https://apoterenko.github.io/ngx-rx-if)  
1. Based on angular-cli  
2. npm run build -- -prod  

## Preview

![state1](preview/state1.png)  
![state2](preview/state2.png)  

## License

Licensed under MIT.