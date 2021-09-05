import React from 'react';

import { imageLoader } from 'App/Helpers/ImageLoader';
// STYLING USING
import * as Styles from 'App/Styles';
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    Dimensions,
    StatusBar,
    StyleSheet
} from 'react-native';
import { Icon } from 'native-base';
import * as Animatable from 'react-native-animatable';
const { width, height } = Dimensions.get('window');


export default WelcomePage = ({ navigation }) => {
    const option = [
        {
            title: "Search by country",
            navigate: 'SearchPage',
            params: { title: 'Search By Country', type: 'country' },
            icon: "globe-americas"
        },
        {
            title: "Search by name ",
            navigate: 'SearchPage',
            params: { title: 'Search By Name', type: 'teams-search' },
            icon: 'futbol'
        }
    ]
    return (
        <View style={localStyles.baseContainer} >
            <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
            <ImageBackground
                source={imageLoader(Styles.Images.welcome_background)}
                style={localStyles.imageBakckgroundSize}
                resizeMode={'contain'}>
                <View style={localStyles.innerContainer}>
                    <Animatable.View animation={'slideInDown'} style={localStyles.animatebleContainerHeader}>
                        <Text style={localStyles.textWelcome} allowFontScaling={false}>
                            Welcome to Apps
                        </Text>
                        <Text style={localStyles.headerText} allowFontScaling={false}>
                            Finding Soccer
                        </Text>
                        <Text style={localStyles.descText} allowFontScaling={false}>
                            we provide you with the latest information about domestic and foreign football
                        </Text>
                    </Animatable.View>
                    <Animatable.Image
                        animation={'slideInDown'}
                        source={imageLoader(Styles.Images.events)}
                        style={localStyles.imgFootball} />
                    <Text style={localStyles.descFeatureText} allowFontScaling={false}>
                        Let's find your fovorite team
                    </Text>
                    <View style={localStyles.optionFeature}>
                        {option.map((data, index) => (
                            <TouchableOpacity
                                key={`${index}option_welcome`}
                                style={{ width: '49%' }}
                                onPress={() => {
                                    navigation.navigate(data.navigate, { ...data.params })
                                }} >
                                <View
                                    style={localStyles.containBTN}>
                                    <Text style={localStyles.textTitle} allowFontScaling={false} numberOfLines={1}>{data.title}</Text>
                                    <Icon type="FontAwesome5" name={data.icon} style={localStyles.iconOption} />
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}

const localStyles = StyleSheet.create({
    containBTN: {
        width: '100%',
        alignSelf: 'center',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        borderRadius: 5,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 15,
        backgroundColor: Styles.Colors.black
    },
    baseContainer: {
        backgroundColor: 'white',
        height: '100%',
        width: '100%'
    },
    imageBakckgroundSize: {
        width: '100%',
        height: height
    },
    innerContainer: {
        flex: 1,
        padding: 30,
        borderBottomRightRadius: width * 0.5,
        justifyContent: "center"
    },
    animatebleContainerHeader: {
        marginTop: -50,
        marginBottom: 20
    },
    textWelcome: {
        color: Styles.Colors.black,
        fontSize: 20
    },
    descText: {
        color: Styles.Colors.gray_var1,
        fontSize: 14,
        marginTop: 20
    },
    imgFootball: {
        width: 240,
        height: 220,
        alignSelf: 'center',
        marginVertical: 20
    },
    optionFeature: {
        marginTop: 10,
        flexDirection: "row",
        width: '100%',
        justifyContent: "space-between"
    },
    descFeatureText: {
        color: Styles.Colors.gray_var1,
        fontSize: 12,
        marginTop: 70
    },
    headerText: {
        color: Styles.Colors.black,
        fontSize: 40,
        fontWeight: 'bold'
    },
    dummyIcon: {
        fontSize: 15,
        color: Styles.Colors.primary,
        opacity: 0
    },
    textTitle: {
        color: Styles.Colors.trueWhite,
        fontWeight: "700",
        fontSize: 13,
    },
    iconOption: { 
        fontSize: 15, 
        color: Styles.Colors.trueWhite,
         marginRight: 5
         }
})