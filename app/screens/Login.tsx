import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation, NavigationProp, useRoute } from '@react-navigation/native';

const LoginScreen: React.FC = () => {
    const navigation = useNavigation<NavigationProp<any>>();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setLoading] = useState(false);
    const route = useRoute();
    const token = route;

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer' + token
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                }),
            });
            const res = await response.json();
            if (!response.ok) {
                alert(res.message);
                throw new Error(`HTTP: Error! Status: ${response.status}`);
            }
            navigation.navigate('Home', {token:res.token});
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>

            <TextInput
                style={styles.input}
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
            />

            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            {isLoading ? (
                <ActivityIndicator size="large" color="#000" style={{opacity: 0.5}}/>
            ) : (
                <Button title="Submit" onPress={handleSubmit} />
            )}
            
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

export default LoginScreen;