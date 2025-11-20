// import React from "react";
// import { useState, useEffect } from "react";
import { useState, useEffect } from 'react';

import { SplashScreen } from "./components/SplashScreen";
import { AuthForm } from "./components/AuthForm";
import { OnboardingQuestionnaire } from "./components/OnboardingQuestionnaire";
import { Dashboard } from "./components/Dashboard";
import { FoodScanner } from "./components/FoodScanner";
import { UserProfile } from "./components/UserProfile";
import { FoodLog } from "./components/FoodLog";

type AppState = 
  | "splash"
  | "auth" 
  | "onboarding"
  | "dashboard"
  | "food-scanner"
  | "profile"
  | "food-log";

interface FoodResult {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  fiber: number;
  confidence: number;
}

export default function App() {
  const [currentState, setCurrentState] = useState<AppState>("splash");
  const [isNewUser, setIsNewUser] = useState(true);

  // Enable dark mode by default
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const handleSplashComplete = () => {
    setCurrentState("auth");
  };

  const handleAuthComplete = () => {
    // In a real app, you'd check if the user has completed onboarding
    if (isNewUser) {
      setCurrentState("onboarding");
    } else {
      setCurrentState("dashboard");
    }
  };

  const handleOnboardingComplete = (data: any) => {
    console.log("Onboarding data:", data);
    setIsNewUser(false);
    setCurrentState("dashboard");
  };

  const handleScanFood = () => {
    setCurrentState("food-scanner");
  };

  const handleViewProfile = () => {
    setCurrentState("profile");
  };

  const handleViewFoodLog = () => {
    setCurrentState("food-log");
  };

  const handleBackToDashboard = () => {
    setCurrentState("dashboard");
  };

  const handleSaveFood = (food: FoodResult) => {
    console.log("Saving food:", food);
    // In a real app, this would save to database
    setCurrentState("dashboard");
  };

  switch (currentState) {
    case "splash":
      return <SplashScreen onComplete={handleSplashComplete} />;
    
    case "auth":
      return <AuthForm onAuthComplete={handleAuthComplete} />;
    
    case "onboarding":
      return <OnboardingQuestionnaire onComplete={handleOnboardingComplete} />;
    
    case "dashboard":
      return (
        <Dashboard 
          onScanFood={handleScanFood}
          onViewProfile={handleViewProfile}
          onViewFoodLog={handleViewFoodLog}
        />
      );
    
    case "food-scanner":
      return (
        <FoodScanner 
          onClose={handleBackToDashboard}
          onSaveFood={handleSaveFood}
        />
      );
    
    case "profile":
      return <UserProfile onBack={handleBackToDashboard} />;
    
    case "food-log":
      return <FoodLog onBack={handleBackToDashboard} />;
    
    default:
      return <div>Unknown state</div>;
  }
}



