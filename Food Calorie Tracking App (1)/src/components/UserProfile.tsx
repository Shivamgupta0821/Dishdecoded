import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Switch } from "./ui/switch";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { ArrowLeft, User, Target, Activity, Heart, Moon, Sun, Bell, Settings } from "lucide-react";
import { getUserData, formatGoalText } from "../utils/userDataManager";

interface UserProfileProps {
  onBack: () => void;
}

interface UserData {
  name: string;
  age: number;
  gender: string;
  height: number;
  weight: number;
  goal: string;
  dietPreference: string;
  activityLevel: string;
  workoutHours: number;
  healthConcerns: string[];
  dailyCalories: number;
  bmi: number;
}

export function UserProfile({ onBack }: UserProfileProps) {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  // Get user data from localStorage
  const storedUser = getUserData();
  
  // Provide default values if no user data exists
  const userData: UserData = {
    name: storedUser?.name || "User",
    age: storedUser?.age || 28,
    gender: storedUser?.gender || "Male",
    height: storedUser?.height || 175,
    weight: storedUser?.weight || 72,
    goal: storedUser?.goal || "maintain",
    dietPreference: storedUser?.dietPreference || "Non-Vegetarian",
    activityLevel: storedUser?.activityLevel || "Moderate",
    workoutHours: storedUser?.workoutHours || 5,
    healthConcerns: storedUser?.healthConcerns || ["None"],
    dailyCalories: storedUser?.dailyCalories || 2200,
    bmi: storedUser?.bmi || 23.5
  };

  const getBMIStatus = (bmi: number) => {
    if (bmi < 18.5) return { status: "Underweight", color: "bg-blue-500" };
    if (bmi < 25) return { status: "Normal", color: "bg-green-500" };
    if (bmi < 30) return { status: "Overweight", color: "bg-yellow-500" };
    return { status: "Obese", color: "bg-red-500" };
  };

  const bmiStatus = getBMIStatus(userData.bmi);

  const InfoCard = ({ icon: Icon, title, value, subtitle }: { 
    icon: any; 
    title: string; 
    value: string; 
    subtitle?: string;
  }) => (
    <Card className="bg-slate-800/50 border border-slate-700/50 shadow-lg">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full flex items-center justify-center">
            <Icon className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm text-white/60">{title}</h3>
            <p className="text-lg text-white">{value}</p>
            {subtitle && <p className="text-xs text-white/60">{subtitle}</p>}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden p-4">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-purple-900/90 to-slate-900/95" />
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="sm" onClick={onBack} className="text-white/80 hover:text-white hover:bg-white/10">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-2xl text-white">Profile</h1>
        </div>

        {/* Profile Header */}
        <Card className="mb-6 bg-slate-800/50 border border-slate-700/50 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="w-20 h-20 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full flex items-center justify-center"
              >
                <User className="w-10 h-10 text-white" />
              </motion.div>
              <div className="flex-1">
                <h2 className="text-xl mb-1 text-white">{userData.name}</h2>
                <p className="text-white/70">{userData.age} years old • {userData.gender}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">{formatGoalText(userData.goal)}</Badge>
                  <Badge variant="outline" className="border-white/20 text-white/80">{userData.dietPreference}</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Body Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <InfoCard 
            icon={Activity}
            title="Height"
            value={`${userData.height} cm`}
          />
          <InfoCard 
            icon={Activity}
            title="Weight"
            value={`${userData.weight} kg`}
          />
          <InfoCard 
            icon={Target}
            title="BMI"
            value={userData.bmi.toString()}
            subtitle={bmiStatus.status}
          />
          <InfoCard 
            icon={Target}
            title="Daily Calories"
            value={`${userData.dailyCalories} kcal`}
          />
        </div>

        {/* Lifestyle */}
        <Card className="mb-6 bg-slate-800/50 border border-slate-700/50 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Lifestyle
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm">Activity Level</span>
              <Badge variant="secondary">{userData.activityLevel}</Badge>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <span className="text-sm">Workout Hours/Week</span>
              <span className="text-sm">{userData.workoutHours} hours</span>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <span className="text-sm">Diet Preference</span>
              <Badge variant="outline">{userData.dietPreference}</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Health */}
        <Card className="mb-6 bg-slate-800/50 border border-slate-700/50 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="w-5 h-5" />
              Health Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <span className="text-sm">Health Concerns</span>
              <div className="flex gap-2">
                {userData.healthConcerns.map((concern, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {concern}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Settings */}
        <Card className="mb-6 bg-slate-800/50 border border-slate-700/50 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                {darkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                <span className="text-sm">Dark Mode</span>
              </div>
              <Switch 
                checked={darkMode} 
                onCheckedChange={setDarkMode}
              />
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Bell className="w-4 h-4" />
                <span className="text-sm">Notifications</span>
              </div>
              <Switch 
                checked={notifications} 
                onCheckedChange={setNotifications}
              />
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button 
            variant="outline" 
            className="w-full bg-slate-800/50 border border-slate-700/50 shadow-lg h-12 text-white hover:bg-slate-800/70"
          >
            Edit Profile
          </Button>
          <Button 
            variant="outline" 
            className="w-full bg-slate-800/50 border border-slate-700/50 shadow-lg h-12 text-white hover:bg-slate-800/70"
          >
            Update Goals
          </Button>
          <Button 
            variant="destructive" 
            className="w-full h-12"
          >
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
}