import * as DomainEvents from './DomainEvents';

describe('DomainEvents', () => {
  class MyAggregate {}

  afterEach(() => {
    DomainEvents.clearEventsForAggregate(MyAggregate);
    jest.resetAllMocks();
  });

  it('should add event but not trigger it', () => {
    const fn = jest.fn();
    DomainEvents.listenToEvent('MY_EVENT', fn);

    DomainEvents.addDomainEvent(MyAggregate, 'MY_EVENT', 'siema');
    expect(fn).not.toHaveBeenCalled();
  });

  it('should trigger event ', () => {
    const fn = jest.fn();
    DomainEvents.listenToEvent('MY_EVENT', fn);

    DomainEvents.addDomainEvent(MyAggregate, 'MY_EVENT', 'siema');
    DomainEvents.dispatchEventsForAggregate(MyAggregate);
    expect(fn).toHaveBeenCalledWith('MY_EVENT', 'siema');
  });

  it('should trigger all events ', () => {
    const fn1 = jest.fn();
    const fn2 = jest.fn();
    const fn3 = jest.fn();
    DomainEvents.listenToEvent('MY_EVENT1', fn1);
    DomainEvents.listenToEvent('MY_EVENT2', fn2);
    DomainEvents.listenToEvent('MY_EVENT3', fn3);
    DomainEvents.addDomainEvent(MyAggregate, 'MY_EVENT1', '1');
    DomainEvents.addDomainEvent(MyAggregate, 'MY_EVENT2', '2');
    DomainEvents.addDomainEvent(MyAggregate, 'MY_EVENT3', '3');

    DomainEvents.dispatchEventsForAggregate(MyAggregate);

    expect(fn1).toHaveBeenCalledWith('MY_EVENT1', '1');
    expect(fn2).toHaveBeenCalledWith('MY_EVENT2', '2');
    expect(fn3).toHaveBeenCalledWith('MY_EVENT3', '3');
  });

  it('should trigger the same event multiple times', () => {
    const fn = jest.fn();
    DomainEvents.listenToEvent('MY_EVENT', fn);
    DomainEvents.addDomainEvent(MyAggregate, 'MY_EVENT', '1');
    DomainEvents.addDomainEvent(MyAggregate, 'MY_EVENT', '2');
    DomainEvents.addDomainEvent(MyAggregate, 'MY_EVENT', '3');

    DomainEvents.dispatchEventsForAggregate(MyAggregate);

    expect(fn).toHaveBeenCalledTimes(3);
    expect(fn).toHaveBeenCalledWith('MY_EVENT', '1');
    expect(fn).toHaveBeenCalledWith('MY_EVENT', '2');
    expect(fn).toHaveBeenCalledWith('MY_EVENT', '3');
  });

  it('should trigger the same event only once', () => {
    const fn = jest.fn();
    DomainEvents.listenToEvent('MY_EVENT', fn);
    DomainEvents.addDomainEvent(MyAggregate, 'MY_EVENT', '1');

    DomainEvents.dispatchEventsForAggregate(MyAggregate);
    DomainEvents.dispatchEventsForAggregate(MyAggregate);
    DomainEvents.dispatchEventsForAggregate(MyAggregate);

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should trigger only events for given aggregate', () => {
    class MyOtherAggregate {}

    const fn1 = jest.fn();
    DomainEvents.listenToEvent('MY_EVENT', fn1);
    DomainEvents.listenToEvent('MY_EVENT2', fn1);
    DomainEvents.addDomainEvent(MyAggregate, 'MY_EVENT', '1');
  });
});
