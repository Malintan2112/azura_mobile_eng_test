import React, { useEffect, useRef, useState } from 'react'

// STYLING USING
import * as Styles from 'App/Styles'

import {
    View,
    Text,
    TouchableOpacity,
    ActivityIndicator,
    Dimensions,
    Image,
    StatusBar,
    TextInput,
    FlatList,
    StyleSheet,
    Modal
} from 'react-native'
import { Icon } from 'native-base'

import useEzFetch from 'App/Helpers/useEzFetch'
import { Header } from 'App/Components/Child/Index'


const { width } = Dimensions.get('window')

export default SearchPage = (props) => {
    const { title, type, params, dir } = props.route.params
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [searchData, setSearchData] = useState([])
    const [text, setText] = useState('')
    const [modal, setModal] = useState(false)
    const [leagueSelected, setLeague] = useState({})
    const { get } = useEzFetch()

    //  Fetching Search By Country 
    const _fetchingByCountry = async () => {
        setLoading(true)
        let result = []
        let response = {}
        switch (type) {
            case 'country':
                response = await get(`/all_countries.php`)
                result = response.data.countries
                break;
            case 'leagues':
                response = await get(`/search_all_leagues.php?c=${params}&s=Soccer`)
                result = response.data.countrys
                break;
            case 'teams':
                response = await get(`search_all_teams.php?l=${params}`)
                result = response.data.teams
                break;
            default:
                break;
        }
        if (result != null) {
            setData(result)
            setSearchData(result)
        }
        setLoading(false)
    }
    //  Fetching Search By Teams 
    const _fetchingNameTeam = async () => {
        setLoading(true)
        const response = await get(`searchteams.php?t=${text}`)
        const result = response.data.teams
        if (result != null) {
            setSearchData(result)
        }
        setLoading(false)
    }

    useEffect(() => {
        switch (type) {
            case 'teams-search':
                _fetchingNameTeam()
                break;

            default:
                if (searchData.length === 0) {
                    _fetchingByCountry()
                }
                break;
        }
    }, [text])
    
    //  On Change Text Input 
    const onChangeText = (value) => {
        let filterSearch = []
        switch (type) {
            case 'country':
                filterSearch = data.filter(element => element.name_en.toLowerCase().match(value.toLowerCase()))
                setSearchData(filterSearch)
                break;
            case 'leagues':
                filterSearch = data.filter(element => element.strLeague.toLowerCase().match(value.toLowerCase()))
                setSearchData(filterSearch)
                break;
            case 'teams':
                filterSearch = data.filter(element => element.strTeam.toLowerCase().match(value.toLowerCase()))
                setSearchData(filterSearch)
                break;
            default:
                break;
        }
        setText(value)
    }
    //  On Pres List 
    const onPress = (data) => {
        switch (type) {
            case 'country':
                props.navigation.push('SearchPage', { title: 'Search By Leagues', type: 'leagues', params: data.name_en, dir: `${data.name_en}/` })
                break;
            case 'leagues':
                setModal(true)
                setLeague(data)
                break;
            case 'teams':
                props.navigation.push('DetailPage', { title: 'Detail Team', type: 'detail-team', params: data, dir: `${dir}/${data.strTeam}` })
                break;
            case 'teams-search':
                props.navigation.push('DetailPage', { title: 'Detail Team', type: 'detail-team', params: data, dir: `${data.strTeam}` })
                break;
            default:
                break;
        }
    }
    // Option Leagues 
    const option = [
        {
            title: 'Detail League',
            navigate: 'DetailPage',
            params: {
                title: 'Detail League',
                type: 'detail-league',
                params: leagueSelected,
                dir: `${dir}${leagueSelected.strLeague}`
            }
        },
        {
            title: 'Show Teams Member',
            navigate: 'SearchPage',
            params: {
                title: 'Search By Teams',
                type: 'teams',
                params: leagueSelected.strLeague,
                dir: `${dir}${leagueSelected.strLeague}/`
            }
        }
    ]
    //  Modal Option Leagues
    const modalOption = () => {
        return (
            <Modal
                visible={modal}
                animationType='fade'
                transparent
                statusBarTranslucent
            >
                <View style={localStyles.modalBackground}>
                    <TouchableOpacity
                        onPress={() => {
                            setModal(false)
                        }}
                        style={localStyles.modalTransparantBackground}
                    />
                    <View
                        style={localStyles.modalContainer}
                    >
                        <View style={localStyles.modalContainerBody}>
                            <View style={{ flexDirection: 'row' }}>
                                {type === 'leagues' && <Image source={{ uri: leagueSelected.strBadge }} style={localStyles.logoSize} />}
                                <Text style={localStyles.titleLeague}>{leagueSelected.strLeague}</Text>
                            </View>
                            <Text style={localStyles.titleOption} allowFontScaling={false}>Select option </Text>

                            {option.map((data, index) => (
                                <TouchableOpacity
                                    key={`${index}_option_league`}
                                    onPress={() => {
                                        setModal(false)
                                        props.navigation.push(data.navigate, { ...data.params })
                                    }}
                                    style={[{ borderBottomWidth: (index + 1) != option.length ? 1 : 0 }, localStyles.listOption]}>
                                    <Text style={{ fontSize: 14, color: Styles.Colors.black }} allowFontScaling={false}>{data.title}</Text>
                                    <Icon type="FontAwesome5" name={'chevron-right'} style={{ fontSize: 15, color: Styles.Colors.black, marginRight: 5, }} />
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }



    return (
        <View style={localStyles.defaultBackground} >
            <StatusBar barStyle={'dark-content'} backgroundColor={Styles.Colors.trueWhite} />
            <Header navigation={props.navigation} dir={dir} title={title} />
            <View style={{ width: width - 60, alignSelf: 'center', marginVertical: 15 }}>
                <View style={localStyles.containerTextInput}>
                    <TextInput style={{ width: '100%' }} placeholder={`Search your ${type} in here ...`} autoFocus onChangeText={onChangeText} />
                </View>
                <Text
                    style={localStyles.resultSearch}
                    allowFontScaling={false}>search result : {searchData ? searchData.length : 0}</Text>
            </View>
            <FlatList
                data={searchData}
                keyExtractor={(item, index) => `${index}/${type}`}
                ListEmptyComponent={
                    <View style={{ flex: 1, width: "100%", height: "100%", alignItems: 'center', justifyContent: "center" }}>
                        {!loading ? <Text>Data not found</Text> : <ActivityIndicator size="small" color="#0000ff" />}
                    </View>
                }
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity
                            onPress={() => { onPress(item) }}>
                            <View style={localStyles.listCardSearch}>
                                <View style={{ flexDirection: 'row' }}>
                                    {type === 'leagues' && <Image source={{ uri: item.strBadge }} style={localStyles.logoSize} />}
                                    {type === 'teams' && <Image source={{ uri: item.strTeamBadge }} style={localStyles.logoSize} />}
                                    {type === 'teams-search' && <Image source={{ uri: item.strTeamBadge }} style={localStyles.logoSize} />}
                                    <Text style={{ width: "80%" }} numberOfLines={1} >{
                                        type === 'country' ?
                                            item.name_en :
                                            type === 'leagues'
                                                ? item.strLeague : item.strTeam}
                                    </Text>
                                </View>
                                <Icon type="FontAwesome5" name={type === 'leagues'
                                    ? "ellipsis-v" : "chevron-right"
                                } style={{ fontSize: 15, color: Styles.Colors.black, marginRight: 5, }} />
                            </View>
                        </TouchableOpacity>
                    )
                }}
            />
            {modalOption()}

        </View>
    )
}
const localStyles = StyleSheet.create({
    defaultBackground: {
        backgroundColor: Styles.Colors.trueWhite,
        height: '100%',
        width: '100%'
    },
    modalTransparantBackground: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(52, 52, 52, 0.7)',
        position: 'relative'
    },
    modalBackground: {
        width: '100%',
        height: '100%',
        position: 'relative',
        justifyContent: 'center'
    },
    modalContainer: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: "center"
    },
    modalContainerBody: {
        width: '80%',
        backgroundColor: "white",
        borderRadius: 10,
        paddingVertical: 20,
        paddingHorizontal: 20
    },
    logoSize: {
        width: 30,
        height: 30,
        marginRight: 10
    },
    titleLeague: {
        fontSize: 17,
        color: Styles.Colors.black,
        fontWeight: "bold",
        marginTop: -5,
        width: "70%"
    },
    titleOption: {
        fontSize: 10,
        color: Styles.Colors.gray_var2,
        marginTop: 10
    },
    listOption: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center',
        height: 50,
        borderBottomColor: Styles.Colors.gray_var4
    },
    listCardSearch: {
        paddingHorizontal: 30,
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: Styles.Colors.gray_var4,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    resultSearch: {
        fontSize: 12,
        textAlign: 'right',
        color: Styles.Colors.gray_var2,
        marginTop: 5
    },
    containerTextInput: {
        borderWidth: 1,
        borderColor: Styles.Colors.gray_var2,
        width: '100%',
        height: 50,
        borderRadius: 10,
        marginTop: 5,
        paddingHorizontal: 10
    }
})
