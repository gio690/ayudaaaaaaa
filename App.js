import React, {useState, useEffect, useMemo} from 'react';
import {View, Text, Button} from 'react-native';
import {Provider as PaperProvide} from 'react-native-paper';
import jwtDecode from 'jwt-decode';
import AppNavigation from './src/navigation/AppNavigation';
import AuthScreen from './src/screens/Auth';
import AuthContext from './src/context/AuthContext';

import {setTokenApi, getTokenApi, removeTokenApi} from './src/api/token';

export default function App() {
  const [auth, setAuth] = useState(undefined);

  useEffect(() => {
    (async () => {
      const token = await getTokenApi();
      if (token) {
        setAuth({
          token,
          idUser: jwtDecode(token).id,
        });
      } else {
        setAuth(null);
      }
    })();
  }, []);

  const login = user => {
    console.log('LOGIN APP.JS');
    setTokenApi(user.jwt);
    setAuth({
      token: user.jwt,
      idUser: user.user._id,
    });
  };

  const logout = () => {
    if (auth) {
      removeTokenApi();
      setAuth(null);
    }
  };

  const authData = useMemo(
    () => ({
      auth,
      login,
      logout,
    }),
    [auth],
  );

  if (auth === undefined) return null;

  return (
    <AuthContext.Provider value={authData}>
      <PaperProvide>{auth ? <AppNavigation /> : <AuthScreen />}</PaperProvide>
    </AuthContext.Provider>
  );
}
