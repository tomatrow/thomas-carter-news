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
    import type { SlimPost } from "$lib/index.type"
    import _ from "lodash"
    import Masonry from "svelte-bricks"
    import PostItem from "$lib/PostItem.svelte"

    export let posts: SlimPost[]

    $: console.log({ posts })
</script>

<Masonry items={posts.map(post => post.id)} let:item gap={40} animate={false}>
    <PostItem post={posts.find(post => post.id === item)} />
</Masonry>

<style lang="postcss">
    :global(div.masonry) {
        @apply p-4;
    }
</style>
