interface NPMPackage { name: string, updated: { ts: number }, created: { ts: number }, description: string }

const getNPMPackages = async () => {
    try {
        const npm = await fetch("https://www.npmjs.com/~exerra", {
            headers: {
                "X-Spiferack": "1"
            }
        })

        if (!npm.ok) throw new Error(`NPM returned status ${npm.status}`)

        const npmData = await npm.json() as { packages: { objects: NPMPackage[] } }

        npmData.packages.objects.sort((a, b) => {
            return b.created.ts - a.created.ts
        })

        return npmData
    } catch (e) {
        console.error("Failed to fetch NPM packages:", e)
        return { packages: { objects: [] as NPMPackage[] } }
    }
}

export default getNPMPackages