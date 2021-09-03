import React from 'react';

import { imageLoader } from '../../Helpers/ImageLoader';
// STYLING USING
import * as Styles from 'App/Styles';

import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    Dimensions,
    Image,
    StatusBar
} from 'react-native';
import { Icon } from 'native-base';
import * as Animatable from 'react-native-animatable';
const { width, height } = Dimensions.get('window');


export default Welcome = ({ navigation }) => {

    return (
        <View style={{ backgroundColor: 'white', height: '100%', width: '100%' }} >
            <StatusBar backgroundColor={"#2C6397"} />
            <ImageBackground source={imageLoader(Styles.Images.welcome_background)} style={{ width: '100%', height: height, }}>
                <View style={{ flex: 1, padding: 30, borderBottomRightRadius: width * 0.5, justifyContent: "center" }}>
                    <Animatable.View animation={'slideInDown'} style={{ marginTop: -50, marginBottom: 20 }}>
                        <Text style={{ color: "white", fontSize: 15 }}>
                            Selamat datang di Apps
                        </Text>
                        <Text style={{ color: "white", fontSize: 40 }}>
                            Daily Reports
                        </Text>
                        <Text style={{ color: "white", fontSize: 17, marginTop: 20 }}>
                            Lebih mudah, cepat dan efisiensi untuk meningkatkan kinerja anda
                        </Text>
                    </Animatable.View>
                    <Animatable.Image animation={'slideInDown'} source={imageLoader(Styles.Images.events)} style={{ width: 240, height: 220, alignSelf: 'center', marginVertical: 20 }} />

                    <View style={{ marginTop: 70, alignSelf: 'center' }}>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')} >
                            <Animatable.View animation={'slideInUp'} style={{ flexDirection: 'row', width: 190, paddingHorizontal: 20, height: 50, backgroundColor: 'white', borderRadius: 10, alignItems: 'center', justifyContent: 'space-between' }}>
                                <Icon ios={`ios-people`} android={`md-people`} style={{ fontSize: 20, color: Styles.Colors.primary }} />
                                <Text style={{ color: Styles.Colors.primary, fontWeight: "700", fontFamily: 'Montserrat-SemiBold', fontSize: 14, }}>Oke, Lanjutkan</Text>
                                <View>
                                    <Icon type="FontAwesome" name="chevron-right" style={{ fontSize: 15, color: Styles.Colors.primary, }} />
                                </View>
                            </Animatable.View>
                        </TouchableOpacity>



                    </View>
                </View>
            </ImageBackground>

        </View>
    )
}