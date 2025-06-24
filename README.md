# 📊 React Native Impression Tracker

A **lightweight, flexible React Native library** for tracking **view-based impressions** and **user interactions** across all types of layouts — including scrollable views, static screens, tabs, carousels, and deeply nested subcomponents.

---

## ✨ Features

- 🔍 Viewability-based impression tracking
- ⏱️ Configurable viewability threshold and dwell time
- 🧠 Context-driven click/impression tracking
- 🧩 Compatible with FlatList, ScrollView, Tabs, Carousels, and Static Screens
- ⚛️ Fully React Native compatible (Android & iOS)
---

## 📦 Installation

```bash
npm install react-native-impression-tracker
# or
yarn add react-native-impression-tracker
```


## 🚀 Usage

### Basic Example

```tsx
import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import ImpressionTracker, {
  AdsClickedInterface,
} from 'react-native-impression-tracker';

const ExampleScreen = () => {
  const handleImpression = () => {
    console.log('Element became visible for long enough!');
  };

  const handleClick = (params: AdsClickedInterface) => {
    console.log('Ad clicked:', params);
  };

  return (
    <ScrollView>
      <ImpressionTracker
        onImpressionTrigger={handleImpression}
        onRealEstateClicked={handleClick}
        desiredImpressionTime={1000} // in ms
        desiredImpressionViewability={0.5} // 50% of component visible
      >
        <View style={{ height: 200, backgroundColor: 'lightblue' }}>
          <Text>Track Me</Text>
        </View>
      </ImpressionTracker>
    </ScrollView>
  );
};

export default ExampleScreen;

```
## 📸 Screenshots

### 🖼️ Example 1: Home - Impression Tracker Entry Points
<img src="example/screenshots/Screenshot_1750018203.png" width="250" alt="Home - Impression Tracker" />

### 🖼️ Example 2: Tracking SubComponent inside ScrollView
<img src="example/screenshots/Screenshot_1750018271.png" width="250" alt="Subcomponent inside ScrollView"/>


### 🖼️ Example 3: Tracking in Tab
<img src="example/screenshots/Screenshot_1750018241.png" width="250" alt="Tracking in Tab"/>

## 📚 API Reference

### `<ImpressionTracker />`

Wrap any component to track its visibility and user interaction.

#### Props

| Prop                         | Type                                                                        | Default | Description                                                                 |
|------------------------------|-----------------------------------------------------------------------------|---------|-----------------------------------------------------------------------------|
| `children`                   | `React.ReactNode`                                                           | —       | Elements to be wrapped and tracked.                                         |
| `rootMargin`                 | `{ top?: number; bottom?: number; left?: number; right?: number; }`         | `{}`    | Optional margins around the view to adjust visibility bounds.              |
| `desiredImpressionViewability` | `number`                                                                 | `0.5`   | Portion (0–1) of the component that must be visible to count as an impression. |
| `desiredImpressionTime`     | `number`                                                                    | `1000`  | Time in milliseconds the component must remain visible to trigger impression. |
| `onImpressionTrigger`       | `() => void`                                                                | —       | Callback fired after viewability and dwell time conditions are met.        |
| `onRealEstateClicked`       | `(params: AdsClickedInterface) => void`                                     | —       | Callback fired when the user interacts (clicks/taps) on the tracked area.  |
| `style`                     | `ViewStyle`                             |



## 🧠 Context Hook: `useImpressionTracker`

The `useImpressionTracker` hook provides access to the `handleClickForImpression` function via context, allowing child components inside an `<ImpressionTracker>` to manually report click interactions tied to impression data.

### 🔄 How It Works

- This hook must be used inside an `<ImpressionTracker>` provider.
- It gives access to `handleClickForImpression`, which you can call with custom parameters (like ad ID, position, etc.).

### ✅ Example

```tsx
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useImpressionTracker } from 'react-native-impression-tracker';

const AdTile = () => {
  const { handleClickForImpression } = useImpressionTracker();

  return (
    <TouchableOpacity
      onPress={() => handleClickForImpression({ adId: 'banner-001', position: 3 })}
    >
      <Text>Click Me</Text>
    </TouchableOpacity>
  );
};

```

## 🧪 Testing & Coverage

This project uses:

- **Jest** for unit and integration testing
- **@testing-library/react-native** for component interaction testing
- **TypeScript** for static type safety

### 🔧 Running Tests

To run all tests:

```bash
yarn test
# or
npm test
```

## 🤝 Contributing

Pull requests and contributions are welcome!

To contribute:

1. **Fork** the repository.
2. **Create** a new branch for your feature or bug fix:

   ```bash
   git checkout -b feature/my-awesome-feature
