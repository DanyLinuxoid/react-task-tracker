export const groupBy = <T>(records: T[], key: keyof T): Record<string, T[]> => {
    return records.reduce((previous, currentItem) => {
        const group = String(currentItem[key]);
        if (!previous[group]) {
            previous[group] = [];
        }
        previous[group].push(currentItem);
        return previous;
    }, {} as Record<string, T[]>);
};