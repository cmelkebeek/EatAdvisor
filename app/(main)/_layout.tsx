import { useAuth } from "@clerk/clerk-expo";
import { Redirect, router, Stack } from "expo-router";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";


export default function AuthRoutesLayout() {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return <Redirect href={"/sign-in"} />;
  }

  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ 
          title: "Accueil",
          headerRight: () => (
            <TouchableOpacity onPress={() => router.push("/profile")}>
                <Ionicons name="person-circle-outline" size={24} color="black" />
            </TouchableOpacity>
          )
        }} 
      />

      <Stack.Screen 
        name="profile" 
        options={{ 
          title: "Profile",
        }}
      />

      <Stack.Screen 
        name="add" 
        options={{ 
          title: "Ajouter un repas",
        }}
      />

      <Stack.Screen 
        name="[id]" 
        options={{ 
          title: "Détail du repas",
        }}
      />
      
    </Stack>
  );
}
