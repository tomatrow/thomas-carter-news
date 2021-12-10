<script lang="ts" context="module">
    import type { Load } from "@sveltejs/kit"
    import { getPage } from "$lib/wpapi"

    export const load: Load = async () => {
        return {
            status: 200,
            props: {
                currentPage: 1,
                posts: await getPage(1)
            }
        }
    }    
</script>

<script lang="ts">
    import type { SlimPost, SlimMedia, SlimCategory } from "$lib/index.type"
    import {  getCategories, getMedia } from "$lib/wpapi"
    import _ from "lodash"
    import Masonry from 'svelte-bricks'
    import PostItem from "$lib/PostItem.svelte"

    export let posts: SlimPost[]
    export let currentPage: number = 0
    let mediaCache: Record<number,SlimMedia> = {}
    let categoryCache: Record<number,SlimCategory> = {}
    
    async function updateCaches(posts: SlimPost[]) {
        updateCache(posts.flatMap(post => post.categories), categoryCache, getCategories)
            .then(result => categoryCache = result)
        updateCache(posts.map(post => post.featured_media), mediaCache, getMedia)
            .then(result => mediaCache = result)
    }
    
    async function updateCache<T extends SlimCategory|SlimMedia>(ids: number[], cache: Record<number, T>, fetcher: (ids: number[]) => Promise<T[]>) {
        const newIds = ids.filter(id => !cache[id])
        if (newIds.length === 0) return 
        const results = await fetcher(newIds)
        console.log({ results })
        const newCache: Record<number,T> = {}
        results.forEach(result => newCache[result.id] = result)
        return {...cache, ...newCache}
    }
    
    // $: updateCaches(posts)
    
    // async function loadNextPage() {
    //     currentPage++
    //     const newPosts = await getPage(currentPage)
    //     posts = [...posts, ...newPosts]
    // }

    let innerHeight

    $: console.log({ mediaCache })
    $: console.log({ posts })
    $: console.log({ categoryCache })
</script>

<svelte:window bind:innerHeight />

<Masonry items={posts.map(post => post.id)} let:item gap={40} animate={false}>
<!--     <PostItem post={posts.find(post => post.id === item)} {mediaCache} {categoryCache} /> -->
</Masonry>

<style global>
/*     @media (min-width: 320px) { height: 3000px }
    @media (min-width: ) {}
    @media (min-width: ) {}
    @media (min-width: ) {}
    @media (min-width: ) {} */

    div.masonry {
        overflow: hidden;
/*         height: 2000px; */
    }
</style>