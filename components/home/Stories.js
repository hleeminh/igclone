import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React, {useState, useEffect} from 'react'
import { USERS } from '../../data/users'
import {
  auth,
  db,
  getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut,
  getFirestore, collection, addDoc, getDocs, setDoc, updateDoc, doc, initializeFirestore, 
  collectionGroup, onSnapshot, where, query, serverTimestamp, arrayUnion, arrayRemove
} from '../../firebase'


const Stories = () => {

  const [users, setUsers] = useState([])

  useEffect(() => {
      onSnapshot(collection(db, "users"), (snapshot) => {
          setUsers(snapshot.docs.map(user => (
              {id: user.id,  ... user.data()}
          )))
      })
  }, [])

  return (
    <View style={{ marginBottom: 13 }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {users.map((user, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={{alignItems: 'center', marginHorizontal: 8 }} 
              onPress={() => {
                alert(`${user.username}`)
              }}           
            >
              <View style={styles.storyCover}>
                <Image
                  source={{ uri: user.profile_picture}}
                  style={styles.storyImage}
                />
              </View>
              <Text
                style={{color: 'black', fontSize: 12}}
              >
                {
                  user.username.length > 11 ? user.username.slice(0, 10).toLowerCase() + '...' 
                  : user.username.toLowerCase()
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