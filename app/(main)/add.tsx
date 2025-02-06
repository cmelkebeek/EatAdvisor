import { useState } from "react";
import { View, Text, TextInput, StyleSheet, FlatList, Image, TouchableOpacity, Alert, Modal } from "react-native";
import { addMeal } from "../context/mealsContext";

const appId = process.env.EXPO_PUBLIC_EDAMAM_API_ID!;
const appKey = process.env.EXPO_PUBLIC_EDAMAM_API_KEY!;
const urlApi = process.env.EXPO_PUBLIC_EDAMAM_API_URL!;

if (!appId) {
    throw new Error(
      "Missing Publishable Key. Please set EXPO_PUBLIC_EDAMAM_API_ID in your .env"
    );
  }

  if (!appKey) {
    throw new Error(
      "Missing Publishable Key. Please set EXPO_PUBLIC_EDAMAM_API_KEY in your .env"
    );
  }

  if (!urlApi) {
    throw new Error(
      "Missing Publishable Key. Please set EXPO_PUBLIC_EDAMAM_API_URL in your .env"
    );
  }

const Add = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [selectedFoods, setSelectedFoods] = useState<any[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [mealName, setMealName] = useState("");

    const fetchRecipes = async (query: string) => {
        const url = `${urlApi}?app_id=${appId}&app_key=${appKey}&ingr=${query}`;
        
        try {
            const response = await fetch(url);
            const data = await response.json();
            setResults(data.hints);
        } catch (error) {
            console.error("Erreur lors de la récupération des données :", error);
        }
    };

    const addFoodMeal = async (item: any) => {
        setSelectedFoods([...selectedFoods, item]);
        Alert.alert("Aliment ajouté", `L'aliment ${item.food.label} a bien été ajouté.`);
    };

    const handleAddMeal = () => {
        if (selectedFoods.length === 0) {
            Alert.alert("Aucun aliment choisi", "Veuillez sélectionner au moins un aliment.");
        }
        else {
            setModalVisible(true);
        }
    };

    const saveMeal = async () => {
        const meal = {
            name: mealName,
            foods: selectedFoods,
        };
        addMeal(meal);
        console.log(meal);
        setModalVisible(false);
        setSelectedFoods([]);
        setMealName("");
        Alert.alert("Repas ajouté", "Le repas a bien été ajouté.");
    };
    
    return (
        <View style={styles.container}>
                        <View style={styles.searchContainer}>
                <Text>Ajouter un repas :</Text>
                <View style={styles.searchRow}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Rechercher un aliment"
                        value={query}
                        onChangeText={setQuery}
                    />
                    <TouchableOpacity style={styles.searchButton} onPress={() => fetchRecipes(query)}>
                        <Text style={styles.buttonText}>Rechercher</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.selectedFoodsContainer}>
                <Text>Nombre d'aliments choisis : {selectedFoods.length}</Text>
                <TouchableOpacity style={styles.addButton} onPress={() => handleAddMeal()}>
                    <Text style={styles.buttonText}>Ajouter le repas</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={results}
                keyExtractor={(item) => item.food.foodId}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => addFoodMeal(item)} style={styles.resultItem}>
                        <Image source={{ uri: item.food.image }} style={styles.resultImage} />
                        <View style={styles.resultTextContainer}>
                            <Text style={styles.resultText}>{item.food.label}</Text>
                            <Text style={styles.resultSubText}>{item.food.nutrients.ENERC_KCAL} KCAL</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <Text>Nom du repas :</Text>
                        <TextInput
                        style={styles.textInputModal}
                        placeholder="Choisir un nom pour le repas"
                        value={mealName}
                        onChangeText={setMealName}
                        />
                        <TouchableOpacity style={styles.addButton} onPress={() => saveMeal()}>
                            <Text style={styles.buttonText}>Valider</Text>
                        </TouchableOpacity>

                        <Text>Récap des aliments :</Text>
                        <FlatList
                            data={selectedFoods}
                            keyExtractor={(item) => item.food.foodId}
                            renderItem={({ item }) => (
                                <View style={styles.foodItemContainer}>
                                    <Image source={{ uri: item.food.image }} style={styles.foodItemImage} />
                                        <View style={styles.foodItemTextContainer}>
                                            <Text style={styles.foodItemText}>{item.food.label}</Text>
                                            <Text style={styles.foodItemSubText}>{item.food.nutrients.ENERC_KCAL} KCAL</Text>
                                        </View>
                                </View>
                            )}
                         />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default Add;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5', // Ajouté pour un fond de couleur clair
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    },
    searchContainer: {
        marginBottom: 16,
    },
    searchRow: {
        flexDirection: 'row', // Ajouté pour aligner le TextInput et le bouton sur la même ligne
        alignItems: 'center', // Ajouté pour centrer verticalement le TextInput et le bouton
    },
    textInput: {
        flex: 1, // Ajouté pour permettre au TextInput de prendre tout l'espace disponible
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingLeft: 8,
        marginRight: 8, // Ajouté pour ajouter un espace entre le TextInput et le bouton
        borderRadius: 8, // Ajouté pour arrondir les coins
        backgroundColor: '#fff', // Ajouté pour un fond blanc
        shadowColor: '#000', // Ajouté pour l'ombre
        shadowOffset: { width: 0, height: 2 }, // Ajouté pour l'ombre
        shadowOpacity: 0.1, // Ajouté pour l'ombre
        shadowRadius: 8, // Ajouté pour l'ombre
        elevation: 2, // Ajouté pour l'ombre sur Android
    },
    searchButton: {
        backgroundColor: '#007BFF', // Couleur de fond du bouton
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 8, // Ajouté pour arrondir les coins
        shadowColor: '#000', // Ajouté pour l'ombre
        shadowOffset: { width: 0, height: 2 }, // Ajouté pour l'ombre
        shadowOpacity: 0.1, // Ajouté pour l'ombre
        shadowRadius: 8, // Ajouté pour l'ombre
        elevation: 2, // Ajouté pour l'ombre sur Android
    },
    addButton: {
        backgroundColor: '#28a745', // Couleur de fond du bouton
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 8, // Ajouté pour arrondir les coins
        shadowColor: '#000', // Ajouté pour l'ombre
        shadowOffset: { width: 0, height: 2 }, // Ajouté pour l'ombre
        shadowOpacity: 0.1, // Ajouté pour l'ombre
        shadowRadius: 8, // Ajouté pour l'ombre
        elevation: 2, // Ajouté pour l'ombre sur Android
        marginTop: 8, // Ajouté pour ajouter un espace au-dessus du bouton
    },
    buttonText: {
        color: '#fff', // Couleur du texte du bouton
        fontWeight: 'bold',
        textAlign: 'center',
    },
    selectedFoodsContainer: {
        marginBottom: 16,
    },
    resultItem: {
        flexDirection: 'row', // Ajouté pour aligner le texte à côté de l'image
        alignItems: 'center', // Ajouté pour centrer verticalement le texte par rapport à l'image
        padding: 10,
        marginVertical: 8, // Ajouté pour ajouter un espace vertical entre les éléments
        backgroundColor: '#fff', // Ajouté pour un fond blanc
        borderRadius: 8, // Ajouté pour arrondir les coins
        shadowColor: '#000', // Ajouté pour l'ombre
        shadowOffset: { width: 0, height: 2 }, // Ajouté pour l'ombre
        shadowOpacity: 0.1, // Ajouté pour l'ombre
        shadowRadius: 8, // Ajouté pour l'ombre
        elevation: 2, // Ajouté pour l'ombre sur Android
    },
    resultImage: {
        width: 50,
        height: 50,
        borderRadius: 8, // Ajouté pour arrondir les coins de l'image
        marginRight: 10, // Ajouté pour ajouter un espace entre l'image et le texte
    },
    resultTextContainer: {
        flex: 1,
    },
    resultText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    resultSubText: {
        fontSize: 14,
        color: 'gray',
    },
    modalView: {
        width: 300, // Taille fixe en largeur
        height: 400, // Taille fixe en hauteur
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    textInputModal: {
        width: '100%', // Ajouté pour prendre toute la largeur
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingLeft: 8,
        marginRight: 8, // Ajouté pour ajouter un espace entre le TextInput et le bouton
        borderRadius: 8, // Ajouté pour arrondir les coins
        backgroundColor: '#fff', // Ajouté pour un fond blanc
        shadowColor: '#000', // Ajouté pour l'ombre
        shadowOffset: { width: 0, height: 2 }, // Ajouté pour l'ombre
        shadowOpacity: 0.1, // Ajouté pour l'ombre
        shadowRadius: 8, // Ajouté pour l'ombre
        elevation: 2, // Ajouté pour l'ombre sur Android
    },
    foodItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginVertical: 5,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    foodItemImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    foodItemTextContainer: {
        flex: 1,
    },
    foodItemText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    foodItemSubText: {
        fontSize: 14,
        color: 'gray',
    },
});