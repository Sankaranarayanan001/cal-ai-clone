// ============================================
// LOCAL INDIAN FOOD DATABASE (offline, instant)
// ============================================
export const INDIAN_FOODS = [
  // Breakfast
  { id: 1, name: 'Idly', category: 'Breakfast', unit: 'piece', gramsPerUnit: 40, cal: 58, protein: 2, carbs: 12, fat: 0.4 },
  { id: 2, name: 'Dosa', category: 'Breakfast', unit: 'piece', gramsPerUnit: 80, cal: 168, protein: 3, carbs: 23, fat: 7 },
  { id: 3, name: 'Chapathi', category: 'Breakfast', unit: 'piece', gramsPerUnit: 40, cal: 120, protein: 3, carbs: 20, fat: 3 },
  { id: 4, name: 'Parotta', category: 'Breakfast', unit: 'piece', gramsPerUnit: 80, cal: 260, protein: 4, carbs: 35, fat: 11 },
  { id: 5, name: 'Poori', category: 'Breakfast', unit: 'piece', gramsPerUnit: 35, cal: 150, protein: 2, carbs: 18, fat: 7 },
  { id: 6, name: 'Upma', category: 'Breakfast', unit: 'cup', gramsPerUnit: 150, cal: 180, protein: 4, carbs: 28, fat: 5 },
  { id: 7, name: 'Pongal', category: 'Breakfast', unit: 'cup', gramsPerUnit: 150, cal: 220, protein: 5, carbs: 32, fat: 7 },
  { id: 8, name: 'Pesarattu', category: 'Breakfast', unit: 'piece', gramsPerUnit: 60, cal: 140, protein: 6, carbs: 20, fat: 4 },
  { id: 9, name: 'Rava Dosa', category: 'Breakfast', unit: 'piece', gramsPerUnit: 70, cal: 155, protein: 3, carbs: 22, fat: 6 },
  { id: 10, name: 'Uttapam', category: 'Breakfast', unit: 'piece', gramsPerUnit: 90, cal: 180, protein: 4, carbs: 28, fat: 5 },
  { id: 11, name: 'Appam', category: 'Breakfast', unit: 'piece', gramsPerUnit: 50, cal: 120, protein: 2, carbs: 22, fat: 2 },
  { id: 12, name: 'Puttu', category: 'Breakfast', unit: 'piece', gramsPerUnit: 80, cal: 170, protein: 3, carbs: 35, fat: 1 },
  // Rice dishes
  { id: 13, name: 'White Rice', category: 'Rice', unit: 'cup', gramsPerUnit: 150, cal: 195, protein: 4, carbs: 42, fat: 0.4 },
  { id: 14, name: 'Brown Rice', category: 'Rice', unit: 'cup', gramsPerUnit: 150, cal: 168, protein: 4, carbs: 36, fat: 1.5 },
  { id: 15, name: 'Biryani', category: 'Rice', unit: 'cup', gramsPerUnit: 200, cal: 350, protein: 12, carbs: 45, fat: 12 },
  { id: 16, name: 'Lemon Rice', category: 'Rice', unit: 'cup', gramsPerUnit: 150, cal: 220, protein: 4, carbs: 38, fat: 6 },
  { id: 17, name: 'Curd Rice', category: 'Rice', unit: 'cup', gramsPerUnit: 150, cal: 180, protein: 5, carbs: 30, fat: 4 },
  { id: 18, name: 'Tamarind Rice', category: 'Rice', unit: 'cup', gramsPerUnit: 150, cal: 230, protein: 4, carbs: 40, fat: 7 },
  { id: 19, name: 'Coconut Rice', category: 'Rice', unit: 'cup', gramsPerUnit: 150, cal: 280, protein: 4, carbs: 38, fat: 12 },
  { id: 20, name: 'Fried Rice', category: 'Rice', unit: 'cup', gramsPerUnit: 150, cal: 290, protein: 6, carbs: 40, fat: 10 },
  // Curries
  { id: 21, name: 'Dal', category: 'Curry', unit: 'cup', gramsPerUnit: 150, cal: 150, protein: 9, carbs: 22, fat: 3 },
  { id: 22, name: 'Sambar', category: 'Curry', unit: 'cup', gramsPerUnit: 150, cal: 90, protein: 4, carbs: 14, fat: 2 },
  { id: 23, name: 'Chicken Curry', category: 'Curry', unit: 'cup', gramsPerUnit: 150, cal: 280, protein: 25, carbs: 8, fat: 16 },
  { id: 24, name: 'Fish Curry', category: 'Curry', unit: 'cup', gramsPerUnit: 150, cal: 220, protein: 22, carbs: 6, fat: 12 },
  { id: 25, name: 'Egg Curry', category: 'Curry', unit: 'cup', gramsPerUnit: 150, cal: 200, protein: 14, carbs: 8, fat: 14 },
  { id: 26, name: 'Paneer Curry', category: 'Curry', unit: 'cup', gramsPerUnit: 150, cal: 280, protein: 14, carbs: 10, fat: 20 },
  { id: 27, name: 'Mutton Curry', category: 'Curry', unit: 'cup', gramsPerUnit: 150, cal: 320, protein: 28, carbs: 6, fat: 20 },
  { id: 28, name: 'Prawn Curry', category: 'Curry', unit: 'cup', gramsPerUnit: 150, cal: 200, protein: 20, carbs: 8, fat: 10 },
  { id: 29, name: 'Rasam', category: 'Curry', unit: 'cup', gramsPerUnit: 150, cal: 50, protein: 2, carbs: 8, fat: 1 },
  { id: 30, name: 'Kootu', category: 'Curry', unit: 'cup', gramsPerUnit: 150, cal: 160, protein: 6, carbs: 20, fat: 6 },
  // Snacks
  { id: 31, name: 'Boiled Egg', category: 'Protein', unit: 'piece', gramsPerUnit: 50, cal: 78, protein: 6, carbs: 1, fat: 5 },
  { id: 32, name: 'Omelette', category: 'Protein', unit: 'piece', gramsPerUnit: 60, cal: 110, protein: 8, carbs: 1, fat: 8 },
  { id: 33, name: 'Chicken Breast', category: 'Protein', unit: '100g', gramsPerUnit: 100, cal: 165, protein: 31, carbs: 0, fat: 3.6 },
  { id: 34, name: 'Paneer', category: 'Protein', unit: '100g', gramsPerUnit: 100, cal: 265, protein: 18, carbs: 3, fat: 20 },
  { id: 35, name: 'Banana', category: 'Fruit', unit: 'piece', gramsPerUnit: 100, cal: 89, protein: 1, carbs: 23, fat: 0.3 },
  { id: 36, name: 'Apple', category: 'Fruit', unit: 'piece', gramsPerUnit: 150, cal: 78, protein: 0.4, carbs: 21, fat: 0.2 },
  { id: 37, name: 'Mango', category: 'Fruit', unit: 'piece', gramsPerUnit: 200, cal: 130, protein: 1, carbs: 33, fat: 0.5 },
  { id: 38, name: 'Milk', category: 'Dairy', unit: 'cup', gramsPerUnit: 240, cal: 150, protein: 8, carbs: 12, fat: 8 },
  { id: 39, name: 'Curd', category: 'Dairy', unit: 'cup', gramsPerUnit: 200, cal: 120, protein: 8, carbs: 10, fat: 5 },
  { id: 40, name: 'Peanuts', category: 'Snack', unit: '100g', gramsPerUnit: 100, cal: 567, protein: 26, carbs: 16, fat: 49 },
  { id: 41, name: 'Vada', category: 'Snack', unit: 'piece', gramsPerUnit: 40, cal: 145, protein: 3, carbs: 14, fat: 8 },
  { id: 42, name: 'Bajji', category: 'Snack', unit: 'piece', gramsPerUnit: 40, cal: 130, protein: 2, carbs: 16, fat: 6 },
  { id: 43, name: 'Murukku', category: 'Snack', unit: 'piece', gramsPerUnit: 20, cal: 100, protein: 2, carbs: 12, fat: 5 },
  { id: 44, name: 'Sundal', category: 'Snack', unit: 'cup', gramsPerUnit: 100, cal: 150, protein: 7, carbs: 22, fat: 3 },
  // Drinks
  { id: 45, name: 'Filter Coffee', category: 'Drink', unit: 'cup', gramsPerUnit: 150, cal: 60, protein: 2, carbs: 8, fat: 2 },
  { id: 46, name: 'Masala Tea', category: 'Drink', unit: 'cup', gramsPerUnit: 150, cal: 55, protein: 2, carbs: 8, fat: 1.5 },
  { id: 47, name: 'Lassi', category: 'Drink', unit: 'cup', gramsPerUnit: 200, cal: 150, protein: 6, carbs: 20, fat: 5 },
  { id: 48, name: 'Buttermilk', category: 'Drink', unit: 'cup', gramsPerUnit: 200, cal: 40, protein: 3, carbs: 5, fat: 1 },
];

