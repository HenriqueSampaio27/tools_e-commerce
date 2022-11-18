import react from "react"
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {createDrawerNavigator} from "@react-navigation/drawer"
import Home from '../pages/homeDrawer'
import Detail from '../pages/detail'
import DetailUp from "../pages/detailUp"
import Cart from "../pages/cart"
import Info_pay from "../pages/info_pay"
import Payment from "../pages/payment"
import Success_Payment from "../pages/success_payment"
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
                name="detailUp"
                component={DetailUp}
                options={{
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
                name='info_pay'
                component={Info_pay}
                options={{
                    headerShown: false
                }}
                />
                <Stack.Screen
                name="payment"
                component={Payment}
                options={{
                    headerShown: false
                }}
                />
                <Stack.Screen
                name="success_payment"
                component={Success_Payment}
                options={{
                    headerShown: false
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