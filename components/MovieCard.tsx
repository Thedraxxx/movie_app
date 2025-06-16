import { icons } from '@/constants/icons'
import { Link } from 'expo-router'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'

const MovieCard = ({id,poster_path,title,vote_average,release_date}: Movie) => {
  return (
     <Link href={`/movies/${id}`} asChild> 
  <TouchableOpacity className="w-[30%] mb-4">
    <Image
      source={{
        uri: poster_path
          ? `https://image.tmdb.org/t/p/w500${poster_path}`
          : 'https://placeholder.co/600x400/1a1a1a/ffffff.png',
      }}
      className="w-full rounded-lg h-52"
      resizeMode="cover"
    />
    <Text className="mt-2 text-sm text-white" numberOfLines={2}>
      {title}
    </Text>
     <View className='flex-row items-center justify-start gap-x-1'>
        <Image source={icons.star} className='size-4'/>
        <Text className='text-xs text-white'> 
            {Math.round(vote_average * 10) / 10} | {new Date(release_date).getFullYear()}
        </Text>
     </View>
  </TouchableOpacity>
</Link>

  )
}

export default MovieCard