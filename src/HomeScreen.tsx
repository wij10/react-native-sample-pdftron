/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  Button,
} from 'react-native';
import { pick } from '@react-native-documents/picker';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  Pdf: { path: string };
};

function HomeScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'Home'>>();
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.buttonContainer}>
        <Button
          title="Pdf 1"
          onPress={() => {
            navigation.navigate('Pdf', {
              path: 'https://pdftron.s3.amazonaws.com/downloads/pl/PDFTRON_mobile_about.pdf',
            });
          }}
        />
        <Button
          title="Pdf 2"
          onPress={() => {
            navigation.navigate('Pdf', {
              path: 'https://www.princexml.com/samples/textbook/somatosensory.pdf',
            });
          }}
        />
        <Button
          title="open file"
          onPress={async () => {
            try {
              const [result] = await pick({
                mode: 'open',
              });
              console.log(result);
              navigation.navigate('Pdf', {
              path: result.uri,
            });
            } catch (err) {
              console.error('Error picking file:', err);
            }
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    width: 200,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default HomeScreen;
