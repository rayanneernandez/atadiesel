import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter, Link } from 'expo-router';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { addToCart, getCart } from '../../src/store/cart';

function parsePrice(p: string | number) {
  if (typeof p === 'number') return p;
  const m = String(p).replace(/[^\d.,]/g, '').replace(/\./g, '').replace(',', '.');
  const n = parseFloat(m);
  return isNaN(n) ? 0 : n;
}

function formatBRL(n: number) {
  return n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export default function DetalheProduto() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id?: string; title?: string; category?: string; price?: string; image?: string }>();
  const basePrice = useMemo(() => parsePrice(params.price ?? 0), [params.price]);
  const [delivery, setDelivery] = useState<'casa' | 'loja'>('casa');
  const [qty, setQty] = useState(1);
  const total = basePrice * qty;
  const [addedToast, setAddedToast] = useState(false);
  const [cartCount, setCartCount] = useState(getCart().reduce((s, i) => s + i.quantity, 0));
  useFocusEffect(React.useCallback(() => {
    setCartCount(getCart().reduce((s, i) => s + i.quantity, 0));
    return () => {};
  }, []));

  const add = () => {
    addToCart({
      id: params.id ?? String(Date.now()),
      title: params.title ?? 'Produto',
      category: params.category ?? '',
      image: params.image ?? 'https://via.placeholder.com/400x300.png',
      unitPrice: basePrice,
      quantity: qty,
      delivery,
    });
    setCartCount(getCart().reduce((s, i) => s + i.quantity, 0));
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2000);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity style={styles.backBubble} onPress={() => router.back()}>
            <Icon name="arrow-left" size={22} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Detalhes do Produto</Text>
        </View>
        <TouchableOpacity style={styles.cartBubble} onPress={() => router.push('/(tabs)/carrinho')}>
          <Icon name="cart-outline" size={26} color="#fff" />
          {cartCount > 0 ? <View style={styles.cartBadge}><Text style={styles.cartBadgeText}>{cartCount}</Text></View> : null}
        </TouchableOpacity>
      </View>

      <Image source={{ uri: params.image ?? 'https://via.placeholder.com/800x500.png' }} style={styles.hero} />

      <View style={styles.body}>
        <Text style={styles.category}>{params.category ?? ''}</Text>
        <Text style={styles.title}>{params.title ?? ''}</Text>
        <Text style={styles.price}>{formatBRL(basePrice)}</Text>
        <Text style={styles.desc}>Água mineral natural sem gás, perfeita para hidratação.</Text>

        <Text style={styles.sectionLabel}>Método de Entrega</Text>
        <View style={styles.deliveryRow}>
          <TouchableOpacity
            style={[styles.deliveryCard, delivery === 'casa' && styles.deliveryActive]}
            onPress={() => setDelivery('casa')}
          >
            <Icon name="truck-delivery-outline" size={22} color={delivery === 'casa' ? '#004AAD' : '#777'} />
            <View>
              <Text style={[styles.deliveryTitle, delivery === 'casa' && styles.deliveryTitleActive]}>Receber em casa</Text>
              <Text style={styles.deliverySub}>Entrega em 30min</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.deliveryCard, delivery === 'loja' && styles.deliveryActive]}
            onPress={() => setDelivery('loja')}
          >
            <Icon name="store" size={22} color={delivery === 'loja' ? '#004AAD' : '#777'} />
            <View>
              <Text style={[styles.deliveryTitle, delivery === 'loja' && styles.deliveryTitleActive]}>Retirar na loja</Text>
              <Text style={styles.deliverySub}>Grátis</Text>
            </View>
          </TouchableOpacity>
        </View>

        {addedToast ? (
          <View style={styles.toast}>
            <Icon name="check-circle-outline" size={22} color="#fff" />
            <Text style={styles.toastText}>Produto adicionado ao carrinho!</Text>
          </View>
        ) : null}

        <View style={styles.qtyRow}>
          <Text style={styles.sectionLabel}>Quantidade</Text>
          <View style={styles.totalBox}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>{formatBRL(total)}</Text>
          </View>
        </View>

        <View style={styles.qtyControls}>
          <TouchableOpacity style={styles.qtyBtn} onPress={() => setQty(q => Math.max(1, q - 1))}>
            <Icon name="minus" size={20} color="#333" />
          </TouchableOpacity>
          <Text style={styles.qtyValue}>{qty}</Text>
          <TouchableOpacity style={styles.qtyBtn} onPress={() => setQty(q => q + 1)}>
            <Icon name="plus" size={20} color="#333" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.addBtn} onPress={add}>
          <Icon name="cart" size={20} color="#fff" />
          <Text style={styles.addText}>Adicionar ao Carrinho</Text>
        </TouchableOpacity>
      </View>

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
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: '700', marginLeft: 8 },
  cartBubble: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center', position: 'relative' },
  backBubble: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.18)', alignItems: 'center', justifyContent: 'center', marginRight: 12 },

  hero: { width: '100%', height: 220 },

  body: { paddingHorizontal: 16, paddingTop: 12 },
  category: { color: '#777', fontSize: 12 },
  title: { fontSize: 22, fontWeight: '700', marginTop: 4 },
  price: { color: '#C62828', fontWeight: '700', fontSize: 20, marginTop: 6 },
  desc: { color: '#444', marginTop: 10 },

  sectionLabel: { fontSize: 14, fontWeight: '700', marginTop: 16 },
  deliveryRow: { flexDirection: 'row', gap: 10, marginTop: 10 },
  deliveryCard: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#fff', paddingHorizontal: 12, paddingVertical: 12, borderRadius: 12, borderWidth: 1, borderColor: '#ddd', flex: 1 },
  deliveryActive: { borderColor: '#004AAD', backgroundColor: '#eef3ff' },
  deliveryTitle: { fontWeight: '600', color: '#555' },
  deliveryTitleActive: { color: '#004AAD' },
  deliverySub: { fontSize: 12, color: '#777' },

  qtyRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 16 },
  totalBox: { alignItems: 'flex-end' },
  totalLabel: { fontSize: 12, color: '#777' },
  totalValue: { color: '#C62828', fontWeight: '700', fontSize: 18 },

  qtyControls: { flexDirection: 'row', alignItems: 'center', gap: 14, marginTop: 10 },
  qtyBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#f1f1f1', alignItems: 'center', justifyContent: 'center' },
  qtyValue: { fontSize: 18, fontWeight: '700' },

  addBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: '#C62828', paddingVertical: 14, borderRadius: 12, marginTop: 16 },
  addText: { color: '#fff', fontWeight: '700' },
  cartBadge: { position: 'absolute', top: -6, right: -6, minWidth: 18, height: 18, borderRadius: 9, backgroundColor: '#C62828', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 4 },
  cartBadgeText: { color: '#fff', fontSize: 12, fontWeight: '700' },
  toast: { position: 'absolute', left: 16, right: 16, top: 10, flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#00C853', paddingVertical: 12, paddingHorizontal: 14, borderRadius: 12, elevation: 3 },
  toastText: { color: '#fff', fontWeight: '700' },

  bottomMenu: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 10, borderTopWidth: 1, borderColor: '#eee', backgroundColor: '#fff', marginTop: 20 },
  menuItem: { alignItems: 'center' },
  menuText: { fontSize: 12, color: '#777' },
});