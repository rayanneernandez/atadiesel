import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Image, Dimensions, useWindowDimensions } from 'react-native';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { getCart } from '../../src/store/cart';

const data = [
  { id: '1', title: 'Água Mineral 500ml', category: 'Bebidas', price: 'R$ 2.50', image: 'https://via.placeholder.com/400x300.png?text=%C3%81gua' },
  { id: '2', title: 'Cerveja Lager 350ml', category: 'Bebidas', price: 'R$ 4.05', oldPrice: 'R$ 4.50', discount: '-10%', image: 'https://via.placeholder.com/400x300.png?text=Cerveja' },
  { id: '3', title: 'Café Espresso', category: 'Bebidas', price: 'R$ 6.90', image: 'https://via.placeholder.com/400x300.png?text=Caf%C3%A9' },
  { id: '4', title: 'Refrigerante Cola 2L', category: 'Bebidas', price: 'R$ 5.10', oldPrice: 'R$ 6.00', discount: '-15%', image: 'https://via.placeholder.com/400x300.png?text=Cola' },
  { id: '5', title: 'Filtro de Óleo', category: 'Automotivo', price: 'R$ 30.80', oldPrice: 'R$ 35.00', discount: '-12%', image: 'https://via.placeholder.com/400x300.png?text=Filtro+de+%C3%93leo' },
  { id: '6', title: 'Óleo 5W30', category: 'Automotivo', price: 'R$ 64.00', oldPrice: 'R$ 80.00', discount: '-20%', image: 'https://via.placeholder.com/400x300.png?text=%C3%93leo+5W30' },
];

