import { View, Text, TextInput, Image, Button} from 'react-native'
import React, { useEffect, useState } from 'react'
import { Divider,  } from 'react-native-elements'
import validUrl from 'valid-url'
import * as Yup from 'yup'
import { Formik } from 'formik'
import {
  auth,
  db,
  getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut,
  getFirestore, collection, addDoc, getDocs, setDoc, updateDoc, doc, initializeFirestore, collectionGroup, 
  onSnapshot, where, query,serverTimestamp
} from '../../firebase';
import { async } from '@firebase/util'

const PLACEHOLDER_IMG = 'https://www.kurin.com/wp-content/uploads/placeholder-square.jpg'

const uploadPostSchema = Yup.object().shape({
  imageUrl: Yup.string().url().required('A URL is required'),
  caption: Yup.string().max(2200, 'Caption has reached the character limit.')
})

const FormikPostUploader = ({ navigation }) => {

  const [thumbnailUrl, setThumbnailUrl] = useState(PLACEHOLDER_IMG)

  const [currentLoggedInUser, setCurrentLoggedInUser] = useState(null)
  const getUsername = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    const q = query(collection(db, "users"), where("userId", "==", user.uid))
    const unsub1 = onSnapshot(q, (snapshot) => {
      snapshot.docs.map(doc => {
        setCurrentLoggedInUser({
          username: doc.data().username,
          profile_picture: doc.data().profile_picture
        })
      })
    }) 
    return unsub1
  }
  useEffect(() => {
    getUsername()
  }, [])

  const uploadPostToFirebase = (imageUrl, caption) => {
    const auth = getAuth();
    const user = auth.currentUser;
    const addPost = addDoc(collection(db, 'users', user.email, 'posts' ), {
      imageUrl: imageUrl,
      user: currentLoggedInUser.username,
      profile_picture: currentLoggedInUser.profile_picture,
      userId: user.uid,
      owner_email: user.email,
      caption: caption,
      createAt: serverTimestamp(),
      likes: 0,
      likes_by_users: [],
      comments: [],   
    })
    .then(() => navigation.goBack()) 
    return addPost  
  }

  return (
    <Formik
      initialValues={{ caption: '', imageUrl: ''}}
      onSubmit={values => {
        uploadPostToFirebase(values.imageUrl, values.caption)
      }}
      validationSchema={uploadPostSchema}
      validateOnMount={true}
    >
      {({ handleBlur, handleChange, handleSubmit, values, errors, isValid }) => (
        <>
          <View
            style={{
              marginVertical: 20,
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
          >
            <Image
              source={{ uri: validUrl.isUri(thumbnailUrl) ? thumbnailUrl : PLACEHOLDER_IMG }}
              style={{
                width: 100,
                height: 100,
              }}
            />
            <View
              style={{ flex: 1, justifyContent: 'center', marginLeft: 10 }}
            >
              <TextInput
                style={{
                  fontSize: 20
                }}
                placeholder='Write a caption ...'
                multiline={true}
                onChangeText={handleChange('caption')}
                onBlur={handleBlur('caption')}
                value={values.caption}
              />
            </View>

          </View>
          <Divider width={0.2} orientation='vertical' />
          <TextInput
            onChange={event => setThumbnailUrl(event.nativeEvent.text)}
            style={{
              fontSize: 16
            }}
            placeholder='Enter Image Url'
            onChangeText={handleChange('imageUrl')}
            onBlur={handleBlur('imageUrl')}
            value={values.imageUrl}
          />
          {errors.imageUrl && (
            <Text style={{ fontSize: 12, color: 'red' }}>
              {errors.imageUrl}
            </Text>
          )}
          <Button
            onPress={handleSubmit}
            title='Share'
            disabled={!isValid}
          />
        </>
      )}
    </Formik>
  )
}

export default FormikPostUploader