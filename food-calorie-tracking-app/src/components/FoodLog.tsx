import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ArrowLeft, Clock, Trash2, Edit3, TrendingUp, Calendar } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

interface FoodEntry {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  fiber: number;
  timestamp: Date;
  meal: "breakfast" | "lunch" | "dinner" | "snack";
}

interface FoodLogProps {
  onBack: () => void;
}

export function FoodLog({ onBack }: FoodLogProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<"week" | "month">("week");

  // Mock food log data
  const foodEntries: FoodEntry[] = [
    {
      id: "1",
      name: "Greek Yogurt with Berries",
      calories: 150,
      protein: 20,
      carbs: 16,
      fats: 3,
      fiber: 3,
      timestamp: new Date(2024, 11, 8, 8, 30),
      meal: "breakfast"
    },
    {
      id: "2", 
      name: "Grilled Chicken Salad",
      calories: 320,
      protein: 35,
      carbs: 12,
      fats: 15,
      fiber: 5,
      timestamp: new Date(2024, 11, 8, 13, 0),
      meal: "lunch"
    },
    {
      id: "3",
      name: "Almonds",
      calories: 160,
      protein: 6,
      carbs: 6,
      fats: 14,
      fiber: 4,
      timestamp: new Date(2024, 11, 8, 15, 30),
      meal: "snack"
    },
    {
      id: "4",
      name: "Salmon with Quinoa",
      calories: 450,
      protein: 35,
      carbs: 45,
      fats: 18,
      fiber: 5,
      timestamp: new Date(2024, 11, 8, 19, 0),
      meal: "dinner"
    }
  ];

  // Mock weekly data for charts
  const weeklyData = [
    { day: "Mon", calories: 2100, protein: 95, carbs: 230, fats: 78 },
    { day: "Tue", calories: 1950, protein: 88, carbs: 210, fats: 72 },
    { day: "Wed", calories: 2250, protein: 102, carbs: 245, fats: 85 },
    { day: "Thu", calories: 2080, protein: 96, carbs: 225, fats: 76 },
    { day: "Fri", calories: 1890, protein: 85, carbs: 195, fats: 70 },
    { day: "Sat", calories: 2180, protein: 98, carbs: 240, fats: 82 },
    { day: "Sun", calories: 2020, protein: 92, carbs: 220, fats: 74 }
  ];

  const getMealIcon = (meal: string) => {
    const icons = {
      breakfast: "🍳",
      lunch: "🥗", 
      dinner: "🍽️",
      snack: "🍎"
    };
    return icons[meal as keyof typeof icons] || "🍽️";
  };

  const getMealColor = (meal: string) => {
    const colors = {
      breakfast: "bg-yellow-100 text-yellow-800",
      lunch: "bg-green-100 text-green-800",
      dinner: "bg-blue-100 text-blue-800", 
      snack: "bg-purple-100 text-purple-800"
    };
    return colors[meal as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const todaysEntries = foodEntries.filter(entry => 
    entry.timestamp.toDateString() === new Date().toDateString()
  );

  const totalToday = todaysEntries.reduce((acc, entry) => ({
    calories: acc.calories + entry.calories,
    protein: acc.protein + entry.protein,
    carbs: acc.carbs + entry.carbs,
    fats: acc.fats + entry.fats,
    fiber: acc.fiber + entry.fiber
  }), { calories: 0, protein: 0, carbs: 0, fats: 0, fiber: 0 });

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 p-4">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h1 className="text-2xl">Food Log</h1>
      </div>

      <Tabs defaultValue="today" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="today" className="space-y-4">
          {/* Today's Summary */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Today's Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-2xl text-emerald-600 mb-1">{totalToday.calories}</p>
                  <p className="text-sm text-muted-foreground">Calories</p>
                </div>
                <div className="text-center">
                  <p className="text-lg">{totalToday.protein}g</p>
                  <p className="text-sm text-muted-foreground">Protein</p>
                </div>
                <div className="text-center">
                  <p className="text-lg">{totalToday.carbs}g</p>
                  <p className="text-sm text-muted-foreground">Carbs</p>
                </div>
                <div className="text-center">
                  <p className="text-lg">{totalToday.fats}g</p>
                  <p className="text-sm text-muted-foreground">Fats</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Food Entries */}
          <div className="space-y-3">
            {todaysEntries.length === 0 ? (
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-8 text-center">
                  <div className="text-4xl mb-4">🍽️</div>
                  <h3 className="text-lg mb-2">No food logged today</h3>
                  <p className="text-muted-foreground text-sm">
                    Start tracking your meals to see them here
                  </p>
                </CardContent>
              </Card>
            ) : (
              todaysEntries.map((entry, index) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{getMealIcon(entry.meal)}</span>
                          <div>
                            <h3 className="text-lg">{entry.name}</h3>
                            <div className="flex items-center gap-2">
                              <Badge className={getMealColor(entry.meal)}>
                                {entry.meal}
                              </Badge>
                              <span className="text-sm text-muted-foreground flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {formatTime(entry.timestamp)}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit3 className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-4 gap-2 text-center">
                        <div>
                          <p className="text-lg text-emerald-600">{entry.calories}</p>
                          <p className="text-xs text-muted-foreground">kcal</p>
                        </div>
                        <div>
                          <p className="text-sm">{entry.protein}g</p>
                          <p className="text-xs text-muted-foreground">protein</p>
                        </div>
                        <div>
                          <p className="text-sm">{entry.carbs}g</p>
                          <p className="text-xs text-muted-foreground">carbs</p>
                        </div>
                        <div>
                          <p className="text-sm">{entry.fats}g</p>
                          <p className="text-xs text-muted-foreground">fats</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-8 text-center">
              <div className="text-4xl mb-4">📅</div>
              <h3 className="text-lg mb-2">Food History</h3>
              <p className="text-muted-foreground text-sm">
                View your food log history by date
              </p>
              <Button className="mt-4" variant="outline">
                Select Date Range
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          {/* Period Selector */}
          <div className="flex justify-center">
            <div className="flex bg-white/80 backdrop-blur-sm rounded-lg p-1 shadow-lg">
              <Button
                variant={selectedPeriod === "week" ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedPeriod("week")}
              >
                Week
              </Button>
              <Button
                variant={selectedPeriod === "month" ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedPeriod("month")}
              >
                Month
              </Button>
            </div>
          </div>

          {/* Calorie Trend */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Calorie Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="calories" 
                    stroke="#10b981" 
                    strokeWidth={3}
                    dot={{ fill: "#10b981" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Macronutrients */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Macronutrients Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="protein" fill="#3b82f6" />
                  <Bar dataKey="carbs" fill="#10b981" />
                  <Bar dataKey="fats" fill="#f59e0b" />
                </BarChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm">Protein</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                  <span className="text-sm">Carbs</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm">Fats</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}