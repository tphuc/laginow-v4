
'use server'

import prisma from "@/lib/prisma";

export async function fetchEvents(props: { limit: any, page: any}){
    try {

        let limit = parseInt(props.limit ?? '10') ?? 10
        let page = parseInt(props.page ?? '1') ?? 1
    
    
        const items = await prisma.eventQuestion.findMany({
          orderBy: {
            tzDatetime: 'desc',
          },
          take: limit,
          skip: (page - 1) * limit
        });
    
        let total = await prisma.eventQuestion.count({})
    
    
        return {
          data: items,
          total
        }
    
      }
      catch (e) {
        console.log(e)
        return null
      
    }
}