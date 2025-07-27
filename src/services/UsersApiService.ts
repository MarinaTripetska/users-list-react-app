import axios, {type AxiosInstance} from "axios";
import type {User, UsersApiResponse} from "../types/UsersApiResponse.ts";

export default class UsersApiService {
    api: AxiosInstance;
    private searchAbortController: AbortController | null = null;

    constructor(baseURL: string) {
        this.api = axios.create({
            baseURL: baseURL,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',

            },
            timeout: 10000,
        })

        this.api.interceptors.response.use(
            (response) => {
                if (response.status >= 200 && response.status <= 300) {
                    return response;
                }

                throw new Error(`Error code: ${response.status}. ${response.statusText}`);
            },

            (error) => {
                if (axios.isCancel(error)) {
                    return null
                }

                if (error.code === 'ECONNABORTED') {
                    throw new Error('TIME_OUT_REQUEST')
                }

                throw error
            })
    }

    public static create(): UsersApiService {
        const baseURL = import.meta.env.DEV ? '/api' : import.meta.env.VITE_API_BASE_URL;
        return new UsersApiService(baseURL);
    }

    public async getAllUsers(): Promise<User[]> {
        const url = `/users`;
        const result = await this.api.get<UsersApiResponse>(url);
        return result.data.users;
    }

    public async getUsersByName(name: string): Promise<User[] | null> {
        if (this.searchAbortController) {
            this.searchAbortController.abort();
        }

        this.searchAbortController = new AbortController();

        const url = `/users/search?q=${name}`;
        const result = await this.api.get<UsersApiResponse>(url, {signal: this.searchAbortController.signal});
        if(result===null){
            return null;
        }

        return result.data.users;
    }

    public async getUserById(id: number): Promise<User> {
        const url = `/users/${id}`;
        const result = await this.api.get<User>(url);
        return result.data;
    }
}