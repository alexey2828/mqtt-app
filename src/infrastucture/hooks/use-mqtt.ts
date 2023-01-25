/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import {useEffect, useState} from 'react';
import MQTT from 'sp-react-native-mqtt';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type UseMqtt<T> = {
  msgFromServer: string;
  error: Error | null;
  onConnect: boolean;
  updateResponse: (uri: string, topic: string) => void;
  password?: string;
  userName?: string;
  clientId?: string;
};
const auth = {
  clientId: `asumq${Math.random() * 100}`,
  userName: 'asumq',
  password: 'Kj89Bvtgy%35GHlbB89(YS&vgvCA<',
};

export function useMqtt<T>(): UseMqtt<T> {
  const [msgFromServer, setMsgFromServer] = useState('{}'); //TMP VALUE
  const [error, setError] = useState<any>();
  const [onConnect, setOnConnect] = useState<boolean>(false);
  const [uri, setUri] = useState<string>('');
  const [topic, setTopic] = useState<any>('TestPent');

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const updateResponse: UseMqtt<T>['updateResponse'] = (uri: string, topic: string) => {
    setUri(uri);
    setTopic(topic);
  }

  useEffect(() => {
    MQTT.createClient({
      uri: uri,
      clientId: auth.clientId,
      auth: true,
      user: auth.userName,
      pass: auth.password,
    })
      .then(function (client) {
        client.on('closed', function () {
          console.log('mqtt.event.closed');
        });

        client.on('error', function (msg) {
          console.log('mqtt.event.error', msg);
          setError(msg);
        });

        client.on('message', function (msg) {
          console.log('axxxxxx-->', msg.data);
          console.log('mqtt.event.message', msg);
          console.log('aaaaaaa', msg.data);
          setMsgFromServer(msg.data);
        });

        client.on('connect', function () {
          console.log('connected');
          console.log('uuuuuuiuuuuuu', topic);
          setOnConnect(true);
          client.subscribe(topic, 0);
          client.publish(
            'android/field3',//topic
            '{"field1":"0.12", "field2":"22.4", "field3":"sssssss", "field4":"22xxxxxx"}',
            0,
            false,
          );
        });
        //setInterval(() => {
        //  console.log('This will run every second!');
        //  client.reconnect();
        //}, 150000);
        client.connect();
      })
      .catch(function (err) {
        console.log(err);
      });
     
  }, [uri, topic]);

  return {msgFromServer, error, onConnect, updateResponse};
}
//