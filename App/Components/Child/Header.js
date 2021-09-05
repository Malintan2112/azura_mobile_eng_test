import React from 'react'
import * as Animatable from 'react-native-animatable'
import * as Styles from 'App/Styles'
import { Icon } from 'native-base'

import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions
} from 'react-native'
const { width } = Dimensions.get('window')

export default Header = ({ navigation, dir, title }) => {
    return (
        <TouchableOpacity style={localStyles.containerBack} onPress={() => { navigation.pop() }}>
            <Animatable.View animation={'slideInRight'} style={localStyles.containerBackRow}>
                <View style={localStyles.btnBack} >
                    <Icon type="FontAwesome" name="chevron-left" style={localStyles.iconChevronBack} />
                </View>
                <View style={localStyles.containerBackRowHalfRight}>
                    <Text style={{ fontSize: 12, color: Styles.Colors.black, fontWeight: "800",width:'70%' }} numberOfLines={1}>{dir ? dir : 'Search Page'}</Text>
                    <Text style={{ fontSize: 20, color: Styles.Colors.black, fontWeight: "bold", marginTop: -5 }}>{title}</Text>
                </View>
            </Animatable.View>
        </TouchableOpacity>
    )
}

const localStyles = StyleSheet.create({
    defaultBackground: {
        backgroundColor: Styles.Colors.trueWhite,
        height: '100%',
        width: '100%'
    },
    containerBack: {
        width: '100%',
        backgroundColor: Styles.Colors.trueWhite,
        paddingVertical: 10
    },
    containerBackRow: {
        flexDirection: 'row',
        paddingHorizontal: 15,
        alignItems: 'center'
    },
    btnBack: {
        width: 45,
        elevation: 5,
        height: 45,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: Styles.Colors.trueWhite
    },
    iconChevronBack: {
        fontSize: 15,
        color: Styles.Colors.black,
        marginRight: 5,
    },
    containerBackRowHalfRight: {
        width: width * 0.8,
        marginLeft: 10
    }
})