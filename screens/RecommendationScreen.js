import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useState, useEffect } from "react";
import {
  getCurrentUser,
  getUserProfile,
  saveUserProfile,
} from "../services/auth";
import {
  generateDietPlans,
  calculateTDEE,
  calculateMacros,
} from "../services/nutrition";

export default function RecommendationScreen({ navigation }) {
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [macros, setMacros] = useState(null);

  useEffect(() => {
    loadPlans();
  }, []);

  const loadPlans = async () => {
    try {
      const user = await getCurrentUser();
      if (!user) return;
      const profile = await getUserProfile(user.email);
      setUserProfile(profile);

      const tdee = calculateTDEE(
        profile.age,
        profile.weight,
        profile.height,
        profile.gender,
        profile.activityLevel,
      );
      const calculatedMacros = calculateMacros(
        tdee,
        profile.goal,
        profile.weight,
      );
      setMacros(calculatedMacros);

      const dietPlans = generateDietPlans(profile.goal, calculatedMacros);
      setPlans(dietPlans);
    } catch (error) {
      console.error("Error loading plans:", error);
    }
  };

  const handleSelectPlan = async (plan) => {
    setSelectedPlan(plan.name);
    try {
      const user = await getCurrentUser();
      await saveUserProfile(user.email, { selectedPlan: plan.name });
      Alert.alert(
        "✅ Plan Selected!",
        `You selected "${plan.name}". Start tracking your meals now!`,
        [
          {
            text: "Start Tracking",
            onPress: () => navigation.replace("MainApp"),
          },
        ],
      );
    } catch (error) {
      Alert.alert("Error", "Could not save plan");
    }
  };

  const goalColors = { cut: "#ff5252", maintain: "#4fc3f7", bulk: "#00ff88" };
  const goalColor = goalColors[userProfile?.goal] || "#00ff88";

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Your Diet Plans 🎯</Text>
        <Text style={styles.subtitle}>
          Based on your body stats — pick one to follow
        </Text>
      </View>

      {/* Stats Card */}
      {macros && userProfile && (
        <View style={styles.statsCard}>
          <Text style={styles.statsTitle}>Your Daily Targets</Text>
          <View style={styles.goalBadge}>
            <Text style={[styles.goalText, { color: goalColor }]}>
              {userProfile.goal?.toUpperCase()} MODE
            </Text>
          </View>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{macros.calories}</Text>
              <Text style={styles.statLabel}>Calories</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: "#00ff88" }]}>
                {macros.protein}g
              </Text>
              <Text style={styles.statLabel}>Protein</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: "#4fc3f7" }]}>
                {macros.carbs}g
              </Text>
              <Text style={styles.statLabel}>Carbs</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: "#ffb74d" }]}>
                {macros.fat}g
              </Text>
              <Text style={styles.statLabel}>Fat</Text>
            </View>
          </View>
          <Text style={styles.tdeeText}>
            Your TDEE: {userProfile.tdee} cal/day
            {userProfile.goal === "cut"
              ? " → -500 deficit"
              : userProfile.goal === "bulk"
                ? " → +300 surplus"
                : " → maintenance"}
          </Text>
        </View>
      )}

      {/* Diet Plans */}
      <Text style={styles.sectionTitle}>Choose Your Plan</Text>
      {plans.map((plan, index) => (
        <View key={index} style={styles.planCard}>
          <Text style={styles.planName}>{plan.name}</Text>
          <Text style={styles.planDesc}>{plan.description}</Text>

          {/* Meals */}
          <View style={styles.mealsContainer}>
            {plan.meals.map((meal, mIndex) => (
              <View key={mIndex} style={styles.mealRow}>
                <View style={styles.mealLeft}>
                  <Text style={styles.mealTime}>{meal.time}</Text>
                  <Text style={styles.mealFoods}>{meal.foods}</Text>
                </View>
                <Text style={styles.mealCal}>{meal.cal} cal</Text>
              </View>
            ))}
          </View>

          {/* Total macros */}
          <View style={styles.planMacros}>
            <Text style={styles.planMacroItem}>🔥 {plan.totalCal} cal</Text>
            <Text style={styles.planMacroItem}>💪 {plan.protein}g protein</Text>
            <Text style={styles.planMacroItem}>🌾 {plan.carbs}g carbs</Text>
            <Text style={styles.planMacroItem}>🥑 {plan.fat}g fat</Text>
          </View>

          <TouchableOpacity
            style={[
              styles.selectBtn,
              selectedPlan === plan.name && styles.selectBtnSelected,
            ]}
            onPress={() => handleSelectPlan(plan)}
          >
            <Text
              style={[
                styles.selectBtnText,
                selectedPlan === plan.name && styles.selectBtnTextSelected,
              ]}
            >
              {selectedPlan === plan.name ? "✅ Selected" : "Select This Plan"}
            </Text>
          </TouchableOpacity>
        </View>
      ))}

      {/* Skip button */}
      <TouchableOpacity
        style={styles.skipBtn}
        onPress={() => navigation.replace("MainApp")}
      >
        <Text style={styles.skipText}>Skip for now →</Text>
      </TouchableOpacity>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0d0d0d" },
  header: { padding: 24, paddingTop: 50 },
  title: { fontSize: 26, fontWeight: "bold", color: "#fff", marginBottom: 6 },
  subtitle: { fontSize: 14, color: "#666" },
  statsCard: {
    marginHorizontal: 16,
    marginBottom: 20,
    backgroundColor: "#1a1a1a",
    borderRadius: 16,
    padding: 16,
  },
  statsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  goalBadge: {
    backgroundColor: "#0d2d1a",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
    alignSelf: "flex-start",
    marginBottom: 12,
  },
  goalText: { fontSize: 13, fontWeight: "bold" },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  statItem: { alignItems: "center" },
  statValue: { fontSize: 22, fontWeight: "bold", color: "#fff" },
  statLabel: { fontSize: 11, color: "#666", marginTop: 2 },
  tdeeText: { fontSize: 12, color: "#444", marginTop: 4 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  planCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: "#1a1a1a",
    borderRadius: 16,
    padding: 16,
  },
  planName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
  },
  planDesc: { fontSize: 13, color: "#666", marginBottom: 14 },
  mealsContainer: { marginBottom: 14 },
  mealRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#222",
  },
  mealLeft: { flex: 1, marginRight: 10 },
  mealTime: {
    fontSize: 12,
    color: "#00ff88",
    fontWeight: "600",
    marginBottom: 2,
  },
  mealFoods: { fontSize: 13, color: "#ccc" },
  mealCal: { fontSize: 13, color: "#666", fontWeight: "600" },
  planMacros: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 14,
    backgroundColor: "#111",
    borderRadius: 10,
    padding: 10,
  },
  planMacroItem: { fontSize: 12, color: "#888" },
  selectBtn: {
    backgroundColor: "#00ff88",
    borderRadius: 12,
    padding: 14,
    alignItems: "center",
  },
  selectBtnSelected: {
    backgroundColor: "#0d2d1a",
    borderWidth: 1,
    borderColor: "#00ff88",
  },
  selectBtnText: { fontSize: 15, fontWeight: "bold", color: "#000" },
  selectBtnTextSelected: { color: "#00ff88" },
  skipBtn: { alignItems: "center", padding: 16 },
  skipText: { color: "#444", fontSize: 14 },
});
