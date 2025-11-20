import React from "react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { getUserData, getTodaysNutrition } from "../utils/userDataManager";

import { 
  Camera, 
  Droplets, 
  Flame, 
  Apple, 
  Zap, 
  Shield, 
  ChefHat,
  Trophy,
  Target,
  Plus,
  BarChart3,
  Settings,
  Heart
} from "lucide-react";

interface DashboardProps {
  onScanFood: () => void;
  onViewProfile: () => void;
  onViewFoodLog: () => void;
}

interface NutrientData {
  name: string;
  current: number;
  target: number;
  color: string;
  gradientFrom: string;
  gradientTo: string;
  icon: any;
  unit: string;
}

interface Recipe {
  name: string;
  description: string;
  prepTime: string;
  cookTime: string;
  servings: number;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  ingredients: string[];
  instructions: string[];
  tags: string[];
}

// 20 Healthy Vegetarian High-Protein Recipes
const recipes: Recipe[] = [
  {
    name: "Quinoa & Black Bean Power Bowl",
    description: "A nutrient-dense bowl loaded with complete proteins, fiber, and essential vitamins.",
    prepTime: "15 min",
    cookTime: "20 min",
    servings: 2,
    calories: 450,
    protein: 18,
    carbs: 65,
    fats: 12,
    ingredients: [
      "1 cup quinoa",
      "1 can black beans, rinsed",
      "1 avocado, sliced",
      "1 cup cherry tomatoes",
      "1/4 cup corn",
      "2 tbsp lime juice",
      "Fresh cilantro",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Cook quinoa according to package directions",
      "Warm black beans in a pan",
      "Assemble bowls with quinoa base",
      "Top with beans, avocado, tomatoes, and corn",
      "Drizzle with lime juice and garnish with cilantro"
    ],
    tags: ["High Protein", "Gluten-Free", "Vegan"]
  },
  {
    name: "Lentil Spinach Curry",
    description: "Rich, aromatic curry packed with plant-based protein and iron from lentils and spinach.",
    prepTime: "10 min",
    cookTime: "30 min",
    servings: 4,
    calories: 320,
    protein: 16,
    carbs: 48,
    fats: 8,
    ingredients: [
      "2 cups red lentils",
      "3 cups fresh spinach",
      "1 can coconut milk",
      "2 tbsp curry powder",
      "1 onion, diced",
      "3 cloves garlic, minced",
      "1 tbsp ginger, grated",
      "2 cups vegetable broth"
    ],
    instructions: [
      "Sauté onion, garlic, and ginger until fragrant",
      "Add curry powder and cook for 1 minute",
      "Add lentils and broth, simmer for 20 minutes",
      "Stir in coconut milk and spinach",
      "Cook until spinach wilts, season to taste"
    ],
    tags: ["High Protein", "Vegan", "Gluten-Free"]
  },
  {
    name: "Greek Chickpea Salad",
    description: "Mediterranean-inspired salad with chickpeas, feta, and fresh vegetables.",
    prepTime: "15 min",
    cookTime: "0 min",
    servings: 3,
    calories: 380,
    protein: 15,
    carbs: 42,
    fats: 16,
    ingredients: [
      "2 cans chickpeas, drained",
      "1 cup cucumber, diced",
      "1 cup cherry tomatoes, halved",
      "1/2 cup feta cheese",
      "1/4 cup kalamata olives",
      "2 tbsp olive oil",
      "1 tbsp lemon juice",
      "Fresh oregano"
    ],
    instructions: [
      "Combine chickpeas, cucumber, and tomatoes in a bowl",
      "Add feta and olives",
      "Whisk olive oil and lemon juice",
      "Toss salad with dressing",
      "Garnish with fresh oregano"
    ],
    tags: ["High Protein", "Quick", "Vegetarian"]
  },
  {
    name: "Tofu Scramble Breakfast",
    description: "A plant-based alternative to scrambled eggs, loaded with protein and turmeric.",
    prepTime: "5 min",
    cookTime: "10 min",
    servings: 2,
    calories: 280,
    protein: 20,
    carbs: 12,
    fats: 18,
    ingredients: [
      "1 block firm tofu, crumbled",
      "1/2 tsp turmeric",
      "1/2 tsp garlic powder",
      "1 bell pepper, diced",
      "1 cup spinach",
      "2 tbsp nutritional yeast",
      "Salt and pepper",
      "1 tbsp olive oil"
    ],
    instructions: [
      "Heat oil in a pan over medium heat",
      "Add bell pepper and sauté for 3 minutes",
      "Add crumbled tofu, turmeric, and garlic powder",
      "Cook for 5 minutes, stirring occasionally",
      "Add spinach and nutritional yeast, cook until wilted"
    ],
    tags: ["High Protein", "Vegan", "Breakfast"]
  },
  {
    name: "Edamame & Avocado Buddha Bowl",
    description: "A vibrant bowl featuring edamame, the ultimate plant protein powerhouse.",
    prepTime: "10 min",
    cookTime: "15 min",
    servings: 2,
    calories: 420,
    protein: 19,
    carbs: 52,
    fats: 16,
    ingredients: [
      "1 cup brown rice",
      "1.5 cups shelled edamame",
      "1 avocado, sliced",
      "1 carrot, shredded",
      "1/4 purple cabbage, shredded",
      "2 tbsp sesame seeds",
      "3 tbsp soy sauce",
      "1 tbsp rice vinegar"
    ],
    instructions: [
      "Cook brown rice according to package",
      "Steam edamame for 5 minutes",
      "Arrange rice, edamame, and vegetables in bowls",
      "Top with avocado and sesame seeds",
      "Mix soy sauce and vinegar for dressing"
    ],
    tags: ["High Protein", "Vegan", "Gluten-Free"]
  },
  {
    name: "Mediterranean Lentil Bowl",
    description: "Protein-packed lentils with roasted vegetables and tahini dressing.",
    prepTime: "10 min",
    cookTime: "25 min",
    servings: 3,
    calories: 395,
    protein: 17,
    carbs: 56,
    fats: 12,
    ingredients: [
      "1.5 cups green lentils",
      "2 cups roasted vegetables (zucchini, bell peppers, eggplant)",
      "1/4 cup tahini",
      "2 tbsp lemon juice",
      "2 cloves garlic",
      "Fresh parsley",
      "Pinch of cumin"
    ],
    instructions: [
      "Cook lentils in boiling water for 20 minutes",
      "Roast vegetables with olive oil at 400°F for 20 minutes",
      "Blend tahini, lemon juice, garlic, and water for dressing",
      "Combine lentils and roasted vegetables",
      "Drizzle with tahini dressing and garnish with parsley"
    ],
    tags: ["High Protein", "Vegan", "Mediterranean"]
  },
  {
    name: "Protein-Packed Hummus Wrap",
    description: "Creamy hummus with fresh veggies wrapped in whole grain tortilla.",
    prepTime: "10 min",
    cookTime: "0 min",
    servings: 2,
    calories: 340,
    protein: 14,
    carbs: 48,
    fats: 11,
    ingredients: [
      "2 whole grain tortillas",
      "3/4 cup hummus",
      "1 cup mixed greens",
      "1 tomato, sliced",
      "1/2 cucumber, sliced",
      "1/4 cup shredded carrots",
      "1/4 cup sprouts",
      "Red onion slices"
    ],
    instructions: [
      "Spread hummus evenly on tortillas",
      "Layer greens, tomato, cucumber, and carrots",
      "Add sprouts and red onion",
      "Roll tightly and slice in half",
      "Serve immediately or wrap for later"
    ],
    tags: ["High Protein", "Quick", "Vegan"]
  },
  {
    name: "Tempeh Stir-Fry",
    description: "Protein-rich tempeh with colorful vegetables in savory sauce.",
    prepTime: "15 min",
    cookTime: "12 min",
    servings: 3,
    calories: 360,
    protein: 22,
    carbs: 38,
    fats: 14,
    ingredients: [
      "8 oz tempeh, cubed",
      "2 cups broccoli florets",
      "1 bell pepper, sliced",
      "1 cup snap peas",
      "3 tbsp soy sauce",
      "1 tbsp sesame oil",
      "2 cloves garlic, minced",
      "1 tsp ginger, grated"
    ],
    instructions: [
      "Steam tempeh for 5 minutes",
      "Heat sesame oil in wok over high heat",
      "Stir-fry tempeh until golden, remove",
      "Add vegetables and stir-fry for 5 minutes",
      "Add tempeh back with soy sauce, garlic, and ginger"
    ],
    tags: ["High Protein", "Vegan", "Quick"]
  },
  {
    name: "White Bean & Kale Soup",
    description: "Hearty, comforting soup loaded with protein and leafy greens.",
    prepTime: "10 min",
    cookTime: "25 min",
    servings: 4,
    calories: 290,
    protein: 15,
    carbs: 45,
    fats: 6,
    ingredients: [
      "2 cans white beans",
      "4 cups kale, chopped",
      "4 cups vegetable broth",
      "1 onion, diced",
      "3 cloves garlic, minced",
      "1 can diced tomatoes",
      "1 tsp thyme",
      "Bay leaf"
    ],
    instructions: [
      "Sauté onion and garlic until soft",
      "Add broth, tomatoes, and spices",
      "Bring to boil, then simmer for 15 minutes",
      "Add white beans and kale",
      "Cook until kale is tender, about 5 minutes"
    ],
    tags: ["High Protein", "Vegan", "Comfort Food"]
  },
  {
    name: "Peanut Butter Protein Smoothie Bowl",
    description: "Creamy, protein-rich smoothie bowl perfect for breakfast or post-workout.",
    prepTime: "8 min",
    cookTime: "0 min",
    servings: 1,
    calories: 480,
    protein: 24,
    carbs: 58,
    fats: 18,
    ingredients: [
      "1 frozen banana",
      "2 tbsp peanut butter",
      "1 scoop protein powder",
      "1 cup almond milk",
      "1 tbsp chia seeds",
      "Toppings: granola, berries, coconut flakes"
    ],
    instructions: [
      "Blend banana, peanut butter, protein powder, and milk until smooth",
      "Pour into bowl",
      "Top with chia seeds, granola, berries, and coconut",
      "Serve immediately"
    ],
    tags: ["High Protein", "Quick", "Breakfast"]
  },
  {
    name: "Spicy Black Bean Tacos",
    description: "Flavorful tacos with seasoned black beans and fresh toppings.",
    prepTime: "10 min",
    cookTime: "8 min",
    servings: 3,
    calories: 370,
    protein: 16,
    carbs: 62,
    fats: 8,
    ingredients: [
      "2 cans black beans",
      "6 corn tortillas",
      "1 tsp cumin",
      "1 tsp chili powder",
      "1 avocado, sliced",
      "1 cup lettuce, shredded",
      "Salsa and lime"
    ],
    instructions: [
      "Heat black beans with cumin and chili powder",
      "Warm tortillas in pan",
      "Fill tortillas with seasoned beans",
      "Top with avocado, lettuce, and salsa",
      "Squeeze lime juice over tacos"
    ],
    tags: ["High Protein", "Vegan", "Mexican"]
  },
  {
    name: "Chickpea Cauliflower Curry",
    description: "Creamy, spiced curry combining two protein-rich vegetables.",
    prepTime: "12 min",
    cookTime: "25 min",
    servings: 4,
    calories: 310,
    protein: 14,
    carbs: 44,
    fats: 10,
    ingredients: [
      "2 cans chickpeas",
      "1 head cauliflower, florets",
      "1 can coconut milk",
      "2 tbsp curry paste",
      "1 onion, diced",
      "2 cups spinach",
      "Fresh cilantro"
    ],
    instructions: [
      "Sauté onion until soft",
      "Add curry paste and cook for 1 minute",
      "Add cauliflower and chickpeas",
      "Pour in coconut milk and simmer 15 minutes",
      "Stir in spinach until wilted, garnish with cilantro"
    ],
    tags: ["High Protein", "Vegan", "Indian"]
  },
  {
    name: "Cottage Cheese Protein Pancakes",
    description: "Fluffy, protein-packed pancakes perfect for a nutritious breakfast.",
    prepTime: "10 min",
    cookTime: "15 min",
    servings: 2,
    calories: 380,
    protein: 28,
    carbs: 42,
    fats: 10,
    ingredients: [
      "1 cup cottage cheese",
      "3 eggs",
      "1/2 cup oat flour",
      "1 tsp vanilla extract",
      "1 tsp baking powder",
      "Pinch of cinnamon",
      "Fresh berries for topping"
    ],
    instructions: [
      "Blend cottage cheese, eggs, and vanilla",
      "Mix in oat flour, baking powder, and cinnamon",
      "Heat griddle over medium heat",
      "Pour batter and cook until bubbles form",
      "Flip and cook until golden, serve with berries"
    ],
    tags: ["High Protein", "Vegetarian", "Breakfast"]
  },
  {
    name: "Seitan Veggie Stir-Fry",
    description: "High-protein seitan with colorful vegetables in Asian-inspired sauce.",
    prepTime: "15 min",
    cookTime: "10 min",
    servings: 3,
    calories: 340,
    protein: 26,
    carbs: 32,
    fats: 11,
    ingredients: [
      "8 oz seitan, sliced",
      "2 cups mixed vegetables",
      "3 tbsp teriyaki sauce",
      "1 tbsp sesame oil",
      "2 cloves garlic",
      "Green onions for garnish",
      "Sesame seeds"
    ],
    instructions: [
      "Heat sesame oil in wok",
      "Stir-fry seitan until browned",
      "Add vegetables and garlic",
      "Cook for 5 minutes",
      "Add teriyaki sauce and garnish"
    ],
    tags: ["High Protein", "Vegan", "Asian"]
  },
  {
    name: "Greek Yogurt Parfait",
    description: "Layered parfait with protein-rich Greek yogurt, nuts, and berries.",
    prepTime: "5 min",
    cookTime: "0 min",
    servings: 2,
    calories: 320,
    protein: 20,
    carbs: 36,
    fats: 10,
    ingredients: [
      "2 cups Greek yogurt",
      "1/2 cup granola",
      "1 cup mixed berries",
      "2 tbsp honey",
      "1/4 cup almonds, sliced",
      "1 tbsp chia seeds"
    ],
    instructions: [
      "Layer Greek yogurt in glasses",
      "Add granola and berries",
      "Drizzle with honey",
      "Top with almonds and chia seeds",
      "Serve immediately"
    ],
    tags: ["High Protein", "Quick", "Breakfast"]
  },
  {
    name: "Lentil Bolognese",
    description: "Hearty, protein-rich plant-based take on classic Italian sauce.",
    prepTime: "10 min",
    cookTime: "30 min",
    servings: 4,
    calories: 410,
    protein: 18,
    carbs: 64,
    fats: 8,
    ingredients: [
      "1.5 cups brown lentils",
      "1 can crushed tomatoes",
      "1 onion, diced",
      "2 carrots, diced",
      "2 celery stalks, diced",
      "3 cloves garlic",
      "Italian herbs",
      "Whole wheat pasta"
    ],
    instructions: [
      "Sauté onion, carrots, and celery",
      "Add garlic and cook 1 minute",
      "Add lentils, tomatoes, and herbs",
      "Simmer for 25 minutes",
      "Serve over cooked pasta"
    ],
    tags: ["High Protein", "Vegan", "Italian"]
  },
  {
    name: "Protein-Packed Chia Pudding",
    description: "Overnight chia pudding loaded with omega-3s and protein.",
    prepTime: "5 min",
    cookTime: "0 min",
    servings: 2,
    calories: 280,
    protein: 12,
    carbs: 32,
    fats: 14,
    ingredients: [
      "1/2 cup chia seeds",
      "2 cups almond milk",
      "2 tbsp protein powder",
      "1 tbsp maple syrup",
      "1 tsp vanilla extract",
      "Fresh fruit for topping"
    ],
    instructions: [
      "Mix chia seeds, almond milk, protein powder, maple syrup, and vanilla",
      "Refrigerate overnight or at least 4 hours",
      "Stir before serving",
      "Top with fresh fruit",
      "Enjoy cold"
    ],
    tags: ["High Protein", "Make-Ahead", "Breakfast"]
  },
  {
    name: "Stuffed Bell Peppers with Quinoa",
    description: "Colorful bell peppers stuffed with protein-rich quinoa mixture.",
    prepTime: "15 min",
    cookTime: "35 min",
    servings: 4,
    calories: 340,
    protein: 14,
    carbs: 52,
    fats: 9,
    ingredients: [
      "4 bell peppers, halved",
      "1.5 cups quinoa, cooked",
      "1 can black beans",
      "1 cup corn",
      "1 cup salsa",
      "1 cup cheese (optional)",
      "Cumin and chili powder"
    ],
    instructions: [
      "Preheat oven to 375°F",
      "Mix quinoa, beans, corn, salsa, and spices",
      "Fill pepper halves with mixture",
      "Top with cheese if using",
      "Bake for 30 minutes until peppers are tender"
    ],
    tags: ["High Protein", "Gluten-Free", "Vegetarian"]
  },
  {
    name: "Spinach & Artichoke Protein Bowl",
    description: "Creamy, protein-rich bowl inspired by the classic dip.",
    prepTime: "10 min",
    cookTime: "15 min",
    servings: 3,
    calories: 360,
    protein: 19,
    carbs: 38,
    fats: 15,
    ingredients: [
      "3 cups spinach",
      "1 can artichoke hearts",
      "1 cup white beans",
      "1/2 cup Greek yogurt",
      "1/4 cup parmesan",
      "2 cloves garlic",
      "Brown rice for serving"
    ],
    instructions: [
      "Sauté garlic until fragrant",
      "Add spinach and cook until wilted",
      "Add artichokes and white beans",
      "Stir in Greek yogurt and parmesan",
      "Serve over brown rice"
    ],
    tags: ["High Protein", "Vegetarian", "Comfort Food"]
  },
  {
    name: "TVP (Textured Vegetable Protein) Tacos",
    description: "Plant-based protein taco filling that rivals traditional meat.",
    prepTime: "10 min",
    cookTime: "15 min",
    servings: 4,
    calories: 320,
    protein: 22,
    carbs: 44,
    fats: 7,
    ingredients: [
      "1.5 cups TVP (dry)",
      "1.5 cups vegetable broth",
      "2 tbsp taco seasoning",
      "8 taco shells",
      "Lettuce, tomatoes, salsa",
      "1 avocado",
      "Lime wedges"
    ],
    instructions: [
      "Rehydrate TVP in hot vegetable broth for 10 minutes",
      "Drain excess liquid and add taco seasoning",
      "Cook in pan for 5 minutes",
      "Fill taco shells with TVP mixture",
      "Top with fresh vegetables and avocado"
    ],
    tags: ["High Protein", "Vegan", "Mexican"]
  }
];

