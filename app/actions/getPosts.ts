import prisma from '@/app/lib/prisma'

// 投稿一覧取得
const getPosts = async () => {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    })

    return posts
  } catch (error) {
    return []
  }
}

export default getPosts
