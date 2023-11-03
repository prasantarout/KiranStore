import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import SafeView from '../../components/SafeView';
import CommonLinearGradient from '../../components/CommonLinearGradient';
import { Icons } from '../../themes/ImagePath';

const cardData = [
  {
    id: '1',
    image: Icons.demo,
  },
  {
    id: '1',
    image: Icons.demo,
  },
  {
    id: '1',
    image: Icons.demo,
  },
  {
    id: '1',
    image: Icons.demo,
  },
  {
    id: '1',
    image: Icons.demo,
  },
  {
    id: '1',
    image: Icons.demo,
  },
  {
    id: '1',
    image: Icons.demo,
  },
  {
    id: '1',
    image: Icons.demo,
  },
  // Add more card data objects as needed
];

const ShareGreetings = () => {
  const renderCard = ({ item }) => {
    return (
      <View style={styles.card}>
        <Image
          source={item.image}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => console.log('Share Pressed')}>
            <Text style={styles.buttonText}>Share</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => console.log('Download Pressed')}>
            <Text style={styles.buttonText}>Download</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeView>
      <CommonLinearGradient heading={'Share Greetings'} />
      <FlatList
        data={cardData}
        keyExtractor={(item) => item.id}
        renderItem={renderCard}
        contentContainerStyle={styles.scrollViewContainer}
      />
    </SafeView>
  );
};

export default ShareGreetings;

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    paddingVertical: 20,
  },
  card: {
    backgroundColor: 'white',
    margin: 20,
    padding: 10,
    borderRadius: 10,
    elevation: 3,
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    flex: 1,
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});
