import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import React from "react";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/screens";
import { Movie } from "@/models";
import { FALLBACK_MOVIE_POSTER, ImageSize, getPosterPath } from "@/api";

type MovieListProps = {
  title: string;
  hideSeeAll?: boolean;
  data: Movie[];
};

const MovieList: React.FC<MovieListProps> = ({
  title,
  hideSeeAll = false,
  data,
}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { width, height } = Dimensions.get("window");

  return (
    <View style={tw`mb-8 gap-y-4`}>
      <View style={tw`mx-4 flex-row justify-between items-center`}>
        <Text style={tw`text-white text-lg font-semibold`}>{title}</Text>
        {!hideSeeAll && (
          <TouchableOpacity>
            <Text style={tw`text-lg text-blue-500`}>See All</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={tw`px-4`}
      >
        {data.map((item, index) => {
          return (
            <TouchableOpacity
              key={`movie-${index}`}
              onPress={() => navigation.navigate("MovieDetailsScreen", item)}
              style={tw`gap-y-1 mr-4`}
            >
              <Image
                style={tw.style("rounded-2xl", {
                  width: width * 0.38,
                  height: height * 0.25,
                })}
                source={{
                  uri:
                    getPosterPath(item.poster_path, ImageSize.SIZE_185) ||
                    FALLBACK_MOVIE_POSTER,
                }}
              />
              <Text style={tw`text-neutral-300 ml-1`}>
                {item.title.length > 14
                  ? `${item.title.slice(0, 14)}...`
                  : item.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default MovieList;
