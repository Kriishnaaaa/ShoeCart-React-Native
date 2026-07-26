import React, {useCallback, useMemo, useState} from 'react';
import {Alert, Pressable, StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';

import {addToCart} from '../redux/slices/cartSlice';
import {colors} from '../theme/colors';
import {spacing} from '../theme/spacing';
import {typography} from '../theme/typography';
import type {Shoe} from '../types/shoe';
import {formatCurrency} from '../utils/formatCurrency';

type UserShoeCardProps = {
  shoe: Shoe;
};

export const UserShoeCard = React.memo(({shoe}: UserShoeCardProps) => {
  const dispatch = useDispatch();
  const [selectedSize, setSelectedSize] = useState<number | null>(null);

  const sortedSizes = useMemo(() => [...shoe.sizes].sort((a, b) => a - b), [shoe.sizes]);

  const handleSizeSelection = useCallback((size: number) => {
    setSelectedSize(size);
  }, []);

  const handleAddToCart = useCallback(() => {
    if (selectedSize === null) {
      Alert.alert('Select a size', 'Please choose a size before adding to cart.');
      return;
    }

    dispatch(addToCart({shoe, selectedSize}));
    setSelectedSize(null);
    Alert.alert('Added to cart', `${shoe.brand} ${shoe.model} was added to your cart.`);
  }, [dispatch, selectedSize, shoe]);

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.infoContainer}>
          <Text style={styles.brand}>{shoe.brand}</Text>
          <Text style={styles.model}>{shoe.model}</Text>
          <Text style={styles.price}>{formatCurrency(shoe.price)}</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Available Sizes</Text>
      <View style={styles.sizesContainer}>
        {sortedSizes.map(size => {
          const isSelected = selectedSize === size;

          return (
            <Pressable
              key={size}
              accessibilityRole="button"
              style={[styles.sizeChip, isSelected && styles.selectedSizeChip]}
              onPress={() => handleSizeSelection(size)}>
              <Text style={[styles.sizeText, isSelected && styles.selectedSizeText]}>
                {size}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Pressable
        accessibilityRole="button"
        style={styles.actionButton}
        onPress={handleAddToCart}>
        <Text style={styles.actionButtonText}>Add to Cart</Text>
      </Pressable>
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
    elevation: 2,
    shadowColor: colors.text,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  header: {
    marginBottom: spacing.md,
  },
  infoContainer: {
    flex: 1,
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
  },
  sectionTitle: {
    fontSize: typography.caption,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  sizesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  sizeChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 999,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
  },
  selectedSizeChip: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  sizeText: {
    color: colors.text,
    fontWeight: '600',
  },
  selectedSizeText: {
    color: colors.surface,
  },
  actionButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: 12,
    alignItems: 'center',
    minHeight: 48,
    justifyContent: 'center',
  },
  actionButtonText: {
    color: colors.surface,
    fontWeight: '700',
    fontSize: typography.body,
  },
});
