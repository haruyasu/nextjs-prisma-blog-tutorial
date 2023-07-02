import PostItem from '@/app/components/post/PostItem'
import getPosts from '@/app/actions/getPosts'

// メインページ
const Home = async () => {
  // 投稿一覧取得
  const posts = await getPosts()

  // 投稿がない場合
  if (posts.length === 0) {
    return <div className="text-center">投稿はありません</div>
  }

  return (
    <div>
      {posts.map((post, index) => {
        return <PostItem key={index} post={post} />
      })}
    </div>
  )
}

export default Home
