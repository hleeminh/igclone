import { View, Text, TextInput, Image, Button} from 'react-native'
import React, { useState } from 'react'
import { Divider,  } from 'react-native-elements'
import validUrl from 'valid-url'
import * as Yup from 'yup'
import { Formik } from 'formik'


const PLACEHOLDER_IMG = 'https://www.kurin.com/wp-content/uploads/placeholder-square.jpg'

const uploadPostSchema = Yup.object().shape({
  imageUrl: Yup.string().url().required('A URL is required'),
  caption: Yup.string().max(2200, 'Caption has reached the character limit.')
})

const FormikPostUploader = ({navigation}) => {

  const [thumbnailUrl, setThumbnailUrl] = useState(PLACEHOLDER_IMG)

  return (
    <Formik
      initialValues={{ imageUrl: '', caption: '' }}
      onSubmit={values => {
        console.log(values)
        console.log('Your post was submitted successfully.');
        navigation.goBack()
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