import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, ActivityIndicator, View } from "react-native";
import { useState, useEffect } from "react";

import HomeScreen from "./screens/HomeScreen";
import CameraScreen from "./screens/CameraScreen";
import HistoryScreen from "./screens/HistoryScreen";
import ProfileScreen from "./screens/ProfileScreen";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import OnboardingScreen from "./screens/OnboardingScreen";
import RecommendationScreen from "./screens/RecommendationScreen";

import {
  getCurrentUser,
  isOnboardingComplete,
  clearAllData,
} from "./services/auth";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainApp() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#1a1a1a",
          borderTopColor: "#333",
          paddingBottom: 5,
          height: 60,
        },
        tabBarActiveTintColor: "#00ff88",
        tabBarInactiveTintColor: "#666",
        headerStyle: { backgroundColor: "#0d0d0d" },
        headerTintColor: "#fff",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarIcon: () => <Text>🏠</Text> }}
      />
      <Tab.Screen
        name="Camera"
        component={CameraScreen}
        options={{ tabBarIcon: () => <Text>📷</Text> }}
      />
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{ tabBarIcon: () => <Text>📊</Text> }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ tabBarIcon: () => <Text>👤</Text> }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState("Login");

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const user = await getCurrentUser();
      if (user) {
        const onboarded = await isOnboardingComplete(user.email);
        if (onboarded) {
          setInitialRoute("MainApp");
        } else {
          setInitialRoute("Onboarding");
        }
      } else {
        setInitialRoute("Login");
      }
    } catch {
      setInitialRoute("Login");
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#0d0d0d",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontSize: 48 }}>🥗</Text>
        <ActivityIndicator color="#00ff88" style={{ marginTop: 16 }} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Recommendation" component={RecommendationScreen} />
        <Stack.Screen name="MainApp" component={MainApp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
