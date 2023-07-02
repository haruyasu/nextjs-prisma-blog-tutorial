import { create } from 'zustand'
import { ModalType } from '@/app/types'

// 新規投稿状態管理
const useNewPostModal = create<ModalType>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))

export default useNewPostModal
