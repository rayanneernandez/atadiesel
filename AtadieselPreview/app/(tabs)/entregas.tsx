import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, useRouter } from 'expo-router';

type OrderStatus = 'PENDING' | 'ACCEPTED' | 'PREPARING' | 'READY' | 'OUT_FOR_DELIVERY' | 'DELIVERED' | 'COMPLETED';

interface Order {
  id: string;
  customer: string;
  address: string;
  items: string;
  total: string;
  time: string;
  status: OrderStatus;
  paymentMethod: string;
}

const MOCK_ORDERS: Order[] = [
  {
    id: '#ORD-001',
    customer: 'Carlos Oliveira',
    address: 'Rua das Palmeiras, 123 - Centro',
    items: '2x Óleo 5W30, 1x Filtro de Óleo',
    total: 'R$ 185,90',
    time: '10:30',
    status: 'PENDING',
    paymentMethod: 'Pix',
  },
  {
    id: '#ORD-002',
    customer: 'Ana Santos',
    address: 'Av. Brasil, 500 - Jardim Flores',
    items: '1x Bateria 60Ah',
    total: 'R$ 450,00',
    time: '10:15',
    status: 'ACCEPTED',
    paymentMethod: 'Cartão Crédito',
  },
  {
    id: '#ORD-003',
    customer: 'Roberto Lima',
    address: 'Rua A, 45 - Vila Nova',
    items: '4x Pneus 175/70 R13',
    total: 'R$ 1.200,00',
    time: '09:45',
    status: 'PREPARING',
    paymentMethod: 'Dinheiro',
  },
  {
    id: '#ORD-004',
    customer: 'Fernanda Costa',
    address: 'Retirada na Loja',
    items: '1x Kit Embreagem',
    total: 'R$ 890,00',
    time: '09:30',
    status: 'READY',
    paymentMethod: 'Pix',
  },
  {
    id: '#ORD-005',
    customer: 'Paulo Souza',
    address: 'Rua do Comércio, 88',
    items: '1x Farol Direito',
    total: 'R$ 320,00',
    time: '09:00',
    status: 'OUT_FOR_DELIVERY',
    paymentMethod: 'Cartão Débito',
  },
  {
    id: '#ORD-006',
    customer: 'Maria Silva',
    address: 'Av. Central, 1000',
    items: '2x Limpador Para-brisa',
    total: 'R$ 80,00',
    time: 'Ontem',
    status: 'COMPLETED',
    paymentMethod: 'Pix',
  },
  {
    id: '#ORD-007',
    customer: 'João Pedro',
    address: 'Rua B, 22',
    items: '1x Aditivo Radiador',
    total: 'R$ 45,00',
    time: 'Ontem',
    status: 'COMPLETED',
    paymentMethod: 'Dinheiro',
  },
];

