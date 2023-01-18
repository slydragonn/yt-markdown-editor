import { useState, useEffect, useRef } from "react"
import { EditorView, keymap, lineNumbers } from "@codemirror/view"
import { EditorState } from "@codemirror/state"
import { markdown, markdownLanguage } from "@codemirror/lang-markdown"
import { languages } from "@codemirror/language-data"
import { history, defaultKeymap, historyKeymap } from "@codemirror/commands"
import { oneDark as oneDarkTheme } from "@codemirror/theme-one-dark"
import { syntaxHighlighting, defaultHighlightStyle } from "@codemirror/language"

const myTheme = EditorView.theme({
  '&': {
    height: '100%',
    outline: 'none !important',
    backgroundColor: 'transparent !important'
  }
})

const syntaxStyles = syntaxHighlighting(defaultHighlightStyle, {fallback: true})

const useCodemirror = ({initialDoc, handleEditorValueChange}) => {
  const editorRef = useRef(null)
  const [editorView, setEditorView] = useState()

  const onUpdate = () => (
    EditorView.updateListener.of(update => {
      if (update.changes) {
        handleEditorValueChange && handleEditorValueChange(update.state.doc.toString())
      }
    })
  )

  const initialState = EditorState.create({
    doc: initialDoc,
    extensions: [
      markdown({
        base: markdownLanguage,
        codeLanguages: languages,
        addKeymap: true
      }),
      lineNumbers(),
      history(),
      keymap.of([...defaultKeymap, ...historyKeymap]),
      EditorView.lineWrapping,
      oneDarkTheme,
      onUpdate(),
      myTheme,
      syntaxStyles
    ]
  })

  useEffect(() => {
    if (!editorRef.current) return

    const view = new EditorView({
      state: initialState,
      parent: editorRef.current
    })

    setEditorView(view)

    return () => view?.destroy()
  }, [editorRef])

  return [editorRef, editorView]
}

export default useCodemirror