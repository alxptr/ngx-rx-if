import { NgModule, ModuleWithProviders } from '@angular/core';

import { RxIfDirective } from './rx-if.directive';

@NgModule({
  declarations: [
    RxIfDirective
  ]
})
export class RxIfModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: RxIfModule
    };
  }
}
