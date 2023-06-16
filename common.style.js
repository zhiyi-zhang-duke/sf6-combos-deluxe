import { StyleSheet } from 'react-native';

// TODO: Clean this up so color: 'white' is not everywhere
export default StyleSheet.create({
  text: {
    color: 'white',
  },
  scrollview: {
    backgroundColor: 'black',
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'black',
  },
  button: {
    backgroundColor: 'transparent',
    color: 'white',
    padding: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 24,
    paddingBottom: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
  item: {
    marginBottom: 10,
    padding: 10,
  },
  key: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  value: {
    fontSize: 18,
    color: 'white',
  },
});
