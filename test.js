const mqtt = require('mqtt');

async function test() {
  const client = await mqtt.connect('mqtt://localhost');
  await client.subscribe('knx2mqtt/bridge/log');
  client.on('message', (topic, message) => {
    console.log(topic, message.toString());
  });
  console.log('connected');
  const payload = {
    id: 'xfwog',
    individual_address: '1.1.1',
    ga: '1/0/0',
    dpt: 'DPT9.004',
  };
  await client.publish('knx2mqtt/configure/set', JSON.stringify(payload));
  console.log('PUBLISHED');
  // const id = 'xfwog';
  // await client.publish('knx2mqtt/bridge/config/force_remove', id);
  // console.log('published');
}

test();
