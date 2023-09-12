import React, {useContext} from "react";
import { View, StyleSheet} from "react-native";
import AddRegionsForm from "../components/AddRegionsForm";
import { Context as AuthContext } from "../context/AuthContext";
import { NavigationEvents } from "react-navigation";

const AdminstratorAddRegionsScreen = ({navigation}) =>{
    const {state,clearErrorMessage, addRegion} = useContext(AuthContext);
    const cityId = navigation.getParam("id");


    return <View style= {styles.containerStyle}>
        <NavigationEvents 
            onWillFocus={clearErrorMessage}     
        />

        <AddRegionsForm
            errorMessage = {state.errorMessage}
            onSubmit = {addRegion}
            submitButtonPassed = "Add Region"
            labels = {
                {
                    header: "Adminstrator Region Add",
                    item: "Region name:"
                }
            }
            token = {state.token}
            cityId = {cityId}
        />
    </View>
}

const styles = StyleSheet.create({
    containerStyle:{
        marginTop: 40
    }
});

export default AdminstratorAddRegionsScreen;