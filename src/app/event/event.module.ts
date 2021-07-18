import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { EventService } from './services/event.service';
import { InMemoryDataService } from './InMemoryDataService';
import { EventRoutingModule } from './event-routing.module';
import { EventComponent } from './event.component';
import { AddAttendeeComponent } from './components/add-attendee/add-attendee.component';
import { EventListComponent } from './components/event-list/event-list.component';

@NgModule({
  declarations: [EventComponent, AddAttendeeComponent, EventListComponent],
  imports: [
    CommonModule,
    EventRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forFeature(InMemoryDataService, {
      delay: 300,
    }),
  ],
  providers: [EventService],
})
export class EventModule {}
