import {readFileSync, writeFileSync} from 'fs';
import path from 'path';

function getCurrentViews() {
    const content = readFileSync(path.resolve('views.json'), { encoding: 'utf-8' });
    const parsedContent = JSON.parse(content);
    return parsedContent;
}

function updateViews(newCount) {
    const updatedViews = { count: newCount };
    writeFileSync(path.resolve('views.json'), JSON.stringify(updatedViews), {
        encoding: 'utf-8'
    });
    return updatedViews;
}

function increaseViews() {
    let currentViews = getCurrentViews();
    let count = currentViews.count;
    count += 1;
    return updateViews(count);
}

function decreaseViews() {
    const currentViews = getCurrentViews();
    let count = currentViews.count - 10;
    if (count < 0) count = 0;
    return updateViews(count);
}


function resetViews() {
    return updateViews(0);
}

function addTask(task) {
    const data = getCurrentViews();
    if (!data.tasks.includes(task)) {
        data.tasks.push(task);
    }
    return updateData(data);
}


// function removeTask(task) {
//     const data = getData();
//     const newTasks = [];
//     for (let i = 0; i < data.tasks.length; i++) {
//         if (data.tasks[i] !== task) {
//             newTasks.push(data.tasks[i]);
//         }
//     }
//     data.tasks = newTasks;
//     return saveData(data);
// }
export { getCurrentViews, increaseViews, decreaseViews, resetViews};
