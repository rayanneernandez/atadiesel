import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { Link, useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Destaques() {
  const router = useRouter();
  
  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({ 
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9], // Aspect ratio for highlights (banner)
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    if (!title || !image) {
      Alert.alert('Erro', 'Por favor, preencha o título e adicione uma imagem.');
      return;
    }

    console.log({ 
      title, 
      description, 
      image 
    });

    Alert.alert('Sucesso', 'Destaque cadastrado com sucesso!');
    setTitle('');
    setDescription('');
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
             <Text style={styles.headerTitle}>Cadastro de Destaques</Text>
          </View>

          <View style={styles.formCard}>
            
            {/* Image Placeholder */}
            <TouchableOpacity style={styles.imageUpload} onPress={pickImage}>
                {image ? (
                  <Image source={{ uri: image }} style={styles.uploadedImage} />
                ) : (
                  <>
                    <MaterialCommunityIcons name="camera-plus" size={40} color="#999" />
                    <Text style={styles.imageUploadText}>Adicionar Imagem do Destaque</Text>
                    <Text style={styles.imageHintText}>(Recomendado: 16:9)</Text>
                  </>
                )}
            </TouchableOpacity>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Título do Destaque</Text>
              <TextInput 
                style={styles.input} 
                placeholder="Ex: Promoção de Verão"
                value={title}
                onChangeText={setTitle}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Descrição (Opcional)</Text>
              <TextInput 
                style={[styles.input, styles.textArea]} 
                placeholder="Detalhes do destaque..."
                multiline
                numberOfLines={4}
                value={description}
                onChangeText={setDescription}
              />
            </View>

            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Salvar Destaque</Text>
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

        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => router.push('/cadastroproduto')}
        >
          <MaterialCommunityIcons name="store" size={24} color="#777" />
          <Text style={styles.menuText}>Produtos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <MaterialCommunityIcons name="star" size={24} color="#C62828" />
          <Text style={styles.menuTextActive}>Destaques</Text>
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
    height: 180,
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
  imageHintText: {
    color: '#999',
    fontSize: 12,
    marginTop: 4,
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