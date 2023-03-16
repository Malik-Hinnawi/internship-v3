import React, {useContext, useEffect} from "react";
import { View, StyleSheet,Image, TouchableOpacity } from "react-native";
import { Text } from "react-native-elements";
import { MaterialIcons } from '@expo/vector-icons'; 
import { SafeAreaView } from "react-navigation";
import { Context as AuthContext } from "../context/AuthContext";
import { ScrollView } from "react-native-gesture-handler";
import NavLink from "../components/NavLink";

const ProfileScreen = () =>{
    const {state, getImage} = useContext(AuthContext);
    // useEffect(()=>{
    //     getImage({imageUri: state.profilePic, token: state.token});
    // },[]);

    return <SafeAreaView forceInset={{top: 'always'}}>
        <ScrollView>
        <View style= {styles.containerStyle}>

            <Image source={{
                uri: state.profilePic,
                headers: {
                    Authorization: 'Bearer ' + state.token
                }
            }}
            style={{width: 400, height: 400}}
            onError = {(err)=> console.log(err)} />
            
            <NavLink 
            text = "Change Profile pic"
            routeName="Upload"
            />


            <View style = {styles.miniContainerStyle}>
            <Text h4>Name: </Text>
            <Text>{state.name}</Text>

            <Text h4>Surname: </Text>
            <Text>{state.surname}</Text>

            <Text h4>Department: </Text>
            <Text>{state.department}</Text>

            <Text h4>Company: </Text>
            <Text>{state.company}</Text>

            <Text h4>Email: </Text>
            <Text>{state.email}</Text>

            <Text h4>Role: </Text>
            <Text>{state.role}</Text>
            </View>
        </View>
     </ScrollView>
    </SafeAreaView>
}

ProfileScreen.navigationOptions = ()=>{
    return {
        tabBarLabel: "Profile",
        tabBarIcon: ()=> {
            return <MaterialIcons name="account-circle" size={24} color="black" />;
        }
    }
}

const styles = StyleSheet.create({
    containerStyle:{
        marginTop: 40,
        borderColor: 'black',
        borderWidth: 2,
        marginHorizontal: 5
    },
    miniContainerStyle:{
        paddingLeft: 20,
        marginTop: 40
    },
    linkStyle:{
        color: '#0000EE'
      }
});

export default ProfileScreen;