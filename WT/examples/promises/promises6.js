//promises are rejected and resolved with some data(valid results or errors)

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

saveToDb("kmit")
    .then((result) => {
        console.log("result of promise: ", result);
        console.log("success1 : data1 saved");
        return saveToDb("cse");
    })
    .then((result) => {
        console.log("result of promise: ", result);
        console.log("success2 : data2 saved");
        return saveToDb("vishal");
    })
    .then((result) => {
        console.log("result of promise: ", result);
        console.log("success3 : data3 saved");
    })
    .catch((error) => {
        console.error("error: ", error);
    });
        