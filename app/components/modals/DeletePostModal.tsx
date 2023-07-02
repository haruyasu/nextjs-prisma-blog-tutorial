'use client'

import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'

import useDeletePostModal from '@/app/hooks/useDeletePostModal'
import Modal from '@/app/components/modals/Modal'
import axios from 'axios'

// 投稿削除モーダル
const DeletePostModal = () => {
  const router = useRouter()
  const deletePostModal = useDeletePostModal()
  const [loading, setLoading] = useState(false)
  const { reset, handleSubmit } = useForm<FieldValues>()

  // 初期値設定
  useEffect(() => {
    if (deletePostModal.post) {
      reset({
        id: deletePostModal.post.id,
      })
    }
  }, [deletePostModal.post, reset])

  // 送信
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true)

    try {
      // 投稿削除
      const res = await axios.delete(`/api/post/${data.id}`)

      if (res.status === 200) {
        toast.success('投稿を削除しました!')
        deletePostModal.onClose()
        router.push('/')
        router.refresh()
      }
    } catch (error) {
      toast.error('エラーが発生しました。' + error)
      return
    } finally {
      setLoading(false)
    }
  }

  // モーダルの中身
  const bodyContent = <div className="text-center">投稿を削除しますか？</div>

  return (
    <Modal
      disabled={loading}
      isOpen={deletePostModal.isOpen}
      title="投稿削除"
      primaryLabel="削除"
      onClose={deletePostModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      del
    />
  )
}

export default DeletePostModal
