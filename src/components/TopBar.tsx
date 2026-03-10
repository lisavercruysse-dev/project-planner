import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import { StyleSheet, Text, View } from "react-native";
import { Colors } from '../themes/Colors';
import { FontFamily } from '../themes/Fonts';

export default function TopBar () {
    return (
        <View style={styles.outerContainer}>
            <Feather name="settings" size={24} color={Colors.PINK9} />
            <Text style={styles.mainText}>Project Planner</Text>
            <AntDesign name="menu" size={24} color={Colors.PINK9} />
        </View>
    );
}

const styles = StyleSheet.create({
    outerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 20
    },
    mainText: {
        color: Colors.PINK9,
        fontSize: 20,
        fontFamily: FontFamily.BOLD,
    }
})