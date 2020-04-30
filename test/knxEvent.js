const assert = require('assert');
const mock = require('mock-require');

class dp {
  constructor(options, connection) {
    this.dpt = {
      fromBuffer: () => 'outputToPublish',
    };
    console.log('BBBBB');
  }
}
mock('knx', {
  Datapoint: dp,
});

const knxEvent = require('../lib/knxEvents/event');

describe('KNX event', () => {
  it('return if ip Address is different from context', () => {
    const evt = {};
    const src = '1.1.1';
    const dest = '1/0/0';
    const value = '';
    let called = false;
    const context = {
      individualAddress: '1.1.2',
      ga: '1/0/0',
      mqtt: {
        publish: () => {
          called = true;
        },
      },
    };
    knxEvent.call(context, evt, src, dest, value);
    assert.strictEqual(called, false);
  });
  it('publish data if ip address and port are correct', () => {
    const evt = {};
    const src = '1.1.1';
    const dest = '1/0/0';
    const value = '';
    const payload = 'outputToPublish';
    let called = false;
    const context = {
      individualAddress: '1.1.1',
      ga: '1/0/0',
      id: 'id',
      mqtt: {
        publish: (topic, payloadParam) => {
          assert.strictEqual(topic, 'id');
          called = true;
        },
      },
    };
    knxEvent.call(context, evt, src, dest, value);
    assert.strictEqual(called, true);
  });
});
