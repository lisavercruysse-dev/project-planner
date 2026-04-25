import { deleteBrainstorm } from "@/src/api/brainstorms";
import { ColorsPrimary } from "@/src/themes/Colors";
import { FontFamily } from "@/src/themes/Fonts";
import Feather from '@expo/vector-icons/Feather';
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  id: string,
  type: string,
  onClose: () => void;
}

export default function DeleteConfirmModal({id, type, onClose}: Props) {

  const handleDelete = async(id: string, type: string) => {
    switch (type.toLowerCase()) {
      case "brainstorm": 
        deleteBrainstorm(id)
        break;
    }
    onClose()
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Feather name="trash-2" size={20} color={ColorsPrimary.VAR9} />
        <Text style={styles.titleText}>
          Delete {type}
        </Text>
      </View>
      <Text style={styles.bodyText}>
        Are you sure you want to delete this {type}?
        This action cannot be undone!
      </Text>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.cancelButton}>
          <Text style={styles.cancelButtonText}>
            Cancel
          </Text>
        </Pressable>
        <Pressable onPress={() => handleDelete(id, type)} style={styles.deleteButton}>
          <Text style={styles.buttonText}>
            Confirm
          </Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: 30,
    padding: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 10,
    alignSelf: "center"
  },
  titleText: {
    fontSize: 20,
    fontFamily: FontFamily.BOLD,
    color: ColorsPrimary.VAR9
  },
  bodyText: {
    fontSize: 15,
    fontFamily: FontFamily.REGULAR,
    color: ColorsPrimary.VAR9,
    textAlign: "center"
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 10,
    alignSelf: "center"
  },
  deleteButton: {
    backgroundColor: 'red',
    paddingHorizontal: 12,
    paddingVertical: 8, 
    borderRadius: 15,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center"
  },
  cancelButton: {
    paddingHorizontal: 12,
    paddingVertical: 8, 
    borderRadius: 15,
    borderColor: ColorsPrimary.VAR9,
    borderWidth: 1,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center"
  },
  buttonText: {
    color: ColorsPrimary.VAR1,
    fontFamily: FontFamily.BOLD,
    textAlign: "center"
  },
  cancelButtonText: {
    color: ColorsPrimary.VAR9,
    fontFamily: FontFamily.BOLD,
    textAlign: "center"
  }
})