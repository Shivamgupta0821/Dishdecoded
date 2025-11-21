// import { useState, useRef } from "react";
// import { motion, AnimatePresence } from "motion/react";
// import { Button } from "./ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
// import { Badge } from "./ui/badge";
// import { Camera, X, Check, RotateCcw, Sparkles, Zap, Brain, Target, Flame } from "lucide-react";
// import { saveFoodEntry } from "../utils/userDataManager";

// interface FoodResult {
//   name: string;
//   calories: number;
//   protein: number;
//   carbs: number;
//   fats: number;
//   fiber: number;
//   confidence: number;
// }

// interface FoodScannerProps {
//   onClose: () => void;
//   onSaveFood: (food: FoodResult) => void;
// }

// export function FoodScanner({ onClose, onSaveFood }: FoodScannerProps) {
//   const [isScanning, setIsScanning] = useState(false);
//   const [result, setResult] = useState<FoodResult | null>(null);
//   const [capturedImage, setCapturedImage] = useState<string | null>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   // Mock food results for demonstration
//   // const mockResults: FoodResult[] = [
//   //   { name: "Grilled Chicken Breast", calories: 165, protein: 31, carbs: 0, fats: 3.6, fiber: 0, confidence: 95 },
//   //   { name: "Caesar Salad", calories: 470, protein: 37, carbs: 7, fats: 40, fiber: 4, confidence: 88 },
//   //   { name: "Salmon Fillet", calories: 206, protein: 22, carbs: 0, fats: 12, fiber: 0, confidence: 92 },
//   //   { name: "Avocado Toast", calories: 195, protein: 6, carbs: 16, fats: 15, fiber: 7, confidence: 87 },
//   //   { name: "Greek Yogurt with Berries", calories: 150, protein: 20, carbs: 16, fats: 3, fiber: 3, confidence: 91 }
//   // ];

//   const handleCapture = () => {
//     if (fileInputRef.current) {
//       fileInputRef.current.click();
//     }
//   };

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       setIsScanning(true);
      
//       // Create preview
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         setCapturedImage(e.target?.result as string);
//       };
//       reader.readAsDataURL(file);

//       // Simulate AI processing
//       // setTimeout(() => {
//       //   const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)];
//       //   setResult(randomResult);
//       //   setIsScanning(false);
//       // }, 3000);
//     }
//   };

//   const handleSave = () => {
//     if (result && capturedImage) {
//       onSaveFood(result);
//       // Save food entry with image to localStorage
//       saveFoodEntry({
//         name: result.name,
//         calories: result.calories,
//         protein: result.protein,
//         carbs: result.carbs,
//         fats: result.fats,
//         fiber: result.fiber,
//         image: capturedImage
//       });
//       onClose();
//     }
//   };

//   const handleRetry = () => {
//     setResult(null);
//     setCapturedImage(null);
//     setIsScanning(false);
//   };

//   const NutrientBar = ({ 
//     label, 
//     value, 
//     unit, 
//     color, 
//     icon: Icon, 
//     gradient 
//   }: { 
//     label: string; 
//     value: number; 
//     unit: string; 
//     color: string; 
//     icon: any;
//     gradient: string;
//   }) => (
//     <motion.div 
//       initial={{ opacity: 0, x: -20 }}
//       animate={{ opacity: 1, x: 0 }}
//       className="flex justify-between items-center p-4 bg-slate-800/40 rounded-xl border border-slate-700/40"
//     >
//       <div className="flex items-center gap-3">
//         <div className={`p-2 rounded-lg bg-gradient-to-r ${gradient}`}>
//           <Icon className={`w-4 h-4 text-white`} />
//         </div>
//         <span className="text-white/90 font-medium">{label}</span>
//       </div>
//       <div className="flex items-center gap-2">
//         <span className="text-white font-semibold">{value}{unit}</span>
//       </div>
//     </motion.div>
//   );

