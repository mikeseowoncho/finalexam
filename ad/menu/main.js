const menu= [
    itemprice 0,

]

const menutable = document.getElementById("menutable");
const subprice = document.getElementById("subprice");

function generateTable() {
    menutable.innerHTML = "";
    menu.forEach(item => {
        let tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${item.id}</td>
            <td>${item.item}</td>
            <td>${item.price}</td>
            <td>${item.num}</td>
            <td>${item.itemprice}</td>
            <td><button type="button" class="btn btn-primary">
            +</button></td>
            <td><button type="button" class="btn btn-secondary">
            x</button></td>
        `;
        menutable.appendChild(tr);
    });
}