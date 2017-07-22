import { Component, Input } from '@angular/core';
import { IElseMessageComponent } from 'ngx-rx-if';

@Component({
  selector: 'permission-else-message',
  template: '<span style="color: blue;">The view &laquo;{{ ctx.view }}&raquo; is not accessible because user has no {{ ctx.permission }} permission.</span>'
})
export class PermissionElseMessageComponent implements IElseMessageComponent {

  @Input() ctx;

  constructor() {
  }
}
