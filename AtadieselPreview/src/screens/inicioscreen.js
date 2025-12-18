// HomeScreen.js - React Native (Expo) estrutura inicial da tela
// Instale antes: npm install react-native-safe-area-context react-native-vector-icons

import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, useRouter } from 'expo-router';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

export default function HomeScreen() {
  const [active, setActive] = useState(0);
  const { width } = Dimensions.get('window');
  const router = useRouter();
  const scrollX = useRef(new Animated.Value(0)).current;
  const featured = [
    { title: 'AutoPeças Premium', subtitle: '20% OFF em todo catálogo', bg: '#C62828' },
    { title: 'Bebidas Geladas', subtitle: 'Promoção de Verão!', bg: '#004AAD' },
    { title: 'Café Fresquinho', subtitle: 'Compre 2, leve 3', bg: '#8D3F2E' },
    { title: 'Ofertas da Semana', subtitle: 'Descontos imperdíveis', bg: '#00695C' }
  ];
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* HEADER */}
        <View style={styles.header}>
          <View>
            <Image source={require('../../assets/images/atadiesel-logo-white.png')} style={styles.logo} />
            <Text style={styles.brandSubtitle}>Auto Peças</Text>
          </View>
          <Link href="/(tabs)/carrinho" asChild>
            <TouchableOpacity style={styles.cartBubble}>
              <Icon name="cart-outline" size={26} color="#fff" />
            </TouchableOpacity>
          </Link>
        </View>

        <Link href="/(tabs)/fidelidade" asChild>
          <TouchableOpacity style={styles.fidelityCard}>
            <View style={styles.fidelityIconWrap}>
              <Icon name="star-outline" size={24} color="#fff" />
            </View>
            <View style={styles.fidelityTextBox}>
              <Text style={styles.fidelityTitle}>Programa de Fidelidade</Text>
              <Text style={styles.fidelitySubtitle}>Acumule pontos e ganhe prêmios!</Text>
            </View>
            <View style={styles.fidelityChevron}>
              <Icon name="chevron-right" size={24} color="#fff" />
            </View>
          </TouchableOpacity>
        </Link>

        {/* Parceiros em destaque */}
        <Text style={styles.sectionTitle}>Parceiros em Destaque</Text>

        <View style={styles.carousel}>
          <Animated.ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} scrollEventThrottle={16} onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false })} onMomentumScrollEnd={(e) => { const index = Math.round(e.nativeEvent.contentOffset.x / width); setActive(index); }}>
            {featured.map((item, idx) => (
              <View key={idx} style={{ width }}>
                <View style={[styles.slide, { backgroundColor: item.bg }]}>
                  <View style={styles.slideTextBox}>
                    <Text style={styles.partnerTitle}>{item.title}</Text>
                    <Text style={styles.partnerSubtitle}>{item.subtitle}</Text>
                  </View>
                </View>
              </View>
            ))}
          </Animated.ScrollView>
          <View style={styles.dots}>
            {featured.map((_, idx) => {
              const inputRange = [(idx - 1) * width, idx * width, (idx + 1) * width];
              const dotWidth = scrollX.interpolate({ inputRange, outputRange: [8, 20, 8], extrapolate: 'clamp' });
              const opacity = scrollX.interpolate({ inputRange, outputRange: [0.6, 1, 0.6], extrapolate: 'clamp' });
              return (
                <Animated.View key={idx} style={[styles.dot, { width: dotWidth, opacity }]} />
              );
            })}
          </View>
        </View>

        {/* Promoções */}
        <View style={styles.rowBetween}>
          <Text style={styles.sectionTitle}>Promoções</Text>
          <Link href="/produtos">
            <Text style={styles.link}>Ver tudo</Text>
          </Link>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Link href={{ pathname: '/detalheproduto', params: { id: '2', title: 'Cerveja Lager 350ml', category: 'Bebidas', price: 'R$ 4.05', image: 'https://via.placeholder.com/300x200.png?text=Cerveja+Lager' } }} asChild>
            <TouchableOpacity style={styles.productCard}>
              <Image
                source={{ uri: "https://via.placeholder.com/300x200.png?text=Cerveja+Lager" }}
                style={styles.productImage}
              />
              <View style={styles.discountTag}><Text style={styles.discountText}>-10%</Text></View>
              <Text style={styles.productName}>Cerveja Lager 350ml</Text>
              <Text style={styles.oldPrice}>R$ 4.50</Text>
              <Text style={styles.newPrice}>R$ 4.05</Text>
            </TouchableOpacity>
          </Link>

          <Link href={{ pathname: '/detalheproduto', params: { id: '4', title: 'Refrigerante Cola 2L', category: 'Bebidas', price: 'R$ 5.10', image: 'https://via.placeholder.com/300x200.png?text=Refrigerante+Cola' } }} asChild>
            <TouchableOpacity style={styles.productCard}>
              <Image
                source={{ uri: "https://via.placeholder.com/300x200.png?text=Refrigerante+Cola" }}
                style={styles.productImage}
              />
              <View style={styles.discountTag}><Text style={styles.discountText}>-15%</Text></View>
              <Text style={styles.productName}>Refrigerante Cola 2L</Text>
              <Text style={styles.oldPrice}>R$ 6.00</Text>
              <Text style={styles.newPrice}>R$ 5.10</Text>
            </TouchableOpacity>
          </Link>

          <Link href={{ pathname: '/detalheproduto', params: { id: '5', title: 'Filtro de Óleo', category: 'Automotivo', price: 'R$ 30.80', image: 'https://via.placeholder.com/300x200.png?text=Filtro+de+%C3%93leo' } }} asChild>
            <TouchableOpacity style={styles.productCard}>
              <Image
                source={{ uri: "https://via.placeholder.com/300x200.png?text=Filtro+de+%C3%93leo" }}
                style={styles.productImage}
              />
              <View style={styles.discountTag}><Text style={styles.discountText}>-12%</Text></View>
              <Text style={styles.productName}>Filtro de Óleo</Text>
              <Text style={styles.oldPrice}>R$ 35.00</Text>
              <Text style={styles.newPrice}>R$ 30.80</Text>
            </TouchableOpacity>
          </Link>

          <Link href={{ pathname: '/detalheproduto', params: { id: '6', title: 'Óleo 5W30', category: 'Automotivo', price: 'R$ 64.00', image: 'https://via.placeholder.com/300x200.png?text=%C3%93leo+5W30' } }} asChild>
            <TouchableOpacity style={styles.productCard}>
              <Image
                source={{ uri: "https://via.placeholder.com/300x200.png?text=%C3%93leo+5W30" }}
                style={styles.productImage}
              />
              <View style={styles.discountTag}><Text style={styles.discountText}>-20%</Text></View>
              <Text style={styles.productName}>Óleo 5W30</Text>
              <Text style={styles.oldPrice}>R$ 80.00</Text>
              <Text style={styles.newPrice}>R$ 64.00</Text>
            </TouchableOpacity>
          </Link>
        </ScrollView>

        {/* Categorias */}
        <Text style={styles.sectionTitle}>Categorias</Text>

        <View style={styles.categoryRow}>
          <TouchableOpacity style={[styles.categoryCard, { backgroundColor: '#004AAD' }]}>
            <Icon name="beer" size={32} color="#fff" />
            <Text style={styles.categoryText}>Bebidas</Text>
            <Text style={styles.categorySubText}>Água, Cerveja, Café...</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.categoryCard, { backgroundColor: '#C62828' }]}>
            <Icon name="wrench" size={32} color="#fff" />
            <Text style={styles.categoryText}>Automotivo</Text>
            <Text style={styles.categorySubText}>Óleo, Peças, Filtros...</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* MENU INFERIOR */}
      <View style={styles.bottomMenu}>
        <TouchableOpacity style={styles.menuItem}>
          <Icon name="home" size={26} color="#C62828" />
          <Text style={styles.menuTextActive}>Inicio</Text>
        </TouchableOpacity>

        <Link href="/produtos" asChild>
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
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', backgroundColor: '#004AAD', padding: 20, width: '100%', borderBottomLeftRadius: 26, borderBottomRightRadius: 26, elevation: 4 },
  logo: { width: 140, height: 60, resizeMode: 'contain' },
  cartBubble: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.18)', alignItems: 'center', justifyContent: 'center' },
  brandTitle: { color: '#fff', fontSize: 32, fontWeight: '800' },
  brandSubtitle: { color: '#fff', opacity: 0.9, marginTop: 6, fontSize: 14 },
  sectionTitle: { fontSize: 16, fontWeight: '700', marginLeft: 16, marginVertical: 12 },
  mainButtonsRow: { flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: 12 },
  mainButton: { backgroundColor: '#004AAD', padding: 14, borderRadius: 16, width: '30%', alignItems: 'center' },
  mainButtonText: { color: '#fff', fontWeight: '600', marginTop: 6 },
  partnerCard: { margin: 16, borderRadius: 18, overflow: 'hidden', backgroundColor: '#C62828' },
  partnerImage: { width: '100%', height: 150, opacity: 0.3 },
  partnerTextBox: { position: 'absolute', top: 20, left: 20 },
  partnerTitle: { fontSize: 16, fontWeight: '700', color: '#fff' },
  partnerSubtitle: { fontSize: 14, color: '#fff', marginTop: 4 },
  fidelityCard: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 16, marginTop: 12, padding: 16, backgroundColor: '#C62828', borderRadius: 22, elevation: 3 },
  fidelityIconWrap: { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.18)', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  fidelityTextBox: { flex: 1 },
  fidelityTitle: { color: '#fff', fontSize: 16, fontWeight: '700' },
  fidelitySubtitle: { color: '#fff', opacity: 0.9, marginTop: 2 },
  fidelityChevron: { marginLeft: 12 },
  carousel: { marginTop: 8 },
  slide: { height: 160, borderRadius: 20, marginHorizontal: 16, justifyContent: 'flex-end', padding: 20, overflow: 'hidden' },
  slideTextBox: {},
  dots: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 8 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#ccc', marginHorizontal: 4 },
  dotActive: { width: 20, backgroundColor: '#004AAD' },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16 },
  link: { color: '#004AAD', fontWeight: '600' },
  productCard: { width: 160, backgroundColor: '#fff', marginLeft: 16, borderRadius: 14, paddingBottom: 10, elevation: 3 },
  productImage: { width: '100%', height: 110, borderTopLeftRadius: 14, borderTopRightRadius: 14 },
  discountTag: { position: 'absolute', backgroundColor: '#C62828', top: 10, right: 10, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6 },
  discountText: { color: '#fff', fontWeight: '700' },
  productName: { marginTop: 8, marginLeft: 8, fontWeight: '600', fontSize: 14 },
  oldPrice: { marginLeft: 8, fontSize: 12, color: '#999', textDecorationLine: 'line-through' },
  newPrice: { marginLeft: 8, fontSize: 16, fontWeight: '700', color: '#C62828' },
  categoryRow: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 8, paddingHorizontal: 16 },
  categoryCard: { width: '45%', padding: 20, borderRadius: 16 },
  categoryText: { color: '#fff', fontSize: 16, fontWeight: '700', marginTop: 8 },
  categorySubText: { color: '#fff', opacity: 0.8, marginTop: 2 },
  bottomMenu: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 10, borderTopWidth: 1, borderColor: '#eee', backgroundColor: '#fff' },
  menuItem: { alignItems: 'center' },
  menuText: { fontSize: 12, color: '#777' },
  menuTextActive: { fontSize: 12, color: '#C62828', fontWeight: '700' },
});