//   return (
//     <div className="fixed inset-0 bg-slate-900/95 backdrop-blur-sm flex items-center justify-center p-4 z-50">
//       <motion.div
//         initial={{ opacity: 0, scale: 0.9, y: 20 }}
//         animate={{ opacity: 1, scale: 1, y: 0 }}
//         exit={{ opacity: 0, scale: 0.9, y: 20 }}
//         className="w-full max-w-md"
//       >
//         <Card className="bg-slate-800/50 border border-slate-700/50 shadow-2xl">
//           <CardHeader className="flex flex-row items-center justify-between border-b border-white/10">
//             <CardTitle className="flex items-center gap-3 text-white">
//               <div className="p-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600">
//                 <Camera className="w-5 h-5 text-white" />
//               </div>
//               AI Food Scanner
//             </CardTitle>
//             <Button 
//               variant="ghost" 
//               size="sm" 
//               onClick={onClose}
//               className="text-white/60 hover:text-white hover:bg-white/10 rounded-full"
//             >
//               <X className="w-5 h-5" />
//             </Button>
//           </CardHeader>
          
//           <CardContent className="space-y-6 p-6">
//             <input
//               ref={fileInputRef}
//               type="file"
//               accept="image/*"
//               capture="environment"
//               onChange={handleFileChange}
//               className="hidden"
//             />

//             <AnimatePresence mode="wait">
//               {!capturedImage && !isScanning && !result && (
//                 <motion.div
//                   key="capture"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -20 }}
//                   className="text-center space-y-6"
//                 >
//                   <motion.div 
//                     className="w-40 h-40 mx-auto relative"
//                     whileHover={{ scale: 1.05 }}
//                     transition={{ type: "spring", stiffness: 300 }}
//                   >
//                     <div className="w-full h-full bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-full flex items-center justify-center border border-white/20 relative overflow-hidden">
//                       {/* Animated background circles */}
//                       <motion.div
//                         animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
//                         transition={{ duration: 3, repeat: Infinity }}
//                         className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 rounded-full"
//                       />
//                       <Camera className="w-20 h-20 text-green-400 relative z-10" />
//                     </div>
//                   </motion.div>
                  
//                   <div className="space-y-3">
//                     <h3 className="text-xl font-bold text-white">Capture Your Food</h3>
//                     <p className="text-white/70 text-sm leading-relaxed">
//                       Point your camera at any dish and our AI will instantly analyze its nutritional content
//                     </p>
                    
//                     <div className="flex justify-center gap-4 text-xs text-white/50">
//                       <div className="flex items-center gap-1">
//                         <Brain className="w-3 h-3" />
//                         AI-Powered
//                       </div>
//                       <div className="flex items-center gap-1">
//                         <Zap className="w-3 h-3" />
//                         Instant Results
//                       </div>
//                       <div className="flex items-center gap-1">
//                         <Target className="w-3 h-3" />
//                         95% Accuracy
//                       </div>
//                     </div>
//                   </div>
                  
//                   <Button 
//                     onClick={handleCapture}
//                     className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-4 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
//                   >
//                     <Camera className="w-5 h-5 mr-2" />
//                     Start Scanning
//                   </Button>
//                 </motion.div>
//               )}

//               {isScanning && (
//                 <motion.div
//                   key="scanning"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                   className="text-center space-y-6"
//                 >
//                   {capturedImage && (
//                     <div className="relative rounded-xl overflow-hidden">
//                       <img 
//                         src={capturedImage} 
//                         alt="Captured food" 
//                         className="w-full h-48 object-cover"
//                       />
//                       <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-slate-900/40 flex items-center justify-center">
//                         <motion.div className="text-center">
//                           <motion.div
//                             animate={{ rotate: 360 }}
//                             transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
//                             className="w-16 h-16 mx-auto mb-4 border-4 border-green-400 border-t-transparent rounded-full"
//                           />
//                           <div className="flex items-center justify-center gap-2 text-white">
//                             <Sparkles className="w-5 h-5 text-green-400" />
//                             <span className="font-medium">AI Analysis in Progress</span>
//                           </div>
//                         </motion.div>
//                       </div>
//                     </div>
//                   )}
                  
