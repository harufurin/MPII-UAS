import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
    // use correct import for the hook; cast to any to avoid TS generic issues
    const navigation: any = useNavigation();

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.input} onPress={() => navigation.navigate('Users')}>
                <Text>Users</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.input} onPress={() => navigation.navigate('Products')}>
                <Text>Products</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 12,
        marginBottom: 15,
        borderRadius: 8,
    },
});

export default HomeScreen;