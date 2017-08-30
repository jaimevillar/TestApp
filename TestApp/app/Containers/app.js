import React, { Component } from 'react'
import { List, ListItem } from 'react-native-elements'
import Navigation from '../Navigation/AppNavigation'
import StarWarsList from '../Containers/StarWarsList'
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    ActivityIndicator,
    StatusBar,
} from 'react-native'

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
        }

    }

    render() {
        StatusBar.setBackgroundColor('#000000', true)
        if (this.state.loading) {
            return (
                <View style={styles.applicationView}>
                    <StatusBar barStyle='light-content' />
                    <ActivityIndicator style={styles.activityIndicator} animating={this.state.loading} size="large" />
                </View>
            )
        } else {
            return (
                <View style={styles.applicationView}>
                    <StatusBar barStyle='light-content' />
                    <Navigation/>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    applicationView: {
        flex: 1
      },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 2,
    },
    feedback: {
        textAlign: 'center',
        color: '#996633',
        marginBottom: 3,
    },
    button: {
        backgroundColor: "teal",
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginVertical: 15,
        borderRadius: 10
    },
    buttonText: {
        color: "white"
        // backgroundColor: "transparent"
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 80
     },
})

/*
function setCharacter(swChars) {
    var charsArr = []

    for(i = 0; i < swChars.length; i++){
        charsArr.push({
            key: i,
            name: swChars[i].name,
            //specie: 
        })
    }

}
*/