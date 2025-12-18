import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, useRouter } from 'expo-router';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { getCart, updateQuantity, removeItem } from '../../src/store/cart';

function formatBRL(n: number) {
  return n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export default function Carrinho() {
  const router = useRouter();
  const [items, setItems] = useState([...getCart()]);
  const total = items.reduce((s, i) => s + i.unitPrice * i.quantity, 0);
  useFocusEffect(React.useCallback(() => {
    setItems([...getCart()]);
    return () => {};
  }, []));

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity style={styles.backBubble} onPress={() => router.back()}>
            <Icon name="arrow-left" size={22} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Carrinho</Text>
        </View>
        <Text style={styles.itemsCount}>{items.length} {items.length === 1 ? 'item' : 'itens'}</Text>
      </View>

      {items.length === 0 ? (
        <View style={styles.emptyBox}>
          <Icon name="cart-outline" size={48} color="#b0b5c0" />
          <Text style={styles.emptyTitle}>Carrinho vazio</Text>
          <Text style={styles.emptyText}>Adicione produtos ao carrinho para continuar</Text>
          <Link href="/(tabs)/produtos" asChild>
            <TouchableOpacity style={styles.ctaButton}>
              <Text style={styles.ctaText}>Continuar Comprando</Text>
            </TouchableOpacity>
          </Link>
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(it) => it.id + '-' + it.delivery}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <View style={styles.itemCard}>
              <View style={styles.row}>
                <Image source={{ uri: item.image }} style={styles.thumbLarge} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  <Text style={styles.itemSub}>{item.delivery === 'casa' ? 'Receber em casa' : 'Retirar na loja'}</Text>
                  <View style={styles.priceQtyRow}>
                    <Text style={styles.itemPriceBlue}>{formatBRL(item.unitPrice)}</Text>
                    <View style={styles.qtyInline}>
                      <TouchableOpacity style={[styles.qtyBtn, item.quantity <= 1 && styles.qtyBtnDisabled]} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }} disabled={item.quantity <= 1} onPress={() => { updateQuantity(item.id, item.delivery, Math.max(1, item.quantity - 1)); setItems([...getCart()]); }}>
                        <Icon name="minus" size={18} color={item.quantity <= 1 ? '#aaa' : '#333'} />
                      </TouchableOpacity>
                      <Text style={styles.qtyValue}>{item.quantity}</Text>
                      <TouchableOpacity style={styles.qtyBtn} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }} onPress={() => { updateQuantity(item.id, item.delivery, item.quantity + 1); setItems([...getCart()]); }}>
                        <Icon name="plus" size={18} color="#333" />
                      </TouchableOpacity>
                    </View>
                    <Text style={styles.itemPrice}>{formatBRL(item.unitPrice * item.quantity)}</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.trashBtn} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }} onPress={() => { removeItem(item.id, item.delivery); setItems([...getCart()]); }}>
                  <Icon name="trash-can-outline" size={22} color="#C62828" />
                </TouchableOpacity>
              </View>
            </View>
          )}
          ListFooterComponent={
            <View style={styles.checkoutCard}>
              <View style={styles.subtotalRow}>
                <Text style={styles.subtotalLabel}>Subtotal</Text>
                <Text style={styles.subtotalValue}>{formatBRL(total)}</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>{formatBRL(total)}</Text>
              </View>
              <TouchableOpacity style={styles.checkoutBtn} onPress={() => router.push('/(tabs)/finalizarpedido')}>
                <Text style={styles.checkoutText}>Finalizar Pedido</Text>
              </TouchableOpacity>
            </View>
          }
        />
      )}

      <View style={styles.bottomMenu}>
        <Link href="/" asChild>
          <TouchableOpacity style={styles.menuItem}>
            <Icon name="home" size={26} color="#777" />
            <Text style={styles.menuText}>Início</Text>
          </TouchableOpacity>
        </Link>
        <Link href="/produtos" asChild>
          <TouchableOpacity style={styles.menuItem}>
            <Icon name="store" size={26} color="#777" />
            <Text style={styles.menuText}>Produtos</Text>
          </TouchableOpacity>
        </Link>
        <TouchableOpacity style={styles.menuItem}>
          <Icon name="qrcode-scan" size={26} color="#777" />
          <Text style={styles.menuText}>Autônoma</Text>
        </TouchableOpacity>
        <Link href="/(tabs)/contato" asChild>
          <TouchableOpacity style={styles.menuItem}>
            <Icon name="map-marker" size={26} color="#777" />
            <Text style={styles.menuText}>Contato</Text>
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
  container: { flex: 1, backgroundColor: '#fff', paddingBottom: 70 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', backgroundColor: '#004AAD', padding: 20, width: '100%', borderBottomLeftRadius: 26, borderBottomRightRadius: 26, elevation: 4 },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: '700', marginLeft: 8 },
  cartBubble: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.18)', alignItems: 'center', justifyContent: 'center' },
  backBubble: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.18)', alignItems: 'center', justifyContent: 'center', marginRight: 12 },

  emptyBox: { alignItems: 'center', marginTop: 40 },
  emptyText: { color: '#777', marginTop: 8 },

  list: { paddingHorizontal: 16, paddingTop: 12, paddingBottom: 120, gap: 12 },
  itemCard: { backgroundColor: '#fff', borderRadius: 18, padding: 12, elevation: 3, marginBottom: 12 },
  row: { flexDirection: 'row', alignItems: 'center' },
  thumbLarge: { width: 64, height: 64, borderRadius: 12, marginRight: 12 },
  itemTitle: { fontWeight: '700' },
  itemSub: { color: '#777', fontSize: 12 },
  priceQtyRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 8 },
  itemPriceBlue: { color: '#2F6FDB', fontWeight: '700' },
  itemPrice: { color: '#C62828', fontWeight: '700' },
  trashBtn: { alignSelf: 'flex-start' },

  subtotalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  subtotalLabel: { fontSize: 14, fontWeight: '700', color: '#666' },
  subtotalValue: { fontSize: 16, fontWeight: '700', color: '#666' },
  divider: { height: 1, backgroundColor: '#eee', marginTop: 8, marginBottom: 8 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  totalLabel: { fontSize: 16, fontWeight: '700' },
  totalValue: { fontSize: 18, fontWeight: '700', color: '#C62828' },

  bottomMenu: { position: 'absolute', left: 0, right: 0, bottom: 0, flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 10, borderTopWidth: 1, borderColor: '#eee', backgroundColor: '#fff' },
  menuItem: { alignItems: 'center' },
  menuText: { fontSize: 12, color: '#777' },
  itemsCount: { color: '#fff', fontWeight: '700' },
  emptyTitle: { fontSize: 18, fontWeight: '700', marginTop: 8, color: '#333' },
  ctaButton: { marginTop: 16, backgroundColor: '#004AAD', paddingVertical: 12, paddingHorizontal: 16, borderRadius: 20 },
  ctaText: { color: '#fff', fontWeight: '700' },
  qtyInline: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  qtyBtn: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#f1f1f1', alignItems: 'center', justifyContent: 'center' },
  qtyBtnDisabled: { backgroundColor: '#eee' },
  qtyValue: { fontSize: 16, fontWeight: '700' },
  checkoutCard: { marginTop: 16, backgroundColor: '#fff', borderRadius: 14, padding: 14, elevation: 3 },
  checkoutBtn: { marginTop: 12, backgroundColor: '#C62828', paddingVertical: 14, borderRadius: 10, alignItems: 'center' },
  checkoutText: { color: '#fff', fontWeight: '700' },
});