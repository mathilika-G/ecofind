import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';
import IndexScreen from './app/index';
import LoginScreen from './app/login';
import SignupScreen from './app/signup';
import AddProductScreen from './app/add-product';
import MyListingsScreen from './app/my-listings';
import ProductDetailScreen from './app/product/[id]';
import CartScreen from './app/cart';
import PurchasesScreen from './app/purchases';
import DashboardScreen from './app/dashboard';

const Stack = createStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Index" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Index" component={IndexScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="AddProduct" component={AddProductScreen} />
            <Stack.Screen name="MyListings" component={MyListingsScreen} />
            <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
            <Stack.Screen name="Cart" component={CartScreen} />
            <Stack.Screen name="Purchases" component={PurchasesScreen} />
            <Stack.Screen name="Dashboard" component={DashboardScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </ProductProvider>
    </AuthProvider>
  );
}
