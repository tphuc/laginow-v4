'use client';

import { DataTable } from "./table/data-table";

import Image from "next/image";
import { DataTableRowActions } from "./table/data-table-row-actions";
import { PostOperations } from "@/components/post-operations";
import { Badge } from "@/components/ui/badge";
import { ArrowUpDown, Banknote, Briefcase, Landmark, Newspaper } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";



export const columns = [

    {
        accessorKey: 'title2',
        header: 'Tiêu đề',
        cell: ({ row }) => {
            const post = row?.original
            return <div>
                <Link
          href={`/p/${post?.slug}`}
          prefetch={false}
          className="font-heading hover:underline"
        >
          {post.title}
        </Link>
                <div>
                {post?.postType === 'JOB' && <Badge className="w-auto  gap-2 bg-violet-600 hover:bg-violet-600 inline-flex">Tuyển dụng</Badge>}
                {post?.postType === 'NEWS' && <Badge className=" w-auto bg-gray-700 hover:bg-gray-700 inline-flex gap-2">  Báo chí</Badge>}
                {post?.postType === 'NORMAL' && <Badge variant={'secondary'} className="w-auto inline-flex"> Tin thường</Badge>}
                {post?.postType === 'REALESTATE' && <Badge className="w-auto text-white  bg-green-600 gap-2 hover:bg-green-700 inline-flex"> Bất động sản </Badge>}
                {post?.postType === 'SELLING' && <Badge className="w-auto text-white bg-yellow-600 gap-2 hover:bg-yellow-700 inline-flex">  Buôn bán </Badge>}
                </div>
            </div>
        }
    },
    {
        accessorKey: 'updatedAt',
        header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                className="px-3 rounded-sm"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                ngày cập nhật
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
          },
        cell: ({row}) => {
            const post = row?.original
            return <div className="text-center">
                {post?.updatedAt && format(new Date(post?.updatedAt), 'dd/MM/yyyy')}
            </div>
        }
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const post = row?.original
            return <PostOperations post={{ id: post?.id, title: post?.title, slug: post?.slug }} />
        }
    },

]


export default function PostsTable({ data }) {
    return <DataTable data={data ?? []} columns={columns} />
}