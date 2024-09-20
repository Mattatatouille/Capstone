import { View, Text, StyleSheet } from "react-native";
import React from "react";
import COLORS from "../constants/colors"; 

const Signup = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign Up Page</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primary,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default Signup;
