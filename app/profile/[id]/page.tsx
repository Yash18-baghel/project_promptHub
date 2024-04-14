'use client'
import Loading from '@/components/Loading'
import Profile from '@/components/Profile'
import { Tpost, Tuser } from '@/utils/types'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const UserProfilePage = ({ params }: { params: any }) => {

    const router = useRouter();
    const userId = params.id;

    if (!userId) {
        router.push('/');
    }

    const [post, setPost] = useState<Tpost[]>([])
    const [user, setUser] = useState<Tuser>()
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        setIsLoading(true)

        try {
            const fetchUser = async () => {
                const response = await fetch(`/api/users/${userId}`);
                const data = await response.json();
                setUser(data);
            }

            const fetchPosts = async () => {
                const response = await fetch(`/api/users/${userId}/posts`);
                const data = await response.json();
                setPost(data);
            };

            if (userId) {
                fetchUser()
                fetchPosts();
            }
        } catch (error) {
            alert('Something Went Wrong!!!')
            console.log(error);
        } finally {
            setIsLoading(false)
        }

    }, [userId, isLoading]);



    if (isLoading || post.length == 0) return <Loading />


    return (
        <Profile
            name={user?.username || ''}
            desc={`Welcome to ${user?.username}'s profile page. Explore ${user?.username}'s exceptional prompts and be inspired by the power of their imagination`}
            data={post}
        />
    )
}

export default UserProfilePage