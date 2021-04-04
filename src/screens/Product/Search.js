import React from 'react';
import {View, Text} from 'react-native';

export default function Search(props) {
  const {route} = props;
  const {params} = route;
  console.log(params.search);

  return (
    <View>
      <Text>Search....</Text>
    </View>
  );
}
