import {
  View,
  Text,
  FlatList,
  Button,
  Alert,
  StyleSheet,
  ListRenderItemInfo,
} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ImpressionTracker from 'react-native-impression-tracker';

const Tab = createMaterialTopTabNavigator();

const onImpressionTrigger = () => {
  console.log('Impression triggered on TabOne - item 2');
  Alert.alert('Impression', '2nd item in TabOne viewed!');
};

const onRealEstateClicked = (params: {
  adId: string;
  adType: string;
  advertiserName: string;
  deepLink: string;
}): void => {
  Alert.alert('Clicked', `Card clicked: ${JSON.stringify(params)}`);
};

const TabList = ({ tabId }: { tabId: string }) => {
  const data = Array.from({ length: 4 }, (_, i) => i + 1);

  const renderItem = ({ item }: ListRenderItemInfo<number>) => {
    const isTracked = tabId === 'TabTwo' && item === 2;

    const CardContent = (
      <View
        style={[
          styles.card,
          isTracked ? styles.trackedCard : styles.defaultCard,
        ]}
      >
        <Text style={styles.cardText}>
          {`Tab ${tabId} - Item ${item}${isTracked ? ' (Tracked)' : ''}`}
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
        onRealEstateClicked={(params) =>
          onRealEstateClicked({
            adId: `${params.adId}`,
            adType: 'real_estate',
            advertiserName: 'Example Advertiser',
            deepLink: `https://example.com/ads/${item}`,
          })
        }
      >
        {CardContent}
      </ImpressionTracker>
    ) : (
      CardContent
    );
  };

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.toString()}
      contentContainerStyle={styles.listContainer}
    />
  );
};

function TabOne() {
  return <TabList tabId="TabOne" />;
}

function TabTwo() {
  return <TabList tabId="TabTwo" />;
}

function TabThree() {
  return <TabList tabId="TabThree" />;
}

export default function Example2() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="TabOne" component={TabOne} />
      <Tab.Screen name="TabTwo" component={TabTwo} />
      <Tab.Screen name="TabThree" component={TabThree} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  card: {
    height: 100,
    marginBottom: 16,
    borderRadius: 10,
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
  cardText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
});
