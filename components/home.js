import React, { Component } from 'react';
import {
  View,
  AppRegistry,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity
} from 'react-native';


export default class Home extends Component {
  render() {
    const resizeMode = 'center';
    const text = 'This is some text inlaid in an <Image />';

    return (
      <ImageBackground
      source={require('../img/home.png')}
      imageStyle={{resizeMode: 'center'}}
      style={{flex:1}}
    >
        <TouchableOpacity style={{top: 100, left: 156, width: 40, height: 40, borderRadius: 20}} onPress={ () => this.props.navigation.navigate('camera')   }>
      <Text></Text>
    </TouchableOpacity>


    <TouchableOpacity style={{top: 150, left: 156, width: 40, height: 40, borderRadius: 20}} onPress={ () => this.props.navigation.navigate('classes')   }>
  <Text></Text>
</TouchableOpacity>







    </ImageBackground>
    );
  }
}
