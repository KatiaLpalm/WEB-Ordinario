import { Modal, StyleSheet, View, Text } from 'react-native';


export default () => {
     return (
              <Modal
                animationType='slide'
                transparent={true}
                visible={true}
              >
                <View style={styles.center}>
                  <View style={styles.modalView}>
                    <Text>❤️o(*≧▽≦)ツ┏━┓❤️</Text>
                  </View>
                </View>
              </Modal>
    );
}

const styles = StyleSheet.create({
  modalView:{
    backgroundColor:'#fff',
    borderRadius:10,
    padding:20,
    shadowColor:'#000',
    shadowOffset:{
      width:0,
      height:10,
    }
  },
})