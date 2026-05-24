import * as FileSystem from "expo-file-system/legacy";

const STORAGE_FILE = FileSystem.documentDirectory + "cal_ai_data.json";

// Read all data from file
const getAll = async () => {
  try {
    const info = await FileSystem.getInfoAsync(STORAGE_FILE);
    if (!info.exists) return {};
    const content = await FileSystem.readAsStringAsync(STORAGE_FILE);
    return JSON.parse(content);
  } catch {
    return {};
  }
};

// Write all data to file
const setAll = async (data) => {
  try {
    await FileSystem.writeAsStringAsync(STORAGE_FILE, JSON.stringify(data));
  } catch (error) {
    console.error("Write error:", error);
  }
};

// Get today's key e.g. "food_2026_4_20"
const getTodayKey = () => {
  const today = new Date();
  return `food_${today.getFullYear()}_${today.getMonth()}_${today.getDate()}`;
};

const getDateKey = (date) => {
  return `food_${date.getFullYear()}_${date.getMonth()}_${date.getDate()}`;
};

// Save a food entry for today
export async function saveFoodEntry(foodItem) {
  try {
    const all = await getAll();
    const key = getTodayKey();
    const entries = all[key] || [];
    entries.push({
      ...foodItem,
      id: Date.now(),
      time: new Date().toISOString(),
    });
    all[key] = entries;
    await setAll(all);
    return true;
  } catch (error) {
    console.error("Save error:", error);
    return false;
  }
}

// Get today's food entries
export async function getTodayEntries() {
  try {
    const all = await getAll();
    const key = getTodayKey();
    return all[key] || [];
  } catch {
    return [];
  }
}

// Get last 7 days for history chart
export async function getWeekEntries() {
  try {
    const all = await getAll();
    const week = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const key = getDateKey(date);
      const entries = all[key] || [];
      const totalCalories = entries.reduce(
        (sum, e) => sum + (e.calories || 0),
        0,
      );
      week.push({
        date: date.toLocaleDateString("en-US", { weekday: "short" }),
        calories: totalCalories,
      });
    }
    return week;
  } catch {
    return [];
  }
}

// Get streak count
export async function getStreak() {
  try {
    const all = await getAll();
    let streak = 0;
    for (let i = 0; i < 30; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const key = getDateKey(date);
      const entries = all[key] || [];
      if (entries.length > 0) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  } catch {
    return 0;
  }
}

// Save user goals
export async function saveGoals(goals) {
  try {
    const all = await getAll();
    all["user_goals"] = goals;
    await setAll(all);
  } catch (error) {
    console.error("Goals save error:", error);
  }
}

// Get user goals
export async function getGoals() {
  try {
    const all = await getAll();
    return (
      all["user_goals"] || {
        calories: 2000,
        protein: 150,
        carbs: 250,
        fat: 65,
      }
    );
  } catch {
    return { calories: 2000, protein: 150, carbs: 250, fat: 65 };
  }
}
