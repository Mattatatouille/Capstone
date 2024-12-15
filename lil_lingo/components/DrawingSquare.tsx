import React, { useState, useRef } from 'react';
import { View, PanResponder, StyleSheet, SafeAreaView, TouchableOpacity, Text, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Svg, Polyline } from 'react-native-svg';
import * as MediaLibrary from 'expo-media-library';
import * as Print from 'expo-print';

export default function DrawingApp() {
  const [lines, setLines] = useState<{ x: number, y: number }[][]>([]);
  const [currentLine, setCurrentLine] = useState<{ x: number, y: number }[]>([]);
  const drawingAreaRef = useRef<View | null>(null);
  const drawingAreaSize = 400;

  const startDrawing = (e: any, gestureState: any) => {
    const { locationX, locationY } = e.nativeEvent;

    if (locationX <= drawingAreaSize && locationY <= drawingAreaSize) {
      setCurrentLine([{ x: locationX, y: locationY }]);
    }
  };

  const continueDrawing = (e: any, gestureState: any) => {
    const { locationX, locationY } = e.nativeEvent;

    if (currentLine.length > 0 && locationX <= drawingAreaSize && locationY <= drawingAreaSize) {
      setCurrentLine(prevLine => [...prevLine, { x: locationX, y: locationY }]);
    }
  };

  const endDrawing = () => {
    if (currentLine.length > 0) {
      setLines(prevLines => [...prevLines, currentLine]);
      setCurrentLine([]);
    }
  };

  const clearCanvas = () => {
    setLines([]);
    setCurrentLine([]);
  };

  const saveAsPDF = async () => {
    try {
      const svgContent = `
        <svg width="${drawingAreaSize}" height="${drawingAreaSize}" xmlns="http://www.w3.org/2000/svg">
          ${lines
            .map(
              (line, index) =>
                `<polyline points="${line
                  .map(p => `${p.x},${p.y}`)
                  .join(' ')}" stroke="black" stroke-width="4" fill="none" />`
            )
            .join('')}
          ${currentLine.length > 0 ? 
            `<polyline points="${currentLine.map(p => `${p.x},${p.y}`).join(' ')}" stroke="black" stroke-width="4" fill="none" />`
            : ''}
        </svg>
      `;

      const { uri } = await Print.printToFileAsync({ html: svgContent });

      const permission = await MediaLibrary.requestPermissionsAsync();
      if (!permission.granted) {
        Alert.alert('Permission Denied', 'Please grant permission to save the PDF to your gallery.');
        return;
      }

      const asset = await MediaLibrary.createAssetAsync(uri);
      await MediaLibrary.createAlbumAsync('Expo Drawings', asset, false);

      Alert.alert('Success', 'Drawing saved as PDF to gallery!');
    } catch (error) {
      console.error('Error saving PDF: ', error);
      Alert.alert('Error', 'Failed to save the drawing as a PDF.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View
        style={styles.drawingArea}
        ref={drawingAreaRef}
        {...PanResponder.create({
          onStartShouldSetPanResponder: () => true,
          onMoveShouldSetPanResponder: () => true,
          onPanResponderGrant: startDrawing,
          onPanResponderMove: continueDrawing,
          onPanResponderRelease: endDrawing,
          onPanResponderTerminate: endDrawing,
        }).panHandlers}
      >
        {/* SVG for lines */}
        <Svg height="100%" width="100%" style={{ position: 'absolute' }}>
          {/* Draw all previously drawn lines */}
          {lines.map((line, index) => (
            <Polyline
              key={index}
              points={line.map(p => `${p.x},${p.y}`).join(' ')}
              stroke="black"
              strokeWidth="4"
              fill="none"
            />
          ))}
          {/* Draw the current line while drawing */}
          {currentLine.length > 0 && (
            <Polyline
              points={currentLine.map(p => `${p.x},${p.y}`).join(' ')}
              stroke="black"
              strokeWidth="4"
              fill="none"
            />
          )}
        </Svg>
      </View>

      <TouchableOpacity style={styles.clearButton} onPress={clearCanvas}>
        <Text style={styles.buttonText}>Clear</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.saveButton} onPress={saveAsPDF}>
        <Text style={styles.buttonText}>Save as PDF</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  drawingArea: {
    width: 400,
    height: 400,
    borderColor: '#000',
    borderWidth: 1,
    marginBottom: 20,
    backgroundColor: 'white',
  },
  clearButton: {
    padding: 10,
    backgroundColor: '#ff6347',
    borderRadius: 5,
    marginBottom: 10,
  },
  saveButton: {
    padding: 10,
    backgroundColor: '#4CAF50',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
