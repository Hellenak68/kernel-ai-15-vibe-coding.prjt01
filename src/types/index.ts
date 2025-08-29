export interface Recipe {
  id: string;
  name: string;
  description: string;
  image: string;
  prepTime: number; // 분 단위
  cookTime: number; // 분 단위
  servings: number;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
  ingredients: Ingredient[];
  instructions: string[];
  nutrition: Nutrition;
  isFavorite: boolean;
}

export interface Ingredient {
  id: string;
  name: string;
  amount: number;
  unit: string;
  category: 'vegetable' | 'meat' | 'dairy' | 'grain' | 'spice' | 'other';
}

export interface Nutrition {
  calories: number;
  protein: number; // g
  carbs: number; // g
  fat: number; // g
  fiber: number; // g
  sugar: number; // g
  sodium: number; // mg
}

export interface PantryItem {
  id: string;
  name: string;
  amount: number;
  unit: string;
  category: 'vegetable' | 'meat' | 'dairy' | 'grain' | 'spice' | 'other';
  expiryDate?: Date;
}

export interface WeeklyPlan {
  id: string;
  weekStart: Date;
  days: DailyPlan[];
  shoppingList: ShoppingItem[];
}

export interface DailyPlan {
  date: Date;
  meals: {
    breakfast?: Recipe;
    lunch?: Recipe;
    dinner?: Recipe;
    snack?: Recipe;
  };
}

export interface ShoppingItem {
  id: string;
  name: string;
  amount: number;
  unit: string;
  category: 'vegetable' | 'meat' | 'dairy' | 'grain' | 'spice' | 'other';
  isChecked: boolean;
  estimatedPrice?: number;
}

export interface UserPreferences {
  dietaryRestrictions: string[];
  favoriteCuisines: string[];
  cookingSkill: 'beginner' | 'intermediate' | 'advanced';
  preferredPrepTime: number; // 분 단위
  calorieGoal?: number;
}
