<script lang="ts">
    import type { SlimPost } from "$lib/index.type"
    import { slide } from "svelte/transition"

    export let post: SlimPost
</script>

<section class="flex flex-col gap-4">
    {#if post.featured_image_url}
        <a href={post.link} target="_blank">
            <img loading="lazy" class="rounded" src={post.featured_image_url} alt="featured" />
        </a>
    {/if}
    {#if post.full_categories.length > 0}
        <div class="flex gap-2 flex-wrap">
            {#each post.full_categories as { name, slug }}
                <a
                    transition:slide
                    class="text-sm font-semibold"
                    target="_blank"
                    href="{import.meta.env.VITE_WP_ORIGIN}/category/{slug}">{name}</a
                >
            {/each}
        </div>
    {/if}
    <a class="text-xl font-bold" href={post.link} target="_blank">
        {@html post.title.rendered}
    </a>
</section>
