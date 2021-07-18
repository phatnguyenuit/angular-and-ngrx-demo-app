import { ModuleWithProviders, Type } from '@angular/core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

export const extModules: Array<Type<any> | ModuleWithProviders<{}> | any[]> = [
  StoreDevtoolsModule.instrument({
    name: 'Angular NgRx App',
    maxAge: 25,
  }),
];

// Reference: https://ngrx.io/guide/store-devtools/recipes/exclude
