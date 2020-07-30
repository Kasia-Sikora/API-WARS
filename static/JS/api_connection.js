export function fetchData(page, callback) {
    fetch(page)  // set the path; the method is GET by default, but can be modified with a second parameter
        .then((response) => response.json())  // parse JSON format into JS object
        .then((data) => {
            callback(data)
        });
}


export function fetchMultipleData(page, callback) {
    Promise.all(page)  // set the path; the method is GET by default, but can be modified with a second parameter
        .then(function (values) {
            for (let value of values) {
                fetchData(value, callback)
            }
        })
        .catch(error => {
            console.error(error.message)
        });
}


function send_post() {
    fetch('localhost:/post-method', {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({a: 7, s: 'Some string: &=&'})
    })  // set the path; the method is GET by default, but can be modified with a second parameter
        .then((response) => response.json())  // parse JSON format into JS object
        .then((data) => {
            console.log(data)
        })
}
