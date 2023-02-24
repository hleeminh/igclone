import { View, Text, TextInput, StyleSheet, Pressable, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { Divider } from 'react-native-elements'
import * as Yup from 'yup'
import { Formik } from 'formik'
import * as Validator from 'email-validator'
import firebase from '../../firebase'

const LoginFormSchema = Yup.object().shape({
    email: Yup.string().email().required('An email is required.'),
    password: Yup.string()
        .required()
        .min(6, 'Your password has to have at least 6 characters.')
})

const LoginForm = ({navigation}) => {
    const onLogin = async (email, password) => {
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password)
            console.log('Firebase Login Successfull: ', email, password);
        }catch(error) {
            Alert.alert(error.message)
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <Formik
                initialValues={{ email: '', password: '' }}
                onSubmit={values => {
                    onLogin(values.email, values.password)
                }}
                validationSchema={LoginFormSchema}
                validateOnMount={true}
            >
                {({ handleBlur, handleChange, handleSubmit, values, errors, isValid }) => (
                    <>
                        <View 
                            style={[
                                styles.inputField,
                                {
                                    borderColor:
                                        values.email.length == 0 || Validator.validate(values.email)
                                        ? '#e6e6e6'
                                        : 'red'
                                }
                            ]}                        
                        >
                            <TextInput
                                placeholder='Phone number, username or email'
                                autoCapitalize='none'
                                keyboardType='email-address'
                                textContentType='emailAddress'
                                autoFocus={true}
                                style={styles.textInput}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                            />
                        </View>
                        <View 
                            style={[
                                styles.inputField,
                                {
                                    borderColor:
                                        values.password.length == 0 || values.password.length >= 6
                                        ? '#e6e6e6'
                                        : 'red'
                                }
                            ]}
                        >
                            <TextInput
                                placeholder='Password'
                                autoCapitalize='none'
                                textContentType='password'
                                secureTextEntry={true}
                                autoCorrect={false}
                                style={styles.textInput}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                            />
                        </View>

                        <Pressable
                            onPress={handleSubmit}
                            style={styles.buttonLogin(isValid)}
                            disabled={!isValid}
                        >
                            <Text style={{ color: 'white', fontSize: 16 }}>Log In</Text>
                        </Pressable>
                        <View style={{ alignItems: 'flex-end' }}>
                            <Text>Forgot password ?</Text>
                        </View>
                        <View style={{ flex: 1 }} />
                        <Divider width={1} orientation='vertical' />

                        <View style={{ alignItems: 'center', height: 50, justifyContent: 'center', flexDirection: 'row' }}>
                            <Text>Don't have an account ?</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('SignupScreen')}>
                                <Text style={{ color: 'black' }}> Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )}

            </Formik>
        </View>
    )
}

const styles = StyleSheet.create({
    inputField: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#e6e6e6',
        backgroundColor: '#fafafa',
        marginBottom: 15,
        paddingHorizontal: 10
    },
    textInput: {
        fontSize: 16,
        height: 50
    },
    buttonLogin: (isValid) => ({
        minHeight: 50,
        backgroundColor: isValid ? '#0096f6' : '#9acaf7',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginBottom: 15
    })
})

export default LoginForm