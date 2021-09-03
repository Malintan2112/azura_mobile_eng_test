import React, { useEffect, useMemo, useState } from 'react';
// NAVIGATION SETTING
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabBar from './TabBar';
// SESSION SETTING
import * as Sessions from 'App/Storages/Sessions';
// REDUX SETTING
import AppActions from 'App/Redux/Actions';
import { useDispatch, useSelector } from 'react-redux';
// PAGE 
import Home from 'App/Pages/Home/Home';
import Informasi from 'App/Pages/Informasi/Informasi';
import Profile from 'App/Pages/Profile/Profile';
import DetailTask from 'App/Pages/Task/DetailTask';
import Splash from 'App/Pages/Splash';
import ScanBarcode from 'App/Components/Widget/ScanBarcode/ScanBarcode';
import Login from 'App/Pages/Auth/Login';
import Register from 'App/Pages/Auth/Register';
import Welcome from '../Pages/Auth/Welcome';
import FormDailyReport from '../Pages/Task/FormDailyReport';
import Notification from '../Pages/Notifications/Notification';







// STACK NAVIGATION
const AuthStack = createStackNavigator();
const Tabs = createBottomTabNavigator();
const MainStack = createStackNavigator();

// DRAWER NAVIGATION
const Drawer = createDrawerNavigator();
// BOTTOM TABS
const TabsScreen = () => {
    const getTabBarVisibility = (route) => {
        try {
            const routeName = route.state
                ? route.state.routes[route.state.index].name
                : '';
            console.log(route.state.index)

            if (route.state.index == 0) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            return true;
        }
    }
    return (
        <Tabs.Navigator tabBar={props => <TabBar  {...props} />}>
            <Tabs.Screen
                name="Home"
                component={Home}
            />

            <Tabs.Screen
                name="Profile"
                component={Profile} />

        </Tabs.Navigator>
    )
}
// MAIN STACK
const MainStackScreen = () => (
    <MainStack.Navigator screenOptions={{ headerShown: false }}>
        <MainStack.Screen name="Tabs" component={TabsScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />
        <MainStack.Screen name="DetailTask" component={DetailTask} options={{ ...TransitionPresets.SlideFromRightIOS, }} />
        <MainStack.Screen name="ScanBarcode" component={ScanBarcode} options={{ ...TransitionPresets.SlideFromRightIOS, }} />
        <MainStack.Screen name="FormDailyReport" component={FormDailyReport} options={{ ...TransitionPresets.SlideFromRightIOS, }} />
        <MainStack.Screen name="Notification" component={Notification} options={{ ...TransitionPresets.SlideFromRightIOS, }} />

    </MainStack.Navigator>
)

// AUTH STACK
const AuthStackScreen = () => (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
        <AuthStack.Screen name={"Welcome"} component={Welcome} options={{ ...TransitionPresets.SlideFromRightIOS, }} />
        <AuthStack.Screen name={"Login"} component={Login} options={{ ...TransitionPresets.SlideFromRightIOS, }} />
        <AuthStack.Screen name="Register" component={Register} options={{ ...TransitionPresets.SlideFromRightIOS, }} />
    </AuthStack.Navigator>
);
// NAVIGATON OPTION
const NavigationApps = () => {
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    const isLogin = useSelector((state) => state.isLogin);
    const componentLoadSession = () => {
        Sessions.prepare().then(dataSession => {
            dispatch(AppActions.setLanguage(dataSession.LANGUAGE ? dataSession.LANGUAGE : 'id'));
            if (dataSession.IS_LOGIN) {
                dispatch(AppActions.login());
                dispatch(AppActions.setApiToken(dataSession.API_TOKEN));
                dispatch(AppActions.setUserData(dataSession.USER_DATA));

            }
        }).catch(err => {
        });
    }
    useEffect(() => {
        componentLoadSession()
        setTimeout(() => {
            setIsLoading(false)
        }, 2000)
    }, [])
    if (isLoading) {
        return <Splash />
    }
    return (
        <NavigationContainer>
            {isLogin ? MainStackScreen() : AuthStackScreen()}
        </NavigationContainer>
    )
}

export default NavigationApps;