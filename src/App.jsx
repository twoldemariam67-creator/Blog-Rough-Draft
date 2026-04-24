import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  let navigate=useNavigate();
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(function(){
    console.log("effectran")
      const savedPost=localStorage.getItem("blogpost")
      const savedPostJSON=JSON.parse(savedPost)
      setPosts(savedPostJSON || [])
  }, [])

  const addPost = () => {
    if (title && content) {
      const newPost = { title, content };
      setPosts((currentPosts)=>{
        const newValue = [newPost, ...currentPosts]
        localStorage.setItem("blogpost",JSON.stringify(newValue))
        return newValue
      });
      setTitle('');
      setContent('');
    }
  };

  return (
    <div>
      {/* Header */}
      <h1>My Blog</h1>

      {/* Create Post Section */}
      <section>
        <h2>Create a Post</h2>

        <input
          type="text"
          placeholder="Post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <br /><br />

        <textarea
          placeholder="Write your post..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <br /><br />

        <button onClick={addPost}>Add Post</button>
      </section>

      {/* Blog Posts Section */}
      <section>
        <h2>Blog Posts</h2>

        {posts.length === 0 ? (
          <p>No posts yet</p>
        ) : (
          posts.map((post, index) => (
            <div key={index} className="post" onClick={()=>{navigate("/"+post.title)}}>
              <h3>{post.title}</h3>
              <p>{displayText(post.content)}</p>
            </div>
          ))
        )}
      </section>
    </div>
  );
}
export default App;

function displayText(text){
 if(text.length<50) {
  return text
 }else{
  return text.slice(0,49)+"..."
  
 }
}
