import { View, Image, StyleSheet, Text, ActivityIndicator, TouchableOpacity } from "react-native"; 
import React, { useEffect, useState } from "react";
import * as Font from 'expo-font';
import COLORS from "../constants/colors"; 
import { useNavigation } from '@react-navigation/native';

const loadFonts = async () => {
    await Font.loadAsync({
        'josefin-sans': require('../assets/fonts/josefin-sans/JosefinSans-Bold.ttf'),
    });
};

const HomePage = () => {
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        const loadFontsAsync = async () => {
            await loadFonts();
            setFontsLoaded(true);
        };

        loadFontsAsync();
    }, []);

    if (!fontsLoaded) {
        return <ActivityIndicator size="large" color={COLORS.primary} style={styles.loading} />;
    }

    const handleButtonPress = () => {
        // Navigate to Signup page
        navigation.navigate('Signup');
    };

    return (
        <View style={[styles.container, { backgroundColor: COLORS.primary }]}>
            <View style={styles.innerContainer}>
                <Image
                    source={require("../assets/logo_tran.png")}
                    style={styles.image} 
                />
                <View style={styles.textContainer}>
                    <Text style={styles.welcomeText}>Welcome to Lil'Lingo</Text>
                    <Text style={styles.gladToSeeYouText}>We're glad that you are here</Text>
                </View>
                <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
                    <Text style={styles.buttonText}>Let's Get Started</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    innerContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 20,
    },
    image: {
        width: '100%',
        height: '50%',
        resizeMode: 'contain',
    },
    textContainer: {
        alignItems: 'center',
        marginTop: 20,
        paddingHorizontal: 22,
    },
    welcomeText: {
        fontSize: 30,
        fontWeight: '800',
        fontFamily: 'josefin-sans',
        color: COLORS.white, 
        width: "100%",
        textAlign: 'center',
    },
    gladToSeeYouText: {
        fontSize: 15,
        fontWeight: '800',
        fontFamily: 'josefin-sans',
        color: COLORS.white, 
        width: "100%",
        textAlign: 'center',
        paddingTop: 10,
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        marginTop: 30,
        paddingVertical: 15,
        paddingHorizontal: 90,
        backgroundColor: COLORS.white,
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.black,
    },
});

export default HomePage;
