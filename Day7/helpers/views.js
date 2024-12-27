import {readFileSync, writeFileSync} from 'fs';
import path from 'path';


function getCurrentViews() {
    //read content of file string
const content = readFileSync(path.resolve('views.json'),{encoding:'utf-8'});
//convert to json
const parsedContent = JSON.parse(content);
return parsedContent;
}
function increaseViews() {
    //read current views
    let currentViews = getCurrentViews();
    //increase views
    let count = currentViews.count;
    count += 1;
    currentViews['count'] = count;
    //write to file
    writeFileSync(path.resolve('views.json'),JSON.stringify(currentViews),{
        encoding:'utf-8'
    });
    return currentViews;

}
// console.log(getCurrentViews());
// console.log(increaseViews());
export {getCurrentViews, increaseViews};
//export {increaseViews}; 