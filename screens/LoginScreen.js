import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useState } from "react";
import { login } from "../services/auth";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }
    setLoading(true);
    const result = await login(email.toLowerCase().trim(), password);
    setLoading(false);
    if (result.success) {
      navigation.replace("MainApp");
    } else {
      Alert.alert("Login Failed", result.error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>🥗</Text>
      <Text style={styles.title}>Cal AI</Text>
      <Text style={styles.subtitle}>Track your nutrition with AI</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#666"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#666"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#000" />
          ) : (
            <Text style={styles.buttonText}>Login</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.linkButton}
          onPress={() => navigation.navigate("Signup")}
        >
          <Text style={styles.linkText}>
            Don't have an account?{" "}
            <Text style={styles.linkHighlight}>Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0d0d0d",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  logo: { fontSize: 64, marginBottom: 12 },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#00ff88",
    marginBottom: 6,
  },
  subtitle: { fontSize: 15, color: "#666", marginBottom: 40 },
  form: { width: "100%" },
  input: {
    backgroundColor: "#1a1a1a",
    color: "#fff",
    borderRadius: 12,
    padding: 16,
    fontSize: 15,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#333",
  },
  button: {
    backgroundColor: "#00ff88",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginBottom: 16,
  },
  buttonText: { fontSize: 16, fontWeight: "bold", color: "#000" },
  linkButton: { alignItems: "center" },
  linkText: { color: "#666", fontSize: 14 },
  linkHighlight: { color: "#00ff88", fontWeight: "bold" },
});
