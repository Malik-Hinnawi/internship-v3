import React, {useContext} from "react";
import { View, StyleSheet} from "react-native";
import AddTownForm from "../components/AddTownForm";
import { Context as AuthContext } from "../context/AuthContext";
import { NavigationEvents } from "react-navigation";

const AdminstratorAddTownsScreenTr = ({navigation}) =>{
    const {state,clearErrorMessage, addTown} = useContext(AuthContext);
    const regionId = navigation.getParam("id");


    return <View style= {styles.containerStyle}>
        <NavigationEvents 
            onWillFocus={clearErrorMessage}     
        />

        <AddTownForm
            errorMessage = {state.errorMessage}
            onSubmit = {addTown}
            submitButtonPassed = "Şehir ekle"
            labels = {
                {
                    header: "Admin Şehir Ekle",
                    item: "Şehir adı:"
                }
            }
            token = {state.token}
            regionId = {regionId}
        />
    </View>
}

const styles = StyleSheet.create({
    containerStyle:{
        marginTop: 40
    }
});

export default AdminstratorAddTownsScreenTr;