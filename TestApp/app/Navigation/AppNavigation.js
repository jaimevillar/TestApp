import React from 'react'
import { StackNavigator } from 'react-navigation'
import StarWarsList from '../Containers/StarWarsList'
import CharacterDetails from '../Containers/CharacterDetails'

const StarWarsListStack = StackNavigator({
  StarWarsList: {
    screen: StarWarsList,
    navigationOptions: { title: 'Star Wars' }
  },
  CharacterDetails: {
    screen: CharacterDetails,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.name.toUpperCase()}`,
    }),
  },
  
}, {
  mode: 'card',
  headerMode: 'screen',
  navigationOptions: {
    headerTitleStyle: {
      color: '#FFFFFF'
    },
    headerStyle: {
      backgroundColor: '#000000'
    },
    headerTintColor: '#FFFFFF'
  }
});


export default StarWarsListStack