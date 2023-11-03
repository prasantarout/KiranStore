import React from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import SafeView from '../../components/SafeView';
import { Colors} from '../../themes/Colors';
import { Icons } from '../../themes/ImagePath';

const AllStock = (props) => {
  return (
    <SafeView>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        enabled
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.container}>
            <View style={styles.inputContainer}>
              <TextInput style={styles.textInput} placeholder="Search" />
              <TouchableOpacity
                style={styles.qrIcon}
                onPress={() => {
                  // Handle QR code icon press here
                }}
              >
                <Image source={Icons.qr} style={styles.qrImage} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.fab}
              onPress={() => props.navigation.navigate('AddPRoductToMyShop')}
            >
              <Image source={Icons.plus} style={styles.fabIcon} tintColor={Colors.white} />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeView>
  );
}

export default AllStock;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: normalize(20),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    height: normalize(45),
    borderWidth: 1,
    borderColor: 'gray',
    marginTop: 20,
    borderRadius: 10,
    padding: 10,
    paddingLeft:normalize(30)
  },
  qrIcon: {
    position: 'absolute',
    left:10,
    bottom:0,
    top:normalize(30),
    zIndex: 1,
  },
  qrImage: {
    height: normalize(15),
    width: normalize(15),
  },
  fab: {
    position: 'absolute',
    width: normalize(56),
    height: normalize(56),
    borderRadius: normalize(28),
    backgroundColor: Colors.darkblue,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: normalize(20),
    right: normalize(20),
  },
  fabIcon: {
    height: normalize(24),
    width: normalize(24),
    resizeMode: 'contain',
  },
});
