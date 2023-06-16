import axios, {AxiosResponse} from "axios";
import {ResponseType} from "../todolist/todolistApi";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    headers: {
        'API-KEY': '434d1825-24d7-4c1d-8143-2edf92c40e38'
    }
})
export const authApi = {
    login(data: LoginType) {return instance.post<any, AxiosResponse<ResponseType<{ userId: number }>>, LoginType>(`/auth/login`, data)},
    me() {return instance.get<ResponseType<{ id: number, email: string, login: string }>>('/auth/me')},
    logout() {return instance.delete<ResponseType>('/auth/login')}
}

export type LoginType = {
    email: string,
    password: string,
    rememberMe: boolean


}



