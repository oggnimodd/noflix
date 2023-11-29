import { Text, View } from "react-native";
import tw from "twrnc";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from ".";
import { FC } from "react";
import { LoadingIndicator } from "@/components";

type Props = NativeStackScreenProps<RootStackParamList, "WelcomeScreen">;

const WelcomeScreen: FC<Props> = ({ navigation }) => {
  return (
    <View>
      <LoadingIndicator />
    </View>
  );
};

export default WelcomeScreen;
