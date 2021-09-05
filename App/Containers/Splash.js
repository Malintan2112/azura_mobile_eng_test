import React, { useEffect } from 'react'
import { Image, StatusBar, Text, View, Dimensions } from 'react-native'
import { fcmService } from 'App/Helpers/FCMService';
import { localNotificationService } from 'App/Helpers/LocalNotificationService';
import * as Hooks from 'App/Helpers/Hooks';
import * as Styles from 'App/Styles';
const { width, height } = Dimensions.get('window');
import PushNotification from "react-native-push-notification";


const TAG = "Splash Page";



const Splash = () => {

    useEffect(() => {

        initFCM()
    }, [])

    const initFCM = () => {
        PushNotification.createChannel(
            {
                channelId: "Malintan2112", // (required)
                channelName: "JNE-123", // (required)
                channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
                playSound: true, // (optional) default: true
                soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
                vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
            },
            (created) => console.log(`ini chanel '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
        );

        return new Promise(resolve => {
            fcmService.registerAppWithFCM();
            fcmService.register(onRegister, onNotification, onOpenNotification);
            localNotificationService.configure(onOpenNotification);
            resolve(true);
            function onRegister(token) {
                Hooks.consoleLog(TAG + "FCM onRegister: ", token);
            }
            function onNotification(notify) {
                Hooks.consoleLog(TAG + "FCM onNotification: ", notify);
                let notify1 = notify.notification;
                const options = {
                    soundName: 'default',
                    playSound: true,
                    largeIcon: 'ic_launcher', // add icon large for Android (Link: app/src/main/mipmap)
                    smallIcon: 'ic_launcher' // add icon small for Android (Link: app/src/main/mipmap)
                }
                localNotificationService.showNotification(
                    0,
                    notify1.title,
                    notify1.body,
                    notify1,
                    options
                )
            }
            function onOpenNotification(notify) {
                Hooks.consoleLog(TAG + "FCM onOpenNotification: ", notify);
            }
        });
    }

    return (
        <View style={[Styles.Helpers.fullSize, Styles.Helpers.center, { backgroundColor: Styles.Colors.trueWhite, justifyContent: 'space-between', paddingTop: height * 0.4, paddingBottom: 20 }]}>
            <StatusBar translucent backgroundColor={Styles.Colors.primary} />
            <Image source={Styles.Images.logo} style={{ width: 100, height: 100,borderRadius:50 }} />
            <Text style={{ fontSize: 12, color: Styles.Colors.black }}>PT. Insan Membangun Bangsa</Text>
        </View>
    )

}


export default Splash;