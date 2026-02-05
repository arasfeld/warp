import './global.css';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, View } from 'react-native';
import { ThemeProvider, Button } from '@warp/react-native';

export default function App() {
  return (
    <ThemeProvider>
      <ScrollView contentContainerClassName="flex-grow bg-background items-center justify-center p-5 gap-6">
        <View className="gap-4 w-full items-center">
          <Button
            variant="primary"
            size="md"
            onPress={() => console.log('primary pressed')}
          >
            Primary Button
          </Button>

          <Button
            variant="secondary"
            size="md"
            onPress={() => console.log('secondary pressed')}
          >
            Secondary Button
          </Button>

          <Button
            variant="outline"
            size="md"
            onPress={() => console.log('outline pressed')}
          >
            Outline Button
          </Button>
        </View>

        <View className="gap-4 w-full items-center">
          <Button
            variant="primary"
            size="sm"
            onPress={() => console.log('small pressed')}
          >
            Small Button
          </Button>

          <Button
            variant="primary"
            size="md"
            onPress={() => console.log('medium pressed')}
          >
            Medium Button
          </Button>

          <Button
            variant="primary"
            size="lg"
            onPress={() => console.log('large pressed')}
          >
            Large Button
          </Button>
        </View>

        <View className="gap-4 w-full items-center">
          <Button
            variant="primary"
            size="md"
            disabled
            onPress={() => console.log('disabled pressed')}
          >
            Disabled Button
          </Button>
        </View>
      </ScrollView>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