//                   <div className="space-y-3">
//                     <motion.div
//                       initial={{ scale: 0 }}
//                       animate={{ scale: 1 }}
//                       transition={{ delay: 0.5, type: "spring" }}
//                       className="flex justify-center"
//                     >
//                       <div className="p-3 rounded-full bg-green-500/20 border border-green-500/30">
//                         <Brain className="w-6 h-6 text-green-400" />
//                       </div>
//                     </motion.div>
                    
//                     <h3 className="text-white font-semibold">Analyzing Food...</h3>
//                     <div className="text-sm text-white/60 space-y-1">
//                       <motion.p
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         transition={{ delay: 0.5 }}
//                       >
//                         🔍 Identifying ingredients...
//                       </motion.p>
//                       <motion.p
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         transition={{ delay: 1.5 }}
//                       >
//                         📊 Calculating nutrition facts...
//                       </motion.p>
//                       <motion.p
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         transition={{ delay: 2.5 }}
//                       >
//                         ✨ Finalizing results...
//                       </motion.p>
//                     </div>
//                   </div>
//                 </motion.div>
//               )}

//               {result && (
//                 <motion.div
//                   key="result"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -20 }}
//                   className="space-y-6"
//                 >
//                   {capturedImage && (
//                     <div className="relative rounded-xl overflow-hidden">
//                       <img 
//                         src={capturedImage} 
//                         alt="Analyzed food" 
//                         className="w-full h-32 object-cover"
//                       />
//                       <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
//                     </div>
//                   )}
                  
//                   <div className="text-center space-y-3">
//                     <div className="flex items-center justify-center gap-3">
//                       <h3 className="text-xl font-bold text-white">{result.name}</h3>
//                       <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
//                         <Zap className="w-3 h-3 mr-1" />
//                         {result.confidence}% match
//                       </Badge>
//                     </div>
                    
//                     <motion.div 
//                       initial={{ scale: 0 }}
//                       animate={{ scale: 1 }}
//                       transition={{ type: "spring", delay: 0.2 }}
//                       className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full border border-orange-500/30"
//                     >
//                       <Flame className="w-5 h-5 text-orange-400" />
//                       <span className="text-2xl font-bold text-orange-400">{result.calories}</span>
//                       <span className="text-orange-400/80 text-sm">kcal</span>
//                     </motion.div>
//                   </div>

//                   <div className="space-y-3">
//                     <NutrientBar 
//                       label="Protein" 
//                       value={result.protein} 
//                       unit="g" 
//                       color="text-blue-400" 
//                       icon={Zap}
//                       gradient="from-blue-500 to-blue-600"
//                     />
//                     <NutrientBar 
//                       label="Carbs" 
//                       value={result.carbs} 
//                       unit="g" 
//                       color="text-emerald-400" 
//                       icon={Camera}
//                       gradient="from-emerald-500 to-green-600"
//                     />
//                     <NutrientBar 
//                       label="Fats" 
//                       value={result.fats} 
//                       unit="g" 
//                       color="text-yellow-400" 
//                       icon={Target}
//                       gradient="from-yellow-500 to-amber-600"
//                     />
//                     <NutrientBar 
//                       label="Fiber" 
//                       value={result.fiber} 
//                       unit="g" 
//                       color="text-purple-400" 
//                       icon={Sparkles}
//                       gradient="from-purple-500 to-purple-600"
//                     />
//                   </div>

//                   <div className="flex gap-3">
//                     <Button 
//                       variant="outline" 
//                       onClick={handleRetry}
//                       className="flex-1 bg-white/5 border-white/20 text-white/80 hover:bg-white/10 hover:text-white"
//                     >
//                       <RotateCcw className="w-4 h-4 mr-2" />
//                       Rescan
//                     </Button>
//                     <Button 
//                       onClick={handleSave}
//                       className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold shadow-lg"
//                     >
//                       <Check className="w-4 h-4 mr-2" />
//                       Add to Log
//                     </Button>
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </CardContent>
//         </Card>
//       </motion.div>
//     </div>
//   );
// }





