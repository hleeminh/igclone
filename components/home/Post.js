import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Divider } from 'react-native-elements'
import { Image } from 'react-native-elements/dist/image/Image'
import {
  auth,
  db,
  getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut,
  getFirestore, collection, addDoc, getDocs, setDoc, updateDoc, doc, initializeFirestore, 
  collectionGroup, onSnapshot, where, query, serverTimestamp, arrayUnion, arrayRemove
} from '../../firebase'

const postFooterIcons = [
  {
    name: 'Like',
    imageUrl: 'https://img.icons8.com/fluency-systems-regular/60/fffffff/like--v1.png',
    likedImageUrl: 'https://img.icons8.com/fluency-systems-filled/60/ff0000/like--v1.png'
  },
  {
    name: 'Comment',
    imageUrl: 'https://img.icons8.com/fluency-systems-regular/60/fffffff/speech-bubble--v1',
  },
  {
    name: 'Share',
    imageUrl: 'https://img.icons8.com/fluency-systems-regular/60/fffffff/paper-plane--v1.png',
  },
  {
    name: 'Save',
    imageUrl: 'https://cdn.iconscout.com/icon/free/png-256/save-3244517-2701888.png',
  },
]



const Post = ({ post }) => {
  const auth = getAuth()
  const user = auth.currentUser
  const handleLike = (post) => {
    
    const currentLikeStatus = !post.likes_by_users.includes(
      user.email
    )
    
    updateDoc(doc(db, 'users', post.owner_email, 'posts', post.id), {
      likes_by_users: currentLikeStatus 
        ? arrayUnion(user.email)
        : arrayRemove(user.email)
    })
    .then(() => {
      console.log('Document successfully updated!');
    })
    .catch(error => {
      console.log('Error updating document: ', error);
    })
  }
  return (
    <View style={{ marginBottom: 20 }}>
      <Divider width={1} orientation='vertical' />
      <PostHeader post={post} />
      <PostImage post={post} />
      <View style={{
        marginHorizontal: 15,
        marginTop: 10,
      }}>
        <PostFooter post={post} handleLike={handleLike}/>
        <Likes post={post} />
        <Caption post={post} />
        <CommentSection post={post} />
        <Comment post={post} />
      </View>
    </View>
  )
}

const PostHeader = ({ post }) => {
  return (
    <View style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      margin: 10,
      alignItems: 'center'
    }}>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center'
      }}>
        <Image
          source={{ uri: post.profile_picture }}
          style={styles.avatar}
        />
        <Text style={{
          color: 'black',
          marginLeft: 5,
          fontWeight: '600'
        }}>{post.user}
        </Text>
      </View>

      <Text style={{
        color: 'black',
        fontSize: 20,
        fontWeight: '900',
        transform: [{
          rotate: '90deg'
        }]
      }}>...</Text>
    </View>
  )
}

const PostImage = ({ post }) => {
  return (
    <View style={{
      width: '100%',
      maxHeight: 400,   
    }}>
      <Image
        source={{ uri: post.imageUrl }}
        style={{
          height: '100%',
          width: '100%',
          resizeMode: 'cover',
        }}
      />
    </View>
  )
}

const PostFooter = ({ handleLike, post }) => {
  const auth = getAuth()
  const user = auth.currentUser
  return (
    <View style={{
      flexDirection: 'row',
      // justifyContent: 'space-between' //way1
    }}>
      <View style={styles.leftFooterIconsContainer}>
        <TouchableOpacity onPress={() => handleLike(post)}>
          <Image
            source={{ uri: post.likes_by_users.includes(user.email) 
              ? postFooterIcons[0].likedImageUrl
              : postFooterIcons[0].imageUrl
            }}
            style={styles.footerIcon}
          />
        </TouchableOpacity>
        
        {/* <Icon
          imgUrl={postFooterIcons[0].imageUrl}
          imgStyle={styles.footerIcon}
        /> */}
        <Icon
          imgUrl={postFooterIcons[1].imageUrl}
          imgStyle={[styles.footerIcon, styles.commentIcon]}
        />
        <Icon
          imgUrl={postFooterIcons[2].imageUrl}
          imgStyle={[styles.footerIcon, styles.shareIcon]}
        />
      </View>
      {/* way 2 */}
      <View style={{ flex: 1, alignItems: 'flex-end' }}>
        <Icon
          imgUrl={postFooterIcons[3].imageUrl}
          imgStyle={styles.footerIcon}
        />
      </View>

    </View>
  )
}

const Icon = ({ imgStyle, imgUrl }) => {
  return (
    <TouchableOpacity>
      <Image style={imgStyle} source={{ uri: imgUrl }} />
    </TouchableOpacity>
  )

}

const Likes = ({ post }) => {
  return (
    <View style={{
      flexDirection: 'row',
      marginTop: 5
    }}>
      <Text
        style={{
          color: 'black',
          fontWeight: '600'
        }}
      >{post.likes_by_users.length.toLocaleString('en')} likes</Text>
    </View>

  )
}

const Caption = ({ post }) => {
  return (
    <View style={{marginTop: 3}}>
      <Text style={{ color: 'black' }}>
        <Text style={{fontWeight: '600'}}>{post.user}</Text>
        <Text style={{}}> {post.caption}</Text>
      </Text>
    </View>
  )
}

const CommentSection = ({post}) => (
  <View style={{marginTop: 3}}>
    {!!post.comments.length &&
      (
        <Text style={{color: 'gray'}}>
          View {post.comments.length > 1 ? 'all ': ''}
          {post.comments.length}
          {post.comments.length > 1 ? ' comments': ' comment'}
        </Text>
      )
    }   
  </View>
)

const Comment = ({post}) => (
  <View>
    {post.comments.map((comment, index) => (
      <View key={index} style={{flexDirection: 'row'}}>
        <Text style={{color: 'black'}}>
          <Text style={{fontWeight: '600'}}>{comment.user}</Text>
          {' '}
          <Text>{comment.comment}</Text>
        </Text>
      </View>
    ))}   
  </View>
    
)

const styles = StyleSheet.create({
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderColor: 'gray',
    borderWidth: 0.1,
  },
  footerIcon: {
    height: 30,
    width: 30,
  },
  leftFooterIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '32%'
  },
  commentIcon: {
    height: 28,
    width: 28,
    transform: [{rotate: '270deg'}]
  },
})

export default Post