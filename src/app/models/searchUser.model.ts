export interface SearchedUser {
    id: number;
    displayName: string;
    picture_url: string;
    phoneNumber: string;
}

export interface NotUser {
    displayName: string;
    phoneNumber: string;
}


export interface SearchResponse {
 users: SearchedUser[];
 notUsers: NotUser[ ];
}
