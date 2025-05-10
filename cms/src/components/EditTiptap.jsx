import React from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';

const EditTiptap = ({ content, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
    },
  });

  if (!editor) {
    return null;
  }

  const buttonClass = (isActive) =>
    `px-2 py-1 border rounded-md transition-all duration-200 ${
      isActive ? 'bg-blue-500 text-white' : 'bg-white text-black border-gray-300'
    } hover:bg-blue-500 hover:text-white`;

  const handleButtonClick = (callback) => {
    return (event) => {
      event.preventDefault();
      callback();
    };
  };

  return (
    <div className="editor-container">
      <div className="editor-toolbar flex flex-wrap gap-2 mb-4 border-b pb-2">
        <button
          onClick={handleButtonClick(() => editor.chain().focus().toggleBold().run())}
          className={buttonClass(editor.isActive('bold'))}
        >
          Bold
        </button>
        <button
          onClick={handleButtonClick(() => editor.chain().focus().toggleItalic().run())}
          className={buttonClass(editor.isActive('italic'))}
        >
          Italic
        </button>
        <button
          onClick={handleButtonClick(() => editor.chain().focus().toggleUnderline().run())}
          className={buttonClass(editor.isActive('underline'))}
        >
          Underline
        </button>
        <button
          onClick={handleButtonClick(() => editor.chain().focus().toggleHighlight().run())}
          className={buttonClass(editor.isActive('highlight'))}
        >
          Highlight
        </button>
        <button
          onClick={handleButtonClick(() => editor.chain().focus().setTextAlign('left').run())}
          className={buttonClass(editor.isActive({ textAlign: 'left' }))}
        >
          Left
        </button>
        <button
          onClick={handleButtonClick(() => editor.chain().focus().setTextAlign('center').run())}
          className={buttonClass(editor.isActive({ textAlign: 'center' }))}
        >
          Center
        </button>
        <button
          onClick={handleButtonClick(() => editor.chain().focus().setTextAlign('right').run())}
          className={buttonClass(editor.isActive({ textAlign: 'right' }))}
        >
          Right
        </button>
        <button
          onClick={handleButtonClick(() => editor.chain().focus().undo().run())}
          className={buttonClass(false)}
        >
          Undo
        </button>
        <button
          onClick={handleButtonClick(() => editor.chain().focus().redo().run())}
          className={buttonClass(false)}
        >
          Redo
        </button>
      </div>
      <div onClick={(e) => e.stopPropagation()}>
        <EditorContent editor={editor} className="max-w-2xl min-h-[400px] border p-4 rounded-md" />
      </div>
    </div>
  );
};

export default EditTiptap;
