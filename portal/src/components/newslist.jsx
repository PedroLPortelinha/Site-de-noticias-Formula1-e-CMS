import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';

export function NewsList({ category }) {
  const [posts, setPosts] = useState([]);
  const [mainPost, setMainPost] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/posts")
      .then((resp) => resp.json())
      .then((data) => {
        const filteredNews = data.filter((post) => post.category === category && post.isActive);
        setPosts(filteredNews);

        if (filteredNews.length > 0) {
          const randomIndex = Math.floor(Math.random() * filteredNews.length);
          setMainPost(filteredNews[randomIndex]);
        }
      })
      .catch((err) => console.log(err));
  }, [category]);

  return (
    <main className="container mx-auto min-h-screen px-4 py-8">
      {mainPost && (
        <div className="mb-8">
          <h3 className="text-center text-3xl font-bold mb-4">
            {mainPost.title}
          </h3>
          <div className="flex justify-center">
            <div
              key={mainPost.id}
              className="w-full max-w-2xl p-4 flex flex-col bg-white shadow-md"
            >
              <Link to={`news/${mainPost.id}`} className="w-full mb-4">
                <img
                  src={mainPost.image}
                  alt={mainPost.title}
                  className="w-full h-60 object-cover transition-transform duration-500 ease-in-out transform hover:scale-105"
                />
              </Link>
              <p className="w-full">{mainPost.resumo}</p>
              <div className="flex justify-end mt-4">
                <Button variant="contained" color="primary" component={Link} to={`news/${mainPost.id}`}>
                  Leia mais
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <h2 className="text-2xl font-bold mb-4">Últimas Notícias</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {posts.filter(post => post.id !== (mainPost && mainPost.id)).map((post) => (
          <div key={post.id} className="w-full">
            <div className="bg-white shadow-md p-4 h-full flex flex-col">
              <Link to={`news/${post.id}`} className="w-full mb-2">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-60 object-cover transition-transform duration-500 ease-in-out transform hover:scale-105 mb-2"
                />
              </Link>
              <h3 className="text-lg font-bold mb-2">{post.title}</h3>
              <p className="text-gray-600">{post.resumo}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
