import React, { Component } from "react";
import { RNCamera } from "react-native-camera";

import {
    View,
    Text,
    Platform,
    PermissionsAndroid,
    Dimensions,
    StyleSheet,
    Animated,
    TouchableOpacity,
    Vibration, Image
} from "react-native";
const { width, height } = Dimensions.get("window");
const PERMISSION_AUTHORIZED = "authorized";
const CAMERA_PERMISSION = "camera";



class ScanBarcode extends Component {

    constructor(props) {
        super(props);
        this.state = {
            scanning: false,
            takePhoto: false,
            top: new Animated.Value(10),
            maskCenterViewHeight: 0,
            transparency: 0.6,
            isAuthorized: false,
            isAuthorizationChecked: false,
            cameraState: null,
            isLoading: false,
            disableVibrationByUser: false,
            user_id: '',
            latitude: null,
            longitude: null,
            order_id: null,
            evidence: {}
        };
        this._scannerTimeout = null;
        this._handleBarCodeRead = this._handleBarCodeRead.bind(this);

    }
    // getData = async () => {
    //     try {
    //         const api = await AsyncStorage.getItem('API');
    //         const user_id = await AsyncStorage.getItem('USER_ID');
    //         const longitude = this.props.navigation.getParam('longitude');
    //         const latitude = this.props.navigation.getParam('latitude');
    //         this.setState({
    //             api, user_id, longitude, latitude
    //         })
    //     } catch (error) {

