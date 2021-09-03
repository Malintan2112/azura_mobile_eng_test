import { Image, Modal, TouchableOpacity, View, StyleSheet, Dimensions, Text } from 'react-native'
import React, { useState } from 'react'
import * as Styles from 'App/Styles';
import {
    Body,
    Button,
    DatePicker,
    Header,
    Icon,
    Left,
    Right,
    Tab,
    TabHeading,
    Tabs,
    Title,
} from 'native-base';

const { width, height } = Dimensions.get('window');

export default function ImageZoom({ fadeDuration, source, style }) {
    const [loading, setLoading] = useState(false);
    const renderModalZoom = () => {
        let newSource = { ...source }
        if (newSource.uri) {
            newSource.uri = newSource.uri.replace('?x-oss-process=image/resize,h_500,m_lfit', '')
        }
        return (
            <Modal
                transparent={true}
                animationType="default"
                visible={loading}
                onRequestClose={() => { setLoading(false) }}>
                <TouchableOpacity onPress={() => { setLoading(false) }} style={styles.modalBackground}>
                    <Image
                        fadeDuration={fadeDuration ? fadeDuration : 0}
                        source={newSource}
                        style={
                            {
                                alignSelf: 'center',
                                resizeMode: 'contain',
                                width: '80%',
                                height: '80%'
                            }
                        }
                    />
                </TouchableOpacity>
            </Modal>
        )
    }
    return (
        <View>
            {renderModalZoom()}
            <TouchableOpacity style={style} onPress={() => {
                setLoading(true)
            }}>
                <Image
                    fadeDuration={fadeDuration ? fadeDuration : 0}
                    source={source}
                    style={style}
                />
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        height: height,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#00000040'
    },
    activityIndicatorWrapper: {
        backgroundColor: Styles.Colors.trueWhite,
        height: 50,
        width: 120,
        paddingHorizontal: 20,
        borderRadius: 65,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row'
    }
});