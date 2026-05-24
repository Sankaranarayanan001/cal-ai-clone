import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { getWeekEntries } from "../services/storage";

export default function HistoryScreen() {
  const [weekData, setWeekData] = useState([]);
  const maxCalories = 2000;

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, []),
  );

  const loadData = async () => {
    const data = await getWeekEntries();
    setWeekData(data);
  };

  const highest = Math.max(...weekData.map((d) => d.calories), 1);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Weekly History</Text>
        <Text style={styles.subtitle}>Last 7 days</Text>
      </View>

      {/* Bar Chart */}
      <View style={styles.chartCard}>
        <Text style={styles.chartTitle}>Calories per Day</Text>
        <View style={styles.chart}>
          {weekData.map((day, index) => (
            <View key={index} style={styles.barColumn}>
              <Text style={styles.barValue}>
                {day.calories > 0 ? day.calories : ""}
              </Text>
              <View style={styles.barBg}>
                <View
                  style={[
                    styles.barFill,
                    {
                      height: `${(day.calories / highest) * 100}%`,
                      backgroundColor:
                        day.calories >= maxCalories ? "#ff5252" : "#00ff88",
                    },
                  ]}
                />
              </View>
              <Text style={styles.barLabel}>{day.date}</Text>
            </View>
          ))}
        </View>
        <View style={styles.goalLine}>
          <View style={styles.goalDot} />
          <Text style={styles.goalText}>Goal: {maxCalories} cal</Text>
        </View>
      </View>

      {/* Weekly Summary */}
      <View style={styles.summaryCard}>
        <Text style={styles.chartTitle}>Weekly Summary</Text>
        <View style={styles.summaryRow}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>
              {weekData.reduce((s, d) => s + d.calories, 0)}
            </Text>
            <Text style={styles.summaryLabel}>Total Calories</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>
              {Math.round(weekData.reduce((s, d) => s + d.calories, 0) / 7)}
            </Text>
            <Text style={styles.summaryLabel}>Daily Average</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>
              {weekData.filter((d) => d.calories > 0).length}
            </Text>
            <Text style={styles.summaryLabel}>Days Logged</Text>
          </View>
        </View>
      </View>

      {/* Daily Breakdown */}
      <Text style={styles.sectionTitle}>Daily Breakdown</Text>
      {weekData.map((day, index) => (
        <View key={index} style={styles.dayCard}>
          <Text style={styles.dayName}>{day.date}</Text>
          <View style={styles.dayBarBg}>
            <View
              style={[
                styles.dayBarFill,
                {
                  width: `${Math.min((day.calories / maxCalories) * 100, 100)}%`,
                  backgroundColor:
                    day.calories >= maxCalories ? "#ff5252" : "#00ff88",
                },
              ]}
            />
          </View>
          <Text style={styles.dayCalories}>{day.calories} cal</Text>
        </View>
      ))}

      <View style={{ height: 30 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0d0d0d" },
  header: { padding: 20, paddingTop: 40 },
  title: { fontSize: 28, fontWeight: "bold", color: "#fff" },
  subtitle: { fontSize: 14, color: "#666", marginTop: 4 },
  chartCard: {
    margin: 16,
    backgroundColor: "#1a1a1a",
    borderRadius: 16,
    padding: 16,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 16,
  },
  chart: {
    flexDirection: "row",
    alignItems: "flex-end",
    height: 160,
    justifyContent: "space-between",
  },
  barColumn: {
    flex: 1,
    alignItems: "center",
    height: "100%",
    justifyContent: "flex-end",
  },
  barValue: { fontSize: 9, color: "#666", marginBottom: 4 },
  barBg: {
    width: 28,
    height: 120,
    backgroundColor: "#333",
    borderRadius: 6,
    justifyContent: "flex-end",
    overflow: "hidden",
  },
  barFill: { width: "100%", borderRadius: 6, minHeight: 4 },
  barLabel: { fontSize: 11, color: "#666", marginTop: 6 },
  goalLine: { flexDirection: "row", alignItems: "center", marginTop: 12 },
  goalDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#ff5252",
    marginRight: 6,
  },
  goalText: { fontSize: 12, color: "#666" },
  summaryCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: "#1a1a1a",
    borderRadius: 16,
    padding: 16,
  },
  summaryRow: { flexDirection: "row", justifyContent: "space-between" },
  summaryItem: { alignItems: "center", flex: 1 },
  summaryValue: { fontSize: 22, fontWeight: "bold", color: "#00ff88" },
  summaryLabel: {
    fontSize: 11,
    color: "#666",
    marginTop: 4,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  dayCard: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginBottom: 8,
    backgroundColor: "#1a1a1a",
    borderRadius: 12,
    padding: 14,
  },
  dayName: { fontSize: 14, color: "#fff", width: 40 },
  dayBarBg: {
    flex: 1,
    height: 8,
    backgroundColor: "#333",
    borderRadius: 4,
    marginHorizontal: 12,
  },
  dayBarFill: { height: 8, borderRadius: 4, minWidth: 4 },
  dayCalories: { fontSize: 13, color: "#666", width: 60, textAlign: "right" },
});
