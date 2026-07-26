import React, {useCallback, useMemo, useState} from 'react';
import {Alert, FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import uuid from 'react-native-uuid';

import {CartItemCard} from '../../components/CartItemCard';
import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import {
  clearCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
  selectCartItems,
} from '../../redux/slices/cartSlice';
import {addOrder} from '../../redux/slices/orderSlice';
import {colors} from '../../theme/colors';
import {spacing} from '../../theme/spacing';
import {typography} from '../../theme/typography';
import type {UserStackParamList} from '../../navigation/types';
import {calculateCartSummary} from '../../utils/cartSummary';
import {formatCurrency} from '../../utils/formatCurrency';

export const CartScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<UserStackParamList>>();
  const items = useAppSelector(selectCartItems);
  const [isProcessing, setIsProcessing] = useState(false);

  const summary = useMemo(() => calculateCartSummary(items), [items]);

  const handleIncrease = useCallback((shoeId: string, selectedSize: number) => {
    dispatch(increaseQuantity({shoeId, selectedSize}));
  }, [dispatch]);

  const handleDecrease = useCallback((shoeId: string, selectedSize: number) => {
    dispatch(decreaseQuantity({shoeId, selectedSize}));
  }, [dispatch]);

  const handleRemove = useCallback((shoeId: string, selectedSize: number) => {
    dispatch(removeFromCart({shoeId, selectedSize}));
  }, [dispatch]);

  const handleCheckout = useCallback(() => {
    if (isProcessing) {
      return;
    }

    if (!items || items.length === 0) {
      Alert.alert('Cart Empty', 'Please add some shoes before checking out.');
      return;
    }

    setIsProcessing(true);

    const order = {
      id: uuid.v4().toString(),
      items: items.map(item => ({...item})),
      total: summary.totalPrice,
      totalItems: summary.totalItems,
      createdAt: new Date().toISOString(),
    };

    try {
      dispatch(addOrder(order));
      dispatch(clearCart());
      Alert.alert('Order Placed', 'Your order has been placed successfully.', [
        {
          text: 'OK',
          onPress: () => {
            navigation.navigate('Orders');
          },
        },
      ]);
    } catch {
      Alert.alert('Checkout Failed', 'Unable to place your order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  }, [dispatch, isProcessing, items, navigation, summary.totalPrice, summary.totalItems]);

  const renderEmptyState = useCallback(() => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyTitle}>Your cart is empty</Text>
      <Text style={styles.emptySubtitle}>Add some shoes to get started with your order.</Text>
      <Pressable onPress={() => navigation.goBack()} accessibilityRole="button" style={styles.emptyButton}>
        <Text style={styles.emptyButtonText}>Continue Shopping</Text>
      </Pressable>
    </View>
  ), [navigation]);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <Text style={styles.title}>Cart</Text>
        <Text style={styles.subtitle}>Review your selected shoes.</Text>
      </View>

      <FlatList
        data={items}
        keyExtractor={item => `${item.shoe.id}-${item.selectedSize}`}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyState}
        initialNumToRender={8}
        maxToRenderPerBatch={8}
        windowSize={5}
        renderItem={({item}) => (
          <CartItemCard
            item={item}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
            onRemove={handleRemove}
          />
        )}
      />

      <View style={styles.footer}>
        <View style={styles.footerSummary}>
          <Text style={styles.footerLabel}>Total Items</Text>
          <Text style={styles.footerValue}>{summary.totalItems}</Text>
        </View>
        <View style={styles.footerSummary}>
          <Text style={styles.footerLabel}>Total Price</Text>
          <Text style={styles.footerValue}>{formatCurrency(summary.totalPrice)}</Text>
        </View>
        <Pressable
          accessibilityRole="button"
          style={[styles.checkoutButton, isProcessing && styles.checkoutButtonDisabled]}
          onPress={handleCheckout}
          disabled={isProcessing}>
          <Text style={styles.checkoutButtonText}>{isProcessing ? 'Processing...' : 'Buy Now'}</Text>
        </Pressable>
      </View>
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
    paddingBottom: spacing.md,
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
    marginBottom: spacing.lg,
  },
  emptyButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: 12,
    minHeight: 44,
    justifyContent: 'center',
  },
  emptyButtonText: {
    color: colors.surface,
    fontWeight: '600',
    fontSize: typography.body,
  },
  footer: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.surface,
  },
  footerSummary: {
    marginBottom: spacing.sm,
  },
  footerLabel: {
    fontSize: typography.caption,
    color: colors.textSecondary,
  },
  footerValue: {
    fontSize: typography.title,
    fontWeight: '700',
    color: colors.text,
  },
  checkoutButton: {
    marginTop: spacing.sm,
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  checkoutButtonDisabled: {
    opacity: 0.7,
  },
  checkoutButtonText: {
    color: colors.surface,
    fontWeight: '700',
    fontSize: typography.body,
  },
});
