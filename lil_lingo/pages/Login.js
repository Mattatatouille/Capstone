import { View, Text, StyleSheet } from "react-native";
import React from "react";
import COLORS from "../constants/colors"; 

const Login = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login Page</Text>
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

export default Login;
