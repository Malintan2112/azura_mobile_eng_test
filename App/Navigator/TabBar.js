import React from 'react';

import { View, Text, TouchableOpacity, Dimensions, Image } from 'react-native';
import { BoxShadow } from "react-native-shadow";
import { imageLoader } from 'App/Helpers/ImageLoader';
import * as Styles from 'App/Styles';
import { Icon } from 'native-base';

const { width, height } = Dimensions.get('window');

export default TabBar = ({ state, descriptors, navigation }) => {
    const focusedOptions = descriptors[state.routes[state.index].key].options;

    if (focusedOptions.tabBarVisible === false) {
        return null;
    }
    const shadowOpt = {
        width: width,
        height: 60,
        color: Styles.Colors.black,
        border: 20,
        radius: 1,
        opacity: 0.1,
        x: 0,
        y: 0,
        style: { marginVertical: 0 },
    };
    return (
        <BoxShadow setting={shadowOpt} >
            <View style={{ flexDirection: 'row', height: 60, width: '100%', alignSelf: 'center', alignItems: 'flex-end', backgroundColor: 'white', justifyContent: 'space-between', paddingVertical: 5 }}>
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const label =
                        options.tabBarLabel !== undefined
                            ? options.tabBarLabel
                            : options.title !== undefined
                                ? options.title
                                : route.name;

                    const isFocused = state.index === index;
                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name);
                        }
                    };
                    const onLongPress = () => {
                        navigation.emit({
                            type: 'tabLongPress',
                            target: route.key,
                        });
                    };
                    const icon = () => {
                        if (index == 0) return 'home';
                        if (index == 1) return 'person';
                    }
                    return (
                        <TouchableOpacity
                            key={"footer_tab" + index}
                            accessibilityRole="button"
                            accessibilityStates={isFocused ? ['selected'] : []}
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            testID={options.tabBarTestID}
                            onPress={onPress}
                            onLongPress={onLongPress}
                            style={{ justifyContent: "center", alignItems: "center", backgroundColor: 'white', height: 60, width: '50%', paddingTop: 5 }}
                        >
                            <View style={{ width: 20 }}>
                                <Icon ios={`ios-${icon()}`} android={`md-${icon()}`} style={{ fontSize: 20, color: isFocused ? Styles.Colors.primary : "#666666" }} />

                            </View>

                            <Text style={{ color: isFocused ? '#0065A1' : '#979DA0', fontSize: 12, fontWeight: '900', marginTop: 5 }}>
                                {label}
                            </Text>

                        </TouchableOpacity>
                    );
                })}
            </View>
        </BoxShadow>
    );
}

