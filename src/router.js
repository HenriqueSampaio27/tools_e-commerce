import react from "react"
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Home from './pages/home'
import Detail from './pages/detail'
import Cart from "./pages/cart"
import Finish from "./pages/finish"
import Address from "./pages/address"
import Search from "./pages/search"
import Login from "./pages/login"
import Registration from "./pages/registration"
import TransitionScreen from "./pages/transitionScreen"
import RecoverPassword from "./pages/recoverPassword"

const Stack = createNativeStackNavigator();

function Router(){

    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="login">
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
                name= "home" 
                component={Home}
                options= {{
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
                    title: "Endereço",
                    headerTintColor: 'red'
                }}
                />
                <Stack.Screen
                name='cart'
                component={Cart} 
                options={{
                    title: "Carrinho",
                    headerTintColor: 'red'
                }}               
                />
                <Stack.Screen
                name='search'
                component={Search} 
                options={{
                    title: ""
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
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Router