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
    const table = document.querySelector("table tbody");
    const isTableData = table.querySelector(".no-data");

    console.log(data.id.insertId);

    let tableHtml = "<tr>";
    for(var key in data){
        if (data.hasOwnProperty(key)) {
            if (key === "date_added") {
                data[key] = new Date(data[key]).toLocaleString();
            }
            if (key === "id") {
                data[key] = data.id.insertId;
            }
            tableHtml += `<td>${data[key]}</td>`;
        }
    }
        tableHtml += `<td> <button class = "delete-ron-btn" data-id = ${data.id}> Delete </td>`;
        tableHtml += `<td><button class = "edit-row-btn" data-id = ${data.id}>Edit </td>`;
    
    tableHtml += "</tr>";

    if (isTableData) {
        table.innerHTML = tableHtml;
    }
    else{
        const newRow = table.insertRow();
        newRow.innerHTML = tableHtml;
    }
}

function loadHTMLtable(data) {
    const table = document.querySelector("table tbody");
    console.log(data);

    if (data.length === 0) {
        table.innerHTML = "<tr><td class =  'no-data' colspan = '5'>No-Data</td></tr>";
        return;
    }
    let tableHtml = "";

    data.forEach(function({id,Name,date_added}) {
        tableHtml += "<tr>";
        tableHtml += `<td> ${id} </td>`;
        tableHtml += `<td> ${Name} </td>`;
        tableHtml += `<td> ${new Date(date_added).toLocaleString()} </td>`;
        tableHtml += `<td> <button class = "delete-ron-btn" data-id = ${id}> Delete </td>`;
        tableHtml += `<td><button class = "edit-row-btn" data-id = ${id}>Edit </td>`;
        tableHtml += "</tr> "
    });
    table.innerHTML = tableHtml;
}