import { View, Image, StyleSheet } from "react-native"; 
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import COLORS from "../constants/colors"; 

const HomePage = () => {
    return (
        <LinearGradient style={styles.container} colors={[COLORS.secondary, COLORS.primary]}>
            <View style={styles.innerContainer}>
                <Image
                    source={require("../assets/app_button.jpg")}
                    style={styles.image} 
                />
            </View>
        </LinearGradient>
    );
}

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
});

export default HomePage;
