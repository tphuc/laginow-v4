"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import EditorJS from "@editorjs/editorjs"
import { zodResolver } from "@hookform/resolvers/zod"
import { Post } from "@prisma/client"
import { useForm } from "react-hook-form"
import TextareaAutosize from "react-textarea-autosize"
import * as z from "zod"


import "@/styles/editor.css"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"
import { UserAvatar } from "./user-avatar"
import { format } from "date-fns"
import { vi } from "date-fns/locale"

interface EditorProps {
  post: any,
}






export function ReadOnlyEditor({ post }: EditorProps) {
  const ref = React.useRef<EditorJS>()
  const router = useRouter()
  const [isSaving, setIsSaving] = React.useState<boolean>(false)
  const [isMounted, setIsMounted] = React.useState<boolean>(false)

  const initializeEditor = React.useCallback(async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default
    const Header = (await import("@editorjs/header")).default
    const Embed = (await import("@editorjs/embed")).default
    const Table = (await import("@editorjs/table")).default
    const List = (await import("@editorjs/list")).default
    const Code = (await import("@editorjs/code")).default
    const ImageTool = (await import("@editorjs/image")).default
    const LinkTool = (await import("@editorjs/link")).default
    const InlineCode = (await import("@editorjs/inline-code")).default


    if (!ref.current) {
      const editor = new EditorJS({
        holder: "editor",
        onReady() {
          ref.current = editor
        },
        readOnly: true,
        placeholder: "...",
        inlineToolbar: false,
        data: post.content,
        tools: {
          header: Header,
          linkTool: {
            class: LinkTool,
            config: {
              endpoint: `${window.location.origin}/api/editor/link`
            }
          },
          image: {
            class: ImageTool,
            config: {
              field: 'file',
              endpoints: {

                byFile: `${window.location.origin}/api/editor/upload-image`, // Your backend file uploader endpoint
                byUrl: `${window.location.origin}/api/editor/fetchUrl`, // Your endpoint that provides uploading by Url
              },


            },

          },

          list: List,
          code: Code,
          inlineCode: InlineCode,
          table: Table,
          embed: Embed,
        },
      })
    }
  }, [post])

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true)
    }
  }, [])

  React.useEffect(() => {
    if (isMounted) {
      initializeEditor()

      return () => {
        ref.current?.destroy()
        ref.current = undefined
      }
    }
  }, [isMounted, initializeEditor])


  if (!isMounted) {
    return null
  }

  return (

    <div className="w-full">
      <div className="container flex mx-auto space-y-0 items-center gap-2">

      </div>
      <div className="prose prose-slate mx-auto">
        <div className="gap-0 space-y-0 mt-0">
          <p className="mt-0 mb-0">{post?.user?.name}</p>
          <p className='text-sm text-muted-foreground'>{format(new Date(post?.createdAt), 'dd LLL, y', { locale: vi })}</p>
        </div>
        <p
          placeholder="Post title"
          className="w-full resize-none appearance-none overflow-hidden bg-transparent text-3xl md:text-4xl font-heading focus:outline-none"
        >  {post?.title}
        </p>

        <div id="editor" className="min-h-[500px] max-w-[800px] " />
        {/* <p className="text-sm text-gray-500">
            Use{" "}
            <kbd className="rounded-md border bg-muted px-1 text-xs uppercase">
              Tab
            </kbd>{" "}
            to open the command menu.
          </p> */}
      </div>
    </div>

  )
}