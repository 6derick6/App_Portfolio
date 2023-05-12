import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View , Text, SafeAreaView, StatusBar } from 'react-native';

export default function App() {
  return (
    <SafeAreaView>
      <StatusBar hidden />
      <View><Text>Teste</Text></View>
    </SafeAreaView>
  );
}