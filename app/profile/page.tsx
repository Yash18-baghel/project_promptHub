'use client'
import Profile from '@/components/Profile'
import { Tpost } from '@/utils/types'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Loading from './Loading'

const ProfilePage = () => {
    const router = useRouter();
    const { data: session } = useSession();

    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [post, setPost] = useState<Tpost[]>([])

    if (!session?.user?._id) {
        router.push('/')
    }

    const handleEdit = (pst: Tpost) => router.push(`/update-prompt?id=${pst?._id}`);

    const handleDelete = async (pst: Tpost) => {
        const hasConfirmed = confirm(
            "Are you sure you want to delete this prompt?"
        );

        try {
            if (hasConfirmed) {

                await fetch(`/api/prompt/${pst._id.toString()}`,
                    {
                        method: 'DELETE'
                    });
                const filteredPosts = post.filter((item) => item._id !== pst._id);

                setPost(filteredPosts);
            }
        } catch (error) {
            console.log(error);
        }
    }



    useEffect(() => {
        setIsLoading(true)
        try {

            const fetchPosts = async () => {
                const response = await fetch(`/api/users/${session?.user?._id}/posts`);
                const data = await response.json();
                setPost(data);
            };

            if (session?.user?._id) fetchPosts();

        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false)
        }
    }, [session?.user?._id]);

    if (isLoading) return <Loading />

    return (
        <Profile
            name="My"
            desc="Welcome to your personalized profile page"
            data={post}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}

export default ProfilePage