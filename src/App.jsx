import { useState } from 'react'
import './App.css'
import MarkdownEditor from './components/MarkdownEditor'
import HtmlPreview from './components/HtmlPreview'

function App() {
  const [editorCodeValue, setEditorCodeValue] = useState('')
  return (
    <div className='editor'>
      <MarkdownEditor handleEditorValueChange={setEditorCodeValue}/>
      <HtmlPreview code={editorCodeValue}/>
    </div>
  )
}

export default App
