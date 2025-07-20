import 'react-native-gesture-handler';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import AddExpenseScreen from './screens/AddExpenseScreen';
import SettingsScreen from './screens/SettingsScreen';
import UserMenu from './components/UserMenu';
import { Ionicons } from '@expo/vector-icons';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function HeaderLeft({ navigation }) {
  return (
    <TouchableOpacity onPress={() => navigation.openDrawer()} style={{ marginLeft: 15 }}>
      <Ionicons name="menu" size={24} color="white" />
    </TouchableOpacity>
  );
}

function HeaderRight() {
  return <UserMenu />;
}

function HomeStack({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Ana Sayfa"
        component={HomeScreen}
        options={{
          headerLeft: () => <HeaderLeft navigation={navigation} />,
          headerRight: () => <HeaderRight />,
          headerStyle: { backgroundColor: '#f85c70' },
          headerTintColor: 'white',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
      <Stack.Screen
        name="Harcama Ekle"
        component={AddExpenseScreen}
        options={{
          headerLeft: () => <HeaderLeft navigation={navigation} />,
          headerRight: () => <HeaderRight />,
          headerStyle: { backgroundColor: '#f85c70' },
          headerTintColor: 'white',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
    </Stack.Navigator>
  );
}

function SettingsStack({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Ayarlar"
        component={SettingsScreen}
        options={{
          headerLeft: () => <HeaderLeft navigation={navigation} />,
          headerRight: () => <HeaderRight />,
          headerStyle: { backgroundColor: '#f85c70' },
          headerTintColor: 'white',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          drawerType: 'front',
          drawerStyle: {
            width: '60%',
            backgroundColor: '#fff',
          },
          drawerActiveTintColor: '#f85c70',
          drawerLabelStyle: { fontWeight: 'bold' },
          headerShown: false,
        }}
      >
        <Drawer.Screen name="Harcama Takibi" component={HomeStack} />
        <Drawer.Screen name="Ayarlar" component={SettingsStack} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}