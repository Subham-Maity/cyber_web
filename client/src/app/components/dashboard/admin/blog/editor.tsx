import React from "react";
import { Editor } from "@tinymce/tinymce-react";

const TextEditor = ({
  setContent,
  content=""
}: {
  content?:string,
  setContent: React.Dispatch<React.SetStateAction<string>>;
}) => {
  //   const [text, setText] = React.useState<string>("");
  const handleEditorChange = (content: string, editor: any) => {
    setContent(content);
  };

  return (
    <div>
      <Editor
        onEditorChange={handleEditorChange}
        value={content}
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
