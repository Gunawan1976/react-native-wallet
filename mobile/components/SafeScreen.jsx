import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { COLORS } from "../constant/colors";

export default function SafeScreen({ children }) {
    const insets = useSafeAreaInsets();
    return (
        <View style={{ flex: 1, paddingTop: insets.top, backgroundColor: COLORS.backgroundColor }}>
            {children}
        </View>
    );
}

// const SafeScreen = ({ children }) => {
//   return (
//     <View style={{ flex: 1, padding: 16 }}>
//       <Text style={{ fontSize: 18, fontWeight: "bold" }}>Safe Area</Text>
//       {children}
//     </View>
//   );
// };

// export default SafeScreen;
