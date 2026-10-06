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


async function test() {

    try {

        console.log("A");

        let result = await saveToDb("kmit");

        console.log("B");
        console.log(result);

    }
    catch (error) {

        console.log("Error:", error);

    }
}

test();

console.log("C");