import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Modal, TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter, Link } from 'expo-router';

export default function EnderecosScreen() {
  const router = useRouter();
  
  const [addresses, setAddresses] = useState([
    {
      id: '1',
      label: 'Casa',
      type: 'Residencial',
      street: 'Rua das Flores, 123',
      complement: 'Apto 45',
      neighborhood: 'Centro',
      city: 'São Paulo - SP',
      zip: 'CEP: 01234-567',
      isDefault: true,
      icon: 'home-outline',
      iconBg: '#E3F2FD',
      iconColor: '#0D47A1',
    },
    {
      id: '2',
      label: 'Trabalho',
      type: 'Comercial',
      street: 'Av. Paulista, 1000',
      complement: 'Bela Vista',
      neighborhood: 'São Paulo - SP',
      city: '',
      zip: 'CEP: 01310-100',
      isDefault: false,
      icon: 'office-building-outline',
      iconBg: '#E3F2FD',
      iconColor: '#0D47A1',
    },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [newAddress, setNewAddress] = useState({
    label: '',
    type: 'Casa',
    zip: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: ''
  });

  const handleCepChange = async (text: string) => {
    setNewAddress(prev => ({ ...prev, zip: text }));

    const cleanCep = text.replace(/\D/g, '');
    if (cleanCep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
        const data = await response.json();

        if (!data.erro) {
          setNewAddress(prev => ({
            ...prev,
            zip: text,
            street: data.logradouro,
            neighborhood: data.bairro,
            city: data.localidade,
            state: data.uf
          }));
        }
      } catch (error) {
        console.log('Error fetching CEP:', error);
      }
    }
  };

  const handleAddNew = () => {
    const newItem = {
      id: String(Date.now()),
      label: newAddress.label || 'Novo Endereço',
      type: newAddress.type === 'Casa' ? 'Residencial' : newAddress.type === 'Trabalho' ? 'Comercial' : 'Outro',
      street: `${newAddress.street}, ${newAddress.number}`,
      complement: newAddress.complement,
      neighborhood: newAddress.neighborhood,
      city: newAddress.city && newAddress.state ? `${newAddress.city} - ${newAddress.state}` : '',
      zip: newAddress.zip ? `CEP: ${newAddress.zip}` : '',
      isDefault: false,
      icon: newAddress.type === 'Casa' ? 'home-outline' : newAddress.type === 'Trabalho' ? 'office-building-outline' : 'map-marker-outline',
      iconBg: '#E3F2FD',
      iconColor: '#0D47A1',
    };
    setAddresses([...addresses, newItem]);
    setModalVisible(false);
    setNewAddress({ label: '', type: 'Casa', zip: '', street: '', number: '', complement: '', neighborhood: '', city: '', state: '' });
  };

  const handleSetDefault = (id: string) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })));
  };

  const handleDelete = (id: string) => {
    Alert.alert(
      "Remover Endereço",
      "Tem certeza que deseja remover este endereço?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Remover", onPress: () => setAddresses(addresses.filter(a => a.id !== id)), style: "destructive" }
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <MaterialCommunityIcons name="arrow-left" size={28} color="#fff" />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerTitle}>Meus Endereços</Text>
            <Text style={styles.headerSubtitle}>Gerencie seus endereços de entrega</Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        
        <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
          <MaterialCommunityIcons name="plus" size={24} color="#fff" />
          <Text style={styles.addButtonText}>Adicionar Novo Endereço</Text>
        </TouchableOpacity>

        {addresses.map((addr) => (
          <View key={addr.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.cardHeaderLeft}>
                <View style={[styles.iconBox, { backgroundColor: addr.iconBg }]}>
                  <MaterialCommunityIcons name={addr.icon as any} size={24} color={addr.iconColor} />
                </View>
                <View>
                  <View style={styles.labelRow}>
                    <Text style={styles.addressLabel}>{addr.label}</Text>
                    {addr.isDefault && (
                      <View style={styles.defaultBadge}>
                        <Text style={styles.defaultBadgeText}>Padrão</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.addressType}>{addr.type}</Text>
                </View>
              </View>
              <TouchableOpacity>
                <MaterialCommunityIcons name="pencil-outline" size={20} color="#1976D2" />
              </TouchableOpacity>
            </View>

            <View style={styles.addressInfo}>
              <Text style={styles.addressText}>{addr.street}</Text>
              <Text style={styles.addressText}>{addr.complement}</Text>
              <Text style={styles.addressText}>{addr.neighborhood}</Text>
              {addr.city ? <Text style={styles.addressText}>{addr.city}</Text> : null}
              <Text style={styles.addressText}>{addr.zip}</Text>
            </View>

            {!addr.isDefault && (
               <View style={styles.cardActions}>
                 <TouchableOpacity style={styles.setDefaultButton} onPress={() => handleSetDefault(addr.id)}>
                   <Text style={styles.setDefaultText}>Definir como padrão</Text>
                 </TouchableOpacity>
                 <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(addr.id)}>
                    <MaterialCommunityIcons name="trash-can-outline" size={20} color="#C62828" />
                 </TouchableOpacity>
               </View>
            )}
            
            {/* If it is default, show edit icon is already at top right, maybe nothing else needed or just padding */}
          </View>
        ))}

        <View style={{height: 20}} />
      </ScrollView>

      {/* Modal Novo Endereço */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Novo Endereço</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <MaterialCommunityIcons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={{paddingBottom: 20}} showsVerticalScrollIndicator={false}>
              <Text style={styles.label}>Nome do Endereço</Text>
              <TextInput 
                style={styles.input} 
                placeholder="Ex: Casa, Trabalho, Apartamento..." 
                placeholderTextColor="#999"
                value={newAddress.label}
                onChangeText={(t) => setNewAddress({...newAddress, label: t})}
              />

              <Text style={styles.label}>Tipo</Text>
              <View style={styles.typeRow}>
                <TouchableOpacity 
                  style={[styles.typeOption, newAddress.type === 'Casa' && styles.typeOptionActive]}
                  onPress={() => setNewAddress({...newAddress, type: 'Casa'})}
                >
                  <MaterialCommunityIcons name="home-outline" size={24} color={newAddress.type === 'Casa' ? '#004AAD' : '#777'} />
                  <Text style={newAddress.type === 'Casa' ? styles.typeTextActive : styles.typeText}>Casa</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.typeOption, newAddress.type === 'Trabalho' && styles.typeOptionActive]}
                  onPress={() => setNewAddress({...newAddress, type: 'Trabalho'})}
                >
                  <MaterialCommunityIcons name="office-building-outline" size={24} color={newAddress.type === 'Trabalho' ? '#004AAD' : '#777'} />
                  <Text style={newAddress.type === 'Trabalho' ? styles.typeTextActive : styles.typeText}>Trabalho</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.typeOption, newAddress.type === 'Outro' && styles.typeOptionActive]}
                  onPress={() => setNewAddress({...newAddress, type: 'Outro'})}
                >
                  <MaterialCommunityIcons name="map-marker-outline" size={24} color={newAddress.type === 'Outro' ? '#004AAD' : '#777'} />
                  <Text style={newAddress.type === 'Outro' ? styles.typeTextActive : styles.typeText}>Outro</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.label}>CEP</Text>
              <TextInput 
                style={styles.input} 
                placeholder="00000-000" 
                placeholderTextColor="#999"
                keyboardType="numeric"
                value={newAddress.zip}
                onChangeText={handleCepChange}
                maxLength={9}
              />

              <Text style={styles.label}>Rua</Text>
              <TextInput 
                style={styles.input} 
                placeholder="" 
                value={newAddress.street}
                onChangeText={(t) => setNewAddress({...newAddress, street: t})}
              />

              <View style={styles.row}>
                <View style={{flex: 1, marginRight: 10}}>
                  <Text style={styles.label}>Número</Text>
                  <TextInput 
                    style={styles.input} 
                    value={newAddress.number}
                    onChangeText={(t) => setNewAddress({...newAddress, number: t})}
                  />
                </View>
                <View style={{flex: 1}}>
                  <Text style={styles.label}>Complemento</Text>
                  <TextInput 
                    style={styles.input} 
                    placeholder="Opcional" 
                    placeholderTextColor="#999" 
                    value={newAddress.complement}
                    onChangeText={(t) => setNewAddress({...newAddress, complement: t})}
                  />
                </View>
              </View>

              <Text style={styles.label}>Bairro</Text>
              <TextInput 
                style={styles.input} 
                value={newAddress.neighborhood}
                onChangeText={(t) => setNewAddress({...newAddress, neighborhood: t})}
              />

              <View style={styles.row}>
                <View style={{flex: 2, marginRight: 10}}>
                  <Text style={styles.label}>Cidade</Text>
                  <TextInput 
                    style={styles.input} 
                    value={newAddress.city}
                    onChangeText={(t) => setNewAddress({...newAddress, city: t})}
                  />
                </View>
                <View style={{flex: 1}}>
                  <Text style={styles.label}>Estado</Text>
                  <TextInput 
                    style={styles.input} 
                    value={newAddress.state}
                    onChangeText={(t) => setNewAddress({...newAddress, state: t})}
                  />
                </View>
              </View>

              <TouchableOpacity style={styles.submitButton} onPress={handleAddNew}>
                <MaterialCommunityIcons name="check" size={20} color="#fff" style={{marginRight: 8}} />
                <Text style={styles.submitButtonText}>Adicionar Endereço</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Menu Inferior */}
      <View style={styles.bottomMenu}>
        <Link href="/" asChild>
          <TouchableOpacity style={styles.menuItem}>
            <MaterialCommunityIcons name="home" size={26} color="#777" />
            <Text style={styles.menuText}>Inicio</Text>
          </TouchableOpacity>
        </Link>
        <Link href="/(tabs)/produtos" asChild>
          <TouchableOpacity style={styles.menuItem}>
            <MaterialCommunityIcons name="store" size={26} color="#777" />
            <Text style={styles.menuText}>Produto</Text>
          </TouchableOpacity>
        </Link>
        <Link href="/(tabs)/autonomia" asChild>
          <TouchableOpacity style={styles.menuItem}>
            <MaterialCommunityIcons name="qrcode-scan" size={26} color="#777" />
            <Text style={styles.menuText}>Autônoma</Text>
          </TouchableOpacity>
        </Link>
        <Link href="/(tabs)/contato" asChild>
          <TouchableOpacity style={styles.menuItem}>
            <MaterialCommunityIcons name="map-marker" size={26} color="#777" />
            <Text style={styles.menuText}>Loja</Text>
          </TouchableOpacity>
        </Link>
        <Link href="/(tabs)/perfil" asChild>
          <TouchableOpacity style={styles.menuItem}>
            <MaterialCommunityIcons name="account" size={26} color="#C62828" />
            <Text style={styles.menuTextActive}>Perfil</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#0D47A1',
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    marginTop: 2,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  addButton: {
    backgroundColor: '#C62828',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 24,
    elevation: 3,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  cardHeaderLeft: {
    flexDirection: 'row',
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  addressLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginRight: 8,
  },
  defaultBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  defaultBadgeText: {
    fontSize: 10,
    color: '#2E7D32',
    fontWeight: '600',
  },
  addressType: {
    fontSize: 14,
    color: '#78909C',
  },
  addressInfo: {
    marginBottom: 16,
  },
  addressText: {
    fontSize: 15,
    color: '#546E7A',
    marginBottom: 4,
    lineHeight: 22,
  },
  cardActions: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F5F5F5',
    paddingTop: 16,
  },
  setDefaultButton: {
    backgroundColor: '#F5F5F5',
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 12,
  },
  setDefaultText: {
    color: '#546E7A',
    fontSize: 14,
    fontWeight: '500',
  },
  deleteButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomMenu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  menuItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuText: {
    fontSize: 10,
    color: '#777',
    marginTop: 4,
  },
  menuTextActive: {
    fontSize: 10,
    color: '#C62828',
    fontWeight: 'bold',
    marginTop: 4,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    maxHeight: '90%',
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  label: {
    fontSize: 14,
    color: '#546E7A',
    marginBottom: 6,
    marginTop: 10,
  },
  input: {
    backgroundColor: '#F5F7FA',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  typeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  typeOption: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#fff',
  },
  typeOptionActive: {
    borderColor: '#004AAD',
    backgroundColor: '#E3F2FD',
  },
  typeText: {
    fontSize: 12,
    color: '#777',
    marginTop: 4,
  },
  typeTextActive: {
    fontSize: 12,
    color: '#004AAD',
    fontWeight: 'bold',
    marginTop: 4,
  },
  row: {
    flexDirection: 'row',
  },
  submitButton: {
    backgroundColor: '#004AAD',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 24,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});