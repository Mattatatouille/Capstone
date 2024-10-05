// pages/Login.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { auth } from '../firebaseConfig'; // Adjust the path if necessary
import { signInWithEmailAndPassword } from 'firebase/auth';
import COLORS from '../constants/colors';

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            Alert.alert("Login Successful", "Welcome back!");
            navigation.navigate('HomePage'); // Navigate to Home after successful login
        } catch (error) {
            Alert.alert("Login Error", error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Image 
                source={require('../assets/logo_tran.png')} // Adjust the path as necessary
                style={styles.logo} 
                resizeMode="contain"
            />
            <Text style={styles.title}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor={COLORS.black}
                required
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholderTextColor={COLORS.black}
                required
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Log In</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text style={styles.switchText}>Don't have an account? Sign Up</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        backgroundColor: COLORS.primary,
    },
    logo: {
        width: 200, // Adjust width as needed
        height: 200, // Adjust height as needed
        alignSelf: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.white,
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        height: 50,
        borderColor: COLORS.white,
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        paddingHorizontal: 10,
        color: COLORS.black, // Changed to black for visibility
        backgroundColor: COLORS.white,
    },
    button: {
        backgroundColor: COLORS.white,
        paddingVertical: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.black,
    },
    switchText: {
        color: COLORS.white,
        textAlign: 'center',
        marginTop: 20,
    },
});

export default Login;
