import { icons } from '@/constants/icons'
import React from 'react'
import { Image, TextInput, View } from 'react-native'

const SearchBar = () => {
  return (
    <View className='flex-row items-center px-4 py-4 border rounded-full border-primary bg-secondary'>
       <Image source={icons.search} className="size-5" tintColor='#ab8bff' resizeMode='contain' />
         <TextInput
          placeholder='Search a movie'
          placeholderTextColor='#ab8bff'
          className='flex-1 ml-2 text-base text-white'
    
        />
    </View>
  )
}

export default SearchBar