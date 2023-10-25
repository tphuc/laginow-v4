import { z } from "zod"

export const BusinessCreateSchema = z.object({
    title: z.string({
        required_error: "Không được để trống",
    }).min(3, {
        message:"Ít nhất 3 ký tự"
    }),
    slug: z.string().optional(),
    address: z.string({
        required_error: "Không được để trống",
    }),
    banner: z.any().optional(),
    displayBanner: z.boolean().optional(),
    ownerId: z.any(),
    images: z.any().optional(),
    tags: z.array(z.object({
        id: z.string()
    }), {
        required_error: "Không được để trống",
    }).optional()
})

export const ProductCreateSchema = z.object({
    id: z.string().optional(),
    name: z.string().optional(),
    description: z.string().optional(),
    createdAt: z.string().optional(),
    images: z.any().optional(),
    businessId: z.string().optional(),
    minPrice: z.any().optional(),
    maxPrice: z.any().optional(),
    price: z.any().optional(),
    visible: z.boolean().optional(),
    orderable: z.boolean().optional(),
});
  
export const ProductUpdateSchema = z.object({
    id: z.string().optional(),
    name: z.string().optional().nullable(),
    description: z.string().optional().nullable(),
    createdAt: z.string().optional().nullable(),
    images: z.any().optional().nullable(),
    minPrice: z.string().transform(d => parseInt(d)).optional().nullable(),
    maxPrice: z.string().transform(d => parseInt(d)).optional().nullable(),
    price: z.string().transform(d => parseInt(d)).optional().nullable(),
    visible: z.boolean().optional().nullable(),
    orderable: z.boolean().optional().nullable(),
});

export const FormBusinessCreateSchema = z.object({
    title: z.string({
        required_error: "Không được để trống",
    }).min(3, {
        message:"Ít nhất 3 ký tự"
    }),
    slug: z.string().optional(),
    address: z.string({
        required_error: "Không được để trống",
    }),
    banner: z.any().optional(),
    displayBanner: z.boolean().optional().default(false),
    ownerId: z.any().optional(),
    images: z.any().optional(),
    tags: z.array(z.object({
        value: z.any(),
        label: z.any()
    })).max(2, "Tối đa 2 danh mục").optional(),
    workingHrs: z.any().default({
        mon: {
            startTime: '06:00',
            endTime: '23:00',
            isOff: false,
        },
        tue: {
            startTime: '06:00',
            endTime: '23:00',
            isOff: false,
        },
        wed: {
            startTime: '06:00',
            endTime: '23:00',
            isOff: false,
        },
        thu: {
            startTime: '06:00',
            endTime: '23:00',
            isOff: false,
        },
        fri: {
            startTime: '06:00',
            endTime: '23:00',
            isOff: false,
        },
        sat: {
            startTime: '06:00',
            endTime: '23:00',
            isOff: false,
        },
        sun: {
            startTime: '06:00',
            endTime: '23:00',
            isOff: false,
        }
    })
})


export const FormBusinessUpdateSchema = z.object({
    title: z.string({
        required_error: "Không được để trống",
    }).min(3, {
        message:"Ít nhất 3 ký tự"
    }).optional(),
    slug: z.string().optional(),
    address: z.string({
        required_error: "Không được để trống",
    }).optional(),
    banner: z.any().optional(),
    displayBanner: z.boolean().optional().default(false),
    ownerId: z.any().optional(),
    images: z.any().optional(),
    tags: z.array(z.object({
        value: z.any(),
        label: z.any()
    })).optional()
})

export const BusinessUpdateSchema = z.object({
    title: z.string({
        required_error: "Không được để trống",
    }).min(3, {
        message:"Ít nhất 3 ký tự"
    }).optional(),
    slug: z.string().optional(),
    address: z.string({
        required_error: "Không được để trống",
    }).optional(),
    banner: z.any().optional(),
    displayBanner: z.boolean().optional().default(false),
    ownerId: z.any().optional(),
    images: z.any().optional(),
    tags: z.array(z.object({
       id: z.string()
    })).optional(),
    workingHrs: z.any().optional()
})


export const FormBusinessReviewCreateSchema = z.object({
    rating: z.any(),
    images: z.any().optional(),
    content: z.string().optional()
})

export const EventTypeEnum = z.enum([
    'PAGE_VIEW',
    'BUTTON_CLICK',
    'FORM_SUBMIT',
    'LINK_CLICK',
    'SEARCH_VIEW'
]);

export const PageEventCreateSchema = z.object({
    id: z.number()?.optional(),
    eventType: EventTypeEnum,
    // ipAddress: z.string().optional(),
    // userAgent: z.any().optional(),
    // geo: z.any().optional(),
    // reference: z.string().optional(),
    // businessId: z.string().optional(),
    // userId: z.string().optional(),
});