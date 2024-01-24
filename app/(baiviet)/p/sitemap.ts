
import { MetadataRoute } from 'next'
import prisma from '@/lib/prisma'

export async function generateSitemaps() {
  // Fetch the total number of products and calculate the number of sitemaps needed
  return [{ id: 0 }]
}
 

const BASE_URL = 'https://www.laginow.com'

export default async function sitemap({
  id,
}: {
  id: number
}): Promise<MetadataRoute.Sitemap> {

  // Google's limit is 50,000 URLs per sitemap
  const posts = await prisma.post.findMany({
    where: {
        published: true,
        slug: {
            not: null
        }
    }
})
  return posts.map((item) => ({
    url: `${BASE_URL}/p/${item?.slug}`,
    lastModified: item.createdAt,
    changeFrequency: 'monthly',
    priority: 0.5
  }))
}