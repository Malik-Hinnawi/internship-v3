import React from "react";
import { View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { Feather } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 

const SearchBar = ({term, onTermChange, onTermSubmit, onTermAdd, placeholder = "Search"}) =>{
    return <View style = {styles.backgroundStyle}>
        <Feather name = "search" style = {styles.iconStyle}/>
        <TextInput 
            autoCapitalize="none"
            autoCorrect = {false}
            placeholder={placeholder}
            style = {styles.inputStyle}
            value = {term}
            onChangeText = {onTermChange}
            onEndEditing = {onTermSubmit}
        />
        <TouchableOpacity onPress={()=>onTermAdd()}>
            <Entypo name="add-to-list" style = {styles.iconStyle} color="black" />
        </TouchableOpacity>
    </View>
};

const styles = StyleSheet.create({
    backgroundStyle:{
        backgroundColor: '#E0E0E0',
        height: 35,
        borderRadius: 5,
        marginHorizontal: 10,
        flexDirection: 'row',
        marginTop: 15,
        marginBottom: 10
    },
    inputStyle: {
        flex:1
    },
    iconStyle:{
        fontSize: 20,
        alignSelf: "center",
        marginHorizontal: 15
    }
});

export default SearchBar;