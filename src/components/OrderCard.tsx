import React, {memo, useCallback, useMemo, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {colors} from '../theme/colors';
import {spacing} from '../theme/spacing';
import {typography} from '../theme/typography';
import type {Order} from '../types/order';
import {formatCurrency} from '../utils/formatCurrency';
import {formatDate} from '../utils/formatDate';

type OrderCardProps = {
  order: Order;
};

export const OrderCard = memo(({order}: OrderCardProps) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = useCallback(() => {
    setExpanded(previous => !previous);
  }, []);

  const itemCount = useMemo(() => {
    return order.items.reduce((total, item) => total + item.quantity, 0);
  }, [order.items]);

  return (
    <Pressable style={styles.card} onPress={toggleExpanded} accessibilityRole="button">
      <View style={styles.cardHeader}>
        <View style={styles.headerContent}>
          <Text style={styles.orderNumber}>Order #{order.id.slice(0, 8).toUpperCase()}</Text>
          <Text style={styles.date}>{formatDate(order.createdAt)}</Text>
        </View>
        <Icon
          name={expanded ? 'expand-less' : 'chevron-right'}
          size={22}
          color={colors.primary}
        />
      </View>

      <View style={styles.summaryRow}>
        <Text style={styles.metaLabel}>Items</Text>
        <Text style={styles.metaValue}>{itemCount}</Text>
      </View>

      <View style={styles.summaryRow}>
        <Text style={styles.metaLabel}>Total</Text>
        <Text style={styles.metaValue}>{formatCurrency(order.total)}</Text>
      </View>

      {expanded ? (
        <View style={styles.expandedContent}>
          <Text style={styles.sectionTitle}>Purchased Shoes</Text>
          {order.items.map(item => (
            <View key={`${item.shoe.id}-${item.selectedSize}`} style={styles.itemRow}>
              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.shoe.brand} {item.shoe.model}</Text>
                <Text style={styles.itemMeta}>Size: {item.selectedSize}</Text>
                <Text style={styles.itemMeta}>Qty: {item.quantity}</Text>
              </View>
              <Text style={styles.itemPrice}>{formatCurrency(item.shoe.price * item.quantity)}</Text>
            </View>
          ))}

          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Text style={styles.metaLabel}>Total Items</Text>
            <Text style={styles.metaValue}>{itemCount}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.metaLabel}>Total Price</Text>
            <Text style={styles.metaValue}>{formatCurrency(order.total)}</Text>
          </View>
        </View>
      ) : null}
    </Pressable>
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
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  headerContent: {
    flex: 1,
  },
  orderNumber: {
    fontSize: typography.body,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  date: {
    fontSize: typography.caption,
    color: colors.textSecondary,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  metaLabel: {
    fontSize: typography.body,
    color: colors.textSecondary,
  },
  metaValue: {
    fontSize: typography.body,
    fontWeight: '600',
    color: colors.text,
  },
  expandedContent: {
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  sectionTitle: {
    fontSize: typography.body,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  itemDetails: {
    flex: 1,
    marginRight: spacing.md,
  },
  itemName: {
    fontSize: typography.body,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  itemMeta: {
    fontSize: typography.caption,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  itemPrice: {
    fontSize: typography.body,
    fontWeight: '600',
    color: colors.primary,
  },
  divider: {
    height: spacing.sm,
  },
});
