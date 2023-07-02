'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { zodResolver } from '@hookform/resolvers/zod'

import useEditPostModal from '@/app/hooks/useEditPostModal'
import Modal from '@/app/components/modals/Modal'
import Input from '@/app/components/input/Input'
import Textarea from '@/app/components/input/Textarea'
import ImageUpload from '@/app/components/input/ImageUpload'
import axios from 'axios'
import * as z from 'zod'

// ステップの定義
enum STEPS {
  CONTENT = 0,
  IMAGE = 1,
}

// 入力データの検証ルールを定義
const schema = z.object({
  id: z.string(),
  title: z.string().min(2, { message: '2文字以上入力する必要があります。' }),
  content: z.string().min(2, { message: '2文字以上入力する必要があります。' }),
  image: z.string().optional(),
})

// 投稿編集モーダル
const EditPostModal = () => {
  const router = useRouter()
  const editPostModal = useEditPostModal()
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(STEPS.CONTENT)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    // 入力値の検証
    resolver: zodResolver(schema),
  })

  // 画像の監視
  const image = watch('image')

  // カスタム値の設定
  const setCustomValue = (id: string, value: string) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    })
  }

  // 初期値設定
  useEffect(() => {
    if (editPostModal.post) {
      reset({
        id: editPostModal.post.id,
        title: editPostModal.post.title,
        content: editPostModal.post.content,
        image: editPostModal.post.image || '',
      })
    }
  }, [editPostModal.post, reset])

  // 戻る
  const onBack = () => {
    setStep((value) => value - 1)
  }

  // 次へ
  const onNext = () => {
    setStep((value) => value + 1)
  }

  // メインボタンのラベル
  const primaryLabel = useMemo(() => {
    if (step === STEPS.IMAGE) {
      return '編集'
    }

    return '次へ'
  }, [step])

  // サブボタンのラベル
  const secondaryLabel = useMemo(() => {
    if (step === STEPS.CONTENT) {
      return undefined
    }

    return '戻る'
  }, [step])

  // 送信
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    // 最後のステップ以外は次へ
    if (step !== STEPS.IMAGE) {
      return onNext()
    }

    setLoading(true)

    try {
      // 投稿編集
      const res = await axios.patch(`/api/post/${data.id}`, data)

      if (res.status === 200) {
        toast.success('投稿を編集しました!')
        setStep(STEPS.CONTENT)
        reset()
        editPostModal.onClose()
        router.refresh()
      }
    } catch (error) {
      toast.error('エラーが発生しました。' + error)
      return
    } finally {
      setLoading(false)
    }
  }

  // モーダルの内容
  const getBodyContent = (): React.ReactElement => {
    if (step === STEPS.IMAGE) {
      return (
        <div>
          <ImageUpload onChange={(value) => setCustomValue('image', value)} value={image} />
        </div>
      )
    }

    return (
      <div className="flex flex-col gap-4">
        <Input
          id="title"
          label="タイトル"
          type="text"
          disabled={loading}
          register={register}
          errors={errors}
          required
        />
        <Textarea
          id="content"
          label="内容"
          disabled={loading}
          register={register}
          errors={errors}
          required
        />
      </div>
    )
  }

  return (
    <Modal
      disabled={loading}
      isOpen={editPostModal.isOpen}
      title="投稿編集"
      primaryLabel={primaryLabel}
      onSubmit={handleSubmit(onSubmit)}
      secondaryLabel={secondaryLabel}
      secondaryAction={step === STEPS.CONTENT ? undefined : onBack}
      onClose={editPostModal.onClose}
      body={getBodyContent()}
    />
  )
}

export default EditPostModal
