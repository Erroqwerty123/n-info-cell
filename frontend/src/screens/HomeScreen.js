import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  TextInput,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import client from '../api/client';

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchProducts();
  }, [search]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await client.get('/products', {
        params: { search: search || undefined },
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderProduct = ({ item }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => navigation.navigate('ProductDetail', { id: item.id })}
    >
      <Image source={{ uri: item.image_url }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.brand}>{item.brand}</Text>
        <Text style={styles.model}>{item.model}</Text>
        <Text style={styles.specs}>{item.ram}GB RAM | {item.storage}GB</Text>
        <Text style={styles.price}>R$ {item.price.toFixed(2)}</Text>
        <Text style={styles.rating}>⭐ {item.rating.toFixed(1)}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>N - INFO CELL</Text>
        <Text style={styles.subtitle}>Compre e Venda Celulares</Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar marca ou modelo..."
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" style={styles.loader} />
      ) : (
        <FlatList
          data={products}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.productList}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#007AFF',
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 14,
    color: '#fff',
    marginTop: 5,
  },
  searchContainer: {
    padding: 10,
    backgroundColor: '#fff',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
  productList: {
    padding: 10,
  },
  row: {
    justifyContent: 'space-between',
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    width: '48%',
    elevation: 2,
  },
  productImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
  productInfo: {
    padding: 5,
  },
  brand: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  model: {
    fontSize: 12,
    color: '#666',
    marginVertical: 3,
  },
  specs: {
    fontSize: 11,
    color: '#999',
    marginVertical: 2,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
    marginTop: 5,
  },
  rating: {
    fontSize: 12,
    marginTop: 3,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default HomeScreen;