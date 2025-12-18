import React, { useState } from 'react';
import { Link, useRouter } from 'expo-router';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { FontAwesome, MaterialIcons, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

type Period = 'Diário' | 'Semanal' | 'Mensal';

export default function DashboardAdmin() {
  const router = useRouter();
  const [period, setPeriod] = useState<Period>('Mensal');

  // Mock Data (Dados fictícios para visualização)
  const stats = {
    users: 1250,
    orders: 450,
    revenue: 'R$ 125.430,00',
    profit: 'R$ 32.500,00',
  };

  const topProducts = [
    { id: 1, name: 'Óleo Motor 5W30', sales: 120, revenue: 'R$ 4.800' },
    { id: 2, name: 'Filtro de Ar Esportivo', sales: 85, revenue: 'R$ 2.125' },
    { id: 3, name: 'Kit Pastilha de Freio', sales: 60, revenue: 'R$ 5.400' },
    { id: 4, name: 'Amortecedor Traseiro', sales: 45, revenue: 'R$ 11.250' },
  ];

  // Dados simulados para os gráficos
  const chartLabels: Record<Period, string[]> = {
    Diário: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
    Semanal: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'],
    Mensal: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
  };

  // Dados simulados para os gráficos (Valores em Reais)
  const chartData: Record<Period, number[]> = {
    Diário: [2500, 4800, 3200, 8500, 9900, 4300, 5000],
    Semanal: [15000, 22000, 18000, 25000],
    Mensal: [12000, 15000, 18000, 21000, 16000, 15000, 14000, 19000, 22000, 25000, 28000, 32000],
  };

  const currentChartData = chartData[period];
  const currentLabels = chartLabels[period];
  const maxDataValue = Math.max(...currentChartData);

  const formatCurrency = (value: number) => {
    if (value >= 1000) return `R$ ${(value / 1000).toFixed(1)}k`;
    return `R$ ${value}`;
  };

  // Componente visual simples para o gráfico de barras
  const renderChart = () => (
    <View style={styles.chartContainer}>
      <View style={styles.chartBars}>
        {currentChartData.map((value: number, index: number) => (
          <View key={index} style={styles.barWrapper}>
            <Text style={styles.barValue}>{formatCurrency(value)}</Text>
            <View style={[styles.bar, { height: (value / maxDataValue) * 150 }]} />
            <Text style={styles.barLabel}>{currentLabels[index]}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header Personalizado */}
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

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.headerTitle}>Dashboard Administrativo</Text>

        {/* Grid de Estatísticas (Cards) */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <View style={[styles.iconBg, { backgroundColor: '#E3F2FD' }]}>
              <FontAwesome name="users" size={20} color="#1E88E5" />
            </View>
            <Text style={styles.statValue}>{stats.users}</Text>
            <Text style={styles.statLabel}>Total Usuários</Text>
          </View>
          <View style={styles.statCard}>
            <View style={[styles.iconBg, { backgroundColor: '#E8F5E9' }]}>
              <FontAwesome name="shopping-bag" size={20} color="#43A047" />
            </View>
            <Text style={styles.statValue}>{stats.orders}</Text>
            <Text style={styles.statLabel}>Pedidos</Text>
          </View>
          <View style={styles.statCard}>
            <View style={[styles.iconBg, { backgroundColor: '#FFF3E0' }]}>
              <MaterialIcons name="attach-money" size={24} color="#FB8C00" />
            </View>
            <Text style={styles.statValue}>{stats.revenue}</Text>
            <Text style={styles.statLabel}>Faturamento</Text>
          </View>
          <View style={styles.statCard}>
            <View style={[styles.iconBg, { backgroundColor: '#F3E5F5' }]}>
              <Ionicons name="trending-up" size={24} color="#8E24AA" />
            </View>
            <Text style={styles.statValue}>{stats.profit}</Text>
            <Text style={styles.statLabel}>Lucro Est.</Text>
          </View>
        </View>

        {/* Seção de Gráficos de Desempenho */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Desempenho de Vendas</Text>
            <View style={styles.periodSelector}>
              {(['Diário', 'Semanal', 'Mensal'] as Period[]).map((p) => (
                <TouchableOpacity
                  key={p}
                  style={[styles.periodButton, period === p && styles.periodButtonActive]}
                  onPress={() => setPeriod(p)}
                >
                  <Text style={[styles.periodText, period === p && styles.periodTextActive]}>{p}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          {renderChart()}
        </View>

        {/* Seção de Produtos Mais Vendidos */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Produtos Mais Vendidos</Text>
          {topProducts.map((product) => (
            <View key={product.id} style={styles.productRow}>
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productSales}>{product.sales} vendas</Text>
              </View>
              <Text style={styles.productRevenue}>{product.revenue}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Menu Inferior Personalizado */}
      <View style={styles.bottomMenu}>
        <TouchableOpacity style={styles.menuItem}>
          <MaterialCommunityIcons name="view-dashboard" size={24} color="#C62828" />
          <Text style={styles.menuTextActive}>Dashboard</Text>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // Changed from #F5F7FA to match header
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
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#F5F7FA', // Restore background for content
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
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A237E',
    marginBottom: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    backgroundColor: '#fff',
    width: '48%', // Aproximadamente metade da tela menos o gap
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  iconBg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  sectionContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
  },
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: '#F5F7FA',
    borderRadius: 8,
    padding: 4,
  },
  periodButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  periodButtonActive: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  periodText: {
    fontSize: 12,
    color: '#666',
  },
  periodTextActive: {
    color: '#1A237E',
    fontWeight: '600',
  },
  chartContainer: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  chartBars: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    width: '100%',
    height: 150,
    gap: 8,
  },
  barWrapper: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  bar: {
    width: '60%', // Largura relativa da barra
    backgroundColor: '#1A237E',
    borderRadius: 4,
    minWidth: 4,
  },
  barValue: {
    fontSize: 10,
    color: '#666',
    marginBottom: 4,
  },
  barLabel: {
    fontSize: 10,
    color: '#999',
    marginTop: 4,
  },
  productRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  productSales: {
    fontSize: 12,
    color: '#666',
  },
  productRevenue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A237E',
  },
});