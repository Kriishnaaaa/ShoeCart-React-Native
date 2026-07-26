import React from 'react';
import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {ShoeCard} from '../../components/ShoeCard';
import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import type {AdminStackParamList} from '../../navigation/types';
import {deleteShoe} from '../../redux/slices/shoeSlice';
import {colors} from '../../theme/colors';
import {spacing} from '../../theme/spacing';
import {typography} from '../../theme/typography';

export const ShoeListScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AdminStackParamList>>();
  const dispatch = useAppDispatch();
  const shoes = useAppSelector(state => state.shoes.shoes);

  const handleEdit = (shoeId: string) => {
    navigation.navigate('AddEditShoe', {shoeId});
  };

  const handleDelete = (shoeId: string) => {
    dispatch(deleteShoe(shoeId));
  };

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyTitle}>No shoes added yet</Text>
      <Text style={styles.emptySubtitle}>Start by adding your first shoe to the catalog.</Text>
      <Pressable
        accessibilityRole="button"
        style={styles.emptyButton}
        onPress={() => navigation.navigate('AddEditShoe', {})}>
        <Text style={styles.emptyButtonText}>Add Shoe</Text>
      </Pressable>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <View style={styles.headerTitleBlock}>
          <Text style={styles.title}>Manage Shoes</Text>
        </View>
        <Pressable
          accessibilityRole="button"
          style={styles.addButton}
          onPress={() => navigation.navigate('AddEditShoe', {})}>
          <Text style={styles.addButtonText}>+ Add</Text>
        </Pressable>
      </View>

      <FlatList
        data={shoes}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyState}
        renderItem={({item}) => (
          <ShoeCard shoe={item} onEdit={handleEdit} onDelete={handleDelete} />
        )}
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
  },
  headerTitleBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: spacing.md,
  },
  title: {
    fontSize: typography.heading,
    fontWeight: '700',
    color: colors.text,
  },
  addButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 12,
    minHeight: 44,
    justifyContent: 'center',
  },
  addButtonText: {
    color: colors.surface,
    fontWeight: '600',
    fontSize: typography.body,
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
    paddingHorizontal: spacing.xl,
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
});
