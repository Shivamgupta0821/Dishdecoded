import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Checkbox } from "./ui/checkbox";
import { Progress } from "./ui/progress";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { saveUserData } from "../utils/userDataManager";

interface OnboardingData {
  name: string;
  age: string;
  gender: string;
  height: string;
  weight: string;
  goal: string;
  dietPreference: string;
  activityLevel: string;
  workoutHours: string;
  healthConcerns: string[];
}

interface OnboardingQuestionnaireProps {
  onComplete: (data: OnboardingData) => void;
}

export function OnboardingQuestionnaire({ onComplete }: OnboardingQuestionnaireProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<OnboardingData>({
    name: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
    goal: "",
    dietPreference: "",
    activityLevel: "",
    workoutHours: "",
    healthConcerns: []
  });

  const totalSteps = 9;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Save all user data to localStorage
      saveUserData({
        name: data.name,
        age: parseInt(data.age),
        gender: data.gender,
        height: parseInt(data.height),
        weight: parseInt(data.weight),
        goal: data.goal,
        dietPreference: data.dietPreference,
        activityLevel: data.activityLevel,
        workoutHours: parseInt(data.workoutHours),
        healthConcerns: data.healthConcerns.length > 0 ? data.healthConcerns : ['None']
      });
      onComplete(data);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateData = (key: keyof OnboardingData, value: any) => {
    setData(prev => ({ ...prev, [key]: value }));
  };

  const handleHealthConcernChange = (concern: string, checked: boolean) => {
    const newConcerns = checked 
      ? [...data.healthConcerns, concern]
      : data.healthConcerns.filter(c => c !== concern);
    updateData('healthConcerns', newConcerns);
  };

  const steps = [
    {
      title: "Let's get to know you",
      description: "Tell us your basic information",
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input 
              id="name" 
              value={data.name}
              onChange={(e) => updateData('name', e.target.value)}
              placeholder="Enter your full name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="age">Age</Label>
            <Input 
              id="age" 
              type="number"
              value={data.age}
              onChange={(e) => updateData('age', e.target.value)}
              placeholder="Enter your age"
            />
          </div>
        </div>
      )
    },
    {
      title: "Gender",
      description: "This helps us calculate your nutritional needs",
      content: (
        <RadioGroup value={data.gender} onValueChange={(value) => updateData('gender', value)}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="male" id="male" />
            <Label htmlFor="male">Male</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="female" id="female" />
            <Label htmlFor="female">Female</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="other" id="other" />
            <Label htmlFor="other">Other</Label>
          </div>
        </RadioGroup>
      )
    },
    {
      title: "Physical Stats",
      description: "Help us understand your body metrics",
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="height">Height (cm)</Label>
            <Input 
              id="height" 
              type="number"
              value={data.height}
              onChange={(e) => updateData('height', e.target.value)}
              placeholder="e.g., 170"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="weight">Weight (kg)</Label>
            <Input 
              id="weight" 
              type="number"
              value={data.weight}
              onChange={(e) => updateData('weight', e.target.value)}
              placeholder="e.g., 70"
            />
          </div>
        </div>
      )
    },
    {
      title: "Your Goal",
      description: "What do you want to achieve?",
      content: (
        <RadioGroup value={data.goal} onValueChange={(value) => updateData('goal', value)}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="lose" id="lose" />
            <Label htmlFor="lose">Lose Weight</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="gain" id="gain" />
            <Label htmlFor="gain">Gain Weight</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="maintain" id="maintain" />
            <Label htmlFor="maintain">Maintain Weight</Label>
          </div>
        </RadioGroup>
      )
    },
    {
      title: "Diet Preference",
      description: "What's your dietary style?",
      content: (
        <RadioGroup value={data.dietPreference} onValueChange={(value) => updateData('dietPreference', value)}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="vegetarian" id="vegetarian" />
            <Label htmlFor="vegetarian">Vegetarian</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="non-vegetarian" id="non-vegetarian" />
            <Label htmlFor="non-vegetarian">Non-Vegetarian</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="vegan" id="vegan" />
            <Label htmlFor="vegan">Vegan</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="keto" id="keto" />
            <Label htmlFor="keto">Keto</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="paleo" id="paleo" />
            <Label htmlFor="paleo">Paleo</Label>
          </div>
        </RadioGroup>
      )
    },
    {
      title: "Activity Level",
      description: "How active are you daily?",
      content: (
        <RadioGroup value={data.activityLevel} onValueChange={(value) => updateData('activityLevel', value)}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="sedentary" id="sedentary" />
            <Label htmlFor="sedentary">Sedentary (Little to no exercise)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="light" id="light" />
            <Label htmlFor="light">Light (Light exercise 1-3 days/week)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="moderate" id="moderate" />
            <Label htmlFor="moderate">Moderate (Moderate exercise 3-5 days/week)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="intense" id="intense" />
            <Label htmlFor="intense">Intense (Hard exercise 6-7 days/week)</Label>
          </div>
        </RadioGroup>
      )
    },
    {
      title: "Workout Hours",
      description: "How many hours do you work out per week?",
      content: (
        <div className="space-y-2">
          <Label htmlFor="workout-hours">Hours per week</Label>
          <Input 
            id="workout-hours" 
            type="number"
            value={data.workoutHours}
            onChange={(e) => updateData('workoutHours', e.target.value)}
            placeholder="e.g., 5"
            min="0"
            max="40"
          />
        </div>
      )
    },
    {
      title: "Health Concerns",
      description: "Do you have any of these health conditions? (Optional)",
      content: (
        <div className="space-y-4">
          {['Diabetes', 'High Blood Pressure', 'High Cholesterol', 'Heart Disease', 'Thyroid Issues', 'Food Allergies'].map((concern) => (
            <div key={concern} className="flex items-center space-x-2">
              <Checkbox 
                id={concern}
                checked={data.healthConcerns.includes(concern)}
                onCheckedChange={(checked) => handleHealthConcernChange(concern, checked as boolean)}
              />
              <Label htmlFor={concern}>{concern}</Label>
            </div>
          ))}
        </div>
      )
    },
    {
      title: "All Set! 🎉",
      description: "We're ready to personalize your nutrition journey",
      content: (
        <div className="text-center space-y-4">
          <div className="w-20 h-20 mx-auto bg-gradient-to-r from-emerald-500 to-blue-600 rounded-full flex items-center justify-center">
            <Check className="w-10 h-10 text-white" />
          </div>
          <p className="text-muted-foreground">
            Based on your information, we'll calculate your daily calorie needs and personalize your nutrition recommendations.
          </p>
        </div>
      )
    }
  ];

  const currentStepData = steps[currentStep];
  const canProceed = () => {
    switch (currentStep) {
      case 0: return data.name && data.age;
      case 1: return data.gender;
      case 2: return data.height && data.weight;
      case 3: return data.goal;
      case 4: return data.dietPreference;
      case 5: return data.activityLevel;
      case 6: return data.workoutHours;
      case 7: return true; // Health concerns are optional
      case 8: return true; // Final step
      default: return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950/20 to-blue-950/20 dark:from-emerald-950/40 dark:to-blue-950/40 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="mb-6">
          <Progress value={progress} className="h-2 mb-2" />
          <p className="text-sm text-muted-foreground text-center">
            Step {currentStep + 1} of {totalSteps}
          </p>
        </div>

        <Card className="backdrop-blur-sm bg-card/95 shadow-xl border border-border/20">
          <CardHeader className="text-center">
            <CardTitle>{currentStepData.title}</CardTitle>
            <CardDescription>{currentStepData.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="min-h-[200px] flex flex-col justify-center"
              >
                {currentStepData.content}
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </Button>
              
              <Button
                onClick={handleNext}
                disabled={!canProceed()}
                className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
              >
                {currentStep === totalSteps - 1 ? "Complete" : "Next"}
                {currentStep !== totalSteps - 1 && <ArrowRight className="w-4 h-4" />}
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}