// Recipe Card Component
function RecipeCard({ recipe, index }: { recipe: Recipe; index: number }) {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.4 + index * 0.05, duration: 0.4 }}
    >
      <Card className="bg-slate-800/40 border border-slate-700/40 shadow-lg hover:bg-slate-800/60 transition-all duration-200 overflow-hidden">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <CardTitle className="text-white text-base mb-1">{recipe.name}</CardTitle>
              <p className="text-white/60 text-xs line-clamp-2">{recipe.description}</p>
            </div>
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30 ml-2">
              {recipe.protein}g protein
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* Nutrition Info */}
          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="bg-white/5 rounded-lg p-2">
              <p className="text-orange-400 text-xs">Cal</p>
              <p className="text-white font-medium text-sm">{recipe.calories}</p>
            </div>
            <div className="bg-white/5 rounded-lg p-2">
              <p className="text-blue-400 text-xs">Protein</p>
              <p className="text-white font-medium text-sm">{recipe.protein}g</p>
            </div>
            <div className="bg-white/5 rounded-lg p-2">
              <p className="text-emerald-400 text-xs">Carbs</p>
              <p className="text-white font-medium text-sm">{recipe.carbs}g</p>
            </div>
            <div className="bg-white/5 rounded-lg p-2">
              <p className="text-amber-400 text-xs">Fats</p>
              <p className="text-white font-medium text-sm">{recipe.fats}g</p>
            </div>
          </div>

          {/* Time & Servings */}
          <div className="flex items-center gap-3 text-xs text-white/60">
            <span>⏱️ {recipe.prepTime} + {recipe.cookTime}</span>
            <span>•</span>
            <span>🍽️ {recipe.servings} servings</span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {recipe.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="bg-purple-500/10 text-purple-400 border-purple-500/20 text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Expandable Details */}
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-3 pt-3 border-t border-white/10"
            >
              <div>
                <h4 className="text-white/90 font-medium text-sm mb-2">Ingredients:</h4>
                <ul className="text-white/70 text-xs space-y-1 list-disc list-inside">
                  {recipe.ingredients.map((ingredient, i) => (
                    <li key={i}>{ingredient}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-white/90 font-medium text-sm mb-2">Instructions:</h4>
                <ol className="text-white/70 text-xs space-y-1 list-decimal list-inside">
                  {recipe.instructions.map((instruction, i) => (
                    <li key={i}>{instruction}</li>
                  ))}
                </ol>
              </div>
            </motion.div>
          )}

          {/* View Recipe Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full text-green-400 hover:text-green-300 hover:bg-green-500/10"
          >
            {isExpanded ? "Hide Details" : "View Recipe"}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function Dashboard({ onScanFood, onViewProfile, onViewFoodLog }: DashboardProps) {
  // Get user data from localStorage
  const storedUser = getUserData();
  const todaysNutrition = getTodaysNutrition();
  
  // Construct userData object
  const userData = {
    name: storedUser?.name || "User",
    dailyCalories: { 
      current: todaysNutrition.calories, 
      target: storedUser?.dailyCalories || 2200 
    },
    water: { current: 0, target: 8 },
    streak: 7,
    level: "Nutrition Explorer"
  };

  const nutrients: NutrientData[] = [
    { 
      name: "Protein", 
      current: getTodaysNutrition().protein, 
      target: 120, 
      color: "text-blue-400",
      gradientFrom: "#60a5fa",
      gradientTo: "#3b82f6",
      icon: Zap,
      unit: "g"
    },
    { 
      name: "Carbs", 
      current: getTodaysNutrition().carbs, 
      target: 250, 
      color: "text-emerald-400",
      gradientFrom: "#34d399",
      gradientTo: "#10b981",
      icon: Apple,
      unit: "g"
    },
    { 
      name: "Fats", 
      current: getTodaysNutrition().fats, 
      target: 80, 
      color: "text-amber-400",
      gradientFrom: "#fbbf24",
      gradientTo: "#f59e0b",
      icon: Droplets,
      unit: "g"
    },
    { 
      name: "Fiber", 
      current: getTodaysNutrition().fiber, 
      target: 25, 
      color: "text-purple-400",
      gradientFrom: "#a78bfa",
      gradientTo: "#8b5cf6",
      icon: Shield,
      unit: "g"
    },
  ];

  const CircularProgress = ({ nutrient, size = 110 }: { nutrient: NutrientData, size?: number }) => {
    const percentage = Math.min((nutrient.current / nutrient.target) * 100, 100);
    const circumference = 2 * Math.PI * 40;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <motion.div 
        className="relative flex flex-col items-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, type: "spring" }}
      >
        <div className="relative" style={{ width: size, height: size }}>
          <svg className="transform -rotate-90" width={size} height={size}>
            {/* Background circle */}
            <circle
              cx={size/2}
              cy={size/2}
              r="40"
              stroke="currentColor"
              strokeWidth="6"
              fill="transparent"
              className="text-white/10"
            />
            {/* Progress circle */}
            <motion.circle
              cx={size/2}
              cy={size/2}
              r="40"
              stroke={`url(#gradient-${nutrient.name})`}
              strokeWidth="6"
              fill="transparent"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
              className="drop-shadow-sm"
            />
            <defs>
              <linearGradient id={`gradient-${nutrient.name}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={nutrient.gradientFrom} />
                <stop offset="100%" stopColor={nutrient.gradientTo} />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8, type: "spring" }}
              className="flex flex-col items-center"
            >
              <nutrient.icon className={`w-5 h-5 ${nutrient.color} mb-1`} />
              <span className="text-white/90 font-medium text-sm">{Math.round(percentage)}%</span>
            </motion.div>
          </div>
        </div>
        
        <div className="text-center mt-3">
          <p className="text-white/90 text-sm font-medium">{nutrient.name}</p>
          <p className="text-white/60 text-xs">
            {nutrient.current}{nutrient.unit} / {nutrient.target}{nutrient.unit}
          </p>
        </div>
      </motion.div>
    );
  };

  const MainCalorieRing = () => {
    const percentage = (userData.dailyCalories.current / userData.dailyCalories.target) * 100;
    const circumference = 2 * Math.PI * 85;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className="relative flex items-center justify-center">
        <svg className="transform -rotate-90" width="220" height="220">
          {/* Background circle */}
          <circle
            cx="110"
            cy="110"
            r="85"
            stroke="currentColor"
            strokeWidth="14"
            fill="transparent"
            className="text-white/10"
          />
          {/* Progress circle with gradient */}
          <motion.circle
            cx="110"
            cy="110"
            r="85"
            stroke="url(#mainCalorieGradient)"
            strokeWidth="14"
            fill="transparent"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="drop-shadow-sm"
          />
          <defs>
            <linearGradient id="mainCalorieGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22c55e" />
              <stop offset="50%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="text-center"
          >
            <div className="flex items-center justify-center mb-2">
              <Flame className="w-6 h-6 text-orange-400 mr-2" />
              <span className="text-3xl font-bold text-white">{userData.dailyCalories.current}</span>
            </div>
            <p className="text-white/70 text-sm">of {userData.dailyCalories.target} kcal</p>
            <p className="text-green-400 text-xs mt-1 font-medium">
              {userData.dailyCalories.target - userData.dailyCalories.current} remaining
            </p>
          </motion.div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background overlay - simplified */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-purple-900/90 to-slate-900/95" />

      <div className="relative z-10 p-4">
        {/* Header */}
        <motion.div 
          className="flex justify-between items-center mb-6 pt-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">
              Good evening, {userData.name}! 🌙
            </h1>
            <p className="text-white/70">Let's track your nutrition journey</p>
            <div className="flex items-center gap-4 mt-2">
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                <Trophy className="w-3 h-3 mr-1" />
                {userData.streak} day streak
              </Badge>
              <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                <Target className="w-3 h-3 mr-1" />
                {userData.level}
              </Badge>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onViewProfile}
            className="text-white/80 hover:text-white hover:bg-white/10 border border-white/20"
          >
            <Settings className="w-4 h-4 mr-1" />
            Profile
          </Button>
        </motion.div>

        {/* Main Calorie Ring */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="mb-6 bg-slate-800/50 border border-slate-700/50 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-center mb-6">
                <MainCalorieRing />
              </div>

              {/* Scan Food Button */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="flex justify-center"
              >
                <Button 
                  onClick={onScanFood}
                  size="lg"
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-full px-8 py-4 shadow-xl text-white font-semibold transform hover:scale-105 transition-all duration-200 border-0"
                >
                  <Camera className="w-5 h-5 mr-2" />
                  Scan Food
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Nutrients Grid */}
        <motion.div 
          className="grid grid-cols-2 gap-4 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          {nutrients.map((nutrient, index) => (
            <motion.div
              key={nutrient.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.4 + index * 0.1, duration: 0.5 }}
            >
              <Card className="bg-slate-800/40 border border-slate-700/40 shadow-lg hover:bg-slate-800/60 transition-all duration-200">
                <CardContent className="p-4 flex justify-center">
                  <CircularProgress nutrient={nutrient} />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Water Tracker */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.6 }}
        >
          <Card className="mb-6 bg-slate-800/40 border border-slate-700/40 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2 text-white">
                <div className="p-2 rounded-full bg-blue-500/20">
                  <Droplets className="w-5 h-5 text-blue-400" />
                </div>
                Water Intake
                <Heart className="w-4 h-4 text-red-400 ml-auto" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-3">
                <span className="text-white/70 text-sm">
                  {userData.water.current} / {userData.water.target} glasses
                </span>
                <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                  {Math.round((userData.water.current / userData.water.target) * 100)}%
                </Badge>
              </div>
              <div className="relative">
                <Progress 
                  value={(userData.water.current / userData.water.target) * 100} 
                  className="h-3 bg-white/10"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/60 to-cyan-500/60 rounded-full"
                     style={{ width: `${(userData.water.current / userData.water.target) * 100}%` }}
                />
              </div>
              <div className="flex justify-center mt-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="bg-blue-500/10 border-blue-500/30 text-blue-400 hover:bg-blue-500/20"
                >
                  <Plus className="w-3 h-3 mr-1" />
                  Add Glass
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div 
          className="grid grid-cols-2 gap-4 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.6 }}
        >
          <Button 
            variant="outline" 
            onClick={onViewFoodLog}
            className="h-14 bg-slate-800/40 border border-slate-700/40 shadow-lg text-white hover:bg-slate-800/60 transition-all duration-200"
          >
            <ChefHat className="w-5 h-5 mr-2 text-orange-400" />
            Food Log
          </Button>
          <Button 
            variant="outline" 
            className="h-14 bg-slate-800/40 border border-slate-700/40 shadow-lg text-white hover:bg-slate-800/60 transition-all duration-200"
          >
            <BarChart3 className="w-5 h-5 mr-2 text-purple-400" />
            Analytics
          </Button>
        </motion.div>

        {/* Healthy Vegetarian Recipes Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.6 }}
          className="mb-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <ChefHat className="w-6 h-6 text-green-400" />
            <h2 className="text-xl font-bold text-white">Healthy Protein-Rich Recipes</h2>
          </div>
          <p className="text-white/70 text-sm mb-4">
            Delicious vegetarian recipes packed with protein to help you reach your nutrition goals
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recipes.map((recipe, index) => (
              <RecipeCard key={recipe.name} recipe={recipe} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}