import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, Link } from 'expo-router';

const { width } = Dimensions.get('window');

export default function PerfilScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header Personalizado */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Icon name="arrow-left" size={28} color="#fff" />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerTitle}>Perfil</Text>
            <Text style={styles.headerSubtitle}>Gerencie sua conta</Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        
        {/* Card de Perfil */}
        <View style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarText}>J</Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.userName}>João Silva</Text>
              <Text style={styles.userEmail}>joao.silva@email.com</Text>
              <Text style={styles.userPhone}>(11) 99999-9999</Text>
              <Text style={styles.memberSince}>Membro desde Janeiro 2024</Text>
            </View>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <View style={[styles.statIconCircle, { backgroundColor: '#E3F2FD' }]}>
                <Icon name="shopping-outline" size={24} color="#1976D2" />
              </View>
              <Text style={styles.statValue}>42</Text>
              <Text style={styles.statLabel}>Compras</Text>
            </View>

            <View style={styles.statItem}>
              <View style={[styles.statIconCircle, { backgroundColor: '#FFEBEE' }]}>
                <Icon name="star-outline" size={24} color="#C62828" />
              </View>
              <Text style={styles.statValue}>1250</Text>
              <Text style={styles.statLabel}>Pontos</Text>
            </View>

            <View style={styles.statItem}>
              <View style={[styles.statIconCircle, { backgroundColor: '#E3F2FD' }]}>
                <Icon name="medal-outline" size={24} color="#1976D2" />
              </View>
              <Text style={styles.statValue}>Ouro</Text>
              <Text style={styles.statLabel}>Nível</Text>
            </View>
          </View>
        </View>

        {/* Menu Lista */}
        <View style={styles.menuList}>
          {/* @ts-ignore */}
          <Link href="/(tabs)/pedidos" asChild>
            <TouchableOpacity style={styles.menuListItem}>
              <View style={styles.menuListLeft}>
                <Icon name="package-variant-closed" size={24} color="#0D47A1" />
                <Text style={styles.menuListText}>Meus Pedidos</Text>
              </View>
              <Icon name="chevron-right" size={24} color="#B0BEC5" />
            </TouchableOpacity>
          </Link>
          <View style={styles.divider} />

          {/* @ts-ignore */}
          <Link href="/(tabs)/pagamento" asChild>
            <TouchableOpacity style={styles.menuListItem}>
              <View style={styles.menuListLeft}>
                <Icon name="credit-card-outline" size={24} color="#0D47A1" />
                <Text style={styles.menuListText}>Formas de Pagamento</Text>
              </View>
              <Icon name="chevron-right" size={24} color="#B0BEC5" />
            </TouchableOpacity>
          </Link>
          <View style={styles.divider} />

          <Link href="/(tabs)/fidelidade" asChild>
            <TouchableOpacity style={styles.menuListItem}>
              <View style={styles.menuListLeft}>
                <Icon name="star-outline" size={24} color="#C62828" />
                <Text style={styles.menuListText}>Programa de Fidelidade</Text>
              </View>
              <Icon name="chevron-right" size={24} color="#B0BEC5" />
            </TouchableOpacity>
          </Link>
          <View style={styles.divider} />

          {/* @ts-ignore */}
          <Link href="/(tabs)/configuracao" asChild>
            <TouchableOpacity style={styles.menuListItem}>
              <View style={styles.menuListLeft}>
                <Icon name="cog-outline" size={24} color="#546E7A" />
                <Text style={styles.menuListText}>Configurações</Text>
              </View>
              <Icon name="chevron-right" size={24} color="#B0BEC5" />
            </TouchableOpacity>
          </Link>
        </View>

        {/* Banner Cliente Ouro */}
        <View style={styles.loyaltyBanner}>
          <View style={styles.loyaltyHeader}>
            <Icon name="medal-outline" size={28} color="#fff" />
            <Text style={styles.loyaltyTitle}>Cliente Ouro</Text>
          </View>
          <Text style={styles.loyaltyPoints}>1250 pontos acumulados</Text>
          <Text style={styles.loyaltyDesc}>
            Continue comprando para manter seu nível e ganhar mais benefícios!
          </Text>
        </View>

        {/* Botão Sair */}
        <Link href="/(tabs)/login" asChild>
          <TouchableOpacity style={styles.logoutButton}>
            <Icon name="logout" size={20} color="#C62828" style={{ marginRight: 8 }} />
            <Text style={styles.logoutText}>Sair da Conta</Text>
          </TouchableOpacity>
        </Link>

        <View style={{height: 20}} />
      </ScrollView>

      {/* Menu Inferior */}
      <View style={styles.bottomMenu}>
        <Link href="/" asChild>
          <TouchableOpacity style={styles.menuItem}>
            <Icon name="home" size={26} color="#777" />
            <Text style={styles.menuText}>Inicio</Text>
          </TouchableOpacity>
        </Link>
        <Link href="/(tabs)/produtos" asChild>
          <TouchableOpacity style={styles.menuItem}>
            <Icon name="store" size={26} color="#777" />
            <Text style={styles.menuText}>Produto</Text>
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
        <TouchableOpacity style={styles.menuItem}>
          <Icon name="account" size={26} color="#C62828" />
          <Text style={styles.menuTextActive}>Perfil</Text>
        </TouchableOpacity>
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
    paddingBottom: 20, // Reduced significantly
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
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginTop: 20, // No overlap, positive margin
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#0D47A1',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  avatarText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 14,
    color: '#546E7A',
    marginBottom: 2,
  },
  userPhone: {
    fontSize: 14,
    color: '#546E7A',
    marginBottom: 6,
  },
  memberSince: {
    fontSize: 12,
    color: '#90A4AE',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#FAFAFA',
    borderRadius: 12,
    paddingVertical: 12,
    marginHorizontal: 4,
  },
  statIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 12,
    color: '#78909C',
  },
  menuList: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 20,
    paddingVertical: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  menuListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  menuListLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuListText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#F5F5F5',
    marginHorizontal: 20,
  },
  loyaltyBanner: {
    backgroundColor: '#0D47A1',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  loyaltyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  loyaltyTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  loyaltyPoints: {
    color: '#E3F2FD',
    fontSize: 14,
    marginBottom: 12,
  },
  loyaltyDesc: {
    color: '#fff',
    fontSize: 14,
    lineHeight: 20,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#FFCDD2',
    borderRadius: 12,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  logoutText: {
    color: '#C62828',
    fontSize: 16,
    fontWeight: '500',
  },
  bottomMenu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fff',
  },
  menuItem: {
    alignItems: 'center',
  },
  menuText: {
    fontSize: 12,
    color: '#777',
    marginTop: 4,
  },
  menuTextActive: {
    fontSize: 12,
    color: '#C62828',
    marginTop: 4,
    fontWeight: 'bold',
  },
});