import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Print } from 'expo-print';
import client from '../api/client';

const CheckoutScreen = ({ route, navigation }) => {
  const { productId } = route.params;
  const [product, setProduct] = useState(null);
  const [order, setOrder] = useState(null);
  const [selectedWarranty, setSelectedWarranty] = useState(null);
  const [warranties, setWarranties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [printing, setPrinting] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [productRes, warrantyRes] = await Promise.all([
        client.get(`/products/${productId}`),
        client.get('/terms/warranty'),
      ]);
      setProduct(productRes.data);
      setWarranties(warrantyRes.data);
      if (warrantyRes.data.length > 0) {
        setSelectedWarranty(warrantyRes.data[0].id);
      }
    } catch (error) {
      console.error('Erro ao carregar checkout:', error);
      Alert.alert('Erro', 'Não foi possível carregar os dados');
    } finally {
      setLoading(false);
    }
  };

  const handleCheckout = async () => {
    if (!agreeTerms) {
      Alert.alert('Aviso', 'Você precisa concordar com os termos');
      return;
    }

    try {
      const orderData = {
        product_id: product.id,
        quantity: 1,
        total_price: product.price,
        warranty_term_id: selectedWarranty,
      };

      const response = await client.post('/orders', orderData);
      setOrder(response.data);
      Alert.alert('Sucesso', 'Pedido criado com sucesso!');
    } catch (error) {
      console.error('Erro ao criar pedido:', error);
      Alert.alert('Erro', 'Não foi possível criar o pedido');
    }
  };

  const handlePrintA4 = async () => {
    if (!order) {
      Alert.alert('Aviso', 'Crie o pedido primeiro');
      return;
    }

    try {
      setPrinting(true);
      const response = await client.post('/print/receipt-a4', {
        order,
        product,
      });
      await Print.printAsync({
        html: response.data.html,
      });
    } catch (error) {
      console.error('Erro ao imprimir:', error);
      Alert.alert('Erro', 'Não foi possível imprimir');
    } finally {
      setPrinting(false);
    }
  };

  const handlePrint80mm = async () => {
    if (!order) {
      Alert.alert('Aviso', 'Crie o pedido primeiro');
      return;
    }

    try {
      setPrinting(true);
      const response = await client.post('/print/receipt-80mm', {
        order,
        product,
      });
      await Print.printAsync({
        html: `<pre>${response.data.text}</pre>`,
      });
    } catch (error) {
      console.error('Erro ao imprimir:', error);
      Alert.alert('Erro', 'Não foi possível imprimir');
    } finally {
      setPrinting(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size='large' />;
  }

  if (!product) {
    return <Text>Produto não encontrado</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Resumo do Pedido</Text>
        <View style={styles.orderSummary}>
          <View style={styles.row}>
            <Text>Produto:</Text>
            <Text style={styles.bold}>{product.brand} {product.model}</Text>
          </View>
          <View style={styles.row}>
            <Text>Quantidade:</Text>
            <Text style={styles.bold}>1</Text>
          </View>
          <View style={[styles.row, styles.totalRow]}>
            <Text style={styles.bold}>Total:</Text>
            <Text style={styles.priceText}>R$ {product.price.toFixed(2)}</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Garantia</Text>
        {warranties.map((warranty) => (
          <TouchableOpacity
            key={warranty.id}
            style={[
              styles.warrantyOption,
              selectedWarranty === warranty.id && styles.selectedWarranty,
            ]}
            onPress={() => setSelectedWarranty(warranty.id)}
          >
            <View style={styles.radioButton}>
              {selectedWarranty === warranty.id && <View style={styles.radioFilled} />}
            </View>
            <View style={styles.warrantyInfo}>
              <Text style={styles.bold}>{warranty.title}</Text>
              <Text style={styles.smallText}>{warranty.duration_months} meses de cobertura</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.section}>
        <TouchableOpacity
          style={[styles.checkbox, agreeTerms && styles.checkboxChecked]}
          onPress={() => setAgreeTerms(!agreeTerms)}
        >
          <Text>✓</Text>
        </TouchableOpacity>
        <Text style={styles.termsText}>
          Concordo com os termos de responsabilidade e garantia
        </Text>
      </View>

      {!order ? (
        <TouchableOpacity style={styles.button} onPress={handleCheckout}>
          <Text style={styles.buttonText}>Confirmar Pedido</Text>
        </TouchableOpacity>
      ) : (
        <>
          <View style={styles.successMessage}>
            <Text style={styles.successText}>Pedido criado com sucesso!</Text>
            <Text style={styles.orderNumber}>Pedido #${order.id}</Text>
          </View>

          <View style={styles.printSection}>
            <Text style={styles.sectionTitle}>Imprimir Recibo</Text>
            <TouchableOpacity
              style={[styles.button, styles.printButton]}
              onPress={handlePrintA4}
              disabled={printing}
            >
              <Text style={styles.buttonText}>
                {printing ? 'Imprimindo...' : 'Imprimir A4'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.printButton]}
              onPress={handlePrint80mm}
              disabled={printing}
            >
              <Text style={styles.buttonText}>
                {printing ? 'Imprimindo...' : 'Imprimir 80mm (Térmica)'}
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 15,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  orderSummary: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#eee',
    paddingVertical: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  totalRow: {
    borderTopWidth: 1,
    borderColor: '#eee',
    marginTop: 10,
    paddingTop: 10,
  },
  bold: {
    fontWeight: 'bold',
  },
  priceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  warrantyOption: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
    alignItems: 'flex-start',
  },
  selectedWarranty: {
    backgroundColor: '#f0f8ff',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#007AFF',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioFilled: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#007AFF',
  },
  warrantyInfo: {
    flex: 1,
  },
  smallText: {
    fontSize: 12,
    color: '#999',
    marginTop: 3,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginBottom: 15,
  },
  checkboxChecked: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  termsText: {
    fontSize: 14,
    color: '#666',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  printButton: {
    backgroundColor: '#34C759',
  },
  successMessage: {
    backgroundColor: '#d4edda',
    borderColor: '#c3e6cb',
    borderWidth: 1,
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  successText: {
    color: '#155724',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orderNumber: {
    color: '#155724',
    fontSize: 14,
    marginTop: 5,
  },
  printSection: {
    marginTop: 10,
  },
});

export default CheckoutScreen;