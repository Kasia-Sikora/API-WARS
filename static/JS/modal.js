import { data_handler } from "./api_connection.js";


export const modal_handling = {

    createModalTable: function (modal_body) {
        if (modal_body.children.length) {
            for (let child of modal_body.children) {
                modal_body.removeChild(child)
            }
        }
        let modal_table = document.createElement('modal_table');
        modal_table.setAttribute('class', 'table table-bordered');
        let row = document.createElement('tr');
        let modal_table_headers = ['Name', 'Height', 'Mass', 'Hair color', 'Skin color', 'Eye color', 'Birth year', 'Gender'];

        for (let header of modal_table_headers) {
            let column = document.createElement('th');
            column.innerText = header;
            row.appendChild(column);
        }
        modal_table.appendChild(row);
        modal_body.appendChild(modal_table)
    },

    createModalColumns: function (data) {
        let modalTable = document.getElementsByTagName('modal_table')[0];
        let modal_headers = [data.name, data.height, data.mass, data.hair_color, data.skin_color, data.eye_color, data.birth_year, data.gender];
        let row = document.createElement('tr');

        for (let i = 0; i < modal_headers.length; i++) {
            const col = document.createElement('td');

            if (modal_headers[i] == data.name) {
                col.innerText = data.name
            }
            if (modal_headers[i] == data.height) {
                col.innerText = data.height
            }
            if (modal_headers[i] == data.mass) {
                col.innerText = data.mass
            }
            if (modal_headers[i] == data.hair_color) {
                col.innerText = data.hair_color
            }
            if (modal_headers[i] == data.skin_color) {
                col.innerText = data.skin_color
            }
            if (modal_headers[i] == data.eye_color) {
                col.innerText = data.eye_color
            }
            if (modal_headers[i] == data.birth_year) {
                col.innerText = data.birth_year
            }
            if (modal_headers[i] == data.gender) {
                col.innerText = data.gender
            }
            row.appendChild(col);
            modalTable.appendChild(row)
        }
    },

    modalHandling: function (data) {
        let modal_title = document.getElementsByClassName('modal-title');
        let modal_body = document.getElementsByClassName('modal-body')[0];
        modal_title[0].innerText = '';
        modal_title[0].innerText = "Residents of " + data;
        modal_handling.createModalTable(modal_body);
        let residents = document.querySelectorAll('button');
        for (let resident of residents) {
            if (resident.dataset.name == data) {
                let page = resident.dataset.residents;
                let pages = page.split(',');
                data_handler.fetchMultipleData(pages, modal_handling.createModalColumns)
            }
        }
    }
};