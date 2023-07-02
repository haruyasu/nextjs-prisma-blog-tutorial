'use client'

import { useEffect } from 'react'
import { format } from 'date-fns'
import { User, Post } from '@prisma/client'

import useEditPostModal from '@/app/hooks/useEditPostModal'
import useDeletePostModal from '@/app/hooks/useDeletePostModal'
import Button from '@/app/components/button/Button'
import Image from 'next/image'

type UserType = {
  user: {
    id: string
    name: string | null
    image: string | null
  }
}

type PostDetailProps = {
  post: Post & UserType
  currentUser: User | null
}

// 投稿詳細
const PostDetail: React.FC<PostDetailProps> = ({ post, currentUser }) => {
  const { setPost: setEditPost, onOpen: onEditOpen } = useEditPostModal()
  const { setPost: setDeletePost, onOpen: onDeleteOpen } = useDeletePostModal()

  // 初期値設定
  useEffect(() => {
    if (currentUser?.id === post.user.id) {
      setEditPost(post)
      setDeletePost(post)
    }
  }, [post, setEditPost, setDeletePost, currentUser])

  return (
    <div>
      <div className="mb-5 inline-flex items-center space-x-2">
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
          <div className="text-sm text-neutral-500">
            {format(new Date(post.createdAt), 'yyyy/MM/dd HH:mm')}
          </div>
        </div>
      </div>

      <div className="mb-5 text-lg font-bold">{post.title}</div>

      <div className="relative h-[350px] w-full">
        <Image
          src={post.image || '/noimage.png'}
          className="rounded-lg object-cover"
          alt="post"
          fill
        />
      </div>

      <div className="my-5 whitespace-pre-wrap break-words leading-relaxed">{post.content}</div>

      {currentUser?.id === post.user.id && (
        <div className="flex items-center justify-center space-x-5">
          <Button label="編集" onClick={onEditOpen} />
          <Button label="削除" onClick={onDeleteOpen} del />
        </div>
      )}
    </div>
  )
}

export default PostDetail
