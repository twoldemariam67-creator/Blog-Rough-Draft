import { useParams } from "react-router-dom"

export function Posts () {
   const params=useParams() 
   const postTitle=params.id
   const allPostsRaw=localStorage.getItem("blogpost")
   const allPosts=JSON.parse(allPostsRaw)
   const myPost=allPosts.find(post=>post.title===postTitle)
   
    return(<>
   <h1>{myPost.title}</h1>
    <p>{myPost.content}</p>
    </>)


}