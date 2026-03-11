import { Colors } from "@/src/themes/Colors"
import { FontFamily } from "@/src/themes/Fonts"
import { StyleSheet, Text, View } from "react-native"

export default function MenuItem ({children}) {
    return (
        <View style={styles.navItemContainer}>
            <Text style={styles.navItem}>
                {children}
            </Text>
        </View>
    )
}

    const styles = StyleSheet.create({
        navItem: {
            color: Colors.VAR1,
            fontFamily: FontFamily.BOLD,
            padding: 10,
            alignContent: "center",
            justifyContent: "center",
        },
        navItemContainer: {
            borderBottomColor: Colors.VAR1 + 50,
            borderBottomWidth: 1,
            alignItems: "center",
            margin: 5
        }
    })