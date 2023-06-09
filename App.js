import * as React from 'react';
import { View, Text, TouchableOpacity, StatusBar, ScrollView, StyleSheet, Dimensions, Image, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import { useState, useEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';
import Modal from './Modal.js'

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

  const [showModal,setModal] = useState(false);

  const abrirModalContato = () =>{
    setModal(!showModal);
  }

  let widthWindow = Dimensions.get('window').width -30 -40;

  return (
    <View style={{flex:1}}>

      {
        (showModal)?
        <Modal showModal={showModal} setModal={setModal}/>
        :
        <View></View>
      }

      <View style={{ flex: 1, padding:15}}>
        <ScrollView contentContainerStyle={{padding:20}} style={styles.container}>
          <Text style={styles.textHeader}>Sobre</Text>

          <Image style={{width:widthWindow,height:widthWindow,marginTop:20}} source={{uri:'https://avatars.githubusercontent.com/u/82848125?v=4'}} />

          <View>
            <Text style={{fontSize:20,marginTop:10}}>Dérick Trennepohl / Developer</Text>
            <Text style={{fontSize:16,marginTop:10}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vel pulvinar justo. Sed leo nibh, pharetra a porttitor sed, accumsan vitae purus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent convallis urna facilisis lorem scelerisque, eget aliquet ante rhoncus. Fusce efficitur maximus ante, vitae fringilla odio efficitur a. Vestibulum lacus erat, pellentesque vitae enim eu, porta fermentum felis. Mauris pulvinar justo ut egestas ullamcorper. Sed dapibus nulla nec egestas feugiat. In mollis odio eu condimentum tempor.</Text>

            <TouchableOpacity onPress={()=>abrirModalContato()} style={{...styles.btnNavigation,justifyContent:'center'}}>
              <Text style={{color:'white',fontSize:17}}>Entrar em contato!</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
        
      </View>
    </View>
  );
}

function PortfolioScreen({navigation,route}) {

  const [images,setImages] = useState([
    {
      img: require('./resources/download.jpeg'),
      width:0,
      height:0,
      ratio:0,
      website:'https://github.com/6derick6/App_Portfolio'
    },

    {
      img: require('./resources/download1.jpeg'),
      width:0,
      height:0,
      ratio:0,
      website:'https://github.com/6derick6/App_Portfolio'
    }
  ])

  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {

    let windowWidthN = Dimensions.get('window').width;

    setWindowWidth(windowWidthN -30 -40);

    let newImages = images.filter(function(val){
      let w = Image.resolveAssetSource(val.img).width;
      let h = Image.resolveAssetSource(val.img).height;

      val.width = w;
      val.height = h;

      val.ratio = h/w;

      return val;
    })

    setImages(newImages);

  }, [])

  const abrirNavegador = async (website) =>{
    let result = await WebBrowser.openBrowserAsync(website);
  }

  return (
    <View style={{ flex: 1, padding:15}}>
      <ScrollView contentContainerStyle={{padding:20}} style={styles.container}>
        <Text style={styles.textHeader}>Os últimos projetos</Text>

        {
          images.map(function(val){
            return(
              <View style={styles.parentImage}>
                <Image style={{width:windowWidth,height:windowWidth*val.ratio,resizeMode:'stretch'}} source={val.img} />

                <TouchableOpacity onPress={()=>abrirNavegador(val.website)} style={styles.botaoAbrirNavegador}>
                  <Text style={{textAlign:'center',color:'white',fontSize:18}}>Abrir no navegador!</Text>
                </TouchableOpacity>

              </View>
            )
          })
        }

      </ScrollView>

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
  }, 

  parentImage: {
    marginTop:30
  },

  botaoAbrirNavegador: {
    padding:10,
    backgroundColor:'#5f5380',
  },

  modalParent: {
    position: 'absolute',
    left:0,
    top:0,
    width:'100%',
    height:'100%',
    backgroundColor:'rgba(0,0,0,0.6)',
    zIndex:1
  },

  boxModal: {
    backgroundColor: 'white',
    height:370,
    width:'100%',
    position:'absolute',
    left:0,
    top:'50%',
    marginTop:-185,
    padding:10
  }
})