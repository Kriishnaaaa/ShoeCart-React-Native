import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {colors} from '../theme/colors';
import {spacing} from '../theme/spacing';
import {typography} from '../theme/typography';
import type {Shoe} from '../types/shoe';
import {formatCurrency} from '../utils/formatCurrency';

type ShoeCardProps = {
  shoe: Shoe;
  onEdit: (shoeId: string) => void;
  onDelete: (shoeId: string) => void;
};

export const ShoeCard = ({shoe, onEdit, onDelete}: ShoeCardProps) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <View style={styles.infoContainer}>
          <Text style={styles.brand}>{shoe.brand}</Text>
          <Text style={styles.model}>{shoe.model}</Text>
          <Text style={styles.price}>{formatCurrency(shoe.price)}</Text>
          <Text style={styles.sizes}>
            Sizes: {shoe.sizes.join(', ')}
          </Text>
        </View>

        <View style={styles.actions}>
          <Pressable
            accessibilityRole="button"
            onPress={() => onEdit(shoe.id)}
            style={styles.actionButton}>
            <Icon name="edit" size={18} color={colors.primary} />
          </Pressable>
          <Pressable
            accessibilityRole="button"
            onPress={() => onDelete(shoe.id)}
            style={styles.actionButton}>
            <Icon name="delete" size={18} color={colors.error} />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

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
  cardContent: {
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
  sizes: {
    fontSize: typography.caption,
    color: colors.textSecondary,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  actionButton: {
    padding: spacing.sm,
    borderRadius: 999,
    backgroundColor: colors.background,
    minWidth: 40,
    minHeight: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
