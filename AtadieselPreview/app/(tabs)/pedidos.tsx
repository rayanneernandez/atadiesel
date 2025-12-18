import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter, Link } from 'expo-router';

export default function PedidosScreen() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const handleOpenModal = (order: any) => {
    setSelectedOrder(order);
    setModalVisible(true);
  };

  const orders = [
    {
      id: 'ORD-001',
      date: '15/12/2024',
      status: 'Concluído',
      type: 'Entrega',
      typeIcon: 'truck-delivery-outline',
      typeColor: '#E3F2FD',
      typeTextColor: '#1976D2',
      items: [
        { name: '12x Cerveja Heineken 350ml', price: 'R$ 54.00' },
        { name: '6x Água Mineral 500ml', price: 'R$ 12.00' },
      ],
      total: 'R$ 66.00',
    },
    {
      id: 'ORD-002',
      date: '14/12/2024',
      status: 'Concluído',
      type: 'Retirada na Loja',
      typeIcon: 'store-outline',
      typeColor: '#E8F5E9',
      typeTextColor: '#2E7D32',
      items: [
        { name: '2x Óleo Motor Castrol 5W30', price: 'R$ 90.00' },
      ],
      total: 'R$ 90.00',
    },
    {
      id: 'ORD-003',
      date: '12/12/2024',
      status: 'Concluído',
      type: 'Loja Autônoma',
      typeIcon: 'cube-outline',
      typeColor: '#F3E5F5',
      typeTextColor: '#7B1FA2',
      items: [
        { name: '1x Café Pilão 500g', price: 'R$ 18.90' },
        { name: '2x Coca-Cola 2L', price: 'R$ 17.00' },
      ],
      total: 'R$ 35.90',
    },
    {
      id: 'ORD-004',
      date: '10/12/2024',
      status: 'Concluído',
      type: 'Resgate',
      typeIcon: 'gift-outline',
      typeColor: '#FFF3E0',
      typeTextColor: '#E65100',
      items: [
        { name: '1x Boné Exclusivo', price: '0 pts' },
      ],
      total: '0 pts',
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <MaterialCommunityIcons name="arrow-left" size={28} color="#fff" />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerTitle}>Meus Pedidos</Text>
            <Text style={styles.headerSubtitle}>Histórico de compras</Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        {orders.map((order, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.cardHeader}>
              <View>
                <Text style={styles.orderId}>Pedido {order.id}</Text>
                <Text style={styles.orderDate}>{order.date}</Text>
                <View style={styles.statusRow}>
                  <View style={styles.statusDot} />
                  <Text style={styles.statusText}>{order.status}</Text>
                </View>
              </View>
              <View style={[styles.typeBadge, { backgroundColor: order.typeColor }]}>
                <MaterialCommunityIcons name={order.typeIcon as any} size={16} color={order.typeTextColor} style={{ marginRight: 4 }} />
                <Text style={[styles.typeText, { color: order.typeTextColor }]}>{order.type}</Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.itemsList}>
              {order.items.map((item, idx) => (
                <View key={idx} style={styles.itemRow}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemPrice}>{item.price}</Text>
                </View>
              ))}
            </View>

            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>{order.total}</Text>
            </View>

            <TouchableOpacity style={styles.detailsButton} onPress={() => handleOpenModal(order)}>
              <Text style={styles.detailsButtonText}>Ver Detalhes</Text>
              <MaterialCommunityIcons name="chevron-right" size={20} color="#546E7A" />
            </TouchableOpacity>
          </View>
        ))}
        <View style={{ height: 20 }} />
      </ScrollView>

      {/* Modal de Detalhes */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Detalhes do Pedido</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <MaterialCommunityIcons name="close" size={24} color="#546E7A" />
              </TouchableOpacity>
            </View>

            {selectedOrder && (
              <ScrollView style={styles.modalBody}>
                <View style={styles.modalSection}>
                  <Text style={styles.modalLabel}>ID do Pedido</Text>
                  <Text style={styles.modalValue}>{selectedOrder.id}</Text>
                </View>

                <View style={styles.modalSection}>
                  <Text style={styles.modalLabel}>Data</Text>
                  <Text style={styles.modalValue}>{selectedOrder.date}</Text>
                </View>

                <View style={styles.modalSection}>
                  <Text style={styles.modalLabel}>Status</Text>
                  <View style={styles.statusRow}>
                    <View style={styles.statusDot} />
                    <Text style={styles.statusText}>{selectedOrder.status}</Text>
                  </View>
                </View>

                 <View style={styles.modalSection}>
                  <Text style={styles.modalLabel}>Tipo de Entrega</Text>
                   <View style={[styles.typeBadge, { backgroundColor: selectedOrder.typeColor, alignSelf: 'flex-start', marginTop: 4 }]}>
                    <MaterialCommunityIcons name={selectedOrder.typeIcon as any} size={16} color={selectedOrder.typeTextColor} style={{ marginRight: 4 }} />
                    <Text style={[styles.typeText, { color: selectedOrder.typeTextColor }]}>{selectedOrder.type}</Text>
                  </View>
                </View>

                <View style={styles.divider} />

                <Text style={styles.modalSectionTitle}>Itens do Pedido</Text>
                {selectedOrder.items.map((item: any, idx: number) => (
                  <View key={idx} style={styles.itemRow}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemPrice}>{item.price}</Text>
                  </View>
                ))}

                <View style={styles.divider} />

                <View style={styles.totalRow}>
                  <Text style={styles.totalLabel}>Total Pago</Text>
                  <Text style={styles.totalValue}>{selectedOrder.total}</Text>
                </View>

                <TouchableOpacity style={styles.closeModalButton} onPress={() => setModalVisible(false)}>
                  <Text style={styles.closeModalButtonText}>Fechar</Text>
                </TouchableOpacity>
              </ScrollView>
            )}
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
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
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
  orderId: {
    fontSize: 14,
    color: '#546E7A',
    fontWeight: '500',
    marginBottom: 4,
  },
  orderDate: {
    fontSize: 12,
    color: '#90A4AE',
    marginBottom: 8,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00C853',
    marginRight: 6,
  },
  statusText: {
    fontSize: 14,
    color: '#00C853',
    fontWeight: '500',
  },
  typeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
  },
  typeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#F5F5F5',
    marginBottom: 16,
  },
  itemsList: {
    marginBottom: 16,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  itemName: {
    fontSize: 14,
    color: '#546E7A',
    flex: 1,
    marginRight: 16,
  },
  itemPrice: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  totalValue: {
    fontSize: 18,
    color: '#C62828',
    fontWeight: 'bold',
  },
  detailsButton: {
    backgroundColor: '#FAFAFA',
    borderRadius: 8,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailsButtonText: {
    fontSize: 14,
    color: '#546E7A',
    fontWeight: '500',
    marginRight: 4,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    maxHeight: '80%',
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  modalBody: {
    width: '100%',
  },
  modalSection: {
    marginBottom: 16,
  },
  modalLabel: {
    fontSize: 12,
    color: '#90A4AE',
    marginBottom: 4,
  },
  modalValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  modalSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
    marginTop: 8,
  },
  closeModalButton: {
    backgroundColor: '#0D47A1',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 20,
  },
  closeModalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});