export default function Page() {
  const [inputQuery, setInputQuery] = useState('');
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<'Todos' | 'Bebidas' | 'Automotivo'>('Todos');
  const width = Dimensions.get('window').width;
  const cardWidth = Math.floor((width - 48) / 2);
  const { width: w } = useWindowDimensions();
  const isSmall = w < 360;

  const router = useRouter();
  const [cartCount, setCartCount] = useState(getCart().reduce((s, i) => s + i.quantity, 0));
  useFocusEffect(React.useCallback(() => {
    setCartCount(getCart().reduce((s, i) => s + i.quantity, 0));
    return () => {};
  }, []));

  const filtered = data.filter(p => (filter === 'Todos' ? true : p.category === filter) && p.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity style={styles.backBubble} onPress={() => router.back()}>
              <Icon name="arrow-left" size={22} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.pageTitle}>Produtos</Text>
          </View>
          <TouchableOpacity style={styles.cartBubble} onPress={() => router.push('/(tabs)/carrinho')}>
            <Icon name="cart-outline" size={26} color="#fff" />
            {cartCount > 0 ? (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cartCount}</Text>
              </View>
            ) : (
              <Text style={styles.cartCount}>0</Text>
            )}
          </TouchableOpacity>
        </View>
        <View style={[styles.searchBox, { marginHorizontal: 0, marginTop: 24, backgroundColor: '#fff', width: '100%' }]}>
          <TouchableOpacity onPress={() => setQuery(inputQuery)}>
            <Icon name="magnify" size={22} color="#777" />
          </TouchableOpacity>
          <TextInput placeholder="Buscar produtos..." placeholderTextColor="#999" style={styles.input} value={inputQuery} onChangeText={setInputQuery} onSubmitEditing={() => setQuery(inputQuery)} returnKeyType="search" />
        </View>
        <View style={[styles.filters, { marginHorizontal: 0, marginTop: 24 }]}>
          <TouchableOpacity style={[styles.chip, filter === 'Todos' ? styles.chipActiveRed : styles.chipInactiveBlue]} onPress={() => setFilter('Todos')}>
            <Text style={styles.chipTextWhite}>Todos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.chip, filter === 'Bebidas' ? styles.chipActiveRed : styles.chipInactiveBlue]} onPress={() => setFilter('Bebidas')}>
            <Icon name="beer" size={16} color="#fff" />
            <Text style={styles.chipTextWhite}>Bebidas</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.chip, filter === 'Automotivo' ? styles.chipActiveRed : styles.chipInactiveBlue]} onPress={() => setFilter('Automotivo')}>
            <Icon name="wrench" size={16} color="#fff" />
            <Text style={styles.chipTextWhite}>Automotivo</Text>
          </TouchableOpacity>
        </View>
      </View>



      <View style={styles.listHeader}><Text style={styles.listTitle}>{filtered.length} produtos encontrados</Text></View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push({ pathname: '/(tabs)/detalheproduto', params: { id: item.id, title: item.title, category: item.category, price: item.price, image: item.image } })}>
            <View style={[styles.card, { width: cardWidth }]}>
              <Image source={{ uri: item.image }} style={styles.cardImage} />
              {item.discount ? <View style={styles.badge}><Text style={styles.badgeText}>{item.discount}</Text></View> : null}
              <View style={styles.cardBody}>
                <Text style={styles.cardCategory}>{item.category}</Text>
                <Text style={styles.cardTitle} numberOfLines={2}>{item.title}</Text>
                {item.oldPrice ? <Text style={styles.oldPrice}>{item.oldPrice}</Text> : null}
                <Text style={styles.newPrice}>{item.price}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />

      <View style={styles.bottomMenu}>
        <Link href="/" asChild>
          <TouchableOpacity style={styles.menuItem}>
            <Icon name="home" size={26} color="#777" />
            <Text style={styles.menuText}>Inicio</Text>
          </TouchableOpacity>
        </Link>

        <TouchableOpacity style={styles.menuItem}>
          <Icon name="store" size={26} color="#C62828" />
          <Text style={styles.menuTextActive}>Produto</Text>
        </TouchableOpacity>

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
  header: { flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'stretch', backgroundColor: '#004AAD', padding: 20, width: '100%', borderBottomLeftRadius: 26, borderBottomRightRadius: 26, elevation: 4 },
  brandTitle: { color: '#fff', fontSize: 32, fontWeight: '800' },
  brandSubtitle: { color: '#fff', opacity: 0.9, marginTop: 6 },
  brandLogo: { width: 140, height: 32, resizeMode: 'contain' },
  pageTitle: { color: '#fff', fontSize: 28, fontWeight: 'normal' },
  cartBubble: { width: 44, alignItems: 'center', justifyContent: 'center' },
  cartCount: { color: '#fff', fontSize: 12, fontWeight: '700', marginTop: 4 },
  backBubble: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.18)', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  title: { fontSize: 24, fontWeight: '700' },
  searchBox: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#f3f5f8', marginHorizontal: 16, paddingHorizontal: 12, paddingVertical: 12, borderRadius: 14 },
  input: { flex: 1, fontSize: 16 },
  filters: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 12, marginHorizontal: 16 },
  chip: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8 },
  chipActive: { backgroundColor: '#fdeaea', borderWidth: 1, borderColor: '#C62828' },
  chipTextWhite: { color: '#fff', fontWeight: '600' },
  chipTextActive: { color: '#C62828' },
  listHeader: { marginTop: 14, paddingHorizontal: 16, paddingVertical: 10, borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#eee', backgroundColor: '#fafafa' },
  listTitle: { fontWeight: '700', color: '#333' },
  list: { paddingHorizontal: 16, paddingTop: 12, paddingBottom: 24, gap: 12 },
  card: { backgroundColor: '#fff', borderRadius: 18, overflow: 'visible', marginRight: 12, marginBottom: 12, elevation: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
  cardImage: { width: '100%', height: 120 },
  badge: { position: 'absolute', top: 8, right: 8, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, backgroundColor: '#C62828' },
  badgeText: { color: '#fff', fontWeight: '700', fontSize: 12 },
  cardBody: { padding: 10 },
  cardCategory: { color: '#777', fontSize: 12 },
  cardTitle: { fontWeight: '700', marginTop: 2 },
  oldPrice: { color: '#999', textDecorationLine: 'line-through', marginTop: 6 },
  newPrice: { color: '#C62828', fontWeight: '700', fontSize: 16, marginTop: 2 },
  bottomMenu: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 10, borderTopWidth: 1, borderColor: '#eee', backgroundColor: '#fff' },
  menuItem: { alignItems: 'center' },
  menuText: { fontSize: 12, color: '#777' },
  menuTextActive: { fontSize: 12, color: '#C62828', fontWeight: '700' },
  cartBadge: { position: 'absolute', top: -6, right: -6, minWidth: 18, height: 18, borderRadius: 9, backgroundColor: '#C62828', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 4 },
  cartBadgeText: { color: '#fff', fontSize: 12, fontWeight: '700' },
  chipActiveRed: { backgroundColor: '#C62828' },
  chipInactiveBlue: { backgroundColor: '#2F6FDB' },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' },
});