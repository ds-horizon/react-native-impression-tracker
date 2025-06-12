import { JSX } from 'react';
import {
  View,
  Text,
  Button,
  Alert,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import ImpressionTracker from 'react-native-impression-tracker';

export default function Example3(): JSX.Element {
  const onImpressionTrigger = (): void => {
    console.log('Middle component viewed!');
    Alert.alert('Impression', 'Middle component viewed!');
  };

  const onRealEstateClicked = (params: {
    adId: string;
    adType: string;
    advertiserName: string;
    deepLink: string;
  }): void => {
    console.log('Middle component clicked with params:', params);
    Alert.alert('Clicked', `Params: ${JSON.stringify(params)}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Top Content</Text>
        <View style={styles.card}>
          <Text style={styles.cardText}>Top Block</Text>
        </View>
      </View>

      {/* Tracked Middle Section */}
      <ImpressionTracker
        onImpressionTrigger={onImpressionTrigger}
        onRealEstateClicked={onRealEstateClicked}
      >
        <View style={[styles.card, styles.trackedCard]}>
          <Text style={styles.cardText}>Middle Component (Tracked)</Text>
          <Button
            title="Click Me"
            onPress={() =>
              onRealEstateClicked({
                adId: 'middle',
                adType: 'buttonClick',
                advertiserName: 'Example Advertiser',
                deepLink: `https://example.com/ads`,
              })
            }
          />
        </View>
      </ImpressionTracker>

      {/* Bottom Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Bottom Content</Text>
        <View style={styles.card}>
          <Text style={styles.cardText}>Bottom Block</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-evenly',
    backgroundColor: '#f9f9f9',
  },
  section: {
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  card: {
    width: '100%',
    minHeight: 100,
    backgroundColor: '#e0e0e0',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  trackedCard: {
    backgroundColor: '#b3e5fc',
  },
  cardText: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
});
