import { Tabs } from 'expo-router';
import React from 'react';
import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: { display: 'none' },
        tabBarShowLabel: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="produtos"
        options={{
          title: 'Produtos',
        }}
      />
      <Tabs.Screen
        name="detalheproduto"
        options={{
          href: null,
          title: 'Detalhe do Produto',
        }}
      />
      <Tabs.Screen
        name="autonomia"
        options={{
          href: null,
          title: 'Autonomia',
        }}
      />
      <Tabs.Screen
        name="carrinho"
        options={{
          href: null,
          title: 'Carrinho',
        }}
      />
      <Tabs.Screen
        name="fidelidade"
        options={{
          href: null,
          title: 'Fidelidade',
        }}
      />
      <Tabs.Screen
        name="dashboardadmin"
        options={{
          href: null,
          title: 'Dashboard Admin',
        }}
      />
      <Tabs.Screen
        name="cadastroproduto"
        options={{
          href: null,
          title: 'Cadastro de Produto',
        }}
      />
    </Tabs>
  );
}