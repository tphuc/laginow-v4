import { NextRequest, NextResponse } from 'next/server';

import { z } from 'zod';
import { BusinessCreateSchema, BusinessUpdateSchema, FormBusinessUpdateSchema, ProductCreateSchema } from '@/lib/dto';

import prisma from '@/lib/prisma'
import slugify from 'slugify';
import { verifyCurrentUserHasAccessToBusiness, verifyCurrentUserHasAccessToUpdateProduct } from '@/lib/session';
import { emailInvitationTemplate, emailTemplate, mailTransporter } from '@/lib/email';
import { auth } from '@/lib/auth';



const routeContextSchema = z.object({
    params: z.object({
        id: z.string(),
    }),
})

export async function POST(req: NextRequest, context: z.infer<typeof routeContextSchema>) {
     return auth(async (request) => {
        try {
            let json = await req.json();
            let { email } = json
    
            const { params } = routeContextSchema.parse(context);
            
            
            if (!(await verifyCurrentUserHasAccessToBusiness(request, params.id))) {
                return new Response(null, { status: 403 });
            }
    
            let user = await prisma.user?.findUnique({
                where: {
                    email
                } 
            })
    
            if(user){
                await prisma.staff?.create({
                    data: {
                        userId: user?.id,
                        businessId: params?.id
                    }
                })
    
                return new Response(null, {status:200});
            }
    
            // Create an invite in the database
            const invite = await prisma.invite.create({
                data: {
                    email,
                    business: {
                        connect: {
                            id: params.id,
                        },
                    },
                },
                include: {
                    business: true
                }
            });
    
            const emailRes = await mailTransporter.sendMail({
                from: 'contact@laginow.com', // sender address
                to: email, // list of receivers
                subject: `${request?.auth?.user?.name} mời bạn trở thành quản lí trang kinh doanh trên Lagi Now`, // Subject line
                text: "Hello world?", // plain text body
                html: emailInvitationTemplate({
                    ownerName: request?.auth?.user?.name,
                    businessName: invite?.business?.title,
                    inviteId: invite?.id
                }),
            })
        
            return new Response(JSON.stringify(invite));
    
        } catch (error) {
            if (error instanceof z.ZodError) {
                return new Response(JSON.stringify(error.issues), { status: 422 });
            }
    
            return new Response(null, { status: 500 });
        }
     })(req, context)
   
}