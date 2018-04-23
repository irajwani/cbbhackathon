import React, {Component} from 'react';
import {Image, Text, View, TouchableOpacity} from 'react-native';


export default class PhotoResizer extends Component {
    constructor(props) {
        super(props);
        this.state = {
          rectangleCoordinates: null
        }

    }

    render() {
      return (
        <View><Text>Hi</Text></View>
      )
    }
}




// import React, {Component} from 'react'
// import Svg,{
//     Circle,
//     Ellipse,
//     G,
//     LinearGradient,
//     RadialGradient,
//     Line,
//     Path,
//     Polygon,
//     Polyline,
//     Rect,
//     Symbol,
//     Text,
//     Use,
//     Defs,
//     Stop
// } from 'react-native-svg';
//
// export default class PhotoResizer extends Component {
//     render() {
//         return (
//             <Svg
//                 height="100"
//                 width="100"
//             >
//                 <Circle
//                     cx="50"
//                     cy="50"
//                     r="45"
//                     stroke="blue"
//                     strokeWidth="2.5"
//                     fill="green"
//                 />
//                 <Rect
//                     x="15"
//                     y="15"
//                     width="70"
//                     height="70"
//                     stroke="red"
//                     strokeWidth="2"
//                     fill="yellow"
//                 />
//             </Svg>
//         );
//     }
// }
//

// import React from 'react';
// import {StyleSheet, ART, TouchableOpacity, Text, View, Image} from 'react-native';
//
// const {Surface, Shape} = ART
//
// export default class PhotoResizer extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       coords: null
//     }
//
//   }
//
//
//   handlePress(evt) {
//     if(this.state.coords == null){
//       this.setState({coords:{
//         startx: evt.nativeEvent.locationX,
//         starty: evt.nativeEvent.locationY,
//         width: evt.nativeEvent.locationX,
//         height: evt.nativeEvent.locationY
//       }});
//
//     }else{
//       this.setState({coords:{
//         width: evt.nativeEvent.locationX - this.state.startx,
//         height: evt.nativeEvent.locationY - this.state.starty,
//       }});
//     }
//
//
//   }
//
//   render() {
//
//
//
//     const {params} = this.props.navigation.state;
//     const imageuri = params ? params.param : null
//
//
//
//     return ( <View >
//
//
//
//
//
//
//             </View>  )
//
//
//
//   }
//
//
//
// }
//
// //
// // <Surface >
// //   <Shape x={} width={this.state.coords.width} height={this.state.coords.height}/>
// // </Surface>
//
// // const styles = StyleSheet.create({
// //   overlay: {
// //     top: this.state.starty,
// //     left: this.state.startx,
// //     width: "100%",
// //     height: "100%",
// //     borderColor: 'red',
// //     borderWidth: 2,
// //     position: 'absolute'
// //   },
// //
// //
// // })
//
//
// {/* <TouchableOpacity onPress={ (event) =>  this.handlePress(event)}> */}
