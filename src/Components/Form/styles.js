import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  formButtons: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  formStyle: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
  },
  formInput: {
    height: 80,
    fontSize: 20,
    opacity: 0.6,
    color: '#0e5090',
    borderWidth: 0.5,
    borderRadius: 15,
    width: '80%',
    marginBottom: 3,
    borderColor: '#d2d2d4',
  },
  backButton: {
    backgroundColor: '#0e5090',
    width: 150,
  },
  followButton: {
    width: 150,
  },
  scrollStyle: {flex: 1},
});
