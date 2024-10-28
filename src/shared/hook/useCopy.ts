export const useCopy = (data: any): any => {
    const item: any = {}

    const deepCopy = (source: any, target: any) => {
        for (const key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                if (typeof source[key] === 'object' && source[key] !== null) {
                    target[key] = deepCopy(source[key], Array.isArray(source[key]) ? [] : {})
                } else {
                    target[key] = source[key]
                }
            }
        }

        return target
    }

    deepCopy(data, item)

    return item
}
