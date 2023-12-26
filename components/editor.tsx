"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import EditorJS from "@editorjs/editorjs"
import { zodResolver } from "@hookform/resolvers/zod"
import { Post, Prisma, User } from "@prisma/client"
import { useForm } from "react-hook-form"
import TextareaAutosize from "react-textarea-autosize"
import * as z from "zod"


import "@/styles/editor.css"
import { cn, vndFormat } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import {
  Select, SelectContent, SelectItem, SelectTrigger
} from "@/components/ui/select"
import { SelectValue } from "@radix-ui/react-select"
import { Pen, PenBox } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion"
import { AccordionBody } from "@tremor/react"
import { useSession } from "next-auth/react"


interface EditorProps {
  post: any,
  sellingProductTypes?: any
  user: Partial<User>
}



const postPatchSchema = z.object({
  title: z.string().min(3).max(128).optional(),
  postType: z.any().default('NORMAL').optional(),
  price: z.any().transform(d => parseInt(d)).optional(),
  salary: z.any().optional().nullable(),
  jobType: z.any()?.optional().transform(d => { return !d ? undefined : d }),
  jobGenderType: z.any()?.optional().transform(d => { return !d ? undefined : d }),
  realEstateType: z.any().optional()?.default("SELL").transform(d => { return !d ? undefined : d }),
  realEstateAssetType: z.any().optional().transform(d => { return !d ? undefined : d }),
  contactPhone: z.any().optional(),
  googleMapsUrl: z.any().optional(),
  sellingProductTypeId: z.any().optional(),
  content: z.any().optional(),
})

type FormData = z.infer<typeof postPatchSchema>

