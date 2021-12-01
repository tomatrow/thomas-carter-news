module.exports = {
    onPreBuild: async ({ utils: { build, run } }) => {
        try {
            await run.command("npm install -g pnpm")
            await run.command("pnpm install --shamefully-hoist")
            await run.command("pnpm build")
        } catch (error) {
            return build.failBuild(error)
        }
    }
}
