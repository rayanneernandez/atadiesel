import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, ScrollView, Modal, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

export default function PerfilAdmin() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Mock Password for validation
  const MOCK_CURRENT_PASSWORD = '123';

  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Erro', 'As novas senhas não coincidem.');
      return;
    }

    // Validação estrita da senha atual
    if (currentPassword !== MOCK_CURRENT_PASSWORD) {
      Alert.alert('Acesso Negado', 'A senha atual está incorreta. Não é possível alterar a senha.');
      return;
    }

    Alert.alert(
      'Segurança',
      'Para concluir a alteração, enviamos um link de confirmação para admin@atadiesel.com.br. Verifique seu email.',
      [
        { 
          text: 'Entendi', 
          onPress: () => {
            setModalVisible(false);
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
          }
        }
      ]
    );
  };

  const handleLogout = () => {
    Alert.alert(
      "Sair da Conta",
      "Tem certeza que deseja sair?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Sair", 
          style: "destructive",
          onPress: () => router.replace('/login') 
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerTitle}>Meu Perfil</Text>
            <Text style={styles.headerSubtitle}>Administrador</Text>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>AD</Text>
            </View>
            <View style={styles.onlineBadge} />
          </View>
          
          <Text style={styles.adminName}>Admin Principal</Text>
          <Text style={styles.adminEmail}>admin@atadiesel.com.br</Text>
          
          <View style={styles.roleBadge}>
            <MaterialCommunityIcons name="shield-check" size={16} color="#1565C0" />
            <Text style={styles.roleText}>Acesso Total</Text>
          </View>
        </View>

        {/* Info Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informações da Conta</Text>
          
          <View style={styles.infoRow}>
            <View style={styles.iconBox}>
              <MaterialCommunityIcons name="identifier" size={20} color="#555" />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>ID do Usuário</Text>
              <Text style={styles.infoValue}>#ADM-001</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.iconBox}>
              <MaterialCommunityIcons name="office-building" size={20} color="#555" />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Departamento</Text>
              <Text style={styles.infoValue}>Gerência Geral</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.iconBox}>
              <MaterialCommunityIcons name="clock-outline" size={20} color="#555" />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Último Acesso</Text>
              <Text style={styles.infoValue}>Hoje, 08:30</Text>
            </View>
          </View>
        </View>

        {/* Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Segurança</Text>
          
          <TouchableOpacity style={styles.settingRow} onPress={() => setModalVisible(true)}>
            <View style={styles.settingLeft}>
              <MaterialCommunityIcons name="lock-reset" size={22} color="#333" />
              <Text style={styles.settingText}>Alterar Senha</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#CCC" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <MaterialCommunityIcons name="shield-account" size={22} color="#333" />
              <Text style={styles.settingText}>Autenticação em 2 Fatores</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#CCC" />
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <MaterialCommunityIcons name="logout" size={20} color="#C62828" />
          <Text style={styles.logoutText}>Sair do Sistema</Text>
        </TouchableOpacity>

        <Text style={styles.versionText}>Versão 1.0.0 (Build 2025)</Text>

      </ScrollView>

      {/* Bottom Menu (Visual Only for Consistency) */}
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

        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => router.push('/entregas')}
        >
          <MaterialCommunityIcons name="truck-delivery" size={24} color="#777" />
          <Text style={styles.menuText}>Entregas</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.modalOverlay}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Alterar Senha</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color="#555" />
              </TouchableOpacity>
            </View>
            
            <Text style={styles.modalDescription}>
              Para sua segurança, é necessário informar sua senha atual antes de definir uma nova.
            </Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Senha Atual</Text>
              <TextInput
                style={styles.input}
                secureTextEntry
                value={currentPassword}
                onChangeText={setCurrentPassword}
                placeholder="Digite sua senha atual"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nova Senha</Text>
              <TextInput
                style={styles.input}
                secureTextEntry
                value={newPassword}
                onChangeText={setNewPassword}
                placeholder="Digite a nova senha"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Confirmar Nova Senha</Text>
              <TextInput
                style={styles.input}
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirme a nova senha"
              />
            </View>

            <TouchableOpacity style={styles.saveButton} onPress={handleChangePassword}>
              <Text style={styles.saveButtonText}>Atualizar Senha</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    minHeight: 450,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  modalDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 24,
    lineHeight: 20,
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
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#004AAD',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    backgroundColor: '#004AAD',
    padding: 20,
    paddingBottom: 24,
    borderBottomLeftRadius: 26,
    borderBottomRightRadius: 26,
    elevation: 4,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 16,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#E0E0E0',
    marginTop: 2,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  avatarContainer: {
    marginBottom: 16,
    position: 'relative',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E3F2FD',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#fff',
    elevation: 4,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#004AAD',
  },
  onlineBadge: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#00C853',
    borderWidth: 2,
    borderColor: '#fff',
  },
  adminName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  adminEmail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  roleBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  roleText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1565C0',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    elevation: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#F5F7FA',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: '#777',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 15,
    color: '#333',
    fontWeight: '500',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F7FA',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingText: {
    fontSize: 15,
    color: '#333',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFEBEE',
    padding: 16,
    borderRadius: 12,
    gap: 8,
    marginBottom: 20,
  },
  logoutText: {
    color: '#C62828',
    fontSize: 16,
    fontWeight: 'bold',
  },
  versionText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 12,
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
});