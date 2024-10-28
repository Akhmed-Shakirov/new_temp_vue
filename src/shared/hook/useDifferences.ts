export const useDifferences = (main: any, old: any): any => {
    const differences: any = {}

    for (const key in main) {
        if (old[key] !== main[key] && typeof main[key] !== 'object') {
            differences[key] = main[key]
        }
        if (typeof main[key] == 'object') {
            const value = useDifferences(main[key], old[key])

            if (Object.keys(value)?.length) {
                differences[key] = value
            }
        }
    }

    return differences
}
