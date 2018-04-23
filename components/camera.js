'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator,
  ScrollView,
  CameraRoll
} from 'react-native';
import { RNCamera } from 'react-native-camera';

//import axios from 'axios';
 import Modal from 'react-native-modal';
// import Spinner from 'react-native-loading-spinner-overlay';

// import ImageResizer from 'react-native-image-resizer';

 var firebase = require("firebase");

import Highlighter from 'react-native-highlight-words';

const cloudVisionKey = 'AIzaSyBafJpjLR_HnSRTmkxTjrI8U7-_JYMvX9E';
const natLangKey = 'AIzaSyA1R-xevUEGntkwxQE4uxJXdW7ZJy9V8VE';
// Endpoints
const cloudVision  = 'https://vision.googleapis.com/v1/images:annotate?key=' + cloudVisionKey;
const natLang =  "https://language.googleapis.com/v1beta2/documents:analyzeEntities?key="+natLangKey;

export default class CustomCamera extends Component {

  constructor(props) {
   super(props);
   this.state = {
     isLoading: false,
     type: RNCamera.Constants.Type.back,
     pictureuri: null,
     showModal:false,
     visionText: null,
     nlText: null,
     names: [],
     salience: []

   };

   this.toggleLoader = this.toggleLoader.bind(this);

 }

 dumpToFirebase(content, locale){


  // Get a database reference to our posts
  var ref = firebase.database().ref("/classes/bio/feedback");

  var postData = {
    content,
    locale
  }

  var newPostKey = ref.push().key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates['/' + newPostKey] = postData;

  ref.update(updates);

 }

 toggleLoader() {
    this.setState({
      showLoader: !this.state.showLoader
    })
  }

  //func to take picture, show text in seperate modal and let user select certain text
  takePicture() {
   this.setState({isLoading: true});
   let self = this;
   //this.toggleLoader();
   //alert('hi');
   const options = { quality: 0.5, base64: true };
   this.camera.takePictureAsync(options)
     .then((image64) => {
       this.setState({pictureuri: image64.uri, picturebase64: image64.base64, pictureWidth: image64.width, pictureHeight: image64.height});
       //console.log(this.state.pictureuri)
       fetch(cloudVision, {
      method: 'POST',
      body: JSON.stringify({
  "requests": [
    {
      "image": {
        "content": image64.base64
      },
      "features": [
        {
          "type": "DOCUMENT_TEXT_DETECTION"
        }
      ]
    }
  ]
}
     ),
     headers: new Headers({ 'Content-Type': 'application/json' })
     })
     .then( response => response.json() )
     .then(response => {
       //console.log(response)
       let textAnnotations = (response.responses[0].textAnnotations[0]);
       const textContent      = textAnnotations.description;
       const detectedLanguage = textAnnotations.locale;

       this.setState({visionText: textContent});
       var ref = firebase.database().ref("/classes/bio/feedback/")

       //console.log(textContent);
       //this.dumpToFirebase(textContent, detectedLanguage);
       // this.props.navigation.navigate('photoresizer', {uri: this.state.pictureuri, base64: this.state.picturebase64, width: this.state.picturewidth, height: this.state.pictureHeight})
       //console.log(this.state.showModal);
       var doc = {
  "document":{
    type: "PLAIN_TEXT",
    content: textContent
  }
};



fetch(natLang, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(doc)
})
  .then((response) => response.json())
  .then((responseJson) => {
     // for(let i in responseJson.entities) {console.log(responseJson.entities[i].name)}
    var size = 4;
    var names = responseJson.entities.slice(0, size).map(
      i => {return i.name}
    )
    // console.log(names)

    const salienceThres = 0.4;
    var cutoff;

    var keyData = [


    ];

    //console.log(responseJson.entities);
    var i = 0;
    var names = [];
    var salience = [];
    for (var key in responseJson.entities) {
        const sal = responseJson.entities[key]['salience'];

        if(!cutoff){
          cutoff = sal - (sal * salienceThres);
        }

        if(sal > cutoff || i < 4) {
          //console.log(i + " -> " +
          names.push(responseJson.entities[key]['name']);
          salience.push(responseJson.entities[key]['salience']);
          keyData[responseJson.entities[key]['name']] =  responseJson.entities[key]['salience'];

        }else{
          break;
        }

        i++;


    }

    console.log(names);

    ref.push({'keywords': keyData, 'content': textContent});

    this.setState({names: names, salience: salience, keyData, showModal: true, isLoading: false});

    });



     })
     .catch(function (error) {
       console.log(error, "error");
     });
     })
     .catch(err => console.error(err));
 }

 componentDidMount(){
  var config = {
    apiKey: "AIzaSyA1R-xevUEGntkwxQE4uxJXdW7ZJy9V8VE",
    authDomain: "cbb-app.firebaseapp.com",
    databaseURL: "https://cbb-app.firebaseio.com",
    projectId: "cbb-app",
    storageBucket: "cbb-app.appspot.com",
    messagingSenderId: "174759734530"
  };
  firebase.initializeApp(config);
 }


  render() {
    return (
      <View style={styles.container}>

        <RNCamera
            ref={ref => {
              this.camera = ref;
            }}

            style = {styles.preview}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.auto}
            permissionDialogTitle={'Permission to use camera'}
            permissionDialogMessage={'We need your permission to use your camera phone'}
        >
          <View style={styles.cambuttons}>
              <TouchableHighlight style={styles.capture} onPress={this.takePicture.bind(this) } >
                <Image
                  style={{width: 20, height: 20, opacity: 0.7}}
                  source={require('../img/cb.png')}
                 />

              </TouchableHighlight>

              <ActivityIndicator animating={this.state.isLoading} color='#0040ff' size='large'/>

          </View>


          </RNCamera>




          <Modal isVisible={this.state.showModal} animationIn='slideInDown'
            backdropColor='white' backdropOpacity = {0.80}
            onSwipe={() => this.setState({ showModal: false })}
  swipeDirection="left"  >

            <Highlighter
                highlightStyle={{backgroundColor: 'green'}}
                searchWords={this.state.names}
                textToHighlight={this.state.visionText}
                style = {{textAlign: 'center', fontSize: 15, fontStyle: 'normal'}}
            />


          </Modal>
      </View>







    );
  }




  // takePicture = async function() {
  //   if (this.camera) {
  //     const options = { quality: 0.5, base64: true };
  //     const data = await this.camera.takePictureAsync(options);
  //     CameraRoll.saveToCameraRoll(data)
  //       .then(Alert.alert('Success', 'Photo added to camera roll!'))
  //   }
  // };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  cambuttons: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20
  }
});


