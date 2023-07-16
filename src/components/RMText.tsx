import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {useAppSelector} from '../hooks/storeHooks';

interface ButtonProps {
  children: string;
  style?: any;
}

export default function RMText(props: ButtonProps) {
  const {children, style} = props;

  const {theme} = useAppSelector(state => state.theme);

  return (
    <Text style={[styles.text, {color: theme.colors.text}, style]}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
  },
});
