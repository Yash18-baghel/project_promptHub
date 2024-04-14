import { Tpost } from '@/utils/types'
import React from 'react'
import PromptCard from './PromptCard'

type ProfileProps = {
  name: string
  desc: string
  data: Tpost[]
  handleDelete?: (post: Tpost) => void
  handleEdit?: (post: Tpost) => void
}

const Profile = ({
  name,
  desc,
  data,
  handleDelete,
  handleEdit
}: ProfileProps) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">
          {name === "My" ? "My" : `${name}'s`} Profile
        </span>
      </h1>
      <p className="desc text-left">
        {desc}
      </p>

      <div className='mt-10 prompt_layout'>
        {data.map((post: Tpost) => (
          <PromptCard
            key={post._id}
            post={post}
            handleDelete={() => handleDelete && handleDelete(post)}
            handleEdit={() => handleEdit && handleEdit(post)}
          />
        ))}
      </div>
    </section>
  )
}

export default Profile