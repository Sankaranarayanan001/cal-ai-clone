import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { analyzeFoodImage } from "../services/gemini";
import { saveFoodEntry } from "../services/storage";

export default function CameraScreen({ navigation }) {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const pickImage = async (useCamera) => {
    try {
      let pickerResult;
      if (useCamera) {
        const permission = await ImagePicker.requestCameraPermissionsAsync();
        if (!permission.granted) {
          Alert.alert("Permission needed", "Camera permission is required");
          return;
        }
        pickerResult = await ImagePicker.launchCameraAsync({
          base64: true,
          quality: 0.7,
        });
      } else {
        pickerResult = await ImagePicker.launchImageLibraryAsync({
          base64: true,
          quality: 0.7,
        });
      }

      if (!pickerResult.canceled) {
        const asset = pickerResult.assets[0];
        setImage(asset.uri);
        setResult(null);
        setLoading(true);
        const analysis = await analyzeFoodImage(asset.base64);
        setLoading(false);
        if (analysis) {
          setResult(analysis);
        } else {
          Alert.alert("Error", "Could not analyze food. Try again.");
        }
      }
    } catch (error) {
      setLoading(false);
      Alert.alert("Error", "Something went wrong. Try again.");
    }
  };

  const handleSave = async () => {
    if (result) {
      await saveFoodEntry(result);
      Alert.alert("Saved!", `${result.foodName} added to your diary`, [
        {
          text: "OK",
          onPress: () => {
            setImage(null);
            setResult(null);
            navigation.navigate("Home");
          },
        },
      ]);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.title}>Scan Food</Text>
      <Text style={styles.subtitle}>
        Take a photo or upload from gallery001
      </Text>

      {/* Image Preview */}
      {image ? (
        <View>
          <Image source={{ uri: image }} style={styles.preview} />
          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => {
              setImage(null);
              setResult(null);
            }}
          >
            <Text style={styles.clearButtonText}>✕ Clear</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.placeholder}>
          <Text style={styles.placeholderIcon}>🍔</Text>
          <Text style={styles.placeholderText}>No image selected</Text>
        </View>
      )}

      {/* Loading */}
      {loading && (
        <View style={styles.loadingBox}>
          <ActivityIndicator size="large" color="#00ff88" />
          <Text style={styles.loadingText}>Analyzing your food...</Text>
        </View>
      )}

      {/* Result */}
      {result && !loading && (
        <View style={styles.resultCard}>
          <Text style={styles.foodName}>{result.foodName}</Text>
          <Text style={styles.serving}>{result.servingSize}</Text>
          <View style={styles.macroRow}>
            <View style={styles.macroItem}>
              <Text style={styles.macroValue}>{result.calories}</Text>
              <Text style={styles.macroLabel}>Calories</Text>
            </View>
            <View style={styles.macroItem}>
              <Text style={[styles.macroValue, { color: "#00ff88" }]}>
                {result.protein}g
              </Text>
              <Text style={styles.macroLabel}>Protein</Text>
            </View>
            <View style={styles.macroItem}>
              <Text style={[styles.macroValue, { color: "#4fc3f7" }]}>
                {result.carbs}g
              </Text>
              <Text style={styles.macroLabel}>Carbs</Text>
            </View>
            <View style={styles.macroItem}>
              <Text style={[styles.macroValue, { color: "#ffb74d" }]}>
                {result.fat}g
              </Text>
              <Text style={styles.macroLabel}>Fat</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Add to Diary</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Buttons */}
      {!loading && (
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => pickImage(true)}
          >
            <Text style={styles.buttonText}>📷 Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.buttonOutline]}
            onPress={() => pickImage(false)}
          >
            <Text style={[styles.buttonText, { color: "#00ff88" }]}>
              🖼️ Gallery
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0d0d0d",
    padding: 16,
    paddingTop: 40,
  },
  title: { fontSize: 26, fontWeight: "bold", color: "#fff", marginBottom: 4 },
  subtitle: { fontSize: 14, color: "#666", marginBottom: 16 },
  preview: { width: "100%", height: 220, borderRadius: 16, marginBottom: 16 },
  placeholder: {
    width: "100%",
    height: 220,
    borderRadius: 16,
    backgroundColor: "#1a1a1a",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#333",
    borderStyle: "dashed",
  },
  placeholderIcon: { fontSize: 48, marginBottom: 8 },
  placeholderText: { color: "#444", fontSize: 14 },
  loadingBox: { alignItems: "center", paddingVertical: 20 },
  loadingText: { color: "#00ff88", marginTop: 10, fontSize: 15 },
  resultCard: {
    backgroundColor: "#1a1a1a",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  foodName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
  },
  serving: { fontSize: 13, color: "#666", marginBottom: 12 },
  macroRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  macroItem: { alignItems: "center" },
  macroValue: { fontSize: 20, fontWeight: "bold", color: "#fff" },
  macroLabel: { fontSize: 12, color: "#666", marginTop: 2 },
  saveButton: {
    backgroundColor: "#00ff88",
    borderRadius: 12,
    padding: 14,
    alignItems: "center",
  },
  saveButtonText: { fontSize: 16, fontWeight: "bold", color: "#000" },
  buttonRow: { flexDirection: "row", gap: 12, marginTop: 8 },
  button: {
    flex: 1,
    backgroundColor: "#00ff88",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#00ff88",
  },
  buttonText: { fontSize: 16, fontWeight: "bold", color: "#000" },
  clearButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  clearButtonText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "bold",
  },
});
