import { NextRequest, NextResponse } from 'next/server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { z } from 'zod';
import { BusinessCreateSchema, BusinessUpdateSchema, FormBusinessUpdateSchema, ProductCreateSchema } from '@/lib/dto';

import db from '@/lib/prisma'
import slugify from 'slugify';
import { verifyCurrentUserHasAccessToBusiness, verifyCurrentUserHasAccessToUpdateProduct } from '@/lib/session';
import { emailInvitationTemplate, emailTemplate, mailTransporter } from '@/lib/email';



const routeContextSchema = z.object({
    params: z.object({
        id: z.string(),
    }),
})

export async function POST(req: NextRequest, context: z.infer<typeof routeContextSchema>) {
    try {
        let json = await req.json();
        let { email } = json

        const { params } = routeContextSchema.parse(context);
        
        const session = await getServerSession(authOptions)
        // Check if the user has access to invite users to this business.
        if (!(await verifyCurrentUserHasAccessToBusiness(params.id))) {
            return new Response(null, { status: 403 });
        }

        let user = await db.user?.findUnique({
            where: {
                email
            } 
        })

        if(user){
            await db.staff?.create({
                data: {
                    userId: user?.id,
                    businessId: params?.id
                }
            })

            return new Response(null, {status:200});
        }

        // Create an invite in the database
        const invite = await db.invite.create({
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
            subject: `${session?.user?.name} mời bạn trở thành quản lí trang kinh doanh trên Lagi Now`, // Subject line
            text: "Hello world?", // plain text body
            html: emailInvitationTemplate({
                ownerName: session?.user?.name,
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
}