import { router } from "expo-router";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface MealData {
  id: string;
  title: string;
  imageUrl: string;
}

const HomeScreen = () => {

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.cameraButton} onPress={() => router.push("/add")}>
        <Ionicons name="add" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cameraButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
  },
});
