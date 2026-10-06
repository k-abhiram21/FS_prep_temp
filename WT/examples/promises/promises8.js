h1 = document.querySelector('h1');

function changeColor(color, delay) {
    return new Promise((resolve, reject) => {

        setTimeout(() => {
            h1.style.color = color;
            resolve(`${color} color changed`);
        }, delay);

    });
}

let p1 = changeColor("red", 1000);

console.log("p1:", p1);   // pending

p1.then(() => {
    console.log("p1:", p1);   // fulfilled
    console.log("red color was completed");

    let p2 = changeColor("green", 5000);

    console.log("p2:", p2);   // pending

    p2.then(() => {
        console.log("p2:", p2);   // fulfilled
        console.log("green color was completed");

        let p3 = changeColor("blue", 1000);

        console.log("p3:", p3);   // pending

        p3.then(() => {
            console.log("p3:", p3);   // fulfilled
            console.log("blue color was completed");
        });
    });
});