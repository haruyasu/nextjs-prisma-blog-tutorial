import prisma from '@/app/lib/prisma'

// 投稿詳細取得
const getPostById = async ({ postId }: { postId: string }) => {
  try {
    // 投稿詳細取得
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    })

    // 投稿が存在しない場合
    if (!post) {
      return null
    }

    return post
  } catch (error) {
    console.error(error)
    return null
  }
}

export default getPostById
