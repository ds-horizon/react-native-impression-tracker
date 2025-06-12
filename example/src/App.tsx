import { ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import Example1 from './screens/Example1';
import Example2 from './screens/Example2';
import Example3 from './screens/Example3';
import Example4 from './screens/Example4';
import Example5 from './screens/Example5';

const Stack = createNativeStackNavigator();

const MENU_ITEMS = [
  { title: 'Example 1: FlatList Example', route: 'Card Inside a FlatList' },
  { title: 'Example 2: Tracking in Tab', route: 'Inside a Tab' },
  { title: 'Example 3: In a static screen', route: 'In a static screen' },
  { title: 'Example 4: Carousel Example', route: 'Inside a carousel' },
  {
    title: 'Example 5: Tracking SubComponent inside scrollview',
    route: 'Subcomponent inside scrollview',
  },
];

function HomeScreen({ navigation }: { navigation: any }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Impression Tracker Examples</Text>
      {MENU_ITEMS.map(({ title, route }) => (
        <TouchableOpacity
          key={route}
          style={styles.card}
          onPress={() => navigation.navigate(route)}
        >
          <Text style={styles.cardText}>{title}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={styles.rootViewStyle}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home - Impression Tracker">
          <Stack.Screen
            name="Home - Impression Tracker"
            component={HomeScreen}
          />
          <Stack.Screen name="Card Inside a FlatList" component={Example1} />
          <Stack.Screen name="Inside a Tab" component={Example2} />
          <Stack.Screen name="In a static screen" component={Example3} />
          <Stack.Screen name="Inside a carousel" component={Example4} />
          <Stack.Screen
            name="Subcomponent inside scrollview"
            component={Example5}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  rootViewStyle: {
    flex: 1,
  },
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#f9f9f9',
    flex: 1,
  },
  header: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  cardText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
