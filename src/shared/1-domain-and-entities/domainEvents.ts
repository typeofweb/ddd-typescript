import { EventEmitter } from 'event-emitter3';

const DomainEventsHub = new EventEmitter();

type EventBase<EventName extends string, Value> = {
  type: EventName;
  value: Value;
};

export function addDomainEvent<Event extends EventBase<any, any>>(
  eventName: Event['type'],
  value: Event['value'],
): void {
  DomainEventsHub.emit(eventName, value);
}

export function listenToEvent<Event extends EventBase<any, any>>(
  eventName: Event['type'],
  handler: (eventName: Event['type'], value: Event['value']) => any,
): void {
  DomainEventsHub.on(eventName, data => handler(eventName, data));
}
