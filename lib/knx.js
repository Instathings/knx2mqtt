const knxLib = require('knx');
const events = require('events');

const logger = require('./util/logger');

class Knx extends events.EventEmitter {
  constructor(mqtt, knx, device) {
    super();
    this.mqtt = mqtt;
    this.ts = new Date().getTime();
    this.knx = knx;
    this.id = device.id;
    this.dpt = device.dpt;
    this.individualAddress = device.individualAddress;
    this.ga = device.groupAddress;
  }

  start() {
    const promise = new Promise((resolve, reject) => {
      this.knxConnection = knxLib.Connection({
        ipAddr: this.knx.ip_address,
        ipPort: this.knx.port,
        handlers: {
          connected: () => {
            logger.info('Connected to knxd!');
            resolve();
          },
          event: (evt, src, dest, value) => {
            if (src !== this.individualAddress || dest !== this.ga) {
              return;
            }
            const dp = new knxLib.Datapoint({ ga: this.ga, dpt: this.dpt }, this.knxConnection);
            const data = dp.dpt.fromBuffer(value, this.knx.dpt);
            const result = { data };
            const payload = JSON.stringify(result);
            const topic = `${this.id}`;
            this.mqtt.publish(topic, payload);
          },
          error: (connstatus) => {
            logger.error('**** ERROR: %j', connstatus);
            reject();
          },
        },
      });
    });
    return promise;
  }

  remove() {
    const promise = new Promise((resolve, reject) => {
      this.knxConnection.Disconnect();
      this.knxConnection.on('disconnected', () => {
        logger.info('Disconnected from knxd');
        resolve();
      });
    });
    return promise;
  }
}

module.exports = Knx;
