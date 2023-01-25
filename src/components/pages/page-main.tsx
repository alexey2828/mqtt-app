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
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import SwitchToggle from 'react-native-switch-toggle';
import RadioGroup, {RadioButtonProps} from 'react-native-radio-buttons-group';
import { IMqttData } from './list';
import { LoadingMessage } from '../messages/loading';
import AnimatedColorView from 'react-native-animated-colors';

export const MainPage: React.FC<IMqttData> = ({data, error, onConnect}: IMqttData) => {
  const jsonFromServer = data;
  const [heatingToggle, setHeatingToggle] = useState(true);
  const [accidentToggle, setAccidentToggle] = useState(true);
  const [manageModHeatingRadio, setManageModHeatingRadio] = useState(0);

  const [activeIndex, setindex] = useState(0);

  //useEffect(() => {
  // const interval = setInterval(() => {
  //   activeIndex == 1? setindex(0) : setindex(1);
  // }, 2000);

  //  return () => clearInterval(interval);
  //}, [activeIndex]);

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

  const p_raznist = (Math.round(10 * jsonFromServer?.d?.P2) / 10) - (Math.round(10 * jsonFromServer?.d?.P3) / 10);
  const t_raznist = (Math.round(10 * jsonFromServer?.d?.T5) / 10) - (Math.round(10 * jsonFromServer?.d?.T12) / 10);


  const radioButtonsData: RadioButtonProps[] = [{
    id: '1', // acts as primary key, should be unique and non-empty string
    label: 'П/А',
    value: 'option1',
    color: '#ffffff',
    selected: false,
  }, {
    id: '2',
    label: 'Авт',
    value: 'option2',
    color: '#ffffff',
    selected: false,
  }, {
    id: '3',
    label: 'Руч',
    value: 'option3',
    color: '#ffffff',
    selected: true,
  }];

const [radioButtons, setRadioButtons] = useState<RadioButtonProps[]>(radioButtonsData);

function onPressRadioButton(radioButtonsArray: RadioButtonProps[]) {
    setRadioButtons(radioButtonsArray);
}

const listCategory1 = [
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

console.log(jsonFromServer?.d?.TS_PH1);
console.log(jsonFromServer?.d?.TS_PH2);
  return (
    <View style={{margin: 5, backgroundColor: '#242424', borderRadius: 10, height: '87%'}}>
        <View style={{margin: 15}}>
          <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <View>
              {heatingToggle === true ? (
                <Text style={{fontSize: 20, color: '#67E761', marginLeft: -5}}>
                  {' '}
                  Включено{' '}
                </Text>
              ) : (
                <Text style={{fontSize: 20, color: 'red', marginLeft: -5}}>
                  {' '}
                  Вимкнено{' '}
                </Text>
              )}
              <Text style={{color: '#a1a1a1', marginLeft: -5}}> Опалення</Text>
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

          <Text style={{fontSize: 20, color: 'white', marginTop: 20}}>Режим управління</Text>
          <Text style={{color: '#a1a1a1'}}>Cистемой опалення</Text>

          <View style={{marginTop: 10, marginBottom: 10}}>
            <Text style={{color: '#ffffff'}}>
              <RadioGroup
                radioButtons={radioButtons}
                onPress={onPressRadioButton}
                layout="row"
                containerStyle={{color: '#a1a1a1'}}/>
            </Text>
          </View>

        <View style={{height: '70%', borderColor: '#333334', borderWidth: 1, borderRadius: 10, backgroundColor: '#121212' }}>
          <ScrollView>
            <View  style={{height: '90%'}}>
              <Text style={{ fontSize: 20, color: 'white', marginTop: 20, marginLeft: 10 }}>Схеми </Text>
              <Text style={{ color: '#a1a1a1', marginLeft: 10 }}>Схеми насосів та котлів</Text>
              <View style={{marginLeft: -20}}>
              <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 40}}>
              <View style={{}}>
                <Text style={{color: '#ffffff', marginTop: 25, fontSize: 16, position: 'absolute', marginLeft: 10}}>T12</Text>
                <Text style={{color: '#a1a1a1', marginTop: 50, marginLeft: 10, fontSize: 14, position: 'absolute'}}>
                  {jsonFromServer?.d?.T12 ? Math.round(10 * jsonFromServer?.d?.T12) / 10 :
                    <Text style={{color: '#a1a1a1', fontSize: 20 }}>...</Text>
                  }
                </Text>
              </View>
              <View style={{borderColor: '#a1a1a1', borderWidth: 1,width: 50, height: 1, marginTop: 49}} />
              <View style={{borderColor: '#a1a1a1', borderWidth: 2, borderRadius: 10, width: 170, height: 100}}>
              {String(jsonFromServer?.d?.TS_BH1) == '1' ?
                <TouchableOpacity
                  onPress={(): void => {
                    setModalVisibleTenOne(true);
                }}>
                  <View style={{borderColor: '#67E761', borderWidth: 2, borderRadius: 10, width: 120, height: 50, backgroundColor: '#242424', position: 'absolute', marginLeft: 25, marginTop: -25, flexDirection: 'row', justifyContent: 'center'}}>
                    <Text style={{color: '#ffffff', fontSize: 18, marginTop: 10}}>Котел 1</Text>
                    <View style={{position: 'absolute', zIndex: -2, borderRadius: 30}}>
                      <AnimatedColorView
                        activeIndex={activeIndex}
                        colors={['green', '#333334']}
                        duration={1500}
                        loop={true}
                      >
                        <View style={{width: 117, height: 47}} />
                      </AnimatedColorView>
                    </View>
                  </View>
                </TouchableOpacity>
                :
                <TouchableOpacity
                  onPress={(): void => {
                    setModalVisibleTenOne(true);
                }}>
                <View style={{borderColor: '#a1a1a1', borderWidth: 2, borderRadius: 10, width: 120, height: 50, backgroundColor: '#242424', position: 'absolute', marginLeft: 25, marginTop: -25, flexDirection: 'row', justifyContent: 'center'}}>
                  <Text style={{color: '#ffffff', fontSize: 18, marginTop: 10}}>Котел 1</Text>
                </View>
                </TouchableOpacity>
              }
              <View style={{position: 'absolute', width: 230}}>
                <Text style={{ color: 'white', margin: 35, marginLeft: 25, fontSize: 18 }}>T5 ust = <Text style={{ color: '#67E761', fontSize: 18 }}>45C°</Text></Text>
              </View>
              {String(jsonFromServer?.d?.TS_BH2) == '1' ?
              <TouchableOpacity
                onPress={(): void => {
                  setModalVisibleTenTwo(true);
              }}>
                <View style={{borderColor: '#67E761', borderWidth: 2, borderRadius: 10, width: 120, height: 50, backgroundColor: '#242424', position: 'absolute', marginLeft: 25, marginTop: 70, flexDirection: 'row', justifyContent: 'center'}}>
                  <Text style={{color: '#ffffff', fontSize: 18, marginTop: 10}}>Котел 2</Text>
                  <View style={{position: 'absolute', zIndex: -2, borderRadius: 30}}>
                      <AnimatedColorView
                        activeIndex={activeIndex}
                        colors={['green', '#333334']}
                        duration={1500}
                        loop={true}
                      >
                        <View style={{width: 117, height: 47}} />
                      </AnimatedColorView>
                    </View>
                </View>
              </TouchableOpacity>
              :
              <TouchableOpacity
                onPress={(): void => {
                  setModalVisibleTenTwo(true);
              }}>
                <View style={{borderColor: '#a1a1a1', borderWidth: 2, borderRadius: 10, width: 120, height: 50, backgroundColor: '#242424', position: 'absolute', marginLeft: 25, marginTop: 70, flexDirection: 'row', justifyContent: 'center'}}>
                  <Text style={{color: '#ffffff', fontSize: 18, marginTop: 10}}>Котел 2</Text>
                </View>
              </TouchableOpacity>
              }
              </View>
              <View style={{borderColor: '#a1a1a1', borderWidth: 1, width: 50, height: 1, marginTop: 49}}>
                <View style={{borderColor: '#a1a1a1', borderWidth: 1, width: 50, height: 1, marginTop: -40}}>
                  <View style={{position: 'absolute', marginTop: -50, marginLeft: 15}}>

                    <Text style={{color: '#ffffff', marginTop: 25, fontSize: 16, position: 'absolute'}}>T1</Text>
                    <Text style={{color: '#a1a1a1', marginTop: 50, fontSize: 14, position: 'absolute'}}>
                      {jsonFromServer?.d?.T1 ? Math.round(10 * jsonFromServer?.d?.T1) / 10 :
                        <Text style={{color: '#a1a1a1', fontSize: 20 }}>...</Text>
                      }
                    </Text>
                  </View>

                <View style={{position: 'absolute', marginTop: 32, marginLeft: 15}}>
                  <Text style={{color: '#ffffff', marginTop: 25, fontSize: 16, position: 'absolute'}}>T2</Text>
                  <Text style={{color: '#a1a1a1', marginTop: 50, fontSize: 14, position: 'absolute'}}>
                    {jsonFromServer?.d?.T2 ? Math.round(10 * jsonFromServer?.d?.T2) / 10 :
                      <Text style={{color: '#a1a1a1', fontSize: 20 }}>...</Text>
                    }
                  </Text>
                </View>

              </View>
                <View style={{borderColor: '#a1a1a1', borderWidth: 1, width: 50, height: 1, marginTop: 80}} />
              </View>

              <View style={{}}>
                <Text style={{color: '#ffffff', marginTop: 25, marginLeft: -33, fontSize: 16, position: 'absolute'}}>T5</Text>
                <Text style={{color: '#a1a1a1', marginTop: 50, marginLeft: -33, fontSize: 14, position: 'absolute'}}>
                  {jsonFromServer?.d?.T5 ? Math.round(10 * jsonFromServer?.d?.T5) / 10 :
                    <Text style={{color: '#a1a1a1', fontSize: 20 }}>...</Text>
                  }
                </Text>
              </View>
            </View>

            <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 70}}>
              <View style={{}}>
                <Text style={{color: '#ffffff', marginTop: 25, marginLeft: 10, fontSize: 16, position: 'absolute'}}>P3</Text>
                <Text style={{color: '#a1a1a1', marginTop: 50, marginLeft: 10, fontSize: 14, position: 'absolute'}}>
                  {jsonFromServer?.d?.P3 ? Math.round(10 * jsonFromServer?.d?.P3) / 10 :
                    <Text style={{color: '#a1a1a1', fontSize: 20 }}>...</Text>
                  }
                </Text>
              </View>
            <View style={{borderColor: '#a1a1a1', borderWidth: 1,width: 50, height: 1, marginTop: 49}} />
            <View style={{borderColor: '#a1a1a1', borderWidth: 2, borderRadius: 10, width: 170, height: 100}}>
              {String(jsonFromServer?.d?.TS_PH1) == '1' ?
              <View style={{borderColor: '#67E761', borderWidth: 2, borderRadius: 10, width: 120, height: 50, backgroundColor: '#242424', position: 'absolute', marginLeft: 25, marginTop: -25, flexDirection: 'row', justifyContent: 'center'}}>
                <Text style={{color: '#ffffff', fontSize: 18, marginTop: 10}}>Насос 1</Text>
                <View style={{position: 'absolute', zIndex: -2, borderRadius: 30}}>
                  <AnimatedColorView
                    activeIndex={activeIndex}
                    colors={['green', '#333334']}
                    duration={1500}
                    loop={true}
                  >
                  <View style={{width: 117, height: 46}} />
                  </AnimatedColorView>
                </View>
              </View>
              :
              <View style={{borderColor: '#a1a1a1', borderWidth: 2, borderRadius: 10, width: 120, height: 50, backgroundColor: '#242424', position: 'absolute', marginLeft: 25, marginTop: -25, flexDirection: 'row', justifyContent: 'center'}}>
                <Text style={{color: '#ffffff', fontSize: 18, marginTop: 10}}>Насос 1</Text>
              </View>
              }
              {String(jsonFromServer?.d?.TS_PH2) == '1' ?
              <View style={{borderColor: '#67E761', borderWidth: 2, borderRadius: 10, width: 120, height: 50, backgroundColor: '#242424', position: 'absolute', marginLeft: 25, marginTop: 70, flexDirection: 'row', justifyContent: 'center'}}>
                <Text style={{color: '#ffffff', fontSize: 18, marginTop: 10}}>Насос 2</Text>
                <View style={{position: 'absolute', zIndex: -2, borderRadius: 30}}>
                  <AnimatedColorView
                    activeIndex={activeIndex}
                    colors={['green', '#333334']}
                    duration={1500}
                    loop={true}
                  >
                  <View style={{width: 117, height: 47}} />
                  </AnimatedColorView>
                </View>
              </View>
              :
              <View style={{borderColor: '#a1a1a1', borderWidth: 2, borderRadius: 10, width: 120, height: 50, backgroundColor: '#242424', position: 'absolute', marginLeft: 25, marginTop: 70, flexDirection: 'row', justifyContent: 'center'}}>
                <Text style={{color: '#ffffff', fontSize: 18, marginTop: 10}}>Насос 2</Text>
              </View>
              }
              </View>
              <View style={{borderColor: '#a1a1a1', borderWidth: 1, width: 50, height: 1, marginTop: 49}}>

                <View style={{borderColor: '#a1a1a1', borderWidth: 1, width: 50, height: 1, marginTop: -40}}>

                  <View style={{position: 'absolute', marginTop: -50, marginLeft: 15}}>
                    <Text style={{color: '#ffffff', marginTop: 25, fontSize: 16, position: 'absolute'}}>V1</Text>
                    <Text style={{color: '#a1a1a1', marginTop: 50, fontSize: 14, position: 'absolute'}}>8.4</Text>
                  </View>

                  <View style={{position: 'absolute', marginTop: 32, marginLeft: 15}}>
                    <Text style={{color: '#ffffff', marginTop: 25, fontSize: 16, position: 'absolute'}}>V2</Text>
                    <Text style={{color: '#a1a1a1', marginTop: 50, fontSize: 14, position: 'absolute'}}>43.3</Text>
                  </View>

                </View>
                <View style={{borderColor: '#a1a1a1', borderWidth: 1, width: 50, height: 1, marginTop: 80}} />
                </View>
                <View style={{}}>
                  <Text style={{color: '#ffffff', marginTop: 25, marginLeft: -33, fontSize: 16, position: 'absolute'}}>P2</Text>
                  <Text style={{color: '#a1a1a1', marginTop: 50, marginLeft: -33, fontSize: 14, position: 'absolute'}}>
                    {jsonFromServer?.d?.P2 ? Math.round(10 * jsonFromServer?.d?.P2) / 10 :
                      <Text style={{color: '#a1a1a1', fontSize: 20 }}>...</Text>
                    }
                  </Text>
                </View>
              </View>
            </View>
            <View/>

            <View style={{ display: 'flex', flexDirection: 'row', marginTop: 40}}>
              <View>
                <Text style={{ fontSize: 20, color: 'white', marginLeft: 10  }}>Показники </Text>
                <Text style={{ color: '#a1a1a1', marginLeft: 10  }}>Швидкості та різниці</Text>

                <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                  <Text style={{ color: 'white', margin: 10, marginTop: 20, fontSize: 16 }}>
                    <Text style={{color: 'white', fontSize: 16 }}>Різниця T5 - T12:</Text>
                  </Text>
                  <Text style={{ color: '#a1a1a1', fontSize: 16, marginRight: 15, marginTop: 10}}>
                    <Text style={{ color: '#67E761', fontSize: 16 }}> {Math.round(10 * jsonFromServer?.d?.T5_T12) / 10}C°</Text> 
                  </Text>
                </View>

                <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                  <Text style={{ color: 'white', margin: 10, fontSize: 16 }}>
                    <Text style={{color: 'white', fontSize: 16 }}>Різниця P2 - P3:</Text>
                  </Text>
                  <Text style={{ color: '#a1a1a1', fontSize: 16, marginRight: 15, marginTop: 10}}>
                    <Text style={{ color: '#67E761', fontSize: 16 }}> {Math.round(10 * jsonFromServer?.d?.P2_P ) / 10}бар.</Text>
                  </Text>
                </View>

                <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                  <Text style={{ color: 'white', margin: 10, fontSize: 16 }}>
                    <Text style={{color: 'white', fontSize: 16 }}>Швидкість V1:</Text>
                  </Text>
                  <Text style={{ color: '#a1a1a1', fontSize: 16, marginRight: 15, marginTop: 10}}>
                    <Text style={{ color: '#67E761', fontSize: 16 }}>76%</Text>
                  </Text>
                </View>

                <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                  <Text style={{ color: 'white', margin: 10, fontSize: 16 }}>
                    <Text style={{color: 'white', fontSize: 16 }}>Швидкість V2:</Text>
                  </Text>
                  <Text style={{ color: '#a1a1a1', fontSize: 16, marginRight: 15, marginTop: 10}}>
                    <Text style={{ color: '#67E761', fontSize: 16 }}>18%</Text>
                  </Text>
                </View>

                <Text style={{ fontSize: 20, color: 'white', marginTop: 20, marginLeft: 10  }}>Температура </Text>
                <Text style={{ color: '#a1a1a1', marginLeft: 10 }}>Температура у тенах</Text>

                <View style={{ display: 'flex', flexDirection: 'row', marginTop: 0 }}>
                  <View
                    style={{
                      width: '100%',
                      marginTop: 15,
                      marginRight: -5,
                    }}
                  >
                    {listCategory1.map((item)=> {
                      return (
                        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}} key={item.id}>
                          <Text style={{ color: 'white', margin: 10, fontSize: 16 }}>
                          {item.title ? item.title :
                            <Text style={{color: '#a1a1a1', fontSize: 20 }}>...</Text>
                          }:</Text>
                          <Text style={{ color: '#a1a1a1', fontSize: 16, marginRight: 15, marginTop: 10}}> {item.value ? item.value :
                            <Text style={{color: '#a1a1a1', fontSize: 20 }}>...</Text>
                          }</Text>
                        </View>
                      );
                    })}
                  </View>
                </View>
              </View>
            </View>
            </View>
          </ScrollView>
        </View>

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


//<TouchableHighlight
//onPress={(): void => {
//  setModalVisibleStateHeat(true);
//}}>
//<View
//  style={{
//    width: '100%',
//    borderColor: '#333334',
//    borderWidth: 1,
//    borderRadius: 10,
//    marginTop: 15,
//    marginLeft: -5,
//    marginRight: -5,
//  }}>
//  <Text style={{color: '#a1a1a1', margin: 10, fontSize: 20}}>
//    Стани котлів та насосів системи опалення
//  </Text>
//</View>
//</TouchableHighlight>


