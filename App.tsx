/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import {LoadingMessage} from './src/components/messages/loading';
import {BoilersPage} from './src/components/pages/boilers';
import {ListPage} from './src/components/pages/list';
import {MainPage} from './src/components/pages/page-main';
import {ServerInit} from './src/const/user-init';
import {useMqtt} from './src/infrastucture/hooks/use-mqtt';

const App = () => {
  const {msgFromServer, error, onConnect, updateResponse} = useMqtt<any>();
  //const [currentTopic, setCurrentTopic] = useState<string>('TestPent');
  const jsonFromServer = JSON.parse(msgFromServer);

  useEffect(() => {
    updateResponse(
      ServerInit.protocol + ServerInit.host + ':' + ServerInit.port,
      'TestPent',
    );
  }, []);

  return (
    <>
      <View style={styles.container}>
        <View
          style={{
            position: 'absolute',
            zIndex: 99,
            width: '100%',
            marginTop: 30,
          }}>
          {!jsonFromServer?.d?.T1 ? <LoadingMessage /> : null}
        </View>
        <SwiperFlatList
          autoplay
          autoplayDelay={9999}
          autoplayLoop
          index={1}
          showPagination>
          <View style={[styles.child, {backgroundColor: '#121212'}]}>
            <BoilersPage
              data={jsonFromServer}
              error={error}
              onConnect={onConnect}
            />
          </View>
          <View style={[styles.child, {backgroundColor: '#121212'}]}>
            <MainPage
              data={jsonFromServer}
              error={error}
              onConnect={onConnect}
            />
          </View>
          <View style={[styles.child, {backgroundColor: '#121212'}]}>
            <ListPage
              data={jsonFromServer}
              error={error}
              onConnect={onConnect}
            />
          </View>
        </SwiperFlatList>
      </View>
    </>
  );
};

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white', marginTop: -15},
  child: {width, justifyContent: 'center'},
  text: {fontSize: width * 0.5, textAlign: 'center'},
});

export default App;
// ///<Navigation />
