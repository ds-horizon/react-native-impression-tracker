import { useState } from 'react';
import { JSX } from 'react';
import {
  FlatList,
  Text,
  View,
  Button,
  Alert,
  RefreshControl,
  StyleSheet,
  ListRenderItemInfo,
} from 'react-native';
import ImpressionTracker, {
  AdsClickedInterface,
} from 'react-native-impression-tracker';

const ITEMS = Array.from({ length: 15 }, (_, i) => i + 1);

type CardData = number;

export default function Example1(): JSX.Element {
  const [refreshing, setRefreshing] = useState(false);
  const [items, setItems] = useState<CardData[]>(ITEMS);

  const onImpressionTrigger = (): void => {
    Alert.alert('Impression', '12th card viewed!');
  };

  const onRealEstateClicked = (params: AdsClickedInterface): void => {
    Alert.alert('Clicked', `Card clicked: ${JSON.stringify(params)}`);
  };

  const handleRefresh = (): void => {
    setRefreshing(true);

    setTimeout(() => {
      setItems([...ITEMS]);
      setRefreshing(false);
    }, 1500);
  };

  const renderItem = ({ item }: ListRenderItemInfo<CardData>): JSX.Element => {
    const isTracked = item === 12;

    const CardContent = (
      <View
        style={[
          styles.card,
          isTracked ? styles.trackedCard : styles.defaultCard,
        ]}
      >
        <Text style={styles.cardTitle}>
          Card #{item} {isTracked ? '(Tracked)' : ''}
        </Text>
        {isTracked && (
          <Button
            title="Click Me"
            onPress={() =>
              onRealEstateClicked({
                adId: `${item}`,
                adType: 'real_estate',
                advertiserName: 'Example Advertiser',
                deepLink: `https://example.com/ads/${item}`,
              })
            }
          />
        )}
      </View>
    );

    return isTracked ? (
      <ImpressionTracker
        onImpressionTrigger={onImpressionTrigger}
        onRealEstateClicked={onRealEstateClicked}
      >
        {CardContent}
      </ImpressionTracker>
    ) : (
      CardContent
    );
  };

  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item.toString()}
      renderItem={renderItem}
      contentContainerStyle={styles.listContainer}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  card: {
    height: 100,
    borderRadius: 10,
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  defaultCard: {
    backgroundColor: '#e0e0e0',
  },
  trackedCard: {
    backgroundColor: '#b3e5fc',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
});
