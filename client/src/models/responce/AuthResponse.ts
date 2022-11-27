export interface IUser {
    id: string;
    email: string;
    isActivated: boolean
}

export interface IAuthResponse {
    accessToken: string;
    refreshToken: string;
    user: IUser;
}