import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "red",
      }}
    >
      <Text style={{ color: "white" }}>Edit app/index.tsx to edit this screen 123.</Text>
      <Link href="/modal" style={{ marginTop: 20 }}>
        <Text style={{ color: "white" ,fontSize: 18}}>About</Text>
      </Link>
    </View>
  );
}
