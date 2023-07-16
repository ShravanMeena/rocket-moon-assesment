import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export enum GuessBlockState {
  GUESS = 'guess',
  CORRECT = 'correct',
  POSSIBLE = 'possible',
  INCORRECT = 'incorrect',
}

const ColorMap: Record<GuessBlockState, string> = {
  [GuessBlockState.GUESS]: 'transparent',
  [GuessBlockState.CORRECT]: '#76b041',
  [GuessBlockState.POSSIBLE]: '#FFC914',
  [GuessBlockState.INCORRECT]: '#8b939c',
};

interface GuessBlockProps {
  text: string;
  state: GuessBlockState;
}

const GuessBlock = (props: GuessBlockProps) => {
  const {text, state} = props;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: ColorMap[state],
        },
      ]}>
      <Text style={styles.text}>{text.toUpperCase()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default GuessBlock;
