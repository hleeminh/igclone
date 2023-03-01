import { View, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../components/home/Header'
import Stories from '../components/home/Stories'
import Post from '../components/home/Post'
import BottomTabs from '../components/home/BottomTabs'
import { bottomTabIcons } from '../components/home/BottomTabs'

import {
    auth,
    db,
    getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut,
    getFirestore, collection, addDoc, getDocs, setDoc, updateDoc, doc, initializeFirestore, 
    collectionGroup, onSnapshot, where, query, serverTimestamp, arrayUnion, arrayRemove
} from '../firebase';


const HomeScreen = ({navigation}) => {
    const [posts, setPosts] = useState([])
    

    useEffect(() => {
        onSnapshot(collectionGroup(db, "posts"), (snapshot) => {
            setPosts(snapshot.docs.map(post => (
                {id: post.id,  ... post.data()}
            )))
        })       
    }, [])



    return (
        <SafeAreaView style={{
            flex: 1, 
            backgroundColor: 'white'
        }}>
            <Header navigation={navigation}/>
            
            <ScrollView>
                <Stories />
                {posts.map((post, index) => {
                    return(
                        <Post 
                            key={index}
                            post={post}
                        />
                    )
                })}
                
            </ScrollView>

                    <BottomTabs 
                        icons={bottomTabIcons}
                    />

            

            
        </SafeAreaView>
    )
}

export default HomeScreen
