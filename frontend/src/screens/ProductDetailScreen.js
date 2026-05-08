import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import client from '../api/client';

const ProductDetailScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await client.get(`/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Erro ao buscar produto:', error);
      Alert.alert('Erro', 'Não foi possível carregar o produto');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Text>Carregando...</Text>;
  }

  if (!product) {
    return <Text>Produto não encontrado</Text>;
  }

  const handleAddToCart = () => {
    Alert.alert('Sucesso', 'Produto adicionado ao carrinho');
  };

  const handleBuyNow = () => {
    navigation.navigate('Checkout', { productId: product.id });
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: product.image_url }} style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.brand}>{product.brand}</Text>
        <Text style={styles.model}>{product.model}</Text>

        <View style={styles.specsContainer}>
          <View style={styles.specItem}>
            <Text style={styles.specLabel}>RAM</Text>
            <Text style={styles.specValue}>{product.ram}GB</Text>
          </View>
          <View style={styles.specItem}>
            <Text style={styles.specLabel}>Armazenamento</Text>
            <Text style={styles.specValue}>{product.storage}GB</Text>
          </View>
          <View style={styles.specItem}>
            <Text style={styles.specLabel}>Condição</Text>
            <Text style={styles.specValue}>{product.condition}</Text>
          </View>
        </View>

        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Preço</Text>
          <Text style={styles.price}>R$ {product.price.toFixed(2)}</Text>
        </View>

        <Text style={styles.descriptionTitle}>Descrição</Text>
        <Text style={styles.description}>{product.description}</Text>

        <TouchableOpacity style={styles.buyButton} onPress={handleBuyNow}>
          <Text style={styles.buyButtonText}>Comprar Agora</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cartButton} onPress={handleAddToCart}>
          <Text style={styles.cartButtonText}>Adicionar ao Carrinho</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  image: {
    width: '100%',
    height: 300,
  },
  content: {
    padding: 20,
    backgroundColor: '#fff',
  },
  brand: {
    fontSize: 14,
    color: '#999',
    marginBottom: 5,
  },
  model: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  specsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#eee',
    marginBottom: 15,
  },
  specItem: {
    alignItems: 'center',
  },
  specLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 5,
  },
  specValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  priceContainer: {
    marginBottom: 20,
  },
  priceLabel: {
    fontSize: 14,
    color: '#999',
    marginBottom: 5,
  },
  price: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
    marginBottom: 20,
  },
  buyButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cartButton: {
    borderWidth: 2,
    borderColor: '#007AFF',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  cartButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProductDetailScreen;