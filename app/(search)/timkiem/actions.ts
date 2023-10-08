"use server"

export async function fetchBusinessPages({ skip, limit }){

    let searchQuery = new URLSearchParams();
    if(skip){
        searchQuery.append('skip', skip)
    }

    if(limit){
        searchQuery.append('limit', limit)
    }

    const res = await fetch(`https://laginow.com/api/public/business?${searchQuery?.toString()}`)
    let {data, total} = await res.json()


    return {
        data,
        total
    }
}