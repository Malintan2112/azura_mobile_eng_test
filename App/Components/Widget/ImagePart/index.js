import React from 'react'
import { Image, View } from 'react-native';
import { imageLoader } from 'App/Helpers/ImageLoader';
// STYLING USING
import * as Styles from 'App/Styles';


export default function ImagePart({ source, width, height, style, resizeMode }) {
    return (
        <View>
            <Image
                source={imageLoader(source == '' ? Styles.Images.no_image : source)}
                style={[{ width, height }, style, { alignSelf: 'center' }, { resizeMode: resizeMode ?? 'contain' }]} />
        </View>
    )
}
