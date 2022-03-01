import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { AuthContext } from './Context';

export default function Main({navigation}) {
  const { signOut } = React.useContext(AuthContext);
  return (
    <View>
        <Text>
            Main page
        </Text>
        <TouchableOpacity onPress={() => { signOut()}}>
          <LinearGradient colors={['#08d4c4', '#01ab9d']} >
            <Text style="styles.textsign" >Sign out!</Text>
          </LinearGradient>
          </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginTop: 40,
        backgroundColor: 'yellow'
        
    },
    textsign: {
        color: 'white',
    }
})