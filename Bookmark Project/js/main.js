var sname = document.getElementById("sname");
var surl = document.getElementById("url");
var siteContainer;
var boxOutputIdVar = document.getElementById("boxOutputId");




if(localStorage.getItem("allsites") == null){
    siteContainer = [];
}else{
    siteContainer = JSON.parse(localStorage.getItem("allsites"));
    display();
}
function createUrl(){
    if(sname.value != "" && surl.value != ""){
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
                        <a href="http://${siteContainer[i].url}" target="_blank" class="btn btn-primary visit">Visit</a>
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

function display(){
    boxOutputIdVar.innerHTML = "";
    for(var i = 0;i < siteContainer.length; i++){
        boxOutputIdVar.innerHTML +=
            `
            <div class="boxOutput">
                <div class="row">
                    <h2 class="col-md-4">${siteContainer[i].name}</h2>
                    <div class="col-md-8">
                        <a href="http://${siteContainer[i].url}" target="_blank" class="btn btn-primary visit">Visit</a>
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