    //     }
    // }
    sendData = async () => {
        fetch('https://ayoodolist.com/ayoodolist-api/api/store_check', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data'
            },
            body: JSON.stringify({
                image: this.state.evidence,
            })
        })

            .then((response) => response.json())
            .then((responseData) => {
                console.log(
                    "POST Response",
                    "Response Body -> " + JSON.stringify(responseData)
                )
            })
            .done();

    }
    componentDidMount() {
        // this.getData()
        if (Platform.OS === "ios") {
            console.log("ios");
            Permissions.request(CAMERA_PERMISSION).then((response) => {
                this.setState({
                    isAuthorized: response === PERMISSION_AUTHORIZED,
                    isAuthorizationChecked: true,
                });
                this.changeCamera();
                this._startLineAnimation();
            });
        } else if (Platform.OS === "android") {
            console.log("android");
            PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
                title: "Info",
                message: "Need camera permission",
            }).then((granted) => {
                const isAuthorized =
                    Platform.Version >= 23
                        ? granted === PermissionsAndroid.RESULTS.GRANTED
                        : granted === true;
                this.setState({ isAuthorized, isAuthorizationChecked: true });
                this.changeCamera();
                this._startLineAnimation();
            });
        } else {
            console.log("data biasa");
            this.setState({ isAuthorized: true, isAuthorizationChecked: true });
        }
    }
    componentDidUpdate() {

        if (this.state.scanning == true && this.state.takePhoto == false) {
            this.setState({
                takePhoto: true
            });
        }

    }
    changeCamera() {
        if (this.state.cameraState === RNCamera.Constants.Type.back) {
            this.setState({ cameraState: RNCamera.Constants.Type.front });
        } else {
            this.setState({ cameraState: RNCamera.Constants.Type.back });
        }
    }
    _startLineAnimation = () => {
        const intervalId = setInterval(() => {
            if (this.state.maskCenterViewHeight > 0) {
                this._animateLoop();
                clearInterval(this.state.intervalId);
            }
        }, 500);
        this.setState({
            intervalId,
        });
    };
    _animateLoop = () => {
        console.log("masuk")
        this.animation = Animated.loop(
            Animated.sequence([
                Animated.timing(this.state.top, {
                    toValue: this.state.maskCenterViewHeight - 10,
                    duration: 1500,
                    useNativeDriver: false,
                }),
                Animated.timing(this.state.top, {
                    toValue: 10,
                    duration: 1500,
                    useNativeDriver: false,

                }),
            ])
        );
        this.animation.start();
    };
    _renderEdge = (edgePosition) => {
        const defaultStyle = {
            width: 20,
            height: 20,
            borderColor: "#7CD4F6",
        };
        const edgeBorderStyle = {
            topRight: {
                borderRightWidth: 4,
                borderTopWidth: 4,
            },
            topLeft: {
                borderLeftWidth: 4,
                borderTopWidth: 4,
            },
            bottomRight: {
                borderRightWidth: 4,
                borderBottomWidth: 4,
            },
            bottomLeft: {
                borderLeftWidth: 4,
                borderBottomWidth: 4,
            },
        };
        return (
            <View style={[defaultStyle, styles[edgePosition + "Edge"], edgeBorderStyle[edgePosition]]} />
        );
    };
    _applyMaskFrameTransparency = () => {
        let transparency = 0.6;
        if (
            this.state.transparency &&
            Number(this.state.transparency) &&
            (this.state.transparency >= 0 || this.state.transparency <= 1)
        ) {
            transparency = this.state.transparency;
        }
        return { backgroundColor: "rgba(0,0,0," + transparency + ")" };
    };
    _handleBarCodeRead(e) {
        if (!this.state.scanning && !this.state.disableVibrationByUser) {
            // Vibration.vibrate(DURATION);
            this._setScanning(true);
            Vibration.vibrate();
            this.setState({
                order_id: e.data
            })
            // this.onSuccess(e);
            // this.props.navigation.navigate('NewUserRegistration')
            console.log(e)
            this.takePicture();
        } else {
            console.log(e);
        }
    }
    takePicture = async () => {
        if (this.camera) {
            const options = { quality: 0.5 };
            const data = await this.camera.takePictureAsync(options);

            this.setState({
                takePhoto: true,
                poto: data.uri,
                evidence: {
                    uri: data.uri,
                    type: 'image/jpeg',
                    name: 'photo.jpg',
                }
            })
        }
    };
    _setScanning(value) {
        this.setState({
            scanning: value,
            isLoading: value,
        });
    }

    _onMaskCenterViewLayoutUpdated = ({ nativeEvent }) => {
        this.setState({
            maskCenterViewHeight: nativeEvent.layout.height,
        });
    };
    checkRenderBody() {
        const { isAuthorized, isAuthorizationChecked } = this.state;

        if (isAuthorized) {
            return (
                <RNCamera
                    ref={ref => {
                        this.camera = ref;
                    }}
                    type={this.state.cameraState}
                    flashMode={RNCamera.Constants.FlashMode.off}
                    style={{
                        flex: 0,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "transparent",
                        height,
                        width,
                        zIndex: 1,
                    }}
                    onBarCodeRead={this.state.isLoading === false ? this._handleBarCodeRead.bind(this) : null}
                    captureAudio={true}
                >

                    <View
                        style={{
                            alignItems: "center",
                            justifyContent: "center",
                            ...StyleSheet.absoluteFillObject,
                        }}
                    >
                        {this.state.poto && (<Image
                            style={{ height: 100, width: 100, borderRadius: 50, alignSelf: "center", position: "absolute", top: 30, left: 10, zIndex: 2 }}
                            source={{ uri: this.state.poto }}
                        />)}
                        <View
                            style={{
                                alignItems: "center",
                                justifyContent: "center",
                                width: width * 0.7,
                                height: width * 0.7,
                            }}
                        >
                            {this._renderEdge("topLeft")}
                            {this._renderEdge("topRight")}
                            {this._renderEdge("bottomLeft")}
                            {this._renderEdge("bottomRight")}

                            <Animated.View
                                style={{
                                    position: "absolute",
                                    elevation: 4,
                                    zIndex: 0,
                                    width: "85%",
                                    backgroundColor: "#1FD818",
                                    height: 2,
                                    top: this.state.top,
                                }}
                            />
                        </View>

                        <View
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                alignItems: "center",
                                justifyContent: "space-around",
                            }}
                        >
                            <View
                                style={[
                                    { width: "100%", backgroundColor: "rgba(0,0,0,0.6)", flex: 1 },
                                    this._applyMaskFrameTransparency(),
                                ]}
                            >
                                <View style={{ alignSelf: "flex-end", marginRight: 30, marginTop: 30 }}>
                                    {this.state.poto ? (<View>
                                        <TouchableOpacity transparent onPress={() => this.sendData()}>
                                            <Text
                                                allowFontScaling={false}
                                                style={{ color: "white", marginBottom: 20 }}
                                            >
                                                Next
                        </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity transparent onPress={() => this.setState({
                                            poto: false
                                        })}>
                                            <Text
                                                allowFontScaling={false}
                                                style={{ color: "white" }}
                                            >
                                                Reset
                        </Text>
                                        </TouchableOpacity>
                                    </View>) : (<TouchableOpacity transparent onPress={() => this.takePicture()}>
                                        <Text
                                            allowFontScaling={false}
                                            style={{ color: "white" }}
                                        >
                                            Cancel
                        </Text>
                                    </TouchableOpacity>)}


                                </View>
                            </View>
                            <View
                                style={{ height: width * 0.7, display: "flex", flexDirection: "row" }}
                                onLayout={this._onMaskCenterViewLayoutUpdated}
                            >
                                <View
                                    style={[
                                        { backgroundColor: "rgba(0,0,0,0.6)", flex: 1 },
                                        this._applyMaskFrameTransparency(),
                                    ]}
                                />
                                <View
                                    style={{
                                        backgroundColor: "transparent",
                                        width: width * 0.7,
                                        height: width * 0.7,
                                    }}
                                />
                                <View
                                    style={[
                                        { backgroundColor: "rgba(0,0,0,0.6)", flex: 1 },
                                        this._applyMaskFrameTransparency(),
                                    ]}
                                />
                            </View>
                            <View
                                style={[
                                    {
                                        backgroundColor: "rgba(0,0,0,0.6)",
                                        flex: 1,
                                        alignItems: "center",
                                        width: "100%",
                                    },
                                    this._applyMaskFrameTransparency(),
                                ]}
                            >
                                <View style={{ width: "50%" }}>
                                    <Text
                                        allowFontScaling={false}
                                        style={
                                            { color: "white", textAlign: "center", marginTop: 50 }
                                        }
                                    >
                                        Mohon arahkan scanner pada QR Code yang tersedia.
                      </Text>


                                </View>
                            </View>
                        </View>
                    </View>

                </RNCamera>
            );
        } else if (!isAuthorizationChecked) {
            return (
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                    <Text allowFontScaling={false} style={{ textAlign: "center", fontSize: 16 }}>
                        ...
              </Text>
                </View>
            );
        } else {
            return (
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                    <Text allowFontScaling={false} style={{ textAlign: "center", fontSize: 16 }}>
                        Camera not authorized
              </Text>
                </View>
            );
        }
    }

    render() {
        return (
            <View>
                {this.checkRenderBody()}
            </View>
        );
    }
}
const styles = StyleSheet.create({
    rectangleContainer: {
        flex: 1,
        alignItems: "center",
        alignSelf: "center",
        justifyContent: "center",
        backgroundColor: "transparent",
    },
    topLeftEdge: {
        position: "absolute",
        top: 0,
        left: 0,
    },
    topRightEdge: {
        position: "absolute",
        top: 0,
        right: 0,
    },
    bottomLeftEdge: {
        position: "absolute",
        bottom: 0,
        left: 0,
    },
    bottomRightEdge: {
        position: "absolute",
        bottom: 0,
        right: 0,
    },
});

export default ScanBarcode;