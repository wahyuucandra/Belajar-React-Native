import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux'
import axios from 'axios'
import { useRoute } from '@react-navigation/native';

const getImage = (path) => `https://image.tmdb.org/t/p/w300/${path}`;

const api_key = "19feafc002d5a11018b8d141dedf0402";

const DetailFilm = (props) => {

  const route = useRoute();

    const { itemId } = route.params;

    const [state, setstate] = React.useState({})

    React.useEffect(() => {
    
        axios.get(`https://api.themoviedb.org/3/movie/${itemId}`,{
        params: {
            api_key : api_key
        }
        })
        .then((response) => {
            //handle success
            setstate(response.data);
          })
          .catch(function (error) {
            // handle error
            console.log(error.message);
          })
        
    })

    const setLike = () => {
      props.handlePlus();
    }
    
    const setUnLike = () => {
        props.handleMinus();
    }

  return (
    <View style={{height: '100%'}}>
            <View style={[styles.card, styles.elevation]}>
            <Image
            style={styles.img} 
            source={{uri: getImage(state.poster_path)}}/>
            <View style={styles.cardContent}>
              <Text style={styles.titleText}>
                {state.original_title}
              </Text>
              <Text style={{textAlign: 'justify', flex: 1}}>
                {state.overview}
              </Text>   
              <View style={{display: 'flex', flexDirection:'row'}}>
                <View  style={{marginRight: 8,flex: 1, borderRadius: 8, height: 48, backgroundColor:'#24a0ed', display:'flex', justifyContent:'center', alignItems: 'center'}}>
                  <Text style={{fontWeight:600, fontSize: 18, color: 'white'}}>Buy Ticket</Text>
                </View>
                <View  style={{width: 48,borderRadius: 8, height: 48, backgroundColor:'#24a0ed', display:'flex', justifyContent:'center', alignItems: 'center'}}>
                <Icon name="heart" size={30} color={(state.isLove)?'red':'#a9a9a9'} onPress={() => {!state.isLove ? setLike() : setUnLike()}}/> 
                </View>
                <View>
                  
                </View>
              </View>
            </View>
          </View>
    </View>
  )
}

const styles = StyleSheet.create({
    titleText: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 8,
      textAlign: 'center',
    },
    card: {
      alignSelf: 'center',
      marginVertical: 16,
      padding: 8,
      borderRadius: 8,
      backgroundColor: 'white',
      flex: 1,
      display: 'flex',
      width: '90%',
    },
    elevation: {
      elevation: 10,
      shadowColor: '#52006A',
    },
    img: {
      borderRadius: 8,
      height: 300,
      marginBottom: 8,
      objectFit: 'contain',
    },
    cardContent: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
    }
});

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

export default  connect(mapStateToProps, mapDispatchToProps)(DetailFilm);