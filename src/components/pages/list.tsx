/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  Image,
  Button,
  ScrollView,
  Dimensions,
} from 'react-native';
import Modal from 'react-native-modal';
import { LineChart } from 'react-native-chart-kit';

//import { BarChart, LineChart, PieChart } from 'react-native-gifted-charts';

export interface IMqttData { data: any, error: any, onConnect: any }

export const ListPage: React.FC<IMqttData> = ({data, error, onConnect}: IMqttData) => {

//const {msgFromServer, error, onConnect, updateResponse} = useMqtt<any>();
const jsonFromServer = data;



const [isModalGraphics, setModalGraphics] = useState(false);

const toggleModalGraphics = (): void => {
  setModalGraphics(!isModalGraphics);
};

const listCategory1 = [
  {
    id: 1,
    title: 'T1 з котла 1',
    value: Math.round(10 * jsonFromServer?.d?.T1) / 10,
  },
  {
    id: 2,
    title: 'T2 з котла 2',
    value: Math.round(10 * jsonFromServer?.d?.T2) / 10,
  },
  {
    id: 3,
    title: 'T3 з котлів',
    value: Math.round(10 * jsonFromServer?.d?.T3) / 10,
  },
  {
    id: 4,
    title: 'T4 обр. з підж.',
    value: Math.round(10 * jsonFromServer?.d?.T4) / 10,
  },
  {
    id: 5,
    title: 'T5 з котлів',
    value: Math.round(10 * jsonFromServer?.d?.T5) / 10,
  },
  {
    id: 6,
    title: 'T6 ближн.',
    value: Math.round(10 * jsonFromServer?.d?.T6) / 10,
  },
  {
    id: 7,
    title: 'T7 П. 1 ближ. К',
    value: Math.round(10 * jsonFromServer?.d?.T7) / 10,
  },
  {
    id: 8,
    title: 'T8 Опал. Водопост. 2345',
    value: Math.round(10 * jsonFromServer?.d?.T8) / 10,
  },
  {
    id: 9,
    title: 'T9 дальній К 234',
    value: Math.round(10 * jsonFromServer?.d?.T9) / 10,
  },
  {
    id: 10,
    title: 'T10 Опал. котельн',
    value: Math.round(10 * jsonFromServer?.d?.T10) / 10,
  },
  {
    id: 11,
    title: 'T11 П. 1, дальн. К',
    value: Math.round(10 * jsonFromServer?.d?.T11) / 10,
  },
  {
    id: 12,
    title: 'T12 Загал. обр',
    value: Math.round(10 * jsonFromServer?.d?.T12) / 10,
  },
  {
    id: 13,
    title: 'T13 Підживл. вода',
    value: Math.round(10 * jsonFromServer?.d?.T13) / 10,
  },
  {
    id: 14,
    title: 'T14 Повітря',
    value: Math.round(10 * jsonFromServer?.d?.T14) / 10,
  },
  {
    id: 15,
    title: 'T15 Поверх 1',
    value: Math.round(10 * jsonFromServer?.d?.T15) / 10,
  },
  {
    id: 16,
    title: 'T16 Поверх 2',
    value: Math.round(10 * jsonFromServer?.d?.T16) / 10,
  },
  {
    id: 17,
    title: 'T17 Поверх 5',
    value: Math.round(10 * jsonFromServer?.d?.T17) / 10,
  },
  {
    id: 18,
    title: 'T18 Душова',
    value: Math.round(10 * jsonFromServer?.d?.T18) / 10,
  },
];

const listCategory2 = [
  {
    id: 1,
    title: 'P1 подачі тепл',
    value: Math.round(10 * jsonFromServer?.d?.P1) / 10,
  },
  {
    id: 2,
    title: 'P2 після циркул. н',
    value: Math.round(10 * jsonFromServer?.d?.P2) / 10,
  },
  {
    id: 3,
    title: 'P3 звор. колектор',
    value: Math.round(10 * jsonFromServer?.d?.P3) / 10,
  },
  {
    id: 4,
    title: 'P4 обр. піджив',
    value: Math.round(10 * jsonFromServer?.d?.P4) / 10,
  },
];

return (
    <View style={{margin: 5, backgroundColor: '#242424', borderRadius: 10, height: '87%'}}>
        <View style={{margin: 15}}>
          <ScrollView style={{height: '90%'}}>
              <View style={{ display: 'flex', flexDirection: 'row' }}>
                <View>
                  <Text style={{ fontSize: 20, color: 'white' }}>Категорія 1 </Text>
                  <Text style={{ color: '#a1a1a1' }}>Категорія 1</Text>
                  <View style={{ display: 'flex', flexDirection: 'row', marginTop: 10 }}>
                    <View
                      style={{
                        width: '100%',
                        borderColor: '#333334',
                        borderWidth: 1,
                        marginTop: 15,
                        marginRight: -5,
                      }}
                    >
                      {listCategory1.map((item)=> {
                        return (
                          <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}} key={item.id}>
                            <Text style={{ color: 'white', margin: 10, fontSize: 16 }}>
                            {item.title ? item.title :
                              <Text style={{ color: '#a1a1a1', margin: 10, fontSize: 20 }}>...</Text>
                            }:</Text>
                            <Text style={{ color: '#a1a1a1', fontSize: 16, marginRight: 15, marginTop: 10}}> {item.value ? item.value :
                              <Text style={{ color: '#a1a1a1', margin: 10, fontSize: 20 }}>...</Text>
                            }</Text>
                          </View>
                        );
                      })}
                    </View>
                  </View>
                </View>
              </View>

              <View style={{ display: 'flex', flexDirection: 'row' }}>
                <View>
                  <Text style={{ fontSize: 20, color: 'white', marginTop: 20 }}>Категорія 2</Text>
                  <Text style={{ color: '#a1a1a1' }}>Категорія 2</Text>
                  <View style={{ display: 'flex', flexDirection: 'row', marginTop: 10 }}>
                    <View
                      style={{
                        width: '100%',
                        borderColor: '#333334',
                        borderWidth: 1,
                        marginTop: 15,
                        marginRight: -5,
                      }}
                    >
                      {listCategory2.map((item)=> {
                        return (
                          <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}} key={item.id}>
                            <Text style={{ color: 'white', margin: 10, fontSize: 16 }}>
                            {item.title ? item.title :
                              <Text style={{ color: '#a1a1a1', margin: 10, fontSize: 20 }}>...</Text>
                            }:</Text>
                            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Text style={{ color: '#a1a1a1', fontSize: 16, marginRight: 15, marginTop: 10}}> {item.value ? item.value :
                              <Text style={{ color: '#a1a1a1', margin: 10, fontSize: 20 }}>...</Text>
                            }</Text>
                            <TouchableHighlight
                              onPress={(): void => {
                                setModalGraphics(true);
                              }}>
                              <View
                                style={{
                                  width: '100%',
                                  borderColor: '#333334',
                                  borderWidth: 1,
                                  borderRadius: 50,
                                }}>
                                <Text style={{color: '#a1a1a1', margin: 10, fontSize: 20}}>
                                  ...
                                </Text>
                              </View>
                              </TouchableHighlight>
                            </View>
                          </View>
                        );
                      })}
                    </View>
                  </View>
                </View>
              </View>
            </ScrollView>
            <Modal
            animationInTiming={200}
            animationOutTiming={200}
            onBackdropPress={toggleModalGraphics}
            isVisible={isModalGraphics}>
            <View style={{backgroundColor: '#242424', borderRadius: 10}}>
              <View style={{margin: 10}}>
              <Text style={{ fontSize: 20, color: 'white' }}>Графік </Text>
                <View
                  style={{
                    width: '100%',
                    borderColor: '#333334',
                    borderWidth: 1,
                    marginTop: 15,
                    marginRight: -5,
                  }}
                   >
                    <LineChart
                          data={{
                            labels: ['January', 'February', 'March', 'April', 'May', 'June'],
                            datasets: [
                              {
                                data: [20, 45, 28, -80, 99, 43],
                              },
                            ],
                          }}
                          width={Dimensions.get('window').width - 50} // from react-native
                          height={220}
                          chartConfig={{
                            backgroundColor: '#e26a00',
                            backgroundGradientFrom: '#fb8c00',
                            backgroundGradientTo: '#ffa726',
                            decimalPlaces: 2, // optional, defaults to 2dp
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            style: {
                              borderRadius: 16,
                            },
                          }}
                          bezier
                          style={{
                            marginVertical: 8,
                            borderRadius: 16,
                          }}
                        />
                </View>
              </View>

            </View>

          </Modal>
        </View>
    </View>
  );
};


//<TouchableHighlight
//onPress={(): void => {
//  setModalGraphics(true);
//  navigation.navigate('Graph', { item: 'ww' });
//}}>
//<View
//  style={{
//    width: '100%',
//    borderColor: '#333334',
//    borderWidth: 1,
//    borderRadius: 50,
//  }}>
//  <Text style={{color: '#a1a1a1', margin: 10, fontSize: 20}}>
//    ...
//  </Text>
//</View>
//</TouchableHighlight>
