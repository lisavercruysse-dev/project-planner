import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Calendar } from 'react-native-calendars';
import { ColorsPrimary, ColorsSecondary } from "../themes/Colors";
import { FontFamily } from "../themes/Fonts";


export default function Tasks () {
  const [selectedDate, setSelectedDate] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Planning
      </Text>
      <Calendar
        onDayPress={day => setSelectedDate(day.dateString)}
        markedDates={{
          [selectedDate]: { selected: true, disableTouchEvent: true, selectedColor: ColorsPrimary.VAR9 }
        }}
        firstDay={1}
        theme={{
          todayTextColor: ColorsSecondary.VAR7,
          dayTextColor: ColorsPrimary.VAR9,
          arrowColor: ColorsPrimary.VAR9,
          monthTextColor: ColorsPrimary.VAR9,
          textDayFontFamily: FontFamily.SEMIBOLD,
          textMonthFontFamily: FontFamily.BOLD,
          textSectionTitleColor: ColorsPrimary.VAR9,
          textDisabledColor: ColorsPrimary.VAR9 + 50,
          textDayHeaderFontFamily: FontFamily.BOLD,
          textDayHeaderFontSize: 15
        }}
        style={{ height: 375, borderColor: ColorsPrimary.VAR9 + 20, borderBottomWidth: 1,}}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    color: ColorsPrimary.VAR9,
    fontFamily: FontFamily.BOLD,
    fontSize: 25,
    margin: 13
  },
  container: {
    flexDirection: "column",
    backgroundColor: "white",
    flex: 1,
    padding: 10
  }
})