import React, { useState, useCallback } from 'react'
import { Container, Header, Left, Body, Right, Button, Icon, Title, Content } from 'native-base';
import { Image, Text, TouchableOpacity, View, StatusBar, TextInput, ScrollView, Dimensions, StyleSheet, FlatList } from 'react-native';
import { createRequestGlobalTimeOut } from 'App/Helpers/Http';

// STYLING USING
import * as Styles from 'App/Styles';
// REDUX USING
import AppActions from 'App/Redux/Actions';
import { useDispatch, } from 'react-redux';
import { useSelector } from 'react-redux';
// Components
import { selectImage } from 'App/Helpers/ImageLoader';
import * as Hooks from 'App/Helpers/Hooks';
import ImagePart from 'App/Components/Widget/ImagePart';
import { imageLoader } from '../../Helpers/ImageLoader';
import RNPickerSelect from 'App/Components/Widget/PickerSelect';
import ImageZoom from 'App/Components/Widget/ImageZoom';

import * as Animatable from 'react-native-animatable';

const { width, height } = Dimensions.get('window');

export default function DetailTask(props) {
    const dispatch = useDispatch();
    const [data] = useState(props.route.params.data);


    const login = () => {
        dispatch(AppActions.login());
    }
    const loginFetch = () => {
        setLoading(true);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };
        const link = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${apiKey}`;
        const method = 'POST';
        const params = {
            headers,
            link,
            method
        }
        createRequestGlobalTimeOut(params, 3000).then((res) => {

        });
    }
        ;
    return (
        <Container>
            <View style={[Styles.Helpers.fullSize, Styles.Helpers.center, { backgroundColor: Styles.Colors.trueWhite, height: width * 0.8, flex: 1, position: "relative" }]}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ height: 100 }}>
                    </View>
                    <View style={{ width: width * 0.8, marginHorizontal: width * 0.1, marginVertical: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View>
                            <Text style={{ fontSize: 12, color: Styles.Colors.gray_var1, }}>Start Date : </Text>
                            <Text style={{ fontSize: 20, color: Styles.Colors.black, marginTop: 3 }}>{Hooks.formatDate2(data.start_date)} </Text>
                        </View>
                    </View>
                    <View style={{ width: width * 0.8, marginHorizontal: width * 0.1, marginVertical: 10 }}>
                        <Text style={{ fontSize: 12, color: Styles.Colors.gray_var1, }}>Title  </Text>
                        <Text style={{ fontSize: 15, color: Styles.Colors.black, }}>{data.title} </Text>
                    </View>

                    <View style={{ width: width * 0.8, marginHorizontal: width * 0.1, marginTop: 10 }}>
                        <Text style={{ fontSize: 12, color: Styles.Colors.gray_var1, }}>Evidence : </Text>

                        {/* <Image source={{ uri: data.evidence }} style={{ width: '100%', height: 200, borderRadius: 10, marginTop: 10 }} /> */}
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 10, }}>
                        <FlatList
                            keyExtractor={(item, index) => "image" + "_" + index}
                            data={data.evidence} horizontal={true} renderItem={({ item, index }) => {
                                return (<View style={{ width: 100, height: 100, backgroundColor: Styles.Colors.gray_var1, borderRadius: 10, marginRight: 10, marginLeft: index == 0 ? width * 0.1 : 0 }}>
                                    <ImageZoom source={{ uri: item }} style={{ width: 100, height: 100, borderRadius: 10, }} />
                                </View>)
                            }} />
                    </View>
                    <View style={{ width: width * 0.8, marginHorizontal: width * 0.1, marginVertical: 10 }}>
                        <Text style={{ fontSize: 12, color: Styles.Colors.gray_var1, }}>Note  </Text>
                        <Text style={{ fontSize: 15, color: Styles.Colors.black, marginTop: 3 }}>{data.note} </Text>
                    </View>
                </ScrollView>
                <TouchableOpacity style={{ top: 0, left: 20, position: 'absolute', width: '100%', backgroundColor: Styles.Colors.trueWhite, paddingTop: 20 }} onPress={() => { props.navigation.pop() }}>
                    <Animatable.View animation={'slideInRight'} style={{ flexDirection: 'row' }}>
                        <View style={{ width: 45, elevation: 5, height: 45, borderRadius: 25, justifyContent: "center", alignItems: 'center', backgroundColor: Styles.Colors.trueWhite, }} >
                            <Icon type="FontAwesome" name="chevron-left" style={{ fontSize: 15, color: Styles.Colors.black, marginRight: 5, }} />
                        </View>
                        <View style={{ width: width * 0.8, marginLeft: 10, marginBottom: 40, }}>
                            <Text style={{ fontSize: 12, color: Styles.Colors.black, fontWeight: "800" }}>Detail Task</Text>
                            <Text style={{ fontSize: 30, color: Styles.Colors.black, fontWeight: "bold", marginTop: -5 }}>Daily Reports   </Text>
                        </View>
                    </Animatable.View>
                </TouchableOpacity>

            </View>
        </Container>
    )
}

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        alignContent: 'center',
        alignItems: 'center',
        height: 45,
        fontSize: 12,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: Styles.Colors.gray_var3,
        borderRadius: 5,
        color: Styles.Colors.black,
        backgroundColor: Styles.Colors.trueWhite,
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        width: width * 0.8,
        alignContent: 'center',
        alignItems: 'center',
        height: 45,
        fontSize: 12,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: Styles.Colors.gray_var3,
        borderRadius: 5,
        color: Styles.Colors.black,
        backgroundColor: Styles.Colors.trueWhite,
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    placeholder: {
        color: Styles.Colors.gray_var1
    }
});