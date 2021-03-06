import React, {useEffect, useState} from 'react';
import {View, Text, Image, ActivityIndicator} from 'react-native';
import {
  calculateRemainingDays,
  inRange,
  getUserDayBirth,
  getUserMonBirth,
  imagesHoroscope,
} from '../../Constants/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../../Components/CustomButton';
import styles from './styles';

const HoroscopeData = ({navigation}) => {
  const [remainingDays, setRemainingDays] = useState(0);
  const [userData, setUserData] = useState({});
  const [horoscopeInfo, setHoroscopeInfo] = useState();

  const onPressHandler = () => navigation.navigate('Home');
  useEffect(() => {
    const getDataUser = () => {
      try {
        AsyncStorage.getItem('userInfo').then(res => {
          const info = JSON.parse(res);
          setUserData(info);
          setRemainingDays(
            calculateRemainingDays(
              getUserMonBirth(info.Date),
              getUserDayBirth(info.Date),
              2021,
            ),
          );
          const currentUserDate = inRange(info.Date);
          return fetch(
            `http://horoscope-api.herokuapp.com/horoscope/today/${currentUserDate}`,
          )
            .then(response => response.json())
            .then(responseJson => {
              setHoroscopeInfo(responseJson);
            })
            .catch(error => {
              console.log(error);
            });
        });
      } catch (e) {
        console.log(e);
      }
    };
    getDataUser();
  }, []);
  return (
    <>
      {!horoscopeInfo ? (
        <View style={styles.spinner}>
          <Text style={styles.spinnerText}>Loading</Text>
          <ActivityIndicator
            size={120}
            color="#558DF6"
            style={styles.spinnerElement}
          />
        </View>
      ) : (
        <View style={styles.mainHoroscopeContainer}>
          <View style={styles.horoscopeImg}>
            <Image
              source={imagesHoroscope[horoscopeInfo?.sunsign]}
              style={styles.imageElement}
            />
          </View>
          <View style={styles.textContainer}>
            <Text
              style={styles.userNameText}>{`??Hola ${userData.Nombre}!`}</Text>
            {horoscopeInfo?.horoscope === '[]' ? (
              <Text
                style={
                  styles.errorMessage
                }>{`??LO SENTIMOS! no hay horoscopo disponible para ${horoscopeInfo?.sunsign}. VUELVE A INTENTARLO EN UNOS INSTANTES`}</Text>
            ) : (
              <View>
                <Text style={styles.textIntro}>
                  Tu hor??scopo para hoy dice que
                </Text>
                <Text
                  style={
                    styles.mainHoroscopetext
                  }>{`${horoscopeInfo?.horoscope}`}</Text>
              </View>
            )}
            <Text
              style={
                styles.remainingDaystext
              }>{`??Faltan ${remainingDays} d??as para tu cumplea??os!`}</Text>
          </View>
          <CustomButton
            titleCustomButton={'Continuar'}
            onPressAction={onPressHandler}
          />
        </View>
      )}
    </>
  );
};
export default HoroscopeData;
