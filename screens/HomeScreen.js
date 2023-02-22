import { View, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import Header from '../components/home/Header'
import Stories from '../components/home/Stories'
import Post from '../components/home/Post'
import { POSTS } from '../data/posts'
import BottomTabs from '../components/home/BottomTabs'
import { bottomTabIcons } from '../components/home/BottomTabs'
const HomeScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Header />
            
            <ScrollView>
                <Stories />
                {POSTS.map((post, index) => {
                    return(
                        <Post 
                            key={index}
                            post={post}
                        />
                    )
                })}
                
            </ScrollView>
            <BottomTabs icons={bottomTabIcons}/>

            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
})

export default HomeScreen
