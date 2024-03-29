#!/bin/sh

if [ ! -z "$KNX2MQTT_DATA" ]; then
    DATA="$KNX2MQTT_DATA"
else
    DATA="/app/data"
fi

echo "Using '$DATA' as data directory"

if [ ! -f "$DATA/configuration.yaml" ]; then
    echo "Creating configuration file..."
    cp /app/configuration.yaml "$DATA/configuration.yaml"
fi

exec npm start
