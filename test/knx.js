const assert = require('assert');
const mock = require('mock-require');

mock('knx', {
  Connection: (options) => {
    options.handlers.connected();
  },
});
const KNX = require('../lib/knx');

describe('KNX class', () => {
  const mqtt = 'mqtt';
  const knx = {
    ip_address: 'ipAddress',
    port: '3671',
  };
  const device = {
    id: 'id',
    dpt: 'DataPointType',
    individualAddress: 'iAddress',
    groupAddress: 'ga',
  };

  it('should init constructor parameters correctly', () => {
    const instance = new KNX(mqtt, knx, device);
    assert.strictEqual(instance.mqtt, mqtt);
    assert.strictEqual(instance.knx, knx);
    assert.strictEqual(instance.dpt, device.dpt);
    assert.strictEqual(instance.individualAddress, device.individualAddress);
    assert.strictEqual(instance.ga, device.groupAddress);
  });

  it('start method: resolved promise on knx connection', async () => {
    const instance = new KNX(mqtt, knx, device);
    await instance.start();
  });
});
