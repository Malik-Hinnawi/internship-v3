import React, {useContext} from "react";
import { View, StyleSheet} from "react-native";
import AddForm from "../components/AddForm";
import { Context as AuthContext } from "../context/AuthContext";
import { NavigationEvents } from "react-navigation";

const AdminstratorAddScreenTr = () =>{
    const {state,clearErrorMessage, addCity} = useContext(AuthContext);

    return <View style= {styles.containerStyle}>
        <NavigationEvents 
            onWillFocus={clearErrorMessage}     
        />

        <AddForm
            errorMessage = {state.errorMessage}
            onSubmit = {addCity}
            submitButtonPassed = "İl Ekle"
            labels = {
                {
                    header: "Admin İl Ekle",
                    item: "İl adı:"
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

export default AdminstratorAddScreenTr;