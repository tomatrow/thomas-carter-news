import type { WP_REST_API_Post, WP_REST_API_Attachment, WP_REST_API_Category } from 'wp-types'

export type SlimPost = Pick<WP_REST_API_Post, "id"|"title"|"link"|"categories"|"featured_media">
export type SlimMedia = Pick<WP_REST_API_Attachment,"id"|"alt_text"|"source_url"|"media_type">
export type SlimCategory = Pick<WP_REST_API_Category, "id"|"link"|"name"> 
