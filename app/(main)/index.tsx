import { router } from "expo-router";
import { View, Text, StyleSheet, Button, TouchableOpacity, FlatList, TouchableHighlight, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useMeals } from "../context/mealsContext";

const HomeScreen = () => {
  const { meals, deleteMeal } = useMeals();  

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.cameraButton} onPress={() => router.push("/add")}>
        <Ionicons name="add" size={24} color="black" />
      </TouchableOpacity>

      <FlatList
        data={meals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const totalMeal = item.foods.length;

          return (
            <View style={styles.card}>
              <Pressable onPress={() => router.push(`/${item.id}`)}>
                <View style={styles.cardContent}>
                  <View>
                    <Text style={styles.cardTitle}>{item.name}</Text>
                    <Text>Nombres d'aliments : {totalMeal} </Text>
                  </View>
                  <TouchableOpacity onPress={() => deleteMeal(item.id)} style={styles.trashIcon}>
                    <Ionicons name="trash" size={24} color="black" />
                  </TouchableOpacity>
                </View>
              </Pressable>
            </View>
          );
        }}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  cameraButton: {
    alignSelf: 'flex-end',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  trashIcon: {
    marginLeft: 'auto',
  },
});
