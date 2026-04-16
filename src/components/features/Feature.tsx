import { ColorsPrimary } from "@/src/themes/Colors";
import { FontFamily } from "@/src/themes/Fonts";
import { FeatureType } from "@/src/types/FeatureType";
import { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import FeatureDetailModal from "../modals/features/FeatureDetailModal";

type Props = {
  feature: FeatureType;
}

export default function Feature({feature}: Props) {
  const [detailsVisible, setDetailsVisible] = useState(false);

  return (
    <View>
      <Text>
        {feature.name}
      </Text>
        <Pressable style={styles.button} onPress={() => setDetailsVisible(true)}>
          <Text style={styles.buttonText}>
            View
          </Text>
        </Pressable>
      <Modal
        visible={detailsVisible}
        onRequestClose={() => setDetailsVisible(!detailsVisible)}
        animationType="fade"
        transparent={true}
      >
        <Pressable onPress={() => setDetailsVisible(false)} style={styles.modalBackground}>
          <View style={styles.modal}>
            <FeatureDetailModal feature={feature}/>
          </View>
        </Pressable>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  modalBackground: {
    backgroundColor: '#00000050',
    flex: 1,
    justifyContent: 'flex-end',
  },
  modal: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 15,
    width: '100%',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  },
    button: {
      backgroundColor: ColorsPrimary.VAR9,
      paddingHorizontal: 12,
      paddingVertical: 8, 
      borderRadius: 15,
      alignSelf: "center",
      justifyContent: "center",
      alignItems: "center"
    },
    buttonText: {
      color: ColorsPrimary.VAR1,
      fontFamily: FontFamily.BOLD
    }
})