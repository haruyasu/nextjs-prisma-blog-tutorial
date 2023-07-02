import { Post } from '@prisma/client'

export type PostModalType = {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  post: Post
  setPost: (payload: Post) => void
}

export type ModalType = {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}
