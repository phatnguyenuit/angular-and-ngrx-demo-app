import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Attendee } from './models';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const attendees: Attendee[] = [
      {
        id: 1,
        name: 'Fast Nguyen',
        isAttending: true,
        guests: 0,
      },
      {
        id: 2,
        name: 'Nguyen Tran',
        isAttending: true,
        guests: 1,
      },
      {
        id: 3,
        name: 'Phat Do',
        isAttending: true,
        guests: 2,
      },
    ];
    return { attendees };
  }
}
