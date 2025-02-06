import { View, Text, TouchableHighlight, StyleSheet } from "react-native";
import { useAuth, useUser } from "@clerk/clerk-expo";


const Profile = () => {
    const { signOut } = useAuth();
    const { user } = useUser();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Profile</Text>
            <Text style={styles.email}>{user?.emailAddresses[0]?.emailAddress}</Text>
            <TouchableHighlight style={styles.button} onPress={() => signOut()}>
                <Text style={styles.buttonText}>Sign Out</Text>
            </TouchableHighlight>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    email: {
        fontSize: 18,
        color: '#333',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default Profile;