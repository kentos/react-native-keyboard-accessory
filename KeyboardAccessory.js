
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  DeviceEventEmitter,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';

import AccessoryItem from './AccessoryItem';

import KeyboardSpacer from 'react-native-keyboard-spacer';

class KeyboardSpacerAccessory extends React.Component {
  constructor(props) {
    super(props);

    this.onKeyboardShow = this.onKeyboardShow.bind(this);
    this.onKeyboardHide = this.onKeyboardHide.bind(this);

    this.state = {
      isKeyboardOpened: false,
      customItems: this.props.customItems || null,
      alignItems: 'space-between',
    };
  }

  componentDidMount() {
    if (Platform.OS == "android") {
      this._listeners = [
        DeviceEventEmitter.addListener('keyboardDidShow', this.onKeyboardShow),
        DeviceEventEmitter.addListener('keyboardDidHide', this.onKeyboardHide)
      ];
    } else {
      this._listeners = [
        DeviceEventEmitter.addListener('keyboardWillShow', this.onKeyboardShow),
        DeviceEventEmitter.addListener('keyboardWillHide', this.onKeyboardHide)
      ];
    }
  }

  componentWillUnmount() {
    this._listeners.forEach(function(/** EmitterSubscription */listener) {
      listener.remove();
    });
  }

  onKeyboardShow(frames) {
    this.setState({
      isKeyboardOpened: true
    });
  }

  onKeyboardHide() {
    this.setState({
      isKeyboardOpened: false
    });
  }

  render() {
    return (
      <View>
        {this.state.isKeyboardOpened ?
          <View style={[styles.accessoryView, { justifyContent: this.state.alignItems }]}>
            <AccessoryItem onPress={this.props.resignFirstResponder} text={this.props.doneText || 'Done'} />
            {this.state.customItems}
          </View>
         : null }
        <KeyboardSpacer />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  accessoryView: {
    flex:1,
    flexDirection: 'row',
    bottom: 0,
    left: 0,
    backgroundColor: '#eee',
  },
});

export default KeyboardSpacerAccessoryView;
