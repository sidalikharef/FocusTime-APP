import React from 'react';
import { View, Text, StyleSheet ,FlatList,SafeAreaView} from 'react-native';

import {fontSizes , Spacing} from '../../utils/sizes';
import {colors} from '../../utils/colors';
import { RoundedButton } from '../../components/RoundedButton';

const HistoryItem = ({item,index})=>{
  return(
    <Text style={styles.HistoryItem(item.status)}>
    {item.subject}
    </Text>
  )
} 
export const FocusHistory=({focusHistory, onClear })=>{
  const clearHistory =()=>{
    onClear();
  }

  return(
    <>
      <SafeAreaView style={{flex:0.5,alignItems:'center'}}>
        {!!focusHistory.length && 
          <>
          <Text style={styles.title}>Things we've focused on </Text>
          <FlatList 
            style={{flex: 1}}
            contentContainerStyle={{flex:1, alignItems:'center'}} 
            data={focusHistory}
            renderItem={HistoryItem}
          />
         
        <View style={styles.clearContainer}>
        <RoundedButton title="clear" size={75} onPress={() => onClear()} />
        </View>
         </>
        }
      </SafeAreaView>
      
    </>
  )
}
const styles= StyleSheet.create({
  HistoryItem:(status) =>({
    color : status>1? 'red' :'green',
    fontSizes:fontSizes.md ,
  }),
  title:{
    color: colors.white,
    fontSize: fontSizes.length
    
  },
  clearContainer:{
    alignItems:'center',
    padding:Spacing.md

  }
})