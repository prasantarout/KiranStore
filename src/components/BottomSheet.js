import React, {useRef} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import {Colors} from '../themes/Colors';

const CommonBottomSheet = ({isVisible, onClose, children, close, moment}) => {
  const bottomSheetRef = useRef(null);

  return (
    <BottomSheet
      ref={close}
      index={isVisible ? 0 : -1}
      snapPoints={
        moment === 1
          ? ['140%', '50%', '90%']
          : moment === 2
          ? ['100%', '50%', '90%']
          : ['50%', '50%', '90%']
      }
      enablePanDownToClose={true}
      backgroundComponent={({style}) => (
        <View style={[style, styles.background]} />
      )}>
      <View style={styles.container}>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeText}>Close</Text>
        </TouchableOpacity>
        {children}
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'white',
    padding: 16,
  },
  background: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  closeButton: {
    alignItems: 'flex-end',
  },
  closeText: {
    fontSize: 18,
    color: 'blue', // Customize the color as needed
  },
});

export default CommonBottomSheet;
