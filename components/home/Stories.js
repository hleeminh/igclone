import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { USERS } from '../../data/users'

const Stories = () => {
  return (
    <View style={{ marginBottom: 13 }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {USERS.map((story, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={{alignItems: 'center', marginHorizontal: 8 }} 
              onPress={() => {
                alert(`${story.user}`)
              }}           
            >
              <View style={styles.storyCover}>
                <Image
                  source={{ uri: story.image }}
                  style={styles.storyImage}
                />
              </View>
              <Text
                style={{color: 'black', fontSize: 12}}
              >
                {
                  story.user.length > 11 ? story.user.slice(0, 10).toLowerCase() + '...' 
                  : story.user.toLowerCase()
                }
              </Text>
            </TouchableOpacity>            
          )
        })}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  storyCover: {
    height: 76,
    width: 76,
    backgroundColor: 'white',
    borderRadius: 38,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#f6258f',
    borderWidth: 2
  },
  storyImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderColor: 'gray',
    borderWidth: 0.1,
  },
})

export default Stories