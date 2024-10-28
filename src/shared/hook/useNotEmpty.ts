export const useNotEmpty = (obj: any): any => {
    if (!obj) return

    let newObj: any = {}

    const ownKeys = Object.keys(obj).filter(key => obj.hasOwnProperty(key))

    for (const key of ownKeys) {
        if (obj[key] && typeof obj[key] !== 'object' || typeof obj[key] == 'boolean') {
            newObj[key] = obj[key]
        }

        if (obj[key] && typeof obj[key] == 'object' && !Array.isArray(obj[key]) && Object.keys(obj[key])?.length) {
            const value = useNotEmpty(obj[key])

            if (Object.keys(value)?.length) {
                newObj[key] = useNotEmpty(obj[key])
            }
        }

        if (obj[key] && Array.isArray(obj[key])) {
            newObj[key] = obj[key]
        }
    }

    return newObj
}
