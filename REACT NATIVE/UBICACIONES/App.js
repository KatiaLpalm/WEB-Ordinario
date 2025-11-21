import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View} from 'react-native';
import { Map, Modal, Panel } from './components';

export default function App() {
  const handleLongPress=()=>{
    console.log(punto)

  }
  return (
    <View style={styles.container}>
      <Map>
        longPress={handleLongPress}
      </Map>
      <Map/>
      <Modal/>
      <Panel/>
    </View>
  );
}

const styles = StyleSheet.create({
  center:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});