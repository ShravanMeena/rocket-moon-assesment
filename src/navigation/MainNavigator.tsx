import React from 'react';
import {useAppSelector} from '../hooks/storeHooks';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import GameScreen from '../screens/GameScreen';
import RMButton from '../components/RMButton';
import {TextConstants} from '../constants/gameConstants';
import {setDarkTheme, setLightTheme} from '../store/slices/themeSlice';

const Stack = createNativeStackNavigator();

export default function MainNavigator() {
  const {theme} = useAppSelector(state => state.theme);

  return (
    <NavigationContainer theme={theme.dark ? DarkTheme : DefaultTheme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="GameScreen" component={GameScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
