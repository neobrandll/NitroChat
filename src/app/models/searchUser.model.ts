export interface SearchedUser {
    users_id: number;
    users_phone: string;
    users_username: string;
    users_name: string;
    users_email: string;
    user_picture_url: string;
    users_creation_time: string;
}


export interface SearchResponse {
    status: 200;
    data: SearchedUser[];
}
