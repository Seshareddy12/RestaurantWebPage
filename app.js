function Item(name,type,price){
    this.name = name;
    this.type = type;
    this.price = price;
}

function Table(name,price,items){
    this.name = name
    this.price=price;
    this.items=items;
}

const unitPrices = new Object();

let table1 = new Table("Table-1",0,{});
let table2 = new Table("Table-2",0,{});
let table3 = new Table("Table-3",0,{});

let tables=[];
tables.push(table1);
tables.push(table2);
tables.push(table3);



sessionStorage.setItem("tables",JSON.stringify(tables));



function populateMenu(item,i){
    const menu = document.getElementById("menu");
    const card = document.createElement("div");
    card.id = i;
    card.classList.add("card");
    card.classList.add("menu-card");
    card.setAttribute("draggable",true);
    const container = document.createElement("div");
    const name = document.createElement("h4");
    const price = document.createElement("p");
    container.classList.add("container");
    name.textContent = item.name;
    price.textContent = item.price;

    container.appendChild(name);
    container.appendChild(price);

    card.appendChild(container);
    menu.appendChild(card);
}


function populateTables(table,i){
    const pos = document.getElementById("table");

    pos.children = undefined;
    
    const card = document.createElement("div");
    
    
    card.classList.add("card");
   
    
    
    const container = document.createElement("div");
    const name = document.createElement("h4");
    
    const price = document.createElement("p");
    container.classList.add("container");

   

    const div = document.createElement("div");

    name.classList.add("table-card");

    div.id= i+"t"; 

    name.textContent = table.name;
    price.textContent ="Price : "+ table.price + " | Total items : "+countItems(table);


    div.appendChild(name);
    div.appendChild(price);

    container.appendChild(div);

    card.appendChild(container);
    pos.appendChild(card);
}



function getItem(id){

    const items = JSON.parse(localStorage.getItem("items"));

    return items[id];

}
function countItems(table){
    let count = 0;
    for(const prop in table.items){
        count+=table.items[prop];
    }
    return count;
}

var tableId;

function populateModal(id,p){


    tableId = id;
    const tableModal = document.getElementById("modal-table");
    tableModal.innerHTML="";

    const header = document.createElement("tr")
    const th1 = document.createElement("th");
    const th2 = document.createElement("th");
    const th3 = document.createElement("th");
    const th4 = document.createElement("th");

    th1.textContent="item";
    th2.textContent="quantity";
    th3.textContent = "Price";
    
    header.appendChild(th1);
    header.appendChild(th2);
    header.appendChild(th3);
    header.appendChild(th4);

    tableModal.appendChild(header);
    
    

    let tables = JSON.parse(sessionStorage.getItem("tables"));

    const table = tables[id];

    

    for(const prop in table.items){

        const tr = document.createElement("tr");

        const name = document.createElement("td");
        const quantity = document.createElement("td");
        const quanChange = document.createElement("input");
        quanChange.setAttribute("type","number");
    
        quanChange.classList.add("quantityChange");
        const price = document.createElement("td");
        const del = document.createElement("td");
        const span = document.createElement("a");
        span.textContent="Delete";
        span.classList.add("del");
        span.classList.add("text");
        span.classList.add("text-danger");
        del.appendChild(span);
    

        name.textContent = prop;
        quanChange.value = table.items[prop];
        price.textContent = unitPrices[prop]* table.items[prop];
        
        quantity.append(quanChange);
        tr.appendChild(name);
        tr.appendChild(quantity);
        tr.appendChild(price);
        tr.appendChild(del);

        tableModal.appendChild(tr);

        

    }

  

    const h5 = document.createElement("h5");
    h5.textContent = "Total Price "+table.price;

   


    if(tableModal.parentElement.children.length==1)
    {
        tableModal.parentElement.appendChild(h5);
    }
    else
    {
        tableModal.parentElement.replaceChild(h5,tableModal.parentElement.children[1]);

    }
    
    
    if(tableModal.parentElement.children.length==2)
    {
        
        const button = document.createElement("button");
        button.classList.add("btn");
        button.classList.add("btn-success");
        button.classList.add("bill");
        button.textContent = "Generate Bill";

        tableModal.parentElement.appendChild(button);

    }

    
    

    document.querySelectorAll(".quantityChange").forEach(item=>item.addEventListener("change",e=>{
        let tables = JSON.parse(sessionStorage.getItem("tables"));
        const table = tables[id];
        const row = e.target.parentElement.parentElement;
        const parent = row.parentElement.parentElement;
        const quantity = Number(e.target.value);
        const itemName = row.children[0].textContent;
        row.children[2].textContent = unitPrices[itemName]*quantity;

        table.items[itemName] = quantity;

        

        table.price = getPrice(table.items);

        const ele = p.children[1];
        const count = countItems(table);

        ele.textContent = "Price : "+table.price+" | Total items : "+count; 

        


        const h5 = document.createElement("h5");
        h5.textContent = "Total Price : "+table.price;

        parent.replaceChild(h5,parent.children[1]);

        tables[id] = table;

        sessionStorage.setItem("tables",JSON.stringify(tables));

        
    
    }))

    document.querySelectorAll(".del").forEach(item => item.addEventListener("click",e=>{

        let tables = JSON.parse(sessionStorage.getItem("tables"));
        const table = tables[id];
        const row = e.target.parentElement.parentElement;
        const tab = row.parentElement;
        const parent = row.parentElement.parentElement;
        const itemName = row.children[0].textContent;

        delete table.items[itemName];
        
        tab.removeChild(row);

        table.price = getPrice(table.items);

        const ele = p.children[1];
        const count = countItems(table);

        ele.textContent = "Price : "+table.price+" | Total items : "+count; 




        const h5 = document.createElement("h5");
        h5.textContent = "Total Price : "+table.price;

        parent.replaceChild(h5,parent.children[1]);

        tables[id] = table;

        sessionStorage.setItem("tables",JSON.stringify(tables));



    }))

    document.querySelectorAll(".bill").forEach(btn=> btn.addEventListener("click",e=>{

        let tables = JSON.parse(sessionStorage.getItem("tables"));
        const table = tables[id];
        const price = table.price;
        table.price=0;
        table.items=new Object();
        const ele = p.children[1];
        const count = countItems(table);
        

        ele.textContent = "Price : "+table.price+" | Total items : "+count; 
        tables[id] = table;

        sessionStorage.setItem("tables",JSON.stringify(tables));
        const modal = document.getElementById("myModal");
        modal.style.display =   "none";
    
        alert("Your Bill is "+price);
        e.target.parentElement.removeChild(e.target);
       
     

    }))


}

