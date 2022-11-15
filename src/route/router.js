import react from "react"
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {createDrawerNavigator} from "@react-navigation/drawer"
import Home from '../pages/homeDrawer'
import Detail from '../pages/detail'
import Cart from "../pages/cart"
import Finish from "../pages/finish"
import Address from "../pages/address"
import Search from "../pages/search"
import Login from "../pages/login"
import Registration from "../pages/registration"
import TransitionScreen from "../pages/transitionScreen"
import RecoverPassword from "../pages/recoverPassword"
import DrawerRoutes from "./drawerRouter"

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator()

function Router(){

    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="drawer">
                <Stack.Screen
                name="transitionScreen"
                component={TransitionScreen}
                options = {{
                    headerShown: false
                }}
                />
                <Stack.Screen
                name= "login"
                component={Login}
                options= {{
                    headerShown: false
                }}
                />
                <Stack.Screen
                name= "registration"
                component={Registration}
                options= {{
                    headerShown: false
                }}
                />
                <Stack.Screen
                name="recoverPassword"
                component={RecoverPassword}
                options={{
                    headerShown: false
                }}
                />
                <Stack.Screen 
                name= "detail" 
                component={Detail}
                options= {{
                    headerShown: false
                }}
                />
                <Stack.Screen
                name= "address"
                component={Address}
                options={{
                    headerShown: false
                }}
                />
                <Stack.Screen
                name='cart'
                component={Cart} 
                options={{
                    headerShown: false
                }}               
                />
                <Stack.Screen
                name='search'
                component={Search} 
                options={{
                    headerShown: false
                }}      
                />
                <Stack.Screen
                name='finish'
                component={Finish}
                options={{
                    title: "Finalizar",
                    headerTintColor: 'red'
                }}
                />
                <Stack.Screen
                name="drawer" 
                component={DrawerRoutes} 
                options={{
                    headerShown: false
                }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Router