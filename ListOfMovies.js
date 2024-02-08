import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';

const ListOfMovies = ({ navigation }) => {

const startingDataSource = [
    { "title": "Elf", "releaseYear": "2003" },
    { "title": "The Grinch", "releaseYear": "1966" },
    { "title": "Die Hard", "releaseYear": "1988" },
    { "title": "Home Alone", "releaseYear": "1990" },
    { "title": "A Christmas Story", "releaseYear": "1983" }
  ];

  const [movies, setMovies] = useState(startingDataSource);
 
  async function loadMore() {
    try {
      const getMovie = await fetch('https://reactnative.dev/movies.json');
      const getInfo = await getMovie.json();
      setMovies(prevMovies => [...prevMovies, ...getInfo.movies]);
    }
    catch (error) {
      console.error('You reached the end of list!', error);
    }
  };
         
  return (
    <View style={styles.container}>    
      <FlatList
        data={movies}
        keyExtractor={(item) => item.title}
        renderItem = {({item}) => (
          <TouchableOpacity
            style={[styles.item, styles.border]}
            onPress={() => {
              navigation.navigate('Movie Details',{title: item.title, releaseYear: item.releaseYear });
            }}>
           <View>
              <Text style={{ fontSize: 20 }}> {item.title} </Text>
            </View> 
          </TouchableOpacity>
        )}
        extraData={movies}
      />
      <Text style={[styles.loadMoreButton]} onPress={loadMore}>Load More</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
     paddingTop: 50
    },
    item: {
      padding: 10,
      fontSize: 18,
      height: 54,
    },
    border: {
      borderWidth: 1,
      borderColor: "gray",
    },
    loadMoreButton: {
      backgroundColor: 'white',
      padding: 10,
      alignItems: 'center',
      fontSize: 16,
      color: 'blue',
    },
      });  

export default ListOfMovies;

