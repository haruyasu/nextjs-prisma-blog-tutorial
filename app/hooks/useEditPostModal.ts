import { create } from 'zustand'
import { PostModalType } from '@/app/types'

// 投稿編集状態管理
const useEditPostModal = create<PostModalType>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  post: {
    id: '',
    title: '',
    content: '',
    image: null,
    userId: '',
    createdAt: new Date(),
  },
  setPost: (payload) => set({ post: payload }),
}))

export default useEditPostModal
