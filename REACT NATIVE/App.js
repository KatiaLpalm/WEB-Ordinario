import React, { useContext, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { AuthProvider, AuthContext } from './AuthContext';

const Stack = createNativeStackNavigator();

/* ---------- Screens ---------- */

// 1) Login: pide un “token” (dummy) y entra
function LoginScreen() {
  const { login } = useContext(AuthContext);
  const [token, setToken] = useState(''); // empieza vacío

  const handleLogin = () => {
    const t = token.trim();
    if (t.length === 0) {
      alert('Por favor ingresa un token válido');
      return;
    }
    login(t);
  };

  return (
    <View style={styles.center}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        placeholder="Escribe un token"
        value={token}
        onChangeText={setToken}
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.input}
      />
      <Button title="Ingresar" onPress={handleLogin} disabled={token.trim().length === 0} />
    </View>
  );
}

// 2) Home: menú a las demás pantallas
function HomeScreen({ navigation }) {
  const { userToken } = useContext(AuthContext);

  return (
    <View style={styles.center}>
      <Text style={styles.title}>Home (token: {String(userToken)})</Text>

      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Calculator')}>
        <Text style={styles.btnText}>Calculadora</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Name')}>
        <Text style={styles.btnText}>Escribe tu nombre</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Random')}>
        <Text style={styles.btnText}>Generar número aleatorio</Text>
      </TouchableOpacity>
    </View>
  );
}

// 3) Calculadora (+, -, ×, ÷ simple)
function CalculatorScreen() {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [res, setRes] = useState(null);

  const nA = parseFloat(a);
  const nB = parseFloat(b);
  const valid = !isNaN(nA) && !isNaN(nB);

  return (
    <View style={styles.center}>
      <Text style={styles.title}>Calculadora</Text>
      <TextInput style={styles.input} keyboardType="numeric" placeholder="Número A" value={a} onChangeText={setA} />
      <TextInput style={styles.input} keyboardType="numeric" placeholder="Número B" value={b} onChangeText={setB} />

      {/* Si 'gap' te da error, usa este contenedor con separadores */}
      <View style={styles.row}>
        <View style={styles.rowBtn}><Button title="+" onPress={() => valid && setRes(nA + nB)} /></View>
        <View style={styles.rowBtn}><Button title="-" onPress={() => valid && setRes(nA - nB)} /></View>
        <View style={styles.rowBtn}><Button title="×" onPress={() => valid && setRes(nA * nB)} /></View>
        <View style={styles.rowBtn}><Button title="÷" onPress={() => valid && setRes(nB !== 0 ? nA / nB : '∞')} /></View>
      </View>

      <Text style={styles.result}>Resultado: {res === null ? '—' : res}</Text>
    </View>
  );
}

// 4) Escribe tu nombre y lo imprime
function NameScreen() {
  const [name, setName] = useState('');
  return (
    <View style={styles.center}>
      <Text style={styles.title}>Tu Nombre</Text>
      <TextInput style={styles.input} placeholder="Escribe tu nombre" value={name} onChangeText={setName} />
      <Text style={{ marginTop: 12, fontSize: 18 }}>Hola {name ? name : '👋'}</Text>
    </View>
  );
}

// 5) Generador aleatorio
function RandomScreen() {
  const [n, setN] = useState(null);
  return (
    <View style={styles.center}>
      <Text style={styles.title}>Número Aleatorio</Text>
      <Button title="Generar (1–100)" onPress={() => setN(1 + Math.floor(Math.random() * 100))} />
      <Text style={{ marginTop: 12, fontSize: 22 }}>{n ?? '—'}</Text>
    </View>
  );
}

/* ---------- Root Navigator protegido por token ---------- */

function RootNavigator() {
  const { userToken, logout, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Cargando sesión…</Text>
      </View>
    );
  }

  // Sin token: solo se muestra LoginScreen
  if (!userToken) {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerTitle: 'Iniciar sesión' }} />
      </Stack.Navigator>
    );
  }

  // Con token: se habilitan las 4 pantallas + Home (todas protegidas)
  return (
    <Stack.Navigator
      screenOptions={{
        headerRight: () => <Button title="Logout" onPress={logout} />,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Menú' }} />
      <Stack.Screen name="Calculator" component={CalculatorScreen} options={{ title: 'Calculadora' }} />
      <Stack.Screen name="Name" component={NameScreen} options={{ title: 'Tu Nombre' }} />
      <Stack.Screen name="Random" component={RandomScreen} options={{ title: 'Aleatorio' }} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}

/* ---------- estilos básicos ---------- */
const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: '600', marginBottom: 12 },
  input: { width: '90%', borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginVertical: 8 },
  btn: { width: '90%', padding: 12, borderRadius: 10, backgroundColor: '#111827', marginVertical: 6, alignItems: 'center' },
  btnText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  result: { marginTop: 8, fontSize: 18 },

  // reemplazo de 'gap'
  row: { flexDirection: 'row', marginVertical: 8, justifyContent: 'center' },
  rowBtn: { marginHorizontal: 4 },
});
