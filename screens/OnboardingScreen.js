import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { useState } from "react";
import { saveUserProfile, getCurrentUser } from "../services/auth";
import { calculateTDEE, calculateMacros } from "../services/nutrition";
import { saveGoals } from "../services/storage";

export default function OnboardingScreen({ navigation }) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [activityLevel, setActivityLevel] = useState("");
  const [goal, setGoal] = useState("");

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleFinish = async () => {
    try {
      const user = await getCurrentUser();
      if (!user) return;

      const tdee = calculateTDEE(
        Number(age),
        Number(weight),
        Number(height),
        gender,
        activityLevel,
      );

      const macros = calculateMacros(tdee, goal, Number(weight));

      await saveUserProfile(user.email, {
        age: Number(age),
        gender,
        weight: Number(weight),
        height: Number(height),
        activityLevel,
        goal,
        tdee,
      });

      await saveGoals(macros);

      navigation.replace("Recommendation");
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Try again.");
    }
  };

  // Step 1 — Personal details
  const Step1 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepEmoji}>👤</Text>
      <Text style={styles.stepTitle}>Personal Details</Text>
      <Text style={styles.stepSubtitle}>Tell us about yourself</Text>

      <TextInput
        style={styles.input}
        placeholder="Your name"
        placeholderTextColor="#666"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Age (years)"
        placeholderTextColor="#666"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Gender</Text>
      <View style={styles.optionRow}>
        <TouchableOpacity
          style={[styles.optionBtn, gender === "male" && styles.optionSelected]}
          onPress={() => setGender("male")}
        >
          <Text
            style={[
              styles.optionText,
              gender === "male" && styles.optionTextSelected,
            ]}
          >
            ♂ Male
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.optionBtn,
            gender === "female" && styles.optionSelected,
          ]}
          onPress={() => setGender("female")}
        >
          <Text
            style={[
              styles.optionText,
              gender === "female" && styles.optionTextSelected,
            ]}
          >
            ♀ Female
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[
          styles.nextBtn,
          (!name || !age || !gender) && styles.nextBtnDisabled,
        ]}
        onPress={nextStep}
        disabled={!name || !age || !gender}
      >
        <Text style={styles.nextBtnText}>Next →</Text>
      </TouchableOpacity>
    </View>
  );

  // Step 2 — Body measurements
  const Step2 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepEmoji}>📏</Text>
      <Text style={styles.stepTitle}>Body Measurements</Text>
      <Text style={styles.stepSubtitle}>
        Used to calculate your daily calorie needs
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Weight (kg)"
        placeholderTextColor="#666"
        value={weight}
        onChangeText={setWeight}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Height (cm)"
        placeholderTextColor="#666"
        value={height}
        onChangeText={setHeight}
        keyboardType="numeric"
      />

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.backBtn} onPress={prevStep}>
          <Text style={styles.backBtnText}>← Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.nextBtn,
            styles.nextBtnHalf,
            (!weight || !height) && styles.nextBtnDisabled,
          ]}
          onPress={nextStep}
          disabled={!weight || !height}
        >
          <Text style={styles.nextBtnText}>Next →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // Step 3 — Activity level
  const Step3 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepEmoji}>🏃</Text>
      <Text style={styles.stepTitle}>Activity Level</Text>
      <Text style={styles.stepSubtitle}>How active are you daily?</Text>

      {[
        {
          key: "sedentary",
          label: "🪑 Sedentary",
          desc: "Little or no exercise",
        },
        { key: "light", label: "🚶 Light", desc: "Exercise 1-3 days/week" },
        {
          key: "moderate",
          label: "🏋️ Moderate",
          desc: "Exercise 3-5 days/week",
        },
        { key: "active", label: "🏃 Active", desc: "Exercise 6-7 days/week" },
        {
          key: "athletic",
          label: "⚡ Athletic",
          desc: "Intense training daily",
        },
      ].map((item) => (
        <TouchableOpacity
          key={item.key}
          style={[
            styles.activityBtn,
            activityLevel === item.key && styles.activityBtnSelected,
          ]}
          onPress={() => setActivityLevel(item.key)}
        >
          <Text
            style={[
              styles.activityLabel,
              activityLevel === item.key && styles.activityLabelSelected,
            ]}
          >
            {item.label}
          </Text>
          <Text style={styles.activityDesc}>{item.desc}</Text>
        </TouchableOpacity>
      ))}

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.backBtn} onPress={prevStep}>
          <Text style={styles.backBtnText}>← Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.nextBtn,
            styles.nextBtnHalf,
            !activityLevel && styles.nextBtnDisabled,
          ]}
          onPress={nextStep}
          disabled={!activityLevel}
        >
          <Text style={styles.nextBtnText}>Next →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // Step 4 — Goal
  const Step4 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepEmoji}>🎯</Text>
      <Text style={styles.stepTitle}>Your Goal</Text>
      <Text style={styles.stepSubtitle}>What do you want to achieve?</Text>

      {[
        {
          key: "cut",
          label: "🔥 Cut",
          desc: "Lose fat, maintain muscle\n500 cal deficit per day",
        },
        {
          key: "maintain",
          label: "⚖️ Maintain",
          desc: "Stay at current weight\nBalanced nutrition",
        },
        {
          key: "bulk",
          label: "💪 Bulk",
          desc: "Build muscle mass\n300 cal surplus per day",
        },
      ].map((item) => (
        <TouchableOpacity
          key={item.key}
          style={[styles.goalBtn, goal === item.key && styles.goalBtnSelected]}
          onPress={() => setGoal(item.key)}
        >
          <Text
            style={[
              styles.goalLabel,
              goal === item.key && styles.goalLabelSelected,
            ]}
          >
            {item.label}
          </Text>
          <Text style={styles.goalDesc}>{item.desc}</Text>
        </TouchableOpacity>
      ))}

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.backBtn} onPress={prevStep}>
          <Text style={styles.backBtnText}>← Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.nextBtn,
            styles.nextBtnHalf,
            !goal && styles.nextBtnDisabled,
          ]}
          onPress={handleFinish}
          disabled={!goal}
        >
          <Text style={styles.nextBtnText}>Let's Go! 🚀</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Progress bar */}
      <View style={styles.progressBar}>
        {[1, 2, 3, 4].map((i) => (
          <View
            key={i}
            style={[styles.progressDot, i <= step && styles.progressDotActive]}
          />
        ))}
      </View>
      <Text style={styles.stepCount}>Step {step} of 4</Text>

      {step === 1 && <Step1 />}
      {step === 2 && <Step2 />}
      {step === 3 && <Step3 />}
      {step === 4 && <Step4 />}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0d0d0d" },
  content: { padding: 24, paddingTop: 50 },
  progressBar: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    marginBottom: 8,
  },
  progressDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#333",
  },
  progressDotActive: { backgroundColor: "#00ff88", width: 24 },
  stepCount: {
    textAlign: "center",
    color: "#666",
    fontSize: 13,
    marginBottom: 24,
  },
  stepContainer: { width: "100%" },
  stepEmoji: { fontSize: 56, textAlign: "center", marginBottom: 12 },
  stepTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 6,
  },
  stepSubtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 28,
  },
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
  label: { color: "#fff", fontSize: 15, marginBottom: 10 },
  optionRow: { flexDirection: "row", gap: 12, marginBottom: 24 },
  optionBtn: {
    flex: 1,
    backgroundColor: "#1a1a1a",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#333",
  },
  optionSelected: { borderColor: "#00ff88", backgroundColor: "#0d2d1a" },
  optionText: { color: "#666", fontSize: 15, fontWeight: "600" },
  optionTextSelected: { color: "#00ff88" },
  activityBtn: {
    backgroundColor: "#1a1a1a",
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#333",
  },
  activityBtnSelected: { borderColor: "#00ff88", backgroundColor: "#0d2d1a" },
  activityLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: "#666",
    marginBottom: 2,
  },
  activityLabelSelected: { color: "#00ff88" },
  activityDesc: { fontSize: 12, color: "#444" },
  goalBtn: {
    backgroundColor: "#1a1a1a",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#333",
  },
  goalBtnSelected: { borderColor: "#00ff88", backgroundColor: "#0d2d1a" },
  goalLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#666",
    marginBottom: 4,
  },
  goalLabelSelected: { color: "#00ff88" },
  goalDesc: { fontSize: 13, color: "#444", lineHeight: 18 },
  buttonRow: { flexDirection: "row", gap: 12, marginTop: 8 },
  nextBtn: {
    backgroundColor: "#00ff88",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginTop: 8,
  },
  nextBtnHalf: { flex: 1, marginTop: 0 },
  nextBtnDisabled: { backgroundColor: "#333" },
  nextBtnText: { fontSize: 16, fontWeight: "bold", color: "#000" },
  backBtn: {
    flex: 1,
    backgroundColor: "#1a1a1a",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#333",
  },
  backBtnText: { fontSize: 16, color: "#666" },
});
