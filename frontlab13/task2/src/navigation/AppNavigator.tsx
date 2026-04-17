    import React from 'react';
    import { View, Text, StyleSheet } from 'react-native';
    import { NavigationContainer } from '@react-navigation/native';
    import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
    import { createNativeStackNavigator } from '@react-navigation/native-stack';
    import { Ionicons } from '@expo/vector-icons';

    import HomeScreen from '../screens/HomeScreen';
    import SearchScreen from '../screens/SearchScreen';
    import NotificationsScreen from '../screens/NotificationsScreen';
    import ProfileScreen from '../screens/ProfileScreen';
    import SettingsScreen from '../screens/SettingsScreen';
    import { RootStackParamList, TabParamList } from './types';

    const Stack = createNativeStackNavigator<RootStackParamList>();
    const Tab = createBottomTabNavigator<TabParamList>();

    function HomeStack() {
    return (
        <Stack.Navigator
        screenOptions={{
            headerStyle: { backgroundColor: '#0066cc' },
            headerTintColor: '#fff',
        }}
        >
        <Stack.Screen
            name="HomeMain"
            component={HomeScreen}
            options={{ title: 'Home' }}
        />
        <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{ title: 'Profile' }}
        />
        <Stack.Screen
            name="Settings"
            component={SettingsScreen}
            options={{ title: 'Settings' }}
        />
        </Stack.Navigator>
    );
    }

    function SearchStack() {
    return (
        <Stack.Navigator
        screenOptions={{
            headerStyle: { backgroundColor: '#0066cc' },
            headerTintColor: '#fff',
        }}
        >
        <Stack.Screen
            name="SearchMain"
            component={SearchScreen}
            options={{ title: 'Search' }}
        />
        </Stack.Navigator>
    );
    }

    function NotificationsStack() {
    return (
        <Stack.Navigator
        screenOptions={{
            headerStyle: { backgroundColor: '#0066cc' },
            headerTintColor: '#fff',
        }}
        >
        <Stack.Screen
            name="NotificationsMain"
            component={NotificationsScreen}
            options={{ title: 'Notifications' }}
        />
        </Stack.Navigator>
    );
    }

    function ProfileStack() {
    return (
        <Stack.Navigator
        screenOptions={{
            headerStyle: { backgroundColor: '#0066cc' },
            headerTintColor: '#fff',
        }}
        >
        <Stack.Screen
            name="ProfileMain"
            component={ProfileScreen as React.ComponentType<any>}
            initialParams={{ userId: '123' }}
            options={{ title: 'Profile' }}
        />
        <Stack.Screen
            name="Settings"
            component={SettingsScreen}
            options={{ title: 'Settings' }}
        />
        </Stack.Navigator>
    );
    }

    interface TabIconProps {
    name: keyof typeof Ionicons.glyphMap;
    color: string;
    size: number;
    badge?: number;
    }

    function TabIcon({ name, color, size, badge }: TabIconProps) {
    return (
        <View style={styles.tabIconContainer}>
        <Ionicons name={name} size={size} color={color} />
        {badge !== undefined && badge > 0 && (
            <View style={styles.badge}>
            <Text style={styles.badgeText}>{badge > 9 ? '9+' : badge}</Text>
            </View>
        )}
        </View>
    );
    }

    export default function AppNavigator() {
    return (
        <NavigationContainer>
        <Tab.Navigator
            screenOptions={{
            tabBarActiveTintColor: '#0066cc',
            tabBarInactiveTintColor: '#999',
            tabBarStyle: {
                backgroundColor: '#ffffff',
                borderTopWidth: 1,
                borderTopColor: '#e0e0e0',
                paddingTop: 8,
                paddingBottom: 8,
                height: 60,
            },
            tabBarLabelStyle: {
                fontSize: 12,
                fontWeight: '500',
            },
            headerShown: false,
            }}
        >
            <Tab.Screen
            name="Home"
            component={HomeStack}
            options={{
                tabBarIcon: ({ color, size }) => (
                <TabIcon name="home" color={color} size={size} />
                ),
            }}
            />
            <Tab.Screen
            name="Search"
            component={SearchStack}
            options={{
                tabBarIcon: ({ color, size }) => (
                <TabIcon name="search" color={color} size={size} />
                ),
            }}
            />
            <Tab.Screen
            name="Notifications"
            component={NotificationsStack}
            options={{
                tabBarIcon: ({ color, size }) => (
                <TabIcon
                    name="notifications"
                    color={color}
                    size={size}
                    badge={5}
                />
                ),
            }}
            />
            <Tab.Screen
            name="Profile"
            component={ProfileStack}
            options={{
                tabBarIcon: ({ color, size }) => (
                <TabIcon name="person" color={color} size={size} />
                ),
            }}
            />
        </Tab.Navigator>
        </NavigationContainer>
    );
    }

    const styles = StyleSheet.create({
    tabIconContainer: {
        position: 'relative',
    },
    badge: {
        position: 'absolute',
        top: -4,
        right: -8,
        backgroundColor: '#dc3545',
        borderRadius: 10,
        minWidth: 18,
        height: 18,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 4,
    },
    badgeText: {
        color: '#ffffff',
        fontSize: 10,
        fontWeight: 'bold',
    },
    });