import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import { TrendingMovies, MovieList, LoadingIndicator } from "@/components";
import { StatusBar } from "expo-status-bar";
import { useQuery } from "@tanstack/react-query";
import { getTrendingMovies, getUpcomingMovies, getTopRatedMovies } from "@/api";
import tw from "twrnc";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";

const ios = Platform.OS === "ios";

type Props = NativeStackScreenProps<RootStackParamList, "HomeScreen">;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const trendingMoviesQuery = useQuery({
    queryKey: ["trendingMovies"],
    queryFn: getTrendingMovies,
  });

  const upcomingMoviesQuery = useQuery({
    queryKey: ["upcomingMovies"],
    queryFn: getUpcomingMovies,
  });

  const topRatedMoviesQuery = useQuery({
    queryKey: ["topRatedMovies"],
    queryFn: getTopRatedMovies,
  });

  if (
    trendingMoviesQuery.isLoading ||
    upcomingMoviesQuery.isLoading ||
    topRatedMoviesQuery.isLoading
  ) {
    return <LoadingIndicator />;
  }

  return (
    <View style={tw`flex-1 bg-neutral-800`}>
      <SafeAreaView style={ios ? tw`-mb-2` : tw`mb-3`}>
        <StatusBar style="light" />
        <View style={tw`flex-row justify-between items-center mx-4`}>
          <Bars3CenterLeftIcon size="30" strokeWidth={2} color="white" />
          <Text style={tw`text-white text-3xl font-bold`}>
            <Text style={tw`text-blue-500`}>No</Text>flix
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("SearchScreen")}>
            <MagnifyingGlassIcon size="30" strokeWidth={2} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 10 }}
      >
        {trendingMoviesQuery.data?.length &&
          trendingMoviesQuery.data?.length > 0 && (
            <TrendingMovies data={trendingMoviesQuery.data} />
          )}
        {upcomingMoviesQuery.data?.length &&
          upcomingMoviesQuery.data?.length > 0 && (
            <MovieList title="Upcoming" data={upcomingMoviesQuery.data} />
          )}
        {topRatedMoviesQuery.data?.length &&
          topRatedMoviesQuery.data?.length > 0 && (
            <MovieList title="Top Rated" data={topRatedMoviesQuery.data} />
          )}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
