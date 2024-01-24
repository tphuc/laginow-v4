
import { MetadataRoute } from 'next'
import prisma from '@/lib/prisma'




const BASE_URL = 'https://www.laginow.com'
export default async function sitemap({
  id,
}: {
  id: number
}): Promise<MetadataRoute.Sitemap> {
  // Google's limit is 50,000 URLs per sitemap
  const data = await prisma.business.findMany({
  })

  console.log(data.map((item) => ({
    url: `${BASE_URL}/t/${item?.id}`,
    lastModified: new Date(),
  })))

  return data.map((item) => ({
    url: `${BASE_URL}/t/${item?.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.5
  }))
}