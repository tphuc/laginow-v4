'use server'

import prisma from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { NextAuthRequest } from "next-auth/lib"

export async function getCurrentUser() {
  const session = await auth()
  return session?.user
}



export async function verifyCurrentUserHasAccessToUpdateProduct(request: NextAuthRequest, productId: string) {
  const session = request.auth
  const found = await prisma.product.findUnique({
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

export async function verifyCurrentUserHasAccessToBusiness(request: NextAuthRequest, businessId: string) {
  const session = request.auth
  const found = await prisma.business.findUnique({
    where: {
      id: businessId,
      OR: [
        {
          ownerId: session?.user?.id
        },
        {
          Staff: {
            some: {
              user: {
                id: {
                  equals: session?.user?.id
                }
              }
            }
          }
        }
      ]
      
    },
  })
  return !!found
}

export async function isBusinessVerified(businessId: string) {
  const found = await prisma.business.findUnique({
    where: {
      id: businessId,
    },
  })
  return found?.verified
}


export async function getUserBusiness(){
  const session = await auth()
  const businesses = await prisma.business?.findMany({
    where: {
      OR: [
        {
          ownerId: session?.user?.id
        },
        {
          Staff: {
            some: {
              user: {
                id: {
                  equals: session?.user?.id
                }
              }
            }
          }
        }
      ]
    }
  })
  return businesses
}

export async function getMasterTags(){
  const tags = await prisma.masterTag?.findMany({
  })

  return tags
}



export async function isAdmin(request: NextAuthRequest) {
  const session = request?.auth
  const found = await prisma.user.findUnique({
    where: {
      id: session?.user?.id,
    },
  })
  return found?.isAdmin
}



// const verifyJWT = (accessToken: string, secretKey: any) => new Promise((resolve, reject) => {
//   jwt.verify(accessToken, secretKey, (err, decoded) => {

//     if (err) {
//       reject(err)
//     }
//     resolve(decoded);
//   });
// })

// export async function getUserSession(req: any) {

//   let accessToken = req.headers?.get('authorization')?.split(' ')?.[1]

//   const secretKey = process.env.JWT_USER_ID_SECRET!;


//   try {
//     let data = await verifyJWT(accessToken, secretKey)

//     return data
//   }
//   catch (e) {
//     console.log(78,e)
//     return null
//   }
// }