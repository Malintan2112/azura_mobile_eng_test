import React, { useEffect, useMemo, useState } from 'react';
// NAVIGATION SETTING
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
// SESSION SETTING
import * as Sessions from 'App/Storages/Sessions';
// REDUX SETTING
import AppActions from 'App/Redux/Actions';
import { useDispatch, useSelector } from 'react-redux';
// PAGE 

import Splash from 'App/Containers/Splash';
import WelcomePage from '../Containers/WelcomePage';
import SearchPage from '../Containers/SearchPage';
import DetailPage from '../Containers/DetailPage';






// STACK NAVIGATION
const Main = createStackNavigator();
// Main STACK
const MainScreen = () => (
    <Main.Navigator screenOptions={{ headerShown: false }}>
        <Main.Screen name={"WelcomePage"} component={WelcomePage} options={{ ...TransitionPresets.SlideFromRightIOS, }} />
        <Main.Screen name={"SearchPage"} component={SearchPage} options={{ ...TransitionPresets.SlideFromRightIOS, }} />
        <Main.Screen name={"DetailPage"} component={DetailPage} options={{ ...TransitionPresets.SlideFromRightIOS, }} />
    </Main.Navigator>
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
            {MainScreen()}
        </NavigationContainer>
    )
}

export default NavigationApps;