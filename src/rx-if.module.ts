import { NgModule, ModuleWithProviders } from '@angular/core';

import { RxIfDirective } from './rx-if.directive';
import { RxIfElseMessageComponent } from './rx-if-else-message.component';

@NgModule({
  declarations: [
    RxIfDirective,
    RxIfElseMessageComponent,
  ],
  entryComponents: [
    RxIfElseMessageComponent,
  ],
  exports: [
    RxIfDirective,
  ]
})
export class RxIfModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: RxIfModule
    };
  }
}
