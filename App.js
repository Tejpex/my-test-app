import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createStackNavigator } from "@react-navigation/stack"
import "react-native-gesture-handler"
import "react-native-reanimated"

// Stack-navigator

const Stack = createStackNavigator()

const OverviewScreen = () => (
  <View style={styles.layout}>
    <Text style={styles.title}>Profile</Text>
  </View>
)

const SettingsScreen = () => (
  <View style={styles.layout}>
    <Text style={styles.title}>Settings</Text>
  </View>
)

export const ProfileNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Settings" component={SettingsScreen} />
    <Stack.Screen name="Overview" component={OverviewScreen} />
  </Stack.Navigator>
)


// Tab-navigator

const Tab = createBottomTabNavigator()

const FeedScreen = () => (
  <View style={styles.layout}>
    <Text style={styles.title}>Feed</Text>
  </View>
)

export const AppNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen name="Feed" component={FeedScreen} />
    <Tab.Screen name="Profile" component={ProfileNavigator} />
  </Tab.Navigator>
)

const App = () => (
  <NavigationContainer>
    <AppNavigator />
  </NavigationContainer>
)

export default App

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    marginBottom: 16,
  },
})
