import React, {useCallback} from 'react';
import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {UserShoeCard} from '../../components/UserShoeCard';
import {useAppSelector} from '../../hooks/redux';
import type {RootStackParamList} from '../../navigation/types';
import {selectCartItemCount} from '../../redux/slices/cartSlice';
import {colors} from '../../theme/colors';
import {spacing} from '../../theme/spacing';
import {typography} from '../../theme/typography';

export const HomeScreen = () => {
  const shoes = useAppSelector(state => state.shoes.shoes);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const cartCount = useAppSelector(selectCartItemCount);

  const handleOpenOrders = useCallback(() => {
    navigation.navigate('UserStack', {screen: 'Orders'});
  }, [navigation]);

  const handleOpenCart = useCallback(() => {
    navigation.navigate('UserStack', {screen: 'Cart'});
  }, [navigation]);

  const renderEmptyState = useCallback(() => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyTitle}>No shoes available.</Text>
      <Text style={styles.emptySubtitle}>Ask the admin to add shoes.</Text>
    </View>
  ), []);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <View style={styles.titleBlock}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Shoe Collection</Text>
              <Text style={styles.subtitle}>Choose your size and add to cart.</Text>
            </View>
          </View>

          <View style={styles.actionsRow}>
            <Pressable style={styles.secondaryButton} onPress={handleOpenOrders}>
              <Text style={styles.secondaryButtonText}>Orders</Text>
            </Pressable>
            <Pressable style={styles.primaryButton} onPress={handleOpenCart}>
              <Text style={styles.primaryButtonText}>Cart ({cartCount})</Text>
            </Pressable>
          </View>
        </View>
      </View>

      <FlatList
        data={shoes}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyState}
        initialNumToRender={8}
        maxToRenderPerBatch={8}
        windowSize={5}
        renderItem={({item}) => <UserShoeCard shoe={item} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
  },
  titleBlock: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: typography.heading,
    fontWeight: '700',
    color: colors.text,
  },
  subtitle: {
    marginTop: spacing.xs,
    fontSize: typography.body,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  listContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xs,
    paddingBottom: spacing.xl,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  emptyTitle: {
    fontSize: typography.title,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  emptySubtitle: {
    fontSize: typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 12,
    minHeight: 44,
    justifyContent: 'center',
  },
  secondaryButton: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 12,
    minHeight: 44,
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: colors.surface,
    fontWeight: '600',
    fontSize: typography.body,
  },
  secondaryButtonText: {
    color: colors.text,
    fontWeight: '600',
    fontSize: typography.body,
  },
});