import { Stack } from "expo-router";
import "./globels.css";
export default function RootLayout() {
  return <Stack>
      <Stack.Screen 
      name="(tabs)"
      options={{headerShown: false}}

      />  
      <Stack.Screen
         name="movies/[id].tsx"
         options={{headerShown: false}}
      />
  </Stack>;
}
