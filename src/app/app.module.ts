import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

import { extModules } from '../build-specifics/index';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { reducersMap } from './state/root.reducer';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(reducersMap),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot(),
    extModules,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
