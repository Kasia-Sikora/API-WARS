import { dom } from './dom.js';
import { data_handler } from "./api_connection.js";


const page = 'https://swapi.dev/api/planets';


function init(data) {
    data_handler.next = data.next;
    data_handler.prev = data.previous;
    data_handler.callbackfunction = init;
    dom.createNextButton(data.next);
    dom.createPrevButton(data.previous);
    dom.createTableWithHeaders();
    dom.createRowsAndColumns(data);
}

data_handler.fetchData(page, init);