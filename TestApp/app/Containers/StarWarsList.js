import React, { Component } from 'react'
import { List, ListItem, Button } from 'react-native-elements'
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    ActivityIndicator,
} from 'react-native'

export default class StarWarsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            swData: [],
            error: '',
            swChars: [],
            nameSort: false,
            specieSort: false,
            swCharsNameSort: [],
            swCharsSpecieSort: []
        }
    }

    componentWillMount() {
        this.getSWData()
      }

    async getSWData() {

        try {
            this.setState({ loading: true })
            let response = await fetch('https://swapi.co/api/people/');
            let responseJson = await response.json();
            // console.log('getApiData() ' + JSON.stringify(responseJson))
            this.state.swData = responseJson.results
            // console.log('SWData: ' + JSON.stringify(this.state.swData))
            var charsArr = []
            for (i = 0; i < this.state.swData.length; i++) {
                // console.log('SpeciesURL: ' + this.state.swData[i].species[0])
                
                let resSpecie = await fetch(this.state.swData[i].species[0]);
                let resSpecieJson = await resSpecie.json();
                //var specie = getSpecie(swChars[i].species[0])
                //console.log('resSpecieJSON: ' + JSON.stringify(resSpecieJson.name))
                
                charsArr.push({
                    key: i,
                    name: this.state.swData[i].name,
                    specie: resSpecieJson.name,
                    gender: this.state.swData[i].gender,
                    height: this.state.swData[i].height,
                    mass: this.state.swData[i].mass
                })
            }
            this.state.swChars = charsArr
            console.log(this.state.swChars)

            console.log('sort: ' + JSON.stringify(this.state.swChars.sort()))
            this.setState({ loading: false })

        } catch (error) {
            console.error(error);
        }

          /*
        console.log('test: ' + await JSON.stringify(this.getApi()))

        this.setState({loading: true})
        this.state.swData = await this.getApi()
        .then(() => {
            this.setState({loading: false})
            console.log('success: ' + this.state.swData)
        })
        .catch(() => {
            alert('error')
        })
        */
    }

    onDetail = (character) => {
      this.props.navigation.navigate('CharacterDetails', { ...character })
    }

    onNameSort(){
        this.setState({ 
            loading: true,
            nameSort: true,
            specieSort: false
        })

        this.state.swCharsNameSort = this.state.swChars
        this.state.swCharsNameSort.sort(function(a,b) {return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);} );
        console.log('sort name: ' + JSON.stringify(this.state.swCharsNameSort))

        this.setState({ loading: false })
    }


    onSpecieSort(){
        this.setState({ 
            loading: true,
            nameSort: false,
            specieSort: true
        })

        this.state.swCharsSpecieSort = this.state.swChars
        this.state.swCharsSpecieSort.sort(function(a,b) {return (a.specie > b.specie) ? 1 : ((b.specie > a.specie) ? -1 : 0);} );
        console.log('sort specie: ' + JSON.stringify(this.state.swCharsSpecieSort))

        this.setState({ loading: false })
    }

    render() {
        if (this.state.loading) {
            return (
                    <ActivityIndicator style={styles.activityIndicator} animating={this.state.loading} size="large" />
            )
        } else if (this.state.nameSort) {
            return (
                <ScrollView>
                    <Button
                        title='SORT BY SPECIE' 
                        onPress={() => this.onSpecieSort()}
                        buttonStyle={styles.button}
                        />

                        <List>
                        {this.state.swCharsNameSort.map((character) => (
                            <ListItem
                                key={`${character.key}`}
                                title={character.name}
                                subtitle={character.specie}
                                onPress={() => this.onDetail(character)}
                                //hideChevron
                            />
                        ))}
                        </List> 

                </ScrollView>
            );
        } else if (this.state.specieSort) {
            return (
                <ScrollView>
                    <Button
                        title='SORT BY NAME' 
                        onPress={() => this.onNameSort()}
                        buttonStyle={styles.button}
                        />
                        <List>
                        {this.state.swCharsSpecieSort.map((character) => (
                            <ListItem
                                key={`${character.key}`}
                                title={character.name}
                                subtitle={character.specie}
                                onPress={() => this.onDetail(character)}
                                //hideChevron
                            />
                        ))}
                        </List> 

                </ScrollView>
            );
        } else {
            return (
                <ScrollView>

                    <Button
                        title='SORT BY NAME'
                        onPress={() => this.onNameSort()}
                        buttonStyle={styles.button}
                    />
                    <Button
                        title='SORT BY SPECIE'
                        onPress={() => this.onSpecieSort()}
                        buttonStyle={styles.button}
                    />
                        <List>
                        {this.state.swChars.map((character) => (
                            <ListItem
                                key={`${character.key}`}
                                title={character.name}
                                subtitle={character.specie}
                                onPress={() => this.onDetail(character)}
                                //hideChevron
                            />
                        ))}
                        </List> 
                </ScrollView>
            );
        }
    }
}


const styles = StyleSheet.create({
    button: {
        backgroundColor: '#b20000',
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginVertical: 15,
        borderRadius: 10
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 80
     },
})