// ============================================
// USDA API SEARCH (for all other foods)
// ============================================
const USDA_API_KEY = 'DEMO_KEY'; // Replace with your key from fdc.nal.usda.gov

export async function searchUSDAFood(query) {
  try {
    const response = await fetch(
      `https://api.nal.usda.gov/fdc/v1/foods/search?query=${encodeURIComponent(query)}&pageSize=5&api_key=${USDA_API_KEY}`
    );
    const data = await response.json();

    if (!data.foods || data.foods.length === 0) return null;

    const food = data.foods[0];
    const nutrients = food.foodNutrients || [];

    const getNutrient = (name) => {
      const n = nutrients.find(n => n.nutrientName && n.nutrientName.includes(name));
      return n ? Math.round(n.value) : 0;
    };

    return {
      foodName: food.description,
      calories: getNutrient('Energy'),
      protein: getNutrient('Protein'),
      carbs: getNutrient('Carbohydrate'),
      fat: getNutrient('Total lipid'),
      servingSize: '100g',
    };
  } catch (error) {
    console.error('USDA error:', error);
    return null;
  }
}

// Search local Indian food database
export function searchIndianFood(query) {
  const q = query.toLowerCase();
  return INDIAN_FOODS.filter(f =>
    f.name.toLowerCase().includes(q) ||
    f.category.toLowerCase().includes(q)
  );
}

