/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  FlatList,
  Dimensions,
  Button,
  Alert,
  StyleSheet,
} from 'react-native';
import ImpressionTracker from 'react-native-impression-tracker';
const { width: SCREEN_WIDTH } = Dimensions.get('window');

const CARD_WIDTH = SCREEN_WIDTH * 0.7;
const SPACING = 16;

const DATA = Array.from({ length: 5 }, (_, i) => i + 1);

const onImpressionTrigger = () => {
  console.log('Impression triggered on Example4 - item 2');
  Alert.alert('Impression', '2nd item in Carousel viewed!');
};

const onRealEstateClicked = (params: any) => {
  console.log('Clicked:', params);
  Alert.alert('Click', JSON.stringify(params));
};

const renderItem = ({ item }: { item: number }) => {
  const isTracked = item === 2;

  const content = (
    <View
      style={[
        styles.card,
        {
          backgroundColor: isTracked ? 'lightblue' : 'lightgray',
        },
      ]}
    >
      <Text>{`Example 4 - Item ${item}${isTracked ? ' (Tracked)' : ''}`}</Text>
      {isTracked && (
        <Button
          title="Click Me"
          onPress={() => onRealEstateClicked({ item })}
        />
      )}
    </View>
  );

  return isTracked ? (
    <ImpressionTracker
      onImpressionTrigger={onImpressionTrigger}
      onRealEstateClicked={onRealEstateClicked}
    >
      {content}
    </ImpressionTracker>
  ) : (
    content
  );
};

export default function Example4() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Example 4: Carousel with Tracked Second Card
      </Text>
      <FlatList
        data={DATA}
        horizontal
        keyExtractor={(item) => item.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + SPACING}
        decelerationRate="fast"
        snapToAlignment="start"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: SPACING,
    marginBottom: 10,
  },
  listContent: {
    paddingHorizontal: SPACING,
  },
  card: {
    width: CARD_WIDTH,
    height: 150,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING,
  },
});
