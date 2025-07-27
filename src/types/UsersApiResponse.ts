export interface User {
    id: number

    firstName: string
    lastName: string
    username: string

    age: number
    gender: string

    email: string
    phone: string

    birthDate: string
    image: string
}


export interface UsersApiResponse {
    users: User[]
    total: number
    skip: number
    limit: number
}

