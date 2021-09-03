import React, { useState, useCallback } from 'react'
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import { ScrollView, Text, TouchableOpacity, View, Dimensions, Image } from 'react-native'
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
import * as Animatable from 'react-native-animatable';

import ParallaxScroll from "App/Components/Widget/Parallax";
import ImageFixed from "App/Components/Widget/ImageFixed";

const { width, height } = Dimensions.get("window");

export default function Profile() {
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.userData);


    const logout = () => {
        dispatch(AppActions.logout());
    }
    return (
        <Container>
            <ParallaxScroll
                style={{ flex: 1 }}
                showsVerticalScrollIndicator={false}
                headerHeight={100}
                isHeaderFixed={true}
                useNativeDriver={true}
                isBackgroundScalable={true}
                headerBackgroundColor="transparent"
                onChangeHeaderVisibility={(index) => console.log("isi header visibility", index)}
                fadeOutParallaxBackground={false}
                fadeOutParallaxForeground={true}
                headerFixedBackgroundColor="transparent"
                parallaxHeight={height * 0.2}
                parallaxBackgroundScrollSpeed={2}
                parallaxForegroundScrollSpeed={2.5}
                renderParallaxBackground={({ animatedValue }) => {
                    return (
                        <ImageFixed
                            width={width}
                            style={{
                                marginTop: width * -0.25,
                            }}
                            source={{ uri: "https://www.drnitinborse.com/wp-content/uploads/2018/02/user-icon.png" }}
                            blurRadius={12}
                        />
                    );
                }}
            >

                <Animatable.View
                    animation={'slideInUp'}
                    style={{
                        backgroundColor: "transparent",
                        width: '100%',
                        position: 'relative',
                        alignItems: "center",
                        zIndex: 1,
                        height: 500
                    }}
                >
                    <View style={{ width: 100, height: 100, borderRadius: 50, backgroundColor: 'gray', position: 'absolute', top: 0, zIndex: 1 }}>
                        <Image source={{ uri: "https://www.drnitinborse.com/wp-content/uploads/2018/02/user-icon.png" }} style={{ width: 100, height: 100, borderRadius: 50 }} />
                    </View>
                    <View style={{ width: '100%', height: 300, backgroundColor: Styles.Colors.trueWhite, borderTopLeftRadius: 50, borderTopRightRadius: 50, marginTop: 50, paddingTop: 80, alignItems: 'center' }}>
                        <View style={{ width: width * 0.8, marginVertical: 10, borderBottomColor: Styles.Colors.gray_var5, borderBottomWidth: 1, paddingBottom: 10 }}>
                            <Text style={{ color: Styles.Colors.gray_var1, fontSize: 12 }}>
                                NIK :
                            </Text>
                            <Text style={{ color: Styles.Colors.black, fontSize: 15, marginTop: 10 }}>
                                {userData.nik}
                            </Text>
                        </View>
                        <View style={{ width: width * 0.8, marginVertical: 10, borderBottomColor: Styles.Colors.gray_var5, borderBottomWidth: 1, paddingBottom: 10 }}>
                            <Text style={{ color: Styles.Colors.gray_var1, fontSize: 12 }}>
                                Nama :
                            </Text>
                            <Text style={{ color: Styles.Colors.black, fontSize: 15, marginTop: 10 }}>
                                {userData.name}
                            </Text>
                        </View>
                        <View style={{ width: width * 0.8, marginVertical: 10, borderBottomColor: Styles.Colors.gray_var5, borderBottomWidth: 1, paddingBottom: 10 }}>
                            <Text style={{ color: Styles.Colors.gray_var1, fontSize: 12 }}>
                                Email :
                            </Text>
                            <Text style={{ color: Styles.Colors.black, fontSize: 15, marginTop: 10 }}>
                                {userData.email}
                            </Text>
                        </View>
                        <View style={{ width: width * 0.8, marginVertical: 10, borderBottomColor: Styles.Colors.gray_var5, borderBottomWidth: 1, paddingBottom: 10 }}>
                            <Text style={{ color: Styles.Colors.gray_var1, fontSize: 12 }}>
                                Divisi :
                            </Text>
                            <Text style={{ color: Styles.Colors.black, fontSize: 15, marginTop: 10 }}>
                                {userData.division_name}

                            </Text>
                        </View>
                        <View style={{ width: width * 0.8, marginVertical: 10, borderBottomColor: Styles.Colors.gray_var5, borderBottomWidth: 1, paddingBottom: 10 }}>
                            <Text style={{ color: Styles.Colors.gray_var1, fontSize: 12 }}>
                                Posisi :
                            </Text>
                            <Text style={{ color: Styles.Colors.black, fontSize: 15, marginTop: 10 }}>
                                {userData.position_name}

                            </Text>
                        </View>
                    </View>

                </Animatable.View>
                <TouchableOpacity
                    onPress={logout} style={{ alignSelf: 'center' }}>
                    <View style={{ width: width * 0.8, marginVertical: 40, height: 50, backgroundColor: Styles.Colors.gray_var1, borderRadius: 5, borderColor: Styles.Colors.gray_var3, justifyContent: "center" }}>
                        <Text style={{ textAlign: 'center', color: "white", fontWeight: "700" }}>Logout</Text>
                    </View>
                </TouchableOpacity>
            </ParallaxScroll>

        </Container>
    )
}


{/* <TouchableOpacity
                onPress={logout}
                style={[{ width: "100%", alignItems: "center", marginTop: 10, }]}>
                <View style={[{ width: '80%', height: 60, backgroundColor: "#e01b22", borderRadius: 10, justifyContent: "center" }]}>
                    <Text style={{ textAlign: 'center', color: "white", fontWeight: "700" }}>Logout</Text>
                </View>
            </TouchableOpacity> */}