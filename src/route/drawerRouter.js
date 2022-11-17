import react from "react"
import {View} from 'react-native'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {createDrawerNavigator, DrawerContentScrollView, DrawerItem} from "@react-navigation/drawer"
import HomeDrawer from '../pages/homeDrawer'
import CustomDrawerComp from "../componets/CustomDrawerComp"
import Detail from '../pages/detail'
import Cart from "../pages/cart"
import Finish from "../pages/info_pay"
import Address from "../pages/address"
import Search from "../pages/search"
import Login from "../pages/login"
import Registration from "../pages/registration"
import TransitionScreen from "../pages/transitionScreen"
import RecoverPassword from "../pages/recoverPassword"

function DrawerRoutes(){
    
    const Drawer = createDrawerNavigator()
    
    return(
        <Drawer.Navigator 
        backBehavior={"firstRoute"}
        screenOptions={{headerShown: false}}
        initialRouteName="homeDrawer"
        defaultStatus={"closed"}
        drawerContent={(props) => <CustomDrawerComp {...props} />}
        >
            <Drawer.Screen
            name="homeDrawer"
            component={HomeDrawer}
            />
               
        </Drawer.Navigator>
    )
}

export default DrawerRoutes