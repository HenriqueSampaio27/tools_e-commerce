import react from "react"
import {createDrawerNavigator, DrawerContentScrollView, DrawerItem} from "@react-navigation/drawer"
import HomeDrawer from '../pages/homeDrawer'
import CustomDrawerComp from "../componets/CustomDrawerComp"
import FavoriteDrawer from "../pages/favoriteDrawer"
import IconM from 'react-native-vector-icons/MaterialIcons'
import IconMC from "react-native-vector-icons/MaterialCommunityIcons"
import IconI from 'react-native-vector-icons/Ionicons'
import RequestDrawer from "../pages/requestDrawer"
import CategoryDrawer from "../pages/categoryDrawer"
import SettingsDrawer from "../pages/settingsDrawer"
function DrawerRoutes(){
    
    const Drawer = createDrawerNavigator()
    
    return(
        <Drawer.Navigator 
        backBehavior={"firstRoute"}
        screenOptions={{headerShown: false, 
            drawerActiveBackgroundColor: "#2799F3",
            drawerActiveTintColor: "white",
            drawerInactiveTintColor: '#333',
            drawerLabelStyle: {marginLeft: -25, fontFamily: 'Montserrat-Medium', fontSize: 15, color: 'black'}}}
        initialRouteName="homeDrawer"
        defaultStatus={"closed"}
        drawerContent={(props) => <CustomDrawerComp {...props} />}
        >
            <Drawer.Screen
            name="Inicio"
            component={HomeDrawer}
            options={{
                drawerIcon: ({color}) => (
                    <IconI name="home-outline" color={color} size={30}/>
                )
            }}
            />
            <Drawer.Screen
            name="favoritos"
            component={FavoriteDrawer}
            options={{
                drawerIcon: ({color}) => (
                    <IconM name="favorite-border" color={color} size={30}/>
                )
            }}
            />
            <Drawer.Screen
            name="pedidos"
            component={RequestDrawer}
            options={{
                drawerIcon: ({color}) => (
                    <IconM name="list-alt" color={color} size={30}/>
                )
            }}
            />
            <Drawer.Screen
            name="categorias"
            component={CategoryDrawer}
            options={{
                drawerIcon: ({color}) => (
                    <IconM name="category" color={color} size={30}/>
                )
            }}
            />
            <Drawer.Screen
            name="configurações"
            component={SettingsDrawer}
            options={{
                drawerIcon: ({color}) => (
                    <IconI name="settings-outline" color={color} size={30}/>
                )
            }}
            />
        </Drawer.Navigator>
    )
}

export default DrawerRoutes