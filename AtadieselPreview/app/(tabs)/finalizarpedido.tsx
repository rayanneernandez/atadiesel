import React, { useMemo, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Modal, Alert } from 'react-native';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import { getCart } from '../../src/store/cart';

function formatBRL(n: number) {
  return n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export default function FinalizarPedido() {
  const router = useRouter();
  const items = getCart();
  const itemsCount = items.reduce((s, i) => s + i.quantity, 0);
  const subtotal = useMemo(() => items.reduce((s, i) => s + i.unitPrice * i.quantity, 0), [items]);
  const [method, setMethod] = useState<'casa' | 'loja'>('loja');
  const [cep, setCep] = useState('');
  const [frete, setFrete] = useState<number | null>(null);
  const [freteOK, setFreteOK] = useState(false);
  
  // Address Logic
  const [addressModalVisible, setAddressModalVisible] = useState(false);
  const [newAddressModalVisible, setNewAddressModalVisible] = useState(false);
  const [addresses, setAddresses] = useState([
    { id: '1', street: 'Rua das Flores', number: '123', neighborhood: 'Centro', city: 'São Paulo', state: 'SP', cep: '01000-000', fullString: 'Rua das Flores, 123 - Centro, SP' }
  ]);
  const [selectedAddress, setSelectedAddress] = useState(addresses[0]);
  const [newAddrForm, setNewAddrForm] = useState({
    street: '', number: '', complement: '', neighborhood: '', city: '', state: '', cep: ''
  });

  const buscarCep = async (cepInput: string) => {
    setNewAddrForm(prev => ({ ...prev, cep: cepInput }));
    const cleanCep = cepInput.replace(/\D/g, '');
    
    if (cleanCep.length === 8) {
      try {
        const res = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
        const data = await res.json();
        
        if (data.erro) {
          Alert.alert('Atenção', 'CEP não encontrado.');
          return;
        }

        setNewAddrForm(prev => ({
          ...prev,
          street: data.logradouro || '',
          neighborhood: data.bairro || '',
          city: data.localidade || '',
          state: data.uf || '',
          cep: cepInput
          // Numero e complemento não são alterados/puxados, conforme solicitado
        }));
      } catch (e) {
        console.log('Erro ao buscar CEP', e);
        Alert.alert('Erro', 'Falha ao buscar endereço. Verifique sua conexão.');
      }
    }
  };

  const handleSaveAddress = () => {
    if (!newAddrForm.street || !newAddrForm.number) return;
    const newId = Math.random().toString();
    const fullString = `${newAddrForm.street}, ${newAddrForm.number} - ${newAddrForm.neighborhood}, ${newAddrForm.state}`;
    const newAddr = { ...newAddrForm, id: newId, fullString };
    setAddresses([...addresses, newAddr]);
    setSelectedAddress(newAddr);
    setNewAddressModalVisible(false);
    setAddressModalVisible(false);
    setNewAddrForm({ street: '', number: '', complement: '', neighborhood: '', city: '', state: '', cep: '' });
  };

  // Payment Logic
  const [paymentModalVisible, setPaymentModalVisible] = useState(false);
  const [newCardModalVisible, setNewCardModalVisible] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState([
    { id: 'pix', type: 'pix', label: 'PIX' },
    { id: 'money', type: 'money', label: 'Dinheiro' }
  ]);
  const [selectedPayment, setSelectedPayment] = useState(paymentMethods[0]);
  const [newCardForm, setNewCardForm] = useState({
    number: '', name: '', expiry: '', cvv: '', type: 'credit' // 'credit' or 'debit'
  });

  // Success Modal Logic
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [orderId, setOrderId] = useState('');

  const generateOrderId = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = 'ORD-';
    for (let i = 0; i < 9; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const handleFinishOrder = () => {
    setOrderId(generateOrderId());
    setSuccessModalVisible(true);
  };

  const handleSaveCard = () => {
    if (!newCardForm.number || !newCardForm.name) return;
    const last4 = newCardForm.number.slice(-4);
    const label = newCardForm.type === 'credit' 
      ? `Cartão de Crédito ****${last4}` 
      : `Cartão de Débito ****${last4}`;
    
    const newMethod = {
      id: Math.random().toString(),
      type: newCardForm.type,
      label: label
    };
    
    setPaymentMethods([newMethod, ...paymentMethods]);
    setSelectedPayment(newMethod);
    setNewCardModalVisible(false);
    setPaymentModalVisible(false);
    setNewCardForm({ number: '', name: '', expiry: '', cvv: '', type: 'credit' });
  };

  const [usarPontos, setUsarPontos] = useState(false);
  const descontoPontos = usarPontos ? 5.00 : 0;
  const total = Math.max(0, subtotal + (method === 'casa' && freteOK ? (frete ?? 0) : 0) - descontoPontos);

  const calcularFrete = () => {
    if (cep.trim().length >= 8) {
      setFrete(11.44);
      setFreteOK(true);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity style={styles.backBubble} onPress={() => router.back()}>
            <Icon name="arrow-left" size={22} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Finalizar Pedido</Text>
        </View>
        <Text style={styles.itemsCount}>{itemsCount} {itemsCount === 1 ? 'item' : 'itens'}</Text>
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Método de Entrega</Text>
          <View style={styles.methodsRow}>
            <TouchableOpacity style={[styles.methodBtn, method === 'casa' && styles.methodActive]} onPress={() => setMethod('casa')}>
              <Icon name="home-outline" size={24} color={method === 'casa' ? '#004AAD' : '#777'} />
              <Text style={[styles.methodText, method === 'casa' && styles.methodTextActive]}>Receber em casa</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.methodBtn, method === 'loja' && styles.methodActive]} onPress={() => setMethod('loja')}>
              <Icon name="office-building" size={24} color={method === 'loja' ? '#004AAD' : '#777'} />
              <Text style={[styles.methodText, method === 'loja' && styles.methodTextActive]}>Retirar na loja</Text>
            </TouchableOpacity>
          </View>
        </View>

        {method === 'casa' ? (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Calcular Frete</Text>
            <View style={styles.freightRow}>
              <TextInput
                style={styles.input}
                placeholder="Digite o CEP"
                placeholderTextColor="#999"
                keyboardType="numeric"
                value={cep}
                onChangeText={setCep}
              />
              <TouchableOpacity style={styles.calcBtn} onPress={calcularFrete}>
                <Text style={styles.calcText}>Calcular</Text>
              </TouchableOpacity>
            </View>
            {freteOK ? (
              <View style={styles.freightSuccess}>
                <Text style={styles.freightOkText}>Frete calculado: <Text style={styles.freightOkValue}>{formatBRL(frete ?? 0)}</Text></Text>
                <Text style={styles.freightOkSub}>Entrega em até 30 minutos</Text>
              </View>
            ) : null}
          </View>
        ) : null}

        {method === 'casa' ? (
          <View style={styles.card}>
            <View style={styles.cardHeaderRow}>
              <View style={styles.cardHeaderLeft}>
                <Icon name="map-marker" size={20} color="#2F6FDB" />
                <Text style={styles.cardTitle}>Endereço de Entrega</Text>
              </View>
              <TouchableOpacity onPress={() => setAddressModalVisible(true)}>
                <Text style={styles.linkText}>Trocar</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.cardBodyText}>{selectedAddress.fullString}</Text>
          </View>
        ) : null}

        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <View style={styles.cardHeaderLeft}>
              <Icon name="credit-card-outline" size={20} color="#C62828" />
              <Text style={styles.cardTitle}>Forma de Pagamento</Text>
            </View>
            <TouchableOpacity onPress={() => setPaymentModalVisible(true)}>
              <Text style={styles.linkText}>Trocar</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.cardBodyText}>{selectedPayment.label}</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <View style={styles.cardHeaderLeft}>
              <Icon name="tag-outline" size={20} color="#2F6FDB" />
              <Text style={styles.cardTitle}>Cupom de Desconto</Text>
            </View>
          </View>
          <View style={styles.couponRow}>
            <TextInput style={styles.input} placeholder="Digite o código" placeholderTextColor="#999" />
            <TouchableOpacity style={styles.applyBtn}>
              <Text style={styles.applyText}>Aplicar</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <View style={styles.cardHeaderLeft}>
              <Icon name="gift-outline" size={20} color={usarPontos ? '#F04E23' : '#C62828'} />
              <Text style={styles.cardTitle}>Usar Pontos de Fidelidade</Text>
            </View>
          </View>
          
          <View style={styles.pointsRow}>
            <View>
              <Text style={styles.pointsText}>Você tem <Text style={[styles.pointsValue, usarPontos && { color: '#F04E23' }]}>500 pontos</Text></Text>
              <Text style={styles.pointsSub}>100 pontos = R$ 1,00</Text>
            </View>
            
            <TouchableOpacity 
              style={usarPontos ? styles.useBtnActive : styles.useBtnInactive} 
              onPress={() => setUsarPontos(!usarPontos)}
            >
              <Text style={usarPontos ? styles.useBtnTextActive : styles.useBtnTextInactive}>
                {usarPontos ? 'Usando' : 'Usar'}
              </Text>
            </TouchableOpacity>
          </View>

          {usarPontos && (
            <Text style={styles.successMsg}>✓ Desconto de R$ 5.00 aplicado!</Text>
          )}
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Resumo do Pedido</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>{formatBRL(subtotal)}</Text>
          </View>
          {method === 'casa' && freteOK ? (
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Frete</Text>
              <Text style={styles.summaryValue}>{formatBRL(frete ?? 0)}</Text>
            </View>
          ) : null}
          {usarPontos && (
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Desconto</Text>
              <Text style={[styles.summaryValue, { color: '#2DBE49' }]}>- {formatBRL(descontoPontos)}</Text>
            </View>
          )}
          <View style={styles.divider} />
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>{formatBRL(total)}</Text>
          </View>
          <TouchableOpacity style={styles.checkoutBtn} onPress={handleFinishOrder}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Text style={styles.checkoutText}>Finalizar Pedido</Text>
              <Icon name="chevron-right" size={20} color="#fff" />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal visible={addressModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Selecione o Endereço</Text>
            {addresses.map(addr => (
              <TouchableOpacity key={addr.id} style={[styles.addressOption, selectedAddress.id === addr.id && styles.addressOptionActive]} onPress={() => { setSelectedAddress(addr); setAddressModalVisible(false); }}>
                <Text style={styles.addressOptionText}>{addr.fullString}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.addAddressBtn} onPress={() => setNewAddressModalVisible(true)}>
              <Text style={styles.addAddressText}>+ Outro Endereço</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalBtnCancel} onPress={() => setAddressModalVisible(false)}>
              <Text style={styles.modalBtnTextCancel}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={newAddressModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Adicionar Novo Endereço</Text>
            <TextInput style={styles.formInput} placeholder="CEP" placeholderTextColor="#999" keyboardType="numeric" value={newAddrForm.cep} onChangeText={buscarCep} maxLength={9} />
            <TextInput style={styles.formInput} placeholder="Rua" placeholderTextColor="#999" value={newAddrForm.street} onChangeText={t => setNewAddrForm({...newAddrForm, street: t})} />
            <View style={styles.formRow}>
              <TextInput style={[styles.formInput, { flex: 1 }]} placeholder="Número" placeholderTextColor="#999" value={newAddrForm.number} onChangeText={t => setNewAddrForm({...newAddrForm, number: t})} />
              <TextInput style={[styles.formInput, { flex: 1 }]} placeholder="Complemento" placeholderTextColor="#999" value={newAddrForm.complement} onChangeText={t => setNewAddrForm({...newAddrForm, complement: t})} />
            </View>
            <TextInput style={styles.formInput} placeholder="Bairro" placeholderTextColor="#999" value={newAddrForm.neighborhood} onChangeText={t => setNewAddrForm({...newAddrForm, neighborhood: t})} />
            <View style={styles.formRow}>
              <TextInput style={[styles.formInput, { flex: 1 }]} placeholder="Cidade" placeholderTextColor="#999" value={newAddrForm.city} onChangeText={t => setNewAddrForm({...newAddrForm, city: t})} />
              <TextInput style={[styles.formInput, { flex: 1 }]} placeholder="Estado" placeholderTextColor="#999" value={newAddrForm.state} onChangeText={t => setNewAddrForm({...newAddrForm, state: t})} />
            </View>
            
            <TouchableOpacity style={styles.modalBtnConfirm} onPress={handleSaveAddress}>
              <Text style={styles.modalBtnTextConfirm}>Adicionar Endereço</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalBtnCancel} onPress={() => setNewAddressModalVisible(false)}>
              <Text style={styles.modalBtnTextCancel}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Payment Selection Modal */}
      <Modal visible={paymentModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Forma de Pagamento</Text>
            {paymentMethods.map(pm => (
              <TouchableOpacity key={pm.id} style={[styles.addressOption, selectedPayment.id === pm.id && styles.addressOptionActive]} onPress={() => { setSelectedPayment(pm); setPaymentModalVisible(false); }}>
                <Text style={styles.addressOptionText}>{pm.label}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.addAddressBtn} onPress={() => setNewCardModalVisible(true)}>
              <Text style={styles.addAddressText}>+ Outra Forma de Pagamento</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalBtnCancel} onPress={() => setPaymentModalVisible(false)}>
              <Text style={styles.modalBtnTextCancel}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* New Card Modal */}
      <Modal visible={newCardModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Adicionar Nova Forma de Pagamento</Text>
            
            <TextInput style={styles.formInput} placeholder="Número do Cartão" placeholderTextColor="#999" keyboardType="numeric" value={newCardForm.number} onChangeText={t => setNewCardForm({...newCardForm, number: t.replace(/\D/g, '')})} />
            <TextInput style={styles.formInput} placeholder="Nome no Cartão" placeholderTextColor="#999" value={newCardForm.name} onChangeText={t => setNewCardForm({...newCardForm, name: t})} />
            
            <View style={styles.formRow}>
              <TextInput 
                style={[styles.formInput, { flex: 1 }]} 
                placeholder="MM/AA" 
                placeholderTextColor="#999" 
                keyboardType="numeric"
                maxLength={5}
                value={newCardForm.expiry} 
                onChangeText={t => {
                  const clean = t.replace(/\D/g, '');
                  const limited = clean.slice(0, 4);
                  let formatted = limited;
                  if (limited.length > 2) {
                    formatted = `${limited.slice(0, 2)}/${limited.slice(2)}`;
                  }
                  setNewCardForm({...newCardForm, expiry: formatted});
                }} 
              />
              <TextInput style={[styles.formInput, { flex: 1 }]} placeholder="CVV" placeholderTextColor="#999" keyboardType="numeric" maxLength={3} value={newCardForm.cvv} onChangeText={t => setNewCardForm({...newCardForm, cvv: t.replace(/\D/g, '')})} />
            </View>

            <View style={{ marginBottom: 20 }}>
              <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }} onPress={() => setNewCardForm({...newCardForm, type: 'credit'})}>
                <Icon name={newCardForm.type === 'credit' ? 'radiobox-marked' : 'radiobox-blank'} size={24} color="#333" />
                <Text style={{ marginLeft: 8, fontSize: 14, color: '#333' }}>Cartão de Crédito</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => setNewCardForm({...newCardForm, type: 'debit'})}>
                <Icon name={newCardForm.type === 'debit' ? 'radiobox-marked' : 'radiobox-blank'} size={24} color="#333" />
                <Text style={{ marginLeft: 8, fontSize: 14, color: '#333' }}>Cartão de Débito</Text>
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity style={[styles.modalBtnConfirm, { backgroundColor: '#C62828' }]} onPress={handleSaveCard}>
              <Text style={styles.modalBtnTextConfirm}>Adicionar Forma de Pagamento</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalBtnCancel} onPress={() => setNewCardModalVisible(false)}>
              <Text style={styles.modalBtnTextCancel}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Success Modal */}
      <Modal visible={successModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={{ alignItems: 'center', marginBottom: 20 }}>
              <View style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: '#E0F2F1', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                <Icon name="check-circle-outline" size={48} color="#00BFA5" />
              </View>
              <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#333', marginBottom: 8 }}>Pedido Realizado!</Text>
              <Text style={{ fontSize: 16, color: '#666' }}>Pedido {orderId}</Text>
            </View>
            
            <TouchableOpacity 
              style={[styles.modalBtnConfirm, { backgroundColor: '#004AAD', marginBottom: 12 }]} 
              onPress={() => {
                setSuccessModalVisible(false);
                router.push({ pathname: '/(tabs)/rastrearpedido', params: { orderId, deliveryMethod: method } });
              }}
            >
              <Text style={styles.modalBtnTextConfirm}>Rastrear Pedido</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.modalBtnCancel, { backgroundColor: '#F5F5F5', borderWidth: 0 }]} 
              onPress={() => {
                setSuccessModalVisible(false);
                router.push('/(tabs)/produtos');
              }}
            >
              <Text style={{ color: '#333', fontSize: 16, fontWeight: '600' }}>Continuar Comprando</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.bottomMenu}>
        <Link href="/" asChild>
          <TouchableOpacity style={styles.menuItem}>
            <Icon name="home" size={26} color="#777" />
            <Text style={styles.menuText}>Início</Text>
          </TouchableOpacity>
        </Link>
        <Link href="/(tabs)/produtos" asChild>
          <TouchableOpacity style={styles.menuItem}>
            <Icon name="store" size={26} color="#777" />
            <Text style={styles.menuText}>Produtos</Text>
          </TouchableOpacity>
        </Link>
        <TouchableOpacity style={styles.menuItem}>
          <Icon name="qrcode-scan" size={26} color="#777" />
          <Text style={styles.menuText}>Autônoma</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Icon name="map-marker" size={26} color="#777" />
          <Text style={styles.menuText}>Loja</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Icon name="account" size={26} color="#777" />
          <Text style={styles.menuText}>Perfil</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingBottom: 70 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', backgroundColor: '#004AAD', padding: 20, width: '100%', borderBottomLeftRadius: 26, borderBottomRightRadius: 26, elevation: 4 },
  headerTitle: { color: '#fff', fontSize: 24, fontWeight: '700', marginLeft: 8 },
  backBubble: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.18)', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  itemsCount: { color: '#fff', fontWeight: '700' },

  content: { paddingHorizontal: 16, paddingTop: 12, paddingBottom: 120, gap: 12 },
  card: { backgroundColor: '#fff', borderRadius: 18, padding: 14, elevation: 3 },
  cardTitle: { fontWeight: '700', color: '#333', fontSize: 16 },
  cardHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardHeaderLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  cardBodyText: { color: '#555', marginTop: 8, fontSize: 14 },

  methodsRow: { flexDirection: 'row', gap: 10, marginTop: 10 },
  methodBtn: { flex: 1, paddingVertical: 16, borderRadius: 12, backgroundColor: '#f7f9fc', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#e3e7ef', gap: 6 },
  methodActive: { backgroundColor: '#eaf2ff', borderColor: '#2F6FDB' },
  methodText: { color: '#555', fontWeight: '600' },
  methodTextActive: { color: '#004AAD', fontWeight: '700' },

  input: { flex: 1, fontSize: 16, borderWidth: 1, borderColor: '#dde3ea', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10, backgroundColor: '#fff' },
  freightRow: { flexDirection: 'row', gap: 10, marginTop: 10 },
  calcBtn: { paddingHorizontal: 16, paddingVertical: 12, borderRadius: 10, backgroundColor: '#2F6FDB', alignItems: 'center', justifyContent: 'center' },
  calcText: { color: '#fff', fontWeight: '700' },
  freightSuccess: { marginTop: 10, backgroundColor: '#e9f7ee', borderRadius: 10, padding: 12, borderWidth: 1, borderColor: '#c9ebd3' },
  freightOkText: { color: '#2e7d32', fontWeight: '700' },
  freightOkValue: { color: '#2e7d32', fontWeight: '700' },
  freightOkSub: { color: '#2e7d32', marginTop: 4 },

  couponRow: { flexDirection: 'row', gap: 10, marginTop: 10 },
  applyBtn: { paddingHorizontal: 16, paddingVertical: 12, borderRadius: 10, backgroundColor: '#2DBE49', alignItems: 'center', justifyContent: 'center' },
  applyText: { color: '#fff', fontWeight: '700' },

  pointsText: { color: '#555' },
  pointsValue: { color: '#C62828', fontWeight: '700' },
  pointsSub: { color: '#999', marginTop: 2 },
  pointsRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 },
  useBtnInactive: { backgroundColor: '#edf0f5', paddingVertical: 8, paddingHorizontal: 20, borderRadius: 20, alignItems: 'center' },
  useBtnActive: { backgroundColor: '#F04E23', paddingVertical: 8, paddingHorizontal: 20, borderRadius: 20, alignItems: 'center' },
  useBtnTextInactive: { color: '#777', fontWeight: '700' },
  useBtnTextActive: { color: '#fff', fontWeight: '700' },
  successMsg: { color: '#F04E23', marginTop: 12, fontWeight: '600', fontSize: 14 },

  summaryCard: { backgroundColor: '#fff', borderRadius: 18, padding: 14, elevation: 3 },
  summaryTitle: { fontWeight: '700', color: '#333', marginBottom: 8, fontSize: 16 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 },
  summaryLabel: { fontSize: 14, fontWeight: '700', color: '#666' },
  summaryValue: { fontSize: 16, fontWeight: '700', color: '#666' },
  divider: { height: 1, backgroundColor: '#eee', marginTop: 10, marginBottom: 10 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  totalLabel: { fontSize: 16, fontWeight: '700' },
  totalValue: { fontSize: 18, fontWeight: '700', color: '#C62828' },
  checkoutBtn: { marginTop: 12, backgroundColor: '#C62828', paddingVertical: 14, borderRadius: 10, alignItems: 'center' },
  checkoutText: { color: '#fff', fontWeight: '700' },

  bottomMenu: { position: 'absolute', left: 0, right: 0, bottom: 0, flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 10, borderTopWidth: 1, borderColor: '#eee', backgroundColor: '#fff' },
  menuItem: { alignItems: 'center' },
  menuText: { fontSize: 12, color: '#777' },
  linkText: { color: '#2F6FDB', fontWeight: '700' },
  
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 20 },
  modalContent: { backgroundColor: '#fff', borderRadius: 20, padding: 20 },
  modalTitle: { fontSize: 18, fontWeight: '700', marginBottom: 16, color: '#333' },
  addressOption: { padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#eee', marginBottom: 10 },
  addressOptionActive: { borderColor: '#2F6FDB', backgroundColor: '#f0f4ff' },
  addressOptionText: { color: '#333', fontSize: 14 },
  addAddressBtn: { padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#ccc', borderStyle: 'dashed', alignItems: 'center', marginBottom: 20 },
  addAddressText: { color: '#555' },
  modalBtnCancel: { padding: 14, borderRadius: 10, backgroundColor: '#f5f5f5', alignItems: 'center', marginTop: 10 },
  modalBtnTextCancel: { color: '#333', fontWeight: '700' },
  modalBtnConfirm: { padding: 14, borderRadius: 10, backgroundColor: '#004AAD', alignItems: 'center', marginTop: 10 },
  modalBtnTextConfirm: { color: '#fff', fontWeight: '700' },
  formRow: { flexDirection: 'row', gap: 10 },
  formInput: { borderWidth: 1, borderColor: '#dde3ea', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10, marginBottom: 12, fontSize: 14, color: '#333' },
})