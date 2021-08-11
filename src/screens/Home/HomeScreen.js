/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';

import {Avatar} from 'react-native-paper';
import {useTheme} from '@react-navigation/native';
import {AuthContext} from '../../components/context';
import {COLORS, SIZES, FONTS, icons} from '../../constants';
import {SafeAreaView} from 'react-native-safe-area-context';

import {serverAddress} from '../../services/app.service';
import {ScrollView} from 'react-native-gesture-handler';
const HomeScreen = ({navigation}) => {
  const [user, setUser] = useState({});

  const {colors} = useTheme();
  const {auth} = React.useContext(AuthContext);
  const theme = useTheme();
  auth().then(u => {
    setUser(u.user);
  });

  function header() {
    return (
      <View
        style={{
          flexDirection: 'row',
          height: 60,
          paddingTop: 30,
          backgroundColor: COLORS.primary,
        }}>
        <TouchableOpacity
          style={{
            width: 50,
            paddingLeft: SIZES.padding * 2,
            justifyContent: 'center',
          }}
          onPress={() => navigation.openDrawer()}>
          <Image
            source={icons.menu}
            resizeMode="contain"
            style={{
              width: 25,
              height: 25,
              tintColor: COLORS.white,
            }}
          />
        </TouchableOpacity>

        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <View
            style={{
              width: '70%',
              height: '100%',
              backgroundColor: COLORS.lightGray3,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: SIZES.radius,
            }}>
            <Text style={{...FONTS.h3}}>XXXXXXX</Text>
          </View>
        </View>

        <TouchableOpacity
          style={{
            width: 50,
            paddingRight: SIZES.padding * 2,
            justifyContent: 'center',
          }}>
          <Avatar.Image
            source={{uri: serverAddress + user.photoUrl}}
            size={30}
          />
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={COLORS.primary}
        barStyle={theme.dark ? 'light-content' : 'dark-content'}
      />
      {header()}
      <ScrollView
        style={{
          flex: 1,
        }}>
        <View style={{height: 400, backgroundColor: COLORS.primary}} />

        <View style={{height: 400, backgroundColor: COLORS.secondary}} />

        <View style={{height: 400, backgroundColor: COLORS.white}} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    backgroundColor: COLORS.white,
  },
});
