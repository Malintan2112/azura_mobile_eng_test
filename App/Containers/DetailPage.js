import React from 'react';

// STYLING USING
import * as Styles from 'App/Styles';
import {
    View,
    Text,
    TouchableOpacity,
    Linking,
    Dimensions,
    StatusBar,
    StyleSheet,
    ScrollView,
    Image
} from 'react-native';
import { Icon } from 'native-base';
import ImageZoom from 'App/Components/Widget/ImageZoom';


export default DetailPage = ({ navigation, route }) => {
    const { title, type, params, dir } = route.params
    const onPress = () => {
        switch (type) {
            case 'detail-league':
                navigation.push('SearchPage', { title: 'Search By Teams', type: 'teams', params: params.strLeague, dir: dir })
                break;

            default:
                break;
        }
    }
    const openLink = (link) => {
        Linking.openURL('https://' + link);
    }
    const componentDetail = () => {
        return (
            <ScrollView>
                <Image
                    source={{ uri: type === 'detail-league' ? params.strBadge : params.strTeamBadge }}
                    style={{
                        width: 300, height: 300,
                        alignSelf: 'center'
                    }}
                    resizeMode={'contain'} />
                <View style={{ paddingHorizontal: 20, paddingBottom: 20 }}>
                    <View style={{ flexDirection: "row", justifyContent: 'space-between', alignItems: 'flex-end' }}>
                        <View style={{ width: '70%' }}>
                            <Text style={localStyles.titleText} allowFontScaling={false}>Name{type === 'detail-team' && ` | Team League`}</Text>
                            <Text style={[localStyles.itemTextVaue, { width: '100%' }]} allowFontScaling={false}>{type === 'detail-team' && `${params.strTeam} | `}{params.strLeague}{type === 'detail-league' && ` | ${params.strLeagueAlternate}`} </Text>
                        </View>
                        {type === 'detail-league' && (
                            <TouchableOpacity
                                onPress={onPress}
                                style={localStyles.btnViewTeams}>
                                <Text style={{ fontSize: 10, color: Styles.Colors.primary, textAlign: 'center' }} allowFontScaling={false}>{`View Teams`}</Text>
                            </TouchableOpacity>
                        )}
                        {type === 'detail-team' && (
                            <ImageZoom source={{ uri: params.strTeamJersey }} style={{ width: 30, height: 30 }} />
                        )}
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                        <View>
                            <Text style={localStyles.titleText} allowFontScaling={false}>Gender</Text>
                            <Text style={localStyles.itemTextVaue} allowFontScaling={false}>{params.strGender}</Text>
                        </View>
                        <View>
                            <Text style={[localStyles.titleText, { textAlign: 'right' }]} allowFontScaling={false}>Formed Year</Text>
                            <Text style={[localStyles.itemTextVaue, { textAlign: "right" }]} allowFontScaling={false}>{params.intFormedYear}</Text>
                        </View>
                    </View>
                    <Text style={localStyles.titleText} allowFontScaling={false}>Activity</Text>
                    <View style={{ width: '100%', flexDirection: 'row' }}>
                        {params.strTwitter != "" && <Icon
                            onPress={() => { openLink(params.strTwitter) }}
                            type="FontAwesome5"
                            name="twitter"
                            style={[localStyles.icon, { color: Styles.Colors.primary }]} />}
                        {params.strWebsite != "" && <Icon
                            onPress={() => { openLink(params.strWebsite) }}
                            type="FontAwesome5"
                            name="globe"
                            style={[localStyles.icon, { color: Styles.Colors.black }]} />}

                        {params.strYoutube != "" && <Icon
                            onPress={() => { openLink(params.strYoutube) }}
                            type="FontAwesome5"
                            name="youtube"
                            style={[localStyles.icon, { color: 'red' }]} />}
                        {params.strFacebook != "" && <Icon
                            onPress={() => { openLink(params.strFacebook) }}
                            type="FontAwesome5"
                            name="facebook"
                            style={[localStyles.icon, { color: Styles.Colors.primary }]} />}
                        {params.strInstagram != "" && <Icon
                            onPress={() => { openLink(params.strInstagram) }}
                            type="FontAwesome5"
                            name="instagram"
                            style={[localStyles.icon, { color: 'pink' }]} />}

                    </View>
                    {type === 'detail-team' && (<>
                        <Text style={localStyles.titleText} allowFontScaling={false}>Home  </Text>
                        <Text style={localStyles.itemTextVaue} allowFontScaling={false}>{params.strStadium} | {params.strStadiumLocation}</Text>
                    </>)
                    }

                    <Text style={localStyles.titleText} allowFontScaling={false}>Desc  </Text>
                    <Text style={localStyles.itemTextVaue} allowFontScaling={false}>{params.strDescriptionEN}</Text>

                </View>
            </ScrollView>
        )
    }
    return (
        <View style={{ backgroundColor: 'white', height: '100%', width: '100%' }} >
            <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
            <Header navigation={navigation} dir={dir} title={title} />
            {componentDetail()}
        </View>
    )
}

const localStyles = StyleSheet.create({
    icon: {
        fontSize: 30,
        marginRight: 5
    },
    titleText: {
        fontSize: 12,
        color: Styles.Colors.gray_var2,
        lineHeight: 30
    },
    itemTextVaue: {
        fontSize: 14,
        color: Styles.Colors.black,
        lineHeight: 20
    },
    btnViewTeams: {
        padding: 5,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: Styles.Colors.primary
    }
})