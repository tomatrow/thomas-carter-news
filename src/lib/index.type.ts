import type { WP_REST_API_Post, WP_REST_API_Attachment, WP_REST_API_Category } from "$lib/wp-types"

export type SlimPost = Pick<
    WP_REST_API_Post,
    "id" | "title" | "link" | "categories" | "featured_media"
> & {
    featured_image_url: string
    full_categories: {
        slug: string
        id: string
        name: string
    }[]
}
export type SlimMedia = Pick<
    WP_REST_API_Attachment,
    "id" | "alt_text" | "source_url" | "media_type"
>
export type SlimCategory = Pick<WP_REST_API_Category, "id" | "link" | "name">
