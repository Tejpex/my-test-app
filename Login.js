import React, { createContext, useContext, useState } from "react"
import { StyleSheet, Text, View, Button } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

// Our global authentication state, with default values
export const AuthContext = createContext({
  hasUser: false,
  setUser: () => {},
})

const LoginScreen = () => {
  const { setUser } = useContext(AuthContext)

  return (
    <View style={styles.layout}>
      <Text style={styles.title}>Login</Text>
      <Button onPress={() => setUser(true)} title="Log in" />
    </View>
  )
}

const FeedScreen = () => {
  const { setUser } = useContext(AuthContext)

  return (
    <View style={styles.layout}>
      <Text style={styles.title}>Feed</Text>
      <Button onPress={() => setUser(false)} title="Log out" />
    </View>
  )
}

const Stack = createBottomTabNavigator()

export const AppNavigator = () => {
  const { hasUser } = useContext(AuthContext)

  if (hasUser) {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Feed" component={FeedScreen} />
      </Stack.Navigator>
    )
  } else {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    )
  }
}

const App = () => {
  // This is linked to our global authentication state.
  // We connect this in React to re-render components when changing this value.
  const [hasUser, setUser] = useState(false)

  return (
    <AuthContext.Provider value={{ hasUser, setUser }}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthContext.Provider>
  )
}

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
