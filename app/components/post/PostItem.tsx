'use client'

import { formatDistance } from 'date-fns'
import { Post } from '@prisma/client'

import Image from 'next/image'
import Link from 'next/link'

type UserType = {
  user: {
    name: string | null
    image: string | null
  }
}

type PostItemProps = {
  post: Post & UserType
}

// 投稿アイテム
const PostItem: React.FC<PostItemProps> = ({ post }) => {
  // 投稿内容を100文字に制限
  const content = post.content.length > 100 ? post.content.slice(0, 100) + '...' : post.content

  const createdAt = new Date(post.createdAt)
  const now = new Date()
  // 投稿日時を表示
  const date = formatDistance(createdAt, now, { addSuffix: true })

  return (
    <div className="mb-5">
      <div className="mb-3 inline-flex items-center space-x-2">
        <div className="relative h-10 w-10">
          <Image
            src={post.user.image || '/default.png'}
            className="rounded-full object-cover"
            alt="avatar"
            fill
          />
        </div>
        <div>
          <div className="font-bold">{post.user.name}</div>
          <div className="text-sm text-neutral-500">{date}</div>
        </div>
      </div>

      <Link href={`/post/${post.id}`}>
        <div className="rounded-lg border shadow-lg shadow-gray-100">
          <div className="relative h-[350px] w-full">
            <Image
              src={post.image || '/noimage.png'}
              className="rounded-t-lg object-cover"
              alt="post"
              fill
            />
          </div>

          <div className="m-3">
            <div className="mb-2 font-bold">{post.title}</div>
            <div className="text-sm">{content}</div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default PostItem