// import { useState, useRef } from "react";
// import { motion, AnimatePresence } from "motion/react";
// import { Button } from "./ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
// import { Badge } from "./ui/badge";
// import { Camera, X, Check, RotateCcw, Sparkles, Zap, Brain, Target, Flame } from "lucide-react";
// import { saveFoodEntry } from "../utils/userDataManager";

// interface FoodResult {
//   name: string;
//   calories: number;
//   protein: number;
//   carbs: number;
//   fats: number;
//   fiber: number;
//   confidence: number;
// }

// interface FoodScannerProps {
//   onClose: () => void;
//   onSaveFood: (food: FoodResult) => void;
// }

// export function FoodScanner({ onClose, onSaveFood }: FoodScannerProps) {
//   const [isScanning, setIsScanning] = useState(false);
//   const [result, setResult] = useState<FoodResult | null>(null);
//   const [capturedImage, setCapturedImage] = useState<string | null>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const handleCapture = () => {
//     if (fileInputRef.current) {
//       fileInputRef.current.value = ""; // reset for rescan
//       fileInputRef.current.click();
//     }
//   };

//   const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       setIsScanning(true);

//       // Create image preview for UI
//       const reader = new FileReader();
//       reader.onload = (e) => setCapturedImage(e.target?.result as string);
//       reader.readAsDataURL(file);

//       // Actual POST to Flask ML API backend
//       try {
//         const formData = new FormData();
//         formData.append('image', file);
//         const response = await fetch("http://127.0.0.1:5000/predict", {
//           method: "POST",
//           body: formData,
//         });
//         if (!response.ok) throw new Error("Prediction failed");
//         const data = await response.json();

//         // Map backend's nutrition keys to our local state
//         setResult({
//           name: data.food,
//           calories: Number(data.nutrition.calories) || 0,
//           protein: Number(data.nutrition["protein(g)"]) || 0,
//           carbs: Number(data.nutrition["carbs(g)"]) || 0,
//           fats: Number(data.nutrition["fats(g)"]) || 0,
//           fiber: Number(data.nutrition["fibre(g)"]) || 0,
//           confidence: Math.round(Number(data.confidence) * 100),
//         });
//       } catch (err) {
//         alert("AI Prediction failed. Check backend server and image file!");
//         setResult(null);
//       }
//       setIsScanning(false);
//     }
//   };

//   const handleSave = () => {
//     if (result && capturedImage) {
//       onSaveFood(result);
//       saveFoodEntry({
//         name: result.name,
//         calories: result.calories,
//         protein: result.protein,
//         carbs: result.carbs,
//         fats: result.fats,
//         fiber: result.fiber,
//         image: capturedImage,
//       });
//       onClose();
//     }
//   };

//   const handleRetry = () => {
//     setResult(null);
//     setCapturedImage(null);
//     setIsScanning(false);
//   };

//   const NutrientBar = ({
//     label,
//     value,
//     unit,
//     color,
//     icon: Icon,
//     gradient,
//   }: {
//     label: string;
//     value: number;
//     unit: string;
//     color: string;
//     icon: any;
//     gradient: string;
//   }) => (
//     <motion.div
//       initial={{ opacity: 0, x: -20 }}
//       animate={{ opacity: 1, x: 0 }}
//       className="flex justify-between items-center p-4 bg-slate-800/40 rounded-xl border border-slate-700/40"
//     >
//       <div className="flex items-center gap-3">
//         <div className={`p-2 rounded-lg bg-gradient-to-r ${gradient}`}>
//           <Icon className={`w-4 h-4 text-white`} />
//         </div>
//         <span className="text-white/90 font-medium">{label}</span>
//       </div>
//       <div className="flex items-center gap-2">
//         <span className="text-white font-semibold">{value}{unit}</span>
//       </div>
//     </motion.div>
//   );

