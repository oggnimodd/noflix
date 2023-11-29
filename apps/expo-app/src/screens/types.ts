import { Cast, Movie } from "@/models";

export type RootStackParamList = {
  HomeScreen: undefined;
  MovieDetailsScreen: Movie;
  PersonScreen: Cast;
};
