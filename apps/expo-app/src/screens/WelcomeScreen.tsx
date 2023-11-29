import { Text, View } from "react-native";
import tw from "twrnc";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from ".";
import { FC } from "react";
import { getPersonMovies } from "@/api";

getPersonMovies(33934);

type Props = NativeStackScreenProps<RootStackParamList, "WelcomeScreen">;

const WelcomeScreen: FC<Props> = ({ navigation }) => {
  return (
    <View>
      <Text>Hello world</Text>
    </View>
  );
};

export default WelcomeScreen;
