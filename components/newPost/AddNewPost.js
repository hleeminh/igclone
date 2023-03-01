import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import FormikPostUploader from './FormikPostUploader'

const AddNewPost = ({navigation}) => (
    <View style={styles.container}>
        <Header navigation={navigation}/>
        <FormikPostUploader navigation={navigation}/>
    </View>
)
    
const Header = ({navigation}) => {
    return (
        <View style={styles.headerContainer}>
            <TouchableOpacity
                onPress={() => navigation.goBack()}
            >
                {/* <Image
                    source={{ uri: 'https://img.icons8.com/fluency-systems-regular/fffffff/60/back.png' }}
                    style={{
                        width: 30,
                        height: 30,
                        resizeMode: 'contain'
                    }}
                /> */}
                <Icon name='arrow-left' style={{
                    color: 'black',
                    fontWeight: '100',
                    fontSize: 30,
                    
                }}/>
            </TouchableOpacity>
            <Text style={styles.headerText}>New Post</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 15
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerText:{
        color: 'black',
        fontSize: 20,
        fontWeight: '700',
        marginLeft: 20
    }
})

export default AddNewPost