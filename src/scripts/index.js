import { buildTask1Html, task1Data, setupTask1Listeners, task1Listeners } from './task1.js';
import { buildTask2Html, task2Data } from './task2.js';
import { buildTask3Html, task3Data, setupTask3Listeners } from './task3.js';
import { buildTask4Html, task4Listeners, setupTask4Listeners } from './task4.js';
import { buildTask5Html, setupTask5Listeners, task5Listeners, task5Data } from './task5.js';

const task1html = buildTask1Html(task1Data);
const task2html = buildTask2Html(task2Data);
const task3html = buildTask3Html(task3Data);
const task4Html = buildTask4Html();
const task5Html = buildTask5Html();

document.body.innerHTML += task1html;
document.body.innerHTML += task2html;
document.body.innerHTML += task3html;
document.body.innerHTML += task4Html;
document.body.innerHTML += task5Html;

setupTask1Listeners(task1Listeners);
setupTask3Listeners();
setupTask4Listeners(task4Listeners);
setupTask5Listeners(task5Listeners, task5Data);
