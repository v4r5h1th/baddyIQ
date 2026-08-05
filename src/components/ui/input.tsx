import { cn } from '@/utils/cn';
import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, Text, TextInput, View, type TextInputProps } from 'react-native';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: keyof typeof Feather.glyphMap;
  containerClassName?: string;
}

export function Input({ label, error, hint, leftIcon, containerClassName, className, ...props }: InputProps) {
  return (
    <View className={cn('gap-1.5', containerClassName)}>
      {label ? <Text className="text-sm font-medium text-text-secondary">{label}</Text> : null}
      <View
        className={cn(
          'flex-row items-center rounded-2xl border bg-bg-input px-4',
          error ? 'border-danger' : 'border-border',
        )}
      >
        {leftIcon ? <Feather name={leftIcon} size={18} color="#9AA3B8" style={{ marginRight: 8 }} /> : null}
        <TextInput
          placeholderTextColor="#6B7385"
          className={cn('flex-1 py-3.5 text-base text-text', className)}
          accessibilityLabel={label}
          {...props}
        />
      </View>
      {error ? <Text className="text-xs text-danger">{error}</Text> : null}
      {!error && hint ? <Text className="text-xs text-text-muted">{hint}</Text> : null}
    </View>
  );
}

export function PasswordInput(props: Omit<InputProps, 'secureTextEntry'>) {
  const [visible, setVisible] = useState(false);
  return (
    <View className={cn('gap-1.5', props.containerClassName)}>
      {props.label ? <Text className="text-sm font-medium text-text-secondary">{props.label}</Text> : null}
      <View
        className={cn(
          'flex-row items-center rounded-2xl border bg-bg-input px-4',
          props.error ? 'border-danger' : 'border-border',
        )}
      >
        <Feather name="lock" size={18} color="#9AA3B8" style={{ marginRight: 8 }} />
        <TextInput
          placeholderTextColor="#6B7385"
          secureTextEntry={!visible}
          className="flex-1 py-3.5 text-base text-text"
          accessibilityLabel={props.label}
          {...props}
        />
        <Pressable
          onPress={() => setVisible((v) => !v)}
          accessibilityRole="button"
          accessibilityLabel={visible ? 'Hide password' : 'Show password'}
          hitSlop={8}
        >
          <Feather name={visible ? 'eye-off' : 'eye'} size={18} color="#9AA3B8" />
        </Pressable>
      </View>
      {props.error ? <Text className="text-xs text-danger">{props.error}</Text> : null}
    </View>
  );
}
