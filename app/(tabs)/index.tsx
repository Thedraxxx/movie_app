
import SearchBar from "@/components/searchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { useRouter } from "expo-router";
import { Image, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function Index() {

   const router = useRouter();


  return (
    <SafeAreaView className="flex-1 bg-primary">
         <Image source={images.bg} className="absolute z-0 w-full" />

         <ScrollView className="flex-1 px-5"
          showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 15, minHeight: '100%' }} // scroll garna hepp garxa
         >
              <Image source={icons.logo} className="w-12 mx-auto mt-10 mb-2"/>
                
                <View className="flex-1">
                      <SearchBar
                        onPress={() => router.push('/search')}
                        placeholder="Search for a movie"
                      />
                </View>
             

            
         </ScrollView>
    </SafeAreaView>
  );
}
