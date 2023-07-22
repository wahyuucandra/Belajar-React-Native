import { View, Text, Image, StyleSheet, Pressable} from 'react-native'
import React from 'react'
import {useEffect} from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux'
import { useNavigation } from '@react-navigation/native';

const getImage = (path) => `https://image.tmdb.org/t/p/w300/${path}`;

const card = (props) => {

  const navigation = useNavigation();

    const setLike = (index) => {
        props.changeState(true,index);
        props.handlePlus();
    }
    
    const setUnLike = (index) => {
      props.changeState(false,index);
        props.handleMinus();
    }

  return (
    <View key={props.list.id} style={styles.mainContainer}>
      <Pressable style={[styles.containerStyle]} onPress={() => {navigation.navigate('DetailFilm', {itemId: props.list.id})}}>
        <Image style={styles.img} source={{uri: getImage(props.list.poster_path)}}/>
        <View style={styles.loves}>
              <Icon name="heart" size={20} color={(props.list.isLove)?'red':'#a9a9a9'} onPress={() => {!props.list.isLove ? setLike(props.index) : setUnLike(props.index)}}/> 
            </View> 
        <View style={styles.cardContent}>
          <Text style={styles.titleText}>
            {props.list.original_title}
          </Text>
          <Text>
            Realese : {props.list.release_date}
          </Text>             
        </View>
      </Pressable>
    </View>
  )
}

const mapStateToProps = (state) => {
    return {
      totalLike : state.totalLike,
    }
  }

const mapDispatchToProps = (dispatch) => {
    return {
        handlePlus : () => dispatch({type: 'PLUS_LIKE'}),
        handleMinus : () => dispatch({type: 'MINUS_LIKE'}),
    }
}

const styles = StyleSheet.create({
  mainContainer: {
    display:'flex',
    flexDirection: 'row',
  },
  containerStyle: {
    width:180,
    elevation: 10,
    borderRadius: 8,
    backgroundColor: 'white',
    alignSelf: 'auto',
    marginBottom: 10,
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    marginBottom: 10,
  },
  loves:{
    position: 'absolute', 
    right: 0,
    margin: 14, 
    backgroundColor: 'white', 
    width:30,
    height:30,
    borderRadius: 30,
    display:"flex",
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexCenter:{
    display: 'flex', 
    flexDirection: 'row', 
    alignItems: 'center'
  },
  bgHeader: {
    backgroundColor: '#2C598D',
    width: '100%',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    display: 'flex',
    padding: 10,
    flexDirection: 'row'
  },
  card: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'white',
    alignSelf: 'auto',
    flex: 1,
    display: 'flex',
    position: 'relative',
  },
  img: {
    borderRadius: 8,
    height: 200,
    width: '100%',
    marginBottom: 8,
  },
  cardContent: {
    flex:1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 16,
    padding:10
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(card);