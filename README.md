# knx2mqtt - software layer to abstract KNX protocol

## Configuration

To start the knx2mqtt service you will need a `configuration.yaml` in the `data` folder.

### configuration.yaml

Minimal configuration looks like this:

```
mqtt:
  base_topic: knx2mqtt
  server: 'mqtt://localhost'
knx:
  ip_address: 192.168.1.145
  port: 3671
advanced:
  log_output:
    - console
```

## Topics

### Add a new KNX device

#### knx2mqtt/configure/set

Payload:
- id: a unique string for you
- individual_address: the configured Individual Address of your KNX device,
- group_address: the Group Address your device send data to
- dpt: the Data Point Type of your device. For the supported DPTs please refer to [knx.js](https://bitbucket.org/ekarak/knx.js/src/master/README-datapoints.md)

```
{
    id: 'uniqueStringId',
    individual_address: '1.1.1',
    group_address: '1/0/0',
    dpt: 'DPT9.004',
}
```

### Remove a KNX device

#### knx2mqtt/bridge/config/force_remove

Payload:
- id: the id of the device to remove

This payload must be sent as a string not as a JSON object.

### Read data of a device

#### knx2mqtt/:id

You can subscribe to this topic in order to receive data from the device.

### Log

### knx2mqtt/bridge/log

In this topic are sent:
- ack of a new connected device 
```
{
  type: 'device_connected', 
  message: {
    friendly_name: 'uniqueStringId'
  }
}
```
- ack of a force removed device 
```
{ 
  type: 'device_force_removed', 
  message: 'uniqueStringId'
}
```

### Acknowledgments

This work relies on the awesome [knx.js](https://bitbucket.org/ekarak/knx.js/src/master/) library

This work is inspired from the awesome work of [Zigbee2MQTT](https://github.com/Koenkk/zigbee2mqtt).

### License
knx2mqtt is [fair-code](https://faircode.io/) licensed under [**Apache 2.0 with Commons Clause**](https://github.com/Instathings/knx2mqtt/blob/master/LICENSE.md)