//   return (
//     <div className="fixed inset-0 bg-slate-900/95 backdrop-blur-sm flex items-center justify-center p-4 z-50">
//       <motion.div
//         initial={{ opacity: 0, scale: 0.9, y: 20 }}
//         animate={{ opacity: 1, scale: 1, y: 0 }}
//         exit={{ opacity: 0, scale: 0.9, y: 20 }}
//         className="w-full max-w-md"
//       >
//         <Card className="bg-slate-800/50 border border-slate-700/50 shadow-2xl">
//           <CardHeader className="flex flex-row items-center justify-between border-b border-white/10">
//             <CardTitle className="flex items-center gap-3 text-white">
//               <div className="p-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600">
//                 <Camera className="w-5 h-5 text-white" />
//               </div>
//               AI Food Scanner
//             </CardTitle>
//             <Button
//               variant="ghost"
//               size="sm"
//               onClick={onClose}
//               className="text-white/60 hover:text-white hover:bg-white/10 rounded-full"
//             >
//               <X className="w-5 h-5" />
//             </Button>
//           </CardHeader>

//           <CardContent className="space-y-6 p-6">
//             <input
//               ref={fileInputRef}
//               type="file"
//               accept="image/*"
//               capture="environment"
//               onChange={handleFileChange}
//               className="hidden"
//             />

//             <AnimatePresence mode="wait">
//               {!capturedImage && !isScanning && !result && (
//                 <motion.div
//                   key="capture"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -20 }}
//                   className="text-center space-y-6"
//                 >
//                   {/* Your camera capture UI goes here */}
//                   <Button
//                     onClick={handleCapture}
//                     className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-4 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
//                   >
//                     <Camera className="w-5 h-5 mr-2" />
//                     Start Scanning
//                   </Button>
//                 </motion.div>
//               )}

//               {isScanning && (
//                 <motion.div
//                   key="scanning"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                   className="text-center space-y-6"
//                 >
//                   {/* Loading spinner and preview */}
//                 </motion.div>
//               )}

//               {result && (
//                 <motion.div
//                   key="result"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -20 }}
//                   className="space-y-6"
//                 >
//                   {capturedImage && (
//                     <div className="relative rounded-xl overflow-hidden">
//                       <img
//                         src={capturedImage}
//                         alt="Analyzed food"
//                         className="w-full h-32 object-cover"
//                       />
//                       <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
//                     </div>
//                   )}

//                   <div className="text-center space-y-3">
//                     <div className="flex items-center justify-center gap-3">
//                       <h3 className="text-xl font-bold text-white">{result.name}</h3>
//                       <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
//                         <Zap className="w-3 h-3 mr-1" />
//                         {result.confidence}% match
//                       </Badge>
//                     </div>

//                     <motion.div
//                       initial={{ scale: 0 }}
//                       animate={{ scale: 1 }}
//                       transition={{ type: "spring", delay: 0.2 }}
//                       className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full border border-orange-500/30"
//                     >
//                       <Flame className="w-5 h-5 text-orange-400" />
//                       <span className="text-2xl font-bold text-orange-400">{result.calories}</span>
//                       <span className="text-orange-400/80 text-sm">kcal</span>
//                     </motion.div>
//                   </div>

//                   <div className="space-y-3">
//                     <NutrientBar
//                       label="Protein"
//                       value={result.protein}
//                       unit="g"
//                       color="text-blue-400"
//                       icon={Zap}
//                       gradient="from-blue-500 to-blue-600"
//                     />
//                     <NutrientBar
//                       label="Carbs"
//                       value={result.carbs}
//                       unit="g"
//                       color="text-emerald-400"
//                       icon={Camera}
//                       gradient="from-emerald-500 to-green-600"
//                     />
//                     <NutrientBar
//                       label="Fats"
//                       value={result.fats}
//                       unit="g"
//                       color="text-yellow-400"
//                       icon={Target}
//                       gradient="from-yellow-500 to-amber-600"
//                     />
//                     <NutrientBar
//                       label="Fiber"
//                       value={result.fiber}
//                       unit="g"
//                       color="text-purple-400"
//                       icon={Sparkles}
//                       gradient="from-purple-500 to-purple-600"
//                     />
//                   </div>

