import { View, Text, TextInput, StyleSheet, Pressable, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Divider } from 'react-native-elements'
import * as Yup from 'yup'
import { Formik } from 'formik'
import * as Validator from 'email-validator'

const SignupFormSchema = Yup.object().shape({
    email: Yup.string().email().required('An email is required.'),
    username: Yup.string()
        .required()
        .min(2, 'A username is required.'),
    password: Yup.string()
        .required()
        .min(6, 'Your password has to have at least 6 characters.')
})

const SignupForm = ({navigation}) => {

    return (
        <View style={{ flex: 1 }}>
            <Formik
                initialValues={{ email: '', username: '', password: '' }}
                onSubmit={values => {
                    console.log(values);
                }}
                validationSchema={SignupFormSchema}
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
                                placeholder='Email'
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
                                        values.username.length == 0 || values.username.length >= 6
                                        ? '#e6e6e6'
                                        : 'red'
                                }
                            ]}                        
                        >
                            <TextInput
                                placeholder='Username'
                                autoCapitalize='none'
                                keyboardType='email-address'
                                textContentType='username'
                                style={styles.textInput}
                                onChangeText={handleChange('username')}
                                onBlur={handleBlur('username')}
                                value={values.username}
                            />
                        </View>
                        <View 
                            style={[
                                styles.inputField,
                                {
                                    borderColor:
                                        values.password.length == 0 || values.password.length >= 2
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
                            <Text style={{ color: 'white', fontSize: 16 }}>Sign Up</Text>
                        </Pressable>
                        <View style={{ alignItems: 'flex-end' }}>
                            <Text>Forgot password ?</Text>
                        </View>
                        <View style={{ flex: 1 }} />
                        <Divider width={1} orientation='vertical' />

                        <View style={{ alignItems: 'center', height: 50, justifyContent: 'center', flexDirection: 'row' }}>
                            <Text>Already have an account ?</Text>
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <Text style={{ color: 'black' }}> Login now</Text>
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

export default SignupForm