function getPrice(items){
    var price = 0;
    for(const p in items){
        price+=items[p]*unitPrices[p];
    }
    return price;
}
   
    



function unitPrice(){
    const items = JSON.parse(localStorage.getItem("items"));
    for(var i=0;i<items.length;i++){
        unitPrices[items[i].name] = items[i].price;
    }
}



document.addEventListener("DOMContentLoaded", function() {
    
    
    let items = JSON.parse(localStorage.getItem("items"));


    
    
    for(let i=0;i<items.length;i++){
        populateMenu(items[i],i);
    }
    
    let tables = JSON.parse(sessionStorage.getItem("tables"));
    
    for(let i=0; i<tables.length;i++){
        populateTables(tables[i],i);
    }

    unitPrice();
    

    document.querySelectorAll(".menu-card").forEach(card => card.addEventListener("dragstart",(e)=>{

        e.dataTransfer.setData("id",e.target.id);
    
        
        
    
    
     })
    
     );

     document.querySelectorAll(".table-card").forEach(card => {card.addEventListener("dragenter",(e)=>{

        e.preventDefault();
        
        
        
        
    
     })
     
    })
    


     document.querySelectorAll(".table-card").forEach(card => {card.addEventListener("dragover",(e)=>{

        e.preventDefault();
        
        e.dataTransfer.dropEffect = "copy";
        
        
    
     })
     
    }


    
     );
     document.querySelectorAll(".table-card").forEach(card => {card.addEventListener("drop",(e)=>{

        const id = e.dataTransfer.getData("id");
        
        const item = getItem(id);
       
        
        
        

        let tables = JSON.parse(sessionStorage.getItem("tables"));

        let tid = e.target.parentElement.id;

        tid = Number(tid.substring(0,tid.length-1));
        
        
        const table = tables[tid];

        
        


        table.price = item.price + table.price;

        if(table.items.hasOwnProperty(item.name))
        {
            table.items[item.name]+=1;
        }
        else{
            table.items[item.name]=1;
        }

        const p = e.target.parentElement.children[1];

       const count = countItems(table);

       p.textContent = "Price : "+table.price+" | Total items : "+count;


        

        tables[tid] = table;

        sessionStorage.setItem("tables",JSON.stringify(tables));

        


        
    
     })
     
    }
    
     );

     document.querySelectorAll(".table-card").forEach(table=>table.addEventListener("click",e=>{

        e.preventDefault();
        var modal = document.getElementById("myModal");

        
       
        var span = document.getElementsByClassName("close")[0];
        
        
       
          modal.style.display = "block";
        
        
        let tid = e.target.parentElement.id;

        tid = Number(tid.substring(0,tid.length-1));

        populateModal(tid,e.target.parentElement);

        



       
        span.onclick = function() {
          modal.style.display = "none";
          
        }
        
       
        window.onclick = function(event) {
          if (event.target == modal) {
            modal.style.display = "none";
            
          }
        }
     }))

     
   
    
 })

 



