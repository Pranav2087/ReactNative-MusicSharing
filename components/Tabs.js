import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LinearGradient from 'react-native-linear-gradient';
import Map from '../screens/map';
import Nearby from '../screens/Nearby';
import Profile from '../screens/Profile';
import { colors, sizes } from '../data/theme';
import icons from '../data/icons';
import MapContext from '../components/MapContext';

function TabIcon({ focused, icon, size }) {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        height: 90,
        width: focused ? 110 : 50,
        backgroundColor: focused ? colors.blackColorTranslucentMore : 'transparent',
        marginBottom: focused ? 0 : 10,
      }}
    >
      <Image
        source={icon}
        resizeMode="contain"
        style={{
          width: size,
          height: size,
          tintColor: focused ? colors.white : colors.lightLime,
        }}
      />
    </View>
  );
}

const Tab = createBottomTabNavigator();

function tabOptions(icon, size) {
  
  return {
    tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon={icon} size={size} />,
    tabBarActiveTintColor: colors.white,
    tabBarInactiveTintColor: colors.lightLime,
    headerStyle: {
      backgroundColor: colors.darkGreen,
      height: 50,
    },
    headerTintColor: colors.white,
    headerTitleAlign: 'center',
    headerTitleStyle: {
      fontSize: sizes.body2,
    },
    tabBarStyle: {
      height: 70,
      padding: 35,
      backgroundColor: 'transparent',
    },
    tabBarLabel:'',
    tabBarBackground: () => (
      <LinearGradient
        colors={[colors.purpleColorLighter,colors.blueColorDarker]}
        style={StyleSheet.absoluteFill}
      />
    ),
  };
}

function Tabs({ navigation }) {
  const { NerLov,Lname,locationID } = React.useContext(MapContext);
    return (
      <Tab.Navigator
        tabBarOptions={{
          style: { backgroundColor: 'transparent' },
          tabStyle: { justifyContent: 'center', alignItems: 'center' },
        }}
      >
        <Tab.Screen
          name="Map"
          children={() => <Map navigation={navigation} />}
          options={{ 
            ...tabOptions(icons.map, 30), 
            headerShown: false, 
            tabBarLabel: '' 
          }}
        />
        <Tab.Screen
          name="r"
          children={() => <Nearby navigation={navigation}/>}
          options={{ 
            ...tabOptions(icons.logo, 100), 
            headerShown: false, 
            tabBarLabel: NerLov
          }}
        />
        <Tab.Screen
          name="Profile"
          children={() => <Profile navigation={navigation}/>}
          options={{ 
            ...tabOptions(icons.profile, 30), 
            headerShown: false,
            tabBarLabel: ''
          }}
        />
      </Tab.Navigator>
    );
  }
  

export default Tabs;
