import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Alert } from 'react-native';
import {
  TextInput,
  Button,
  Text,
  Card,
  List,
  ActivityIndicator,
  HelperText,
} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

import { useAppTheme } from '@/theme';
import { AppTheme } from '@/theme/types';

interface PasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface PasswordValidation {
  minLength: boolean;
  hasUpperCase: boolean;
  hasLowerCase: boolean;
  hasNumber: boolean;
  hasSpecialChar: boolean;
  passwordsMatch: boolean;
}

const ChangePasswordScreen: React.FC = () => {
  const theme = useAppTheme();
  const styles = getStyles(theme);

  const [formData, setFormData] = useState<PasswordFormData>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<PasswordFormData>>({});

  const validatePassword = (password: string): PasswordValidation => {
    return {
      minLength: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      passwordsMatch: password === formData.confirmPassword && formData.confirmPassword !== '',
    };
  };

  const validation = validatePassword(formData.newPassword);
  const isNewPasswordValid = Object.values(validation).every(Boolean);

  const isFormValid =
    formData.currentPassword.trim() !== '' &&
    formData.newPassword.trim() !== '' &&
    formData.confirmPassword.trim() !== '' &&
    isNewPasswordValid;

  const handleInputChange = (field: keyof PasswordFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async () => {
    // Validate form
    const newErrors: Partial<PasswordFormData> = {};

    if (!formData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }

    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (!isNewPasswordValid) {
      newErrors.newPassword = 'Password does not meet requirements';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    try {
      // TODO: Replace with api call
      console.log('Submitting password change:', {
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      Alert.alert('Success', 'Your password has been changed successfully.', [{ text: 'OK' }]);

      // Reset form
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to change password. Please try again.', [{ text: 'OK' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const getValidationIcon = (isValid: boolean) => {
    return isValid ? 'checkmark-circle' : 'close-circle';
  };

  const getValidationColor = (isValid: boolean) => {
    return isValid ? theme.colors.primary : theme.colors.error;
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        <TextInput
          label="Current Password"
          value={formData.currentPassword}
          onChangeText={text => handleInputChange('currentPassword', text)}
          secureTextEntry={!showPasswords.current}
          mode="outlined"
          style={styles.input}
          error={!!errors.currentPassword}
          outlineColor={theme.colors.outline}
          activeOutlineColor={theme.colors.primary}
          contentStyle={styles.inputContent}
          right={
            <TextInput.Icon
              icon={showPasswords.current ? 'eye-off' : 'eye'}
              onPress={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
            />
          }
        />
        <HelperText type="error" visible={!!errors.currentPassword}>
          {errors.currentPassword}
        </HelperText>

        <TextInput
          label="New Password"
          value={formData.newPassword}
          onChangeText={text => handleInputChange('newPassword', text)}
          secureTextEntry={!showPasswords.new}
          mode="outlined"
          style={styles.input}
          error={!!errors.newPassword}
          outlineColor={theme.colors.outline}
          activeOutlineColor={theme.colors.primary}
          contentStyle={styles.inputContent}
          right={
            <TextInput.Icon
              icon={showPasswords.new ? 'eye-off' : 'eye'}
              onPress={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
            />
          }
        />
        <HelperText type="error" visible={!!errors.newPassword}>
          {errors.newPassword}
        </HelperText>

        <TextInput
          label="Confirm New Password"
          value={formData.confirmPassword}
          onChangeText={text => handleInputChange('confirmPassword', text)}
          secureTextEntry={!showPasswords.confirm}
          mode="outlined"
          style={styles.input}
          error={!!errors.confirmPassword}
          outlineColor={theme.colors.outline}
          activeOutlineColor={theme.colors.primary}
          contentStyle={styles.inputContent}
          right={
            <TextInput.Icon
              icon={showPasswords.confirm ? 'eye-off' : 'eye'}
              onPress={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
            />
          }
        />
        <HelperText type="error" visible={!!errors.confirmPassword}>
          {errors.confirmPassword}
        </HelperText>

        {formData.newPassword !== '' && (
          <Card style={styles.requirementsCard}>
            <Card.Content>
              <Text variant="titleSmall" style={styles.requirementsTitle}>
                Password Requirements
              </Text>

              <List.Item
                title="At least 8 characters"
                left={() => (
                  <Ionicons
                    name={getValidationIcon(validation.minLength)}
                    size={20}
                    color={getValidationColor(validation.minLength)}
                    style={styles.validationIcon}
                  />
                )}
                titleStyle={[
                  styles.requirementText,
                  { color: getValidationColor(validation.minLength) },
                ]}
              />

              <List.Item
                title="One uppercase letter"
                left={() => (
                  <Ionicons
                    name={getValidationIcon(validation.hasUpperCase)}
                    size={20}
                    color={getValidationColor(validation.hasUpperCase)}
                    style={styles.validationIcon}
                  />
                )}
                titleStyle={[
                  styles.requirementText,
                  { color: getValidationColor(validation.hasUpperCase) },
                ]}
              />

              <List.Item
                title="One lowercase letter"
                left={() => (
                  <Ionicons
                    name={getValidationIcon(validation.hasLowerCase)}
                    size={20}
                    color={getValidationColor(validation.hasLowerCase)}
                    style={styles.validationIcon}
                  />
                )}
                titleStyle={[
                  styles.requirementText,
                  { color: getValidationColor(validation.hasLowerCase) },
                ]}
              />

              <List.Item
                title="One number"
                left={() => (
                  <Ionicons
                    name={getValidationIcon(validation.hasNumber)}
                    size={20}
                    color={getValidationColor(validation.hasNumber)}
                    style={styles.validationIcon}
                  />
                )}
                titleStyle={[
                  styles.requirementText,
                  { color: getValidationColor(validation.hasNumber) },
                ]}
              />

              <List.Item
                title="One special character"
                left={() => (
                  <Ionicons
                    name={getValidationIcon(validation.hasSpecialChar)}
                    size={20}
                    color={getValidationColor(validation.hasSpecialChar)}
                    style={styles.validationIcon}
                  />
                )}
                titleStyle={[
                  styles.requirementText,
                  { color: getValidationColor(validation.hasSpecialChar) },
                ]}
              />

              {formData.confirmPassword !== '' && (
                <List.Item
                  title="Passwords match"
                  left={() => (
                    <Ionicons
                      name={getValidationIcon(validation.passwordsMatch)}
                      size={20}
                      color={getValidationColor(validation.passwordsMatch)}
                      style={styles.validationIcon}
                    />
                  )}
                  titleStyle={[
                    styles.requirementText,
                    { color: getValidationColor(validation.passwordsMatch) },
                  ]}
                />
              )}
            </Card.Content>
          </Card>
        )}

        <Button
          mode="contained"
          onPress={handleSubmit}
          disabled={!isFormValid || isLoading}
          style={[styles.submitButton, (!isFormValid || isLoading) && styles.submitButtonDisabled]}
          contentStyle={styles.submitButtonContent}
          labelStyle={styles.submitButtonLabel}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color={theme.colors.onPrimary} />
          ) : (
            'Change Password'
          )}
        </Button>
      </View>
    </ScrollView>
  );
};

export default ChangePasswordScreen;

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.surface,
    },
    content: {
      padding: 16,
    },
    input: {
      marginBottom: 4,
      backgroundColor: theme.colors.surface,
    },
    inputContent: {
      backgroundColor: theme.colors.backdrop,
    },
    requirementsCard: {
      marginTop: 8,
      marginBottom: 24,
      backgroundColor: theme.colors.backdrop,
    },
    requirementsTitle: {
      marginBottom: 8,
      color: theme.colors.onSurface,
    },
    requirementText: {
      fontSize: 14,
    },
    validationIcon: {
      marginTop: 8,
    },
    submitButton: {
      marginTop: 16,
      borderRadius: 12,
      backgroundColor: theme.colors.primary,
    },
    submitButtonDisabled: {
      backgroundColor: theme.colors.outline,
    },
    submitButtonContent: {
      paddingVertical: 8,
    },
    submitButtonLabel: {
      color: theme.colors.onPrimary,
      fontSize: 16,
      fontWeight: '600',
    },
  });
