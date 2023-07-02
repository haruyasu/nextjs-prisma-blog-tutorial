import { NextResponse } from 'next/server'
import getCurrentUser from '@/app/actions/getCurrentUser'
import prisma from '@/app/lib/prisma'

// 投稿編集
export async function PATCH(request: Request, { params }: { params: { postId: string } }) {
  try {
    // リクエストボディの取得
    const body = await request.json()
    const { title, content, image } = body

    // ログインユーザーの取得
    const currentUser = await getCurrentUser()

    // ログインしていない場合はエラー
    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('認証していません', { status: 401 })
    }

    if (!params.postId) {
      return new NextResponse('投稿IDが必要です', { status: 400 })
    }

    // 投稿の編集
    const response = await prisma.post.update({
      where: {
        id: params.postId,
      },
      data: {
        title,
        content,
        image,
      },
    })

    return NextResponse.json(response)
  } catch (error) {
    console.log(error)
    return new NextResponse('Error', { status: 500 })
  }
}

// 投稿削除
export async function DELETE(request: Request, { params }: { params: { postId: string } }) {
  try {
    // ログインユーザーの取得
    const currentUser = await getCurrentUser()

    // ログインしていない場合はエラー
    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('認証していません', { status: 401 })
    }

    if (!params.postId) {
      return new NextResponse('投稿IDが必要です', { status: 400 })
    }

    // 投稿の削除
    const response = await prisma.post.delete({
      where: {
        id: params.postId,
      },
    })

    return NextResponse.json(response)
  } catch (error) {
    console.log(error)
    return new NextResponse('Error', { status: 500 })
  }
}
