import { ColorsPrimary } from "@/src/themes/Colors";
import { StyleSheet, View } from "react-native";

type Props = {
    progress: number;
}

export default function ProgressBar({progress}: Props) {
    return (
        <View style={styles.barContainer}>
            <View style={[styles.progress, {width: `${progress}%`}]}>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    barContainer: {
        backgroundColor: ColorsPrimary.VAR1,
        width: 300,
        height: 30,
        borderRadius: 30,
        overflow: "hidden"
    },
    progress: {
        backgroundColor: ColorsPrimary.VAR7,
        height: 30,
        borderRadius: 30,
    }
})