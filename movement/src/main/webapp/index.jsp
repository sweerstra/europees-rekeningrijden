<html>
<body>

<main>
    <div class="config">
        <button id="gather" class="btn">Sync Movements</button>
    </div>

    <table id="table-movements" bordercolor="white" border="1">
        <tr>
            <th>ID</th>
            <th>Tracker ID</th>
            <th>Serial Number</th>
            <th>Longitude</th>
            <th>Latitude</th>
        </tr>
        <!--<tr>
          <td>
                put value here
          </td>
        </tr>-->
    </table>
</main>
</body>

<style>
    :root {
        --color-primary: #3F51B5;
        --color-success: #4CAF50;
        --color-warning: #FFC107;
        --color-danger: #F44336;
        --color-default: transparent;
        --color-tint: white;
        --color-disabled: #c3c3c3;
        --border-radius: 4px;
    }

    * {
        font-family: 'Roboto', sans-serif;
        box-sizing: border-box;
    }

    body {
        color: white;
        background-color: #3F51B5;
        margin: 50px;
    }

    main {
        display: flex;
    }

    table {
        margin-left: 40px;
    }

    table th,
    table td {
        padding: 4px;
        text-align: center;
    }

    /* -------- btn -------- */

    .btn {
        padding: 8px 30px;
        color: var(--color-tint);
        background-color: var(--color-default);
        border: 2px solid var(--color-tint);
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .btn:focus {
        outline: none;
    }

    .btn:hover {
        box-shadow: 0 2px 4px rgba(0, 0, 0, .25);
    }

    .blue {
        background-color: var(--color-primary);
    }

    .green {
        background-color: var(--color-success);
    }

    .yellow {
        background-color: var(--color-warning);
    }

    .red {
        background-color: var(--color-danger);
    }

    .rounded {
        border-radius: var(--border-radius);
    }

    .btn.full {
        width: 100%;
    }

    a.btn {
        text-decoration: none;
    }

    .btn.no-border {
        border: none;
    }

    /* -------- input -------- */

    input {
        padding: 8px;
        font-size: 16px;
        color: var(--color-tint);
        font-weight: bold;
        background-color: var(--color-default);
        border: 2px solid var(--color-tint);
        display: block;
    }

    input {
        margin: 10px 0;
    }

    input:focus {
        outline: none;
    }

    input::placeholder {
        color: var(--color-disabled);
        font-weight: normal;
    }

    .light {
        --color-tint: white;
    }

    .dark {
        --color-tint: black;
    }
</style>

<script>
    // const json = '{"tracker":{"id":1},"serialNumber":"ENG1529","longitude":51.529026,"latitude":-0.107804924,"time":"2018-03-15 10:22"}';

    const headers = {
        "Content-Type": "application/json"
    };

    const addMovements = (movements) => {
        document.getElementById('table-movements').innerHTML =
            `<tr>
    <th>ID</th>
    <th>Tracker ID</th>
    <th>Serial Number</th>
    <th>Longitude</th>
    <th>Latitude</th>
  </tr>` +

            movements.map(function (movement) {
                return '<tr>' + Object.entries(movement).map(function ([key, value]) {
                    if (value === null) return null;
                    if (typeof value === 'object') {
                        return '<td>' + value.id + '</td>';
                    }
                    return '<td>' + value + '</td>';
                }).filter(Boolean).join('') + '</tr>';
            }).join('');
    };

    document.getElementById('gather').addEventListener('click', () => {
        // addMovements();
        console.log('click');

        setInterval(() => {
            console.log('Request and add movements');

            fetch('http://localhost:8080/movement/api/movement/all', {method: 'get', headers: headers})
                .then(function (resp) {
                    return resp.json();
                })
                .then(function (json) {
                    console.log(json);
                    addMovements(json);
                });

            if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
                // you're at the bottom of the page
                console.log("Bottom of page");
                window.scrollTo(0, document.body.scrollHeight);
            }
        }, 5000);
    });

    // addMovements();

</script>

</html>
