import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { PermissionService } from './permission/permission.service';
import { PermissionElseMessageComponent } from './permission/permission-else-message.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  get permission4487(): Observable<boolean> {
    return this.permissionService.getPermission(4487);
  }

  constructor(private permissionService: PermissionService) {
  }

  messageCmp = PermissionElseMessageComponent;

  load(): void {
    this.permissionService.loadPermissions();
  }
}
