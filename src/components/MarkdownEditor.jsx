import useCodemirror from "../hooks/useCodemirror"

const MarkdownEditor = ({handleEditorValueChange}) => {
  const [editorRef] = useCodemirror({
    initialDoc: '# Hello World!',
    handleEditorValueChange
  })

  return (
    <div ref={editorRef} className="markdown-editor"></div>
  )
}

export default MarkdownEditor