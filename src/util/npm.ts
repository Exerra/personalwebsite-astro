interface NPMPackage { name: string, updated: { ts: number }, created: { ts: number }, description: string }

const getNPMPackages = async () => {
    const npm = await fetch("https://www.npmjs.com/~exerra", {
        headers: {
            "X-Spiferack": "1"
        }
    })

    const npmData = await npm.json() as { packages: { objects: NPMPackage[] } }

    npmData.packages.objects.sort((a, b) => {
        return b.created.ts - a.created.ts
    })

    return npmData
}

export default getNPMPackages