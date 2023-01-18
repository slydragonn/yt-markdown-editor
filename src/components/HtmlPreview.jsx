import rehypeStringify from "rehype-stringify/lib"
import remarkGfm from "remark-gfm"
import remarkParse from "remark-parse/lib"
import remarkRehype from "remark-rehype"
import { unified } from "unified"
import rehypeSanitize from "rehype-sanitize"
import 'github-markdown-css/github-markdown.css'

const HtmlPreview = ({ code }) => {
  const markdownToHtml = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSanitize)
    .use(rehypeStringify)
    .processSync(code);

    return (
      <div
        dangerouslySetInnerHTML={{__html: String(markdownToHtml)}}
        className="markdown-body html-preview"
      />
    )
}

export default HtmlPreview