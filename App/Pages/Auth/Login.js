import React, { useState, useCallback } from 'react'
import { Container, Header, Left, Body, Right, Button, Icon, Title, Content } from 'native-base';
import { Image, Text, TouchableOpacity, View, StatusBar, TextInput, ScrollView, ActivityIndicator, Alert } from 'react-native';
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
import * as Animatable from 'react-native-animatable';

export default function Login(props) {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [secureText, setSecureText] = useState(true);


    const login = () => {
        loginFetch()
        // Alert.alert(
        //     "Daily Reports Message",
        //     "I'm sorry, user not found",
        //     [
        //         {
        //             text: "Cancel",
        //             onPress: () => console.log("Cancel Pressed"),
        //             style: "cancel"
        //         },
        //         { text: "OK", onPress: () => console.log("OK Pressed") }
        //     ]
        // );
        // setLoading(true);
        // dispatch(AppActions.login());
    }

    const loginFetch = () => {
        setLoading(true);
        fetch("https://malintan-projects.com/public/api/auth/login", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: name,
                password: password
            })
        })

            .then((response) => response.json())
            .then((responseData) => {
                console.log(responseData)
                if (!responseData.status) {
                    setLoading(false)
                    Alert.alert(
                        "Daily Reports Message",
                        "I'm sorry, user not found",
                        [
                            {
                                text: "Cancel",
                                onPress: () => console.log("Cancel Pressed"),
                                style: "cancel"
                            },
                            { text: "OK", onPress: () => console.log("OK Pressed") }
                        ]
                    );
                } else {
                    dispatch(AppActions.login());
                    dispatch(AppActions.setApiToken(responseData.data.token));
                    dispatch(AppActions.setUserData(responseData.data.user));
                    setLoading(false)
                }

            }).catch(() => {


            })
            .done();

    }


    return (
        <Container>
            <Content>
                <View style={[Styles.Helpers.fullSize, { backgroundColor: Styles.Colors.trueWhite, height: '100%', flex: 1, alignItems: "center", position: 'relative' }]}>

                    <View style={{ width: '80%', marginLeft: 10, marginBottom: 10, marginTop: 100, }}>
                        <Text style={{ fontSize: 16, color: Styles.Colors.black, fontWeight: "800" }}>Login Karyawan </Text>
                        <Text style={{ fontSize: 50, color: Styles.Colors.black, fontWeight: "bold" }}>Daily Reports   </Text>
                    </View>
                    <TouchableOpacity style={{ width: '80%', marginBottom: 30 }} onPress={() => { props.navigation.pop() }}>
                        <Animatable.View animation={'slideInRight'} style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Animatable.View style={{ width: 45, elevation: 5, height: 45, borderRadius: 25, justifyContent: "center", alignItems: 'center', backgroundColor: Styles.Colors.trueWhite, }} >
                                <Image source={Styles.Images.logo} style={{ width: 45, height: 45, borderRadius: 25, resizeMode: 'cover' }} />
                            </Animatable.View>
                            <Text style={{ marginLeft: 10, fontSize: 15, color: Styles.Colors.black }}>PT Tiki Jalur Nugraha Ekakurir (JNE)</Text>
                        </Animatable.View>
                    </TouchableOpacity>
                    <View style={{ width: '80%', marginLeft: 10, marginVertical: 10 }}>
                        <Text style={{ fontSize: 12, color: Styles.Colors.gray_var1, }}>Email : </Text>
                    </View>
                    <View style={[{ width: '80%', height: 45, borderWidth: 1, borderColor: '#d8d8d8', borderRadius: 10, paddingHorizontal: 20, justifyContent: 'center' }]}>
                        <TextInput
                            placeholder="Input Your Email "
                            style={{ fontSize: 12 }}
                            value={name}
                            onChangeText={(text) => setName(text)}
                        />
                    </View>
                    <View style={{ width: '80%', marginLeft: 10, marginVertical: 10 }}>
                        <Text style={{ fontSize: 12, color: Styles.Colors.gray_var1 }}>Password : </Text>
                    </View>
                    <View style={[{ width: '80%', height: 45, borderWidth: 1, borderColor: '#d8d8d8', borderRadius: 10, paddingHorizontal: 20, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }]}>
                        <TextInput
                            placeholder="Input Your Password "
                            style={{ fontSize: 12 }}
                            value={password}
                            secureTextEntry={secureText}
                            onChangeText={(text) => setPassword(text)}
                        />
                        <TouchableOpacity onPress={() => setSecureText(curret => !curret)}>
                            <Icon
                                name={secureText ? "eye-slash" : 'eye'}
                                type={'FontAwesome'}
                                style={{
                                    color: Styles.Colors.darkGray_var2,
                                    fontSize: 20,
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        onPress={login}
                        disabled={name === '' || password === '' || isLoading}
                        style={[{ width: "100%", alignItems: "center", marginTop: 30, }]}>
                        <View style={[{ width: '80%', height: 45, backgroundColor: Styles.Colors.primary, borderRadius: 10, justifyContent: "center", opacity: name === '' || password === '' || isLoading ? 0.5 : 1 }]}>
                            {isLoading ? (<ActivityIndicator size="small" color="white" />) : (<Text style={{ textAlign: 'center', color: "white", fontWeight: "700" }}>Login</Text>)}
                        </View>
                    </TouchableOpacity>
                    <View style={{ marginTop: 20, width: "80%" }}>
                        <Text style={{ fontSize: 12, color: Styles.Colors.gray_var1, textAlign: 'left' }}>
                            Pastikan anda sudah memiliki akun dari aplikasi ini, jika belum memiliki bisa lakukan register
                    </Text>
                        <TouchableOpacity
                            onPress={() => { props.navigation.navigate('Register') }}
                            style={{ marginTop: 10, width: '80%' }}>
                            <Text style={[{ color: Styles.Colors.primary, fontSize: 12 }]}>
                                Register
                        </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Content>
        </Container>
    )
}

