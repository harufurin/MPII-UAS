import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';

type User = { id: number; name?: string; email?: string;[key: string]: any };

const UsersScreen = () => {
    const [data, setData] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const route = useRoute<any>();
    const token = (route && (route as any).params && (route as any).params.token) ?? '';

    useEffect(() => {
        let mounted = true;
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await fetch('http://localhost:3000/users', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error(`HTTP ERROR! status: ${response.status}`);
                }
                const json = await response.json();
                if (mounted) setData(Array.isArray(json) ? json : []);
            } catch (e: any) {
                if (mounted) setError(e.message ?? 'Unknown error');
            } finally {
                if (mounted) setLoading(false);
            }
        };
        fetchData();
        return () => {
            mounted = false;
        };
    }, [token]);

    if (loading) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Loading users...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Error</Text>
                <Text>{error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Users</Text>
            {data.length === 0 ? (
                <Text>No users found.</Text>
            ) : (
                data.map((user) => (
                    <View key={user.id} style={{ marginBottom: 12 }}>
                        <Text style={{ fontWeight: '600' }}>{user.name ?? 'Unnamed'}</Text>
                        {user.email ? <Text>{user.email}</Text> : null}
                    </View>
                ))
            )}
        </View>
    );
};

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

export default UsersScreen;