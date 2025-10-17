import * as React from 'react';
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './app/screens/Login';
import HomeScreen from './app/screens/Home';
import UsersScreen from './app/screens/Users';
// import ProductsScreen from './app/screens/Products';


const RootStack = createNativeStackNavigator({
  screens: {
    Login: {
      screen: LoginScreen,
      options: { headerShown: false },
    },
    Home: {
      screen: HomeScreen,
      options: { headerTitle: 'Welcome' },
    },
    Users: {
      screen: UsersScreen,
      options: { headerTitle: 'Users List'}
    },
    // Products: {
    //   screen: ProductsScreen,
    //   options: { headerTitle: 'Products List'}
    // }
  },
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  return <Navigation />;
}

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen
//           name="Login"
//           component={LoginScreen}
//           options={{ headerShown: false }}
//         />
//         <Stack.Screen
//           name="Home"
//           component={HomeScreen}
//           options={{ headerShown: true, title: "Welcome" }}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }
