import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';

export default function Autonomia() {
  const router = useRouter();
  const [state, setState] = useState<'initial' | 'qrcode' | 'session' | 'summary'>('initial');
  const [timer, setTimer] = useState(0);
  const [finalTime, setFinalTime] = useState(0);
  const [qrTimer, setQrTimer] = useState(45);

  // Timer logic for session
  useEffect(() => {
    let interval: any;
    if (state === 'session') {
      interval = setInterval(() => {
        setTimer((t) => t + 1);
      }, 1000);
    } else if (state === 'initial') {
      setTimer(0);
      setFinalTime(0);
    }
    return () => clearInterval(interval);
  }, [state]);

  // QR Code countdown logic
  useEffect(() => {
    let interval: any;
    if (state === 'qrcode') {
      setQrTimer(45);
      interval = setInterval(() => {
        setQrTimer((prev) => {
          if (prev <= 1) {
            setState('initial');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [state]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleExitStore = () => {
    setFinalTime(timer);
    setState('summary');
  };

  const handleNewPurchase = () => {
    setState('initial');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity style={styles.backBubble} onPress={() => router.back()}>
            <Icon name="arrow-left" size={22} color="#fff" />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerTitle}>Loja Autônoma</Text>
            <Text style={styles.headerSubtitle}>Compre sem filas, 24/7</Text>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        
        {/* State 1: Initial */}
        {state === 'initial' && (
          <View style={styles.card}>
            <View style={styles.iconCircle}>
              <Icon name="qrcode-scan" size={48} color="#fff" />
            </View>
            <Text style={styles.cardTitle}>Entre na Loja Autônoma</Text>
            <Text style={styles.cardDesc}>
              Gere um QR Code para entrar na loja e fazer suas compras de forma rápida e sem filas.
            </Text>

            <View style={styles.stepsRow}>
              <View style={styles.stepItem}>
                <View style={styles.stepNum}><Text style={styles.stepNumText}>1</Text></View>
                <Text style={styles.stepText}>Gere o QR Code</Text>
              </View>
              <View style={styles.stepItem}>
                <View style={[styles.stepNum, { backgroundColor: '#FFEBEE' }]}><Text style={[styles.stepNumText, { color: '#C62828' }]}>2</Text></View>
                <Text style={styles.stepText}>Escaneie na entrada</Text>
              </View>
              <View style={styles.stepItem}>
                <View style={[styles.stepNum, { backgroundColor: '#E3F2FD' }]}><Text style={[styles.stepNumText, { color: '#1E88E5' }]}>3</Text></View>
                <Text style={styles.stepText}>Pegue seus itens</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.actionBtn} onPress={() => setState('qrcode')}>
              <Icon name="qrcode" size={20} color="#fff" />
              <Text style={styles.actionBtnText}>Gerar QR Code de Entrada</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* State 2: QR Code */}
        {state === 'qrcode' && (
          <View style={styles.card}>
            <View style={styles.qrContainer}>
              <Image 
                source={{ uri: 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=AtadieselUserAuth' }} 
                style={{ width: 220, height: 220 }} 
              />
            </View>
            
            <View style={{ alignItems: 'center', marginTop: 20 }}>
              <Text style={styles.loadingText}>QR Code válido por {qrTimer}s</Text>
              <Text style={[styles.cardDesc, { marginTop: 4, textAlign: 'center' }]}>Escaneie na catraca para entrar</Text>
              
              <TouchableOpacity 
                style={[styles.actionBtn, { marginTop: 20, backgroundColor: '#2E7D32' }]} 
                onPress={() => setState('session')}
              >
                <Icon name="check-circle-outline" size={20} color="#fff" />
                <Text style={styles.actionBtnText}>Simular Leitura</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* State 3: Session Active */}
        {state === 'session' && (
          <>
            <View style={styles.successBanner}>
              <Icon name="check-circle-outline" size={28} color="#2E7D32" />
              <View style={{ flex: 1 }}>
                <Text style={styles.successTitle}>Você está na loja!</Text>
                <Text style={styles.successSub}>Pegue seus produtos e saia pela porta</Text>
              </View>
            </View>

            <View style={styles.card}>
              <View style={styles.sessionRow}>
                <Text style={styles.sessionLabel}>Sessão Ativa</Text>
                <View style={styles.timerBadge}>
                  <Icon name="clock-outline" size={16} color="#004AAD" />
                  <Text style={styles.timerText}>{formatTime(timer)}</Text>
                </View>
              </View>

              <View style={styles.detectingBox}>
                <Icon name="shopping-outline" size={20} color="#555" />
                <Text style={styles.detectingText}>Detectando produtos automaticamente...</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.exitBtn} onPress={handleExitStore}>
              <Text style={styles.exitBtnText}>Sair da Loja</Text>
            </TouchableOpacity>
          </>
        )}

        {/* State 4: Summary */}
        {state === 'summary' && (
          <View style={styles.card}>
            <View style={styles.summaryHeader}>
              <View style={styles.successIconCircle}>
                <Icon name="check" size={32} color="#2E7D32" />
              </View>
              <Text style={styles.summaryTitle}>Compra Finalizada!</Text>
              <Text style={styles.summarySub}>Obrigado pela sua compra</Text>
              
              <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#E3F2FD', padding: 8, borderRadius: 8, marginTop: 8 }}>
                <Icon name="clock-outline" size={16} color="#004AAD" style={{ marginRight: 6 }} />
                <Text style={{ color: '#004AAD', fontSize: 14 }}>Tempo em loja: <Text style={{ fontWeight: 'bold' }}>{formatTime(finalTime)}</Text></Text>
              </View>
            </View>

            <View style={styles.divider} />

            <Text style={styles.sectionTitle}>Itens Comprados</Text>
            
            <View style={styles.itemRow}>
              <View>
                <Text style={styles.itemName}>Água Mineral 500ml</Text>
                <Text style={styles.itemQty}>2x R$ 2.50</Text>
              </View>
              <Text style={styles.itemPrice}>R$ 5.00</Text>
            </View>

            <View style={styles.itemRow}>
              <View>
                <Text style={styles.itemName}>Café Espresso</Text>
                <Text style={styles.itemQty}>1x R$ 5.00</Text>
              </View>
              <Text style={styles.itemPrice}>R$ 5.00</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Subtotal</Text>
              <Text style={styles.subtotalValue}>R$ 10.00</Text>
            </View>
            <View style={[styles.totalRow, { marginTop: 4 }]}>
              <Text style={styles.totalLabelMain}>Total</Text>
              <Text style={styles.totalValueMain}>R$ 10.00</Text>
            </View>

            <View style={styles.paymentBox}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <Icon name="credit-card-outline" size={20} color="#004AAD" />
                <Text style={styles.paymentTitle}>Forma de Pagamento</Text>
              </View>
              <Text style={styles.paymentDesc}>Cartão final •••• 1234</Text>
              <Text style={styles.paymentStatus}>Débito automático realizado</Text>
            </View>

            <View style={styles.pointsBanner}>
              <Text style={styles.pointsText}>✓ Você ganhou <Text style={{ fontWeight: 'bold' }}>15 pontos</Text> de fidelidade!</Text>
            </View>

            <TouchableOpacity style={styles.newBtn} onPress={handleNewPurchase}>
              <Text style={styles.newBtnText}>Nova Compra</Text>
            </TouchableOpacity>
          </View>
        )}

      </ScrollView>

      {/* Info Footer for Initial State */}
      {state === 'initial' && (
        <View style={styles.infoFooter}>
          <Icon name="information-outline" size={20} color="#004AAD" />
          <Text style={styles.infoText}>
            A loja autônoma funciona 24 horas por dia. Apenas escaneie o QR Code no leitor da porta de entrada.
          </Text>
        </View>
      )}

      {/* Bottom Menu */}
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
          <Icon name="qrcode-scan" size={26} color="#C62828" />
          <Text style={styles.menuTextActive}>Autônoma</Text>
        </TouchableOpacity>
        <Link href="/(tabs)/contato" asChild>
          <TouchableOpacity style={styles.menuItem}>
            <Icon name="map-marker" size={26} color="#777" />
            <Text style={styles.menuText}>Loja</Text>
          </TouchableOpacity>
        </Link>
        <Link href="/(tabs)/perfil" asChild>
          <TouchableOpacity style={styles.menuItem}>
            <Icon name="account" size={26} color="#777" />
            <Text style={styles.menuText}>Perfil</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f7fa' },
  header: { backgroundColor: '#004AAD', padding: 20, paddingBottom: 30, borderBottomLeftRadius: 26, borderBottomRightRadius: 26 },
  headerTop: { flexDirection: 'row', alignItems: 'center' },
  backBubble: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.18)', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  headerTitle: { color: '#fff', fontSize: 20, fontWeight: '700' },
  headerSubtitle: { color: '#E0E0E0', fontSize: 14, marginTop: 2 },

  content: { padding: 20, paddingBottom: 100 },
  card: { backgroundColor: '#fff', borderRadius: 20, padding: 24, alignItems: 'center', elevation: 4, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, shadowOffset: { width: 0, height: 4 } },
  
  iconCircle: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#004AAD', alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
  cardTitle: { fontSize: 20, fontWeight: '700', color: '#333', textAlign: 'center', marginBottom: 8 },
  cardDesc: { fontSize: 14, color: '#666', textAlign: 'center', lineHeight: 20, marginBottom: 24 },

  stepsRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 30 },
  stepItem: { alignItems: 'center', flex: 1 },
  stepNum: { width: 32, height: 32, borderRadius: 10, backgroundColor: '#E3F2FD', alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  stepNumText: { color: '#004AAD', fontWeight: '800', fontSize: 16 },
  stepText: { fontSize: 11, color: '#555', textAlign: 'center', maxWidth: 80 },

  actionBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, backgroundColor: '#C62828', width: '100%', paddingVertical: 16, borderRadius: 12 },
  actionBtnText: { color: '#fff', fontWeight: '700', fontSize: 16 },

  qrContainer: { padding: 20, backgroundColor: '#fff', borderRadius: 16 },
  loadingText: { marginTop: 16, color: '#555', fontSize: 14 },

  successBanner: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: '#E8F5E9', padding: 16, borderRadius: 12, marginBottom: 20, borderWidth: 1, borderColor: '#C8E6C9' },
  successTitle: { color: '#2E7D32', fontWeight: '700', fontSize: 16 },
  successSub: { color: '#388E3C', fontSize: 13 },

  sessionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: 20 },
  sessionLabel: { fontSize: 16, fontWeight: '600', color: '#333' },
  timerBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#E3F2FD', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  timerText: { color: '#004AAD', fontWeight: '700', fontSize: 14 },

  detectingBox: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: '#f5f5f5', padding: 16, borderRadius: 12, width: '100%' },
  detectingText: { color: '#666', fontSize: 14, flex: 1 },

  exitBtn: { backgroundColor: '#C62828', paddingVertical: 16, borderRadius: 12, alignItems: 'center', marginTop: 24 },
  exitBtnText: { color: '#fff', fontWeight: '700', fontSize: 16 },

  // Summary Styles
  summaryHeader: { alignItems: 'center', marginBottom: 20 },
  successIconCircle: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#E8F5E9', alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  summaryTitle: { fontSize: 20, fontWeight: '700', color: '#333' },
  summarySub: { color: '#666', marginTop: 4 },
  
  divider: { height: 1, backgroundColor: '#eee', width: '100%', marginVertical: 16 },
  sectionTitle: { fontSize: 14, fontWeight: '700', color: '#333', alignSelf: 'flex-start', marginBottom: 12 },
  itemRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 12 },
  itemName: { fontSize: 14, color: '#333', fontWeight: '500' },
  itemQty: { fontSize: 12, color: '#777', marginTop: 2 },
  itemPrice: { fontSize: 14, color: '#333', fontWeight: '600' },

  totalRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
  totalLabel: { color: '#666', fontSize: 14 },
  subtotalValue: { color: '#333', fontSize: 14, fontWeight: '600' },
  totalLabelMain: { color: '#333', fontSize: 16, fontWeight: '700' },
  totalValueMain: { color: '#C62828', fontSize: 18, fontWeight: '700' },

  paymentBox: { width: '100%', backgroundColor: '#E3F2FD', padding: 16, borderRadius: 12, marginTop: 20 },
  paymentTitle: { color: '#004AAD', fontWeight: '700', fontSize: 14 },
  paymentDesc: { color: '#333', fontSize: 14, marginLeft: 28 },
  paymentStatus: { color: '#1E88E5', fontSize: 12, marginLeft: 28, marginTop: 4 },

  pointsBanner: { width: '100%', backgroundColor: '#E8F5E9', padding: 12, borderRadius: 8, marginTop: 16, alignItems: 'center' },
  pointsText: { color: '#2E7D32', fontSize: 14 },

  newBtn: { backgroundColor: '#C62828', width: '100%', paddingVertical: 14, borderRadius: 12, alignItems: 'center', marginTop: 20 },
  newBtnText: { color: '#fff', fontWeight: '700' },

  infoFooter: { marginHorizontal: 20, marginTop: -80, marginBottom: 100, flexDirection: 'row', gap: 10, backgroundColor: '#E3F2FD', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#BBDEFB' },
  infoText: { flex: 1, color: '#0D47A1', fontSize: 13, lineHeight: 18 },

  bottomMenu: { position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 10, borderTopWidth: 1, borderColor: '#eee', backgroundColor: '#fff' },
  menuItem: { alignItems: 'center' },
  menuText: { fontSize: 12, color: '#777' },
  menuTextActive: { fontSize: 12, color: '#C62828', fontWeight: '700' },
});