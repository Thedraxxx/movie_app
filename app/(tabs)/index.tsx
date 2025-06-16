import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/searchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/SERVICES/api";
import useFetch from "@/SERVICES/useFetch";
import { useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const router = useRouter();
  const {
    data: movies,
    loading: moviesloading,
    error: moviesError,
  } = useFetch(() => fetchMovies({ query: "" }));
  return (
    <SafeAreaView className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute z-0 w-full" />

      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 15, minHeight: "100%" }} // scroll garna hepp garxa
      >
        <Image source={icons.logo} className="w-12 mx-auto mt-10 mb-2" />
        {moviesloading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            className="self-center mt-10"
          />
        ) : moviesError ? (
          <Text className="">Error: {moviesError?.message}</Text>
        ) : (
          <View className="flex-1">
            <SearchBar
              onPress={() => router.push("/search")}
              placeholder="Search for a movie"
            />
            <>
              <Text className="mt-5 mb-3 text-lg font-bold text-white">Latest Movies</Text>
              <FlatList
                data={movies}
                renderItem={({ item }) => (
                 <MovieCard
                      {...item} // spread operator to pass all item properties as props

                 />
                )}
                keyExtractor={(item) => item.id.toString()}

                numColumns={3} // 3 columns for grid layout
                columnWrapperStyle={{ 
                  justifyContent: "flex-start",
                  gap: 20, // space between items
                  marginBottom: 10, // space at the bottom of each row
                  paddingBottom: 5 // padding at the bottom of the list
                 }} 
                 className="mt-3 pb-30" // padding at the bottom of the list
                 scrollEnabled={false} // disable scrolling for the FlatList
              />
            </>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
