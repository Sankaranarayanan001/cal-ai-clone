import * as FileSystem from 'expo-file-system/legacy';

const AUTH_FILE = FileSystem.documentDirectory + 'auth_data.json';

const getAll = async () => {
  try {
    const info = await FileSystem.getInfoAsync(AUTH_FILE);
    if (!info.exists) return {};
    const content = await FileSystem.readAsStringAsync(AUTH_FILE);
    return JSON.parse(content);
  } catch {
    return {};
  }
};

const setAll = async (data) => {
  await FileSystem.writeAsStringAsync(AUTH_FILE, JSON.stringify(data));
};

// Register new user
export async function signUp(email, password, name) {
  try {
    const all = await getAll();
    const users = all.users || {};

    if (users[email]) {
      return { success: false, error: 'Email already exists' };
    }

    users[email] = {
      name,
      email,
      password,
      createdAt: new Date().toISOString(),
    };

    all.users = users;
    await setAll(all);
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Signup failed' };
  }
}

// Login user
export async function login(email, password) {
  try {
    const all = await getAll();
    const users = all.users || {};
    const user = users[email];

    if (!user) {
      return { success: false, error: 'Email not found' };
    }

    if (user.password !== password) {
      return { success: false, error: 'Wrong password' };
    }

    // Save current session
    all.currentUser = email;
    await setAll(all);

    return { success: true, user };
  } catch (error) {
    return { success: false, error: 'Login failed' };
  }
}

// Get current logged in user
export async function getCurrentUser() {
  try {
    const all = await getAll();
    if (!all.currentUser) return null;
    const users = all.users || {};
    return users[all.currentUser] || null;
  } catch {
    return null;
  }
}

// Logout
export async function logout() {
  try {
    const all = await getAll();
    delete all.currentUser;
    await setAll(all);
    return true;
  } catch {
    return false;
  }
}

// Save user body details
export async function saveUserProfile(email, profile) {
  try {
    const all = await getAll();
    const users = all.users || {};
    if (users[email]) {
      users[email] = { ...users[email], ...profile };
      all.users = users;
      await setAll(all);
    }
    return true;
  } catch {
    return false;
  }
}

// Get user profile
export async function getUserProfile(email) {
  try {
    const all = await getAll();
    const users = all.users || {};
    return users[email] || null;
  } catch {
    return null;
  }
}

// Check if onboarding is complete
export async function isOnboardingComplete(email) {
  try {
    const all = await getAll();
    const users = all.users || {};
    const user = users[email];
    return user && user.age && user.weight && user.height;
  } catch {
    return false;
  }
}