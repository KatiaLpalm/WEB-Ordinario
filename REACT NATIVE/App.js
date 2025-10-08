import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { UseStateDemo,UseEffectDemo } from './componentes';

export default function App() {
  return (
    <View style={styles.container}>
      <UseEffectDemo/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});