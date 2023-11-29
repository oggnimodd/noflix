import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  Dimensions,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery } from "@tanstack/react-query";
import {
  getPersonDetails,
  getPersonMovies,
  ImageSize,
  getPosterPath,
  FALLBACK_PERSON_IMAGE,
  FALLBACK_MOVIE_POSTER,
} from "@/api";
import tw from "twrnc";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from ".";
import { Movie, PersonMovie } from "@/models";
import { LoadingIndicator } from "@/components";

const ios = Platform.OS === "ios";
const verticalMargin = ios ? "" : " my-3";

const { width, height } = Dimensions.get("window");

type PersonDetailsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "PersonDetailsScreen"
>;

const PersonDetailsScreen: React.FC<PersonDetailsScreenProps> = ({
  navigation,
  route,
}) => {
  const personId = route.params.id;

  const [isFavourite, toggleFavourite] = useState(false);

  const personDetailsQuery = useQuery({
    queryKey: ["personDetails", personId],
    queryFn: () => getPersonDetails(personId),
  });

  const personMoviesQuery = useQuery({
    queryKey: ["personMovies", personId],
    queryFn: () => getPersonMovies(personId),
  });

  const isLoading = personDetailsQuery.isLoading || personMoviesQuery.isLoading;

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      style={tw`flex-1 bg-neutral-900`}
    >
      {/* back button */}
      <SafeAreaView
        style={tw`flex-row justify-between items-center mx-4 z-10 ${verticalMargin}`}
      >
        <TouchableOpacity
          style={tw`rounded-xl p-1`}
          onPress={() => navigation.goBack()}
        >
          <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)}>
          <HeartIcon
            size="35"
            style={isFavourite ? tw`text-red-500` : tw`text-white`}
          />
        </TouchableOpacity>
      </SafeAreaView>

      {/* person details */}
      <View>
        <View style={tw.style("flex-row justify-center")}>
          <View
            style={tw.style(
              "items-center rounded-full overflow-hidden h-72 w-72 border-neutral-500 border-2",
              {
                shadowColor: "gray",
                shadowRadius: 40,
                shadowOffset: { width: 0, height: 5 },
                shadowOpacity: 1,
              },
            )}
          >
            <Image
              source={{
                uri:
                  getPosterPath(
                    personDetailsQuery.data?.profile_path || "",
                    ImageSize.SIZE_342,
                  ) || FALLBACK_PERSON_IMAGE,
              }}
              style={{ height: height * 0.43, width: width * 0.74 }}
            />
          </View>
        </View>

        <View style={tw`mt-6`}>
          <Text style={tw`text-3xl text-white font-bold text-center`}>
            {personDetailsQuery.data?.name}
          </Text>
          <Text style={tw`text-neutral-500 text-base text-center`}>
            {personDetailsQuery.data?.place_of_birth}
          </Text>
        </View>

        <View
          style={tw`mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full`}
        >
          <View style={tw`border-r-2 border-r-neutral-400 px-2 items-center`}>
            <Text style={tw`text-white font-semibold`}>Gender</Text>
            <Text style={tw`text-neutral-300 text-sm`}>
              {personDetailsQuery.data?.gender === 1 ? "Female" : "Male"}
            </Text>
          </View>
          <View style={tw`border-r-2 border-r-neutral-400 px-2 items-center`}>
            <Text style={tw`text-white font-semibold`}>Birthday</Text>
            <Text style={tw`text-neutral-300 text-sm`}>
              {personDetailsQuery.data?.birthday}
            </Text>
          </View>
          <View style={tw`border-r-2 border-r-neutral-400 px-2 items-center`}>
            <Text style={tw`text-white font-semibold`}>known for</Text>
            <Text style={tw`text-neutral-300 text-sm`}>
              {personDetailsQuery.data?.known_for_department}
            </Text>
          </View>
          <View style={tw`px-2 items-center`}>
            <Text style={tw`text-white font-semibold`}>Popularity</Text>
            <Text style={tw`text-neutral-300 text-sm`}>
              {personDetailsQuery.data?.popularity}
            </Text>
          </View>
        </View>

        {/* person movies */}
        <View style={tw`mt-6`}>
          <Text style={tw`text-2xl text-white font-bold text-center`}>
            Movies
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={tw`mt-6`}
          >
            {personMoviesQuery.data?.map((movie: PersonMovie) => (
              <Pressable
                key={movie.id}
                style={tw`mr-4`}
                onPress={() =>
                  navigation.navigate(
                    "MovieDetailsScreen",
                    movie as unknown as Movie,
                  )
                }
              >
                <Image
                  source={{
                    uri: movie.poster_path
                      ? getPosterPath(movie.poster_path, ImageSize.SIZE_342) ||
                        FALLBACK_MOVIE_POSTER
                      : undefined,
                  }}
                  style={tw`rounded-xl overflow-hidden h-48 w-48`}
                />
                <Text style={tw`mt-2 text-white text-center`}>
                  {/* Truncate the title */}
                  {movie.title.length > 20
                    ? `${movie.title.slice(0, 20)}...`
                    : movie.title}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
};

export default PersonDetailsScreen;
