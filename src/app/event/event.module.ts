import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { EventComponent } from './event.component';
import { EventRoutingModule } from './event-routing.module';
import { InMemoryDataService } from './InMemoryDataService';
import { EventService } from './services/event.service';
import { reducersMap, effects } from './state';
import { AddAttendeeComponent } from './components/add-attendee/add-attendee.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { AttendeeComponent } from './components/attendee/attendee.component';

@NgModule({
  declarations: [
    EventComponent,
    AddAttendeeComponent,
    EventListComponent,
    AttendeeComponent,
  ],
  imports: [
    CommonModule,
    EventRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forFeature(InMemoryDataService, {
      delay: 300,
    }),
    StoreModule.forFeature('event', reducersMap),
    EffectsModule.forFeature(effects),
  ],
  providers: [EventService],
})
export class EventModule {}
