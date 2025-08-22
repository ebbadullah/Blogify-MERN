"use client"

import { useState, useEffect } from "react"
import ReactQuill from "react-quill-new"

// Import Quill styles
import "react-quill-new/dist/quill.snow.css"

const RichTextEditor = ({ value, onChange, placeholder = "Write your content here..." }) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Quill modules configuration
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ align: [] }],
      ["blockquote", "code-block"],
      ["link", "image"],
      ["clean"],
    ],
  }

  // Quill formats
  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
    "background",
    "align",
    "code-block",
  ]

  if (!mounted) {
    return <div className="h-48 bg-gray-100 animate-pulse rounded-md"></div>
  }

  return (
    <div className="rich-text-editor">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
        className="bg-white"
        style={{
          height: "200px",
          marginBottom: "42px", // Space for toolbar
        }}
      />

      <style>{`
        .rich-text-editor .ql-editor {
          min-height: 150px;
          font-size: 14px;
          line-height: 1.6;
        }
        
        .rich-text-editor .ql-toolbar {
          border-top: 1px solid #e5e7eb;
          border-left: 1px solid #e5e7eb;
          border-right: 1px solid #e5e7eb;
          border-radius: 6px 6px 0 0;
        }
        
        .rich-text-editor .ql-container {
          border-bottom: 1px solid #e5e7eb;
          border-left: 1px solid #e5e7eb;
          border-right: 1px solid #e5e7eb;
          border-radius: 0 0 6px 6px;
        }
        
        .rich-text-editor .ql-editor:focus {
          outline: none;
        }
        
        .rich-text-editor .ql-toolbar:focus-within + .ql-container .ql-editor,
        .rich-text-editor .ql-container .ql-editor:focus {
          border-color: #6366f1;
          box-shadow: 0 0 0 1px #6366f1;
        }
      `}</style>
    </div>
  )
}

export default RichTextEditor
