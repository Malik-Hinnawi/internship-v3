import React from "react";
import {View, StyleSheet, TouchableOpacity} from "react-native"
import ImageUploadTr from "../components/ImageUploadTr";
import { Entypo } from '@expo/vector-icons';

const UploadScreenTr = ({navigation}) => {
    return <View style = {styles.containerStyle}> 
        <TouchableOpacity onPress= {()=> navigation.navigate("ProfileTr")}>
            <Entypo name="home" size={24} color="black" />
        </TouchableOpacity>

        <ImageUploadTr/>
     </View>;
};

const styles = StyleSheet.create({
    containerStyle: {
        flex:1,
        marginTop: 20
    }
});

export default UploadScreenTr;