import { USERS } from "./users";

export const POSTS = [
    {
        imageUrl: 'https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-6/332336047_882365562986619_8782417569941144495_n.jpg?stp=dst-jpg_p180x540&_nc_cat=109&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=ZnXBunuMAtsAX94qQQ2&_nc_ht=scontent.fhan2-5.fna&oh=00_AfDErOrwYKT54wFPooDjlnnJizX9cTNR1aov9x8Tl68rGw&oe=63F8E474',
        user: USERS[0].user,
        likes: 1234,
        caption: `Atomic Heart <3, Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.`,
        profile_picture: USERS[0].image,
        comments: [
            {
                user: 'nguyenlinh',
                comment: 'Its gameplay seems to look like Bioshock.'
            },
            // {
            //     user: 'leohoang',
            //     comment: 'I have played it for 3 hours, I love it.'
            // }    
        ]
    },
    {
        imageUrl: 'https://bizweb.dktcdn.net/100/452/569/products/the-legend-of-zelda-tears-of-the-kingdom-slideshow-1-1672898257353.jpg?v=1672898362833',
        user: USERS[1].user,
        likes: 5678,
        caption: `Can't wait to play this :3.`,
        profile_picture: USERS[1].image,
        comments: [
            {
                user: 'nguyenvancong',
                comment: 'When is it gonna release ?'
            },
            {
                user: 'manhquyen',
                comment: `I expect it's better than predecessor`
            }    
        ]
    },
    {
        imageUrl: 'https://media.contentapi.ea.com/content/dam/ea/starwars/star-wars-jedi-survivor/homepage/images/2022/11/starwarsjedi-hero-lg-top-xl-16x9.jpg.adapt.crop16x9.1920w.jpg',
        user: USERS[2].user,
        likes: 4321,
        caption: `Pre-order Star Wars Jedi: Survivor !!!`,
        profile_picture: USERS[2].image,
        comments: [
            // {
            //     user: 'nguyenvancong',
            //     comment: 'When is it gonna release ?'
            // },
            // {
            //     user: 'manhquyen',
            //     comment: `I expect it's better than predecessor`
            // }    
        ]
    },    
]