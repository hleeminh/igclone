import { View, Text, TextInput, StyleSheet, Pressable, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { Divider } from 'react-native-elements'
import * as Yup from 'yup'
import { Formik } from 'formik'
import * as Validator from 'email-validator'
import {
    auth,
    db,
    getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut,
    getFirestore, collection, addDoc, getDocs, setDoc, updateDoc, doc, initializeFirestore, collectionGroup, onSnapshot
} from '../../firebase';

const SignupFormSchema = Yup.object().shape({
    email: Yup.string().email().required('An email is required.'),
    username: Yup.string()
        .required()
        .min(2, 'A username is required.'),
    password: Yup.string()
        .required()
        .min(6, 'Your password has to have at least 6 characters.')
})

const SignupForm = ({ navigation }) => {

    const getRandomProfilePicture = async () => {
        const response = await fetch('https://randomuser.me/api')
        const data = await response.json()
        return data.results[0].picture.large
    }

    const onSingup = async (email, password, username) => {
        await createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {              
                console.log('User created successfully', email, password);
                try {
                    const docRef = await setDoc(doc(db, "users", email), {
                        userId: userCredential.user.uid,
                        username: username,
                        email: email,
                        profile_picture: await getRandomProfilePicture(),
                    });
                    
                } catch (e) {
                    console.error("Error adding document: ", e);
                }
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage);
            });
    }

    return (
        <View style={{ flex: 1 }}>
            <Formik
                initialValues={{ email: '', password: '' , username: ''}}
                onSubmit={values => {
                    onSingup(values.email, values.password, values.username)
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
                                        values.username.length == 0 || values.username.length >= 2
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