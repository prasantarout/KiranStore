import React from 'react';
import {ActivityIndicator, SafeAreaView, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import { Colors } from '../../themes/Colors';

export default function Loader(props) {
  return props.visible ? (
    <SafeAreaView
      style={{
        ...StyleSheet.absoluteFillObject,
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 10,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <ActivityIndicator size="large" color={Colors.white} />
    </SafeAreaView>
  ) : null;
}

Loader.propTypes = {
  visible: PropTypes.bool,
};

Loader.defaultProps = {
  visible: true,
};
