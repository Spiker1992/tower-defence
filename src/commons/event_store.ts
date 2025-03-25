import { IEvent } from './events';

export class EventStore {
  private static events: IEvent[] = [];

  static save(event: IEvent): void {
    this.events.push(event);

    window.dispatchEvent(new CustomEvent(event.type, { detail: event }))
  }

  static getHistory(): IEvent[] {
    return this.events;
  }

  static getEventsByType(type: string): IEvent[] {
    return this.events.filter(event => event.type === type);
  }
}
