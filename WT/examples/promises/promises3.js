//Promise is an object that represents the eventual completion (or failure) of an asynchronous operation and its resulting value.
//A Promise is in one of these states:
//Pending: initial state, neither fulfilled nor rejected.
//Fulfilled: meaning that the operation completed successfully.
//Rejected: meaning that the operation failed.

function saveToDb(data) {
    return new Promise((resolve, reject) => {

        let internetSpeed = Math.floor(Math.random() * 10) + 1;

        if (internetSpeed > 4) {
            resolve("success : data was saved");
        } else {
            reject("failure : weak connection");
        }

    });
}

//saveToDb("kmit");  run through browser console and check the output in console


