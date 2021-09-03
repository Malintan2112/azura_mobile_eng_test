import React from 'react'
import { Container, Header, Left, Body, Right, Button, Icon, Title, Subtitle } from 'native-base';
import { FlatList, Image, ScrollView, Text, TouchableOpacity, View, Animated, Dimensions, Modal, StyleSheet } from 'react-native';
import * as Hooks from 'App/Helpers/Hooks';
// REDUX USING
import AppActions from 'App/Redux/Actions';
import { useDispatch, } from 'react-redux';
import { useSelector } from 'react-redux';
import * as Styles from 'App/Styles';

export default function Notification(props) {
    const userData = useSelector((state) => state.userData);

    const data = [];
    return (
        <Container>
            <Header androidStatusBarColor={Styles.Colors.primary} style={{ backgroundColor: Styles.Colors.primary }}>
                <Left>
                    <Button onPress={() => props.navigation.pop()} transparent>
                        <Icon type="FontAwesome" name='arrow-left' />
                    </Button>
                </Left>
                <Body>
                    <Title>Notification</Title>
                </Body>
                <Right>

                </Right>
            </Header>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={data}

                keyExtractor={(item, index) => "notification" + item.id + "_" + index}
                ListHeaderComponent={<View style={{ width: "100%", paddingTop: 20 }}>
                    <View style={{ paddingHorizontal: 20, paddingBottom: 20 }}>
                        <Text style={{ fontSize: 10, color: Styles.Colors.gray_var2 }}>Welcome Notification</Text>
                        <TouchableOpacity onPress={() => props.navigation.replace('FormDailyReport', {
                            refresh: () => {
                                props.route.params.refresh();
                            }
                        })} style={{ marginTop: 10, flexDirection: 'row' }}>
                            <View style={{ width: 45, height: 45, borderRadius: 10, elevation: 3 }}>
                                <Image source={Styles.Images.logo} style={{ width: 45, height: 45, borderRadius: 10, resizeMode: 'cover' }} />
                            </View>
                            <View style={{ marginLeft: 10, justifyContent: "space-between" }}>
                                <Text style={{ fontSize: 12, color: Styles.Colors.black, fontWeight: 'bold' }}>Welcome to Daily Reports Apps</Text>
                                <Text style={{ fontSize: 10, color: Styles.Colors.black, }}>Yuk laporkan tugas anda demi kebaikan kita bersama</Text>
                                <Text style={{ fontSize: 8, color: Styles.Colors.gray_var1, }}>{Hooks.formatDate2(userData.created_at)}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ paddingHorizontal: 20, paddingBottom: 10 }}>
                        <Text style={{ fontSize: 10, color: Styles.Colors.gray_var2 }}>Task Notification</Text>
                        <View style={{ width: "100%", height: 300, justifyContent: "center", alignItems: "center" }}>
                            <Image source={Styles.Images.under_construction} style={{ width: 200, height: 200, borderRadius: 10, resizeMode: 'contain', marginTop: 100 }} />
                        </View>

                    </View>
                </View>}
                ListFooterComponent={<View style={{ width: "100%", height: 80, }}></View>}
                renderItem={({ item, index }) => {
                    return (
                        <View>

                        </View>
                    )
                }}
                ListEmptyComponent={() => {
                    return (
                        <View>

                        </View>
                    );
                }}
            />
        </Container>
    )
}
