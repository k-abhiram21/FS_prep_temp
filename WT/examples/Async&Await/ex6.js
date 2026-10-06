function getNum(name) {

    console.log(`${name} function called`);

    return new Promise((resolve, reject) => {

        console.log(`${name} Promise created`);

        setTimeout(() => {

            let num = Math.floor(Math.random() * 10) + 1;

            console.log(`${name} completed → ${num}`);

            resolve();

        }, 1000);
    });
}


async function demo() {

    console.log("demo started");

   await getNum("getNum-1");

    console.log("After getNum-1");

    await getNum("getNum-2");

    console.log("After getNum-2");

     getNum("getNum-3");

    console.log("After getNum-3");

     getNum("getNum-4");

    console.log("After getNum-4");

    getNum("getNum-5");

    console.log("demo completed");
}

demo();