// 50
// 40 39
// 30 29 28
// 20 19 18 17
// 10 9  8  7  6
let data = 100;
let dec1 = 20;
let dec2 = 1;

for (let i = 0; i < 5; i++) {
    let row = "";
    let tempData = data;

    for (let j = 0; j <= i; j++) {
        switch (j) {
            case 0:
                row += tempData;
                break;
            default:
                tempData -= dec2;
                row += "\t" + tempData;
                break;
        }
    }

    data -= dec1;
    console.log(row);
}




// for (let i = 1; i <= 5; i++) {
//     let rows = '';
//     for (let j = 1; j <= i; j++) {
//       rows +=' '+'*';
//     }
//     console.log(rows);
//   }
  

// for (let i = 0; i < 5; i++) {
//     for (let j = 0; j <= i; j++) {
//         console.log("*")
//     }
//     console.log("\n")
// }



