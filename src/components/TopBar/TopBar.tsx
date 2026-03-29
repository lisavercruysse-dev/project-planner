import Feather from '@expo/vector-icons/Feather';
import { Pressable, StyleSheet, Text, View } from "react-native";
import { ColorsPrimary } from '../../themes/Colors';
import { FontFamily } from '../../themes/Fonts';

export default function TopBar () {

    const handleSettings = () => {}

    return (
        <View>
            <View style={styles.outerContainer}>
                <Pressable onPressOut={handleSettings}>
                    <Feather name="settings" size={24} color={ColorsPrimary.VAR9} />
                </Pressable>
                <Text style={styles.mainText}>Project Planner</Text>  
            </View>
        </View>
        
    );
}

const styles = StyleSheet.create({
    outerContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 20,
        position: "relative",
    },

    mainText: {
        color: ColorsPrimary.VAR9,
        fontSize: 15,
        fontFamily: FontFamily.BOLD,
        position: "absolute",
        left: 0,
        right: 0,
        textAlign: "center",
    }
})