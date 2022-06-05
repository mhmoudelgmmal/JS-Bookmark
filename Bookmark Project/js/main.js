var sname = document.getElementById("sname");
var surl = document.getElementById("url");
var siteContainer;
var boxOutputIdVar = document.getElementById("boxOutputId");



// check if the local storage has values or not 
if(localStorage.getItem("allsites") == null){
    siteContainer = [];
}else{
    siteContainer = JSON.parse(localStorage.getItem("allsites"));
    display();
}


function createUrl(){
    if(checkInputsUrl() && checkInputsName()){
        var oneUrl = {
            name : sname.value,
            url:surl.value
        }
        siteContainer.push(oneUrl);
       var stringSite = JSON.stringify(siteContainer);
       localStorage.setItem("allsites",stringSite);
       var txt;
       txt = "";
        for(var i = 0;i < siteContainer.length; i++){
            txt +=
             `
             <div class="boxOutput">
                <div class="row">
                    <h2 class="col-md-4">${siteContainer[i].name}</h2>
                    <div class="col-md-8">
                        <a href="${siteContainer[i].url}" target="_blank" class="btn btn-primary visit">Visit</a>
                        <button onclick = "deleteRow(${i});" class="btn btn-danger">Delete</button>
                    </div>
                </div>      
            </div>      
             `;            
             boxOutputIdVar.innerHTML = txt;
             ClearInputs()
        }
    }else{
        alert("Insert a valid inputs");
        return false;
    }
}

function checkInputsName(){
    var err = document.getElementById("Site");
    if(sname.value == ""){
        err.classList.remove("d-none");
        err.classList.add("d-block");        
        err.innerHTML = "You have to fill the site name input and write a correct name";
        return false;
    }else{
        err.classList.remove("d-block");
        err.classList.add("d-none");         
        err.innerHTML ="";
        return true;
    }
}
function checkInputsUrl(){
    var errUrl = document.getElementById("URL");

    var input = document.getElementById("url").value;

    var reg = /^(https:\/\/www\.)[A-Za-z0-9\._\-?\/]{1,}[A-Za-z0-9]{0,}(\.)[a-z]{3}$/;

    if(reg.test(input)){
        errUrl.classList.add("d-none");
        errUrl.classList.remove("d-block");
        errUrl.innerHTML ="";
        return true;
    }else{
        errUrl.classList.remove("d-none");
        errUrl.classList.add("d-block");
        errUrl.innerHTML = "URL Should start with (https://www.) then write the site name after that write the type of the entity like (.com)";
        return false;
    }
    
    
}

function display(){
    boxOutputIdVar.innerHTML = "";
    for(var i = 0;i < siteContainer.length; i++){
        boxOutputIdVar.innerHTML +=
            `
            <div class="boxOutput">
                <div class="row">
                    <h2 class="col-md-4">${siteContainer[i].name}</h2>
                    <div class="col-md-8">
                        <a href="${siteContainer[i].url}" target="_blank" class="btn btn-primary visit">Visit</a>
                        <button onclick = "deleteRow(${i});" class="btn btn-danger">Delete</button>
                    </div>
                </div>      
            </div>`;
    }
    
}

function ClearInputs(){
    sname.value = "";
    surl.value = "";
}

function deleteRow(row){    
    if(siteContainer.indexOf(row)){
        siteContainer.splice(row,1);
        localStorage.setItem("allsites",JSON.stringify(siteContainer));
        display();
    }
}
