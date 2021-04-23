import React from 'react';
import {StyleSheet, View, Text, Image, TextInput} from 'react-native';
import {Button, IconButton} from 'react-native-paper';
import {
  deleteProductCartApi,
  increaseProductCartApi,
  decreaseProductCartApi,
} from '../../api/cart';
import {API_URL} from '../../utils/constants';
import colors from '../../styles/colors';

export default function Product(props) {
  const {product, setReloadCart} = props;

  const calcPrice = (price, discount) => {
    if (!discount) return price;

    const discountAmount = (price * discount) / 100;
    return (price - discountAmount).toFixed(2);
  };

  const deleteProductCart = async () => {
    const response = await deleteProductCartApi(product._id);
    if (response) setReloadCart(true);
  };

  const increaseProductCart = async () => {
    const response = await increaseProductCartApi(product._id);
    if (response) setReloadCart(true);
  };

  const decreaseProductCart = async () => {
    const response = await decreaseProductCartApi(product._id);
    if (response) setReloadCart(true);
  };

  return (
    <View style={styles.product}>
      <View style={styles.containerImage}>
        <Image
          style={styles.image}
          source={{uri: `${API_URL}${product.main_image.url}`}}
        />
      </View>
      <View style={styles.info}>
        <View>
          <Text style={styles.name} numberOfLines={3} ellipsizeMode="tail">
            {product.title}
          </Text>
          <View style={styles.prices}>
            <Text style={styles.currentPrice}>
              S/{calcPrice(product.price, product.discount)}
            </Text>
          </View>
          {product.discount && (
            <View style={styles.countainerDiscount}>
              <Text style={styles.discountText}>Ahorras:</Text>
              <Text style={styles.discountValue}>
                S/{((product.price * product.discount) / 100).toFixed(2)}(
                {product.discount}%)
              </Text>
            </View>
          )}
        </View>
        <View style={styles.btnContainer}>
          <View style={styles.selectQuantify}>
            <IconButton
              icon="plus"
              color="#fff"
              size={19}
              style={styles.btnQuantifi}
              onPress={increaseProductCart}
            />
            <TextInput
              style={styles.inputQuantity}
              value={product.quantify.toString()}
            />
            <IconButton
              icon="minus"
              color="#fff"
              size={19}
              style={styles.btnQuantifi}
              onPress={decreaseProductCart}
            />
          </View>
          <Button color="#b12704" mode="contained" onPress={deleteProductCart}>
            Eliminar
          </Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  product: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: '#dadde1',
  },
  containerImage: {
    width: '40%',
    height: 170,
    padding: 5,
    backgroundColor: '#ebebeb',
  },
  image: {
    height: '100%',
    resizeMode: 'contain',
  },
  info: {
    padding: 10,
    width: '60%',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 16,
  },
  prices: {
    flexDirection: 'row',
    marginTop: 5,
    alignItems: 'flex-end',
  },
  currentPrice: {
    fontSize: 18,
    color: '#b12704',
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
    width: '100%',
  },
  selectQuantify: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnQuantifi: {
    backgroundColor: colors.primary,
    borderRadius: 5,
    margin: 0,
  },
  inputQuantity: {
    paddingHorizontal: 10,
    fontSize: 16,
  },
  countainerDiscount: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  discountText: {
    fontSize: 14,
    color: '#747474',
  },
  discountValue: {
    fontSize: 14,
    color: '#747474',
    paddingLeft: 5,
  },
});