export function Editor({ post, sellingProductTypes, user }: EditorProps) {
  
  const form = useForm<FormData>({
    resolver: zodResolver(postPatchSchema),
    defaultValues: async () => {
      console.log(post)
      return {
        ...post
      }
    }
  })
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

    const body = postPatchSchema.parse(post)

    if (!ref.current) {
      const editor = new EditorJS({
        holder: "editor",
        onReady() {
          ref.current = editor
        },
        placeholder: "bắt đầu viết nội dung...",
        inlineToolbar: true,
        data: body.content,
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

  async function onSubmit(data: FormData) {
    setIsSaving(true)

    console.log(data)

    const blocks = await ref.current?.save()

    const response = await fetch(`/api/posts/${post.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        title: data.title,
        content: blocks,
      }),
    })

    setIsSaving(false)

    if (!response?.ok) {
      return toast({
        title: "Có lỗi xảy ra",
        description: "Lưu không thành công",
        variant: "destructive",
      })
    }

    router.refresh()

    return toast({
      description: "Bài viết đã được lưu.",
    })
  }

  if (!isMounted) {
    return null
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="w-full relative max-w-screen-xl mx-auto space-y-4">
          <div className="flex fixed top-0 left-0 md:left-auto px-4 md:px-0  w-full py-2 bg-background max-w-screen-xl  items-center justify-between">
            <div className="flex items-center space-x-10">
              <Link
                href="/dashboard"
                className={cn(buttonVariants({ variant: "outline" }))}
              >
                <>
                  <Icons.chevronLeft className="h-4 w-4" />
                  Trở về
                </>
              </Link>
              <p className="text-sm text-muted-foreground">
                {/* {post.published ? "Published" : "Draft"} */}
              </p>
            </div>
            <button type="submit" className={cn(buttonVariants())}>
              {isSaving && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              <span>Lưu & Đăng</span>
            </button>
          </div>

          <div className="grid grid-cols-6 gap-4 pt-4">
            <div className="col-span-6 md:col-span-2 border-r-0 md:border-r-1 px-0 md:px-2 space-y-2">
              <Accordion defaultValue="item-1" type='single' collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger> <p className="font-heading text-xl">Tuỳ chỉnh bài đăng</p></AccordionTrigger>
                  <AccordionContent>
                  <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="postType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Loại bài đăng</FormLabel>

                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Loại bài đăng" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>

                          <SelectItem value='NORMAL'>Tin thường</SelectItem>
                          
                          {user?.canWriteNews && <SelectItem value='NEWS'>Báo chí</SelectItem>}
                          <SelectItem value='REALESTATE'>Bất động sản</SelectItem>
                          <SelectItem value='JOB'>Tuyển dụng</SelectItem>
                          <SelectItem value='SELLING'>Buôn bán</SelectItem>

                        </SelectContent>
                      </Select>

                    </FormItem>
                  )}
                />
                {form?.watch('postType') === 'NORMAL' && <p className="text-muted-foreground"> Tin thường có thời hạn 1 tháng. <br /> Mỗi tài khoản có tối đa 3 tin thường. <br /> Tài khoản đối tác có thể đăng 10 tin / tháng. </p>}
                {form?.watch('postType') === 'REALESTATE' && <p className="text-muted-foreground"> Tin BDS có thời hạn 1 tháng. Có thể gia hạn thêm. </p>}
                {form?.watch('postType') === 'SELLING' && <p className="text-muted-foreground"> Tin buôn bán có thời hạn 1 tháng. Có thể gia hạn thêm. </p>}
                {form?.watch('postType') === 'JOB' && <p className="text-muted-foreground"> Tin tuyển dụng có thời hạn 1 tháng. Có thể gia hạn thêm. </p>}
                <br />
                {
                form?.watch('postType') === 'JOB' && <div className="block py-4 border-t space-y-4">
                  <FormField
                    control={form.control}
                    name="salary"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2"> Lương (VND) </FormLabel>
                        <FormControl>
                          <Input type='number' placeholder="lương nhân viên" {...field} />
                        </FormControl>
                        <FormDescription>
                          Nhập thông tin này để hiện thị tìm kiếm tốt hơn
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />


                  <FormField
                    control={form.control}
                    name="jobType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2"> Loại công việc </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>

                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="lựa chọn" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value='FULLTIME'>Toàn thời gian</SelectItem>
                            <SelectItem value='PARTIME'>Bán thời gian</SelectItem>
                            <SelectItem value='REMOTE'>Tại nhà</SelectItem>
                            <SelectItem value='CONTRACT'>Hợp đồng</SelectItem>
                            <SelectItem value='OTHER'>Khác</SelectItem>
                            <SelectItem value=''>Tất cả</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="jobGenderType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2"> Yêu cầu giới tính </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="lựa chọn" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value='MALE'>Nam</SelectItem>
                            <SelectItem value='FEMALE'>Nữ</SelectItem>
                            <SelectItem value=''>Tất cả</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />

                </div>
              }


              {
                form?.watch('postType') === 'SELLING' && <div className="flex flex-col py-4 border-t space-y-2">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2"> Giá tiền (VND) </FormLabel>
                        <FormControl>
                          <Input placeholder="" {...field} />
                        </FormControl>
                        <FormDescription>
                          Nhập thông tin giá để hiển thị tìm kiếm tốt hơn
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="sellingProductTypeId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2"> Thuộc loại </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>

                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Loại đồ bán" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {sellingProductTypes?.map((item) => <SelectItem key={item?.id} value={item?.id}>{item?.title}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>
              }

              {
                form?.watch('postType') === 'REALESTATE' && <div className="py-4 border-t space-y-4">

                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2"> Giá tiền (VND) </FormLabel>
                        <FormControl>
                          <Input type='number' placeholder="" {...field} />
                        </FormControl>
                        <FormDescription>
                          {vndFormat(form.getValues('price'))}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="realEstateType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2"> Loại BĐS </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>

                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Thể thức" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value='RENT'>Thuê</SelectItem>
                            <SelectItem value='SELL'>Mua bán</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />

<FormField
                    control={form.control}
                    name="realEstateAssetType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2"> Loại BĐS </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>

                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Loại BDS" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value='APARTMENT'>Căn hộ / chung cư</SelectItem>
                            <SelectItem value='HOME'>Nhà</SelectItem>
                            <SelectItem value='OFFICE'>Văn phòng</SelectItem>
                            <SelectItem value='LAND'>Đất</SelectItem>
                            <SelectItem value='FLAT'>Mặt bằng</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="googleMapsUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2"> Link Google Maps </FormLabel>
                        <FormControl>
                          <Input placeholder="link google maps" {...field} />
                        </FormControl>
                        <FormDescription>

                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {!!post?.['googleMapsUrlEmbeded'] ? <div className="relative overflow-hidden w-full min-w-[340px] aspect-video">
                    <iframe
                      //   frameborder="0"
                      //   style="border:0"
                      className="w-full h-full absolute rounded-md border border-input top-0 left-0"
                      src={post?.['googleMapsUrlEmbeded']}

                    >
                    </iframe>
                  </div> : null}

                  <FormField
                    control={form.control}
                    name="contactPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2"> SDT </FormLabel>
                        <FormControl>
                          <Input placeholder="Nhập số đt liên hệ" {...field} />
                        </FormControl>
                        <FormDescription>

                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                </div>
              }


              </div>

                  </AccordionContent>
                </AccordionItem>


              </Accordion>

           



             





            </div>
            <div className="col-span-6 md:col-span-4 border border-radius  rounded-md  mt-2">
              <div className="py-4 w-full pl-4 flex items-center gap-4 border-b">
                <Pen className="w-9 h-9 bg-secondary border border-input p-2 rounded-md text-muted-foreground stroke-width-1" />
                <TextareaAutosize
                  autoFocus
                  id="title"
                  defaultValue={post?.title ?? ''}
                  placeholder="Tiêu đề"
                  {...form.register("title")}
                  className="resize-none appearance-none overflow-hidden bg-transparent text-2xl md:text-3xl font-heading focus:outline-none"

                />
              </div>
              <div id="editor" className="w-full py-2 px-2 bg-secondary" />
              <p className="text-sm text-gray-500 p-4 border-t">
                Ấn{" "}
                <kbd className="rounded-md border bg-muted px-1 text-xs uppercase">
                  Tab
                </kbd>{" "}
                để mở menu soạn thảo
              </p>
            </div>
          </div>
        </div>
      </form>
    </Form>
  )
}