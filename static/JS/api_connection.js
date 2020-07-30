export const data_handler = {

    table: document.getElementById('main_table'),
    next: '',
    prev: '',
    callbackfunction: () => {},

    fetchData: function(page, callback){
    fetch(page)  // set the path; the method is GET by default, but can be modified with a second parameter
        .then((response) => response.json())  // parse JSON format into JS object
        .then((data) => {
            callback(data)
        });
},
    fetchMultipleData: function(page, callback) {
    Promise.all(page)  // set the path; the method is GET by default, but can be modified with a second parameter
        .then(function (values) {
            for (let value of values) {
                data_handler.fetchData(value, callback)
            }
        })
        .catch(error => {
            console.error(error.message)
        });
},
    postData: function(page, data) {
        console.log(page, data);
    fetch(page, {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })  // set the path; the method is GET by default, but can be modified with a second parameter
        .then((response) => response.json())  // parse JSON format into JS object
        .then((data) => {
            console.log(data)
        })
},
        pageUp: () => {
        data_handler.table.innerHTML = '';
        data_handler.fetchData(data_handler.next, data_handler.callbackfunction);
},

    pageDown: () => {
        data_handler.table.innerHTML = '';
        data_handler.fetchData(data_handler.prev, data_handler.callbackfunction);
},
};
