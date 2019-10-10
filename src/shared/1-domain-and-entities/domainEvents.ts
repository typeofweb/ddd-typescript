import { EventEmitter } from 'event-emitter3';

const DomainEventsHub = new EventEmitter();

type EventBase<EventName extends string, Value> = {
  type: EventName;
  value: Value;
};

interface Aggregate {
  new (...args: any): any;
}

const eventsByAggregate = new Map<Aggregate, EventBase<any, any>[]>();

export function addDomainEvent<Event extends EventBase<any, any>>(
  aggregate: Aggregate,
  eventName: Event['type'],
  value: Event['value'],
): void {
  const events = getEventsForAggregate(aggregate);
  const newEvents = [...events, { type: eventName, value }];
  eventsByAggregate.set(aggregate, newEvents);
}

export function dispatchEventsForAggregate(aggregate: Aggregate) {
  getEventsForAggregate(aggregate).forEach(e => {
    DomainEventsHub.emit(e.type, e.value);
  });
  clearEventsForAggregate(aggregate);
}

export function getEventsForAggregate(aggregate: Aggregate) {
  if (!eventsByAggregate.has(aggregate)) {
    return [];
  }
  return eventsByAggregate.get(aggregate)!;
}

export function clearEventsForAggregate(aggregate: Aggregate) {
  eventsByAggregate.set(aggregate, []);
}

export function listenToEvent<Event extends EventBase<any, any>>(
  eventName: Event['type'],
  handler: (eventName: Event['type'], value: Event['value']) => any,
): void {
  DomainEventsHub.on(eventName, data => handler(eventName, data));
}
