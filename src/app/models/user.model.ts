export class User {
    constructor(
        private _token: string,
        public id: number,
        public email: string,
        public name: string,
        public username: string,
        public profileImage: string,
        public creationTime: string,
        public phone: string
    ) {}


    get token() {
        return this._token;
    }
}

export interface UserResponse {
    status: number;
    message: string;
    token: string;
    user: {
        users_id: number;
        users_phone: string;
        users_username: string;
        users_name: string;
        users_email: string;
        user_picture_url: string;
        users_creation_time: string;
    };
}
