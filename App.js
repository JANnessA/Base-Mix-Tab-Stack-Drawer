import * as React from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

//components header
function CustomHeader(props) {
  const {title, isHome, navigation} = props;
  return (
    <View
      style={{
        flexDirection: 'row',
        height: 50,
      }}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {isHome ? (
          <TouchableOpacity
            onPress={() => {
              navigation.openDrawer();
            }}>
            <Ionicons name={'menu'} size={30} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Ionicons name={'chevron-back'} size={30} />
          </TouchableOpacity>
        )}
      </View>
      <View
        style={{
          flex: 2,
          justifyContent: 'center',
        }}>
        <Text style={{textAlign: 'center', fontSize: 20}}>{title}</Text>
      </View>
      <View style={{flex: 1}} />
    </View>
  );
}

//screens
function HomeScreen({navigation}) {
  return (
    <View style={{flex: 1}}>
      <CustomHeader title={'Home'} isHome={true} navigation={navigation} />
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('HomeDetail');
          }}>
          <Text>Go to Home Detail</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function HomeScreenDetail({navigation}) {
  return (
    <View style={{flex: 1}}>
      <CustomHeader title={'HomeDetail'} navigation={navigation} />
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Home');
          }}>
          <Text>Go to Home Screen</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function SettingsScreen({navigation}) {
  return (
    <View style={{flex: 1}}>
      <CustomHeader title={'Setting'} isHome={true} navigation={navigation} />
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('SettingDetail');
          }}>
          <Text>Go to Setting Detail</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function SettingsScreenDetail({navigation}) {
  return (
    <View style={{flex: 1}}>
      <CustomHeader title={'Setting Detail'} navigation={navigation} />
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Setting');
          }}>
          <Text>Go to Setting Screen</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function NotificationsScreen({navigation}) {
  return (
    <View style={{flex: 1}}>
      <CustomHeader title={'Notification'} navigation={navigation} />
    </View>
  );
}

function LoginScreen({navigation}) {
  return (
    <View style={{flex: 1}}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text>Login Screen</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('HomeApp');
          }}>
          <Text>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Register');
          }}>
          <Text>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function RegisterScreen({navigation}) {
  return (
    <View style={{flex: 1}}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <CustomHeader title={'Register'} navigation={navigation} />
        <TouchableOpacity onPress={() => {}}>
          <Text>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <Text>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

//draw drawer content
function CustomDrawerCotent(props) {
  const {navigation} = props;
  return (
    <View style={{flex: 1, backgroundColor: 'pink'}}>
      <View style={{alignItems: 'center', marginVertical: 20}}>
        <Ionicons name={'person'} size={50} color={'red'} />
      </View>
      <ScrollView>
        <TouchableOpacity
          style={{marginTop: 20, marginLeft: 10}}
          onPress={() => {
            navigation.navigate('MenuTab');
          }}>
          <Text style={{fontSize: 15}}>Menu Tab</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{marginTop: 20, marginLeft: 10}}
          onPress={() => {
            navigation.navigate('Notifications');
          }}>
          <Text style={{fontSize: 15}}>Notifications</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

//bottomtab
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Settings" component={SettingStack} />
    </Tab.Navigator>
  );
}

//drawer navigator
function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="MenuTab"
      drawerContent={props => CustomDrawerCotent(props)}>
      <Drawer.Screen name="MenuTab" component={TabNavigator} />
      <Drawer.Screen name="Notifications" component={NotificationsScreen} />
    </Drawer.Navigator>
  );
}

const Tab = createBottomTabNavigator();
const navOptionHandler = () => ({
  headerShown: false,
});

const StackHome = createStackNavigator();
function HomeStack() {
  return (
    <StackHome.Navigator initialRouteName={'Home'}>
      <StackHome.Screen
        name="Home"
        component={HomeScreen}
        options={navOptionHandler}
      />
      <StackHome.Screen
        name="HomeDetail"
        component={HomeScreenDetail}
        options={navOptionHandler}
      />
    </StackHome.Navigator>
  );
}

const StackSetting = createStackNavigator();
function SettingStack() {
  return (
    <StackSetting.Navigator initialRouteName={'Setting'}>
      <StackSetting.Screen
        name="Setting"
        component={SettingsScreen}
        options={navOptionHandler}
      />
      <StackSetting.Screen
        name="SettingDetail"
        component={SettingsScreenDetail}
        options={navOptionHandler}
      />
    </StackSetting.Navigator>
  );
}

const Drawer = createDrawerNavigator();
const StackApp = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StackApp.Navigator initialRouteName={'Login'}>
        <StackApp.Screen
          name="HomeApp"
          component={DrawerNavigator}
          options={navOptionHandler}
        />
        <StackApp.Screen
          name="Login"
          component={LoginScreen}
          options={navOptionHandler}
        />
        <StackApp.Screen
          name="Register"
          component={RegisterScreen}
          options={navOptionHandler}
        />
      </StackApp.Navigator>
    </NavigationContainer>
  );
}
