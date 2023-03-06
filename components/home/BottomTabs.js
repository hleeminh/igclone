import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Divider, Image } from 'react-native-elements'

export const bottomTabIcons = [
  {
    name: 'Home',
    active: 'https://img.icons8.com/fluency-systems-filled/60/fffffff/home--v1.png',
    inactive: 'https://img.icons8.com/fluency-systems-regular/60/fffffff/home--v1.png'
  },
  {
    name: 'Search',
    active: 'https://img.icons8.com/fluency-systems-filled/60/fffffff/search--v1.png',
    inactive: 'https://img.icons8.com/fluency-systems-regular/60/fffffff/search--v1.png'
  },
  {
    name: 'Plus',
    active: 'https://img.icons8.com/fluency-systems-filled/60/fffffff/plus-2-math.png',
    inactive: 'https://img.icons8.com/fluency-systems-regular/60/fffffff/plus-2-math.png'
  },
  {
    name: 'Reels',
    active: 'https://img.icons8.com/ios-filled/60/fffffff/instagram-reel.png',
    inactive: 'https://img.icons8.com/ios/60/fffffff/instagram-reel.png'
  },
]

import {
  auth,
  db,
  getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut,
  getFirestore, collection, addDoc, getDocs, setDoc, updateDoc, doc, initializeFirestore, 
  collectionGroup, onSnapshot, where, query, serverTimestamp, arrayUnion, arrayRemove
} from '../../firebase'

const BottomTabs = ({ icons }) => {
  
  const [activeTab, setActiveTab] = useState('Home')

  const auth = getAuth();
  const user = auth.currentUser;
  const [userLoggedin, setUserLoggedin] = useState(null)

  useEffect(() => {
    onSnapshot(doc(db, "users", user.email), (doc) => {
      const currentUserPic = doc.data().profile_picture
      setUserLoggedin(currentUserPic)
    })
}, [])

  const Icon = ({ icon }) => (
    <TouchableOpacity onPress={() => setActiveTab(icon.name)}>
      <Image
        source={{ uri: activeTab === icon.name ? icon.active : icon.inactive }}
        style={styles.icon}
      />
    </TouchableOpacity>
  )

  return (
    <View style={styles.wrapper}>
      <Divider width={1} orientation='vertical'/>
      <View style={styles.container}>
        {icons.map((icon, index) => (
          <Icon key={index} icon={icon} />
        ))}
        <Image
          source={{uri: userLoggedin}}
          style={{
            borderRadius: 15,
            width: 30, 
            height: 30
          }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  // wrapper:{
  //   position: 'absolute',
  //   width: '100%',
  //   bottom: '3%',
  //   zIndex: 999,
  //   backgroundColor: 'white'
  // },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 70,
    paddingTop: 10
  },
  icon: {
    height: 30,
    width: 30,
    resizeMode: 'contain'
  },
  profilePic: (activeTab = '') => ({
    borderRadius: 50,
    borderColor: 'black',
    borderWidth: activeTab === 'Profile' ? 2: 0
  })
})

export default BottomTabs