<script lang="ts">
    import type { SlimPost, SlimMedia, SlimCategory } from "$lib/index.type"
    import { slide } from "svelte/transition"
    
    export let post: SlimPost
    export let mediaCache: Record<number,SlimMedia>
    export let categoryCache: Record<number,SlimCategory>
</script>

<section class="flex flex-col gap-4">
    {#if mediaCache[post.featured_media]}
        <a href={post.link} target="_blank">
            {#if mediaCache[post.featured_media].media_type === "image"}
                <img class="rounded" alt={mediaCache[post.featured_media].alt_text} src={mediaCache[post.featured_media].source_url} />
            {/if}
        </a>
    {/if}
    {#if post.categories.length > 0}
        <div class="flex gap-2 flex-wrap">
            {#each post.categories as category}
                {#if categoryCache[category]}
                    <a transition:slide class="text-sm font-semibold" target="_blank" href={categoryCache[category].link}>{categoryCache[category].name}</a>
                {/if}
            {/each}
        </div>
    {/if}
    <a class="text-xl font-bold" href={post.link} target="_blank">
        {@html post.title.rendered}
    </a>
</section>
