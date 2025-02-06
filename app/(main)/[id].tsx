import { useLocalSearchParams } from "expo-router";
import { View, Text, FlatList, Image, StyleSheet, ScrollView } from "react-native";
import { useMeals } from "../context/mealsContext";

const detailScreen = () => {
    const { id } = useLocalSearchParams();
    const { meals } = useMeals();
    const meal = meals.find((m) => m.id === id);

    console.log(meal.foods[0].food.nutrients.ENERC_KCAL);

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Nom : <Text style={styles.value}>{meal?.name}</Text></Text>

            <Text style={styles.label}>Nombre d'aliments : <Text style={styles.value}>{meal?.foods.length}</Text></Text>

            <Text style={styles.label}>Calories : <Text style={styles.value}>{meal?.foods.reduce((acc, food) => acc + food.food.nutrients.ENERC_KCAL, 0)} KCAL</Text></Text>

            <Text style={styles.label}>Protéines : <Text style={styles.value}>{meal?.foods.reduce((acc, food) => acc + food.food.nutrients.PROCNT, 0)} g</Text></Text>

            <Text style={styles.label}>Glucides : <Text style={styles.value}>{meal?.foods.reduce((acc, food) => acc + food.food.nutrients.CHOCDF, 0)} g</Text></Text>

            <Text style={styles.label}>Lipides : <Text style={styles.value}>{meal?.foods.reduce((acc, food) => acc + food.food.nutrients.FAT, 0)} g</Text></Text>

            <Text style={styles.subtitle}>Liste des aliments :</Text>
            <FlatList
                data={meal?.foods}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.foodItemContainer}>
                        <Image source={{ uri: item.food.image }} style={styles.foodItemImage} />
                        <View style={styles.foodItemTextContainer}>
                            <Text style={styles.foodItemText}>{item.food.label}</Text>
                        </View>
                    </View>
                )}
            />
        </View>
    );
};

export default detailScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
      },
      label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 8,
      },
      value: {
        fontWeight: 'normal',
      },
      subtitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 16,
        marginBottom: 8,
      },
      foodItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        marginVertical: 4,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
      },
      foodItemImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 16,
      },
      foodItemTextContainer: {
        flex: 1,
      },
      foodItemText: {
        fontSize: 16,
      },
});