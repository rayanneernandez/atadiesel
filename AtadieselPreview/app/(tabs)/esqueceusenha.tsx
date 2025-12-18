import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');

  const handleResetPassword = () => {
    console.log('Reset password for:', email);
    // Aqui viria a lógica de enviar o email
    alert('Se o email estiver cadastrado, você receberá um link de recuperação.');
    router.replace('/(tabs)/login');
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
              <Text style={styles.welcomeTitle}>Recuperar Senha</Text>
              <Text style={styles.welcomeSubtitle}>Informe seu email para continuar</Text>
            </View>

            {/* White Body Part */}
            <View style={styles.cardBody}>
              
              <Text style={styles.instructionText}>
                Digite o endereço de email associado à sua conta e enviaremos um link para redefinir sua senha.
              </Text>

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

              <TouchableOpacity style={styles.resetButton} onPress={handleResetPassword}>
                <Text style={styles.resetButtonText}>Enviar Link</Text>
              </TouchableOpacity>

              <View style={styles.backContainer}>
                <Link href="/(tabs)/login" asChild>
                  <TouchableOpacity style={styles.backButton}>
                    <Icon name="arrow-left" size={20} color="#0056D2" style={{ marginRight: 8 }} />
                    <Text style={styles.backLink}>Voltar para o Login</Text>
                  </TouchableOpacity>
                </Link>
              </View>
            </View>
          </View>

          {/* Footer Terms */}
          <Text style={styles.termsText}>
            Precisa de ajuda? Entre em contato com o suporte.
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
  instructionText: {
    fontSize: 14,
    color: '#546E7A',
    marginBottom: 24,
    lineHeight: 20,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 24,
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
  resetButton: {
    backgroundColor: '#C62828',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 24,
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backContainer: {
    alignItems: 'center',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  backLink: {
    color: '#0056D2',
    fontWeight: 'bold',
    fontSize: 14,
  },
  termsText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
});