// pages/Signup.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { auth } from '../firebaseConfig'; // Adjust this import if needed
import { createUserWithEmailAndPassword } from 'firebase/auth';
import COLORS from '../constants/colors';

const Signup = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSignup = async () => {
        if (password !== confirmPassword) {
            Alert.alert("Passwords do not match");
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            Alert.alert("Signup Successful", "Welcome!");
            navigation.navigate('HomePage'); // Navigate to Home after successful signup
        } catch (error) {
            Alert.alert("Signup Error", error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Image 
                source={require('../assets/logo_tran.png')} // Adjust the path as necessary
                style={styles.logo} 
                resizeMode="contain"
            />
            <Text style={styles.title}>Create an Account</Text>
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
            <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                placeholderTextColor={COLORS.black}
                required
            />
            <TouchableOpacity style={styles.button} onPress={handleSignup}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.switchText}>Already have an account? Login</Text>
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
        backgroundColor: COLORS.white,
        color: COLORS.black, // Changed to black for visibility
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

export default Signup;
