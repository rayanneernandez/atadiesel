import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Linking, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, Link } from 'expo-router';

const { width } = Dimensions.get('window');

const ADDRESS_LINE_1 = "Av. Alm. Júlio de Sá Bierrenbach, 65 - Bloco 06 - Loja 108 ";
const ADDRESS_LINE_2 = "Barra da Tijuca, Rio de Janeiro";
const ADDRESS_ZIP = "CEP: 22775-028";
const FULL_ADDRESS = `${ADDRESS_LINE_1}, ${ADDRESS_LINE_2}, ${ADDRESS_ZIP}`;

export default function ContatoScreen() {
  const router = useRouter();

  const handleOpenWhatsapp = () => {
    Linking.openURL('https://wa.me/5511999999999');
  };

  const handleOpenMaps = () => {
    // Abre diretamente a rota para o endereço no Google Maps
    const query = encodeURIComponent(FULL_ADDRESS);
    const url = `https://www.google.com/maps/dir/?api=1&destination=${query}`;
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      {/* Header Personalizado */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <MaterialCommunityIcons name="arrow-left" size={28} color="#fff" />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerTitle}>Nossa Loja</Text>
            <Text style={styles.headerSubtitle}>Informações e Contato</Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        
        {/* Card Endereço */}
        <View style={styles.card}>
          <View style={styles.mapPlaceholder}>
            {/* Simulando a imagem do mapa com um placeholder colorido e ícone, 
                ou imagem real se disponível. Usando padrão visual da imagem. */}
            <MaterialCommunityIcons name="map" size={60} color="#90A4AE" />
            <View style={styles.mapPinOverlay}>
               <MaterialCommunityIcons name="map-marker-radius" size={40} color="#fff" />
            </View>
          </View>
          
          <View style={styles.cardBody}>
            <View style={styles.sectionHeader}>
              <MaterialCommunityIcons name="map-marker-outline" size={24} color="#C62828" />
              <Text style={styles.sectionTitle}>Endereço</Text>
            </View>
            
            <View style={styles.addressContainer}>
              <Text style={styles.addressText}>{ADDRESS_LINE_1}</Text>
              <Text style={styles.addressText}>{ADDRESS_LINE_2}</Text>
              <Text style={styles.addressText}>{ADDRESS_ZIP}</Text>
            </View>

            <TouchableOpacity style={styles.redButton} onPress={handleOpenMaps}>
              <MaterialCommunityIcons name="navigation-variant-outline" size={20} color="#fff" style={{marginRight: 8}} />
              <Text style={styles.redButtonText}>Como Chegar</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Card Contato */}
        <View style={styles.card}>
          <View style={styles.cardBody}>
            <Text style={[styles.sectionTitle, {marginBottom: 16}]}>Contato</Text>

            {/* WhatsApp */}
            <View style={styles.contactRow}>
              <View style={[styles.iconCircle, {backgroundColor: '#E0F2F1'}]}>
                <MaterialCommunityIcons name="whatsapp" size={24} color="#00C853" />
              </View>
              <View style={styles.contactInfo}>
                <Text style={styles.contactLabel}>WhatsApp</Text>
                <Text style={styles.contactValue}>(11) 99999-9999</Text>
              </View>
            </View>
            
            <TouchableOpacity style={styles.whatsappButton} onPress={handleOpenWhatsapp}>
              <MaterialCommunityIcons name="whatsapp" size={20} color="#fff" style={{marginRight: 8}} />
              <Text style={styles.whatsappButtonText}>Abrir WhatsApp</Text>
            </TouchableOpacity>

            <View style={styles.divider} />

            {/* Email */}
            <View style={styles.contactRow}>
              <View style={[styles.iconCircle, {backgroundColor: '#E3F2FD'}]}>
                <MaterialCommunityIcons name="email-outline" size={24} color="#1976D2" />
              </View>
              <View style={styles.contactInfo}>
                <Text style={styles.contactLabel}>Email</Text>
                <Text style={styles.contactValue}>contato@loja.com.br</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Card Horário */}
        <View style={styles.card}>
          <View style={styles.cardBody}>
            <View style={styles.sectionHeader}>
              <MaterialCommunityIcons name="clock-time-four-outline" size={24} color="#0D47A1" />
              <Text style={styles.sectionTitle}>Horário de Funcionamento</Text>
            </View>

            <View style={styles.scheduleRow}>
              <Text style={styles.dayText}>Segunda a Sexta</Text>
              <Text style={styles.hourText}>8:00 - 20:00</Text>
            </View>
            <View style={styles.dividerLight} />
            
            <View style={styles.scheduleRow}>
              <Text style={styles.dayText}>Sábado</Text>
              <Text style={styles.hourText}>8:00 - 18:00</Text>
            </View>
            <View style={styles.dividerLight} />

            <View style={styles.scheduleRow}>
              <Text style={styles.dayText}>Domingo</Text>
              <Text style={styles.hourText}>9:00 - 14:00</Text>
            </View>
            <View style={styles.dividerLight} />

            <View style={styles.scheduleRow}>
              <Text style={styles.dayText}>Feriados</Text>
              <Text style={[styles.hourText, {color: '#C62828'}]}>Fechado</Text>
            </View>
          </View>
        </View>

        {/* Card Loja Autônoma */}
        <View style={[styles.card, styles.autonomousCard]}>
          <View style={styles.cardBody}>
            <Text style={styles.autonomousTitle}>Loja Autônoma 24h</Text>
            <Text style={styles.autonomousDesc}>
              Nossa loja autônoma funciona 24 horas por dia! Use o QR Code na seção "Autônoma" para entrar.
            </Text>
            
            <View style={styles.tagsContainer}>
              <View style={styles.tag}>
                <MaterialCommunityIcons name="check" size={16} color="#fff" />
                <Text style={styles.tagText}>Sem filas</Text>
              </View>
              <View style={styles.tag}>
                <MaterialCommunityIcons name="check" size={16} color="#fff" />
                <Text style={styles.tagText}>24/7</Text>
              </View>
              <View style={styles.tag}>
                <MaterialCommunityIcons name="check" size={16} color="#fff" />
                <Text style={styles.tagText}>Rápido</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={{height: 20}} />
      </ScrollView>

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
        <TouchableOpacity style={styles.menuItem}>
          <MaterialCommunityIcons name="map-marker" size={26} color="#C62828" />
          <Text style={styles.menuTextActive}>Loja</Text>
        </TouchableOpacity>
        <Link href="/(tabs)/perfil" asChild>
          <TouchableOpacity style={styles.menuItem}>
            <MaterialCommunityIcons name="account" size={26} color="#777" />
            <Text style={styles.menuText}>Perfil</Text>
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
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardBody: {
    padding: 20,
  },
  mapPlaceholder: {
    height: 150,
    backgroundColor: '#CFD8DC',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  mapPinOverlay: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginLeft: 8,
  },
  addressContainer: {
    marginBottom: 20,
    paddingLeft: 32, // Align with text of section header
  },
  addressText: {
    fontSize: 15,
    color: '#546E7A',
    marginBottom: 2,
    lineHeight: 22,
  },
  redButton: {
    backgroundColor: '#C62828',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 25,
  },
  redButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  contactInfo: {
    justifyContent: 'center',
  },
  contactLabel: {
    fontSize: 12,
    color: '#78909C',
  },
  contactValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  whatsappButton: {
    backgroundColor: '#00C853',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 5,
    marginBottom: 15,
    marginLeft: 52, // Indent to align with text
  },
  whatsappButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  divider: {
    height: 1,
    backgroundColor: '#ECEFF1',
    marginVertical: 15,
  },
  dividerLight: {
    height: 1,
    backgroundColor: '#F5F5F5',
    marginVertical: 12,
  },
  scheduleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dayText: {
    fontSize: 15,
    color: '#546E7A',
  },
  hourText: {
    fontSize: 15,
    color: '#333',
    fontWeight: '500',
  },
  autonomousCard: {
    backgroundColor: '#0D47A1', // Deep Blue
  },
  autonomousTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  autonomousDesc: {
    color: '#E3F2FD',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 20,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 5,
  },
  tagText: {
    color: '#fff',
    marginLeft: 5,
    fontSize: 13,
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