import React, { useState } from 'react';
import { View, StyleSheet, Text,Vibration,Platform } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { useKeepAwake } from 'expo-keep-awake';
import { fontSizes, Spacing } from '../../utils/sizes';
import { colors } from '../../utils/colors';
import { Countdown } from '../../components/Countdown';
import { RoundedButton } from '../../components/RoundedButton';
import { Timing } from './Timing';

const DEFAULT_TIME = 0.1;
export const Timer = ({ focusSubject, onTimerEnd, clearSubject}) => {
    useKeepAwake();
  const interval = React.useRef(null);
  const [minutes, setMunites] = useState(DEFAULT_TIME);
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);

  const onProgress = (progress) => {
    setProgress(progress);
  };
  const vibrate =() => {
    if(Platform.OS === 'ios'){
      const interval = setInterval(() => Vibration.vibrate(),1000);
      setTimeout(()=> clearInterval(interval),10000);
    }else{
      Vibration.vibrate(10000);
    }
  }

  const onEnd = () => {
    vibrate();
    setMunites(1);
    setProgress(1);
    setIsStarted(false);
    onTimerEnd();

  }
  const changeTime = (min) => {
    setMunites(min);
    setProgress(1);
    setIsStarted(false)

  };

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown minutes={minutes} isPaused={!isStarted} onProgress={onProgress} onEnd={onEnd} />
      </View>
      <View style={{ paddingTop: Spacing.xxl }}>
        <Text style={styles.title}> focusing on : </Text>
        <Text style={styles.task}> {focusSubject} </Text>
      </View>
      <View style={{ paddingTop: Spacing.sm }}>
        <ProgressBar
          progress={progress}
          color="#5E84E2"
          style={{ height: 10 }}
    
        />
      </View>

      <View style={styles.buttonwrapper}>
        <Timing onChangeTime={changeTime} />
      </View>

      <View style={styles.buttonwrapper}>
        {isStarted ? (
          <RoundedButton title="Pause" onPress={() => setIsStarted(false)} />
        ) : (
          <RoundedButton title="Start" onPress={() => setIsStarted(true)} />
        )}
    
      </View>
          <View style={styles.clearSubject}>
        <RoundedButton title="-" size={50} onPress={() => clearSubject()} />
        </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: colors.white,
    textAlign: 'center',
  },
  task: {
    color: colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  countdown: {
    flex: 0.5,
    alignContent: 'center',
    justifyContent: 'center',
  },
  buttonwrapper: {
    flex: 0.3,
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearSubject:{
    paddingBottom : Spacing.xl,
    paddingLeft: Spacing.xl




  },
});
