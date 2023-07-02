'use client'

import { useCallback } from 'react'
import { User } from '@prisma/client'

import Menu from '@/app/components/navigation/Menu'
import useNewPostModal from '@/app/hooks/useNewPostModal'
import Link from 'next/link'

type NavigationProps = {
  currentUser: User | null
}

// ナビゲーション
const Navigation: React.FC<NavigationProps> = ({ currentUser }) => {
  const newPostModal = useNewPostModal()

  const newPost = useCallback(() => {
    newPostModal.onOpen()
  }, [newPostModal])

  return (
    <header className="shadow-lg shadow-gray-100">
      <div className="container mx-auto flex max-w-screen-sm items-center justify-between px-1 py-5">
        <Link href="/" className="cursor-pointer text-xl font-bold">
          FullStackChannel
        </Link>

        <div className="flex items-center justify-center space-x-2">
          {currentUser && (
            <div
              className="cursor-pointer rounded-full px-4 py-3 text-sm font-bold transition hover:bg-neutral-100"
              onClick={newPost}
            >
              新規投稿
            </div>
          )}

          <Menu currentUser={currentUser} />
        </div>
      </div>
    </header>
  )
}

export default Navigation
