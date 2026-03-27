import { ColorsPrimary } from "@/src/themes/Colors"
import { FontFamily } from "@/src/themes/Fonts"
import Project from "@/src/types/ProjectType"
import Tag from "@/src/types/TagType"
import Feather from "@expo/vector-icons/Feather"
import { useMemo, useState } from "react"
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native"
import FilterTag from "./FilterTag"

type Props = {
  tags: Tag[],
  projects: Project[],
  onConfirm: (tags: Tag[], projects: Project[]) => void,
  initialSelectedTags?: Tag[],
  initialSelectedProjects?: Project[],
}

export default function FilterTasksModal ({  
  tags,
  projects,
  onConfirm,
  initialSelectedTags = [],
  initialSelectedProjects = [],
}: Props) {

  const [text, onChangeText] = useState('')
  const [selectedTags, setSelectedTags] = useState<Tag[]>(initialSelectedTags)
  const [selectedProjects, setSelectedProjects] = useState<Project[]>(initialSelectedProjects)

  function updateSelection<F extends { id: string | number }>(
  prevList: F[],
  item: F,
  isSelected: boolean
  ): F[] {
    if (isSelected) {
      return [...prevList, item]
    } else {
      return prevList.filter(i => i.id !== item.id)
    }
  }

  const handleTagSelect = (tag: Tag, isSelected: boolean) => {
    setSelectedTags(prev => updateSelection(prev, tag, isSelected))
  }

  const handleProjectSelect = (project: Project, isSelected: boolean) => {
    setSelectedProjects(prev => updateSelection(prev, project, isSelected))
  }

  const filteredTags = useMemo(() => {
    return tags.filter((t) => {
      return t.name.toLowerCase().includes(text.toLowerCase())
    })
  }, [tags, text]
)

  const handleCancel = () => {
    setSelectedTags([])
    setSelectedProjects([])
    onConfirm([], [])
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Feather name="filter" size={24} color={ColorsPrimary.VAR9} />
        <Text style={styles.title}>
          Filter your tasks
        </Text>
      </View>
      <View style={styles.filterSectionContainer}>
        <Text style={styles.subTitle}>
          Tags
        </Text>
        <TextInput style={styles.searchBar}
          onChangeText={onChangeText}
          value={text}
          placeholder="Search tags..."
        >
        </TextInput>
        <View style={styles.tagsContainer}>
         {filteredTags.map(t => {
            const isSelected = selectedTags.some(st => st.id === t.id)
            return <FilterTag key={t.id} tag={t} onSelect={handleTagSelect} initialSelected={isSelected} />
          })}  
        </View>
      </View>
      <View style={styles.filterSectionContainer}>
        <Text style={styles.subTitle}>
          Projects
        </Text>
        <View style={styles.tagsContainer}>
          {projects.map((p) => {
            const isSelected = selectedProjects.some(sp => sp.id === p.id);
            return (
              <FilterTag
                key={p.id}
                tag={p}
                onSelect={handleProjectSelect}
                initialSelected={isSelected} 
              />
            )
          })}  
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.removeButton} onPress={handleCancel}>
          <Text style={styles.removeButtonText}>
            Remove filters  
          </Text>    
        </Pressable>
        <Pressable style={styles.confirmButton} onPress={() => onConfirm(selectedTags, selectedProjects)}>
          <Text style={styles.confirmButton}>
            Confirm
          </Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 30
  },
  titleContainer: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    alignSelf: "center"
  },
  title: {
    color: ColorsPrimary.VAR9,
    fontFamily: FontFamily.BOLD,
    fontSize: 18,
    padding: 5
  },
  subTitle: {
    color: ColorsPrimary.VAR9,
    fontFamily: FontFamily.SEMIBOLD,
    fontSize: 15,
    paddingHorizontal: 9
  },
  searchBar: {
    borderColor: ColorsPrimary.VAR9,
    borderWidth: 1,
    width: '100%',
    height: 40,
    borderRadius: 15,
    justifyContent: 'center',
    paddingHorizontal: 10,
    color: ColorsPrimary.VAR9
  },
  filterSectionContainer: {
    flexDirection: 'column',
    gap: 8
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10
  },
  confirmButton: {
    backgroundColor: ColorsPrimary.VAR9,
    color: ColorsPrimary.VAR1,
    paddingHorizontal: 8,
    paddingVertical: 5,
    alignSelf: "center",
    borderRadius: 15,
    fontFamily: FontFamily.BOLD,
  },
  removeButton: {
    backgroundColor: ColorsPrimary.VAR2,
    paddingHorizontal: 8,
    paddingVertical: 5,
    alignSelf: "center",
    borderRadius: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 5,
  },
  removeButtonText: {
    color: ColorsPrimary.VAR9,
    paddingHorizontal: 8,
    paddingVertical: 5,
    alignSelf: "center",
    borderRadius: 15,
    fontFamily: FontFamily.BOLD,
  }
})