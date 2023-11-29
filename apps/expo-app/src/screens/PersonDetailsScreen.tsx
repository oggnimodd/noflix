import { Text, View } from "react-native";
import tw from "twrnc";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from ".";
import { FC } from "react";

type Props = NativeStackScreenProps<RootStackParamList, "PersonDetailsScreen">;

const PersonDetailsScreen: FC<Props> = ({ navigation }) => {
  return (
    <View>
      <Text>Hello world</Text>
    </View>
  );
};

export default PersonDetailsScreen;
