/* eslint-disable react-native/no-inline-styles */
import 'moment/min/moment-with-locales';

import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    Linking,
    TouchableOpacity
} from 'react-native';

import TimeAgo from 'react-native-timeago';


import { SIZES, COLORS } from '../../../../constants';
import { NewsService } from '../../../../services/main/News.service';


const NewsComponent = ({ navigation }) => {

    const [News, setNews] = React.useState([])

    React.useEffect(() => {
        new NewsService()
            .all({})
            .then((news: any) => setNews(news.articles))
            .catch(e => {
                let y = e;
            });

    }, []);

    const numColumns = 2;
    const size = (SIZES.width - 60) / numColumns;
    const styles = StyleSheet.create({
        itemContainer: {
            width: size,
            height: size + 10,
            margin: 5,
            borderColor: COLORS.dark,
            borderWidth: 1
        },
        stretch: {
            flex: 6,
            width: null,
            height: null,
            resizeMode: 'cover',
        },
        item: {
            flex: 3,
            padding: 5,
            fontSize: SIZES.font,
            color: COLORS.primary,
            backgroundColor: COLORS.white,
        },
        timeAgo: {
            flex: 1,
            color: COLORS.darkgray,
            alignContent: 'flex-end',
            backgroundColor: COLORS.lightGray,

        }
    });
    const handlePress = (url) => {

        Linking.openURL(url);

    };
    return (
        <View
            style={{
                paddingBottom: 30,
                paddingHorizontal: SIZES.padding * 2,
                backgroundColor: COLORS.dark
            }}>
            <Text style={{ fontSize: SIZES.h1, color: COLORS.white }}>Notícias</Text>
            <FlatList
                data={News.slice(0, 8)}
                style={{
                    backgroundColor: COLORS.dark
                }}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={()=>handlePress(item.url)} style={styles.itemContainer}>
                        <Image source={{ uri: item.urlToImage }}
                            style={styles.stretch} />
                        <Text style={styles.item}>{item.title}</Text>
                        <TimeAgo style={styles.timeAgo} time={item.publishedAt} />
                    </TouchableOpacity>
                )}
                numColumns={numColumns} /></View>
    );
}

export default NewsComponent;