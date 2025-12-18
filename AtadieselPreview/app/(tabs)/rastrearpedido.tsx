import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams, Link } from 'expo-router';

interface StatusStep {
  id: number;
  label: string;
  time: string;
  icon: keyof typeof Icon.glyphMap;
}

const STATUS_STEPS: StatusStep[] = [
  { id: 1, label: 'Preparando pedido', time: '14:30', icon: 'package-variant-closed' },
  { id: 2, label: 'Pronto para entrega', time: '14:45', icon: 'check-circle-outline' },
  { id: 3, label: 'Saiu para entrega', time: '14:50', icon: 'bike' },
  { id: 4, label: 'Entregue', time: '15:10', icon: 'map-marker-check' },
];

const STORE_PICKUP_STEPS: StatusStep[] = [
  { id: 1, label: 'Pedido aceito', time: '14:00', icon: 'check-circle-outline' },
  { id: 2, label: 'Preparando pedido', time: '14:15', icon: 'package-variant-closed' },
  { id: 3, label: 'Pedido pronto', time: '14:30', icon: 'cube' },
  { id: 4, label: 'Retirada do pedido', time: '15:00', icon: 'check' },
];

export default function RastrearPedido() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const orderId = params.orderId as string || '#ORD-HR88NXR2U';
  const deliveryMethod = (params.deliveryMethod as 'casa' | 'loja') || 'casa';

  const activeSteps = deliveryMethod === 'loja' ? STORE_PICKUP_STEPS : STATUS_STEPS;
  
  // State for order status simulation
  // 0: Preparando, 1: Pronto, 2: Saiu, 3: Entregue
  const [currentStepIndex, setCurrentStepIndex] = useState(1); // Starts at 2nd step
  
  // Review Modal State
  const [reviewModalVisible, setReviewModalVisible] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  // Simulate status progression for demo purposes
  // In a real app, this would come from a backend/socket
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStepIndex(prev => {
        if (prev < activeSteps.length - 1) return prev + 1;
        return prev;
      });
    }, 5000); // Advance every 5 seconds for demo

    return () => clearInterval(timer);
  }, [activeSteps]);

  const currentStatus = activeSteps[currentStepIndex];
  const isFinished = currentStepIndex === activeSteps.length - 1;

  const handleSendReview = () => {
    // Simulate sending review
    setReviewModalVisible(false);
    setShowSuccessToast(true);
    setTimeout(() => {
      setShowSuccessToast(false);
      router.push('/');
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Icon name="arrow-left" size={24} color="#fff" />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerTitle}>Acompanhar Pedido</Text>
            <Text style={styles.headerSubtitle}>Pedido {orderId}</Text>
          </View>
        </View>

        <View style={styles.statusCard}>
          <View style={styles.statusRow}>
            <View style={styles.statusIconContainer}>
              <Icon name={currentStatus.icon} size={28} color="#00BFA5" />
            </View>
            <View>
              <Text style={styles.statusCardTitle}>{currentStatus.label}</Text>
              <Text style={styles.statusCardSubtitle}>
                {deliveryMethod === 'loja' 
                  ? (currentStepIndex === 3 ? 'Pedido retirado' : 'Aguarde a atualização')
                  : (currentStepIndex === 1 ? 'Aguardando entregador' : 
                     currentStepIndex === 2 ? 'Entregador a caminho' :
                     currentStepIndex === 3 ? 'Pedido concluído' : 'Aguarde um momento')
                }
              </Text>
            </View>
          </View>
          <View style={styles.dividerLight} />
          <View style={styles.timeRow}>
            <Icon name="clock-outline" size={18} color="#fff" />
            <Text style={styles.timeText}>Tempo estimado: 25 min</Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* Location Section - Only show for delivery */}
        {deliveryMethod === 'casa' && (
          <View style={styles.sectionCard}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
              <Icon name="map-marker-outline" size={20} color="#C62828" />
              <Text style={styles.sectionTitle}>Localização da Entrega</Text>
            </View>
            
            <View style={styles.mapContainer}>
              {/* Visual representation of Store -> Home */}
              <View style={styles.mapVisual}>
                <View style={styles.mapNode}>
                  <View style={[styles.mapIconBox, { backgroundColor: '#004AAD' }]}>
                    <Icon name="store-outline" size={20} color="#fff" />
                  </View>
                  <View style={styles.mapLine} />
                  <View style={[styles.mapIconBox, { backgroundColor: '#E0E0E0' }]}>
                    <Icon name="map-marker" size={20} color="#999" />
                  </View>
                </View>
                <View style={styles.mapLabels}>
                  <View style={styles.mapLabelItem}>
                    <Text style={styles.mapLabelTitle}>TT Diesel Store</Text>
                    <Text style={styles.mapLabelSub}>Ponto de partida</Text>
                  </View>
                  <View style={[styles.mapLabelItem, { marginTop: 40 }]}>
                    <Text style={styles.mapLabelTitle}>Seu endereço</Text>
                    <Text style={styles.mapLabelSub}>Rua das Flores, 123 - Centro, SP</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* Timeline Section */}
        <View style={styles.sectionCard}>
          <Text style={[styles.sectionTitle, { marginBottom: 20 }]}>Status do Pedido</Text>
          <View style={styles.timelineContainer}>
            {activeSteps.map((step, index) => {
              const isActive = index <= currentStepIndex;
              const isLast = index === activeSteps.length - 1;
              
              return (
                <View key={step.id} style={styles.timelineItem}>
                  <View style={styles.timelineLeft}>
                    <View style={[styles.timelineDot, isActive && styles.timelineDotActive]}>
                      {isActive && <Icon name="check" size={14} color="#fff" />}
                    </View>
                    {!isLast && <View style={[styles.timelineLine, isActive && index < currentStepIndex && styles.timelineLineActive]} />}
                  </View>
                  <View style={styles.timelineContent}>
                    <Text style={[styles.timelineLabel, isActive && styles.timelineLabelActive]}>{step.label}</Text>
                    <Text style={styles.timelineTime}>{step.time}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        {/* Order Summary */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Resumo do Pedido</Text>
          <View style={{ marginTop: 10 }}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Pedido</Text>
              <Text style={styles.summaryValue}>{orderId}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Método</Text>
              <Text style={styles.summaryValue}>{deliveryMethod === 'loja' ? 'Retirada na Loja' : 'Entrega'}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.summaryRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>R$ 5.10</Text>
            </View>
          </View>
        </View>

        {/* Review Button - Only if finished */}
        {isFinished && (
          <TouchableOpacity style={styles.reviewBtn} onPress={() => setReviewModalVisible(true)}>
            <Icon name="star-outline" size={20} color="#fff" style={{ marginRight: 8 }} />
            <Text style={styles.reviewBtnText}>Avaliar Pedido</Text>
          </TouchableOpacity>
        )}
        
        <TouchableOpacity style={styles.continueBtn} onPress={() => router.push('/(tabs)/produtos')}>
          <Text style={styles.continueBtnText}>Continuar Comprando</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Review Modal */}
      <Modal visible={reviewModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalIconContainer}>
              <Icon name="check-circle-outline" size={40} color="#00BFA5" />
            </View>
            <Text style={styles.modalTitle}>Como foi sua experiência?</Text>
            <Text style={styles.modalSubtitle}>Avalie sua entrega</Text>

            <View style={styles.starsContainer}>
              {[1, 2, 3, 4, 5].map(star => (
                <TouchableOpacity key={star} onPress={() => setRating(star)}>
                  <Icon 
                    name={star <= rating ? "star" : "star-outline"} 
                    size={36} 
                    color={star <= rating ? "#FFC107" : "#DDD"} 
                    style={{ marginHorizontal: 4 }}
                  />
                </TouchableOpacity>
              ))}
            </View>

            <TextInput 
              style={styles.reviewInput}
              placeholder="Comentários adicionais (opcional)"
              placeholderTextColor="#999"
              multiline
              value={comment}
              onChangeText={setComment}
            />

            <TouchableOpacity style={styles.submitReviewBtn} onPress={handleSendReview}>
              <Text style={styles.submitReviewText}>Enviar Avaliação</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelReviewBtn} onPress={() => setReviewModalVisible(false)}>
              <Text style={styles.cancelReviewText}>Agora não</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {showSuccessToast && (
        <View style={styles.toast}>
          <Icon name="check-circle-outline" size={22} color="#fff" />
          <Text style={styles.toastText}>Avaliação enviada com sucesso!</Text>
        </View>
      )}

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
        <Link href="/(tabs)/autonomia" asChild>
          <TouchableOpacity style={styles.menuItem}>
            <Icon name="qrcode-scan" size={26} color="#777" />
            <Text style={styles.menuText}>Autônoma</Text>
          </TouchableOpacity>
        </Link>
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
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#004AAD',
    paddingHorizontal: 20,
    paddingBottom: 40,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  backBtn: {
    marginRight: 16,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: '#E0E0E0',
    fontSize: 14,
  },
  statusCard: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  statusIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  statusCardTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  statusCardSubtitle: {
    color: '#E0E0E0',
    fontSize: 13,
  },
  dividerLight: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginVertical: 10,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  timeText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 20,
    marginTop: -20,
  },
  sectionCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  mapContainer: {
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
  },
  mapVisual: {
    flexDirection: 'row',
    flex: 1,
  },
  mapNode: {
    alignItems: 'center',
    marginRight: 12,
  },
  mapIconBox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  mapLine: {
    width: 2,
    height: 40,
    backgroundColor: '#E0E0E0',
    marginVertical: -4,
  },
  mapLabels: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  mapLabelItem: {
    justifyContent: 'center',
  },
  mapLabelTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  mapLabelSub: {
    fontSize: 12,
    color: '#777',
  },
  timelineContainer: {
    paddingLeft: 8,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  timelineLeft: {
    alignItems: 'center',
    marginRight: 16,
    width: 24,
  },
  timelineDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#F5F5F5',
    zIndex: 1,
  },
  timelineDotActive: {
    backgroundColor: '#00C853',
    borderColor: '#E8F5E9',
  },
  timelineLine: {
    position: 'absolute',
    top: 24,
    bottom: -24,
    width: 2,
    backgroundColor: '#E0E0E0',
    zIndex: 0,
  },
  timelineLineActive: {
    backgroundColor: '#00C853',
  },
  timelineContent: {
    flex: 1,
    paddingTop: 2,
  },
  timelineLabel: {
    fontSize: 15,
    color: '#777',
    marginBottom: 4,
  },
  timelineLabelActive: {
    color: '#004AAD',
    fontWeight: 'bold',
  },
  timelineTime: {
    fontSize: 12,
    color: '#999',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  summaryValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#EEE',
    marginVertical: 12,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#C62828',
  },
  reviewBtn: {
    backgroundColor: '#004AAD',
    borderRadius: 8,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  reviewBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  continueBtn: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueBtnText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
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
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  modalIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#E0F2F1',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  reviewInput: {
    width: '100%',
    height: 100,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 12,
    textAlignVertical: 'top',
    fontSize: 14,
    marginBottom: 20,
  },
  submitReviewBtn: {
    width: '100%',
    backgroundColor: '#004AAD',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 12,
  },
  submitReviewText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelReviewBtn: {
    padding: 10,
  },
  cancelReviewText: {
    color: '#777',
    fontSize: 14,
  },
  bottomMenu: { 
    position: 'absolute', 
    left: 0, 
    right: 0, 
    bottom: 0, 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    paddingVertical: 10, 
    borderTopWidth: 1, 
    borderColor: '#eee', 
    backgroundColor: '#fff' 
  },
  menuItem: { 
    alignItems: 'center' 
  },
  menuText: { 
    fontSize: 12, 
    color: '#777' 
  },
  toast: { position: 'absolute', left: 16, right: 16, top: 100, flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#00C853', paddingVertical: 12, paddingHorizontal: 14, borderRadius: 12, elevation: 10, zIndex: 100 },
  toastText: { color: '#fff', fontWeight: '700' },
});