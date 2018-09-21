import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  Alert
} from 'react-native';
import { H1, H2, H3, H4, P } from '../components/Text';
import {
  ViewContainer,
  Heading,
  SubHeading,
  PaperSheet,
  PadContainer
} from '../components/Base';
import { Button } from 'react-native-paper';

const USER_DATA_STORE = 'USER_DATA_STORE';


export default class Profile extends Component<Props> {

  async logout(){
    await AsyncStorage.removeItem(USER_DATA_STORE);
    Alert.alert(
    "Logged out.",
    "Close and reopen the app to login.",
    [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ],
    { cancelable: false }
    );
  }

  render() {
    return (
      <ViewContainer>
        <PadContainer>
          <Heading>
            Demo Name
          </Heading>
          <SubHeading>
            12 events saved
          </SubHeading>
          <Button icon="add-a-photo" mode="contained" onPress={() => this.logout()}>
            Logout
          </Button>
        </PadContainer>

      </ViewContainer>
    );
  }
}
