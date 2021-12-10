import type { SlimPost, SlimMedia, SlimCategory } from "$lib/index.type"
import { WP_CATEGORY_ID, WP_PER_PAGE } from "$lib/constants"
import { request } from "optional-default-site-kit/functions/request"
import { WP_ENDPOINT } from "$lib/constants"

export async function wpapi<Output>(path: string, params?: Record<string, string>) {
    let uri = WP_ENDPOINT + "/wp/v2" + path
    if (params) {
        const searchParams = new URLSearchParams(params)
        uri = uri + "?" + searchParams.toString()
    }
    return await request<unknown, Output>(uri)
}

export async function getPage(i: number) {
    return await wpapi<SlimPost[]>("/posts", {
        categories: WP_CATEGORY_ID,
        per_page: WP_PER_PAGE,
        page: String(i),
        _fields: "id,title,link,featured_media,featured_image_url,categories,full_categories"
    })
}

export async function getCategories(ids: number[]) {
    return await wpapi<SlimCategory[]>("/categories", {
        include: ids.join(",")
        // _fields: "id,link,name"
    })
}

export async function getMedia(ids: number[]) {
    const params = {
        include: ids.reverse().join(",")
        // _fields: "id,alt_text,source_url,media_type"
    }
    return await wpapi<SlimMedia[]>("/media", params)
}
