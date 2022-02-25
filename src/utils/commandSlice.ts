export const commandSlice = (body: string, numberOfString: number) => {
    return String(body).slice(numberOfString).trim();
};