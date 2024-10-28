export const useIsNotEmpty = (obj: any): boolean => {
    if (!obj) return false

    const ownKeys = Object.keys(obj).filter(key => obj.hasOwnProperty(key))

    for (const key of ownKeys) {
        if (obj[key] && typeof obj[key] !== 'object' || typeof obj[key] == 'boolean') {
            return true
        }

        if (obj[key] && typeof obj[key] == 'object' && !Array.isArray(obj[key]) && Object.keys(obj[key])?.length) {
            return useIsNotEmpty(obj[key])
        }
    }

    return false
}
