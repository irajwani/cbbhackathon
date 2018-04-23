import React, {Component} from 'react';
//import Moment from 'react-moment';

import { Text, View, StyleSheet } from 'react-native';
import { StackNavigator } from 'react-navigation'; // Version can be specified in package.json

// import SignInForm from './components/signInForm.js'
// import GeoAttendance from './components/geoattendance.js'
// import PhotoPicker from './components/photopicker.js'
// import ImageBrowser from './components/imagebrowser.js'
//var firebase = require("firebase");

import Classes from './components/classes.js'
import CustomCamera from './components/camera.js'
import PhotoResizer from './components/photoresizer.js'

// import Nescac from './components/nescac.js'


import Home from './components/home.js'
//import FirebaseApp from './components/fire.js'

const RootStack = StackNavigator( //name here will ultimately go in AppRegistry's second argument

  {

    // home: {
    //   screen: Home,
    // },

    // ga: {
    //   screen: GeoAttendance,
    // },
    //
    // login: {
    //   screen: SignInForm
    //
    // },

    // fire: {
    //   screen: FirebaseApp,
    // },

    // photos: {
    //   screen: PhotoPicker
    //
    // },
    //
    // unsplashphotos: {
    //   screen: ImageBrowser
    //
    // },

    camera: {
      screen: CustomCamera,

    },

    photoresizer: {
      screen: PhotoResizer

    },

    home: {
      screen: Home

    },

    classes: {
      screen: Classes
    }

    // nescac: {
    //   screen: Nescac
    //
    // }

  },
  //2nd argument,
  {
    initialRouteName: 'home',
    // the shared navigationOptions, which we can always override within the component
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#800000',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontFamily: 'American Typewriter'
      },
    },
  }
);


export default class App extends Component {



  render() {
    console.disableYellowBox = true
    console.log('starting app');
    return <RootStack />;
  }
}
