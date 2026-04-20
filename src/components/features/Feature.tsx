import { getFeatureTasks } from "@/src/api/tasks";
import { useTasks } from "@/src/context/TaskContext";
import { ColorsPrimary } from "@/src/themes/Colors";
import { FontFamily } from "@/src/themes/Fonts";
import { FeatureType } from "@/src/types/FeatureType";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useEffect, useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import FeatureDetailModal from "../modals/features/FeatureDetailModal";
import TaskList from "../tasks/TaskList";

type Props = {
  feature: FeatureType;
}

export default function Feature({feature}: Props) {
  const [detailsVisible, setDetailsVisible] = useState(false);
  const {tasks, dispatch} = useTasks();
  const featureTasks = tasks.filter(t => t.feature?.id === feature.id);

  useEffect(() => {
    const fetchData = async () => {
      const dbTasks = await getFeatureTasks(feature.id)
      dispatch({type: "MERGE_TASKS", payload: dbTasks})
    }
    fetchData()
  }, [dispatch, feature.id])

  return (
    <View>
      <View style = {styles.container}>
        <View style = {styles.nameAndButtonContainer}>
          <Text style={styles.featureName}>
            {feature.name}
          </Text>
          <View style={styles.buttonContainer}>
            <Pressable style={styles.button} onPress={() => setDetailsVisible(true)}>
              <Text style={styles.buttonText}>
                View
              </Text>
            </Pressable>
            <Pressable>
              <AntDesign name={ "caret-up" } size={24} color={ColorsPrimary.VAR9 } />
            </Pressable>
          </View>
        </View>
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
      <View>
        <TaskList tasks={featureTasks}/>
      </View>
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
      paddingHorizontal: 8,
      paddingVertical: 3,
      justifyContent: "center",
      borderRadius: 15,
      backgroundColor: ColorsPrimary.VAR9
    },
    buttonText: {
      color: ColorsPrimary.VAR1,
      fontFamily: FontFamily.BOLD
    },
    container: {
      flexDirection: 'column',
      width: "100%",
    },
    nameAndButtonContainer: {
      flexDirection: 'row',
      width: "100%",
      justifyContent: "space-between",
      paddingHorizontal: 20,  
      paddingVertical: 5,
      borderColor: ColorsPrimary.VAR9 + 30,
      borderBottomWidth: 1,
    },
    featureName: {
      fontFamily: FontFamily.BOLD,
      color: ColorsPrimary.VAR9,
      paddingRight: 20,
      paddingVertical: 20,
      fontSize: 16
    },
    buttonContainer: {
      flexDirection: "row",
      gap: 10,
      alignItems: "center"
    }
})