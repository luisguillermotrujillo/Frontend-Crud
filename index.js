document.addEventListener("DOMContentLoaded", function() {
    fetch("http://localhost:5000/getAll")
    .then(response => response.json())
    .then(data => loadHTMLtable(data["data"]))
    
});
const addBtn = document.getElementById("add-Name-btn");

addBtn.addEventListener("click", function () {
    const nameImput = document.getElementById("name-input");
    const name = nameImput.value;
    nameImput.value = "";

    fetch("http://localhost:5000/insert",{
        headers:{
            'content-type':'application/json'
        },
        method: 'POST',
        body: JSON.stringify({name: name})
    })
    .then(response => response.json())
    .then(data => insertRowIntoTable(data["data"]))
});
function  insertRowIntoTable(data) {
    
}

function loadHTMLtable(data) {
    const table = document.querySelector("table tbody");
    console.log(data);

    if (data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan = '5'>No-Data</td></tr>";
    }
}