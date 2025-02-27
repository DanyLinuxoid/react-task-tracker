export const getNewId = (obj: any | null): number => {
    return obj?.id ?? crypto.randomUUID();
}