import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Modal, TextInput, Alert, ScrollView } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

// Mock Data for Users
const MOCK_USERS = [
  { id: '1', name: 'João Silva', email: 'joao.silva@email.com', phone: '(11) 99999-1234', role: 'Administrador', active: true },
  { id: '2', name: 'Maria Oliveira', email: 'maria.oli@email.com', phone: '(11) 98888-5678', role: 'Cliente', active: true },

];

export default function Usuarios() {
  const router = useRouter();
  const [users, setUsers] = useState(MOCK_USERS);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  // Edit Form State
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editRole, setEditRole] = useState('');

  const handleUserClick = (user: any) => {
    setSelectedUser(user);
    setEditName(user.name);
    setEditEmail(user.email);
    setEditPhone(user.phone);
    setEditRole(user.role);
    setModalVisible(true);
  };

  const handleSave = () => {
    // Here you would typically make an API call to update the user
    const updatedUsers = users.map(u => 
      u.id === selectedUser.id 
        ? { ...u, name: editName, email: editEmail, phone: editPhone, role: editRole }
        : u
    );
    setUsers(updatedUsers);
    setModalVisible(false);
    Alert.alert('Sucesso', 'Dados do usuário atualizados!');
  };

  const handleDelete = () => {
    Alert.alert(
      "Confirmar Exclusão",
      "Tem certeza que deseja excluir este usuário?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Excluir", 
          style: "destructive",
          onPress: () => {
            const filteredUsers = users.filter(u => u.id !== selectedUser.id);
            setUsers(filteredUsers);
            setModalVisible(false);
          }
        }
      ]
    );
  };

  const renderUserItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.userCard} onPress={() => handleUserClick(item)}>
      <View style={styles.avatarContainer}>
        <View style={[styles.avatar, { backgroundColor: item.active ? '#E8F5E9' : '#FFEBEE' }]}>
           <Text style={[styles.avatarText, { color: item.active ? '#2E7D32' : '#C62828' }]}>
             {item.name.charAt(0).toUpperCase()}
           </Text>
        </View>
      </View>
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.name}</Text>
        <Text style={styles.userEmail}>{item.email}</Text>
        <View style={styles.roleContainer}>
          <Text style={styles.userRole}>{item.role}</Text>
          <View style={[styles.statusDot, { backgroundColor: item.active ? '#4CAF50' : '#F44336' }]} />
        </View>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#CCC" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
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

      <View style={styles.content}>
        <View style={styles.pageHeader}>
           <Text style={styles.headerTitle}>Gestão de Usuários</Text>
        </View>

        <FlatList
          data={users}
          keyExtractor={(item) => item.id}
          renderItem={renderUserItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </View>

      {/* User Detail Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Detalhes do Usuário</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>
            
            {selectedUser && (
              <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
                {/* User Header Info */}
                <View style={styles.detailHeader}>
                   <View style={[styles.detailAvatar, { backgroundColor: selectedUser.active ? '#E8F5E9' : '#FFEBEE' }]}>
                      <Text style={[styles.detailAvatarText, { color: selectedUser.active ? '#2E7D32' : '#C62828' }]}>
                        {selectedUser.name.charAt(0).toUpperCase()}
                      </Text>
                   </View>
                   <View style={styles.detailTitleBlock}>
                      <Text style={styles.detailName}>{selectedUser.name}</Text>
                      <View style={styles.detailRoleBadge}>
                        <Text style={styles.detailRoleText}>{selectedUser.role}</Text>
                      </View>
                   </View>
                </View>

                {/* Info Cards */}
                <View style={styles.infoSection}>
                  <Text style={styles.sectionLabel}>Informações de Contato</Text>
                  
                  <View style={styles.infoRow}>
                    <Ionicons name="mail-outline" size={20} color="#666" style={styles.infoIcon} />
                    <View>
                      <Text style={styles.infoLabel}>Email</Text>
                      <Text style={styles.infoValue}>{selectedUser.email}</Text>
                    </View>
                  </View>

                  <View style={styles.infoRow}>
                    <Ionicons name="call-outline" size={20} color="#666" style={styles.infoIcon} />
                    <View>
                      <Text style={styles.infoLabel}>Telefone</Text>
                      <Text style={styles.infoValue}>{selectedUser.phone}</Text>
                    </View>
                  </View>
                </View>

                {/* Stats Section */}
                <View style={styles.statsSection}>
                  <Text style={styles.sectionLabel}>Estatísticas de Atividade</Text>
                  
                  <View style={styles.statsGrid}>
                    <View style={styles.statBox}>
                      <Text style={styles.statNumber}>{selectedUser.totalVisits}</Text>
                      <Text style={styles.statDescription}>Visitas à Loja</Text>
                    </View>
                    <View style={styles.statBox}>
                       <Text style={styles.statNumber}>{selectedUser.totalSpent}</Text>
                       <Text style={styles.statDescription}>Total Gasto</Text>
                    </View>
                  </View>

                  <View style={styles.lastVisitBox}>
                     <MaterialCommunityIcons name="calendar-clock" size={20} color="#1A237E" />
                     <Text style={styles.lastVisitText}>
                        Última Compra: <Text style={{fontWeight: 'bold'}}>{selectedUser.lastPurchase}</Text>
                     </Text>
                  </View>
                </View>

              </ScrollView>
            )}
          </View>
        </View>
      </Modal>

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

        <TouchableOpacity style={styles.menuItem}>
          <MaterialCommunityIcons name="account-group" size={24} color="#C62828" />
          <Text style={styles.menuTextActive}>Usuários</Text>
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  pageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A237E',
  },
  addButton: {
    backgroundColor: '#1A237E',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  listContent: {
    paddingBottom: 20,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  avatarContainer: {
    marginRight: 16,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  roleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userRole: {
    fontSize: 12,
    color: '#1A237E',
    backgroundColor: '#E8EAF6',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    overflow: 'hidden',
    marginRight: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '80%',
    padding: 24,
    paddingBottom: 40,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  modalBody: {
    // flex: 1 removed to allow auto-height
  },
  detailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  detailAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  detailAvatarText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  detailTitleBlock: {
    flex: 1,
  },
  detailName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  detailRoleBadge: {
    backgroundColor: '#E8EAF6',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  detailRoleText: {
    color: '#1A237E',
    fontSize: 12,
    fontWeight: '600',
  },
  infoSection: {
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A237E',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#F9FAFB',
    padding: 12,
    borderRadius: 8,
  },
  infoIcon: {
    marginRight: 16,
    width: 24,
  },
  infoLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 15,
    color: '#333',
    fontWeight: '500',
  },
  statsSection: {
    marginBottom: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A237E',
    marginBottom: 4,
  },
  statDescription: {
    fontSize: 12,
    color: '#666',
  },
  lastVisitBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8EAF6',
    padding: 12,
    borderRadius: 8,
    justifyContent: 'center',
    gap: 8,
  },
  lastVisitText: {
    color: '#1A237E',
    fontSize: 14,
  },

  // Bottom Menu
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