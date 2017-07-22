import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'rx-if-message',
  template: '<span class="rx-if-message">{{ message }}</span>',
  encapsulation: ViewEncapsulation.None
})
export class RxIfElseMessageComponent {

  @Input() message;

  constructor() {
  }
}
