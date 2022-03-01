import React, {useState, useEffect, useMemo, useReducer} from 'react';
import {View, ActivityIndicator} from 'react-native';
import Main from './components/Main';
import {NavigationContainer} from '@react-navigation/native';
import RootStackScreen from './components/RootStackScreen';
import {enableScreens} from 'react-native-screens';
import {AuthContext} from './components/Context';
import AsyncStorage from '@react-native-community/async-storage';

enableScreens();

const App = () => {
  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null
  };

  const loginReducer = (prevState, action) => {
    switch(action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
        case 'LOGIN':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
        case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
        case 'REGISTER':
        return {...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,};

    }
  }

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

  const authContext = React.useMemo(() => ({
    signIn: async(userName, password) => {
      //setUserToken('fgkj');
      //setIsLoading(false);
      let userToken = null;
       
      
      if( userName === 'user' && password === 'pass') {
        userToken = 'dfgdfg';
        console.log("SIGNTOKEN" + userToken);
        try {
          await AsyncStorage.setItem('userToken', userToken)
        } catch(e) {
          console.log(e);
        }
      }
      dispatch({ type: 'LOGIN', id: userName, token: userToken });
      console.log("user Token" + userToken);
      console.log("username" + userName);
      console.log("password" + password);
    },
    signOut: async() => {
      // setUserToken('null');
      // setIsLoading(false);
      try {
        await AsyncStorage.removeItem('userToken')
        console.log("OUTTOKEN" + userToken);
      } catch(e) {
        console.log(e);
      }
      dispatch({type: 'LOGOUT'});
    },
    signUp: () => {
      setUserToken('fgkj');
      console.log("UPTOKEN" + userToken);
      setIsLoading(false);
    }
  }), []);

  useEffect(() => {
    setTimeout(async() => {
      //setIsLoading(false);
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch(e) {
        console.log(e);
      }
      console.log('user token', userToken);
      dispatch({ type: 'REGISTER', token: userToken });
    }, 1000)
  }, []);

  if( loginState.isLoading ) {
    return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size="large" />
    </View>
    );
  }
  return (
    <AuthContext.Provider value={authContext}>
    <NavigationContainer>
      { loginState.userToken !== null ? (
        <Main /> ):
<RootStackScreen />  
      }   
    </NavigationContainer> 
    </AuthContext.Provider>
  );
};
export default App;

 {/* <RootDrawer.Navigator initialRouteName="Main">
        <RootDrawer.Screen name="Main" component={Main} />
        <RootDrawer.Screen name="Drawer1" component={Drawer1} />
        <RootDrawer.Screen name="Drawer2" component={Drawer2} />
      </RootDrawer.Navigator>*/}