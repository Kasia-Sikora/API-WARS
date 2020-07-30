import {data_handler} from "./api_data_handler.js";
import {fetchData} from "./api_connection.js";

const page = 'https://swapi.dev/api/planets';


fetchData(page, main_function);


function createNextButton(nextPage) {
    const nextButton = document.getElementById('nextButton');
    if (nextPage == null) {
        nextButton.setAttribute('disabled', 'disabled');
    } else {
        nextButton.removeAttribute('disabled');
        nextButton.addEventListener('click', data_handler.pageUp);
    }
}


function createPrevButton(previousPage) {
    const previousButton = document.getElementById('previousButton');
    if (previousPage == null) {
        previousButton.setAttribute('disabled', 'disabled');
    } else {
        previousButton.removeAttribute('disabled');
        previousButton.addEventListener('click', data_handler.pageDown);
    }
}


function createTableWithHeaders() {
    const table = document.getElementById('main_table');
    const row = document.createElement('tr');

    const table_headers = ["Name", "Diameter", "Climate", "Terrain", "Surface Water Percentage", "Population", "Residents", ""];
    for (let i = 0; i < table_headers.length; i++) {
        const header = document.createElement('th');
        header.innerText = table_headers[i];
        row.appendChild(header)
    }
    table.appendChild(row);
}


function createRowsAndColumns(data) {
    let data_array = data.results;
    const table = document.getElementById('main_table');

    data_array.forEach((data) => {
        data_handler.createColumn(data, table);
    });
}


function main_function(data) {
    data_handler.next = data.next;
    data_handler.prev = data.previous;
    data_handler.callbackfn = main_function;
    createNextButton(data.next);
    createPrevButton(data.previous);
    createTableWithHeaders();
    createRowsAndColumns(data);
}
