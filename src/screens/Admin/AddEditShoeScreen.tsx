import React, {useEffect} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation, useRoute} from '@react-navigation/native';
import type {NativeStackNavigationProp, NativeStackScreenProps} from '@react-navigation/native-stack';
import uuid from 'react-native-uuid';

import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import {colors} from '../../theme/colors';
import {spacing} from '../../theme/spacing';
import {typography} from '../../theme/typography';
import type {AdminStackParamList} from '../../navigation/types';
import {addShoe, editShoe} from '../../redux/slices/shoeSlice';

type FormValues = {
  brand: string;
  model: string;
  price: string;
  sizes: number[];
};

const sizeOptions = [6, 7, 8, 9, 10, 11];

export const AddEditShoeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AdminStackParamList>>();
  const route = useRoute<NativeStackScreenProps<AdminStackParamList, 'AddEditShoe'>['route']>();
  const dispatch = useAppDispatch();
  const shoe = useAppSelector(state =>
    state.shoes.shoes.find(item => item.id === route.params?.shoeId),
  );

  const isEditMode = Boolean(route.params?.shoeId);

  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
    watch,
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      brand: '',
      model: '',
      price: '',
      sizes: [],
    },
  });

  useEffect(() => {
    if (shoe) {
      reset({
        brand: shoe.brand,
        model: shoe.model,
        price: shoe.price.toString(),
        sizes: shoe.sizes,
      });
    }
  }, [reset, shoe]);

  const selectedSizes = watch('sizes');

  const toggleSize = (size: number) => {
    const currentSizes = watch('sizes');
    const nextSizes = currentSizes.includes(size)
      ? currentSizes.filter(item => item !== size)
      : [...currentSizes, size];

    setValue('sizes', nextSizes, {shouldValidate: true, shouldDirty: true});
  };

  const onSubmit = (values: FormValues) => {
    if (isEditMode && shoe) {
      dispatch(
        editShoe({
          ...shoe,
          brand: values.brand,
          model: values.model,
          price: Number(values.price),
          sizes: values.sizes,
        }),
      );
    } else {
      dispatch(
        addShoe({
          id: uuid.v4().toString(),
          brand: values.brand,
          model: values.model,
          price: Number(values.price),
          sizes: values.sizes,
        }),
      );
    }

    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.title}>{isEditMode ? 'Edit Shoe' : 'Add Shoe'}</Text>
            <Text style={styles.subtitle}>
              {isEditMode ? 'Update the shoe details below.' : 'Add the details for the new shoe.'}
            </Text>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Brand</Text>
            <Controller
              control={control}
              name="brand"
              rules={{
                required: 'Brand is required',
                minLength: {
                  value: 2,
                  message: 'Brand must be at least 2 characters',
                },
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  style={styles.input}
                  placeholder="Enter brand"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  autoCapitalize="words"
                />
              )}
            />
            {errors.brand?.message ? (
              <Text style={styles.errorText}>{errors.brand.message}</Text>
            ) : null}
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Model</Text>
            <Controller
              control={control}
              name="model"
              rules={{
                required: 'Model is required',
                minLength: {
                  value: 2,
                  message: 'Model must be at least 2 characters',
                },
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  style={styles.input}
                  placeholder="Enter model"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  autoCapitalize="words"
                />
              )}
            />
            {errors.model?.message ? (
              <Text style={styles.errorText}>{errors.model.message}</Text>
            ) : null}
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Price</Text>
            <Controller
              control={control}
              name="price"
              rules={{
                required: 'Price is required',
                validate: value => {
                  if (!value) {
                    return 'Price is required';
                  }

                  const numericValue = Number(value);

                  if (Number.isNaN(numericValue)) {
                    return 'Price must be numeric';
                  }

                  if (numericValue <= 0) {
                    return 'Price must be greater than 0';
                  }

                  return true;
                },
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  style={styles.input}
                  placeholder="Enter price"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  keyboardType="decimal-pad"
                />
              )}
            />
            {errors.price?.message ? (
              <Text style={styles.errorText}>{errors.price.message}</Text>
            ) : null}
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Available Sizes</Text>
            <Controller
              control={control}
              name="sizes"
              rules={{
                validate: value => (value && value.length > 0) || 'Select at least one size',
              }}
              render={() => (
                <View style={styles.chipContainer}>
                  {sizeOptions.map(size => {
                    const isSelected = selectedSizes.includes(size);

                    return (
                      <Pressable
                        key={size}
                        accessibilityRole="button"
                        style={[styles.chip, isSelected && styles.selectedChip]}
                        onPress={() => toggleSize(size)}>
                        <Text style={[styles.chipText, isSelected && styles.selectedChipText]}>
                          {size}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              )}
            />
            {errors.sizes?.message ? (
              <Text style={styles.errorText}>{errors.sizes.message}</Text>
            ) : null}
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <Pressable
            accessibilityRole="button"
            style={styles.secondaryButton}
            onPress={() => navigation.goBack()}>
            <Text style={styles.secondaryButtonText}>Cancel</Text>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            style={styles.primaryButton}
            onPress={handleSubmit(onSubmit)}>
            <Text style={styles.primaryButtonText}>
              {isEditMode ? 'Update Shoe' : 'Save Shoe'}
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: spacing.lg,
    paddingBottom: spacing.xl,
  },
  header: {
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: typography.heading,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: typography.body,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  formGroup: {
    marginBottom: spacing.lg,
  },
  label: {
    fontSize: typography.body,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    fontSize: typography.body,
    color: colors.text,
  },
  errorText: {
    marginTop: spacing.xs,
    color: colors.error,
    fontSize: typography.caption,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 999,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    minHeight: 40,
    justifyContent: 'center',
  },
  selectedChip: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipText: {
    color: colors.text,
    fontWeight: '600',
  },
  selectedChipText: {
    color: colors.surface,
  },
  footer: {
    flexDirection: 'row',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.surface,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  primaryButtonText: {
    color: colors.surface,
    fontWeight: '700',
    fontSize: typography.body,
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: colors.background,
    paddingVertical: spacing.md,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
    borderWidth: 1,
    borderColor: colors.border,
  },
  secondaryButtonText: {
    color: colors.text,
    fontWeight: '700',
    fontSize: typography.body,
  },
});
