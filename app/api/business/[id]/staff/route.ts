import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

import db from '@/lib/prisma'
import { verifyCurrentUserHasAccessToBusiness, verifyCurrentUserHasAccessToUpdateProduct } from '@/lib/session';
import { auth } from '@/lib/auth';



const routeContextSchema = z.object({
    params: z.object({
        id: z.string(),
    }),
})

export async function GET(req: NextRequest, context: z.infer<typeof routeContextSchema>) {
    try {
        const { params } = routeContextSchema.parse(context);

        // Check if the user has access to view staff members for this business.
        // if (!(await verifyCurrentUserHasAccessToBusiness(params.id))) {
        //     return new Response(null, { status: 403 });
        // }

        // Fetch staff members from the database
        const staffMembers = await db.staff.findMany({
            where: {
                businessId: params.id,
            },
        });

        // Send the fetched staff members as the response
        return new Response(JSON.stringify(staffMembers));

    } catch (error) {
        return new Response(null, { status: 500 });
    }
}


export async function POST(req: NextRequest, context: z.infer<typeof routeContextSchema>) {
    return auth(async (request) => {
        try {
            let json = await req.json();
            const { userId } = json; // Define CreateStaffSchema
    
            const { params } = routeContextSchema.parse(context);
    
            // Check if the user has access to create staff for this business.
            if (!(await verifyCurrentUserHasAccessToBusiness(request, params.id))) {
                return new Response(null, { status: 403 });
            }
    
            // Create a staff member in the database
            const staffMember = await db.staff.create({
                data: {
                    user: {
                        connect: {
                            id: userId,
                        },
                    },
                    business: {
                        connect: {
                            id: params.id,
                        },
                    },
                },
            });
    
            return new Response(JSON.stringify(staffMember));
    
        } catch (error) {
            if (error instanceof z.ZodError) {
                return new Response(JSON.stringify(error.issues), { status: 422 });
            }
    
            return new Response(null, { status: 500 });
        }
    })(req, context)
    
}

export async function DELETE(req: NextRequest, context: z.infer<typeof routeContextSchema>) {
    return auth(async (request) => {
        try {
            const { params } = routeContextSchema.parse(context);
            let url = new URL(req.url)
            let id = url?.searchParams?.get('id')
    
            if (!id) {
                return new Response(null, { status: 500 });
            }
    
            // Check if the user has access to remove staff from this business.
            if (!(await verifyCurrentUserHasAccessToBusiness(request, params.id))) {
                console.log(params?.id)
                return new Response(null, { status: 403 });
            }
    
            // Find the staff member by ID
            const existingStaff = await db.staff.findUnique({
                where: {
                    id: id,
                },
            });
    
            // If the staff member doesn't exist, return a 404 response
            if (!existingStaff) {
                return new Response(null, { status: 404 });
            }
    
            // Delete the staff member
            await db.staff.delete({
                where: {
                    id,
                },
            });
    
            // Return a success response
            return new Response(null, { status: 200 });
    
        } catch (error) {
            return new Response(null, { status: 500 });
        }
    })(req, context)
    
}