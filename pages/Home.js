import { View, ScrollView, StyleSheet, Text } from 'react-native'
import React from 'react'
import Card from '../components/card'
import { useState, useEffect } from 'react'
import axios from 'axios'

const Home = () => {

  const [TempPostNowPlaying, setTempPostNowPlaying] = useState([]);

  const api_key = "19feafc002d5a11018b8d141dedf0402";

  useEffect(() => {
    axios.get('https://api.themoviedb.org/3/movie/now_playing',{
      params: {
        api_key : api_key
      }
    })
  .then((response) => {
    //handle success

    let TempArr = [];

    for (let index = 0; index < response.data.results.length; index++) {
      TempArr.push({
        adult: response.data.results[index].adult,
        backdrop_path: response.data.results[index].backdrop_path,
        genre_ids: response.data.results[index].backdrop_path,
        id: response.data.results[index].id,
        original_language: response.data.results[index].original_language,
        original_title: response.data.results[index].original_title,
        overview: response.data.results[index].overview,
        popularity: response.data.results[index].popularity,
        poster_path: response.data.results[index].poster_path,
        release_date: response.data.results[index].release_date,
        title: response.data.results[index].title,
        video: response.data.results[index].video,
        vote_average: response.data.results[index].vote_average,
        vote_count: response.data.results[index].vote_count,
        isLove: false
    }); 
    }

    setTempPostNowPlaying(TempArr);
    })
    .catch(function (error) {
      // handle error
      console.log(error.message);
    })
    });

  ChangeStateNowPlaying = (newValue, index) => {
    let newArr = [...TempPostNowPlaying];
    newArr[index].isLove = newValue;
    setTempPostNowPlaying(newArr);
  }

  return (
    <View>
      <ScrollView>
        <View style={styles.list}>
        {
        TempPostNowPlaying.map((list, index)=>{
          return <Card 
            changeState={(value, index) => {ChangeStateNowPlaying(value, index)}} 
            key={list.id} 
            list={list} 
            index={index}/>
        })
        }
        </View>
      </ScrollView>
    </View>
      
  )
}
//

const styles = StyleSheet.create({
  list: {
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 8,
    paddingRight: 8,
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    gap:8,
  },
})

export default Home;