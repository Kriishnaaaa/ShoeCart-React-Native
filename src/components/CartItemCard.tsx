import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {colors} from '../theme/colors';
import {spacing} from '../theme/spacing';
import {typography} from '../theme/typography';
import type {CartItem} from '../types/cart';
import {formatCurrency} from '../utils/formatCurrency';

type CartItemCardProps = {
  item: CartItem;
  onIncrease: (shoeId: string, selectedSize: number) => void;
  onDecrease: (shoeId: string, selectedSize: number) => void;
  onRemove: (shoeId: string, selectedSize: number) => void;
};

export const CartItemCard = React.memo(({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}: CartItemCardProps) => {
  return (
    <View style={styles.card}>
      <View style={styles.infoContainer}>
        <Text style={styles.brand}>{item.shoe.brand}</Text>
        <Text style={styles.model}>{item.shoe.model}</Text>
        <Text style={styles.price}>{formatCurrency(item.shoe.price)}</Text>
        <Text style={styles.meta}>Size: {item.selectedSize}</Text>
      </View>

      <View style={styles.actionsContainer}>
        <View style={styles.quantityRow}>
          <Pressable
            accessibilityRole="button"
            style={styles.quantityButton}
            onPress={() => onDecrease(item.shoe.id, item.selectedSize)}>
            <Text style={styles.quantityText}>−</Text>
          </Pressable>
          <Text style={styles.quantityValue}>{item.quantity}</Text>
          <Pressable
            accessibilityRole="button"
            style={styles.quantityButton}
            onPress={() => onIncrease(item.shoe.id, item.selectedSize)}>
            <Text style={styles.quantityText}>+</Text>
          </Pressable>
        </View>

        <Pressable
          accessibilityRole="button"
          style={styles.removeButton}
          onPress={() => onRemove(item.shoe.id, item.selectedSize)}>
          <Icon name="delete-outline" size={18} color={colors.error} />
        </Pressable>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  infoContainer: {
    flex: 1,
    marginRight: spacing.md,
  },
  brand: {
    fontSize: typography.title,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  model: {
    fontSize: typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  price: {
    fontSize: typography.body,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  meta: {
    fontSize: typography.caption,
    color: colors.textSecondary,
  },
  actionsContainer: {
    alignItems: 'flex-end',
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 999,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 36,
    minHeight: 36,
  },
  quantityText: {
    fontSize: typography.title,
    fontWeight: '600',
    color: colors.text,
  },
  quantityValue: {
    marginHorizontal: spacing.sm,
    fontSize: typography.body,
    fontWeight: '600',
    color: colors.text,
  },
  removeButton: {
    padding: spacing.xs,
  },
});
