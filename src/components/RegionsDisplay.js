import React, {useContext, useState} from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { Entypo } from '@expo/vector-icons';
import { Context as AuthContext } from "../context/AuthContext";

const RegionDisplay = ({id, name, navigate, labels = {"left-label": "Region Id", "right-label": "Region Name"}}) =>{
    const {state, deleteRegion} = useContext(AuthContext);
    return <View style = {{flexDirection: 'row'}}>
        <TouchableOpacity onPress = {()=> navigate()}
            style = {{flexDirection: 'row'}}
            >

            <View style= {styles.rectangleStyle}>
                <Entypo name="location" size={24} color="black" style = {styles.iconStyle} />
                <Text style={styles.textStyle}>{labels["left-label"]}: </Text>
                <Text>{id}</Text>
                <Text style = {styles.extraTextStyle}>{labels["right-label"]}: </Text>
                <Text style= {{marginRight: "20%"}}>{name}</Text>
                
            </View>
            <TouchableOpacity onPress={()=> deleteRegion({authToken: state.token, regionId: id})}>
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
        alignSelf: 'center',
    }
});

export default RegionDisplay;