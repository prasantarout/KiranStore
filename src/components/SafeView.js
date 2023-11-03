import React, { Children, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import PropTypes from "prop-types";
import { Colors } from "../themes/Colors";
export default function SafeView(props) {
  return (
    <>
      <SafeAreaView
        style={{
          backgroundColor: props.backgroundColor,
          flex: 1,
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        }}
      >
        <StatusBar
          barStyle="light-content"
          hidden={false}
          backgroundColor={Colors.darkblue}
          translucent={true}
        />
        {props.children}
      </SafeAreaView>
    </>
  );
}
SafeView.propTypes = {
  backgroundColor: PropTypes.string,
};

SafeView.defaultProps = {
  backgroundColor: "rgb(242, 242, 242)",
};
