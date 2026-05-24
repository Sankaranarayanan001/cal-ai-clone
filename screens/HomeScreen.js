import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { getTodayEntries, getGoals } from "../services/storage";

export default function HomeScreen({ navigation }) {
  const [entries, setEntries] = useState([]);
  const [goals, setGoals] = useState({
    calories: 2000,
    protein: 150,
    carbs: 250,
    fat: 65,
  });

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, []),
  );

  const loadData = async () => {
    const todayEntries = await getTodayEntries();
    const userGoals = await getGoals();
    setEntries(todayEntries);
    setGoals(userGoals);
  };

  const totals = entries.reduce(
    (acc, e) => ({
      calories: acc.calories + (e.calories || 0),
      protein: acc.protein + (e.protein || 0),
      carbs: acc.carbs + (e.carbs || 0),
      fat: acc.fat + (e.fat || 0),
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 },
  );

  const getPercent = (value, goal) => Math.min((value / goal) * 100, 100);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Today</Text>
        <Text style={styles.headerDate}>
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </Text>
      </View>

      {/* Calories Card */}
      <View style={styles.calorieCard}>
        <Text style={styles.calorieNumber}>{totals.calories}</Text>
        <Text style={styles.calorieLabel}>calories consumed</Text>
        <View style={styles.calorieBarBg}>
          <View
            style={[
              styles.calorieBarFill,
              { width: `${getPercent(totals.calories, goals.calories)}%` },
            ]}
          />
        </View>
        <Text style={styles.calorieGoal}>
          {goals.calories - totals.calories > 0
            ? `${goals.calories - totals.calories} remaining`
            : "Goal reached!"}
        </Text>
      </View>

      {/* Macro Cards */}
      <View style={styles.macroRow}>
        <View style={styles.macroCard}>
          <Text style={styles.macroValue}>{totals.protein}g</Text>
          <View style={styles.macroBarBg}>
            <View
              style={[
                styles.macroBarFill,
                {
                  width: `${getPercent(totals.protein, goals.protein)}%`,
                  backgroundColor: "#00ff88",
                },
              ]}
            />
          </View>
          <Text style={styles.macroLabel}>Protein</Text>
        </View>
        <View style={styles.macroCard}>
          <Text style={styles.macroValue}>{totals.carbs}g</Text>
          <View style={styles.macroBarBg}>
            <View
              style={[
                styles.macroBarFill,
                {
                  width: `${getPercent(totals.carbs, goals.carbs)}%`,
                  backgroundColor: "#4fc3f7",
                },
              ]}
            />
          </View>
          <Text style={styles.macroLabel}>Carbs</Text>
        </View>
        <View style={styles.macroCard}>
          <Text style={styles.macroValue}>{totals.fat}g</Text>
          <View style={styles.macroBarBg}>
            <View
              style={[
                styles.macroBarFill,
                {
                  width: `${getPercent(totals.fat, goals.fat)}%`,
                  backgroundColor: "#ffb74d",
                },
              ]}
            />
          </View>
          <Text style={styles.macroLabel}>Fat</Text>
        </View>
      </View>

      {/* Log Food Button */}
      <TouchableOpacity
        style={styles.logButton}
        onPress={() => navigation.navigate("Camera")}
      >
        <Text style={styles.logButtonText}>📷 Log Food</Text>
      </TouchableOpacity>

      {/* Food Diary */}
      <Text style={styles.sectionTitle}>Today's Diary</Text>
      {entries.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>🍽️</Text>
          <Text style={styles.emptyText}>No food logged yet</Text>
          <Text style={styles.emptySubtext}>Tap Log Food to get started</Text>
        </View>
      ) : (
        entries.map((entry, index) => (
          <View key={index} style={styles.foodCard}>
            <View style={styles.foodCardLeft}>
              <Text style={styles.foodName}>{entry.foodName}</Text>
              <Text style={styles.foodMacros}>
                P: {entry.protein}g · C: {entry.carbs}g · F: {entry.fat}g
              </Text>
            </View>
            <Text style={styles.foodCalories}>{entry.calories} cal</Text>
          </View>
        ))
      )}

      <View style={{ height: 30 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0d0d0d" },
  header: { padding: 20, paddingTop: 40 },
  headerTitle: { fontSize: 28, fontWeight: "bold", color: "#fff" },
  headerDate: { fontSize: 14, color: "#666", marginTop: 4 },
  calorieCard: {
    margin: 16,
    backgroundColor: "#1a1a1a",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
  },
  calorieNumber: { fontSize: 56, fontWeight: "bold", color: "#00ff88" },
  calorieLabel: { fontSize: 14, color: "#666", marginBottom: 12 },
  calorieBarBg: {
    width: "100%",
    height: 8,
    backgroundColor: "#333",
    borderRadius: 4,
  },
  calorieBarFill: { height: 8, backgroundColor: "#00ff88", borderRadius: 4 },
  calorieGoal: { fontSize: 13, color: "#888", marginTop: 8 },
  macroRow: { flexDirection: "row", paddingHorizontal: 16, gap: 10 },
  macroCard: {
    flex: 1,
    backgroundColor: "#1a1a1a",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
  },
  macroValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 6,
  },
  macroBarBg: {
    width: "100%",
    height: 6,
    backgroundColor: "#333",
    borderRadius: 3,
    marginBottom: 6,
  },
  macroBarFill: { height: 6, borderRadius: 3 },
  macroLabel: { fontSize: 12, color: "#666" },
  logButton: {
    margin: 16,
    backgroundColor: "#00ff88",
    borderRadius: 14,
    padding: 16,
    alignItems: "center",
  },
  logButtonText: { fontSize: 18, fontWeight: "bold", color: "#000" },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  emptyState: { alignItems: "center", paddingVertical: 40 },
  emptyIcon: { fontSize: 48, marginBottom: 12 },
  emptyText: { fontSize: 16, color: "#666", marginBottom: 6 },
  emptySubtext: { fontSize: 13, color: "#444" },
  foodCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 12,
    padding: 14,
  },
  foodCardLeft: { flex: 1 },
  foodName: { fontSize: 15, fontWeight: "600", color: "#fff", marginBottom: 4 },
  foodMacros: { fontSize: 12, color: "#666" },
  foodCalories: { fontSize: 16, fontWeight: "bold", color: "#00ff88" },
});
