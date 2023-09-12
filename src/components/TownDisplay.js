import React, {useContext, useState} from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Context as AuthContext } from "../context/AuthContext";

const TownDisplay = ({id, name, labels = {"left-label": "Town Id", "right-label": "Town Name"}}) =>{
    const {state, deleteTown} = useContext(AuthContext);

    return <View style = {{flexDirection: 'row'}}>
        <TouchableOpacity style = {{flexDirection: 'row'}}>

            <View style= {styles.rectangleStyle}>
                <MaterialCommunityIcons name="town-hall" size={24} color="black" />
                <Text style={styles.textStyle}>{labels["left-label"]}: </Text>
                <Text>{id}</Text>
                <Text style = {styles.extraTextStyle}>{labels["right-label"]}: </Text>
                <Text style= {{marginRight: "20%"}}>{name}</Text>
                
            </View>
            <TouchableOpacity onPress={()=> deleteTown({authToken: state.token, townId: id})}>
                <Entypo name="trash" style= {styles.iconStyle} color="black" size = {24} />
            </TouchableOpacity>
        </TouchableOpacity>
        
        
        
    </View>
};

const styles = StyleSheet.create({
    rectangleStyle: {
        width: "90%",
        height: 70,
        borderWidth: 1,
        borderColor: 'black',
        marginLeft: 20,
        paddingLeft: "5%",
        paddingTop: "5%",
        flexDirection: 'row',
        marginVertical: "2%"
    },
    textStyle: {
        fontWeight: 'bold',
        marginLeft: "5%"
    },
    extraTextStyle:{
        fontWeight: 'bold',
        marginLeft: "15%",
        
    },
    iconStyle: {
        alignSelf: 'center'
    }
});

export default TownDisplay;