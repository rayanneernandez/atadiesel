import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { Link, useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CadastroProduto() {
  const router = useRouter();
  
  // Form State
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [priceCurrent, setPriceCurrent] = useState('');
  const [pricePromo, setPricePromo] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState('');
  const [sku, setSku] = useState('');
  const [image, setImage] = useState<string | null>(null);

  const formatCurrency = (value: string) => {
    const cleanValue = value.replace(/\D/g, '');
    const numberValue = Number(cleanValue) / 100;
    return numberValue.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  const handlePriceChange = (text: string, setter: (value: string) => void) => {
    setter(formatCurrency(text));
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({ 
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    const parsePrice = (priceStr: string) => {
      const cleanStr = priceStr.replace(/[R$\s.]/g, '').replace(',', '.');
      return parseFloat(cleanStr) || 0;
    };

    const priceCur = parsePrice(priceCurrent);
    const pricePr = parsePrice(pricePromo);
    
    const discountPercent = pricePr > 0 && priceCur > 0 && pricePr < priceCur 
      ? Math.round(((priceCur - pricePr) / priceCur) * 100) 
      : 0;

    console.log({ 
      name, 
      description, 
      priceCurrent: priceCur, 
      pricePromo: pricePr, 
      discountPercent, 
      category, 
      stock, 
      sku, 
      image 
    });

    Alert.alert('Sucesso', 'Produto cadastrado com sucesso!');
    setName('');
    setDescription('');
    setPriceCurrent('');
    setPricePromo('');
    setCategory('');
    setStock('');
    setSku('');
    setImage(null);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header Personalizado */}
      <View style={styles.header}>
        <View>
          <Image source={require('../../assets/images/atadiesel-logo-white.png')} style={styles.logo} />
          <Text style={styles.brandSubtitle}>Auto Peças</Text>
        </View>
        <Link href="/perfiladmin" asChild>
          <TouchableOpacity style={styles.cartBubble}>
            <MaterialCommunityIcons name="account-circle-outline" size={28} color="#fff" />
          </TouchableOpacity>
        </Link>
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.pageHeader}>
             <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color="#1A237E" />
             </TouchableOpacity>
             <Text style={styles.headerTitle}>Cadastro de Produto</Text>
          </View>

          <View style={styles.formCard}>
            
            {/* Image Placeholder */}
            <TouchableOpacity style={styles.imageUpload} onPress={pickImage}>
                {image ? (
                  <Image source={{ uri: image }} style={styles.uploadedImage} />
                ) : (
                  <>
                    <MaterialCommunityIcons name="camera-plus" size={40} color="#999" />
                    <Text style={styles.imageUploadText}>Adicionar Imagem do Produto</Text>
                  </>
                )}
            </TouchableOpacity>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nome do Produto</Text>
              <TextInput 
                style={styles.input} 
                placeholder="Ex: Óleo Motor 5W30"
                value={name}
                onChangeText={setName}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Descrição</Text>
              <TextInput 
                style={[styles.input, styles.textArea]} 
                placeholder="Detalhes do produto..."
                multiline
                numberOfLines={4}
                value={description}
                onChangeText={setDescription}
              />
            </View>

            <View style={styles.row}>
              <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                <Text style={styles.label}>Preço Atual</Text>
                <TextInput
                  style={styles.input}
                  placeholder="R$ 0,00"
                  keyboardType="numeric"
                  value={priceCurrent}
                  onChangeText={(text) => handlePriceChange(text, setPriceCurrent)}
                />
              </View>
              <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                <Text style={styles.label}>Preço Promocional</Text>
                <TextInput
                  style={styles.input}
                  placeholder="R$ 0,00"
                  keyboardType="numeric"
                  value={pricePromo}
                  onChangeText={(text) => handlePriceChange(text, setPricePromo)}
                />
              </View>
            </View>

            <View style={styles.row}>
              <View style={[styles.inputGroup, { flex: 1 }]}>
                <Text style={styles.label}>Estoque</Text>
                <TextInput
                  style={styles.input}
                  placeholder="0"
                  keyboardType="numeric"
                  value={stock}
                  onChangeText={setStock}
                />
              </View>
            </View>

            <View style={styles.row}>
                <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                <Text style={styles.label}>Categoria</Text>
                <TextInput 
                    style={styles.input} 
                    placeholder="Ex: Óleos"
                    value={category}
                    onChangeText={setCategory}
                />
                </View>

                <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                <Text style={styles.label}>Código (SKU)</Text>
                <TextInput 
                    style={styles.input} 
                    placeholder="XYZ-123"
                    value={sku}
                    onChangeText={setSku}
                />
                </View>
            </View>

            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Salvar Produto</Text>
            </TouchableOpacity>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Menu Inferior Personalizado */}
      <View style={styles.bottomMenu}>
        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => router.push('/dashboardadmin')}
        >
          <MaterialCommunityIcons name="view-dashboard" size={24} color="#777" />
          <Text style={styles.menuText}>Dashboard</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <MaterialCommunityIcons name="store" size={24} color="#C62828" />
          <Text style={styles.menuTextActive}>Produtos</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => router.push('/destaques')}
        >
          <MaterialCommunityIcons name="star" size={24} color="#777" />
          <Text style={styles.menuText}>Destaques</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => router.push('/usuarios')}
        >
          <MaterialCommunityIcons name="account-group" size={24} color="#777" />
          <Text style={styles.menuText}>Usuários</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => router.push('/entregas')}
        >
          <MaterialCommunityIcons name="truck-delivery" size={24} color="#777" />
          <Text style={styles.menuText}>Entregas</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: '#004AAD',
    padding: 20,
    width: '100%',
    borderBottomLeftRadius: 26,
    borderBottomRightRadius: 26,
    elevation: 4,
    zIndex: 10,
  },
  logo: {
    width: 140,
    height: 60,
    resizeMode: 'contain',
  },
  brandSubtitle: {
    color: '#fff',
    opacity: 0.9,
    marginTop: 6,
    fontSize: 14,
  },
  cartBubble: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#F5F7FA',
    flexGrow: 1,
  },
  pageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A237E',
  },
  formCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  imageUpload: {
      height: 150,
      backgroundColor: '#F5F7FA',
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#D1D5DB',
      borderStyle: 'dashed',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 24,
      overflow: 'hidden',
  },
  uploadedImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageUploadText: {
      marginTop: 8,
      color: '#666',
      fontSize: 14,
  },
  inputGroup: {
      marginBottom: 16,
  },
  label: {
      fontSize: 14,
      fontWeight: '600',
      color: '#333',
      marginBottom: 8,
  },
  input: {
      backgroundColor: '#F5F7FA',
      borderWidth: 1,
      borderColor: '#E0E0E0',
      borderRadius: 8,
      padding: 12,
      fontSize: 16,
      color: '#333',
  },
  textArea: {
      height: 100,
      textAlignVertical: 'top',
  },
  row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
  },
  saveButton: {
      backgroundColor: '#1A237E',
      borderRadius: 8,
      paddingVertical: 16,
      alignItems: 'center',
      marginTop: 16,
  },
  saveButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
  },
  bottomMenu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fff',
  },
  menuItem: {
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 70,
  },
  menuText: {
    fontSize: 10,
    color: '#777',
    marginTop: 4,
    textAlign: 'center',
  },
  menuTextActive: {
    fontSize: 10,
    color: '#C62828',
    fontWeight: '700',
    marginTop: 4,
    textAlign: 'center',
  },
});