import * as React from 'react'
import { StyleSheet, View, Text, TextInput } from 'react-native'
import { NavigationContainer, useNavigation } from "@react-navigation/native"
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Button } from "@react-navigation/elements"

const HomeScreen = ({route}) => {
  const navigation = useNavigation()

  // Use an effect to monitor the update to params
  React.useEffect(() => {
    if (route.params?.post) {
      // Post updated, do something with `route.params.post`
      // For example, send the post to the server
      alert("New post: " + route.params?.post)
    }
  }, [route.params?.post])

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Text style={{ margin: 10 }}>Post: {route.params?.post}</Text>
      <Button onPress={() => navigation.navigate("CreatePost")}>
        Create post
      </Button>
      <Button
        onPress={() =>
          navigation.navigate("Profile", {
            itemId: 89,
            otherParam: "my param text",
          })
        }
      >
        Go to Profile
      </Button>
    </View>
  )
}

const CreatePostScreen = () => {
  const navigation = useNavigation()
  const [postText, setPostText] = React.useState("")

  return (
    <>
      <TextInput
        multiline
        placeholder="What's on your mind?"
        style={{ height: 200, padding: 10, backgroundColor: "white" }}
        value={postText}
        onChangeText={setPostText}
      />
      <Button
        onPress={() => {
          // Pass params back to home screen
          navigation.popTo("Home", { post: postText })
        }}
      >
        Done
      </Button>
    </>
  )
}

const ProfileScreen = ({route}) => {
  const navigation = useNavigation()
  const { itemId, otherParam } = route.params
  return (
    <View style={styles.layout}>
      <Text style={styles.title}>Profile</Text>
      <Text>itemId: {JSON.stringify(itemId)}</Text>
      <Text>otherParam: {JSON.stringify(otherParam)}</Text>
      <Button
        onPress={() =>
          navigation.push("Profile", {
            itemId: Math.floor(Math.random() * 100),
          })
        }
      >
        Go to Profile... again
      </Button>
      <Button onPress={() => navigation.goBack()}>Go back</Button>
      <Button onPress={() => navigation.popTo("Home")}>Go to Home</Button>
      <Button onPress={() => navigation.popToTop()}>
        Go back to first screen in stack
      </Button>
      <Button
        onPress={() =>
          navigation.setParams({
            itemId: Math.floor(Math.random() * 100),
          })
        }
      >
        Change number
      </Button>
    </View>
  )
}

// Stack-navigator
const Stack = createNativeStackNavigator()

function RootStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: { backgroundColor: "tomato" },
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Overview" }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        initialParams={{ otherParam: "Hello there..." }}
      />
      <Stack.Screen name="CreatePost" component={CreatePostScreen}/>
    </Stack.Navigator>
  )
}

const App = () => {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
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
