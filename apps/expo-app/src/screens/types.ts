import { Meal } from "@/models";

export type RootStackParamList = {
  HomeScreen: undefined;
  RecipeDetailScreen: { item: Meal };
  WelcomeScreen: undefined;
};
