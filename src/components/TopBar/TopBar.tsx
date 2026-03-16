import Feather from '@expo/vector-icons/Feather';
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from '../../themes/Colors';
import { FontFamily } from '../../themes/Fonts';

export default function TopBar () {

    const handleSettings = () => {}

    return (
        <View>
            <View style={styles.outerContainer}>
                <Pressable onPressOut={handleSettings}>
                    <Feather name="settings" size={24} color={Colors.VAR9} />
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
        color: Colors.VAR9,
        fontSize: 20,
        fontFamily: FontFamily.BOLD,
        position: "absolute",
        left: 0,
        right: 0,
        textAlign: "center",
    }
})