const getRandomTime = (min: number, max: number) =>
    (Math.floor(Math.random() * (max - min)) + min) * 1000


export const randomSleep = () => new Promise(((resolve) => setTimeout(resolve, getRandomTime(2, 4))));