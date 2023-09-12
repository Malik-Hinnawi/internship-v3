import React,{useState, useContext, useEffect} from "react";
import { View, StyleSheet, TouchableOpacity, FlatList} from "react-native";
import { Text} from "react-native-elements";
import { Context as AuthContext } from "../context/AuthContext";
import SearchBar from "../components/SearchBar";
import TownDisplay from "../components/TownDisplay";
import { Tab } from '@rneui/themed';
import { AntDesign } from '@expo/vector-icons'; 



const AdminstratorTownsPage = ({route, navigation}) =>{
    const [townsSearch, setTownsSearch] = useState('');
    const [index, setIndex] = useState(0);
    const [pageNum, setPageNum] = useState(1);
    const {state, getTowns} = useContext(AuthContext);
    const regionId = navigation.getParam("id");
    const cityId = navigation.getParam("cityId");
    const cityName = navigation.getParam("cityName");
    const regionName = navigation.getParam("regionName");

    useEffect(()=>{
        getTowns({authToken: state.token, cityId: cityId, regionId: regionId});
        const listener = navigation.addListener('didFocus',()=>{
            getTowns({authToken: state.token, cityId: cityId, regionId: regionId});
        });

        return ()=>{
            listener.remove();
        };
    },[]);
    
    return <View style = {styles.containerStyle}>

        <Text h2 style = {{textAlign: "center"}}>Adminstrator Towns page:</Text>

        <View style = {{flexDirection:"row", alignSelf:"center", marginVertical: 2}}>
            <Text style = {{textAlign:"center", color: "#993737"}}>City:  </Text>
            <Text style = {{textAlign:"center"}}>{cityName}</Text>
        </View>

        <View style = {{flexDirection:"row", alignSelf:"center", marginVertical: 2}}>
            <Text style = {{textAlign:"center", color: "#993737"}}>Region:  </Text>
            <Text style = {{textAlign:"center"}}>{regionName}</Text>
        </View>

        <View style = {{flexDirection: 'row', alignSelf:'center'}}>
            <TouchableOpacity onPress={()=> pageNum-1 > 0 ? setPageNum(pageNum - 1): null}>
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
        
        <SearchBar 
            term = {townsSearch} 
            onTermChange = {setTownsSearch} 
            onEndEditing = {()=>{}} 
            onTermAdd={()=> navigation.navigate("AdminstratorAddTowns", {id: regionId})}
            />

        <FlatList 
            data = {state.towns}
            keyExtractor = {(city) => city.id}
            renderItem = {({item}) =>{
                if(townsSearch == ""){
                    return( 
                    <TownDisplay
                        id = {item.id} 
                        name ={item.name}
                    />
                    )
                }
                if(item.name.toLowerCase().includes(townsSearch.toLowerCase())){
                    return( 
                        <TownDisplay
                            id = {item.id} 
                            name ={item.name}
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

export default AdminstratorTownsPage;