const knxLib = require('knx');

module.exports = function event(evt, src, dest, value) {
  if (src !== this.individualAddress || dest !== this.ga) {
    return;
  }
  console.log('AAA');
  const dp = new knxLib.Datapoint({ ga: this.ga, dpt: this.dpt }, this.knxConnection);
  console.log('=====', dp.dpt.fromBuffer);
  const data = dp.dpt.fromBuffer(value, this.knx.dpt);
  const result = { data };
  const payload = JSON.stringify(result);
  const topic = `${this.id}`;
  this.mqtt.publish(topic, payload);
};
