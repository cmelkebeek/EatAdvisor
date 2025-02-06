import { useAuth } from "@clerk/clerk-expo";
import { Redirect, Stack } from "expo-router";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function AuthRoutesLayout() {
  const { isSignedIn, signOut } = useAuth();

  if (!isSignedIn) {
    return <Redirect href={"/sign-in"} />;
  }

  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ 
          title: "Home",
          headerRight: () => (
            <TouchableOpacity onPress={() => signOut()}>
                <Ionicons name="log-out-outline" size={24} color="black" />
            </TouchableOpacity>
          )
        }} 
      />
      
    </Stack>
  );
}
