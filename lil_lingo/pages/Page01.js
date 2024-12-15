import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native"; 
import { TouchableOpacity, GestureHandlerRootView } from "react-native-gesture-handler";
import DrawingApp from "../components/DrawingSquare"; // Import DrawingApp component
import COLORS from "../constants/colors";
import { Svg, Polyline } from 'react-native-svg';


const Page01 = () => {
    const [chosenWord, setChosenWord] = useState("Performance");
    const [selectedLetters, setSelectedLetters] = useState(new Set());
    const [gameOver, setGameOver] = useState(false);
    const [showDrawingArea, setShowDrawingArea] = useState(false); // State to control the visibility of the drawing area

    const handleLetterPress = (letter) => {
        if (chosenWord.toLowerCase().includes(letter)) {
            setSelectedLetters((prev) => new Set([...prev, letter]));
        }
    };

    const renderButtons = () => {
        const alphabet = 'abcdefghijklmnopqrstuvwxyz';
        return alphabet.split("").map((letter) => (
            <TouchableOpacity 
                key={letter} 
                style={[
                    styles.button, 
                    selectedLetters.has(letter) ? styles.selectedButton : null,
                    gameOver ? styles.disabledButton : null,
                ]}
                onPress={() => handleLetterPress(letter)}
                disabled={gameOver}
            >
                <Text style={{ color: COLORS.black }}>{letter}</Text>
            </TouchableOpacity>
        ));
    };

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Text style={styles.title}>Hangman Game</Text>
                <View style={styles.wordContainer}>
                    {chosenWord.split("").map((letter, index) => (
                        <Text key={index} style={styles.wordLetter}>
                            {selectedLetters.has(letter.toLowerCase()) ? letter : '_'}
                        </Text>
                    ))}
                </View>
                <View style={styles.buttonContainer}>
                    {renderButtons()}
                </View>
                <View style={styles.attemps}>
                    <Text>Attempts Left: </Text>
                </View>

                {/* Conditionally render the DrawingApp component */}
                {showDrawingArea && (
                    <View style={styles.drawingContainer}>
                        <DrawingApp />
                    </View>
                )}

                {/* Toggle button for showing the drawing area */}
                <TouchableOpacity 
                    style={styles.toggleDrawingButton} 
                    onPress={() => setShowDrawingArea(!showDrawingArea)}
                >
                    <Text style={styles.buttonText}>Toggle Drawing Area</Text>
                </TouchableOpacity>
            </View>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center', 
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: COLORS.white,
        textAlign: 'center',
        marginBottom: 20,
    },
    wordContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    wordLetter: {
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 10,
        color: COLORS.white,
    },
    buttonContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: 20,
        paddingBottom: 20, 
    },
    button: {
        backgroundColor: 'white',
        padding: 10,
        margin: 5,
        borderRadius: 10,
        elevation: 5,
    },
    selectedButton: {
        fontWeight: 'bold',
        backgroundColor: COLORS.textColor,
    },
    disabledButton: {
        backgroundColor: COLORS.black,
    },
    attemps: {
        fontSize: 12,
        backgroundColor: COLORS.white,
    },
    drawingContainer: {
        marginTop: 30,
        width: '100%',
        alignItems: 'center',
    },
    toggleDrawingButton: {
        padding: 10,
        backgroundColor: COLORS.primary,
        marginTop: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default Page01;
