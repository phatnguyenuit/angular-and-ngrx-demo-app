import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Attendee } from './models';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const attendees: Attendee[] = [
      {
        id: 1,
        name: 'Fast In Memory',
        attending: true,
        guests: 0,
      },
    ];
    return { attendees };
  }
}
