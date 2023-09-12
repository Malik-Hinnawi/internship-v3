import React, {useState} from "react";
import { Text, Input, Button } from "react-native-elements";
import { StyleSheet } from "react-native";
import Spacer from "./Spacer";

const AddForm = ({ errorMessage, onSubmit, submitButtonPassed, labels, token})=>{
const [item, setItem] = useState("");

return <>
 <Spacer>
      <Text h3 style= {styles.headerStyle}>{labels.header}</Text>  
    </Spacer>
      <Input 
        label = {labels.item}
        value = {item}
        onChangeText = {setItem}
        autoCorrect = {false}
        autoCapitalize = "none"
        />
    <Spacer />

    {errorMessage
      ?<Text style = {styles.errorMessage}>{errorMessage}</Text>
      :null
    }

    <Spacer>
      <Button 
        title = {submitButtonPassed}
        onPress = {()=> onSubmit({authToken: token, name: item})}
      />
    </Spacer>
</>
} ;

const styles = StyleSheet.create({
    errorMessage:{
        fontSize: 16,
        color: 'red',
        padding: 10
    },
    headerStyle:{
      textAlign: "center"
    }
});

export default AddForm;