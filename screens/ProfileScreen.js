import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { getGoals, saveGoals, getStreak } from "../services/storage";
import { logout, getCurrentUser, getUserProfile } from "../services/auth";

export default function ProfileScreen() {
  const [goals, setGoals] = useState({
    calories: 2000,
    protein: 150,
    carbs: 250,
    fat: 65,
  });
  const [editing, setEditing] = useState(false);
  const [tempGoals, setTempGoals] = useState({});
  const [streak, setStreak] = useState(0);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, []),
  );

  const loadData = async () => {
    const userGoals = await getGoals();
    const userStreak = await getStreak();
    setGoals(userGoals);
    setStreak(userStreak);
  };

  const handleEdit = () => {
    setTempGoals({ ...goals });
    setEditing(true);
  };

  const handleSave = async () => {
    const updated = {
      calories: Number(tempGoals.calories) || 2000,
      protein: Number(tempGoals.protein) || 150,
      carbs: Number(tempGoals.carbs) || 250,
      fat: Number(tempGoals.fat) || 65,
    };
    await saveGoals(updated);
    setGoals(updated);
    setEditing(false);
    Alert.alert("Saved!", "Your goals have been updated");
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
        <Text style={styles.subtitle}>Your daily goals & stats</Text>
      </View>

      {/* Streak Card */}
      <View style={styles.streakCard}>
        <Text style={styles.streakIcon}>🔥</Text>
        <Text style={styles.streakNumber}>{streak}</Text>
        <Text style={styles.streakLabel}>Day Streak</Text>
        <Text style={styles.streakSubtext}>
          {streak === 0
            ? "Log food today to start your streak!"
            : streak === 1
              ? "Great start! Keep it going!"
              : streak < 7
                ? "Building momentum!"
                : streak < 30
                  ? "On fire! Amazing consistency!"
                  : "Legendary streak! 🏆"}
        </Text>
      </View>

      {/* Goals Card */}
      <View style={styles.goalsCard}>
        <View style={styles.goalsHeader}>
          <Text style={styles.chartTitle}>Daily Goals</Text>
          <TouchableOpacity
            style={styles.editButton}
            onPress={editing ? handleSave : handleEdit}
          >
            <Text style={styles.editButtonText}>
              {editing ? "💾 Save" : "✏️ Edit"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Calories Goal */}
        <View style={styles.goalRow}>
          <Text style={styles.goalIcon}>🔥</Text>
          <Text style={styles.goalName}>Calories</Text>
          {editing ? (
            <TextInput
              style={styles.goalInput}
              value={String(tempGoals.calories)}
              onChangeText={(v) => setTempGoals({ ...tempGoals, calories: v })}
              keyboardType="numeric"
              placeholderTextColor="#666"
            />
          ) : (
            <Text style={styles.goalValue}>{goals.calories} cal</Text>
          )}
        </View>

        {/* Protein Goal */}
        <View style={styles.goalRow}>
          <Text style={styles.goalIcon}>💪</Text>
          <Text style={styles.goalName}>Protein</Text>
          {editing ? (
            <TextInput
              style={styles.goalInput}
              value={String(tempGoals.protein)}
              onChangeText={(v) => setTempGoals({ ...tempGoals, protein: v })}
              keyboardType="numeric"
              placeholderTextColor="#666"
            />
          ) : (
            <Text style={[styles.goalValue, { color: "#00ff88" }]}>
              {goals.protein}g
            </Text>
          )}
        </View>

        {/* Carbs Goal */}
        <View style={styles.goalRow}>
          <Text style={styles.goalIcon}>🌾</Text>
          <Text style={styles.goalName}>Carbs</Text>
          {editing ? (
            <TextInput
              style={styles.goalInput}
              value={String(tempGoals.carbs)}
              onChangeText={(v) => setTempGoals({ ...tempGoals, carbs: v })}
              keyboardType="numeric"
              placeholderTextColor="#666"
            />
          ) : (
            <Text style={[styles.goalValue, { color: "#4fc3f7" }]}>
              {goals.carbs}g
            </Text>
          )}
        </View>

        {/* Fat Goal */}
        <View style={styles.goalRow}>
          <Text style={styles.goalIcon}>🥑</Text>
          <Text style={styles.goalName}>Fat</Text>
          {editing ? (
            <TextInput
              style={styles.goalInput}
              value={String(tempGoals.fat)}
              onChangeText={(v) => setTempGoals({ ...tempGoals, fat: v })}
              keyboardType="numeric"
              placeholderTextColor="#666"
            />
          ) : (
            <Text style={[styles.goalValue, { color: "#ffb74d" }]}>
              {goals.fat}g
            </Text>
          )}
        </View>
      </View>

      {/* App Info */}
      <View style={styles.infoCard}>
        <Text style={styles.chartTitle}>About</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>App</Text>
          <Text style={styles.infoValue}>Cal AI Clone</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>AI Model</Text>
          <Text style={styles.infoValue}>Groq Llama 4</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Storage</Text>
          <Text style={styles.infoValue}>Local Device</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Version</Text>
          <Text style={styles.infoValue}>1.0.0</Text>
        </View>
      </View>

      {/* Logout Button */}
      <TouchableOpacity
        style={styles.logoutBtn}
        onPress={async () => {
          await logout();
          navigation.replace("Login");
        }}
      >
        <Text style={styles.logoutText}>🚪 Logout</Text>
      </TouchableOpacity>

      <View style={{ height: 30 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0d0d0d" },
  header: { padding: 20, paddingTop: 40 },
  title: { fontSize: 28, fontWeight: "bold", color: "#fff" },
  subtitle: { fontSize: 14, color: "#666", marginTop: 4 },
  streakCard: {
    margin: 16,
    backgroundColor: "#1a1a1a",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
  },
  streakIcon: { fontSize: 48, marginBottom: 8 },
  streakNumber: { fontSize: 64, fontWeight: "bold", color: "#ff6b35" },
  streakLabel: { fontSize: 16, color: "#666", marginBottom: 8 },
  streakSubtext: { fontSize: 14, color: "#888", textAlign: "center" },
  goalsCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: "#1a1a1a",
    borderRadius: 16,
    padding: 16,
  },
  goalsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  chartTitle: { fontSize: 16, fontWeight: "bold", color: "#fff" },
  editButton: {
    backgroundColor: "#333",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  editButtonText: { color: "#fff", fontSize: 13 },
  goalRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#222",
  },
  goalIcon: { fontSize: 20, marginRight: 12 },
  goalName: { flex: 1, fontSize: 15, color: "#fff" },
  goalValue: { fontSize: 15, fontWeight: "bold", color: "#fff" },
  goalInput: {
    backgroundColor: "#333",
    color: "#fff",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    fontSize: 15,
    width: 100,
    textAlign: "right",
  },
  infoCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: "#1a1a1a",
    borderRadius: 16,
    padding: 16,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#222",
  },
  infoLabel: { fontSize: 14, color: "#666" },
  infoValue: { fontSize: 14, color: "#fff", fontWeight: "500" },

  logoutBtn: {
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: "#1a1a1a",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ff5252",
  },
  logoutText: {
    color: "#ff5252",
    fontSize: 16,
    fontWeight: "bold",
  },
});
