let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let discounts = document.getElementById("discounts");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let mode =  "create";
let temp = [];


// create 
let dataPro = [] ;
if(localStorage.product != null){
    dataPro = JSON.parse(localStorage.product)
}else{
    dataPro = []
}

submit.onclick = function(){
    let newPro = {
        title : title.value.toLowerCase(),
        price : price.value,
        taxes : taxes.value,
        ads : ads.value,
        discount : discount.value,
   }
    if(mode == "create"){
        if(newPro.p > 1 ){
            for(let i = 0 ; i < newPro.count ; i ++){
                dataPro.push(newPro)
                }
                }else{
                    dataPro.push(newPro)
                    }    
    }else{
        dataPro[ temp ] = newPro;
        mode = "create";
        submit.innerHTML = "create";
    }



    localStorage.setItem('product', JSON.stringify(dataPro))
    console.log(newPro)
    showData()
    dataPro.push(newPro)
    clearData()
}

function clearData(){
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";   
 }


    function showData()
    {
        let table = '';
        for(let i = 0; i < dataPro.length; i++){
            table +=`
            <tr>
                            <td>${i}</td>
                            <td>${dataPro[i].title}</td>
                            <td>${dataPro[i].price}</td>
                            <td>${dataPro[i].taxes}</td>
                            <td>${dataPro[i].ads}</td>
                            <td>${dataPro[i].discount}</td>
                            <td><button onclick ="updateData(${i})"  id="update">update</button></td>
                            <td><button onclick ="delteData(${i})"  id="delete">delete</button></td>
                        </tr>
                    `
            };
        document.getElementById('tbody').innerHTML = table;
    
    };
    showData()
    function delteData(i){
        dataPro.splice(i, 1)
        localStorage.setItem('product', JSON.stringify(dataPro))
        showData()
    }
    
    // update
    function updateData(i) {
        title.value = dataPro[i].title;
        price.value = dataPro[i].price;
        taxes.value = dataPro[i].taxes;
        ads.value = dataPro[i].ads;
        discount.value = dataPro[i].discount;
        submit.innerHTML = "update";
        mode = "update";
        temp = i;
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
        
    //search
    let searchMood = "title";

    function getSearchMood(id) {
        let search = document.getElementById("search");
        if (id == "searchbytitle") {
            searchMood = "title";
            search.placeholder = "search by title";
        } else {
            searchMood = "category";
            search.placeholder = "search by category";
        }
        search.focus();
    }
    
    function searchData(value) {
        let table = "";
        if (searchMood == "title") {
            for (let i = 0; i < dataPro.length; i++) {
                if (dataPro[i].title.toLowerCase().includes(value.toLowerCase())) {
                    table += `
                        <tr>
                            <td>${i}</td>                       
                            <td>${dataPro[i].title}</td>
                            <td>${dataPro[i].price}</td>
                            <td>${dataPro[i].taxes}</td>
                            <td>${dataPro[i].ads}</td>
                            <td>${dataPro[i].discount}</td>
                            <td><button onclick="updateData(${i})" id="update">update</button></td>
                            <td><button onclick="delteData(${i})" id="delete">delete</button></td>
                        </tr>
                    `;
                }
            }
        } else if (searchMood == "category") {
            for (let i = 0; i < dataPro.length; i++) {
                if (dataPro[i].price.toLowerCase().includes(value.toLowerCase())) {
                    table += `
                        <tr>
                            <td>${i}</td>
                            <td>${dataPro[i].title}</td>
                            <td>${dataPro[i].price}</td>
                            <td>${dataPro[i].taxes}</td>
                            <td>${dataPro[i].ads}</td>
                            <td>${dataPro[i].discount}</td>
                            <td><button onclick="updateData(${i})" id="update">update</button></td>
                            <td><button onclick="delteData(${i})" id="delete">delete</button></td>
                        </tr>
                    `;
                }
            }
        }
        document.getElementById('tbody').innerHTML = table;
    }
    