//                   <div className="flex gap-3">
//                     <Button
//                       variant="outline"
//                       onClick={handleRetry}
//                       className="flex-1 bg-white/5 border-white/20 text-white/80 hover:bg-white/10 hover:text-white"
//                     >
//                       <RotateCcw className="w-4 h-4 mr-2" />
//                       Rescan
//                     </Button>
//                     <Button
//                       onClick={handleSave}
//                       className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold shadow-lg"
//                     >
//                       <Check className="w-4 h-4 mr-2" />
//                       Add to Log
//                     </Button>
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </CardContent>
//         </Card>
//       </motion.div>
//     </div>
//   );
// }


import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Camera, X, Check, RotateCcw, Sparkles, Zap, Brain, Target, Flame } from "lucide-react";
import { saveFoodEntry } from "../utils/userDataManager";


interface FoodResult {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  fiber: number;
  confidence: number;
}

interface FoodScannerProps {
  onClose: () => void;
  onSaveFood: (food: FoodResult) => void;
}

export function FoodScanner({ onClose, onSaveFood }: FoodScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<FoodResult | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCapture = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // reset for new image
      fileInputRef.current.click();
    }
  };
  
  const baseUrl = import.meta.env.VITE_API_URL;

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsScanning(true);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => setCapturedImage(e.target?.result as string);
      reader.readAsDataURL(file);

      // Real ML backend fetch
      try {
      const formData = new FormData();
      formData.append("image", file);

      // Use the deployed backend!
      const response = await fetch(`${baseUrl}/predict`, {
        method: "POST",
        body: formData,
      });
      // try {
      //   const formData = new FormData();
      //   formData.append("image", file);
      //   const response = await fetch("http://127.0.0.1:5000/predict", {
      //     method: "POST",
      //     body: formData,
      //   });
        if (!response.ok) throw new Error("Prediction failed");
        const data = await response.json();

        setResult({
          name: data.food,
          calories: Number(data.nutrition.calories) || 0,
          protein: Number(data.nutrition["protein(g)"]) || 0,
          carbs: Number(data.nutrition["carbs(g)"]) || 0,
          fats: Number(data.nutrition["fats(g)"]) || 0,
          fiber: Number(data.nutrition["fibre(g)"]) || 0,
          confidence: Math.round(Number(data.confidence) * 100),
        });
      } catch (err) {
        alert("AI Prediction failed. Check backend server and image file!");
        setResult(null);
      }
      setIsScanning(false);
    }
  };

  const handleSave = () => {
    if (result && capturedImage) {
      onSaveFood(result);
      saveFoodEntry({
        name: result.name,
        calories: result.calories,
        protein: result.protein,
        carbs: result.carbs,
        fats: result.fats,
        fiber: result.fiber,
        image: capturedImage,
      });
      onClose();
    }
  };

  const handleRetry = () => {
    setResult(null);
    setCapturedImage(null);
    setIsScanning(false);
  };

  const NutrientBar = ({
    label,
    value,
    unit,
    color,
    icon: Icon,
    gradient,
  }: {
    label: string;
    value: number;
    unit: string;
    color: string;
    icon: any;
    gradient: string;
  }) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex justify-between items-center p-4 bg-slate-800/40 rounded-xl border border-slate-700/40"
    >
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg bg-gradient-to-r ${gradient}`}>
          <Icon className={`w-4 h-4 text-white`} />
        </div>
        <span className="text-white/90 font-medium">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-white font-semibold">{value}{unit}</span>
      </div>
    </motion.div>
  );

  return (
    <div className="fixed inset-0 bg-slate-900/95 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="w-full max-w-md"
      >
        <Card className="bg-slate-800/50 border border-slate-700/50 shadow-2xl">
          <CardHeader className="flex flex-row items-center justify-between border-b border-white/10">
            <CardTitle className="flex items-center gap-3 text-white">
              <div className="p-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600">
                <Camera className="w-5 h-5 text-white" />
              </div>
              AI Food Scanner
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white/60 hover:text-white hover:bg-white/10 rounded-full"
            >
              <X className="w-5 h-5" />
            </Button>
          </CardHeader>

          <CardContent className="space-y-6 p-6">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleFileChange}
              className="hidden"
            />

            <AnimatePresence mode="wait">
              {!capturedImage && !isScanning && !result && (
                <motion.div
                  key="capture"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-center space-y-6"
                >
                  <motion.div
                    className="w-40 h-40 mx-auto relative"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="w-full h-full bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-full flex items-center justify-center border border-white/20 relative overflow-hidden">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 rounded-full"
                      />
                      <Camera className="w-20 h-20 text-green-400 relative z-10" />
                    </div>
                  </motion.div>

                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-white">Capture Your Food</h3>
                    <p className="text-white/70 text-sm leading-relaxed">
                      Point your camera at any dish and our AI will instantly analyze its nutritional content
                    </p>

                    <div className="flex justify-center gap-4 text-xs text-white/50">
                      <div className="flex items-center gap-1">
                        <Brain className="w-3 h-3" />
                        AI-Powered
                      </div>
                      <div className="flex items-center gap-1">
                        <Zap className="w-3 h-3" />
                        Instant Results
                      </div>
                      <div className="flex items-center gap-1">
                        <Target className="w-3 h-3" />
                        95% Accuracy
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={handleCapture}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-4 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
                  >
                    <Camera className="w-5 h-5 mr-2" />
                    Start Scanning
                  </Button>
                </motion.div>
              )}

              {isScanning && (
                <motion.div
                  key="scanning"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center space-y-6"
                >
                  {capturedImage && (
                    <div className="relative rounded-xl overflow-hidden">
                      <img
                        src={capturedImage}
                        alt="Captured food"
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-slate-900/40 flex items-center justify-center">
                        <motion.div className="text-center">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            className="w-16 h-16 mx-auto mb-4 border-4 border-green-400 border-t-transparent rounded-full"
                          />
                          <div className="flex items-center justify-center gap-2 text-white">
                            <Sparkles className="w-5 h-5 text-green-400" />
                            <span className="font-medium">AI Analysis in Progress</span>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {result && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {capturedImage && (
                    <div className="relative rounded-xl overflow-hidden">
                      <img
                        src={capturedImage}
                        alt="Analyzed food"
                        className="w-full h-32 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                    </div>
                  )}

                  <div className="text-center space-y-3">
                    <div className="flex items-center justify-center gap-3">
                      <h3 className="text-xl font-bold text-white">{result.name}</h3>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        <Zap className="w-3 h-3 mr-1" />
                        {result.confidence}% match
                      </Badge>
                    </div>

                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.2 }}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full border border-orange-500/30"
                    >
                      <Flame className="w-5 h-5 text-orange-400" />
                      <span className="text-2xl font-bold text-orange-400">{result.calories}</span>
                      <span className="text-orange-400/80 text-sm">kcal</span>
                    </motion.div>
                  </div>

                  <div className="space-y-3">
                    <NutrientBar
                      label="Protein"
                      value={result.protein}
                      unit="g"
                      color="text-blue-400"
                      icon={Zap}
                      gradient="from-blue-500 to-blue-600"
                    />
                    <NutrientBar
                      label="Carbs"
                      value={result.carbs}
                      unit="g"
                      color="text-emerald-400"
                      icon={Camera}
                      gradient="from-emerald-500 to-green-600"
                    />
                    <NutrientBar
                      label="Fats"
                      value={result.fats}
                      unit="g"
                      color="text-yellow-400"
                      icon={Target}
                      gradient="from-yellow-500 to-amber-600"
                    />
                    <NutrientBar
                      label="Fiber"
                      value={result.fiber}
                      unit="g"
                      color="text-purple-400"
                      icon={Sparkles}
                      gradient="from-purple-500 to-purple-600"
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={handleRetry}
                      className="flex-1 bg-white/5 border-white/20 text-white/80 hover:bg-white/10 hover:text-white"
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Rescan
                    </Button>
                    <Button
                      onClick={handleSave}
                      className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold shadow-lg"
                    >
                      <Check className="w-4 h-4 mr-2" />
                      Add to Log
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

