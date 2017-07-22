import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { RxIfModule } from 'ngx-rx-if';

import { permissionReducer } from './permission/permission.reducer';
import { PermissionService } from './permission/permission.service';
import { PermissionEffects } from './permission/permission.effects';

import { AppComponent } from './app.component';
import { PermissionElseMessageComponent } from './permission/permission-else-message.component';

@NgModule({
  declarations: [
    AppComponent,
    PermissionElseMessageComponent
  ],
  entryComponents: [
    PermissionElseMessageComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.provideStore({
      permissions: permissionReducer,
    }),
    RxIfModule.forRoot(),
    EffectsModule.run(PermissionEffects),
    StoreDevtoolsModule.instrumentOnlyWithExtension({
      maxAge: 1000
    })
  ],
  providers: [PermissionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
