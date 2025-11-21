// User Data Management Utility
export interface UserData {
  // Auth data
  name: string;
  email: string;
  
  // Onboarding data
  age: number;
  gender: string;
  height: number;
  weight: number;
  goal: string; // 'lose', 'maintain', 'gain'
  dietPreference: string;
  activityLevel: string;
  workoutHours: number;
  healthConcerns: string[];
  
  // Calculated data
  dailyCalories: number;
  bmi: number;
}

export interface FoodLogEntry {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  fiber: number;
  image?: string;
  timestamp: number;
  date: string; // YYYY-MM-DD format
}

const USER_DATA_KEY = 'dishdecoded_user_data';
const FOOD_LOG_KEY = 'dishdecoded_food_log';

// Calculate BMI
export function calculateBMI(weight: number, height: number): number {
  // BMI = weight(kg) / (height(m))^2
  const heightInMeters = height / 100;
  return Math.round((weight / (heightInMeters * heightInMeters)) * 10) / 10;
}

// Calculate daily calorie needs using Mifflin-St Jeor Equation
export function calculateDailyCalories(
  age: number,
  gender: string,
  height: number,
  weight: number,
  activityLevel: string,
  goal: string
): number {
  // Calculate BMR (Basal Metabolic Rate)
  let bmr: number;
  
  if (gender.toLowerCase() === 'male') {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else if (gender.toLowerCase() === 'female') {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  } else {
    // For 'other', use average of male and female
    bmr = 10 * weight + 6.25 * height - 5 * age - 78;
  }
  
  // Apply activity factor to get TDEE (Total Daily Energy Expenditure)
  let activityFactor: number;
  
  switch (activityLevel.toLowerCase()) {
    case 'sedentary':
      activityFactor = 1.2;
      break;
    case 'light':
      activityFactor = 1.375;
      break;
    case 'moderate':
      activityFactor = 1.55;
      break;
    case 'intense':
      activityFactor = 1.725;
      break;
    default:
      activityFactor = 1.55;
  }
  
  let tdee = bmr * activityFactor;
  
  // Adjust based on goal
  switch (goal.toLowerCase()) {
    case 'lose':
      tdee = tdee - 500; // 500 calorie deficit for weight loss
      break;
    case 'gain':
      tdee = tdee + 500; // 500 calorie surplus for weight gain
      break;
    case 'maintain':
    default:
      // Keep TDEE as is
      break;
  }
  
  return Math.round(tdee);
}

// Save user data
export function saveUserData(data: Partial<UserData>): void {
  const existingData = getUserData();
  const updatedData = { ...existingData, ...data };
  
  // Recalculate BMI and calories if relevant data changed
  if (updatedData.weight && updatedData.height) {
    updatedData.bmi = calculateBMI(updatedData.weight, updatedData.height);
  }
  
  if (
    updatedData.age && 
    updatedData.gender && 
    updatedData.height && 
    updatedData.weight && 
    updatedData.activityLevel && 
    updatedData.goal
  ) {
    updatedData.dailyCalories = calculateDailyCalories(
      updatedData.age,
      updatedData.gender,
      updatedData.height,
      updatedData.weight,
      updatedData.activityLevel,
      updatedData.goal
    );
  }
  
  localStorage.setItem(USER_DATA_KEY, JSON.stringify(updatedData));
}

// Get user data
export function getUserData(): UserData | null {
  const data = localStorage.getItem(USER_DATA_KEY);
  if (data) {
    try {
      return JSON.parse(data);
    } catch (e) {
      console.error('Error parsing user data:', e);
      return null;
    }
  }
  return null;
}

// Clear user data (for logout)
export function clearUserData(): void {
  localStorage.removeItem(USER_DATA_KEY);
}

// Save food log entry
export function saveFoodEntry(food: Omit<FoodLogEntry, 'id' | 'timestamp' | 'date'>): void {
  const logs = getFoodLog();
  const now = Date.now();
  const date = new Date(now).toISOString().split('T')[0]; // YYYY-MM-DD
  
  const entry: FoodLogEntry = {
    ...food,
    id: `food_${now}_${Math.random().toString(36).substr(2, 9)}`,
    timestamp: now,
    date
  };
  
  logs.push(entry);
  localStorage.setItem(FOOD_LOG_KEY, JSON.stringify(logs));
}

// Get food log
export function getFoodLog(): FoodLogEntry[] {
  const data = localStorage.getItem(FOOD_LOG_KEY);
  if (data) {
    try {
      return JSON.parse(data);
    } catch (e) {
      console.error('Error parsing food log:', e);
      return [];
    }
  }
  return [];
}

// Get today's food entries
export function getTodaysFoodLog(): FoodLogEntry[] {
  const today = new Date().toISOString().split('T')[0];
  return getFoodLog().filter(entry => entry.date === today);
}

// Calculate today's nutrition totals
export function getTodaysNutrition(): {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  fiber: number;
} {
  const todaysFood = getTodaysFoodLog();
  
  return todaysFood.reduce(
    (totals, entry) => ({
      calories: totals.calories + entry.calories,
      protein: totals.protein + entry.protein,
      carbs: totals.carbs + entry.carbs,
      fats: totals.fats + entry.fats,
      fiber: totals.fiber + entry.fiber
    }),
    { calories: 0, protein: 0, carbs: 0, fats: 0, fiber: 0 }
  );
}

// Format goal text
export function formatGoalText(goal: string): string {
  switch (goal.toLowerCase()) {
    case 'lose':
      return 'Lose Weight';
    case 'gain':
      return 'Gain Weight';
    case 'maintain':
      return 'Maintain Weight';
    default:
      return goal;
  }
}
