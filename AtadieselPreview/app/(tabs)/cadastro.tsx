import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Image, ActivityIndicator } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RegisterScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [zip, setZip] = useState('');
  const [address, setAddress] = useState({ street: '', neighborhood: '', city: '', state: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loadingCep, setLoadingCep] = useState(false);

  const handleCepChange = async (text: string) => {
    const formattedCep = text.replace(/\D/g, '');
    setZip(formattedCep);

    if (formattedCep.length === 8) {
      setLoadingCep(true);
      try {
        const response = await fetch(`https://viacep.com.br/ws/${formattedCep}/json/`);
        const data = await response.json();
        if (!data.erro) {
          setAddress({
            street: data.logradouro,
            neighborhood: data.bairro,
            city: data.localidade,
            state: data.uf
          });
        } else {
          setAddress({ street: '', neighborhood: '', city: '', state: '' });
        }
      } catch (error) {
        console.log('Erro ao buscar CEP:', error);
        setAddress({ street: '', neighborhood: '', city: '', state: '' });
      } finally {
        setLoadingCep(false);
      }
    } else {
      setAddress({ street: '', neighborhood: '', city: '', state: '' });
    }
  };

  const handleRegister = () => {
    // Lógica de cadastro aqui
    console.log('Register with:', name, email, password, zip, address);
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

          {/* Unified Card Section */}
          <View style={styles.unifiedCard}>
            {/* Blue Header Part */}
            <View style={styles.cardHeader}>
              <Image 
                source={require('../../assets/images/atadiesel-logo-white.png')}
                style={styles.logoImage}
                resizeMode="contain"
              />
              <Text style={styles.welcomeTitle}>Criar Conta</Text>
              <Text style={styles.welcomeSubtitle}>Cadastre-se para começar</Text>
            </View>

            {/* White Body Part */}
            <View style={styles.cardBody}>
              {/* Social Login */}
              <TouchableOpacity style={styles.googleButton}>
                <Icon name="google" size={20} color="#DB4437" style={{ marginRight: 8 }} />
                <Text style={styles.googleButtonText}>Continuar com Google</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.facebookButton}>
                <Icon name="facebook" size={20} color="#fff" style={{ marginRight: 8 }} />
                <Text style={styles.facebookButtonText}>Continuar com Facebook</Text>
              </TouchableOpacity>

              <View style={styles.dividerContainer}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>ou</Text>
                <View style={styles.dividerLine} />
              </View>

              {/* Name Input */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Nome Completo</Text>
                <View style={styles.inputContainer}>
                  <Icon name="account-outline" size={20} color="#90A4AE" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="João Silva"
                    placeholderTextColor="#B0BEC5"
                    value={name}
                    onChangeText={setName}
                  />
                </View>
              </View>

              {/* Email Input */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email</Text>
                <View style={styles.inputContainer}>
                  <Icon name="email-outline" size={20} color="#90A4AE" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="seu@email.com"
                    placeholderTextColor="#B0BEC5"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
              </View>

              {/* Password Input */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Senha</Text>
                <View style={styles.inputContainer}>
                  <Icon name="lock-outline" size={20} color="#90A4AE" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="••••••••"
                    placeholderTextColor="#B0BEC5"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                  />
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Icon name={showPassword ? "eye-off" : "eye"} size={20} color="#90A4AE" />
                  </TouchableOpacity>
                </View>
              </View>

              {/* CEP Input */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>CEP (Endereço Residencial)</Text>
                <View style={styles.inputContainer}>
                  <Icon name="map-marker-outline" size={20} color="#90A4AE" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="00000-000"
                    placeholderTextColor="#B0BEC5"
                    value={zip}
                    onChangeText={handleCepChange}
                    keyboardType="numeric"
                    maxLength={8}
                  />
                  {loadingCep && <ActivityIndicator size="small" color="#0056D2" />}
                </View>
              </View>

              {/* Address Preview */}
              {address.street ? (
                <View style={styles.addressPreview}>
                  <Text style={styles.addressText}>{address.street}, {address.neighborhood}</Text>
                  <Text style={styles.addressText}>{address.city} - {address.state}</Text>
                </View>
              ) : null}

              <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
                <Text style={styles.registerButtonText}>Criar Conta</Text>
              </TouchableOpacity>

              <View style={styles.loginContainer}>
                <Text style={styles.loginText}>Já tem uma conta? </Text>
                <Link href="/(tabs)/login" asChild>
                  <TouchableOpacity>
                    <Text style={styles.loginLink}>Fazer login</Text>
                  </TouchableOpacity>
                </Link>
              </View>
            </View>
          </View>

          {/* Footer Terms */}
          <Text style={styles.termsText}>
            Ao continuar, você concorda com nossos Termos de Uso e {'\n'}Política de Privacidade
          </Text>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003c8f', // Darker blue background for screen
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'center',
  },
  unifiedCard: {
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
    marginBottom: 24,
  },
  cardHeader: {
    backgroundColor: '#0056D2', // Primary blue for header
    padding: 24,
    alignItems: 'center',
  },
  logoImage: {
    width: 180,
    height: 50,
    marginBottom: 16,
  },
  welcomeTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
    textAlign: 'center',
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: '#E3F2FD',
    textAlign: 'center',
  },
  cardBody: {
    backgroundColor: '#fff',
    padding: 24,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingVertical: 12,
    marginBottom: 12,
  },
  googleButtonText: {
    color: '#546E7A',
    fontSize: 14,
    fontWeight: '600',
  },
  facebookButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1877F2',
    borderRadius: 12,
    paddingVertical: 12,
    marginBottom: 20,
  },
  facebookButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#EEEEEE',
  },
  dividerText: {
    color: '#90A4AE',
    paddingHorizontal: 10,
    fontSize: 12,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#455A64',
    marginBottom: 6,
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ECEFF1',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 50,
    backgroundColor: '#FAFAFA',
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    color: '#263238',
    fontSize: 15,
  },
  addressPreview: {
    backgroundColor: '#E3F2FD',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#BBDEFB',
  },
  addressText: {
    color: '#0D47A1',
    fontSize: 13,
  },
  registerButton: {
    backgroundColor: '#C62828',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 16,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    color: '#546E7A',
    fontSize: 14,
  },
  loginLink: {
    color: '#0056D2',
    fontWeight: 'bold',
    fontSize: 14,
  },
  termsText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 11,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
});







