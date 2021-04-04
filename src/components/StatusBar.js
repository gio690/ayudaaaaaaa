import React from 'react';
import {StatusBar, SafeAreaView} from 'react-native';

export default function StatusBarCustom(props) {
  const {backgrouncolor, ...rest} = props;

  return (
    <>
      <StatusBar backgrouncolor={backgrouncolor} {...rest} />
      <SafeAreaView
        style={{
          flex: 0,
          backgroundColor: backgrouncolor,
        }}
      />
    </>
  );
}
