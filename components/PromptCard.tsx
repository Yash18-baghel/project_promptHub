import { Tpost } from '@/utils/types'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify';

type PromptCardProps = {
  post: Tpost,
  handleTagClick?: (tag: string) => void
  handleDelete?: () => void
  handleEdit?: () => void
}
const PromptCard = ({
  post,
  handleTagClick,
  handleDelete,
  handleEdit,
}: PromptCardProps) => {

  const pathName = usePathname();
  const { data: session } = useSession();
  const router = useRouter();
  const [likes, setLikes] = useState<string[]>([]);
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (post && post.likes) {
      setLikes(post.likes);
    }
  }, [post]);



  const isLiked = useMemo(() => {
    return likes.includes(session?.user._id || '')
  }, [likes, session?.user]);

  const handleCopy = () => {
    toast.success('Prompt Copied!!!')
    setCopied(true)
    navigator.clipboard.writeText(post.prompt)
    setTimeout(() => setCopied(false), 3000)
  }

  const handleProfileClick = () => {

    if (post.creator._id === session?.user._id) return router.push("/profile");

    router.push(`/profile/${post.creator._id}`);
  };

  const handleLike = async (id: string) => {
    if (!session) {
      toast.error('Please Login First!!!')
      return
    }

    const likesArray = [...likes];

    if (likesArray.includes(session?.user._id || '')) {
      likesArray.splice(likesArray.indexOf(session?.user._id || ""), 1)
    } else {
      likesArray.push(session?.user._id || '')
    }

    setLikes(likesArray);
    try {
      const res = await fetch('/api/prompt/like', {
        method: 'POST',
        body: JSON.stringify({
          promptId: id,
          likes: likesArray,
          userId: session?.user?._id
        })
      })
      const data = await res.json();
      console.log(data);

    } catch (error) {

    }
  }

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div
          className="flex flex-1 justify-start items-center gap-3 cursor-pointer"
          onClick={handleProfileClick}
        >
          <Image
            src={post.creator.image}
            alt='user_image'
            width={40}
            height={40}
            className="rounded-full object-contain"
          />

          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post.creator.email}
            </p>
          </div>
        </div>
        <div
          onClick={() => { }}
          className="copy_btn"
        >
          <Image
            src={
              copied ?
                "/assets/icons/tick.svg" :
                "/assets/icons/copy.svg"
            }
            onClick={handleCopy}
            alt='copy'
            width={15}
            height={15}
          />
        </div>
      </div>
      <p
        className="my-4 font-satoshi text-sm text-gray-700"
      >
        {post.prompt}
      </p>
      {
        post.tag.split(',').map((tag: string, key: number) => {
          tag = tag.trim()
          return (
            <p
              key={key}
              className='font-inter text-sm blue_gradient inline cursor-pointer'
              onClick={() => handleTagClick && handleTagClick(tag)}
            >
              {tag}{" "}
            </p>
          )
        })
      }
      <div className="flex mt-3">
        <div className="flex flex-col items-center gap-1 cursor-pointer">
          <img
            src={isLiked ? "/assets/icons/liked.svg" : "/assets/icons/like.svg"}
            alt="like"
            width={16}
            height={16}
            onClick={() => handleLike(post._id)}
          />
          <p className="text-sm">{likes.length}</p>
        </div>
      </div>
      {
        session?.user?._id === post.creator._id && pathName === "/profile" && (
          <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
            <p
              className="font-inter text-sm green_gradient cursor-pointer"
              onClick={handleEdit}
            >
              Edit
            </p>
            <p
              className="font-inter text-sm orange_gradient cursor-pointer"
              onClick={handleDelete}
            >
              Delete
            </p>
          </div>
        )
      }
    </div>
  )
}

export default PromptCard