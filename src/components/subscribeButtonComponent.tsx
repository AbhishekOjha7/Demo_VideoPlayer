import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {normalize} from '../utils/dimensions';
import {COLOR} from '../utils/color';
interface Props {
  buttonTxt?: any;
  buttonStyle?: StyleProp<ViewStyle>;
  buttonTxtStyle?: StyleProp<TextStyle>;
  onPress?: any;
}
const CustomButton = (props: Props) => {
  const {buttonTxt, buttonStyle, buttonTxtStyle, onPress} = props;
  return (
    <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPress}>
      <Text style={[styles.buttonText, buttonTxtStyle]}>{buttonTxt}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLOR.lIGHTGREEN,
    borderRadius: normalize(10),
    width: normalize(130),
    height: normalize(35),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: normalize(10),
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: normalize(16),
  },
});