// Calculate nutrition for quantity
export function calculateNutrition(food, quantity) {
  return {
    foodName: `${food.name} (${quantity} ${food.unit})`,
    calories: Math.round(food.cal * quantity),
    protein: Math.round(food.protein * quantity),
    carbs: Math.round(food.carbs * quantity),
    fat: Math.round(food.fat * quantity),
    servingSize: `${quantity} ${food.unit}`,
  };
}

// ============================================
// TDEE CALCULATOR
// ============================================
export function calculateTDEE(age, weight, height, gender, activityLevel) {
  let bmr;
  if (gender === 'male') {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  const multipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    athletic: 1.9,
  };

  return Math.round(bmr * (multipliers[activityLevel] || 1.55));
}

// ============================================
// MACRO CALCULATOR
// ============================================
export function calculateMacros(tdee, goal, weight) {
  let calories, protein, carbs, fat;

  if (goal === 'cut') {
    calories = tdee - 500;
    protein = Math.round(weight * 2.2);
    fat = Math.round((calories * 0.25) / 9);
    carbs = Math.round((calories - protein * 4 - fat * 9) / 4);
  } else if (goal === 'bulk') {
    calories = tdee + 300;
    protein = Math.round(weight * 2.0);
    fat = Math.round((calories * 0.25) / 9);
    carbs = Math.round((calories - protein * 4 - fat * 9) / 4);
  } else {
    calories = tdee;
    protein = Math.round(weight * 1.8);
    fat = Math.round((calories * 0.3) / 9);
    carbs = Math.round((calories - protein * 4 - fat * 9) / 4);
  }

  return {
    calories: Math.round(calories),
    protein: Math.max(protein, 50),
    carbs: Math.max(carbs, 50),
    fat: Math.max(fat, 30),
  };
}

