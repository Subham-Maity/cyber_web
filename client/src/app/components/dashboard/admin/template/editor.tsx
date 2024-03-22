import React, { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";

const TextEditor = ({
  setContent,
  initialContent,
}: {
  setContent: React.Dispatch<React.SetStateAction<string>>;
  initialContent: string;
}) => {
  const [text, setText] = useState<string>(initialContent);

  const handleEditorChange = (content: string, editor: any) => {
    setText(content);
    setContent(content);
  };

  useEffect(() => {
    setContent(initialContent);
    setText(initialContent);
  }, [initialContent]);

  return (
    <div>
      <Editor
        value={text}
        onEditorChange={handleEditorChange}
        apiKey="5ck4fbg67tr2aopfaf7zp04pl5d1z2xfvv15qu0uunww5ss5"
        init={{
          height: 500,
          menubar: true,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
          ],
          toolbar:
            "undo redo | formatselect | bold italic backcolor | \
            alignleft aligncenter alignright alignjustify | \
            bullist numlist outdent indent | removeformat | help",
        }}
      />
    </div>
  );
};

export default TextEditor;



// import React, { useState, useEffect,useRef } from "react";
// import { Editor } from "@tinymce/tinymce-react";

// const TextEditor1 = ({
//   initialContent,
//   setContent,
// }: {
//   initialContent?: string;
//   setContent: React.Dispatch<React.SetStateAction<string>>;
// }) => {
//   const editorRef = useRef<any>(null);

//   const handleEditorChange = (content: string, editor: any) => {
//     console.log(content,"Hello");
//     setContent(content);
//   };

//   useEffect(() => {
//     // Set initial content when the editor is ready
//     if (editorRef.current && initialContent !== undefined) {
//       editorRef.current.setContent(initialContent);
//       console.log(initialContent);
//     }
//   }, [initialContent]);

//   return (
//     <div>
//       <Editor
//         onInit={(evt, editor) => (editorRef.current = editor)}
//         value={initialContent}
//         onEditorChange={handleEditorChange}
//         apiKey="5ck4fbg67tr2aopfaf7zp04pl5d1z2xfvv15qu0uunww5ss5"
//         init={{
//           height: 500,
//           menubar: true,
//           plugins: [
//             "advlist autolink lists link image charmap print preview anchor",
//             "searchreplace visualblocks code fullscreen",
//             "insertdatetime media table paste code help wordcount",
//           ],
//           toolbar:
//             "undo redo | formatselect | bold italic backcolor | " +
//             "alignleft aligncenter alignright alignjustify | " +
//             "bullist numlist outdent indent | removeformat | help",
//         }}
//       />
//     </div>
//   );
// };

// export default TextEditor1;