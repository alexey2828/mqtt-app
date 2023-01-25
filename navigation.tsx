import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {GraphicsPage} from './src/components/pages/graphics';
import {NavigationContainer} from '@react-navigation/native';
import {ListPage} from './src/components/pages/list';

export const Navigation = () => {
  const Stack = createStackNavigator();
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Graph" component={GraphicsPage} />
          <Stack.Screen name="Home" component={ListPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};
