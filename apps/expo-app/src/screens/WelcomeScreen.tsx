import { Image, Text, View } from "react-native";
import tw from "twrnc";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from ".";
import { FC } from "react";
import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import { useIsFocused } from "@react-navigation/native";

type Props = NativeStackScreenProps<RootStackParamList, "WelcomeScreen">;

const WelcomeScreen: FC<Props> = ({ navigation }) => {
  const ring1padding = useSharedValue(0);
  const ring2padding = useSharedValue(0);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      ring1padding.value = 0;
      ring2padding.value = 0;
      setTimeout(() => {
        ring1padding.value = withSpring(ring1padding.value + hp(5));
      }, 100);
      setTimeout(() => {
        ring2padding.value = withSpring(ring2padding.value + hp(5.5));
      }, 300);

      setTimeout(() => navigation.navigate("HomeScreen"), 2500);
    }
  }, [navigation, isFocused]);

  return (
    <View style={tw`flex-1 justify-center items-center gap-y-10 bg-blue-500`}>
      <StatusBar style="light" />

      {/* logo image with rings */}
      <Animated.View
        style={{ ...tw`bg-white/20 rounded-full`, padding: ring2padding }}
      >
        <Animated.View
          style={{
            ...tw`bg-white/20 rounded-full`,
            padding: ring1padding,
          }}
        >
          <Image
            source={require("../../assets/images/welcome.png")}
            style={{ width: hp(20), height: hp(20) }}
          />
        </Animated.View>
      </Animated.View>

      {/* title and punchline */}
      <View style={tw`flex items-center gap-y-2`}>
        <Text
          style={{
            fontSize: hp(7),
            ...tw`font-bold text-white text-center`,
          }}
        >
          Flavorful
        </Text>
        <Text
          style={{
            fontSize: hp(2),
            ...tw`font-bold text-white text-center`,
          }}
        >
          Discover flavor, discover life. Discover Flavorful.
        </Text>
      </View>
    </View>
  );
};

export default WelcomeScreen;
