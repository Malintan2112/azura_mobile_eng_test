import React, { useState, useCallback, useRef, useEffect } from 'react'
import { Container, Header, Left, Body, Right, Button, Icon, Title, Subtitle } from 'native-base';
import { FlatList, Image, ScrollView, Text, TouchableOpacity, View, Animated, Dimensions, Modal, StyleSheet } from 'react-native';
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
import ABSheet from 'App/Components/Widget/AnimatedBottomSheet';
import CalendarPicker from 'react-native-calendar-picker';
import SkeletonPlaceholder from 'App/Components/Widget/SkeletonPlaceholder/SkeletonPlaceholder';
import ImageZoom from 'App/Components/Widget/ImageZoom';
import * as Animatable from 'react-native-animatable';
import { localNotificationService } from 'App/Helpers/LocalNotificationService';




const ButtonMemorilized = React.memo(Button);
const { width, height } = Dimensions.get('window');


export default function Home(props) {
    const dispatch = useDispatch();
    const apiToken = useSelector((state) => state.apiToken);

    const language = useSelector((state) => state.language);
    const scrollY = new Animated.Value(0);
    const diffClamps = new Animated.diffClamp(scrollY, 0, 45);
    const [fromDate, setFromDate] = useState();
    const [toDate, setToDate] = useState();
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [modal, setModal] = useState(false);
    const userData = useSelector((state) => state.userData);
    const traslateY = diffClamps.interpolate({
        inputRange: [0, 40],
        outputRange: [0, 150]
    });
    useEffect(() => {
        getData()
    }, [apiToken])
    const dummyDatta = [
        {
            id: 252342,
            nik: 52341,
            name: 'Hernawan Putra Malintan',
            start_date: '21/12/2021',
            endDate: '21/12/2021',
            title: 'Membuat Skeleton Loader',
            evidence: 'https://asset.kompas.com/crops/1X5j7VaYbfGk4DSDf7-a_xEBXWM=/13x23:1002x682/750x500/data/photo/2021/03/31/6063960e72f78.jpg',
            note: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus porro tempore fuga minima laudantium? Illo commodi non nemo voluptatibus atque consequuntur qui tempore nisi, ullam provident repellat molestias voluptas. Ad?'
        },
        {
            id: 252342,
            nik: 52341,
            name: 'Hernawan Putra Malintan',
            start_date: '21/12/2021',
            endDate: '21/12/2021',
            title: 'Membuat Skeleton Loader',
            evidence: 'https://asset.kompas.com/crops/1X5j7VaYbfGk4DSDf7-a_xEBXWM=/13x23:1002x682/750x500/data/photo/2021/03/31/6063960e72f78.jpg',
            note: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus porro tempore fuga minima laudantium? Illo commodi non nemo voluptatibus atque consequuntur qui tempore nisi, ullam provident repellat molestias voluptas. Ad?'
        },
        {
            id: 252342,
            nik: 52341,
            name: 'Hernawan Putra Malintan',
            start_date: '21/12/2021',
            endDate: '21/12/2021',
            title: 'Membuat Skeleton Loader',
            evidence: 'https://asset.kompas.com/crops/1X5j7VaYbfGk4DSDf7-a_xEBXWM=/13x23:1002x682/750x500/data/photo/2021/03/31/6063960e72f78.jpg',
            note: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus porro tempore fuga minima laudantium? Illo commodi non nemo voluptatibus atque consequuntur qui tempore nisi, ullam provident repellat molestias voluptas. Ad?'
        },
        {
            id: 252342,
            nik: 52341,
            name: 'Hernawan Putra Malintan',
            start_date: '21/12/2021',
            endDate: '21/12/2021',
            title: 'Membuat Skeleton Loader',
            evidence: 'https://asset.kompas.com/crops/1X5j7VaYbfGk4DSDf7-a_xEBXWM=/13x23:1002x682/750x500/data/photo/2021/03/31/6063960e72f78.jpg',
            note: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus porro tempore fuga minima laudantium? Illo commodi non nemo voluptatibus atque consequuntur qui tempore nisi, ullam provident repellat molestias voluptas. Ad?'
        },

    ];
    // const data = []
    const onDateChange = (date, type) => {
        console.log(type);
        console.log(date);

        if (type == 'END_DATE') {

            setToDate(Hooks.getFormatDate(date, false))

        }
        else {
            setFromDate(Hooks.getFormatDate(date, false))
            setToDate(null)

        }
    }
    const getData = (start_date = null, end_date = null) => {
        setLoading(true)

        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + apiToken
        };
        let uri = "";
        if (start_date != null && end_date != null) {
            uri = `https://malintan-projects.com/public/api/daily_reports/${start_date}/${end_date}`
        } else if (start_date != null) {
            uri = `https://malintan-projects.com/public/api/daily_reports/${start_date}`
        } else {
            uri = "https://malintan-projects.com/public/api/daily_reports";
        }
        console.log(uri)
        fetch(uri, {
            method: 'GET',
            headers
        })
            .then((response) => response.json())
            .then((responseData) => {
                console.log('ini fetch data')
                console.log(responseData)
                if (responseData.status) {
                    setData([...responseData.data])

                    setLoading(false)

                } else {
                    Alert.alert(
                        "Daily Reports Message",
                        responseData.errors.email[0] ?? "Pastikan Data Anda Benar"
                        [
                        {
                            text: "Cancel",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel"
                        },
                        { text: "OK", onPress: () => console.log("OK Pressed") }
                        ]
                    );
                    setLoading(false)

                }

            }).catch(() => {


            })
            .done();

    }
    const renderCalendarPicker = () => {
        return (
            <Modal
                transparent={false}
                animationType="fade"
                visible={modal}
                onRequestClose={() => { setModal(false) }}
            >

                <View style={{ zIndex: 4 }}>
                    <View style={[
                        Styles.Helpers.mainSpaceBetween,
                        { backgroundColor: Styles.Colors.trueWhite }
                    ]}>
                        <TouchableOpacity style={{ width: '100%', backgroundColor: Styles.Colors.trueWhite, paddingTop: 20, marginLeft: 20 }} onPress={() => { setModal(false) }}>
                            <Animatable.View animation={'slideInRight'} style={{ flexDirection: 'row' }}>
                                <View style={{ width: 45, elevation: 5, height: 45, borderRadius: 25, justifyContent: "center", alignItems: 'center', backgroundColor: Styles.Colors.trueWhite, }} >
                                    <Icon type="FontAwesome" name="chevron-left" style={{ fontSize: 15, color: Styles.Colors.black, marginRight: 5, }} />
                                </View>
                                <View style={{ width: width * 0.8, marginLeft: 10, marginBottom: 40, }}>
                                    <Text style={{ fontSize: 12, color: Styles.Colors.black, fontWeight: "800" }}>Filter Calendar</Text>
                                    <Text style={{ fontSize: 30, color: Styles.Colors.black, fontWeight: "bold", marginTop: -5 }}>List Reports   </Text>
                                </View>
                            </Animatable.View>
                        </TouchableOpacity>
                        <Text style={{ fontSize: 10, marginBottom: 20, marginLeft: 30, color: 'red' }}>*<Text style={{ color: Styles.Colors.black, fontSize: 12 }}> Start Date and End Date is Required</Text></Text>

                        <CalendarPicker
                            weekdays={['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min']}
                            months={['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']}
                            startFromMonday={true}
                            allowRangeSelection={true}
                            previousComponent={
                                <Icon
                                    name={'chevron-left'}
                                    type={'MaterialCommunityIcons'}
                                    style={{
                                        color: Styles.Colors.black,
                                        fontSize: 35,
                                    }}
                                />
                            }
                            nextComponent={
                                <Icon
                                    name={'chevron-right'}
                                    type={'MaterialCommunityIcons'}
                                    style={{
                                        color: Styles.Colors.black,
                                        fontSize: 35,
                                    }}
                                />
                            }
                            textStyle={Styles.Fonts.paragraph_12_reg}
                            todayBackgroundColor={Styles.Colors.black}
                            selectedDayColor={Styles.Colors.primary}
                            selectedDayTextColor={Styles.Colors.trueWhite}
                            selectedStartDate={fromDate}
                            selectedEndDate={toDate}
                            restrictMonthNavigation={true}
                            selectMonthTitle={'Pilih Bulan di '}
                            selectYearTitle={'Pilih Tahun'}
                            // scaleFactor={width + 50}
                            //minDate={moment(new Date()).subtract(12, 'months')}
                            //maxDate={new Date()}
                            onDateChange={onDateChange.bind(this)}
                        />

                        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
                            <TouchableOpacity
                                activeOpacity={0.5}
                                onPress={() => {
                                    setModal(false)
                                    setData([])
                                    getData(fromDate, toDate);
                                    setFromDate(null);
                                    setToDate(null);
                                }}
                                style={[
                                    Styles.Helpers.center,
                                    {

                                        marginVertical: 30,
                                        backgroundColor: Styles.Colors.primary,
                                        borderRadius: 10,
                                        height: 40,
                                        width: '60%'
                                    }
                                ]}
                            >
                                <Text style={[
                                    Styles.Fonts.paragraph_12_reg,
                                    {
                                        color: Styles.Colors.trueWhite,
                                    }
                                ]}>
                                    Filter
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={0.5}
                                onPress={() => {

                                    setFromDate(null);
                                    setToDate(null);
                                }}
                                style={[
                                    Styles.Helpers.center,
                                    {

                                        marginVertical: 30,
                                        backgroundColor: Styles.Colors.trueWhite,
                                        borderRadius: 10,
                                        height: 40,
                                        width: '25%',
                                        elevation: 3
                                    }
                                ]}
                            >
                                <Text style={[
                                    Styles.Fonts.paragraph_12_reg,
                                    {
                                        color: Styles.Colors.primary,
                                    }
                                ]}>
                                    Reset
                                </Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>

            </Modal>
        );
    }
    return (
        <Container>


            <Header androidStatusBarColor={Styles.Colors.primary} style={{ backgroundColor: Styles.Colors.primary }}>
                <Left>
                    <Button transparent>
                        <ImageZoom source={{ uri: "https://www.drnitinborse.com/wp-content/uploads/2018/02/user-icon.png" }} style={{ width: 35, height: 35, borderRadius: 20, backgroundColor: "gray", marginRight: 10 }} />
                    </Button>
                </Left>
                <Body>
                    <Title>{userData.name}</Title>
                    <Subtitle>{userData.division_name}</Subtitle>
                </Body>
                <Right>
                    <Button onPress={() => props.navigation.navigate('Notification', {
                        refresh: () => {
                            getData();
                        }
                    })} transparent style={{ position: 'relative' }}>
                        <Icon type="FontAwesome" name='bell' />
                        <Animatable.View animation="pulse" easing="ease-out" iterationCount={5} direction="alternate" style={{ position: 'absolute', width: 10, height: 10, backgroundColor: 'red', top: 12, right: 13, borderRadius: 5 }}>
                        </Animatable.View>
                    </Button>
                </Right>
            </Header>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={data}
                onRefresh={() => {
                    getData();
                }}
                refreshing={isLoading}
                onScroll={(e) => {
                    scrollY.setValue(e.nativeEvent.contentOffset.y)
                }}
                keyExtractor={(item, index) => "listDataEvent" + item.id + "_" + index}
                ListFooterComponent={<View style={{ width: "100%", height: 80, }}></View>}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity
                            onPress={() => {
                                props.navigation.navigate('DetailTask', {
                                    data: item,

                                })
                            }}
                            style={{ width: "100%", marginTop: index == 0 ? 10 : 0, backgroundColor: Styles.Colors.trueWhite, paddingHorizontal: 20, paddingVertical: 20, borderBottomColor: Styles.Colors.gray_var4, borderBottomWidth: 1 }}>
                            <View style={{ flexDirection: 'row', marginBottom: 10, }} >
                                <Icon type="FontAwesome" name='calendar' style={{ color: Styles.Colors.primary, fontSize: 14, marginRight: 5 }} />

                                <View style={{ width: '80%' }}>
                                    <Text style={{ color: Styles.Colors.primary, fontSize: 14, fontWeight: 'bold' }}>{Hooks.formatDate2(item.start_date)} </Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }} >
                                <View style={{ width: '80%' }}>
                                    <Text style={{ color: Styles.Colors.gray_var1, fontSize: 8 }}>Title </Text>
                                    <Text style={{ color: Styles.Colors.black, fontSize: 12, fontWeight: '700' }}>{item.title} </Text>
                                </View>
                            </View>
                            <View style={{ width: '90%' }}>
                                <Text style={{ color: Styles.Colors.gray_var1, fontSize: 8 }}>Note</Text>
                                <Text style={{ color: Styles.Colors.black, fontSize: 10, }} numberOfLines={2} ellipsizeMode={'tail'}>{item.note} </Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 5, justifyContent: 'space-between' }}>

                                <View style={{ maxWidth: '70%', height: 20, borderColor: Styles.Colors.black, alignItems: 'center', flexDirection: "row" }}>
                                    <Icon type="FontAwesome" name='user' style={{ color: Styles.Colors.black, fontSize: 10, marginRight: 5 }} />
                                    <Text style={{ color: Styles.Colors.black, fontSize: 10, }} numberOfLines={1} ellipsizeMode={'tail'} >{userData.position_name} </Text>
                                </View>
                                <View style={{ maxWidth: '28%', height: 20, borderRadius: 5, alignItems: 'center', flexDirection: "row", marginLeft: 10 }}>
                                    <Text style={{ color: Styles.Colors.black, fontSize: 10, }} numberOfLines={1} ellipsizeMode={'tail'} >( {item.evidence.length} ) Evidence </Text>
                                    <Icon type="FontAwesome" name='image' style={{ color: Styles.Colors.black, fontSize: 10, marginRight: 5 }} />

                                </View>
                            </View>
                        </TouchableOpacity>
                    )
                }}
                ListEmptyComponent={() => {
                    return (
                        <View>
                            {!isLoading ? (
                                <Animatable.View animation="pulse" easing="ease-in" iterationCount={15} style={[Styles.Helpers.fullSize, { height: height * 0.5, backgroundColor: Styles.Colors.trueWhite, alignItems: 'center', marginTop: height * 0.2 }]}>
                                    <Image source={Styles.Images.no_data} style={{ width: 200, height: 200, resizeMode: 'contain', }} />

                                </Animatable.View>
                            ) : (<SkeletonReportLoader />)}
                        </View>
                    );
                }}
            />

            <TouchableOpacity
                onPress={() => { setModal(true) }}
                style={{ position: "absolute", flexDirection: 'row', width: 100, height: 30, backgroundColor: Styles.Colors.trueWhite, elevation: 5, bottom: 30, right: 30, alignSelf: 'center', borderRadius: 25, justifyContent: "center", alignItems: 'center', transform: [{ translateX: traslateY }] }}>
                <Icon type="FontAwesome" name='filter' style={{ color: Styles.Colors.primary, fontSize: 14, marginRight: 5 }} />
                <View style={{ width: 60 }}>
                    {/* <Text numberOfLines={1} ellipsizeMode={'tail'} style={{ fontSize: 12, color: Styles.Colors.black }} >21/04/2021-21/04/2021</Text> */}
                    <Text numberOfLines={1} ellipsizeMode={'tail'} style={{ fontSize: 12, color: Styles.Colors.primary, }} > Filter Daily</Text>

                </View>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => {
                    props.navigation.navigate('FormDailyReport', {
                        refresh: () => {
                            getData();
                        }
                    })
                }}
                style={{ position: "absolute", width: 50, height: 50, backgroundColor: Styles.Colors.trueWhite, elevation: 5, bottom: 70, right: 30, borderRadius: 25, justifyContent: "center", alignItems: 'center', transform: [{ translateX: traslateY }] }}>
                <Icon type="FontAwesome" name='plus' style={{ color: Styles.Colors.primary }} />
            </TouchableOpacity>


            { renderCalendarPicker()}

        </Container >
    )
}
const SkeletonReportLoader = () => {
    let skeleton = []
    for (let index = 0; index < 4; index++) {
        skeleton.push(
            <View key={"skeleton" + index} style={{ paddingHorizontal: 30, paddingVertical: 20, borderBottomColor: Styles.Colors.gray_var4, borderBottomWidth: 1 }}>
                <SkeletonPlaceholder>
                    <View style={{ flexDirection: "row", }}>
                        <View style={{ width: '30%' }}>
                            <View style={{ height: 15, borderRadius: 3, width: '100%', backgroundColor: 'black', marginTop: 10 }} />
                        </View>
                        <View style={{ width: '30%', marginLeft: 10 }}>
                            <View style={{ height: 15, borderRadius: 3, width: '100%', backgroundColor: 'black', marginTop: 10, alignSelf: 'flex-end' }} />
                        </View>
                        <View style={{ width: '30%', marginLeft: 10 }}>
                            <View style={{ height: 15, borderRadius: 3, width: '100%', backgroundColor: 'black', marginTop: 10, alignSelf: 'flex-end' }} />
                        </View>
                    </View>
                </SkeletonPlaceholder>
                <SkeletonPlaceholder>
                    <View style={{ flexDirection: "row", marginTop: 20, justifyContent: 'space-between' }}>
                        <View style={{ width: '100%' }}>
                            <View style={{ height: 10, borderRadius: 3, width: '20%', backgroundColor: 'black' }} />
                            <View style={{ height: 10, borderRadius: 3, width: '80%', backgroundColor: 'black', marginTop: 10 }} />
                        </View>
                    </View>
                </SkeletonPlaceholder>
                <SkeletonPlaceholder>
                    <View style={{ flexDirection: "row", marginTop: 20, justifyContent: 'space-between' }}>
                        <View style={{ width: '100%' }}>
                            <View style={{ height: 10, borderRadius: 3, width: '20%', backgroundColor: 'black' }} />
                            <View style={{ height: 10, borderRadius: 3, width: '90%', backgroundColor: 'black', marginTop: 10 }} />
                        </View>
                    </View>
                </SkeletonPlaceholder>

            </View>
        )
    }
    return (
        <ScrollView>
            {skeleton}
        </ScrollView>
    )
}
const HeaderComponent = ({ title, image, subTitle, navigation, getData }) => {
    return (
        <Header androidStatusBarColor={Styles.Colors.primary} style={{ backgroundColor: Styles.Colors.primary }}>
            <Left>
                <Button transparent>
                    <ImageZoom source={{ uri: image }} style={{ width: 35, height: 35, borderRadius: 20, backgroundColor: "gray", marginRight: 10 }} />
                </Button>
            </Left>
            <Body>
                <Title>{title}</Title>
                <Subtitle>{subTitle}</Subtitle>
            </Body>
            <Right>
                <Button onPress={() => navigation.navigate('Notification', {
                    refresh: () => {
                        getData();
                    }
                })} transparent style={{ position: 'relative' }}>
                    <Icon type="FontAwesome" name='bell' />
                    <Animatable.View animation="pulse" easing="ease-out" iterationCount={5} direction="alternate" style={{ position: 'absolute', width: 10, height: 10, backgroundColor: 'red', top: 12, right: 13, borderRadius: 5 }}>
                    </Animatable.View>
                </Button>
            </Right>
        </Header>
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