import React from 'react';
import {View, Image} from 'react-native';
import styles from './styles';
import CustomButton from '../../Components/CustomButton';
import {titleButton} from '../../Constants/constants';
const imgMujer = require('../../Assets/mujer.png');

const Home = ({navigation}) => {
  const onPressHandler = () => navigation.navigate('Gender');

  return (
    <View style={styles.mainHomeContainer}>
      <Image source={imgMujer} style={styles.damaImg} />
      <CustomButton
        titleCustomButton={titleButton}
        onPressAction={onPressHandler}
      />
    </View>
  );
};

export default Home;
