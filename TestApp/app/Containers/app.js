import React, { Component } from 'react'
import { List, ListItem } from 'react-native-elements'
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    ActivityIndicator,
} from 'react-native'

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            swData: [],
            error: ''
        }

    }

    componentWillMount() {
        //this.getData()
        this.httpRequest()
      }

    httpRequest(){
        this.setState({loading: true})
        var request = new XMLHttpRequest();
    
        function onLoad() {
        };
    
        function onTimeout() {
            console.log('Timeout');
            console.log(request.responseText);
            alert(request.responseText)
        };
    
        function onError() {
            console.log('General network error');
            console.log(request.responseText);
            alert(request.responseText)
        };
    
        request.onload = onLoad;
        request.ontimeout = onTimeout;
        request.onerror = onError;
        request.open('GET', 'https://swapi.co/api/people/', true);
        request.setRequestHeader("Content-type", "application/json");
        request.setRequestHeader("Accept", "application/json");
    
        request.onreadystatechange = (e) => {
          if(request.readyState == 4 && request.status == 200) {
    
            let jsonParse = JSON.parse(request.responseText)
            this.state.swData = jsonParse.results

            //console.log(jsonParse)  
            console.log(this.swData)
            this.setState({loading: false})
          }
        }
    
        request.send();
    
      }

      speciesRequest(endpoint):string{
        this.setState({loading: true})
        var spname = ''
        var request = new XMLHttpRequest();
    
        function onLoad() {
        };
    
        function onTimeout() {
            console.log('Timeout');
            console.log(request.responseText);
            alert(request.responseText)
        };
    
        function onError() {
            console.log('General network error');
            console.log(request.responseText);
            alert(request.responseText)
        };
    
        request.onload = onLoad;
        request.ontimeout = onTimeout;
        request.onerror = onError;
        request.open('GET', endpoint, true);
        request.setRequestHeader("Content-type", "application/json");
        request.setRequestHeader("Accept", "application/json");
    
        request.onreadystatechange = (e) => {
          if(request.readyState == 4 && request.status == 200) {
    
            let jsonParse = JSON.parse(request.responseText)
            spname = jsonParse.name
            this.setState({loading: false})
            console.log(spname)
          }
        }
    
        request.send();

        return spname
    
      }

    render() {
        if (this.state.loading) {
            return (
                <ActivityIndicator style={styles.activityIndicator} animating={this.state.loading} size="large" />
            )
        } else {
            return (
                <ScrollView>
                    <List>
                        {this.state.swData.map((sw) => (
                            <ListItem
                                //key={`${character.id}`}
                                title={sw.name}
                                //subtitle={sw.}
                                //onPress={() => device.itemHQT ? this.onDetail(device.itemHQT) : null}
                                hideChevron
                            />
                        ))}


                    </List>
                </ScrollView>
            );
        }
    }
}

const styles = StyleSheet.create({
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
        color: "white",
        backgroundColor: "transparent"
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