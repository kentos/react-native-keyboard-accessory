
import React from 'react';
import {
  View,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';

export default const AccessoryItem = ({ onPress, text }) =>
  <TouchableWithoutFeedback onPress={onPress}>
    <View style={styles.item}>
      <Text style={styles.buttonText}>{text}</Text>
    </View>
  </TouchableWithoutFeedback>;

const styles = StyleSheet.create({
  item: {
    paddingTop: 8,
    paddingRight: 4,
    paddingBottom: 8,
    paddingLeft: 4,
  },
  buttonText: {
    color: 'blue',
  }
});