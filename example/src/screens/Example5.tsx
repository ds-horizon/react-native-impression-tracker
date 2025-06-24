/* eslint-disable react-native/no-inline-styles */
import {
  ScrollView,
  View,
  Text,
  Button,
  Alert,
  StyleSheet,
} from 'react-native';
import ImpressionTracker from 'react-native-impression-tracker';

const onImpressionTrigger = () => {
  console.log('Impression triggered on small part of Card 3');
  Alert.alert('Impression', 'Inner content of Card 3 viewed!');
};

const onRealEstateClicked = (params: any) => {
  console.log('Clicked:', params);
  Alert.alert('Click', JSON.stringify(params));
};

export default function Example5() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => {
        const isCardThree = item === 9;

        return (
          <View
            key={item}
            style={[
              styles.card,
              { backgroundColor: isCardThree ? '#e0f7fa' : '#eee' },
            ]}
          >
            <Text style={styles.title}>{`Card ${item}`}</Text>

            {isCardThree ? (
              <>
                <Text>This is card 3's main content.</Text>

                {/* 🔥 ImpressionTracker wraps only this inner section */}
                <ImpressionTracker
                  onImpressionTrigger={onImpressionTrigger}
                  onRealEstateClicked={onRealEstateClicked}
                >
                  <View style={styles.trackedSection}>
                    <Text style={styles.trackedText}>
                      This part is being tracked.
                    </Text>
                    <Button
                      title="Click Me"
                      onPress={() => onRealEstateClicked({ card: 3 })}
                    />
                  </View>
                </ImpressionTracker>
              </>
            ) : (
              <Text>This is card {item}'s content.</Text>
            )}
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  card: {
    marginBottom: 20,
    borderRadius: 10,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  trackedSection: {
    marginTop: 12,
    padding: 12,
    backgroundColor: '#c8e6c9',
    borderRadius: 8,
  },
  trackedText: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
});
