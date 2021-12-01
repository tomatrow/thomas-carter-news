<script lang="ts">
    import { onMount } from "svelte"
    import type { SlimPost, SlimMedia, SlimCategory } from "$lib/index.type"
    import { getPage, getCategories, getMedia } from "$lib/wpapi"
    import _ from "lodash"
    import Masonry from 'svelte-bricks'
    import PostItem from "$lib/PostItem.svelte"

    let posts: SlimPost[] = []
    let currentPage = 0    
    let mediaCache: Record<number,SlimMedia> = {}
    let categoryCache: Record<number,SlimCategory> = {}
    
    $: if (posts.length > 0) {
        const newMediaIds = posts.map(post => post.featured_media).filter(id => !mediaCache[id])
        if (newMediaIds.length > 0)
            getMedia(newMediaIds)
                .then(medias => medias.forEach(media => mediaCache[media.id] = media))
        
        const newCategoryIds = posts.flatMap(post => post.categories).filter(id => !categoryCache[id])
        if (newCategoryIds.length > 0)
            getCategories(newCategoryIds)
                .then(categories => categories.forEach(category => categoryCache[category.id] = category))
    }
    
    async function loadNextPage() {
        currentPage++
        const newPosts = await getPage(currentPage)
        posts = [...posts, ...newPosts]
    }
    
    onMount(() => loadNextPage())
    
    $: console.log({ posts })
</script>

<section {...$$restProps}>
    <Masonry items={posts.map(post => post.id)} let:item gap={40} animate={false}>
        <PostItem post={posts.find(post => post.id === item)} {mediaCache} {categoryCache} />
    </Masonry>
    
    <button class="text-center w-full" type="button" on:click={loadNextPage}>
        Load More Items
    </button>
</section>
