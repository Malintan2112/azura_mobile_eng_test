import React, { useEffect, useState } from 'react'
import { FlatList, ScrollView, Text, View } from 'react-native'
import { createRequestGlobalTimeOut } from 'App/Helpers/Http';

import * as Styles from 'App/Styles';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';


const defaultNews = {
    status: 'oke',
    totalResult: 0,
    articles: []
}
const apiKey = '666aa7c8a21b4ab886ef5c5f38238598';

export default function Informasi() {
    const [news, setNews] = useState(defaultNews);
    const [page, setPage] = useState(1);
    const [isLoading, setLoading] = useState(false);

    const getData = (initial = false) => {
        setLoading(true);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };
        const link = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${apiKey}`;
        const method = 'GET';
        const params = {
            headers,
            link,
            method
        }
        createRequestGlobalTimeOut(params, 3000).then((res) => {
            setLoading(true);
            setNews(current => {
                return (
                    {
                        articles: initial ? [...res.articles] : current.articles.concat(res.articles),
                        totalResult: res.totalResult,
                        status: res.status
                    }
                )
            })
            if (res.status != 'ok') {
                throw new Error('error')
            }
            setLoading(false);
        });
    }

    useEffect(() => {
        getData(true)
    }, []);

    return (
        <Container>
            <HeaderComponent title={"List Informasi"} />
            {isLoading && <Text>{"Is Loading ... "}</Text>}

            <FlatList
                data={news.articles}
                keyExtractor={(item, index) => "listDatap" + "_" + index}
                onEndReachedThreshold={0.1}
                extraData={news}
                refreshing={isLoading}
                onRefresh={() => {
                    getData(true)
                }}
                onEndReached={(a) => {
                    if (news.totalResult > news.articles.length) {
                        getData()
                    }
                }}
                onEndReachedThreshold={0.1}
                renderItem={({ item, index }) => {
                    return (
                        <View style={{ padding: 10, borderBottomWidth: 1 }}>
                            <Text>{`${index + 1} `}{item.title}</Text>
                        </View>
                    )
                }}
            />
        </Container>
    )
}

const HeaderComponent = ({ title }) => {
    return (
        <Header style={{ backgroundColor: Styles.Colors.primary }}>
            <Left>
                <Button transparent>
                    <Icon name='arrow-back' />
                </Button>
            </Left>
            <Body>
                <Title>{title}</Title>
            </Body>
            <Right>
                <Button transparent>
                    <Icon name='menu' />
                </Button>
            </Right>
        </Header>
    )
}