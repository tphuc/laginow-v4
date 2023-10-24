import { getServerSession } from "next-auth/next"
import db from "@/lib/prisma"
import { authOptions } from "@/lib/auth"

export async function getCurrentUser() {
  const session = await getServerSession(authOptions)
  return session?.user
}



export async function verifyCurrentUserHasAccessToUpdateProduct(productId: string) {
  const session = await getServerSession(authOptions)
  const found = await db.product.findUnique({
    where: {
      id: productId,
    },
    include: {
      business: {
        where: {
          ownerId: session?.user?.id
        }
      }
    }
  })
  return !!found
}

export async function verifyCurrentUserHasAccessToBusiness(businessId: string) {
  const session = await getServerSession(authOptions)
  const found = await db.business.findUnique({
    where: {
      id: businessId,
      ownerId: session?.user?.id
    },
  })
  return !!found
}

export async function isBusinessVerified(businessId: string) {
  const found = await db.business.findUnique({
    where: {
      id: businessId,
    },
  })
  return found?.verified
}



export async function isAdmin() {
  const session = await getServerSession(authOptions)
  const found = await db.user.findUnique({
    where: {
      id: session?.user?.id,
    },
  })
  return found?.isAdmin
}
