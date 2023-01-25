/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import { SetStateAction, useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  Image,
  Button,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import SwitchToggle from 'react-native-switch-toggle';
import {RadioButtonProps} from 'react-native-radio-buttons-group';
import AnimatedColorView from 'react-native-animated-colors';
import { IMqttData } from './list';

export const BoilersPage: React.FC<IMqttData> = ({data, error, onConnect}: IMqttData) => {
  const jsonFromServer = data;
  const [heatingToggle, setHeatingToggle] = useState(true);
  const [accidentToggle, setAccidentToggle] = useState(true);
  const [manageModHeatingRadio, setManageModHeatingRadio] = useState(0);

  const useRadioState2 = (initialCheck = false) => {
    const [checked, setChecked] = useState(initialCheck);
    return { checked, onChange: setChecked };
  };

  const [isModalVisibleStateHeat, setModalVisibleStateHeat] = useState(false);

  const toggleModalStateHeat = (): void => {
    setModalVisibleStateHeat(!isModalVisibleStateHeat);
  };

  const [isModalVisibleWaterSupply, setModalVisibleWaterSupply] = useState(false);

  const toggleModalWaterSupply = (): void => {
    setModalVisibleWaterSupply(!isModalVisibleWaterSupply);
  };

  const [isModalVisibleTenOne, setModalVisibleTenOne] = useState(false);

  const toggleModalTenOne = (): void => {
    setModalVisibleTenOne(!isModalVisibleTenOne);
  };

  const [isModalVisibleTenTwo, setModalVisibleTenTwo] = useState(false);

  const toggleModalTenTwo = (): void => {
    setModalVisibleTenTwo(!isModalVisibleTenTwo);
  };


  const [activeIndex, setindex] = useState(0);

  const radioButtonsData: RadioButtonProps[] = [{
    id: '1', // acts as primary key, should be unique and non-empty string
    label: 'ПолуАвтомат',
    value: 'option1',
    color: '#ffffff',
  }, {
    id: '2',
    label: 'Автомат',
    value: 'option2',
    color: '#ffffff',
  }];

  const [radioButtons, setRadioButtons] = useState<RadioButtonProps[]>(radioButtonsData);
  function onPressRadioButton(radioButtonsArray: RadioButtonProps[]) {
      setRadioButtons(radioButtonsArray);
  }

  return (
    <View style={{margin: 5, backgroundColor: '#242424', borderRadius: 10, height: '87%'}}>
        <View style={{margin: 15}}>
          <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <View>
            <Text style={{fontSize: 20, color: 'white'}}>
                Опалення
              </Text>
              <Text style={{color: '#a1a1a1', marginLeft: -5}}> Котли і насоси</Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
            <SwitchToggle
              switchOn={heatingToggle}
              onPress={() => {
                setHeatingToggle(!heatingToggle);
              }}
              circleColorOff="#C4C4C4"
              circleColorOn="#67E761"
              backgroundColorOn="#6D6D6D"
              backgroundColorOff="#4F4F4F"
              containerStyle={{
                marginTop: 0,
                width: 70,
                height: 38,
                borderRadius: 25,
                padding: 5,
                marginRight: 10,
              }}
              circleStyle={{
                width: 30,
                height: 30,
                borderRadius: 20,
              }}
            />
            </View>

          </View>
          <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 20}}>
            <View style={{ borderColor: jsonFromServer?.d?.TS_PH1 == 1 ? '#67E761' : '#333334', borderWidth: 1, borderRadius: 10, marginRight: 20, height: 90}}>
              <View style={{margin: 20}}>
                <Text style={{fontSize: 20, color: 'white'}}>
                  Насос 1
                </Text>
              <Text style={{color: '#a1a1a1'}}>V1, % = 43.4</Text>
              </View>
            </View>
            <View style={{ borderColor: jsonFromServer?.d?.TS_PH2 == 1 ? '#67E761' : '#333334', borderWidth: 1, borderRadius: 10, height: 90}}>
              <View style={{margin: 20}}>
                <Text style={{fontSize: 20, color: 'white' }}>
                  Насос 2
                </Text>
                <Text style={{color: '#a1a1a1'}}> V2, % = 21.9</Text>
              </View>
            </View>
          </View>

          <Text style={{fontSize: 20, color: 'white', marginTop: 20}}>
            Котел T1
          </Text>
          <Text style={{color: '#a1a1a1', marginLeft: -5}}> T1, C = 0.0</Text>
          <View style={{ borderColor: '#333334', borderWidth: 1, borderRadius: 10, marginTop: 10, backgroundColor: '#121212'}}>
          <TouchableOpacity
            onPress={(): void => {
              setModalVisibleTenTwo(true);
            }}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 10}}>
              <AnimatedColorView
                activeIndex={activeIndex}
                colors={jsonFromServer?.d?.TS_B1TN1 == 1 ? ['#67E761', 'green'] : ['#333334', '#333334']}
                duration={1500}
                loop={true}
              >
              <View style={{width: 30, height: 50, flexDirection: 'row', justifyContent: 'center' }}>
                <Text style={{fontSize: 20, color: 'white', marginTop: 20}}>
                  1
                </Text>
              </View>
              </AnimatedColorView>
              <AnimatedColorView
                activeIndex={activeIndex}
                colors={jsonFromServer?.d?.TS_B1TN2 == 1 ? ['#67E761', 'green'] : ['#333334', '#333334']}
                duration={1500}
                loop={true}
              >
              <View style={{width: 30, height: 50, flexDirection: 'row', justifyContent: 'center' }}>
                <Text style={{fontSize: 20, color: 'white', marginTop: 20}}>
                  2
                </Text>
              </View>
              </AnimatedColorView>
              <AnimatedColorView
                activeIndex={activeIndex}
                colors={jsonFromServer?.d?.TS_B1TN3 == 1 ? ['#67E761', 'green'] : ['#333334', '#333334']}
                duration={1500}
                loop={true}
              >
              <View style={{width: 30, height: 50, flexDirection: 'row', justifyContent: 'center' }}>
                <Text style={{fontSize: 20, color: 'white', marginTop: 20}}>
                  3
                </Text>
              </View>
              </AnimatedColorView>
              <AnimatedColorView
                activeIndex={activeIndex}
                colors={jsonFromServer?.d?.TS_B1TN4 == 1 ? ['#67E761', 'green'] : ['#333334', '#333334']}
                duration={1500}
                loop={true}
              >
              <View style={{width: 30, height: 50, flexDirection: 'row', justifyContent: 'center' }}>
                <Text style={{fontSize: 20, color: 'white', marginTop: 20}}>
                  4
                </Text>
              </View>
              </AnimatedColorView>
              <AnimatedColorView
                activeIndex={activeIndex}
                colors={jsonFromServer?.d?.TS_B1TN5 == 1 ? ['#67E761', 'green'] : ['#333334', '#333334']}
                duration={1500}
                loop={true}
              >
              <View style={{width: 30, height: 50, flexDirection: 'row', justifyContent: 'center' }}>
                <Text style={{fontSize: 20, color: 'white', marginTop: 20}}>
                  5
                </Text>
              </View>
              </AnimatedColorView>
              <AnimatedColorView
                activeIndex={activeIndex}
                colors={jsonFromServer?.d?.TS_B1TN6 == 1 ? ['#67E761', 'green'] : ['#333334', '#333334']}
                duration={1500}
                loop={true}
              >
              <View style={{width: 30, height: 50, flexDirection: 'row', justifyContent: 'center' }}>
                <Text style={{fontSize: 20, color: 'white', marginTop: 20}}>
                  6
                </Text>
              </View>
              </AnimatedColorView>
              <AnimatedColorView
                activeIndex={activeIndex}
                colors={jsonFromServer?.d?.TS_B1TN7 == 1 ? ['#67E761', 'green'] : ['#333334', '#333334']}
                duration={1500}
                loop={true}
              >
              <View style={{width: 30, height: 50, flexDirection: 'row', justifyContent: 'center' }}>
                <Text style={{fontSize: 20, color: 'white', marginTop: 20}}>
                  7
                </Text>
              </View>
              </AnimatedColorView>
              <AnimatedColorView
                activeIndex={activeIndex}
                colors={jsonFromServer?.d?.TS_B1TN8 == 1 ? ['#67E761', 'green'] : ['#333334', '#333334']}
                duration={1500}
                loop={true}
              >
              <View style={{width: 30, height: 50, flexDirection: 'row', justifyContent: 'center' }}>
                <Text style={{fontSize: 20, color: 'white', marginTop: 20}}>
                  8
                </Text>
              </View>
              </AnimatedColorView>
            </View>
            </TouchableOpacity>
          </View>
          <Text
            style={{fontSize: 20, color: 'white', marginTop: 20}}>
            Котел T2
          </Text>
          <Text style={{color: '#a1a1a1', marginLeft: -5}}> T2, C = 0.0</Text>
          <View style={{ borderColor: '#333334', borderWidth: 1, borderRadius: 10, marginTop: 10, backgroundColor: '#121212'}}>
          <TouchableOpacity
            onPress={(): void => {
              setModalVisibleTenOne(true);
            }}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 10}}>
            <AnimatedColorView
                activeIndex={activeIndex}
                colors={jsonFromServer?.d?.TS_B2TN1 == 1 ? ['#67E761', 'green'] : ['#333334', '#333334']}
                duration={1500}
                loop={true}
              >
              <View style={{width: 30, height: 50, flexDirection: 'row', justifyContent: 'center' }}>
                <Text style={{fontSize: 20, color: 'white', marginTop: 20}}>
                  1
                </Text>
              </View>
              </AnimatedColorView>
              <AnimatedColorView
                activeIndex={activeIndex}
                colors={jsonFromServer?.d?.TS_B2TN2 == 1 ? ['#67E761', 'green'] : ['#333334', '#333334']}
                duration={1500}
                loop={true}
              >
              <View style={{width: 30, height: 50, flexDirection: 'row', justifyContent: 'center' }}>
                <Text style={{fontSize: 20, color: 'white', marginTop: 20}}>
                  2
                </Text>
              </View>
              </AnimatedColorView>
              <AnimatedColorView
                activeIndex={activeIndex}
                colors={jsonFromServer?.d?.TS_B2TN3 == 1 ? ['#67E761', 'green'] : ['#333334', '#333334']}
                duration={1500}
                loop={true}
              >
              <View style={{width: 30, height: 50, flexDirection: 'row', justifyContent: 'center' }}>
                <Text style={{fontSize: 20, color: 'white', marginTop: 20}}>
                  3
                </Text>
              </View>
              </AnimatedColorView>
              <AnimatedColorView
                activeIndex={activeIndex}
                colors={jsonFromServer?.d?.TS_B2TN4 == 1 ? ['#67E761', 'green'] : ['#333334', '#333334']}
                duration={1500}
                loop={true}
              >
              <View style={{width: 30, height: 50, flexDirection: 'row', justifyContent: 'center' }}>
                <Text style={{fontSize: 20, color: 'white', marginTop: 20}}>
                  4
                </Text>
              </View>
              </AnimatedColorView>
              <AnimatedColorView
                activeIndex={activeIndex}
                colors={jsonFromServer?.d?.TS_B2TN5 == 1 ? ['#67E761', 'green'] : ['#333334', '#333334']}
                duration={1500}
                loop={true}
              >
              <View style={{width: 30, height: 50, flexDirection: 'row', justifyContent: 'center' }}>
                <Text style={{fontSize: 20, color: 'white', marginTop: 20}}>
                  5
                </Text>
              </View>
              </AnimatedColorView>
              <AnimatedColorView
                activeIndex={activeIndex}
                colors={jsonFromServer?.d?.TS_B2TN6 == 1 ? ['#67E761', 'green'] : ['#333334', '#333334']}
                duration={1500}
                loop={true}
              >
              <View style={{width: 30, height: 50, flexDirection: 'row', justifyContent: 'center' }}>
                <Text style={{fontSize: 20, color: 'white', marginTop: 20}}>
                  6
                </Text>
              </View>
              </AnimatedColorView>
              <AnimatedColorView
                activeIndex={activeIndex}
                colors={jsonFromServer?.d?.TS_B2TN7 == 1 ? ['#67E761', 'green'] : ['#333334', '#333334']}
                duration={1500}
                loop={true}
              >
              <View style={{width: 30, height: 50, flexDirection: 'row', justifyContent: 'center' }}>
                <Text style={{fontSize: 20, color: 'white', marginTop: 20}}>
                  7
                </Text>
              </View>
              </AnimatedColorView>
              <AnimatedColorView
                activeIndex={activeIndex}
                colors={jsonFromServer?.d?.TS_B2TN8 == 1 ? ['#67E761', 'green'] : ['#333334', '#333334']}
                duration={1500}
                loop={true}
              >
              <View style={{width: 30, height: 50, flexDirection: 'row', justifyContent: 'center' }}>
                <Text style={{fontSize: 20, color: 'white', marginTop: 20}}>
                  8
                </Text>
              </View>
              </AnimatedColorView>
            </View>
            </TouchableOpacity>
          </View>

          <TouchableHighlight
            onPress={(): void => {
              setModalVisibleWaterSupply(true);
            }}>
            <View
              style={{
                width: '100%',
                borderColor: '#333334',
                borderWidth: 1,
                borderRadius: 10,
                marginTop: 15,
                marginLeft: -5,
                marginRight: -5,
              }}>
              <Text style={{color: '#a1a1a1', margin: 10, fontSize: 20}}>
                Стан котлів системи гарячого водопостачання
              </Text>
            </View>
          </TouchableHighlight>
          <Modal
            animationInTiming={200}
            animationOutTiming={200}
            onBackdropPress={toggleModalStateHeat}
            isVisible={isModalVisibleStateHeat}>
            <View style={{backgroundColor: '#242424', borderRadius: 10}}>
              <View style={{margin: 10}}>
                <Text
                  style={{
                    color: '#ffffff',
                    fontWeight: 'bold',
                    fontSize: 20,
                    margin: 5,
                  }}>
                  Стани
                </Text>
                <Text style={{color: '#a1a1a1', marginTop: -5}}>
                  {' '}
                  Стани котлів та насосів системи опалення
                </Text>
                <View
                  style={{
                    alignSelf: 'center',
                    width: '90%',
                    height: 1,
                    backgroundColor: '#333334',
                    marginTop: 10,
                  }}
                />
                <View
                  style={{display: 'flex', flexDirection: 'row', marginTop: 10}}>
                  <View>
                    <Text style={{fontSize: 19, color: 'white', marginTop: 5}}>
                      {' '}
                      Котел 1:{' '}
                    </Text>
                    <Text style={{fontSize: 19, color: 'white', marginTop: 5}}>
                      {' '}
                      Котел 2:{' '}
                    </Text>
                    <Text style={{fontSize: 19, color: 'white', marginTop: 5}}>
                      {' '}
                      Насос 1:{' '}
                    </Text>
                    <Text style={{fontSize: 19, color: 'white', marginTop: 5}}>
                      {' '}
                      Насос 2:{' '}
                    </Text>
                  </View>
                  <View>
                    <Image
                      style={{width: 26, height: 26, marginTop: 5, marginLeft: 5}}
                      source={require('../../../public/images/unknown11.png')}
                    />
                    <Image
                      style={{width: 26, height: 26, marginTop: 5, marginLeft: 5}}
                      source={require('../../../public/images/unknown11.png')}
                    />
                    <Image
                      style={{width: 26, height: 26, marginTop: 5, marginLeft: 5}}
                      source={require('../../../public/images/unknown44.png')}
                    />
                    <Image
                      style={{width: 26, height: 26, marginTop: 5, marginLeft: 5}}
                      source={require('../../../public/images/unknown11.png')}
                    />
                  </View>
                  <View>
                    <Image
                      style={{width: 26, height: 26, marginTop: 5, marginLeft: 5}}
                      source={require('../../../public/images/unknown33.png')}
                    />
                    <Image
                      style={{width: 26, height: 26, marginTop: 5, marginLeft: 5}}
                      source={require('../../../public/images/unknown22.png')}
                    />
                    <Image
                      style={{width: 26, height: 26, marginTop: 5, marginLeft: 5}}
                      source={require('../../../public/images/unknown66.png')}
                    />
                    <Image
                      style={{width: 26, height: 26, marginTop: 5, marginLeft: 5}}
                      source={require('../../../public/images/unknown55.png')}
                    />
                  </View>
                  <View>
                    <Image
                      style={{width: 26, height: 26, marginTop: 5, marginLeft: 5}}
                      source={require('../../../public/images/unknown55.png')}
                    />
                    <Image
                      style={{width: 26, height: 26, marginTop: 5, marginLeft: 5}}
                      source={require('../../../public/images/unknown55.png')}
                    />
                    <Text
                      style={{
                        color: '#a1a1a1',
                        fontSize: 16,
                        margin: 6,
                        marginLeft: 5,
                      }}>
                      (ПЧ не готовий)
                    </Text>
                    <Text
                      style={{
                        color: '#a1a1a1',
                        fontSize: 16,
                        margin: 6,
                        marginLeft: 5,
                      }}>
                      (ПЧ готовий)
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    alignSelf: 'center',
                    width: '90%',
                    height: 1,
                    backgroundColor: '#333334',
                    marginTop: 10,
                  }}
                />
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignSelf: 'flex-end',
                  }}>
                  <Image
                    style={{width: 22, height: 24, marginTop: 10, marginLeft: -35}}
                    source={require('../../../public/images/unknown77.png')}
                  />
                  <Text style={{color: '#a1a1a1', fontSize: 16, marginTop: 10}}>
                    {' '}
                    Eкран повідомлень{' '}
                  </Text>
                </View>
              </View>
            </View>
          </Modal>
          <Modal
            animationInTiming={200}
            animationOutTiming={200}
            onBackdropPress={toggleModalWaterSupply}
            isVisible={isModalVisibleWaterSupply}>
            <View style={{backgroundColor: '#242424', borderRadius: 10}}>
              <View style={{margin: 10}}>
                <Text
                  style={{
                    color: '#ffffff',
                    fontWeight: 'bold',
                    fontSize: 20,
                    margin: 5,
                  }}>
                  Стани
                </Text>
                <Text style={{color: '#a1a1a1', marginTop: -5}}>
                  {' '}
                  Стани котлів та насосів системи опалення
                </Text>
                <View
                  style={{
                    alignSelf: 'center',
                    width: '90%',
                    height: 1,
                    backgroundColor: '#333334',
                    marginTop: 10,
                  }}
                />
                <View
                  style={{display: 'flex', flexDirection: 'row', marginTop: 10}}>
                  <View>
                    <Text style={{fontSize: 19, color: 'white', marginTop: 5}}>
                      {' '}
                      Водонагрівач 1:{' '}
                    </Text>
                    <Text style={{fontSize: 19, color: 'white', marginTop: 5}}>
                      {' '}
                      Водонагрівач 2:{' '}
                    </Text>
                    <Text style={{fontSize: 19, color: 'white', marginTop: 5}}>
                      {' '}
                      Насос 1:{' '}
                    </Text>
                    <Text style={{fontSize: 19, color: 'white', marginTop: 5}}>
                      {' '}
                      Насос 2:{' '}
                    </Text>
                  </View>
                  <View>
                    <Image
                      style={{width: 26, height: 26, marginTop: 5, marginLeft: 5}}
                      source={require('../../../public/images/unknown33.png')}
                    />
                    <Image
                      style={{width: 26, height: 26, marginTop: 5, marginLeft: 5}}
                      source={require('../../../public/images/unknown22.png')}
                    />
                    <Image
                      style={{width: 26, height: 26, marginTop: 5, marginLeft: 5}}
                      source={require('../../../public/images/unknown66.png')}
                    />
                    <Image
                      style={{width: 26, height: 26, marginTop: 5, marginLeft: 5}}
                      source={require('../../../public/images/unknown55.png')}
                    />
                  </View>
                  <View>
                    <Image
                      style={{width: 26, height: 26, marginTop: 5, marginLeft: 5}}
                      source={require('../../../public/images/unknown55.png')}
                    />
                    <Image
                      style={{width: 26, height: 26, marginTop: 5, marginLeft: 5}}
                      source={require('../../../public/images/unknown66.png')}
                    />
                  </View>
                </View>
                <View
                  style={{
                    alignSelf: 'center',
                    width: '90%',
                    height: 1,
                    backgroundColor: '#333334',
                    marginTop: 10,
                  }}
                />
                <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', margin: 5}}>
                  <View>
                    {accidentToggle === true ? (
                      <Text
                        style={{fontSize: 20, color: '#67E761', marginLeft: -5}}>
                         Працює
                      </Text>
                    ) : (
                      <Text style={{fontSize: 20, color: 'red', marginLeft: -5}}>
                        Зупинено
                      </Text>
                    )}
                    <Text style={{color: '#a1a1a1', marginLeft: -4}}>
                      Аварія стоп
                    </Text>
                  </View>
                  <SwitchToggle
                    switchOn={accidentToggle}
                    onPress={() => setAccidentToggle(!accidentToggle)}
                    circleColorOff="#C4C4C4"
                    circleColorOn="#67E761"
                    backgroundColorOn="#6D6D6D"
                    backgroundColorOff="#4F4F4F"
                    containerStyle={{
                      marginTop: 5,
                      width: 70,
                      height: 38,
                      borderRadius: 25,
                      padding: 5,
                      marginLeft: '50%',
                      alignSelf: 'flex-end',
                    }}
                    circleStyle={{
                      width: 30,
                      height: 30,
                      borderRadius: 20,
                    }}
                  />
                </View>
              </View>
            </View>
          </Modal>



          <Modal
            animationInTiming={200}
            animationOutTiming={200}
            onBackdropPress={toggleModalTenOne}
            isVisible={isModalVisibleTenOne}>
            <View style={{backgroundColor: '#242424', borderRadius: 10}}>
              <View style={{margin: 10}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', borderColor: '#333334', borderWidth: 1 }}>
                    <View style={{borderColor: '#333334', borderWidth: 1}}>
                      <View style={{margin: 5}}>
                        <Text style={{fontSize: 16, color: 'white'}}>
                          Напруга
                        </Text>
                      </View>
                      <View style={{margin: 5}}>
                        <Text style={{fontSize: 16, color: '#a1a1a1'}}>
                          {jsonFromServer?.d?.U1_1 ? jsonFromServer?.d?.U1_1 : <Text style={{color: '#a1a1a1', fontSize: 18 }}>...</Text>}
                        </Text>
                        <Text style={{fontSize: 16, color: '#a1a1a1'}}>
                          {jsonFromServer?.d?.U1_2 ? jsonFromServer?.d?.U1_2 : <Text style={{color: '#a1a1a1', fontSize: 18 }}>...</Text>}
                        </Text>
                        <Text style={{fontSize: 16, color: '#a1a1a1'}}>
                          {jsonFromServer?.d?.U1_3 ? jsonFromServer?.d?.U1_3 : <Text style={{color: '#a1a1a1', fontSize: 18 }}>...</Text>}
                        </Text>
                      </View>
                    </View>
                    <View style={{borderColor: '#333334', borderWidth: 1}}>
                      <View style={{margin: 5}}>
                        <Text style={{fontSize: 16, color: 'white'}}>
                          Струм
                        </Text>
                      </View>
                      <View style={{margin: 5}}>
                        <Text style={{fontSize: 16, color: '#a1a1a1'}}>
                          {jsonFromServer?.d?.L1_1 ? jsonFromServer?.d?.L1_1 : <Text style={{color: '#a1a1a1', fontSize: 20 }}>...</Text>}
                        </Text>
                        <Text style={{fontSize: 16, color: '#a1a1a1'}}>
                          {jsonFromServer?.d?.L1_2 ? jsonFromServer?.d?.L1_2 : <Text style={{color: '#a1a1a1', fontSize: 20 }}>...</Text>}
                        </Text>
                        <Text style={{fontSize: 16, color: '#a1a1a1'}}>
                          {jsonFromServer?.d?.L1_3 ? jsonFromServer?.d?.L1_3 : <Text style={{color: '#a1a1a1', fontSize: 20 }}>...</Text>}
                        </Text>
                      </View>
                    </View>
                    <View style={{borderColor: '#333334', borderWidth: 1}}>
                      <View style={{margin: 5}}>
                        <Text style={{fontSize: 16, color: 'white'}}>
                          Потужність
                        </Text>
                      </View>
                      <View style={{margin: 5}}>
                        <Text style={{fontSize: 16, color: '#a1a1a1'}}>
                          {jsonFromServer?.d?.P1_1 ? jsonFromServer?.d?.P1_1 : <Text style={{color: '#a1a1a1', fontSize: 20 }}>...</Text>}
                        </Text>
                        <Text style={{fontSize: 16, color: '#a1a1a1'}}>
                          {jsonFromServer?.d?.P1_2 ? jsonFromServer?.d?.P1_2 : <Text style={{color: '#a1a1a1', fontSize: 20 }}>...</Text>}
                        </Text>
                        <Text style={{fontSize: 16, color: '#a1a1a1'}}>
                          {jsonFromServer?.d?.P1_3 ? jsonFromServer?.d?.P1_3 : <Text style={{color: '#a1a1a1', fontSize: 20 }}>...</Text>}
                        </Text>
                      </View>
                    </View>
                </View>
              </View>
            </View>
          </Modal>

          <Modal
            animationInTiming={200}
            animationOutTiming={200}
            onBackdropPress={toggleModalTenTwo}
            isVisible={isModalVisibleTenTwo}>
            <View style={{backgroundColor: '#242424', borderRadius: 10}}>
              <View style={{margin: 10}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', borderColor: '#333334', borderWidth: 1 }}>
                    <View style={{borderColor: '#333334', borderWidth: 1}}>
                      <View style={{margin: 5}}>
                        <Text style={{fontSize: 16, color: 'white'}}>
                          Напруга
                        </Text>
                      </View>
                      <View style={{margin: 5}}>
                        <Text style={{fontSize: 16, color: '#a1a1a1'}}>
                          {jsonFromServer?.d?.U2_1 ? jsonFromServer?.d?.U2_1 : <Text style={{color: '#a1a1a1', fontSize: 18 }}>...</Text>}
                        </Text>
                        <Text style={{fontSize: 16, color: '#a1a1a1'}}>
                          {jsonFromServer?.d?.U2_2 ? jsonFromServer?.d?.U2_2 : <Text style={{color: '#a1a1a1', fontSize: 18 }}>...</Text>}
                        </Text>
                        <Text style={{fontSize: 16, color: '#a1a1a1'}}>
                          {jsonFromServer?.d?.U2_3 ? jsonFromServer?.d?.U2_3 : <Text style={{color: '#a1a1a1', fontSize: 18 }}>...</Text>}
                        </Text>
                      </View>
                    </View>
                    <View style={{borderColor: '#333334', borderWidth: 1}}>
                      <View style={{margin: 5}}>
                        <Text style={{fontSize: 16, color: 'white'}}>
                          Струм
                        </Text>
                      </View>
                      <View style={{margin: 5}}>
                        <Text style={{fontSize: 16, color: '#a1a1a1'}}>
                          {jsonFromServer?.d?.L2_1 ? jsonFromServer?.d?.L2_1 : <Text style={{color: '#a1a1a1', fontSize: 20 }}>...</Text>}
                        </Text>
                        <Text style={{fontSize: 16, color: '#a1a1a1'}}>
                          {jsonFromServer?.d?.L2_2 ? jsonFromServer?.d?.L2_2 : <Text style={{color: '#a1a1a1', fontSize: 20 }}>...</Text>}
                        </Text>
                        <Text style={{fontSize: 16, color: '#a1a1a1'}}>
                          {jsonFromServer?.d?.L2_3 ? jsonFromServer?.d?.L2_3 : <Text style={{color: '#a1a1a1', fontSize: 20 }}>...</Text>}
                        </Text>
                      </View>
                    </View>
                    <View style={{borderColor: '#333334', borderWidth: 1}}>
                      <View style={{margin: 5}}>
                        <Text style={{fontSize: 16, color: 'white'}}>
                          Потужність
                        </Text>
                      </View>
                      <View style={{margin: 5}}>
                        <Text style={{fontSize: 16, color: '#a1a1a1'}}>
                          {jsonFromServer?.d?.P2_1 ? jsonFromServer?.d?.P2_1 : <Text style={{color: '#a1a1a1', fontSize: 20 }}>...</Text>}
                        </Text>
                        <Text style={{fontSize: 16, color: '#a1a1a1'}}>
                          {jsonFromServer?.d?.P2_2 ? jsonFromServer?.d?.P2_2 : <Text style={{color: '#a1a1a1', fontSize: 20 }}>...</Text>}
                        </Text>
                        <Text style={{fontSize: 16, color: '#a1a1a1'}}>
                          {jsonFromServer?.d?.P2_3 ? jsonFromServer?.d?.P2_3 : <Text style={{color: '#a1a1a1', fontSize: 20 }}>...</Text>}
                        </Text>
                      </View>
                    </View>
                </View>
              </View>
            </View>
          </Modal>

          <View />
        </View>
    </View>
  );
};
