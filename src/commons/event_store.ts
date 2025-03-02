import { IEvent } from './events';

export class EventStore {
  private static events: IEvent[] = [];

  static save(event: IEvent): void {
    this.events.push(event);
  }

  static getHistory(): IEvent[] {
    return this.events;
  }

  static getEventsByType(type: string): IEvent[] {
    return this.events.filter(event => event.type === type);
  }
}
