export type Tuser = {
    _id: string,
    username: string
    email: string
    image: string
}

export type Tpost = {
    _id: string
    creator: Tuser
    prompt: string
    tag: string
    likes: string[]
}