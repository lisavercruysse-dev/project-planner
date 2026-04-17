import { ColorsPrimary } from "@/src/themes/Colors";
import { FontFamily } from "@/src/themes/Fonts";
import { FeatureType } from "@/src/types/FeatureType";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from "react";
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import AddTaskModal from "./AddTaskModal";

type Props = {
  feature: FeatureType;
}

export default function FeatureDetailModal({feature}: Props) {
  const [addTaskModalVisible, setAddTaskModalVisible] = useState(false);

  return (
    <View>
      <View style={styles.titleContainer}>
        <Ionicons name="extension-puzzle" size={20} color={ColorsPrimary.VAR9} />
        <Text style={styles.title}>
          {feature.name}
        </Text>
      </View>
      <Pressable style={styles.button} onPress={() => setAddTaskModalVisible(true)}>
        <Text style={styles.buttonText}>Add Task</Text>
      </Pressable>
      <Modal
        visible={addTaskModalVisible}
        onRequestClose={() => setAddTaskModalVisible(false)}
        animationType="fade"
        transparent={true}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{flex: 1}}
        >
          <Pressable
          onPress={() => setAddTaskModalVisible(false)}
          style={styles.modalBackground}
          >
            <Pressable onPress={e => e.stopPropagation()}>
              <View style={styles.modal}>
                <AddTaskModal parent={feature} type="feature" onClose={() => setAddTaskModalVisible(false)}/>
              </View>
            </Pressable>
          </Pressable>
        </ScrollView>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center"
  },
  title: {
    fontSize: 20,
    fontFamily: FontFamily.BOLD,
    color: ColorsPrimary.VAR9
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
  },
  modalBackground: {
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
  }
})