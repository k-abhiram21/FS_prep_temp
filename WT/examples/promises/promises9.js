/*
Promise.all()

Suppose the requirement is:

"Save KMIT, CSE and Vishal. I want to continue only when ALL three database operations succeed."
*/

function saveToDb(data) {
    return new Promise((resolve, reject) => {

        let internetSpeed = Math.floor(Math.random() * 10) + 1;

        if (internetSpeed > 4) {
            resolve(`${data} : data was saved`);
        } else {
            reject(`${data} : failure - weak connection`);
        }

    });
}

let p1 = saveToDb("kmit");
let p2 = saveToDb("cse");
let p3 = saveToDb("vishal");

Promise.all([p1, p2, p3])
    .then((results) => {
        console.log("ALL DATA SAVED");
        console.log(results);
    })
    .catch((error) => {
        console.error("At least one save failed:", error);
    });