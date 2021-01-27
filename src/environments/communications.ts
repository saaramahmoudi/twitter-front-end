import { MediaType } from "src/app/services/tweet.service";








export interface Url{
    createPost: string;
    toggleLikePost: string;
    toggleRetweetPost: string;
    getPost: string;

    getUser: string;
    updateTagUser: string;
    createUser: string;
    checkUser: string;
    followUser: string;
} 


export interface CreatePostResource{
    text: string;
    mediaType?: MediaType;
}

export interface ToggleLikeInterface{
    id: string;
}

export interface ToggleRetweetInterface{
    id: string;
}

export interface GetPostByIdResource{
    id: string;
}


export interface GetUserResource {
    email: string;
} 

export interface UpdateTagUserResource{
    tag: string;
}

export interface CreateUserResource {

} 


export interface CheckDocResource{
    
} 


export interface ToggleFollowResource{
    userId: string;
}

