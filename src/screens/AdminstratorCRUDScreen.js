import React,{useState, useContext, useEffect} from "react";
import { View, StyleSheet, TouchableOpacity, FlatList} from "react-native";
import { Text} from "react-native-elements";
import { Entypo } from '@expo/vector-icons';
import { Context as AuthContext } from "../context/AuthContext";
import SearchBar from "../components/SearchBar";
import CityDisplay from "../components/CityDisplay";
import { Tab } from '@rneui/themed';
import { AntDesign } from '@expo/vector-icons'; 


const AdminstratorCRUDScreen = ({navigation}) =>{
    const [citySearch, setCitySearch] = useState('');
    const [index, setIndex] = useState(0);
    const [pageNum, setPageNum] = useState(0);
    const {state, getCities} = useContext(AuthContext);
    
    useEffect(()=>{
        var pageSize = 5;
        switch(index){
            case 0:
                pageSize = 5;
                break;
            case 1:
                pageSize = 10;
                break;
            case 2:
                pageSize = 20;
                break;
            case 3:
                pageSize = 50;
                break;
        }

        getCities({authToken: state.token, page: pageNum, pageSize: pageSize});
        const listener = navigation.addListener('didFocus',()=>{
            getCities({authToken: state.token, page: pageNum, pageSize: pageSize});
        });

        return ()=>{
            listener.remove();
        };
    },[index, pageNum]);
    
    return <View style = {styles.containerStyle}>
        
        <TouchableOpacity onPress= {()=> navigation.navigate("Profile")}>
            <Entypo name="home" size={24} color="black" />
        </TouchableOpacity>

        <Text h2 style = {{textAlign: "center"}}>Adminstrator page:</Text>
        <View style = {{flexDirection: 'row', alignSelf:'center'}}>
            <TouchableOpacity onPress={()=> pageNum > 0 ? setPageNum(pageNum - 1): null}>
                <AntDesign name="leftcircle" size={24} color="black" />
            </TouchableOpacity>
            <View style = {styles.rectangleStyle}>
                <Text style = {styles.pageStyle}>Page number: </Text>
                <Text style = {styles.spacingStyle}>{pageNum}</Text> 
            </View>
            <TouchableOpacity onPress={()=> setPageNum(pageNum + 1)}>
                <AntDesign name="rightcircle" size={24} color="black" />
            </TouchableOpacity>
        </View>
        
        <Text style = {styles.pageStyle}>Page Size:</Text>
            <Tab value={index} onChange={setIndex} dense>
                <Tab.Item>5</Tab.Item>
                <Tab.Item>10</Tab.Item>
                <Tab.Item>20</Tab.Item>
                <Tab.Item>50</Tab.Item>
            </Tab>

            
            
        
        <SearchBar term = {citySearch} 
            onTermChange = {setCitySearch} 
            onEndEditing = {()=>{}} 
            onTermAdd={()=>navigation.navigate("AdminstratorAdd")}
            />

        <FlatList 
            data = {state.cities}
            keyExtractor = {(city) => city.id}
            renderItem = {({item}) =>{
                if(citySearch == ""){
                    return( 
                    <CityDisplay
                        id = {item.id} 
                        name ={item.name}
                        navigate={()=> navigation.navigate("AdminstratorRegions", {"id": item.id, "cityName": item.name})}
                    />
                    )
                }
                if(item.name.toLowerCase().includes(citySearch.toLowerCase())){
                    return( 
                        <CityDisplay
                            id = {item.id} 
                            name ={item.name}
                            navigate={()=> navigation.navigate("AdminstratorRegions", {"id": item.id, "cityName": item.name})}
                        />
                    )
                }
            }
        }
        />
    </View>
}

const styles = StyleSheet.create({
    containerStyle: {
        marginTop: 35
    },
    iconStyle:{
        alignSelf: 'center'
    },
    pageStyle:{
        fontWeight:'bold',
        marginLeft: 15,
    },
    spacingStyle:{
        marginRight: 15
    },
    rectangleStyle:{
        borderColor: 'black',
        borderWidth: 1,
        flexDirection: 'row',
        marginHorizontal: 15,
        alignContent: 'center',

    }
});

export default AdminstratorCRUDScreen;