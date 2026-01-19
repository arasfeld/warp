/**
 * @warp/react
 * React (web) components for Warp UI
 */

// Export theme system
export {
  ThemeProvider,
  updatePaletteCSSVariables,
  updateThemeCSSVariables,
  useTheme,
} from "./theme";
export type { ThemeProviderProps } from "./theme";

// Export components
// Alert
export { Alert } from "./components/alert";
export type { AlertProps, AlertVariant } from "./components/alert";

// Badge
export { Badge } from "./components/badge";
export type { BadgeProps, BadgeSize, BadgeVariant } from "./components/badge";

// Button with static properties (already attached in button/index.ts)
export { Button, ButtonGroup, ButtonGroupSection } from "./components/button";
export type {
  ButtonGroupProps,
  ButtonGroupSectionProps,
  ButtonProps,
  ButtonSize,
  ButtonVariant,
  GradientConfig,
} from "./components/button";

export { Loader } from "./components/loader";
export type { LoaderProps, LoaderType } from "./components/loader";

// Card with static properties (already attached in card/index.ts)
export { Card, CardSection } from "./components/card";
export type { CardProps, CardSectionProps } from "./components/card";

export { Text } from "./components/text";
export type {
  Gradient,
  TextColor,
  TextProps,
  TextSize,
  TextTruncate,
  TextWeight,
  ThemeColor,
  ThemeSize,
} from "./components/text";

export { Heading } from "./components/heading";
export type {
  Gradient as HeadingGradient,
  HeadingOrder,
  HeadingProps,
  HeadingSize,
  TextWrap,
} from "./components/heading";

// Chip with static properties (already attached in chip/index.ts)
export { Chip, ChipGroup } from "./components/chip";
export type {
  ChipProps,
  ChipGroupProps,
  ChipVariant,
} from "./components/chip";

// Checkbox with static properties (already attached in checkbox/index.ts)
export { Checkbox, CheckboxGroup, CheckboxIndicator } from "./components/checkbox";
export type {
  CheckboxProps,
  CheckboxGroupProps,
  CheckboxIndicatorProps,
  CheckboxVariant,
} from "./components/checkbox";

// Input with static properties (already attached in input/index.ts)
export {
  Input,
  InputClearButton,
  InputDescription,
  InputError,
  InputLabel,
  InputPlaceholder,
  InputWrapper,
} from "./components/input";
export type {
  InputProps,
  InputSize,
  InputVariant,
  InputWrapperProps,
} from "./components/input";

// TextInput
export { TextInput } from "./components/text-input";
export type { TextInputProps } from "./components/text-input";

// PasswordInput
export { PasswordInput } from "./components/password-input";
export type { PasswordInputProps } from "./components/password-input";

// NumberInput
export { NumberInput } from "./components/number-input";
export type { NumberInputProps, NumberInputHandlers } from "./components/number-input";

// Textarea
export { Textarea } from "./components/textarea";
export type { TextareaProps } from "./components/textarea";

// Radio
export { Radio, RadioGroup } from "./components/radio";
export type {
  RadioProps,
  RadioSize,
  RadioVariant,
  RadioGroupProps,
} from "./components/radio";

// Select
export { Select } from "./components/select";
export type {
  SelectProps,
  SelectOption,
  SelectSize,
  SelectVariant,
} from "./components/select";

// Switch
export { Switch } from "./components/switch";
export type {
  SwitchColor,
  SwitchLabelPosition,
  SwitchProps,
  SwitchSize,
} from "./components/switch";

// Stack
export { Stack } from "./components/stack";
export type {
  StackAlign,
  StackJustify,
  StackProps,
  StackSpacing,
} from "./components/stack";

// Container
export { Container } from "./components/container";
export type { ContainerProps, ContainerSize } from "./components/container";

// Group
export { Group } from "./components/group";
export type {
  GroupAlign,
  GroupJustify,
  GroupProps,
  GroupSpacing,
  GroupWrap,
} from "./components/group";

// Toast
export { Toast, Toaster, toast } from "./components/toast";
export type {
  ToastProps,
  ToastVariant,
  ToasterProps,
  ToastPosition,
  ToastData,
} from "./components/toast";

// Dialog
export { Dialog, DialogHeader, DialogBody, DialogFooter } from "./components/dialog";
export type {
  DialogProps,
  DialogSize,
  DialogHeaderProps,
  DialogBodyProps,
  DialogFooterProps,
} from "./components/dialog";

// Table
export {
  Table,
  TableThead,
  TableTbody,
  TableTfoot,
  TableTr,
  TableTh,
  TableTd,
  TableCaption,
  TableScrollContainer,
} from "./components/table";
export type {
  TableProps,
  TableLayout,
  TableSpacing,
  TableTheadProps,
  TableTbodyProps,
  TableTfootProps,
  TableTrProps,
  TableThProps,
  TableTdProps,
  TableCaptionProps,
  TableScrollContainerProps,
} from "./components/table";

// Skeleton
export { Skeleton, SkeletonText, SkeletonCircle } from "./components/skeleton";
export type {
  SkeletonProps,
  SkeletonAnimation,
  SkeletonTextProps,
  SkeletonCircleProps,
} from "./components/skeleton";

// Slider
export { Slider } from "./components/slider";
export type { SliderProps, SliderMark } from "./components/slider";

// Rating
export { Rating } from "./components/rating";
export type { RatingProps } from "./components/rating";

// SegmentedControl
export { SegmentedControl } from "./components/segmented-control";
export type {
  SegmentedControlProps,
  SegmentedControlItem,
} from "./components/segmented-control";

// FileInput
export { FileInput } from "./components/file-input";
export type { FileInputProps } from "./components/file-input";

// TagsInput
export { TagsInput } from "./components/tags-input";
export type { TagsInputProps } from "./components/tags-input";

// Autocomplete
export { Autocomplete } from "./components/autocomplete";
export type { AutocompleteProps, AutocompleteOption } from "./components/autocomplete";

// Export utilities
export { cn } from "./utils/cn";
