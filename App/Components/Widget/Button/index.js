import React from 'react'
import { TouchableOpacity, View, Text } from 'react-native';
import * as Styles from 'App/Styles';
import * as Hooks from 'App/Helpers/Hooks';

const TAG = "Button Part Component"


function Button({ title = '', width = 50, height = 20, borderRadius = 0, onPress, backgroundColor = Styles.Colors.prmary, textColor = 'white', style = {} }) {
    Hooks.consoleLog(TAG, `title : ${title}`)
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={[Styles.Helpers.center, { height, width, borderRadius, backgroundColor }, style]}>
                <Text style={{ color: textColor }}>{title}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default Button
