import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";

const Editor = ({ content }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: content,
    editable: false,
  });

  return <EditorContent editor={editor} />;
};

export default function News() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editorInitialized, setEditorInitialized] = useState(false);

  useEffect(() => {
    const fetchData = () => {
      setLoading(true);
      setTimeout(() => {  
        fetch(`http://localhost:5000/posts/${id}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Post not found");
            }
            return response.json();
          })
          .then((data) => {
            if (!data.isActive) {
              throw new Error("Post is inactive");
            }
            setPost(data);
            setLoading(false);
          })
          .catch((error) => {
            setError(error.message);
            setLoading(false);            
            setTimeout(fetchData, 3000); 
          });
      }, 2000);  
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    if (post && !editorInitialized) {
      setEditorInitialized(true);
    }
  }, [post, editorInitialized]);

  if (loading) {
    return (
      <div className=" container mx-auto min-h-screen px-4 py-48 flex align-center justify-center">
        <CircularProgress />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-center">
          <div className="text-6xl mb-8">404</div>
          <div className="text-4xl mb-4">Página Não Encontrada</div>
          <p className="text-lg mb-4">
            Desculpe, a página que você está procurando não existe.
          </p>
          <p>
            <Link to="/" className="text-blue-500 font-bold hover:underline">
              Voltar a página inicial.
            </Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold my-4">{post.title}</h1>
      <img className="w-1/2 max-w-2xl mb-8" src={post.image} alt="Front Cover" />
      <div className="max-w-screen-xl px-4 pb-8">
        {editorInitialized && <Editor content={post.content} />}
      </div>
    </div>
  );
}
