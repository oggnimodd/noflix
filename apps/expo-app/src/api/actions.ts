import { Category, CategoryResponse, Meal, MealResponse } from "@/models";
import api from "./axios";

export const getCategories = async (): Promise<Category[]> => {
  const response = await api.get<CategoryResponse>("categories.php");
  return response.data.categories;
};

export const getRecipesBasedOnCategory = async (
  category = "Beef",
): Promise<Meal[]> => {
  const response = await api.get<MealResponse>("filter.php", {
    params: {
      c: category,
    },
  });
  return response.data.meals;
};

export const searchRecipes = async (searchQuery: string): Promise<Meal[]> => {
  const response = await api.get<MealResponse>("search.php", {
    params: {
      s: searchQuery.trim().toLowerCase(),
    },
  });
  return response.data.meals;
};

export const getMealDetail = async (id: string): Promise<Meal> => {
  const response = await api.get<MealResponse>("lookup.php", {
    params: {
      i: id,
    },
  });

  return response.data.meals[0];
};

export const collectIngredients = (meal?: Meal) => {
  if (!meal) return [];
  return Object.keys(meal)
    .map((key) => {
      if (key.indexOf("strIngredient") === 0 && meal[key as keyof Meal]) {
        return meal[key as keyof Meal];
      }
    })
    .filter((meal) => meal);
};

export const collectMeasures = (meal?: Meal) => {
  if (!meal) return [];

  return Object.keys(meal)
    .map((key) => {
      if (key.indexOf("strMeasure") === 0 && meal[key as keyof Meal]) {
        return meal[key as keyof Meal];
      }
    })
    .filter((meal) => meal);
};
