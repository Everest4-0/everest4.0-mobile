import React, {useState} from 'react';
import {View, Text, Button, StyleSheet, StatusBar} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {AuthContext} from '../../components/context';

const HomeScreen = ({navigation}) => {
  const [user, setUser] = useState({});
  const {colors} = useTheme();
  const {auth} = React.useContext(AuthContext);
  const theme = useTheme();
  auth().then(u => {
    setUser(u.user);
  });
  return (
    <View style={styles.container}>
      <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} />
      <Text style={{color: colors.text}}>Home Screen</Text>
      <Text style={{color: colors.text}}> -{user.email}- </Text>
      <Button
        title="Go to details screen"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
