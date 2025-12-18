import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    console.log('Login with:', email, password);
    router.replace('/');
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
              <Text style={styles.welcomeTitle}>Bem-vindo de volta!</Text>
              <Text style={styles.welcomeSubtitle}>Faça login para continuar</Text>
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

              <Link href="/(tabs)/esqueceusenha" asChild>
                <TouchableOpacity style={styles.forgotPassword}>
                  <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
                </TouchableOpacity>
              </Link>

              <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.loginButtonText}>Entrar</Text>
              </TouchableOpacity>

              <View style={styles.signupContainer}>
                <Text style={styles.signupText}>Não tem uma conta? </Text>
                <Link href="/(tabs)/cadastro" asChild>
                  <TouchableOpacity>
                    <Text style={styles.signupLink}>Cadastre-se</Text>
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
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: '#0056D2',
    fontSize: 12,
    fontWeight: '600',
  },
  loginButton: {
    backgroundColor: '#C62828',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 16,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupText: {
    color: '#546E7A',
    fontSize: 14,
  },
  signupLink: {
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