// Import Admin SDK
// var firebase = require("firebase");
// var config = {
//     apiKey: "AIzaSyA1R-xevUEGntkwxQE4uxJXdW7ZJy9V8VE",
//     authDomain: "cbb-app.firebaseapp.com",
//     databaseURL: "https://cbb-app.firebaseio.com",
//     projectId: "cbb-app",
//     storageBucket: "cbb-app.appspot.com",
//     messagingSenderId: "174759734530"
//   };
//   firebase.initializeApp(config);

// // Get a database reference to our posts
// var ref = firebase.database().ref("/classes/bio/feedback");



// for(var i = 0; i < 12; i++){
//   var postData = {
//     division: Math.random(),
//     meiosis: Math.random(),
//     virus: Math.random()
//   }

//   var newPostKey = ref.push().key;

//   // Write the new post's data simultaneously in the posts list and the user's post list.
//   var updates = {};
//   updates['/' + newPostKey] = postData;

//   ref.update(updates);
// }


//<Spinner visible={this.state.showLoader}/>

// <TouchableOpacity
//       style={{
//         flex: 0.1,
//         alignSelf: 'flex-end',
//         alignItems: 'center',
//       }}
//       onPress={() => {
//         this.setState({
//           type: this.state.type === RNCamera.Constants.Type.back
//             ? RNCamera.Constants.Type.front
//             : RNCamera.Constants.Type.back,
//         });
//       }}>
//       <Text
//         style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
//         {' '}Flip{' '}
//       </Text>


{/*  modal shows up */}
//           <Modal open={this.state.showModal}  >
// <View>
//             <Image
// style={{flex:1, height: undefined, width: undefined}}
// source={{uri: this.state.pictureuri}}
// resizeMode="contain"
// />
//
//               {/* <Text>{this.state.visionText}</Text> */}
// </View>
//           </Modal>


//     </TouchableOpacity>
///////////////////////////
