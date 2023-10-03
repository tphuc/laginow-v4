import prisma from '@/lib/prisma'
import useSWR from 'swr'

export const APIHttp = {
    getBusinessInfo: async (id: string) => {
        const response = await fetch(`/api/business/${id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
        })
        
        return response.json()
    }
}

export function useGetBusinessTags(){
    
    const { data, error, isLoading } = useSWR('/api/tags', async (url) => {
        const response = await fetch(url, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
        })
        
        return response.json()
    })

    return {
        data, 
        isLoading,
        error
    }
    
}

export function useGetBusinessInfo(id?: string){
    
    const { data, error, isLoading } = useSWR(`/api/business/${id}`, async (url) => {
        const response = await fetch(url, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
        })
        
        return response.json()
    })

    return {
        data, 
        isLoading,
        error
    }
    
}

export function useGetBusinessPageEvents(id: string, options: {from?: Date, to?: Date}){
    let searchParams = new URLSearchParams()
    if(options?.from){
       searchParams.append('from', options.from?.toString())
    }
    if(options?.to){
        searchParams.append('to', options.to?.toString())
     }
    
    const { data, error, isLoading } = useSWR(`/api/business/${id}/page-event?${searchParams?.toString()}`, async (url) => {
        const response = await fetch(url, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
        })
        
        return response.json()
    })

    return {
        data, 
        isLoading,
        error
    }
    
}

export function useGetBusinessReview(businessId: string, options: {page?: number, limit?: number}){
    
    let {page, limit} = options;
    let search = new URLSearchParams()
    search.append('page', `${page}`)
    search.append('limit', `${limit}`)

    const { data, error, isLoading } = useSWR(`/api/business/${businessId}/reviews?${search.toString()}`, async (url) => {
        const response = await fetch(url, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
        })
        
        return response.json()
    })

    return {
        data, 
        isLoading,
        error
    }
    
}