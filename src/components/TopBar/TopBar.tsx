import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from '../../themes/Colors';
import { FontFamily } from '../../themes/Fonts';
import MenuItem from '../TopBar/MenuItem';

export default function TopBar () {
    const [navMenuCollapsed, setNavMenuCollapsed] = useState(false);

    const handleSettings = () => {}

    const handleMenu = () => {
        setNavMenuCollapsed(!navMenuCollapsed);
    }

    return (
        <View>
            <View style={styles.outerContainer}>
                <Pressable onPressOut={handleSettings}>
                    <Feather name="settings" size={24} color={Colors.VAR9} />
                </Pressable>
                <Text style={styles.mainText}>Project Planner</Text>
                <Pressable onPressOut={handleMenu}>
                    <AntDesign name="menu" size={24} color={Colors.VAR9} />
                </Pressable>     
            </View>
            {navMenuCollapsed && 
                <View style={styles.navMenu}>
                    <View style={styles.menuItemContainer}>
                        <MenuItem>My Projects</MenuItem>
                        <MenuItem>Brainstorm</MenuItem>
                        <MenuItem>Tasks</MenuItem>
                    </View>  
                    <Pressable onPressOut={handleMenu}>
                        <Feather name="chevron-up" size={24} color={Colors.VAR1} />
                    </Pressable>
                </View>
            }
        </View>
        
    );
}

const styles = StyleSheet.create({
    outerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 20
    },
    mainText: {
        color: Colors.VAR9,
        fontSize: 20,
        fontFamily: FontFamily.BOLD,
    },
    navMenu: {
        backgroundColor: Colors.VAR9,
        position: "absolute",
        flexDirection: "column",
        padding: 25,
        paddingBottom: 15,
        alignSelf: "flex-end",
        borderRadius: 20,
        top: 10,
        zIndex: 1000,
        alignItems: "center",
        right: 10
    },
    menuItemContainer: {
        borderTopColor: Colors.VAR1 + 50,
        borderTopWidth: 1,
    }
})