export default function EntregasScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'active' | 'history'>('active');
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);

  const getStatusLabel = (status: OrderStatus) => {
    switch (status) {
      case 'PENDING': return 'Novo Pedido';
      case 'ACCEPTED': return 'Aceito';
      case 'PREPARING': return 'Preparando';
      case 'READY': return 'Pronto';
      case 'OUT_FOR_DELIVERY': return 'Em Trânsito';
      case 'DELIVERED': return 'Entregue';
      case 'COMPLETED': return 'Concluído';
      default: return status;
    }
  };

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'PENDING': return '#FBC02D'; // Yellow
      case 'ACCEPTED': return '#1976D2'; // Blue
      case 'PREPARING': return '#7B1FA2'; // Purple
      case 'READY': return '#F57C00'; // Orange
      case 'OUT_FOR_DELIVERY': return '#0288D1'; // Light Blue
      case 'DELIVERED': return '#388E3C'; // Green
      case 'COMPLETED': return '#388E3C'; // Green
      default: return '#757575';
    }
  };

  const handleStatusUpdate = (orderId: string, currentStatus: OrderStatus) => {
    let nextStatus: OrderStatus | null = null;

    switch (currentStatus) {
      case 'PENDING':
        nextStatus = 'ACCEPTED';
        break;
      case 'ACCEPTED':
        nextStatus = 'PREPARING';
        break;
      case 'PREPARING':
        nextStatus = 'READY';
        break;
      case 'READY':
        nextStatus = 'OUT_FOR_DELIVERY';
        break;
      case 'OUT_FOR_DELIVERY':
        // Admin cannot manually complete, client must confirm.
        // But for testing/demo we might want to allow it or show an alert.
        Alert.alert('Aguardando Cliente', 'A confirmação de entrega deve ser feita pelo cliente no aplicativo.');
        return;
      default:
        return;
    }

    if (nextStatus) {
      setOrders(prev => prev.map(order => 
        order.id === orderId ? { ...order, status: nextStatus! } : order
      ));
    }
  };

  const getActionButtonText = (status: OrderStatus) => {
    switch (status) {
      case 'PENDING': return 'Aceitar Pedido';
      case 'ACCEPTED': return 'Iniciar Preparo';
      case 'PREPARING': return 'Pronto para Entrega';
      case 'READY': return 'Saiu para Entrega';
      case 'OUT_FOR_DELIVERY': return 'Aguardando Confirmação';
      default: return '';
    }
  };

  const activeOrders = orders.filter(o => ['PENDING', 'ACCEPTED', 'PREPARING', 'READY', 'OUT_FOR_DELIVERY'].includes(o.status));
  const historyOrders = orders.filter(o => ['DELIVERED', 'COMPLETED'].includes(o.status));

  const renderOrderCard = (order: Order) => (
    <View key={order.id} style={styles.orderCard}>
      <View style={styles.cardHeader}>
        <Text style={styles.orderId}>{order.id}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) }]}>
          <Text style={styles.statusText}>{getStatusLabel(order.status)}</Text>
        </View>
      </View>

      <View style={styles.cardBody}>
        <View style={styles.row}>
          <MaterialCommunityIcons name="account" size={20} color="#666" />
          <Text style={styles.customerName}>{order.customer}</Text>
        </View>
        <View style={styles.row}>
          <MaterialCommunityIcons name="map-marker" size={20} color="#666" />
          <Text style={styles.addressText}>{order.address}</Text>
        </View>
        <View style={styles.divider} />
        <Text style={styles.itemsText}>{order.items}</Text>
        <View style={styles.footerRow}>
          <Text style={styles.totalText}>{order.total}</Text>
          <Text style={styles.paymentMethod}>{order.paymentMethod}</Text>
        </View>
      </View>

      {activeTab === 'active' && (
        <TouchableOpacity 
          style={[
            styles.actionButton, 
            order.status === 'OUT_FOR_DELIVERY' && styles.actionButtonDisabled
          ]}
          onPress={() => handleStatusUpdate(order.id, order.status)}
          disabled={order.status === 'OUT_FOR_DELIVERY'}
        >
          <Text style={styles.actionButtonText}>
            {getActionButtonText(order.status)}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Image source={require('../../assets/images/atadiesel-logo-white.png')} style={styles.logo} />
          <Text style={styles.brandSubtitle}>Gestão de Entregas</Text>
        </View>
        <Link href="/perfiladmin" asChild>
          <TouchableOpacity style={styles.profileBtn}>
            <MaterialCommunityIcons name="account-circle-outline" size={28} color="#fff" />
          </TouchableOpacity>
        </Link>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'active' && styles.tabButtonActive]}
          onPress={() => setActiveTab('active')}
        >
          <Text style={[styles.tabText, activeTab === 'active' && styles.tabTextActive]}>Em Andamento</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'history' && styles.tabButtonActive]}
          onPress={() => setActiveTab('history')}
        >
          <Text style={[styles.tabText, activeTab === 'history' && styles.tabTextActive]}>Histórico</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {activeTab === 'active' ? (
          activeOrders.length > 0 ? (
            activeOrders.map(renderOrderCard)
          ) : (
            <View style={styles.emptyState}>
              <MaterialCommunityIcons name="package-variant" size={48} color="#CCC" />
              <Text style={styles.emptyText}>Nenhum pedido em andamento</Text>
            </View>
          )
        ) : (
          historyOrders.length > 0 ? (
            historyOrders.map(renderOrderCard)
          ) : (
            <View style={styles.emptyState}>
              <MaterialCommunityIcons name="history" size={48} color="#CCC" />
              <Text style={styles.emptyText}>Nenhum pedido no histórico</Text>
            </View>
          )
        )}
      </ScrollView>

      {/* Bottom Menu */}
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

        <TouchableOpacity style={styles.menuItem}>
          <MaterialCommunityIcons name="truck-delivery" size={24} color="#C62828" />
          <Text style={styles.menuTextActive}>Entregas</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: '#004AAD',
    padding: 20,
    paddingBottom: 20,
    borderBottomLeftRadius: 26,
    borderBottomRightRadius: 26,
    elevation: 4,
  },
  logo: {
    width: 140,
    height: 40,
    resizeMode: 'contain',
  },
  brandSubtitle: {
    color: '#fff',
    opacity: 0.9,
    marginTop: 4,
    fontSize: 14,
  },
  profileBtn: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  tabButtonActive: {
    backgroundColor: '#004AAD',
    borderColor: '#004AAD',
  },
  tabText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  tabTextActive: {
    color: '#fff',
  },
  scrollContent: {
    padding: 16,
    paddingTop: 0,
    paddingBottom: 20,
  },
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
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
    alignItems: 'center',
    marginBottom: 12,
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  cardBody: {
    gap: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  customerName: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  addressText: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginVertical: 8,
  },
  itemsText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#004AAD',
  },
  paymentMethod: {
    fontSize: 12,
    color: '#777',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  actionButton: {
    marginTop: 16,
    backgroundColor: '#00C853',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  actionButtonDisabled: {
    backgroundColor: '#BDBDBD',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    color: '#999',
    marginTop: 16,
    fontSize: 16,
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