import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";

import { icons } from "@/constants/icons";
import { images } from "@/constants/images";

import { fetchMovies } from "@/SERVICES/api";
import useFetch from "@/SERVICES/useFetch";

import MovieDisplayCard from "@/components/MovieCard";
import SearchBar from "@/components/searchBar";

const updateSearchCount = async (query: string, movie: Movie) => {   //appwrite function to simulate updating search count
  console.log(`Simulating updateSearchCount for "${query}" with movie: ${movie.title}`);
};

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");  //srote user input for search query

  const {
    data: movies = [],  //jaba loadmovies call hunxa ,movies ma data basxa
    loading,
    error,
    refetch: loadMovies, //function to fetch movies
    reset,
  } = useFetch(() => fetchMovies({ query: searchQuery }), false); //useFetch vanako custom hook ho, fetchMovies function lai call garxa ani searchQuery ko value pass garxa, autoFetch false xa bhani mount huna bela ma call hudaina, manual call garna parcha

  const handleSearch = (text: string) => {
    setSearchQuery(text);// user le search bar ma type gareko text lai set garxa
  };

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) { //searchQuery ma text xa vane
        await loadMovies();  // loadMovies function call garxa, ani fetchMovies function lai call garxa
  
        if (movies?.length! > 0 && movies?.[0]) {
          await updateSearchCount(searchQuery, movies[0]);//appwrite function call garxa to simulate updating search count
        }
      } else {
        reset();//searchQuery empty xa vane reset function call garxa, jasko karan data, loading ani error lai reset garna
      }
    }, 500);//debounce effect, 0.5s wait garxa before calling loadMovies

    return () => clearTimeout(timeoutId);// yo function le timeout clear garxa, jasko karan debounce effect ma problem na hos
  }, [searchQuery]);

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="absolute z-0 flex-1 w-full"
        resizeMode="cover"
      />

      <FlatList
        className="px-5"
        data={movies as Movie[]}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MovieDisplayCard {...item} />}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "flex-start",
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            <View className="flex-row items-center justify-center w-full mt-20">
              <Image source={icons.logo} className="w-12 h-10" />
            </View>

            <View className="my-5">
              <SearchBar
                placeholder="Search for a movie"
                value={searchQuery}
                onChangeText={handleSearch}
              />
            </View>

            {loading && (
              <ActivityIndicator
                size="large"
                color="#0000ff"
                className="my-3"
              />
            )}

            {error && (
              <Text className="px-5 my-3 text-red-500">
                Error: {error.message}
              </Text>
            )}

            {!loading &&
              !error &&
              searchQuery.trim() &&
              movies?.length! > 0 && (
                <Text className="text-xl font-bold text-white">
                  Search Results for{" "}
                  <Text className="text-accent">{searchQuery}</Text>
                </Text>
              )}
          </>
        }
        ListEmptyComponent={
          !loading && !error ? (
            <View className="px-5 mt-10">
              <Text className="text-center text-gray-500">
                {searchQuery.trim()
                  ? "No movies found"
                  : "Start typing to search for movies"}
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default Search;
