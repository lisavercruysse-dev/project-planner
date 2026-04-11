import { useState } from "react"
import { ScrollView, StyleSheet, Text, View } from "react-native"
import { Calendar } from "react-native-calendars"
import { ColorsPrimary, ColorsSecondary } from "../themes/Colors"
import { FontFamily } from "../themes/Fonts"

export default function Tasks () {
  const [selected, setSelected] = useState('')
  const today = new Date().toDateString();

  return (
    <ScrollView style={{backgroundColor: "white"}}>
      <View style={styles.container}>
        <Text style={styles.title}>
          Planning
        </Text>
        <Calendar
          onDayPress={day => {
            setSelected(day.dateString)
          }}
          markedDates={{[selected]: {selected: true}}}
          theme={{
            selectedDayBackgroundColor: ColorsPrimary.VAR9,
            selectedDayTextColor: ColorsPrimary.VAR1,
            todayTextColor: ColorsSecondary.VAR1,
            todayBackgroundColor: ColorsSecondary.VAR7,
            textSectionTitleColor: ColorsPrimary.VAR9,
            textDayFontFamily: FontFamily.SEMIBOLD,
            textMonthFontFamily: FontFamily.BOLD,
            textDayHeaderFontFamily: FontFamily.BOLD,
            monthTextColor: ColorsPrimary.VAR9,
            dayTextColor: ColorsPrimary.VAR9,
            agendaTodayColor: ColorsPrimary.VAR9,
            agendaDayTextColor: ColorsPrimary.VAR9,
            arrowColor: ColorsPrimary.VAR9,
            disabledArrowColor: ColorsPrimary.VAR9 + 50,
            textDisabledColor: ColorsPrimary.VAR9 + 50,
            textMonthFontSize: 18,
          }}
          style={{margin: 10}}
          current={today}
        >      
        </Calendar>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  title: {
    fontFamily: FontFamily.BOLD,
    color: ColorsPrimary.VAR9,
    fontSize: 25
  },
  container: {
    flexDirection: "column",
    padding: 15,
  }
})