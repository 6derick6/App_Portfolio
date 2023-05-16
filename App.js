import * as React from 'react';
import { View, Text, TouchableOpacity, StatusBar, ScrollView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';


function HomeScreen({navigation}) {
  return (
    <View style={{flex:1,padding:15}}>
      <ScrollView contentContainerStyle={{padding:20}} style={styles.container}>
        <Text style={styles.textHeader}>Para onde você deseja navegar?</Text>

        <TouchableOpacity onPress={()=>navigation.navigate('Home')} style={styles.btnNavigation}>
          <Ionicons name='md-home' size={29} color='white' />
          <Text style={{color:'white',marginTop:8,marginLeft:8}}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>navigation.navigate('Sobre')} style={styles.btnNavigation}>
          <Ionicons name='ios-information-circle' size={29} color='white' />
          <Text style={{color:'white',marginTop:8,marginLeft:8}}>Sobre</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>navigation.navigate('Portfolio')} style={styles.btnNavigation}>
          <Ionicons name='ios-list' size={29} color='white' />
          <Text style={{color:'white',marginTop:8,marginLeft:8}}>Portfolio</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

function SobreScreen({navigation}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Sobre Screen</Text>
    </View>
  );
}

function PortfolioScreen({navigation}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Portfolio Screen</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function App() {
  return (

    <NavigationContainer>
      <StatusBar hidden />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'ios-home'
                : 'ios-home';
            } else if (route.name === 'Portfolio') {
              iconName = focused ? 'ios-list' : 'ios-list-outline';
            } else if (route.name === 'Sobre') {
              iconName = focused ? 'ios-information-circle' : 'ios-information-circle';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#5f5380',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Sobre" component={SobreScreen} />
        <Tab.Screen name="Portfolio" component={PortfolioScreen} />
      </Tab.Navigator>
    </NavigationContainer>

  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    backgroundColor:'white'
  },

  textHeader: {
    color:'#5f5380',
    fontSize:24
  },

  btnNavigation: {
    backgroundColor:'#5f5380',
    padding:20,
    marginTop:15,
    flexDirection:'row'
  }
})