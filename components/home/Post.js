import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Divider } from 'react-native-elements'
import { Image } from 'react-native-elements/dist/image/Image'
import { POSTS } from '../../data/posts'

const postFooterIcons = [
  {
    name: 'Like',
    imageUrl: 'https://img.icons8.com/fluency-systems-regular/60/fffffff/like--v1.png',
    likedImageUrl: 'https://img.icons8.com/fluency-systems-filled/60/ff00000/like--v1.png'
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
  return (
    <View style={{ marginBottom: 20 }}>
      <Divider width={1} orientation='vertical' />
      <PostHeader post={post} />
      <PostImage post={post} />
      <View style={{
        marginHorizontal: 15,
        marginTop: 10,
      }}>
        <PostFooter post={post} />
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
      height: 500
    }}>
      <Image
        source={{ uri: post.imageUrl }}
        style={{
          height: '100%',
          resizeMode: 'cover'
        }}
      />
    </View>
  )
}

const PostFooter = ({ post }) => {
  return (
    <View style={{
      flexDirection: 'row',
      // justifyContent: 'space-between' //way1
    }}>
      <View style={styles.leftFooterIconsContainer}>
        <Icon
          imgUrl={postFooterIcons[0].imageUrl}
          imgStyle={styles.footerIcon}
        />
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
      >{post.likes.toLocaleString('en')} likes</Text>
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