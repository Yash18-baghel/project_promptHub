import { Tpost } from '@/utils/types'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import React, { useState } from 'react'

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

  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    setCopied(true)
    navigator.clipboard.writeText(post.prompt)
    setTimeout(() => setCopied(false), 3000)
  }

  const handleProfileClick = () => {

    if (post.creator._id === session?.user._id) return router.push("/profile");

    router.push(`/profile/${post.creator._id}`);
  };

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