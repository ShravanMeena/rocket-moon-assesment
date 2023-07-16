import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import RMButton from '../../components/RMButton';
import Keyboard, {SpecialKeyboardKeys} from '../../components/Keyboard';
import GuessBlock, {GuessBlockState} from '../../components/GuessBlock';
import {
  MAX_GUESSES,
  MAX_WORD_LEN,
  TextConstants,
} from '../../constants/gameConstants';
import {
  getInitialBoard,
  getRandomWord,
  getWordleEmoji,
} from '../../utils/gameUtils';
import RMText from '../../components/RMText';

const BOARD_TEMPLATE = getInitialBoard();

const GameScreen = () => {
  const [guessList, setGuessList] = useState<string[]>([]);
  const [inputWord, setInputWord] = useState<string>('');
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [disabledLetters, setDisabledLetters] = useState<string[]>([]);

  const wordToGuess = useRef<string>('xxxxx');

  useEffect(() => {
    if (gameOver === false) {
      wordToGuess.current = getRandomWord();
      setInputWord('');
      setGuessList([]);
    }
  }, [gameOver]);

  useEffect(() => {
    const guessLen = guessList.length;
    if (guessList[guessLen - 1] === wordToGuess.current) {
      setGameOver(true);
    } else if (guessLen === MAX_GUESSES) {
      setGameOver(true);
    }
  }, [guessList]);

  useEffect(() => {
    const list: string[] = [];

    guessList.forEach(word => {
      word.split('').forEach(letter => {
        console.log({letter});
        if (!wordToGuess.current.includes(letter)) {
          list.push(letter);
        }
      });
    });

    setDisabledLetters(list);
  }, [guessList]);

  const onKeyPress = useCallback(
    (key: string) => {
      if (key === SpecialKeyboardKeys.DELETE) {
        setInputWord(prev => prev.slice(0, -1));
      } else if (key === SpecialKeyboardKeys.GUESS) {
        setGuessList(prev => [...prev, inputWord.toUpperCase()]);
        setInputWord('');
      } else if (key.length === 1) {
        setInputWord(prev => {
          if (prev.length < MAX_WORD_LEN && !disabledLetters.includes(key)) {
            return prev + key;
          }

          return prev;
        });
      }
    },
    [disabledLetters, inputWord],
  );

  const wordleEmoji: string = useMemo(() => {
    if (!gameOver) {
      return '';
    }

    return getWordleEmoji(wordToGuess.current, guessList);
  }, [gameOver, guessList]);

  return (
    <View style={styles.fg1}>
      {BOARD_TEMPLATE.map((row, rowIndex) => {
        return (
          <View key={`row-${rowIndex}`} style={styles.row}>
            {row.map((_, colIndex) => {
              const guessLetter = guessList[rowIndex]?.[colIndex];
              let state: GuessBlockState = GuessBlockState.GUESS;

              if (guessLetter === undefined) {
                state = GuessBlockState.GUESS;
              } else if (guessLetter === wordToGuess.current[colIndex]) {
                state = GuessBlockState.CORRECT;
              } else if (wordToGuess.current.includes(guessLetter)) {
                state = GuessBlockState.POSSIBLE;
              } else {
                state = GuessBlockState.INCORRECT;
              }

              const letterToShow =
                rowIndex === guessList.length
                  ? inputWord[colIndex]
                  : guessLetter;

              return (
                <View style={styles.mh2} key={`col-${colIndex}`}>
                  <GuessBlock text={letterToShow || ''} state={state} />
                </View>
              );
            })}
          </View>
        );
      })}

      <View style={styles.bottomContainer}>
        {gameOver ? (
          <>
            <RMText style={styles.mb12}>{TextConstants.gameOverText}</RMText>
            <RMText style={styles.mb12}>
              {TextConstants.wordWasText} : {wordToGuess.current}
            </RMText>

            <RMText>{wordleEmoji}</RMText>

            <View style={styles.buttonRow}>
              <View style={styles.buttonSpacer} />
              <RMButton
                cta={TextConstants.playAgainText}
                onPress={() => setGameOver(false)}
              />
            </View>
          </>
        ) : (
          <Keyboard
            disabledKeyList={[
              ...disabledLetters,
              inputWord.length !== MAX_WORD_LEN
                ? SpecialKeyboardKeys.GUESS
                : '',
            ]}
            onKeyPress={onKeyPress}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mb12: {
    marginBottom: 12,
  },
  mh2: {
    marginHorizontal: 2,
  },
  fg1: {
    flexGrow: 1,
    paddingVertical: 10,
  },
  textWhite: {
    color: '#fff',
    fontSize: 22,
  },
  row: {
    marginBottom: 4,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  bottomContainer: {
    flexGrow: 1,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  score: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 12,
  },
  buttonRow: {
    flexDirection: 'row',
  },
  buttonSpacer: {
    width: 12,
  },
});

export default GameScreen;
