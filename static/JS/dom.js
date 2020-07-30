import { data_handler } from "./api_connection.js";
import { modal_handling } from "./modal.js";

export const dom = {

    createNextButton: function (nextPage) {
        const nextButton = document.getElementById('nextButton');
        if (nextPage !== null) {
            nextButton.addEventListener('click', data_handler.pageUp);
            nextButton.disabled = false;
        } else {
            nextButton.disabled = true;
        }
    },

    createPrevButton: function (previousPage) {
        const previousButton = document.getElementById('previousButton');
        if (previousPage !== null) {
            previousButton.addEventListener('click', data_handler.pageDown);
            previousButton.disabled = false;
        } else {
            previousButton.disabled = true;
        }
    },

    createTableWithHeaders: function () {
        const table = document.getElementById('main_table');
        const row = document.createElement('tr');

        const table_headers = ["Name", "Diameter", "Climate", "Terrain", "Surface Water Percentage", "Population", "Residents", ""];
        for (let i = 0; i < table_headers.length; i++) {
            const header = document.createElement('th');
            header.innerText = table_headers[i];
            row.appendChild(header)
        }
        table.appendChild(row);
    },

    createRowsAndColumns: function (data) {
        let data_array = data.results;
        const table = document.getElementById('main_table');

        data_array.forEach((data) => {
            dom.createColumn(data, table);
        });
    },

    createColumn: function (data, table) {

        let userLogin = '';
        try {
            const login = document.getElementById('login');
            if (login !== null) {
                userLogin = login.innerHTML
            }
        }catch(error){
            console.log(error)
        }

        const row = document.createElement('tr');
        table.appendChild(row);

        const table_headers = [data.name, data.diameter, data.climate, data.terrain,
            data.surface_water, data.population, data.residents, ""];

        for (let i = 0; i < table_headers.length; i++) {
            // console.log(data);
            let col = document.createElement('td');
            row.appendChild(col);

            if (table_headers[i] === data.residents) {
                if (data.residents.length === 0) {
                    col.innerText = "No known residents"
                } else {
                    dom.createResidentsButton(col, table_headers, i, data.residents, data.name);
                }
            } else {
                col.innerText = table_headers[i]
            }
            if (table_headers[i] === "") {
                if (userLogin !== '') {
                    dom.createVoteButton(col, data.url.slice(-2)[0], userLogin, data.name);
                } else {
                    col.innerText = "Login to vote"
                }
            }
            if (table_headers[i] === data.population) {
                col.innerText = table_headers[i] + " people"
            }
            if (table_headers[i] === data.diameter) {
                col.innerText = table_headers[i] + " km"
            }
            if (table_headers[i] === data.surface_water) {
                col.innerText = table_headers[i] + " %"
            }
        }

    },
    createResidentsButton: function (col, table_headers, i, residents, name) {
        const button = document.createElement('button');
        button.dataset.type = "residents-button";
        button.dataset.residents = residents;
        button.dataset.name = name;
        button.dataset.target = '#exampleModalCenter';
        button.dataset.toggle = 'modal';
        button.setAttribute("class", 'button');
        button.innerText = table_headers[i].length + ' resident(s)';
        col.appendChild(button);
        button.addEventListener("click", () => {
            modal_handling.modalHandling(name)
        })
    },

    createVoteButton: function (col, id, userLogin, planetName) {
        const button = document.createElement('button');
        button.setAttribute("class", 'button');
        button.dataset.type = "button";
        button.dataset.planet_id = id;
        button.dataset.name = planetName;
        button.innerText = "Vote";
        col.appendChild(button);
        let voteData = '';
        voteData = {
          user: userLogin,
          planetName: planetName,
          planetId: id
        };
        button.addEventListener('click', ()=>{
            data_handler.postData('/save-vote-data', voteData)
        })

    }

};