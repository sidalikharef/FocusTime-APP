import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform, AsyncStorage } from 'react-native';
import { Focus } from './src/features/focus/focus';
import { colors } from './src/utils/colors';
import { Spacing } from './src/utils/sizes';
import { Timer } from './src/features/timer/Timer';
import { FocusHistory } from './src/features/focus/FocusHistory';

const STATUSES = {
  COMPLETE: 1,
  CANCELLED: 2,
};
export default function App() {
  const [focusSubject, setFocusSubject] = useState(null);
  const [focushistory, setFocusHistory] = useState([]);

  const addFocusHistorySubjectWithState = (subject, status) => {
    setFocusHistory([...focushistory, { subject, status }]);
  };
  const onClear = () => {
    setFocusHistory([]);
  };

  const saveFocusHistory = async () => {
    try {
      AsyncStorage.setItem('focushistory', JSON.stringify(focushistory));
    } catch (e) {
      console.log(e);
    }
  };
  const loadFocusHistory = async () => {
    try {
      const history = await AsyncStorage.getItem('focushistory');
      if (history && JSON.parse(history).length) {
        setFocusHistory(JSON.parse(history));
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    loadFocusHistory();
  }, []);
  useEffect(() => {
    saveFocusHistory();
  }, [focushistory]);
  return (
    <View style={styles.container}>
      {focusSubject ? (
        <Timer
          focusSubject={focusSubject}
          onTimerEnd={() => {
            addFocusHistorySubjectWithState(focusSubject, STATUSES.COMPLETE);
            setFocusSubject(null);
          }}
          clearSubject={() => {
            setFocusSubject(null),
              addFocusHistorySubjectWithState(focusSubject, STATUSES.CANCELLED);
          }}
        />
      ) : (
        <>
          <Focus addSubject={setFocusSubject} />
          <FocusHistory focusHistory={focushistory} onClear={onClear} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkblue,
    paddingTop: Platform.os === 'ios' ? Spacing.md : Spacing.lg,
  },
});
