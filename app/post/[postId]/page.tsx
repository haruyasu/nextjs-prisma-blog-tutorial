import PostDetail from '@/app/components/post/PostDetail'
import getPostById from '@/app/actions/getPostById'
import getCurrentUser from '@/app/actions/getCurrentUser'

type PageProps = {
  params: {
    postId: string
  }
}

// 投稿詳細ページ
const PostDetailPage = async ({ params }: PageProps) => {
  // 投稿詳細を取得
  const post = await getPostById(params)
  // ログインユーザーを取得
  const currentUser = await getCurrentUser()

  // 投稿がない場合
  if (!post) {
    return <div className="text-center">投稿はありません</div>
  }

  return <PostDetail post={post} currentUser={currentUser} />
}

export default PostDetailPage
