import { Colors } from "@/src/themes/Colors"
import { StyleSheet, View } from "react-native"


export default function ProgressBar() {
    return (
        <View style={styles.barContainer}>
            <View style={styles.progress}>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    barContainer: {
        backgroundColor: Colors.VAR1,
        width: 300,
        height: 30,
        borderRadius: 30,
    },
    progress: {
        backgroundColor: Colors.VAR7,
        height: 30,
        width: 60,
        borderRadius: 30,
    }
})