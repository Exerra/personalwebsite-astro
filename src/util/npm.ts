export interface NPMPackages {
    objects: Object[];
    total:   number;
    time:    string;
}

export interface Object {
    downloads:   Downloads;
    dependents:  number | string;
    updated:     string;
    searchScore: number;
    package:     Package;
    score:       Score;
    flags:       Flags;
}

export interface Downloads {
    monthly: number;
    weekly:  number;
}

export interface Flags {
    insecure: number;
}

export interface Package {
    name:           string;
    keywords:       string[];
    version:        string;
    description:    string;
    sanitized_name: string;
    publisher:      Publisher;
    maintainers:    Publisher[];
    license?:       string;
    date:           string;
    links:          Links;
}

export interface Links {
    homepage?:   string;
    repository?: string;
    bugs?:       string;
    npm:         string;
}

export interface Publisher {
    email:    string;
    username: string;
}

export interface Score {
    final:  number;
    detail: Detail;
}

export interface Detail {
    popularity:  number;
    quality:     number;
    maintenance: number;
}



const getNPMPackages = async () => {
    const npm = await fetch("https://registry.npmjs.org/-/v1/search?text=author:exerra&size=250")

    const npmData = await npm.json() as NPMPackages

    // npmData.packages.objects.sort((a, b) => {
    //     return b.created.ts - a.created.ts
    // })

    npmData.objects.sort((a, b) => {
        return b.package.date.localeCompare(a.package.date)
    })

    return npmData
}

export default getNPMPackages