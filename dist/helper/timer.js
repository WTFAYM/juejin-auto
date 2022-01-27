"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomSleep = void 0;
const getRandomTime = (min, max) => (Math.floor(Math.random() * (max - min)) + min) * 1000;
const randomSleep = () => new Promise(((resolve) => setTimeout(resolve, getRandomTime(2, 4))));
exports.randomSleep = randomSleep;
