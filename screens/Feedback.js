import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, StyleSheet } from "react-native";
import { useTheme } from "../styles/ThemeContext";
import { getApiUrl } from "../config";

const Feedback = ({ navigation }) => {
  const { isDarkMode } = useTheme();
  const [feedback, setFeedback] = useState("");
  const [additionalField, setAdditionalField] = useState("");

  const handleSubmit = async () => {
    if (!feedback.trim() || !additionalField.trim()) {
      Alert.alert("Error", "Please fill in all fields before submitting.");
      return;
    }
  
    try {
      const apiUrl = await getApiUrl();
  
      const response = await fetch(`${apiUrl}/submit_feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ feedback, additionalField }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        Alert.alert("Thank You!", "Your feedback has been submitted.");
        setFeedback("");
        setAdditionalField("");
      } else {
        Alert.alert("Error", data.error || "Something went wrong.");
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      Alert.alert("Error", "There was an issue sending your feedback.");
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: isDarkMode ? "#1a202c" : "#f9fafb",
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: isDarkMode ? "#ffffff" : "#000000",
    },
    input: {
      backgroundColor: isDarkMode ? "#2d3748" : "#ffffff",
      borderRadius: 8,
      padding: 12,
      marginBottom: 16,
      color: isDarkMode ? "#ffffff" : "#000000",
      borderWidth: 1,
      borderColor: isDarkMode ? "#4a5568" : "#e2e8f0",
    },
    submitButton: {
      backgroundColor: "#4299e1",
      padding: 16,
      borderRadius: 8,
      alignItems: "center",
    },
    submitButtonText: {
      color: "#ffffff",
      fontSize: 16,
      fontWeight: "bold",
    },
  });

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Feedback</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your feedback"
        placeholderTextColor={isDarkMode ? "#a0aec0" : "#718096"}
        value={feedback}
        onChangeText={setFeedback}
        multiline
        numberOfLines={4}
      />
      <TextInput
        style={styles.input}
        placeholder="Additional information (optional)"
        placeholderTextColor={isDarkMode ? "#a0aec0" : "#718096"}
        value={additionalField}
        onChangeText={setAdditionalField}
        multiline
        numberOfLines={2}
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit Feedback</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Feedback;
