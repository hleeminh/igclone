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
  {
    name: 'Profile',
    active: 'https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-6/239641824_1730202753831365_2418328791873881218_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=8Gq7TfluUwUAX9YH1Jk&_nc_ht=scontent.fhan2-5.fna&oh=00_AfBLsjuliicMJCIsEE4nbcvHzqqz-QYwJm9dtnnetuD4FQ&oe=6401C848',
    inactive: 'https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-6/239641824_1730202753831365_2418328791873881218_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=8Gq7TfluUwUAX9YH1Jk&_nc_ht=scontent.fhan2-5.fna&oh=00_AfBLsjuliicMJCIsEE4nbcvHzqqz-QYwJm9dtnnetuD4FQ&oe=6401C848'
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

  // const auth = getAuth();
  // const user = auth.currentUser;
//   const [users, setUsers] = useState([])

//   useEffect(() => {
//     onSnapshot(collection(db, "users"), (snapshot) => {
//         setUsers(snapshot.docs.map(user => (
//             {id: user.id,  ... user.data()}
//         )))
//     })
// }, [])

  const Icon = ({ icon }) => (
    <TouchableOpacity onPress={() => setActiveTab(icon.name)}>
      <Image
        source={{ uri: activeTab === icon.name ? icon.active : icon.inactive }}
        style={[
          styles.icon,
          icon.name === 'Profile' ? styles.profilePic() : null,
          activeTab == 'Profile' && icon.name === activeTab ? styles.profilePic(activeTab): null
        ]}
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
        {/* <Image
          source={{uri: user.profile_picture}}
          style={styles.icon}
        /> */}
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