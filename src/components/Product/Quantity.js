import React from 'react';
import {StyleSheet, View} from 'react-native';
import DropdownPicker from 'react-native-dropdown-picker';

export default function Quantity(props) {
  const {quantity, setQuantity} = props;
  return (
    <View styles={{zIndex: 2}}>
      <DropdownPicker
        items={[
          {
            label: '1',
            value: 1,
          },
          {
            label: '2',
            value: 2,
          },
          {
            label: '3',
            value: 3,
          },
        ]}
        defaultValue={quantity}
        containerStyle={styles.containerStyle}
        itemStyle={styles.itemStyle}
        dropDownStyle={styles.dropdownPicker}
        style={styles.dropdownPicker}
        labelStyle={styles.labelStyle}
        onChangeItem={item => setQuantity(item.value)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    height: 40,
    width: 100,
  },
  itemStyle: {
    justifyContent: 'flex-start',
  },
  dropdownPicker: {
    backgroundColor: '#fafafa',
  },
  labelStyle: {
    color: '#000',
  },
});
