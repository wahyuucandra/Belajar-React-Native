import { StyleSheet, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './pages/Home'
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import DetailFilm from './pages/DetailFilm'
import Icon from 'react-native-vector-icons/FontAwesome';

const globalState = {
  totalLike : 0
}

const rootReducer = (state = globalState, action) => {
  switch (action.type) {
    case 'PLUS_LIKE':
      return { totalLike: state.totalLike + 1 }
    case 'MINUS_LIKE':
      return { totalLike: state.totalLike - 1 }
    default:
      return state
  }
}

const storeRedux = createStore(rootReducer);

const Stack = createNativeStackNavigator();

export default function App() {  

  return (
    <Provider store={storeRedux}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Film" 
          component={Home} 
          options={{
            headerTitle: () => <Text style={styles.titlePage}>Home</Text>,
            headerLeft: () => (
              <Icon name="bars" size={30} color="#ffffff" />
            ),
            headerRight: () => (
              <View style={styles.flexRow}>
              <View style={{position: 'relative', marginRight: 12}}>
                  <Icon name="heart" size={30} color="red" />
                  <Text style={{color:'white', fontWeight:'bold' , position: 'absolute',top: 4, left: 0, right: 0, marginLeft: 'auto', marginRight: 'auto', textAlign: 'center'}}>{this.totalLike}</Text>
              </View>
              <Icon name="user-circle" size={30} color="#ffffff" />
              </View>
            ),
            headerStyle: styles.bgHeader
          }}
        />
        <Stack.Screen 
          name="DetailFilm" 
          component={DetailFilm} 
          options={{
            headerTitle: () => <Text style={styles.titlePage}>Detail Film</Text>,
            headerRight: () => (
              <View style={styles.flexRow}>
              <View style={{position: 'relative', marginRight: 12}}>
                  <Icon name="heart" size={30} color="red" />
                  <Text style={{color:'white', fontWeight:'bold' , position: 'absolute',top: 4, left: 0, right: 0, marginLeft: 'auto', marginRight: 'auto', textAlign: 'center'}}>{this.totalLike}</Text>
              </View>
              <Icon name="user-circle" size={30} color="#ffffff" />
              </View>
            ),
            headerStyle: styles.bgHeader
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  bgHeader: {
    backgroundColor: '#2C598D',
    width: '100%',
    justifyContent: 'space-between',
    display: 'flex',
    padding: 10,
    flexDirection: 'row',
    color: "#ffffff",
  },
  titlePage:{
    color: "#ffffff",
    marginLeft:10,
    fontWeight: 'bold',
    fontSize: 22
  },
  flexRow: {
    display: 'flex', 
    flexDirection: 'row'
  }
});
