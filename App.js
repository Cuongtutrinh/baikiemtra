// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet, Image, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { 
  Ionicons, 
  FontAwesome5, 
  MaterialCommunityIcons,
  Feather,
  AntDesign
} from '@expo/vector-icons';

// Create navigators
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Home Screen Component
const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello <Text>👋</Text></Text>
          <Text style={styles.username}>Christie Doe</Text>
        </View>
        <Image 
          source={{ uri: 'https://randomuser.me/api/portraits/women/44.jpg' }} 
          style={styles.profileImage} 
        />
      </View>

      {/* Insights Section */}
      <Text style={styles.sectionTitle}>Your Insights</Text>
      
      {/* Cards Grid */}
      <View style={styles.cardsContainer}>
        <TouchableOpacity 
          style={styles.card} 
          onPress={() => navigation.navigate('ScanScreen')}
        >
          <View style={[styles.iconContainer, { backgroundColor: '#e6effd' }]}>
            <Ionicons name="scan-outline" size={24} color="#4a86f7" />
          </View>
          <Text style={styles.cardTitle}>Scan new</Text>
          <Text style={styles.cardSubtitle}>Scanned 483</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.card}>
          <View style={[styles.iconContainer, { backgroundColor: '#fff1e6' }]}>
            <Ionicons name="warning-outline" size={24} color="#ff9500" />
          </View>
          <Text style={styles.cardTitle}>Counterfeits</Text>
          <Text style={styles.cardSubtitle}>Counterfeited 32</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.card}>
          <View style={[styles.iconContainer, { backgroundColor: '#e7f9f0' }]}>
            <Ionicons name="checkmark-circle-outline" size={24} color="#4cd964" />
          </View>
          <Text style={styles.cardTitle}>Success</Text>
          <Text style={styles.cardSubtitle}>Checkouts 8</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.card}>
          <View style={[styles.iconContainer, { backgroundColor: '#e6f7fa' }]}>
            <Ionicons name="calendar-outline" size={24} color="#5ac8fa" />
          </View>
          <Text style={styles.cardTitle}>Directory</Text>
          <Text style={styles.cardSubtitle}>History 26</Text>
        </TouchableOpacity>
      </View>
      
      {/* Explore More Section */}
      <View style={styles.exploreTitleContainer}>
        <Text style={styles.sectionTitle}>Explore More</Text>
        <Feather name="arrow-right" size={20} color="#aaa" />
      </View>
      
      {/* Product Preview Images */}
      <View style={styles.productPreviewContainer}>
        <View style={styles.productPreview} />
        <View style={styles.productPreview} />
        <View style={styles.productPreview} />
      </View>
      
      {/* Additional navigation icons */}
      <View style={styles.additionalNavContainer}>
        <View style={[styles.navIconContainer, { backgroundColor: '#e6effd' }]}>
          <Ionicons name="home" size={20} color="#4a86f7" />
        </View>
        <View style={styles.navIconContainer}>
          <Ionicons name="notifications-outline" size={20} color="#aaa" />
        </View>
        <View style={styles.navIconContainer}>
          <Ionicons name="scan-outline" size={20} color="#aaa" />
        </View>
        <View style={styles.navIconContainer}>
          <Ionicons name="time-outline" size={20} color="#aaa" />
        </View>
        <View style={styles.navIconContainer}>
          <Ionicons name="cart-outline" size={20} color="#aaa" />
        </View>
      </View>
    </SafeAreaView>
  );
};

// Scan Screen Component
const ScanScreen = ({ navigation }) => {
  return (
    <View style={styles.scanContainer}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="chevron-back" size={24} color="#000" />
      </TouchableOpacity>
      
      <View style={styles.scanFrameContainer}>
        <View style={styles.scanFrame}>
          <View style={[styles.scanCorner, styles.topLeft]} />
          <View style={[styles.scanCorner, styles.topRight]} />
          <View style={[styles.scanCorner, styles.bottomLeft]} />
          <View style={[styles.scanCorner, styles.bottomRight]} />
          
          <Image 
            source={{ uri: 'https://img.freepik.com/free-psd/orange-juice-bottle-mockup_439185-1004.jpg' }} 
            style={styles.productImage} 
            resizeMode="contain"
          />
        </View>
      </View>
      
      <View style={styles.productInfoContainer}>
        <View style={styles.productInfoRow}>
          <Image 
            source={{ uri: 'https://img.freepik.com/free-psd/orange-juice-bottle-mockup_439185-1004.jpg' }} 
            style={styles.productThumbnail} 
          />
          <View style={styles.productInfoText}>
            <Text style={styles.productInfoLabel}>Lauren's</Text>
            <Text style={styles.productInfoName}>Orange Juice</Text>
          </View>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

// Tab Navigator for main app
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Scan') {
            iconName = focused ? 'scan' : 'scan-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4a86f7',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen 
        name="Scan" 
        component={ScanScreen}
        listeners={({ navigation }) => ({
          tabPress: e => {
            // Prevent default action
            e.preventDefault();
            // Navigate to scan screen on tab press
            navigation.navigate('ScanStack');
          },
        })}
      />
    </Tab.Navigator>
  );
};

// Stack Navigator for Scan flow
const ScanStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ScanScreen" component={ScanScreen} />
    </Stack.Navigator>
  );
};

// Main App component with combined navigators
export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="MainTabs" component={TabNavigator} />
          <Stack.Screen name="ScanStack" component={ScanStackNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  username: {
    color: '#8e8e93',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  card: {
    width: '48%',
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#8e8e93',
  },
  exploreTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  productPreviewContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  productPreview: {
    width: 80,
    height: 80,
    backgroundColor: '#f2f2f7',
    borderRadius: 12,
    marginRight: 12,
  },
  additionalNavContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  navIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#f2f2f7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  backButton: {
    padding: 16,
  },
  scanFrameContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanFrame: {
    width: 250,
    height: 350,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  scanCorner: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderColor: 'white',
    borderWidth: 2,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  topRight: {
    top: 0,
    right: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  productImage: {
    width: 200,
    height: 300,
  },
  productInfoContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  productInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productThumbnail: {
    width: 48,
    height: 48,
    borderRadius: 8,
    marginRight: 12,
  },
  productInfoText: {
    flex: 1,
  },
  productInfoLabel: {
    color: '#8e8e93',
  },
  productInfoName: {
    fontSize: 16,
  },
  addButton: {
    width: 32,
    height: 32,
    backgroundColor: '#4a86f7',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

// package.json dependencies to install:
/*
{
  "dependencies": {
    "@react-navigation/bottom-tabs": "^6.5.11",
    "@react-navigation/native": "^6.1.9",
    "@react-navigation/stack": "^6.3.20",
    "expo": "~49.0.15",
    "expo-status-bar": "~1.6.0",
    "react": "18.2.0",
    "react-native": "0.72.6",
    "react-native-gesture-handler": "~2.12.0",
    "react-native-safe-area-context": "4.6.3",
    "react-native-screens": "~3.22.0",
    "@expo/vector-icons": "^13.0.0"
  }
}
*/