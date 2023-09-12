import React, {useContext} from "react";
import { View, StyleSheet} from "react-native";
import AddForm from "../components/AddForm";
import { Context as AuthContext } from "../context/AuthContext";
import { NavigationEvents } from "react-navigation";

const AdminstratorAddScreen = () =>{
    const {state,clearErrorMessage, addCity} = useContext(AuthContext);

    return <View style= {styles.containerStyle}>
        <NavigationEvents 
            onWillFocus={clearErrorMessage}     
        />

        <AddForm
            errorMessage = {state.errorMessage}
            onSubmit = {addCity}
            submitButtonPassed = "Add City"
            labels = {
                {
                    header: "Adminstrator City Add",
                    item: "City name:"
                }
            }
            token = {state.token}
        />
    </View>
}

const styles = StyleSheet.create({
    containerStyle:{
        marginTop: 40
    }
});

export default AdminstratorAddScreen;