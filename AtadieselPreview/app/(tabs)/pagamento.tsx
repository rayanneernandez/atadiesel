import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Modal, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter, Link } from 'expo-router';

export default function PagamentoScreen() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  
  // Initial Mock Data
  const [cards, setCards] = useState([
    {
      id: '1',
      number: '•••• •••• •••• 1234',
      name: 'João Silva',
      expiry: '12/25',
      type: 'default', // Blue
      isDefault: true,
    },
    {
      id: '2',
      number: '•••• •••• •••• 5678',
      name: 'João Silva',
      expiry: '08/26',
      type: 'visa', // Red
      isDefault: false,
    },
  ]);

  // Form State
  const [newCardNumber, setNewCardNumber] = useState('');
  const [newCardName, setNewCardName] = useState('');
  const [newCardExpiry, setNewCardExpiry] = useState('');
  const [newCardCVV, setNewCardCVV] = useState('');

  const getCardStyle = (name: string) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('nubank')) return { backgroundColor: '#820AD1', icon: 'bank' }; // Purple
    if (lowerName.includes('picpay')) return { backgroundColor: '#11C76F', icon: 'cellphone-nfc' }; // Green
    if (lowerName.includes('inter')) return { backgroundColor: '#FF7A00', icon: 'bank' }; // Orange
    if (lowerName.includes('visa')) return { backgroundColor: '#C62828', icon: 'credit-card' }; // Red
    return { backgroundColor: '#0D47A1', icon: 'credit-card' }; // Default Blue
  };

  const handleAddCard = () => {
    if (!newCardNumber || !newCardName || !newCardExpiry || !newCardCVV) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    // Determine type based on name for this demo (or number in real app)
    // Here we'll just check the name entered to simulate the "Nubank/PicPay" requirement
    let cardType = 'default';
    const lowerName = newCardName.toLowerCase(); 
    // In a real scenario, this would likely be a dropdown or detected from BIN
    // For this user request: "cadastrou a Nubank vai aparecer ali o da nubank"
    // I will assume the user might type "Nubank" in the name or we just use the styling logic.
    // Let's use the styling logic in rendering, so we just save the name.

    const newCard = {
      id: Math.random().toString(),
      number: `•••• •••• •••• ${newCardNumber.slice(-4)}`,
      name: newCardName,
      expiry: newCardExpiry,
      type: 'custom', 
      isDefault: false,
    };

    setCards([...cards, newCard]);
    setModalVisible(false);
    setNewCardNumber('');
    setNewCardName('');
    setNewCardExpiry('');
    setNewCardCVV('');
  };

  const handleDeleteCard = (id: string) => {
    Alert.alert(
      "Remover Cartão",
      "Tem certeza que deseja remover este cartão?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Remover", onPress: () => setCards(cards.filter(c => c.id !== id)), style: "destructive" }
      ]
    );
  };

  const handleSetDefault = (id: string) => {
    setCards(cards.map(c => ({
      ...c,
      isDefault: c.id === id
    })));
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <MaterialCommunityIcons name="arrow-left" size={28} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Formas de Pagamento</Text>
        </View>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        {cards.map((card) => {
            // Apply style logic here based on name (simulating bank detection)
            // Or use the pre-set type for the initial mocks
            let cardStyle = { backgroundColor: '#0D47A1', icon: 'credit-card' };
            if (card.type === 'visa') cardStyle = { backgroundColor: '#C62828', icon: 'credit-card' };
            else if (card.type === 'custom') cardStyle = getCardStyle(card.name); // Check name for 'Nubank', 'Picpay' etc.
            
            return (
              <View key={card.id} style={styles.cardWrapper}>
                <View style={[styles.creditCard, { backgroundColor: cardStyle.backgroundColor }]}>
                  <View style={styles.cardTopRow}>
                    <MaterialCommunityIcons name={cardStyle.icon as any} size={32} color="#fff" />
                    {card.isDefault && (
                      <View style={styles.defaultBadge}>
                        <MaterialCommunityIcons name="check-circle-outline" size={14} color="#0D47A1" />
                        <Text style={styles.defaultText}>Padrão</Text>
                      </View>
                    )}
                  </View>
                  
                  <Text style={styles.cardNumber}>{card.number}</Text>
                  
                  <View style={styles.cardBottomRow}>
                    <View>
                      <Text style={styles.cardLabel}>Nome</Text>
                      <Text style={styles.cardValue}>{card.name}</Text>
                    </View>
                    <View>
                      <Text style={styles.cardLabel}>Validade</Text>
                      <Text style={styles.cardValue}>{card.expiry}</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.cardActions}>
                  {!card.isDefault && (
                    <TouchableOpacity style={styles.setDefaultButton} onPress={() => handleSetDefault(card.id)}>
                      <Text style={styles.setDefaultText}>Definir como Padrão</Text>
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteCard(card.id)}>
                    <MaterialCommunityIcons name="trash-can-outline" size={20} color="#C62828" />
                  </TouchableOpacity>
                </View>
              </View>
            );
        })}

        <TouchableOpacity style={styles.addCardButton} onPress={() => setModalVisible(true)}>
          <View style={styles.addCardCircle}>
            <MaterialCommunityIcons name="plus" size={24} color="#0D47A1" />
          </View>
          <Text style={styles.addCardText}>Adicionar Novo Cartão</Text>
        </TouchableOpacity>

        <View style={styles.securityNote}>
          <MaterialCommunityIcons name="lock-outline" size={16} color="#546E7A" style={{marginRight: 6}} />
          <Text style={styles.securityText}>
            Seus dados de pagamento são criptografados e armazenados com segurança.
          </Text>
        </View>
        
        <View style={{height: 20}} />
      </ScrollView>

      {/* Modal Novo Cartão */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Novo Cartão</Text>
            
            <Text style={styles.inputLabel}>Número do Cartão</Text>
            <TextInput
              style={styles.input}
              placeholder="0000 0000 0000 0000"
              keyboardType="numeric"
              value={newCardNumber}
              onChangeText={setNewCardNumber}
              maxLength={19}
            />

            <Text style={styles.inputLabel}>Nome no Cartão (Ex: Nubank, PicPay)</Text>
            <TextInput
              style={styles.input}
              placeholder="João Silva"
              value={newCardName}
              onChangeText={setNewCardName}
            />

            <View style={styles.rowInputs}>
              <View style={{flex: 1, marginRight: 10}}>
                <Text style={styles.inputLabel}>Validade</Text>
                <TextInput
                  style={styles.input}
                  placeholder="MM/AA"
                  value={newCardExpiry}
                  onChangeText={setNewCardExpiry}
                  maxLength={5}
                />
              </View>
              <View style={{flex: 1, marginLeft: 10}}>
                <Text style={styles.inputLabel}>CVV</Text>
                <TextInput
                  style={styles.input}
                  placeholder="123"
                  keyboardType="numeric"
                  value={newCardCVV}
                  onChangeText={setNewCardCVV}
                  maxLength={4}
                />
              </View>
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={handleAddCard}>
                <Text style={styles.saveButtonText}>Adicionar</Text>
              </TouchableOpacity>
            </View>
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
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  content: {
    padding: 20,
  },
  cardWrapper: {
    marginBottom: 24,
  },
  creditCard: {
    borderRadius: 16,
    padding: 24,
    height: 200,
    justifyContent: 'space-between',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  defaultBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  defaultText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0D47A1',
    marginLeft: 4,
  },
  cardNumber: {
    fontSize: 22,
    color: '#fff',
    letterSpacing: 2,
    fontWeight: '500',
  },
  cardBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardLabel: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 2,
  },
  cardValue: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 10,
  },
  setDefaultButton: {
    backgroundColor: '#E3F2FD',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginRight: 10,
    flex: 1,
    alignItems: 'center',
  },
  setDefaultText: {
    color: '#0D47A1',
    fontSize: 14,
    fontWeight: '500',
  },
  deleteButton: {
    backgroundColor: '#FFEBEE',
    padding: 8,
    borderRadius: 8,
    width: 40,
    alignItems: 'center',
  },
  addCardButton: {
    borderWidth: 1,
    borderColor: '#B0BEC5',
    borderStyle: 'dashed',
    borderRadius: 12,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginBottom: 24,
  },
  addCardCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E3F2FD',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  addCardText: {
    fontSize: 16,
    color: '#546E7A',
    fontWeight: '500',
  },
  securityNote: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#E3F2FD',
    padding: 16,
    borderRadius: 12,
  },
  securityText: {
    flex: 1,
    fontSize: 12,
    color: '#1976D2',
    lineHeight: 18,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    color: '#546E7A',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FAFAFA',
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
    marginBottom: 16,
  },
  rowInputs: {
    flexDirection: 'row',
  },
  modalButtons: {
    flexDirection: 'row',
    marginTop: 8,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingVertical: 14,
    borderRadius: 8,
    marginRight: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#757575',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#C62828',
    paddingVertical: 14,
    borderRadius: 8,
    marginLeft: 10,
    alignItems: 'center',
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
});