// ============================================
// DIET PLAN GENERATOR
// ============================================
export function generateDietPlans(goal, macros) {
  if (goal === 'cut') {
    return [
      {
        name: '🥗 South Indian Cut Plan',
        description: 'Low carb South Indian meals for fat loss',
        meals: [
          { time: 'Breakfast 7am', foods: '3 Idly + Sambar + 2 Boiled Eggs', cal: 350 },
          { time: 'Lunch 1pm', foods: '1 cup Rice + Dal + Chicken Curry', cal: 450 },
          { time: 'Snack 4pm', foods: '1 Banana + 1 cup Buttermilk', cal: 130 },
          { time: 'Dinner 7pm', foods: '2 Chapathi + Egg Curry', cal: 380 },
        ],
        totalCal: macros.calories,
        protein: macros.protein,
        carbs: macros.carbs,
        fat: macros.fat,
      },
      {
        name: '💪 High Protein Cut Plan',
        description: 'Maximum muscle retention during cut',
        meals: [
          { time: 'Breakfast 7am', foods: '3 Boiled Eggs + 2 Chapathi + Milk', cal: 474 },
          { time: 'Lunch 1pm', foods: 'Brown Rice + Fish Curry', cal: 388 },
          { time: 'Snack 4pm', foods: 'Curd + Peanuts 30g', cal: 290 },
          { time: 'Dinner 7pm', foods: '2 Dosa + Sambar + 1 Egg', cal: 504 },
        ],
        totalCal: macros.calories,
        protein: macros.protein,
        carbs: macros.carbs,
        fat: macros.fat,
      },
    ];
  } else if (goal === 'bulk') {
    return [
      {
        name: '🍚 South Indian Bulk Plan',
        description: 'High calorie South Indian meals for muscle gain',
        meals: [
          { time: 'Breakfast 7am', foods: '4 Idly + Pongal + 3 Boiled Eggs', cal: 620 },
          { time: 'Lunch 1pm', foods: '2 cups Rice + Dal + Chicken Curry', cal: 780 },
          { time: 'Snack 4pm', foods: '2 Banana + Milk + Peanuts 30g', cal: 478 },
          { time: 'Dinner 7pm', foods: '3 Chapathi + Paneer Curry', cal: 700 },
        ],
        totalCal: macros.calories,
        protein: macros.protein,
        carbs: macros.carbs,
        fat: macros.fat,
      },
      {
        name: '🏋️ Clean Bulk Plan',
        description: 'Lean bulk with minimal fat gain',
        meals: [
          { time: 'Breakfast 7am', foods: '2 Pesarattu + 3 Eggs + Milk', cal: 580 },
          { time: 'Lunch 1pm', foods: 'Biryani + Egg Curry + Curd', cal: 750 },
          { time: 'Snack 4pm', foods: '2 Banana + Peanuts 50g', cal: 462 },
          { time: 'Dinner 7pm', foods: '2 Parotta + Chicken Curry', cal: 800 },
        ],
        totalCal: macros.calories,
        protein: macros.protein,
        carbs: macros.carbs,
        fat: macros.fat,
      },
    ];
  } else {
    return [
      {
        name: '⚖️ Balanced Maintenance Plan',
        description: 'Stay at current weight with balanced nutrition',
        meals: [
          { time: 'Breakfast 7am', foods: '2 Dosa + Sambar + 2 Boiled Eggs', cal: 502 },
          { time: 'Lunch 1pm', foods: '1.5 cups Rice + Dal + Fish Curry', cal: 585 },
          { time: 'Snack 4pm', foods: '1 Apple + Curd', cal: 198 },
          { time: 'Dinner 7pm', foods: '2 Chapathi + Dal', cal: 390 },
        ],
        totalCal: macros.calories,
        protein: macros.protein,
        carbs: macros.carbs,
        fat: macros.fat,
      },
    ];
  }
}