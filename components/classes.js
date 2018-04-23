import React, { Component } from 'react';
import {
  View,
  AppRegistry,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity
} from 'react-native';


export default class Classes extends Component {
  render() {
    const resizeMode = 'center';
    const text = 'This is some text inlaid in an <Image />';

    return (
      <ImageBackground
      source={require('../img/Teachers.png')}
      imageStyle={{resizeMode: 'center'}}
      style={{flex:1}}
    >
        <Text></Text>







    </ImageBackground>
    );
  }
}
