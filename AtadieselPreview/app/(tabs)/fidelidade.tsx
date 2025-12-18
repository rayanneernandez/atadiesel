import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';

const { width } = Dimensions.get('window');
const cardWidth = (width - 48) / 2;

export default function Fidelidade() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Icon name="arrow-left" size={24} color="#fff" />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerTitle}>Programa de Fidelidade</Text>
            <Text style={styles.headerSubtitle}>Ganhe pontos e troque por prêmios</Text>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Points Card */}
        <View style={styles.pointsCard}>
          <View style={styles.pointsHeader}>
            <View>
              <Text style={styles.pointsLabel}>Seus Pontos</Text>
              <Text style={styles.pointsValue}>0</Text>
            </View>
            <View style={styles.badgeContainer}>
              {/* Fita da medalha */}
              <View style={styles.ribbonContainer}>
                 <Icon name="bookmark" size={40} color="#448AFF" style={styles.ribbonIcon} />
              </View>
              {/* Corpo da medalha */}
              <View style={styles.medalBody}>
                <View style={styles.medalInnerRing}>
                   <Text style={styles.medalNumber}>3</Text>
                </View>
              </View>
            </View>
          </View>
          
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: '0%' }]} />
          </View>
          <Text style={styles.pointsRemaining}>Faltam 500 pontos para prata</Text>
        </View>

        {/* Levels */}
        <Text style={styles.sectionTitle}>Níveis de Fidelidade</Text>
        
        <View style={[styles.levelCard, styles.levelCardActive]}>
          <View style={[styles.levelIcon, { backgroundColor: '#FBE9E7' }]}>
             <Icon name="medal" size={24} color="#D84315" />
          </View>
          <View style={styles.levelInfo}>
            <Text style={styles.levelName}>Bronze</Text>
            <Text style={styles.levelRange}>0 - 499 pontos</Text>
          </View>
          <View style={styles.currentBadge}>
            <Text style={styles.currentText}>Atual</Text>
          </View>
        </View>

        <View style={styles.levelCard}>
          <View style={[styles.levelIcon, { backgroundColor: '#E3F2FD' }]}>
             <Icon name="medal" size={24} color="#1565C0" />
          </View>
          <View style={styles.levelInfo}>
            <Text style={styles.levelName}>Prata</Text>
            <Text style={styles.levelRange}>500 - 999 pontos</Text>
          </View>
        </View>

        <View style={styles.levelCard}>
          <View style={[styles.levelIcon, { backgroundColor: '#FFF8E1' }]}>
             <Icon name="medal" size={24} color="#FBC02D" />
          </View>
          <View style={styles.levelInfo}>
            <Text style={styles.levelName}>Ouro</Text>
            <Text style={styles.levelRange}>1000 - ∞ pontos</Text>
          </View>
        </View>

        {/* How to Earn */}
        <View style={styles.whiteCard}>
           <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 15}}>
             <Icon name="trending-up" size={20} color="#004AAD" />
             <Text style={[styles.cardTitle, {marginLeft: 10}]}>Como Ganhar Pontos</Text>
           </View>
           
           <View style={styles.earnRow}>
             <Text style={styles.earnText}>Compra de R$ 10</Text>
             <Text style={styles.earnPoints}>+10 pontos</Text>
           </View>
           <View style={styles.earnRow}>
             <Text style={styles.earnText}>Loja Autônoma</Text>
             <Text style={styles.earnPoints}>+5 pontos extras</Text>
           </View>
           <View style={[styles.earnRow, { borderBottomWidth: 0 }]}>
             <Text style={styles.earnText}>Indicar um amigo</Text>
             <Text style={styles.earnPoints}>+50 pontos</Text>
           </View>
        </View>

        {/* Rewards */}
        <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 24, marginBottom: 12}}>
             <Icon name="gift-outline" size={20} color="#C62828" />
             <Text style={[styles.sectionTitle, {marginBottom: 0, marginLeft: 10}]}>Recompensas Disponíveis</Text>
        </View>

        <View style={styles.rewardsGrid}>
           {/* Reward Item 1 */}
           <View style={styles.rewardCard}>
             <Image source={{ uri: 'https://via.placeholder.com/300x200.png?text=Agua' }} style={styles.rewardImage} />
             <View style={styles.rewardBody}>
               <Text style={styles.rewardName}>Água Mineral 500ml</Text>
               <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 6, marginBottom: 10}}>
                 <Icon name="star" size={14} color="#C62828" />
                 <Text style={styles.rewardPoints}>50 pts</Text>
               </View>
               <TouchableOpacity style={styles.redeemBtn}>
                 <Text style={styles.redeemText}>Resgatar</Text>
               </TouchableOpacity>
             </View>
           </View>

           {/* Reward Item 2 */}
           <View style={styles.rewardCard}>
             <Image source={{ uri: 'https://via.placeholder.com/300x200.png?text=Cafe' }} style={styles.rewardImage} />
             <View style={styles.rewardBody}>
               <Text style={styles.rewardName}>Café Espresso</Text>
               <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 6, marginBottom: 10}}>
                 <Icon name="star" size={14} color="#C62828" />
                 <Text style={styles.rewardPoints}>100 pts</Text>
               </View>
               <TouchableOpacity style={styles.redeemBtn}>
                 <Text style={styles.redeemText}>Resgatar</Text>
               </TouchableOpacity>
             </View>
           </View>
           
           {/* Reward Item 3 */}
           <View style={styles.rewardCard}>
             <Image source={{ uri: 'https://via.placeholder.com/300x200.png?text=Cerveja' }} style={styles.rewardImage} />
             <View style={styles.rewardBody}>
               <Text style={styles.rewardName}>Cerveja Premium</Text>
               <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 6, marginBottom: 10}}>
                 <Icon name="star" size={14} color="#C62828" />
                 <Text style={styles.rewardPoints}>150 pts</Text>
               </View>
               <TouchableOpacity style={styles.redeemBtn}>
                 <Text style={styles.redeemText}>Resgatar</Text>
               </TouchableOpacity>
             </View>
           </View>

           {/* Reward Item 4 */}
           <View style={styles.rewardCard}>
             <Image source={{ uri: 'https://via.placeholder.com/300x200.png?text=Oleo' }} style={styles.rewardImage} />
             <View style={styles.rewardBody}>
               <Text style={styles.rewardName}>Óleo Motor</Text>
               <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 6, marginBottom: 10}}>
                 <Icon name="star" size={14} color="#C62828" />
                 <Text style={styles.rewardPoints}>500 pts</Text>
               </View>
               <TouchableOpacity style={styles.redeemBtn}>
                 <Text style={styles.redeemText}>Resgatar</Text>
               </TouchableOpacity>
             </View>
           </View>
        </View>

        {/* Benefits */}
        <View style={styles.benefitsCard}>
           <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
             <Icon name="certificate-outline" size={24} color="#fff" />
             <Text style={styles.benefitsTitle}>Benefícios Exclusivos</Text>
           </View>
           <View style={styles.benefitRow}>
             <View style={styles.bullet} />
             <Text style={styles.benefitText}>Desconto em todas as compras</Text>
           </View>
           <View style={styles.benefitRow}>
             <View style={styles.bullet} />
             <Text style={styles.benefitText}>Acesso antecipado a promoções</Text>
           </View>
           <View style={styles.benefitRow}>
             <View style={styles.bullet} />
             <Text style={styles.benefitText}>Pontos em dobro em datas especiais</Text>
           </View>
           <View style={[styles.benefitRow, { marginBottom: 0 }]}>
             <View style={styles.bullet} />
             <Text style={styles.benefitText}>Brindes exclusivos</Text>
           </View>
        </View>

      </ScrollView>

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
        <Link href="/(tabs)/autonomia" asChild>
          <TouchableOpacity style={styles.menuItem}>
            <Icon name="qrcode-scan" size={26} color="#777" />
            <Text style={styles.menuText}>Autônoma</Text>
          </TouchableOpacity>
        </Link>
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
  container: { flex: 1, backgroundColor: '#F5F7FA' },
  header: { backgroundColor: '#546E7A', padding: 20, paddingBottom: 50, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
  headerTop: { flexDirection: 'row', alignItems: 'center' },
  backBtn: { marginRight: 16 },
  headerTitle: { color: '#fff', fontSize: 20, fontWeight: '700' },
  headerSubtitle: { color: '#B0BEC5', fontSize: 14, marginTop: 4 },
  
  content: { paddingHorizontal: 16, paddingBottom: 100, marginTop: 20 },
  
  pointsCard: { backgroundColor: '#455A64', borderRadius: 20, padding: 20, marginBottom: 24, elevation: 5 },
  pointsHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 },
  pointsLabel: { color: '#B0BEC5', fontSize: 14, marginBottom: 4 },
  pointsValue: { color: '#fff', fontSize: 42, fontWeight: '700' },
  
  badgeContainer: { alignItems: 'center', justifyContent: 'center', height: 80, width: 70 },
  ribbonContainer: { position: 'absolute', top: -12, zIndex: 0 },
  ribbonIcon: { transform: [{ rotate: '180deg' }, { scaleX: 1.2 }, { scaleY: 0.8 }] }, // Fita mais larga e curta
  
  medalBody: { 
    width: 54, height: 54, borderRadius: 27, 
    backgroundColor: '#A1887F', // Bronze anel externo
    alignItems: 'center', justifyContent: 'center',
    marginTop: 4,
    elevation: 4,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 3,
  },
  medalInnerRing: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: '#8D6E63', // Bronze miolo
    alignItems: 'center', justifyContent: 'center',
  },
  medalNumber: { color: '#3E2723', fontWeight: 'bold', fontSize: 22 },
  
  progressBarBg: { height: 8, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 4, marginBottom: 10 },
  progressBarFill: { height: '100%', backgroundColor: '#fff', borderRadius: 4 },
  pointsRemaining: { color: '#B0BEC5', fontSize: 12 },

  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#333', marginBottom: 12 },
  
  levelCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 16, borderRadius: 16, marginBottom: 12, elevation: 1 },
  levelCardActive: { borderWidth: 1, borderColor: '#C62828', elevation: 3 },
  levelIcon: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  levelInfo: { flex: 1 },
  levelName: { fontSize: 16, fontWeight: '700', color: '#333' },
  levelRange: { fontSize: 12, color: '#777', marginTop: 2 },
  currentBadge: { backgroundColor: '#C62828', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  currentText: { color: '#fff', fontSize: 10, fontWeight: '700' },

  whiteCard: { backgroundColor: '#fff', borderRadius: 16, padding: 20, marginTop: 12, elevation: 2 },
  cardTitle: { fontSize: 16, fontWeight: '700', color: '#333' },
  earnRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderColor: '#f0f0f0' },
  earnText: { color: '#555', fontSize: 14 },
  earnPoints: { color: '#C62828', fontWeight: '700', fontSize: 14 },

  rewardsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  rewardCard: { width: cardWidth, backgroundColor: '#fff', borderRadius: 16, overflow: 'hidden', elevation: 2, marginBottom: 4 },
  rewardImage: { width: '100%', height: 100, backgroundColor: '#eee' },
  rewardBody: { padding: 12 },
  rewardName: { fontSize: 14, fontWeight: '600', color: '#333' },
  rewardPoints: { fontSize: 12, color: '#C62828', fontWeight: '700', marginLeft: 4 },
  redeemBtn: { backgroundColor: '#C62828', paddingVertical: 8, borderRadius: 8, alignItems: 'center' },
  redeemText: { color: '#fff', fontWeight: '700', fontSize: 12 },

  benefitsCard: { backgroundColor: '#004AAD', borderRadius: 20, padding: 20, marginTop: 24, elevation: 4 },
  benefitsTitle: { color: '#fff', fontSize: 18, fontWeight: '700', marginLeft: 10 },
  benefitRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  bullet: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#fff', marginRight: 10 },
  benefitText: { color: '#fff', fontSize: 14 },

  bottomMenu: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 10, borderTopWidth: 1, borderColor: '#eee', backgroundColor: '#fff', position: 'absolute', bottom: 0, left: 0, right: 0 },
  menuItem: { alignItems: 'center' },
  menuText: { fontSize: 12, color: '#777' },
});