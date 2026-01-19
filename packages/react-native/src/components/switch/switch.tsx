import React, { useState } from "react";
import {
  Pressable,
  View,
  Text,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import type { SwitchBaseProps, SwitchSize } from "@warp/core";
import { SWITCH_SIZE_CONFIG } from "@warp/core";

import { useTheme } from "../../theme";
import { cn } from "../../utils/cn";

/**
 * Switch component props
 */
export interface SwitchProps extends SwitchBaseProps {
  /** Additional className for styling */
  className?: string;
  /** Custom style for the container */
  style?: StyleProp<ViewStyle>;
}

/**
 * Size classes for the switch track
 */
const trackSizeClasses: Record<SwitchSize, string> = {
  xs: "w-8 h-4",
  sm: "w-[38px] h-5",
  md: "w-[46px] h-6",
  lg: "w-14 h-[30px]",
  xl: "w-[66px] h-9",
};

/**
 * Size classes for the switch thumb
 */
const thumbSizeClasses: Record<SwitchSize, string> = {
  xs: "w-3 h-3",
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-[26px] h-[26px]",
  xl: "w-8 h-8",
};

/**
 * Internal label size classes
 */
const internalLabelSizeClasses: Record<SwitchSize, string> = {
  xs: "text-[8px]",
  sm: "text-[9px]",
  md: "text-[10px]",
  lg: "text-[11px]",
  xl: "text-xs",
};

/**
 * Switch component
 * Toggle between on and off states
 *
 * @example
 * ```tsx
 * // Uncontrolled
 * <Switch label="Enable notifications" />
 *
 * // Controlled
 * <Switch
 *   checked={isEnabled}
 *   onCheckedChange={setIsEnabled}
 *   label="Dark mode"
 * />
 *
 * // With internal labels
 * <Switch onLabel="ON" offLabel="OFF" />
 * ```
 */
export function Switch({
  checked: controlledChecked,
  defaultChecked = false,
  onCheckedChange,
  disabled = false,
  size = "sm",
  color = "primary",
  label,
  labelPosition = "right",
  description,
  error,
  onLabel,
  offLabel,
  thumbIcon,
  className,
  style,
}: SwitchProps) {
  const { theme } = useTheme();

  // Internal state for uncontrolled usage
  const isControlled = controlledChecked !== undefined;
  const [uncontrolledChecked, setUncontrolledChecked] = useState(defaultChecked);
  const checked = isControlled ? controlledChecked : uncontrolledChecked;

  // Animation for thumb position
  const sizeConfig = SWITCH_SIZE_CONFIG[size];
  const thumbOffset = sizeConfig.thumbOffset;
  const thumbTranslate = sizeConfig.trackWidth - sizeConfig.thumbSize - thumbOffset * 2;

  const translateX = useSharedValue(checked ? thumbTranslate : 0);

  const animatedThumbStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  // Handle toggle
  const handleToggle = () => {
    if (disabled) return;

    const newChecked = !checked;
    translateX.value = withTiming(newChecked ? thumbTranslate : 0, { duration: 200 });

    if (!isControlled) {
      setUncontrolledChecked(newChecked);
    }

    onCheckedChange?.(newChecked);
  };

  // Get color classes for the track
  const getTrackColorClasses = () => {
    const colorMap: Record<string, { checked: string; unchecked: string }> = {
      primary: {
        checked: "bg-primary",
        unchecked: "bg-gray-300 dark:bg-gray-600",
      },
      secondary: {
        checked: "bg-secondary",
        unchecked: "bg-gray-300 dark:bg-gray-600",
      },
      error: {
        checked: "bg-error",
        unchecked: "bg-gray-300 dark:bg-gray-600",
      },
      success: {
        checked: "bg-success",
        unchecked: "bg-gray-300 dark:bg-gray-600",
      },
      warning: {
        checked: "bg-warning",
        unchecked: "bg-gray-300 dark:bg-gray-600",
      },
      info: {
        checked: "bg-info",
        unchecked: "bg-gray-300 dark:bg-gray-600",
      },
    };

    return colorMap[color] ?? colorMap.primary;
  };

  const trackColorClasses = getTrackColorClasses()!;

  return (
    <View
      className={cn(
        "flex-row items-center gap-2",
        labelPosition === "left" && "flex-row-reverse",
        className
      )}
      style={style}
    >
      <Pressable
        onPress={handleToggle}
        disabled={disabled}
        accessibilityRole="switch"
        accessibilityState={{ checked, disabled }}
        className={cn(
          "relative justify-center",
          disabled && "opacity-50"
        )}
      >
        {/* Track */}
        <View
          className={cn(
            "rounded-full",
            trackSizeClasses[size],
            checked ? trackColorClasses.checked : trackColorClasses.unchecked
          )}
        >
          {/* Internal labels (on/off) */}
          {(onLabel || offLabel) && (
            <View className="absolute inset-0 flex-row items-center justify-between px-1">
              <Text
                className={cn(
                  "font-semibold text-white",
                  internalLabelSizeClasses[size],
                  !checked && "opacity-0"
                )}
              >
                {onLabel}
              </Text>
              <Text
                className={cn(
                  "font-semibold text-gray-600 dark:text-gray-400",
                  internalLabelSizeClasses[size],
                  checked && "opacity-0"
                )}
              >
                {offLabel}
              </Text>
            </View>
          )}
        </View>

        {/* Thumb */}
        <Animated.View
          style={[
            {
              position: "absolute",
              left: thumbOffset,
            },
            animatedThumbStyle,
          ]}
          className={cn(
            "rounded-full bg-white shadow-md items-center justify-center",
            thumbSizeClasses[size]
          )}
        >
          {thumbIcon && (
            <View className="text-gray-600 items-center justify-center">
              {thumbIcon}
            </View>
          )}
        </Animated.View>
      </Pressable>

      {/* External label */}
      {label && (
        <Pressable onPress={handleToggle} disabled={disabled}>
          <Text
            className={cn(
              "text-sm font-medium text-foreground",
              disabled && "opacity-50",
              !!error && "text-error"
            )}
          >
            {label}
          </Text>
        </Pressable>
      )}

      {/* Description and Error */}
      {(description || error) && (
        <View className="flex-1">
          {description && typeof description === "string" && (
            <Text className="text-sm text-muted-foreground">{description}</Text>
          )}
          {error && typeof error === "string" && (
            <Text className="text-sm text-error">{error}</Text>
          )}
        </View>
      )}
    </View>
  );
}
