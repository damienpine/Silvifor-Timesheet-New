//on load functions

window.onload =  function(){


       
       createTable();
       
       createBlockTable();

       
       //addblocks();
       addLeads();
       addClients();
       addtasks();
       addnames();
       addRKs();
       //getTasks();
 
       gettoday();
       dPicker();
       getotherdata();
       
       fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits')
.then(response => response.json())
.then(commits => alert(commits[0].author.login));

       //getCSV('https://github.com/damienpine/silvifor-timesheet/blob/main/Crew.csv');


       document.getElementById("checkHide").checked=false;
       hideThis();
       

document.getElementById("empTable").addEventListener("change", function(){
    calculateprorate();
    calculateplanting();
    sumtable();
    calcremha();
    settabledata();
 
  });

  document.getElementById("OpsTable").addEventListener("change", function(){
    saveOpsList(); 
  });


  document.getElementById("disk_c").value= checkStorage();
       //if (confirm("Open Previously Saved Table?")) {
         gettabledata();
       //}

    
    };


    window.onbeforeunload = function(){


    };


//parse csv and create table

  var openFile = function(event){

    
    var input = event.target;

    var reader = new FileReader();
    reader.onload = function(){
      var text = reader.result;

//var arrdata= Papa.parse(data).data

var results = Papa.parse(text, {
   header: true,
   dynamicTyping: true,
	delimiter: "",// auto-detect
	newline: "",	// auto-detect
	

});

var blockObj= results.data;

for(x in blockObj){
  //alert(blockObj[x].BlockHa)
  blockObj[x].RemHa= blockObj[x].BlockHa;
   //alert(JSON.stringify(blockObj[x]))
}


localStorage.setItem('blocklist',JSON.stringify(blockObj));
//var storage= JSON.parse(localStorage.getItem('blocklist'));

createBlockTable();

      console.log(reader.result.substring(0, 200));
    };
    reader.readAsText(input.files[0]);
  };

function createBlockTable(){


var blockstorage= JSON.parse(localStorage.getItem('blocklist'));
  var obj=blockstorage;



//let header = Object.keys(obj[0]);

let header=['Block','BlockHa','Price','RemHa'];
let myTable=document.getElementById("BlockTable")
  myTable.deleteTHead();

var thead = myTable.createTHead(0);



   let row = thead.insertRow();
   let th = document.createElement("th");
     th.setAttribute('class','sticky')
   let button = document.createElement("button");
     button.setAttribute('id','DeleteBlocks');
     button.style= "background-color: rgb(255,200,200)" 
     button.setAttribute('onclick','deleteRows(document.getElementById("BlockTable"))');
     button.textContent='Delete'+'\n'+'Selected';
     th.appendChild(button);
     row.appendChild(th);

for(let key of header){
//alert(key)

     th= document.createElement("th");
     th.setAttribute('class','sticky');
     let text = document.createTextNode(key);
     
       let input = document.createElement("input");
       input.id= key;
     

     if(key=='Block'){
       input.setAttribute('placeholder','filter/add '+ key)
       input.setAttribute('onkeyup','blockFilter(event)')
       input.setAttribute('class','full');
     }else{
         input.setAttribute('placeholder','add '+ key);
         input.setAttribute('class','full');
         input.setAttribute('type','number');
     }
     if(key=='BlockHa'){
       input.setAttribute('onkeyup','fillRemHa(event)')
     }
     
     th.appendChild(text);
     th.appendChild(input);
     row.appendChild(th);

   }
   
   /*th = document.createElement('th');
   th.setAttribute('class','sticky');
   text = document.createTextNode('RemHa');
   th.appendChild(text);
   row.appendChild(th);*/

   th = document.createElement('th');
   th.setAttribute('class','sticky');
   text = document.createTextNode('DailyHa');
   th.appendChild(text);
   row.appendChild(th);

   th = document.createElement('th');
   th.setAttribute('class','sticky');
   text = document.createTextNode('DailyHrs');
   th.appendChild(text);
   row.appendChild(th);

   th = document.createElement('th');
   th.setAttribute('class','sticky');
   button = document.createElement('button');
   button.setAttribute('id','AddNewBlock');
   button.setAttribute('onclick','addBlockRow(event)')
   button.style= "background-color: rgb(200,255,200)" 
   button.textContent='Add Block';
   th.appendChild(button);
   row.appendChild(th);

  
   

let tbody = document.createElement('tbody');
//tbody.setAttribute('onmouseout','sumHours()');



    for (var i = 0; i < obj.length; i++) {
    let element = (obj[i]);


    //var tbody = document.getElementById('tbody');

       let row = tbody.insertRow();
       let cell = row.insertCell();

       let check = document.createElement("input");
         check.setAttribute('type','checkbox')
         check.setAttribute('id','CheckBlock'+i);
         check.setAttribute('onclick','highlightRow(event.target)')
         cell.appendChild(check);
         //row.appendChild(td);

       
        
       

  //for (let element of obj) {
    //let row = table.insertRow();
    for (key of header) {
        let cell = row.insertCell();
        let input = document.createElement('input');

        if(key=='Block'){
          input.setAttribute('type','text')
        }else{
          input.setAttribute('type','number');
        }
        
        if(key=='RemHa'){
          input.setAttribute('readonly','true');
          input.style.backgroundColor= "rgb(220,220,220)";
          input.setAttribute('type','number');
        }
        cell.appendChild(input);
        input.setAttribute('class','full');
        input.value=(element[key]);
        
      
     }
        /*cell=row.insertCell();
        input=document.createElement("input");
        input.setAttribute('id','RemHa'+i)
        input.setAttribute('readonly','true');
        input.setAttribute('class','full');
        //input.value= element[BlockHa]
        input.style.backgroundColor= "rgb(220,220,220)";
        
        cell.appendChild(input);*/
   
        cell=row.insertCell();

        input= document.createElement("input");
        input.setAttribute('id','DailyHa'+i);
        input.setAttribute('class','full');
        input.setAttribute('type','number');
        //input.setAttribute('onblur','sumHours()');
        cell.appendChild(input);

        cell = row.insertCell();

        input= document.createElement("input");
        input.setAttribute('id','DailyHrs'+i);
        input.setAttribute('class','full');
        input.setAttribute('type','number');
        input.setAttribute('onkeyup','sumHours()');
        input.setAttribute('onchange','sumHours()');
        
        cell.appendChild(input);

        cell = row.insertCell();

       let lblCheck2= document.createElement("label");
         lblCheck2.textContent='Complete';
         lblCheck2.setAttribute('style','font-size: 0.7em;');

       let check2 = document.createElement("input");
         check2.setAttribute('type','checkbox')
         check2.setAttribute('id','BlockDone'+i);
         check2.setAttribute('onclick','selectDone(event.target)');
        
        cell.appendChild(check2);
        cell.appendChild(lblCheck2);
        
  
    }
    document.getElementById("BlockTable").prepend(tbody);

    const blockTable = document.getElementById('BlockTable');

      blockTable.querySelectorAll('tbody').forEach((tbody, i) => {
        if (i !== 0) {
        blockTable.removeChild(tbody);
      }
});


 
}

//check if hours are block based and sum

function sumHours(){
 
  let BlockTable= document.getElementById("BlockTable")
  let tr= BlockTable.getElementsByTagName("tr");
  let length = BlockTable.rows.length;
  let arrblock=[];
  let arrhr=[];
           
        for (i=0;i<length; i++){
         
          let check= BlockTable.rows[i].getElementsByTagName("input")[0];
          let blk= BlockTable.rows[i].getElementsByTagName("input")[1];
          let hr= BlockTable.rows[i].getElementsByTagName("input")[6];
          

          if (check.checked==true){
            arrblock.push(blk.value);
            arrhr.push(Number(hr.value));

          }
       
        }
        
        let sumhrs=arrhr.reduce(function(a,b){return(a+b)});
          if(Number(sumhrs)>0){
            document.getElementById("Hours").value= sumhrs;
            document.getElementById("Hours").readOnly=true;
          }else{
            document.getElementById("Hours").readOnly=false;
            document.getElementById("Hours").value= "";
          }
        

}
// make sure ha filled out
function checkHa(){

let BlockTable= document.getElementById("BlockTable")
  let tr= BlockTable.getElementsByTagName("tr");
  let length = BlockTable.rows.length;
  let arrblock=[];
  let arrblockha=[];
  let arrprice=[];
  let arrha=[];
  let arrhr=[];

           
  for (i=0;i<length; i++){
         
  let check= BlockTable.rows[i].getElementsByTagName("input")[0];
  let blk= BlockTable.rows[i].getElementsByTagName("input")[1];
  let blkha= BlockTable.rows[i].getElementsByTagName("input")[2];
  let haprice= BlockTable.rows[i].getElementsByTagName("input")[3];
  let remha= BlockTable.rows[i].getElementsByTagName("input")[4];
  let ha= BlockTable.rows[i].getElementsByTagName("input")[5];
  let hr= BlockTable.rows[i].getElementsByTagName("input")[6];
  let piecerate= document.getElementById("PieceRate").checked;
  let task= document.getElementById("Task").value;


     if(check.checked==true){

       if(task.toUpperCase().indexOf("BRUSHING") > -1 && piecerate == true && Number(haprice.value)==0 && Number(blkha.value)>0){
         alert("Please enter a price/ha");
         haprice.focus();
         return false
       }else{

         if(Number(ha.value)>Number(remha.value)){
           alert("You have entered too many ha. There are " + remha.value + " ha remaining.");
           ha.value="";
           ha.focus();
           return false;
         }else{

            arrblock.push(blk.value);
            if(Number(blkha.value)>0){
              arrblockha.push(blkha.value);
            }
            if(Number(haprice.value)>0){
              arrprice.push(Number(haprice.value));
            }

            if(Number(ha.value)>0){
              arrha.push(Number(ha.value));
            }
            if(Number(hr.value)>0){
              arrhr.push(Number(hr.value));
            }
         }
       }
     }
  }

//return (arrha.length,arrblock.length)

      if(arrblock.length==0){
        alert("Please select at least 1 block");
        BlockTable.rows[1].getElementsByTagName("input")[0].focus();
        return false;
      }else{

        if(arrha.length<arrblockha.length){
          alert("Please fill out ha for each block selected");
          BlockTable.rows[1].getElementsByTagName("input")[5].focus();
          return false;
        }
        if(arrhr.length>0 && arrhr.length<arrblock.length){
          
          alert("Please fill out hours for each block selected");
          BlockTable.rows[1].getElementsByTagName("input")[6].focus;
          return false;

        /*}else{ 
          if(arrhr.length>0){
            document.getElementById("Hours").value= arrhr.reduce(function(a,b){return(a+b)});
            document.getElementById("Hours").readonly=true;
          }else{
            document.getElementById("Hours").readonly=false;
            document.getElementById("Hours").value= "";
          }*/
          return true;
        }
      }
      
}

//check piecerate planting

function checkPlanting(){


  let task= document.getElementById("Task").value;
  let piecerate= document.getElementById("PieceRate").checked;
  let divPrice= document.getElementById("div$_Unit");
  let divTrees= document.getElementById("divTrees");
  let divCones= document.getElementById("divCones");
  let trees= divTrees.getElementsByTagName("input");
  let cones= divCones.getElementsByTagName("input");
  let price= divPrice.getElementsByTagName("input");
  let ind= document.getElementById("Individual");


  if(task.toUpperCase().indexOf("PLANTING") > -1 && task.toUpperCase().indexOf("QUALITY") == -1 && task.toUpperCase().indexOf("SUPERVISION") == -1 && ind.checked==false){
    //const isAboveZero = (currentValue) => currentValue > 0;
    const array1 = Array.from(trees);
    const array2 = Array.from(cones);
    if(array1==""){
        alert("Please select an item");
        document.getElementById("RK").focus();
        return false
    }

    for(t=0; t< array1.length; t++){
      if((Number(array1[t].value) + Number(array2[t].value))==0){
      alert("Please enter trees or cones for each item");
      array1[t].focus()
      return false
      
      }
    }


  }

if(task.toUpperCase().indexOf("BROWSE") > -1 && ind.checked==false){
    //const isAboveZero = (currentValue) => currentValue > 0;
    const array2 = Array.from(cones);

    if(array2==""){
      alert("Please select an item");
      document.getElementById("RK").focus();
      return false
    }

    for(c=0; c< array2.length; c++){
      if(Number(array2[c].value)==0){
      alert("Please enter cones for each item");
      array2[c].focus()
      return false
      
      }
    }


  }
  


  
  if((task.toUpperCase().indexOf("PLANTING") > -1 || task.toUpperCase().indexOf("BROWSE") > -1) && task.toUpperCase().indexOf("QUALITY") == -1 && task.toUpperCase().indexOf("SUPERVISION") == -1 && piecerate == true){


    //const isAboveZero = (currentValue) => currentValue > 0;

    const array3 = Array.from(price);
    

    if(array3==""){
      alert("Please select an item");
      document.getElementById("RK").focus();
      return false
    }

    
    for(p=0; p< array3.length; p++){
      if(Number(array3[p].value)==0){
      alert("Please enter a price/unit for each item");
      array3[p].focus()
      return false
      
      }
    }
  }
}



//highlight row
function highlightRow(x){

  var y= x.parentNode.parentNode;

  var input= y.getElementsByTagName('input');

  //let checked= x.checked;


  for (i=0; i< y.getElementsByTagName('input').length; i++){
    
    if(x.checked==true){
      input[i].style.backgroundColor="rgb(255,255,200)";
    }else{
      if(input[i].readOnly==true){
        input[i].style.backgroundColor= "rgb(220,220,220)";
      }else{
        input[i].style.backgroundColor="";
          
      }
    }
  }

  if(x.parentNode.parentNode.parentNode.parentNode.id=="BlockTable"){

  let BlockTable= document.getElementById("BlockTable");
  let rows= BlockTable.rows;
  
  for(j=1; j< BlockTable.rows.length; j++){
   
   
   let row = BlockTable.rows[j];

   let check= BlockTable.rows[j].getElementsByTagName("input")[0];
   let ha= BlockTable.rows[j].getElementsByTagName("input")[5];
   let hr= BlockTable.rows[j].getElementsByTagName("input")[6];
   let comp= BlockTable.rows[j].getElementsByTagName("input")[7];
   
    if (check.checked==false){
      document.getElementById("Hours").value-=Number(hr.value);
      if(document.getElementById("Hours").value==0){
        document.getElementById("Hours").value="";
        document.getElementById("Hours").readOnly=false;
      }
      ha.value="";
      hr.value="";
      comp.checked=false;
    
    }else{
      //row.parentNode.removeChild(row);
      row.parentNode.insertBefore(row,rows[1]);
      check.focus()
      
      //row.style.display="";
    //}else{
      //row.style.display="none";
    }
  }
  }
  /*for(k=1; k< BlockTable.rows.length; k++){
  let check2= BlockTable.rows[k].getElementsByTagName("input")[0];
  let ha= BlockTable.rows[k].getElementsByTagName("input")[5];
  let hr= BlockTable.rows[k].getElementsByTagName("input")[6];
  let comp= BlockTable.rows[k].getElementsByTagName("input")[7];

    if(check2.checked==false){
      document.getElementById("Hours").value-=Number(ha.value);
      ha.value="";
      hr.value="";
      comp.checked==false;
      
      
      
    }
  }*/

}

//check done block

function selectDone(x){

//alert(x.checked)

  const myRem= x.parentNode.parentNode.getElementsByTagName("input")[4].value;
  const myDone= x.parentNode.parentNode.getElementsByTagName("input")[5].value;

  if(x.checked==true){

    x.parentNode.parentNode.getElementsByTagName("input")[5].value=Number(myRem)
    //x.parentNode.parentNode.getElementsByTagName("input")[4].value="";

  }else{
    x.parentNode.parentNode.getElementsByTagName("input")[5].value="";
x.parentNode.parentNode.getElementsByTagName("input")[4].value=myRem
    
  }
  
}

//delete selected rows

function deleteRows(table){



  if (confirm("Confirm Delete?")) {
  
   for(j=1; j<table.rows.length; j++){
   
     let rows= table.rows;
     let row = table.rows[j];

     let check= table.rows[j].getElementsByTagName("input")[0]
     

      if (check.checked==true){

        if (table.id=="empTable"){
          let BlockTable= document.getElementById("BlockTable");
          let block1= table.rows[j].getElementsByTagName("input")[3];
          let daily1= table.rows[j].getElementsByTagName("input")[10];
          for(b=1; b<BlockTable.rows.length; b++){
            let block2= BlockTable.rows[b].getElementsByTagName("input")[1];
            //let rem2= BlockTable.rows[b].getElementsByTagName("input")[4];

            
            if (block2.value==block1.value){

              BlockTable.rows[b].getElementsByTagName("input")[4].value= Number(BlockTable.rows[b].getElementsByTagName("input")[4].value)+ Number(daily1.value);
               
            }
          }
          
          

        }
        row.parentNode.removeChild(row);
        j--
      }
      
    if(document.getElementById("SelectAll").checked==true){
      document.getElementById("SelectAll").checked=false;
    }
      calcremha();
    }
    
    if (table.id=="empTable"){
      if(table.rows.length>1){
        calcremha();
    
        calculateprorate();
        calculateplanting();
        sumtable();
        
      }
    settabledata();
    }

    saveBlockList();
    saveOpsList();

    
  }

}


//block filter

function blockFilter() {



var input1, filter1, table, tr, td1, i, txtValue1, txtValue2;
  

var table = document.getElementById("BlockTable");
var tbody= table.getElementsByTagName("tbody")[0];

  tr = tbody.getElementsByTagName("tr");
  input1 = document.getElementById("Block").value;
  filter1 = input1.toUpperCase();
 
   
  for (i = 0; i < tr.length; i++) {

  td1 = tr[i].getElementsByTagName("input")[1];

    if (td1){
      txtValue1 = td1.value;
      
      if (txtValue1.toUpperCase().indexOf(filter1) > -1 || tr[i].getElementsByTagName("input")[0].checked==true){
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
  //sumtable();
}

function fillRemHa(){

//alert(event.target.parentNode.parentNode.getElementsByTagName("input")[4])
  event.target.parentNode.parentNode.getElementsByTagName("input")[3].value=event.target.parentNode.parentNode.getElementsByTagName("input")[1].value
}

//add block row
function addBlockRow(event){

  let myTable= document.getElementById("BlockTable");

  let tbody = myTable.getElementsByTagName('tbody')[0];
  
  var rows= myTable.rows.length;


       let row = tbody.insertRow(0);
       let cell = row.insertCell();

       let check = document.createElement("input");
         check.setAttribute('type','checkbox')
         check.setAttribute('id','CheckBlock' + rows);
         check.setAttribute('onclick','highlightRow(event.target)')
         cell.appendChild(check);
        
        cell=row.insertCell();
        input=document.createElement("input");
        input.setAttribute('id','Block'+rows)
        input.setAttribute('type','text')
        input.setAttribute('class','full');
        input.value= document.getElementById("Block").value;
        cell.appendChild(input)
   
        cell=row.insertCell();
        input= document.createElement("input");
        input.setAttribute('id','BlockHa'+rows);
        input.setAttribute('type','number')
        input.setAttribute('class','full');
        input.value= document.getElementById("BlockHa").value;
        cell.appendChild(input);

        cell=row.insertCell();
        input= document.createElement("input");
        input.setAttribute('id','Price'+rows);
        input.setAttribute('type','number');
        input.setAttribute('class','full');
        input.value= document.getElementById("Price").value;
        cell.appendChild(input);

        cell=row.insertCell();
        input=document.createElement("input");
        input.setAttribute('id','RemHa'+rows)
        input.setAttribute('readonly','true')
        input.setAttribute('type','number');
        input.setAttribute('class','full');
        input.value= Number(document.getElementById("RemHa").value).toFixed(2);
        cell.appendChild(input)
   
        cell=row.insertCell();
        input= document.createElement("input");
        input.setAttribute('id','DailyHa'+rows);
        input.setAttribute('type','number');
        input.setAttribute('class','full');
        cell.appendChild(input);

        cell = row.insertCell();

        input= document.createElement("input");
        input.setAttribute('id','DailyHrs'+i);
        input.setAttribute('class','full');
        input.setAttribute('type','number');
        input.setAttribute('onkeyup','sumHours()');
        
        cell.appendChild(input);

        cell = row.insertCell();

       let check2 = document.createElement("input");
         check2.setAttribute('type','checkbox')
         check2.setAttribute('id','BlockDone'+rows);
         check2.setAttribute('onclick','selectDone(event.target)');
         cell.appendChild(check2);

document.getElementById("BlockHa").value="";
document.getElementById("RemHa").value="";

  saveBlockList();

}

function saveBlockList(){
  let myTable= document.getElementById("BlockTable")

  function Obj(Block,BlockHa,Price,RemHa){
    this.Block=Block;
    this.BlockHa=BlockHa;
    this.Price=Price;
    this.RemHa=RemHa;
  }
var myObjArr=[];

  for(i=1;i<myTable.rows.length; i++){
    var tr= myTable.rows[i];
    var input= tr.getElementsByTagName("input");
    var obj = new Obj(input[1].value, input[2].value, input[3].value, input[4].value);
    myObjArr.push(obj)
  }
localStorage.setItem('blocklist',JSON.stringify(myObjArr))
}


//make a div dropdown for blocks&rks




function createBlockArray(){
//alert(event.target.id)

  let task= document.getElementById("Task").value

  //alert(document.getElementById("Task").value)

if (task.toUpperCase().indexOf("PLANTING") > -1||task.toUpperCase().indexOf("BROWSE") > -1){

  
  var count= 0;
  
  let div = document.getElementById("div"+event.target.id);


  while (div.firstChild){
    div.removeChild(div.lastChild);
  }
    //div.id= "div"+event.target.id
    

    let BlockRows= document.getElementById("BlockTable").rows
    let RK= document.getElementById("RK")
    
    for(i=0;i<BlockRows.length;i++){

//alert(BlockRows[i].getElementsByTagName("input")[0].checked)

      if(BlockRows[i].getElementsByTagName("input")[0].checked==true){
  
   


        for(j=0;j<RK.length; j++){
          if(RK[j].selected==true){
            let blk= BlockRows[i].getElementsByTagName("input")[1].value;
            let rk= RK[j].value;
            count+=1;
            let input= document.createElement("input");
            input.id= event.target.id + count;
            let label= document.createElement("label");
            label.setAttribute('style','float:left');
            label.textContent= blk+ " " + rk;
            label.setAttribute('style','font-size:0.7em;')
            
            //input.placeholder= blk+ ": " + rk;
            input.type= "number";
            input.setAttribute('onchange','sum()');


if(document.getElementById("PieceRate").checked==true){//piecrate-coop

if(task.toUpperCase().indexOf("BROWSE") > -1){
  if(div.id=="divTrees" || div.id=="divFert"){
    input.setAttribute('style','display:none');
    label.setAttribute('style','display:none');
  }
}

if(document.getElementById("Individual").checked==true && div.id!="div$_Unit"){//piecerate-ind
  input.setAttribute('style','display:none');
  label.setAttribute('style','display:none');
}
}else{//hourly
  if(document.getElementById("Individual").checked==true){//hourly-ind
    input.setAttribute('style','display:none');
    label.setAttribute('style','display:none');
  }else{//hourly-coop
    if(div.id=="div$_Unit"){

      input.setAttribute('style','display:none');
      label.setAttribute('style','display:none');
    }
    if(task.toUpperCase().indexOf("BROWSE") > -1){
  if(div.id=="divTrees" || div.id=="divFert"){
    input.setAttribute('style','display:none');
    label.setAttribute('style','display:none');
  }
}
  }

}
            div.append(label);
            div.appendChild(input);
          }//endif
        }//end j
      }//end if
    }//end i
event.target.parentNode.appendChild(div);
}//end if
}

function makeArrays(){
  document.getElementById("Trees").value="";
  document.getElementById("Fert").value="";
  document.getElementById("Cones").value="";
  document.getElementById("$_Unit").value="";

  while (document.getElementById("divTrees").firstChild){
document.getElementById("divTrees").removeChild(document.getElementById("divTrees").lastChild);
  }
  document.getElementById("Trees").click();

  while (document.getElementById("divFert").firstChild){
document.getElementById("divFert").removeChild(document.getElementById("divFert").lastChild);
  }
  document.getElementById("Fert").click();

  while (document.getElementById("divCones").firstChild){
document.getElementById("divCones").removeChild(document.getElementById("divCones").lastChild);
  }
  document.getElementById("Cones").click();

  while (document.getElementById("div$_Unit").firstChild){
document.getElementById("div$_Unit").removeChild(document.getElementById("div$_Unit").lastChild);
  }
    
    document.getElementById("$_Unit").click();
  
}
//sum tree, fert, cone fields
function sum(){

  let div= event.target.parentNode;


    let arr= Array.from(div.getElementsByTagName("input"))
    
    let s=0;
    arr.forEach(myFunction);

    function myFunction(item) {
      s +=Number(item.value);
     //document.getElementById()
     
    }
    let str= div.id;
    let el=str.replace("div", "");
    if(el!="$_Unit"){
      document.getElementById(el).value=s;
    }
}

function proArray(){
    
    let crewlist=[];
    let mynames= document.getElementById("Name").getElementsByTagName("option");
  Array.from(mynames).forEach(crewList);

   function crewList(item,index) {

     if(item.selected==true){
       crewlist.push(item.value)
     }
   }
  if(crewlist.length>1){
    document.getElementById("CrewList").textContent= "Crew: " + String(crewlist);
  }else{
    document.getElementById("CrewList").textContent= "";
  }

  let myDiv= document.getElementById("divProRate");
  while (myDiv.firstChild){
    myDiv.removeChild(myDiv.lastChild);
  }

let piecerate= document.getElementById("PieceRate").checked;
let task= document.getElementById("Task").value;

  if(task.toUpperCase().indexOf("BRUSHING") > -1 && piecerate == true){



  //let uniqueNames = [...new Set(crewnames)];
  let names= document.getElementById("Name").getElementsByTagName("option");
  Array.from(names).forEach(proArr);

   function proArr(item,index) {


     if(item.selected==true){

       let div= document.createElement('div');
         div.setAttribute('style','float:left');
       let labelName= document.createElement('label');
         labelName.textContent = item.value;
         labelName.setAttribute('style','font-size:0.75em');

       let inputProRate= document.createElement('input');   
         inputProRate.setAttribute('type','Number');
         inputProRate.setAttribute('style','float:left');



     div.appendChild(labelName);
     div.appendChild(inputProRate);
     document.getElementById("divProRate").appendChild(div);
     }
     
     //document.getElementById("divProRate").appendChild(div2);
     }
     //document.getElementById()
     
  }else{

  }
//check storage for prorate
       let div= document.getElementById("divProRate");
       let labels= Array.from(div.getElementsByTagName("label"));

       let inputs= Array.from(div.getElementsByTagName("input"));
    
       let store= JSON.parse(localStorage.getItem("prorate"));

       for (i=0; i< labels.length; i++){
  
         for (key in store){

           if (store[key].name == labels[i].textContent){
            
             inputs[i].value= store[key].prorate;
           }else{
             if(inputs[i].value==""){
               inputs[i].value=1;
             }
           }

          }
        }
  
}



/*
//highlight rows- not being used!!

var MyTable = document.getElementById('empTable');
var rows = MyTable.getElementsByTagName('tr');
for (var i = 0; i < rows.length; i++) {
    rows[i].onmouseover = function() {
        this.style.backgroundColor = '#ff0000';
    }
    rows[i].onmouseout = function() {
        this.style.backgroundColor = '#ffffff';
    }
}
*/

//add lead value to crew list

function addtocrew(){
  document.getElementById("Name").value = document.getElementById("Lead").value;
}

//Date-picker functions
function dPicker(){
        (function () {
            const input = document.getElementById('Start');
            const datepicker = new TheDatepicker.Datepicker(input);
            datepicker.render();
        })();

        (function () {
            const input = document.getElementById('End');
            const datepicker = new TheDatepicker.Datepicker(input);
            datepicker.render();
        })();

        (function () {
            const input = document.getElementById('Date');
            const datepicker = new TheDatepicker.Datepicker(input);
            datepicker.render();
        })();

}

//get pay period start Date

function getstartdate(){

var end= new Date(document.getElementById('End').value);
var dateMillis = end.getTime();
var period= 12*8.64e+7


var newDate = new Date();
newDate.setTime(dateMillis - period);

var date = new Date(newDate);
var dateString = new Date(date.getTime() - (date.getTimezoneOffset() * 60000 ))
                    .toISOString()
                    .split("T")[0];
        

document.getElementById("Start").value= dateString;

  
}

//get pay period end date

function getenddate(){
var start= new Date(document.getElementById('Start').value);
var dateMillis = start.getTime();
var period= 14*8.64e+7


var newDate = new Date();
newDate.setTime(dateMillis + period);

var date = new Date(newDate);
var dateString = new Date(date.getTime() - (date.getTimezoneOffset() * 60000 ))
                    .toISOString()
                    .split("T")[0];
        

document.getElementById("End").value= dateString;

}

//save lead and pay period info

function savelead(){
  localStorage.setItem('myLead', document.getElementById("Lead").value)

  localStorage.setItem('myStart', document.getElementById("Start").value)

  localStorage.setItem('myEnd', document.getElementById("End").value)

}

//clear saved lead info

function clearlead(){
  if (confirm("Confirm Delete?")) {
document.getElementById("Lead").value="";
document.getElementById("Name").value="";
document.getElementById("Start").value="";
document.getElementById("End").value="";
    localStorage.removeItem('myLead')
    localStorage.removeItem('myStart')
    localStorage.removeItem('myEnd')
  }
}

//get todays Date

function gettoday(){

    var today = new Date();
    var dd = today.getDate();

    var mm = today.getMonth()+1; 
    var yyyy = today.getFullYear();
    if(dd<10) 
    {
      dd='0'+dd;
    } 

    if(mm<10) 
    {
      mm='0'+mm;
    } 
    today = yyyy+'-'+mm+'-'+dd;
      document.getElementById("Date").value= today;
  }

//format Date

function formatdate(x){
  (function () {
    const input = x //document.getElementById('opsDate');
    const datepicker = new TheDatepicker.Datepicker(input);
    datepicker.render();
  })();
}

//calculate daily km

function calculateKm() {
if (KmS.value > 0 && KmE.value > KmS.value) {KmD.value = (KmE.value - KmS.value)
}
}

//global variables

var blocks=[];
var blockha=[];
var blocks2=[];
var blockha2=[];
var number1=0;
var myblocks=[];
var myblockha=[];
var dailyha=[];
var dailyhrs=[];
var arrrem=[];
var arrprice=[];

//get Ha Array

function getHa() {
var blocks=[];
var blockha=[];
var dailyha=[];
var dailyhrs=[];
var arrrem=[];
var arrprice=[];



  var myTab= document.getElementById("empTable")//
  var tr= myTab.getElementsByTagName("tr");
  var BlockTable= document.getElementById("BlockTable")
  var length = BlockTable.rows.length;
 
           
        for (i=0;i<length; i++){
          var remarr=[];
          var check= BlockTable.rows[i].getElementsByTagName("input")[0];
          var block = BlockTable.rows[i].getElementsByTagName("input")[1];
          var ha= BlockTable.rows[i].getElementsByTagName("input")[2];
          var price= BlockTable.rows[i].getElementsByTagName("input")[3];
          var rem= BlockTable.rows[i].getElementsByTagName("input")[4];
          var daily= BlockTable.rows[i].getElementsByTagName("input")[5];
          var hrs= BlockTable.rows[i].getElementsByTagName("input")[6];
          

          if (check.checked==true){
           blocks.push(block.value);
           dailyha.push(daily.value);
           dailyhrs.push(hrs.value);
           arrrem.push(rem.value);
           arrprice.push(price.value);

           for(j=1; j<myTab.rows.length; j++){

             var td3= tr[j].getElementsByTagName("input")[3];
             var td23= tr[j].getElementsByTagName("input")[23];


             if (td3.value==block.value){
               remarr.push(Number(td23.value));
             }
           } // for j

            if (remarr != ""){
               var remha= Number(remarr.reduce(function(a,b){return a+b})).toFixed(2);
            }else{
              remha=0;
            }

             if (remha >0 && remha !=""){
               blockha.push(Number(remha).toFixed(2));
             }else{
               blockha.push(Number(ha.value));
             }
		     } //if blockquote
	
				
	      } //for i

				number1= blocks.length;
				myblocks=blocks;
				myblockha= blockha;
				
			
				
				
function getSum(total, num) {
  return total + num;
}
//var x= blockha.reduce(getSum,0)

//document.getElementById("Ha").value = x;



}

//calculate remaining ha

function calcremha(){

  var BlockTable= document.getElementById("BlockTable");

  for (i=1;i<BlockTable.rows.length; i++){
    var rem= BlockTable.rows[i].getElementsByTagName("input")[4];
    var daily= BlockTable.rows[i].getElementsByTagName("input")[5];

    BlockTable.rows[i].getElementsByTagName("input")[4].value = Number(Number(rem.value)-Number(daily.value)).toFixed(2);

//clear daily ha and hours
BlockTable.rows[i].getElementsByTagName("input")[5].value = "";
BlockTable.rows[i].getElementsByTagName("input")[6].value = "";


  }

//save blocks back to JSON object in localStorage

saveBlockList()

}

//update remaining ha

function updateRem(){

let table= document.getElementById("BlockTable");
let myBlock= event.target.parentNode.parentNode.getElementsByTagName("input")[3].value;
    let rows = table.rows;
    Array.from(rows).forEach(matchBlock);

    function matchBlock(item, index) {
      if(item.getElementsByTagName("input")[1].value==myBlock){

        let x= item.getElementsByTagName("input")[4].value;

          item.getElementsByTagName("input")[4].value= Number(Number(x)+Number(event.target.value)).toFixed(6);
          event.target.placeholder= item.getElementsByTagName("input")[4].value + " ha remain";
          event.target.value="";
          event.target.focus();
        }
     }

}

function newRem(){

    let myBlock= event.target.parentNode.parentNode.getElementsByTagName("input")[3].value;

    let table= document.getElementById("BlockTable");
    let rows = table.rows;
    Array.from(rows).forEach(matchBlock);

    function matchBlock(item, index) {
      if(item.getElementsByTagName("input")[1].value==myBlock){
        let x= item.getElementsByTagName("input")[4].value;
        let y= event.target.value;
        if(Number(x)>=Number(y)){
          item.getElementsByTagName("input")[4].value= Number(Number(x)- Number(y)).toFixed(2);
        }else{
          alert("Too many Ha! there are " + item.getElementsByTagName("input")[4].value + " ha remaining");
           event.target.value = "";
           event.target.focus();
           
           
        }
        
      }

      
    }
    
    
  
  }

//save task and client info

function savetask(){
  localStorage.setItem("myTask", document.getElementById("Task").value);

  localStorage.setItem("myClient", document.getElementById("Client").value);

  localStorage.setItem("myHourly",document.getElementById("Hourly").checked);
  //localStorage.setItem("myPieceRate",document.getElementById("PieceRate").checked);
  localStorage.setItem("myCoop",document.getElementById("Coop").checked);
  //localStorage.setItem("myInd",document.getElementById("Individual").checked);



}

//clear task and client info

function cleartask(){
  if (confirm("Confirm Delete?")) {
    
    localStorage.removeItem("myTask")
    localStorage.removeItem("myClient")
document.getElementById("Task").value="";
document.getElementById("Client").value="";

document.getElementById("Hourly").click();
document.getElementById("Coop").click();

localStorage.setItem("myHourly","true");
localStorage.setItem("myCoop","true");
    
  }
}

function saveBlock(){

  let myTable=document.getElementById("BlockTable");
  var myBlocks=[];
  for(i=1; i< myTable.rows.length; i++){
    
    let myRow= myTable.rows[i];
    let myCheck= myRow.getElementsByTagName("input")[0];

    if(myCheck.checked==true){
      myBlocks.push(myCheck.id);
    }
    
  }
    localStorage.setItem("myBlock",JSON.stringify(myBlocks));
  
  //localStorage.setItem("myBlock", document.getElementById("BlockTable").innerHTML)
}

function clearBlock(){

  if (confirm("Confirm Delete?")) {
    
    localStorage.removeItem("myBlock")
  }

  let myTable=document.getElementById("BlockTable");
  var myBlocks=[];
  for(z=1; z< myTable.rows.length; z++){
    
    let myRow= myTable.rows[z];
    let myCheck= myRow.getElementsByTagName("input")[0];

    if(myCheck.checked==true){
      myCheck.checked=false;
      let inputs= myCheck.parentNode.parentNode.getElementsByTagName("input");

      for(y=1; y< inputs.length; y++){
        if(inputs[y].readOnly==true){
          inputs[y].style.backgroundColor= "rgb(220,220,220)";
        }else{
          inputs[y].style.backgroundColor="";
        }
      }
          
      //}
      
    }
  }


}

function saveCrew(){
  let crewlist=[];
    let mynames= document.getElementById("Name").getElementsByTagName("option");
  Array.from(mynames).forEach(crewList);

   function crewList(item,index) {

     if(item.selected==true){
       crewlist.push(item.value)
     }
   }
  localStorage.setItem("myCrew",JSON.stringify(crewlist));
}

function clearCrew(){
  if (confirm("Confirm Delete?")) {
    
    localStorage.removeItem("myCrew")
document.getElementById("Name").value= document.getElementById("Lead").value

    
  }
}

//create table headers

function createTable() {
    
  var arrHead = new Array();

    arrHead = ['', 'Date', 'Client','Block', 'BlockHa','Task', 'Name','Hours','OT1','OT2','Ha','ProRate','AdjHa','HaRate','Species','Trees','Fert','Cones','$/Hr','$/Unit','CrewLead','Trucks','DailyKm','RemHa','Comments']; // table headers.

var tb= document.createElement('tbody');

    // first create a TABLE structure by adding few headers.


        var empTable = document.createElement('table');
        empTable.setAttribute('id', 'empTable');  // table id.

       var header = empTable.createTHead();
      //empTable.appendChild(header);

        var tr= header.insertRow(-1);
        
        

        for (var h = 0; h < arrHead.length; h++) {
            var th = document.createElement('th');
            //var ths = document.createElement('th'); 
            


            
            th.innerHTML = arrHead[h]+"<br>";
            tr.appendChild(th);
            

if (h == 0) {   // if its the first column of the table.
                // add a button control.
                var button = document.createElement('input');
                var check = document.createElement('input');

                // set the attributes.
                button.setAttribute('type', 'button');
                button.setAttribute('id', 'DeleteSel');
                button.setAttribute('value', 'Delete');
                button.style.backgroundColor = "red";
                button.style.height = "30px";
                button.setAttribute("class","inputbutton");
                button.style.float= 'center';
                button.setAttribute('onclick', 'deleteRows(document.getElementById("empTable"))')

                check.setAttribute('id', 'SelectAll');
                check.setAttribute('type', 'checkbox');
                check.setAttribute('onclick', 'selectAll()');
                //check.style='float:center';


                // add button's "onclick" event.
                //button.setAttribute('onclick', 'sumtable();');
                //xbutton.onclick= "sumtable()";
//make a function for summarizing table
     
                th.setAttribute('class','sticky2');
                th.appendChild(button);
                th.appendChild(check);
               
            }else{
            

var input = document.createElement("input");
                if (h == 2||h==3||h==5||h==6||h==13||h==14||h==19||h==20||h==24){
                  input.setAttribute('type','text');
                }else{
                   input.setAttribute('type','number');
                   //input.setAttribute('step','0.01');
                }
                
                input.name = "sum" + h;
                input.id = "sum" + h;
                input.setAttribute('class','full')
                input.value= "";
                input.readOnly= true;
                input.style.backgroundColor= "rgb(220,220,220)";

                if(h==6){
                  th.setAttribute('class','sticky');
                }else{
                  th.setAttribute('class','sticky2');
                }
              
					
					th.appendChild(input);
            
            
            //ths.innerHTML= arrHead[h];
            //ts.appendChild(ths);
          }
            
        }



        empTable.appendChild(tb);

        var div = document.getElementById('cont');
        div.appendChild(empTable);    // add table to a container.
 
/*if (confirm("Open Previously Saved Table?")) {
         gettabledata();
       }*/
  }

// function to add new row.


function addRow() {

//check for blank inputs

let l= document.getElementById("Lead");
  if(l.value==""){
  alert("Please select a crew Lead");
  l.focus();
  return
  }else{
    let s= document.getElementById("Start");
    let e= document.getElementById("End");
      if(s.value=="" || e.value==""){
        alert("Please select pay period dates");
        s.focus()
        return
      }else{

        let d= document.getElementById("Date");

        if(d.value==""){
          alert("Please enter a date");//blank date
          d.focus();
          return
  
        }else{

          let checkha=checkHa()
          
          if(checkha==false){
            return
          }else{
            let t= document.getElementById("Task");
            if(t.value==""){
              alert("Please select a task");
              t.focus();
              return
            }else{
              let n= document.getElementById("Name");
              if(n.value==""){
                alert("Please select at least 1 crew member");
                n.focus();
                return
              }else{
                let h= document.getElementById("Hours");
                if(Number(h.value)==0){
                  alert("Please enter hours");
                  return
                }else{
                  let checkplanting=checkPlanting();
                  if(checkplanting==false){
                    return
                  }
                }
              }
            }
          }
        }
      }
    
  
}
   

//end check for blank inputs

    getHa();


   //create arrays

  var numberrows=0;

            // Number of inputs to create
            var length = document.getElementById("BlockTable").rows.length;
            var length1 = document.getElementById("Name").length;
            var length2 = document.getElementById("RK").length;
            var number=0;
            var number2=0;
            var number3=0;
            var crewnames=[];
            
            var rks = [];
            var rks2=[];
            var blocks2=[];
            var blocks3=[];
            var dailyha2=[];
            var dailyha3=[];
            var dailyhrs2=[];
            var dailyhrs3=[];



            var arrprice2=[];
            var arrprice3=[];
            var arrrem2=[];
            var arrrem3=[];
            var arrrem4=[];
            var blockha2=[];
            var blockha3=[];

            var arrayBlockTrees=[];
            var arrayBlockFert=[];
            var arrayBlockCones=[];
            var arrayBlockPrice=[];

            var arrayBlockTrees2=[];
            var arrayBlockFert2=[];
            var arrayBlockCones2=[];
            var arrayBlockPrice2=[];

            var arrayBlockTrees3=[];
            var arrayBlockFert3=[];
            var arrayBlockCones3=[];
            var arrayBlockPrice3=[];


            let myDiv= document.getElementById("divProRate")

            function ObjPro(name,prorate){
              this.name= name
              this.prorate=prorate;
            }

            var arrProRate=[];

            let arrLabel= Array.from(myDiv.getElementsByTagName("label"));
            let arrInput= Array.from(myDiv.getElementsByTagName("input"));

            arrLabel.forEach(proObj)
    
            function proObj(item,index){
              let obj = new ObjPro(arrLabel[index].textContent, arrInput[index].value);

               arrProRate.push(obj)

            }
            
				localStorage.setItem("prorate",JSON.stringify(arrProRate))
				
				for (l=0; l< length2; l++){
				  var rk= document.getElementById("RK").options[l];
				    if (rk.selected){
				      rks2.push(rk.value)
				
                        //if(length2>0){


				
				     
				    }
				}
				
				var count= rks2.length;
				
          
  for (j=0;j<number1; j++){//loop through blocks from getHa


        for (k=0;k<length; k++){//loop through blocks and add to array per person

        var BlockTable= document.getElementById("BlockTable");

        var blockrow= BlockTable.rows[k];

        var check= blockrow.getElementsByTagName("input")[0];

        var block= blockrow.getElementsByTagName("input")[1];
        var ha= blockrow.getElementsByTagName("input")[2];
        var price= blockrow.getElementsByTagName("input")[3];
        var rem= blockrow.getElementsByTagName("input")[4];
        var daily= blockrow.getElementsByTagName("input")[5];
        var hrs= blockrow.getElementsByTagName("input")[6];
        

          if (check.checked==true){
                blocks2.push(block.value);
                blockha2.push(Number(ha.value));
                arrprice2.push(Number(price.value).toFixed(2));
                arrrem2.push(Number(rem.value));
                dailyha2.push(Number(daily.value));
                dailyhrs2.push(Number(hrs.value));
           
			  }//end if
			}//end for 
        
				
		for (i=0;i<length1; i++){
            var name= document.getElementById("Name").options[i];
        
            if (name.selected){



            var blk= blocks2[j];
				var blkha= blockha2[j];
				var blkpr= arrprice2[j];
				var blkrem= arrrem2[j];
				var blkdaily= dailyha2[j];
				var blkdailyhrs= dailyhrs2[j];
				var blkTrees= arrayBlockTrees[j];
				var blkFert= arrayBlockFert[j];
				var blkCones= arrayBlockCones[j];
				var blkPrice= arrayBlockPrice[j];

              if (count==0){
                number++;
                crewnames.push(name.value);
                blocks3.push(blk);
                blockha3.push(blkha);
                arrprice3.push(blkpr);
                arrrem3.push(blkrem);
                dailyha3.push(blkdaily);
                dailyhrs3.push(blkdailyhrs);
              


               }
				   for (l=0; l< rks2.length; l++){
				  
				
				      rks.push(rks2[l])
				
				      number++;
                  crewnames.push(name.value);
                  blocks3.push(blk);
                  blockha3.push(blkha);
                  arrprice3.push(blkpr);
                  arrrem3.push(blkrem);
                  dailyha3.push(blkdaily);
                  dailyhrs3.push(blkdailyhrs);
             
			
            }//end if name.selected

           
				}
				}
				
				
				
		  
     }

        numberrows=number;

arrrem3.forEach(addArrays)
  function addArrays(value, i, array){
    arrrem4.push(arrrem3[i]-dailyha3[i])
  }
        

if(count>0){

  let div1= document.getElementById("divTrees");
  let div2= document.getElementById("divFert");
  let div3= document.getElementById("divCones");
  let div4= document.getElementById("div$_Unit");

  let labels1= div1.getElementsByTagName("label");
  let labels2= div2.getElementsByTagName("label");
  let labels3= div3.getElementsByTagName("label");
  let labels4= div4.getElementsByTagName("label");

  let inputs1= div1.getElementsByTagName("input");
  let inputs2= div2.getElementsByTagName("input");
  let inputs3= div3.getElementsByTagName("input");
  let inputs4= div4.getElementsByTagName("input");


  for(x=0; x<blocks3.length; x++){
    
    for(y=0; y<inputs1.length; y++){
      if(String(labels1[y].textContent) == String(blocks3[x] + " " +rks[x])){
        
          arrayBlockTrees.push(Number(inputs1[y].value));
          arrayBlockFert.push(Number(inputs2[y].value));
          arrayBlockCones.push(Number(inputs3[y].value));
          arrayBlockPrice.push(Number(inputs4[y].value));
        
      }
    
    }


  

  }
}




  //end arrays

//create table rows
var tbodyRef = document.getElementById('empTable').getElementsByTagName('tbody')[0];

        for (i=0; i<number; i++){
        var empTab = document.getElementById('empTable');
        
        var rowCnt = tbodyRef.rows.length;    // get the number of rows.
          

        var tr = tbodyRef.insertRow(0); // table row.
        //tr = empTab.insertRow(rowCnt);

        var arrHead= Array.from(document.getElementById("empTable").rows[0].getElementsByTagName("input"));

arrHead.shift()//take off extra input in first column of header

//crazy
        for (var c = 0; c < arrHead.length; c++) {


            var td = document.createElement('td'); 
              
//TABLE DEFINITION.
            td = tr.insertCell(c);
                 
       

            if (c == 0) {   // if its the first column of the table.
                // add a button control.
                //var button = document.createElement('input');
                var check1= document.createElement('input');


                check1.setAttribute('id', 'Check'+i);
                check1.setAttribute('type', 'checkbox');
                //check1.setAttribute('style','align-center');
                check1.setAttribute('height','40px');
                check1.setAttribute('width','40px');
                check1.setAttribute('onclick','highlightRow(event.target)')

                
               
                td.appendChild(check1);


               
            }

            

            if (c == 1) {

            
                var input0 = document.createElement("input");
                input0.setAttribute('type','text');
                input0.name = "date" + i;
                input0.id = "date" + i;
                input0.setAttribute('class','full');
                input0.value= document.getElementById("Date").value;

					  
					td.appendChild(input0);
                
					
				}
				if (c == 2) {
				
var input1 = document.createElement("input");
                input1.setAttribute('type','text');
                input1.name = "client" + i;
                input1.id = "client" + i;
                input1.setAttribute('class','full');
                input1.setAttribute('list','clientlist');
                input1.value= document.getElementById("Client").value;

var list1 = document.createElement("datalist");
                list1.id="clientlist";
 
					  
					td.appendChild(input1);
					td.appendChild(list1);
					
					for (x= 0; x< document.getElementById("Client").length; x++){
                 var el= document.getElementById("Client").options[x];
                 var opt= document.createElement("option");
                 opt.value=el.value;

                 list1.appendChild(opt);
               }
              
                
				}
				if (c == 3) {
				
var input2= document.createElement("input");
                input2.setAttribute('type','text');
                input2.name = "block" + i;
                input2.id = "block" + i;
                input2.value= blocks3[i]
                input2.setAttribute('class','full');
                input2.setAttribute('list','blocklist');
                input2.setAttribute('onblur','getblocklist(this)');
                //td.setAttribute('class','sticky');

var list2 = document.createElement("datalist");
                list2.id="blocklist";
					  
					td.appendChild(input2);
					td.appendChild(list2);
					
					for (x= 0; x< length; x++){
					   var blockrow= BlockTable.rows[x]
                 var el= blockrow.getElementsByTagName("input")[1];
                 var opt= document.createElement("option");
                 opt.value=el.value;
                

                 list2.appendChild(opt);
               }
                
				}
				if (c == 4) {
				
var input3 = document.createElement("input");
                input3.setAttribute('type','number');
                //input3.setAttribute('step','0.01');
                input3.name = "blockha" + i;
                input3.id = "blockha" + i;
                input3.value= blockha3[i]
                input3.setAttribute('class','full');
                
					  
					td.appendChild(input3);
					
					

            }
            if (c == 5) {
           
var input4 = document.createElement("input");
                input4.setAttribute('type','text');
                input4.name = "task" + i;
                input4.id = "task" + i;
					  input4.value = document.getElementById("Task").value;
					  input4.setAttribute('class','full');
                 input4.setAttribute('list','tasklist');

                var list4 = document.createElement("datalist");
                list4.id="tasklist";

                td.appendChild(input4);
                td.appendChild(list4);

					
					for (x= 0; x< document.getElementById("Task").length; x++){
                 var el= document.getElementById("Task").options[x];
                 var opt= document.createElement("option");
                 opt.value=el.value;
                 list4.appendChild(opt);
               }
               
            }
            if (c == 6) {
             
var input5 = document.createElement("input");
                input5.setAttribute('type','text');
                input5.name = "name" + i;
                input5.id = "name" + i;
					  input5.value = crewnames[i]
					 input5.setAttribute('class','full');
                 input5.setAttribute('list','crewlist');
					  
					  var list5 = document.createElement("datalist");
                list5.id="crewlist";
                
                
					  td.setAttribute('class','sticky');
                td.appendChild(input5);
                td.appendChild(list5);
               
                for (x= 0; x< document.getElementById("Name").length; x++){
                 var el= document.getElementById("Name").options[x];
                 var opt= document.createElement("option");
                 opt.value=el.value;
                 list5.appendChild(opt);
                }
                

             }
             if (c == 7) {

var input6 = document.createElement("input");
                input6.setAttribute('type','number');
                //input6.setAttribute('step','0.25');
                input6.name = "hours" + i;
                input6.id = "hours" + i;
                input6.setAttribute('class','full');

            let docHrs= document.getElementById("Hours");
           
            if(rks.length>0){

let uniqueRKs = [...new Set(rks)];
        
              
                if(docHrs.readOnly==true){
                  input6.value = Number(dailyhrs3[i]/(uniqueRKs.length)).toFixed(2);
                }else{
                  input6.value = Number(docHrs.value/(uniqueRKs.length*number1)).toFixed(2);
					  }
				}else{
				  if(docHrs.readOnly==true){
					 input6.value = Number(dailyhrs3[i]).toFixed(2);
				  }else{
					 input6.value= Number(docHrs.value/(number1)).toFixed(2);
				  }
				}
					

					td.appendChild(input6);
					
					}
					if (c == 8) {
					
var input7 = document.createElement("input");
                input7.setAttribute('type','number');
                input7.name = "ot1" + i;
                input7.id = "ot1" + i;
                //input7.setAttribute('step','0.25');
					  input7.value = document.getElementById("OT1").value;
					  input7.setAttribute('class','full');
					
					td.appendChild(input7);
					}
					if (c == 9) {
					
var input8 = document.createElement("input");
                input8.setAttribute('type','number');
                input8.name = "ot2" + i;
                input8.id = "ot2" + i;
                //input8.setAttribute('step','0.25');
					  input8.value = document.getElementById("OT2").value;
					  input8.setAttribute('class','full');
					
					td.appendChild(input8);
					
					}
					if (c == 10) {
					
var input9 = document.createElement("input");
                input9.setAttribute('type','number');
                //input9.setAttribute('step','0.001');
                input9.name = "ha" + i;
                input9.id = "ha" + i;
					  input9.setAttribute('class','full');
					  input9.setAttribute('onclick','updateRem()')
					  input9.setAttribute('onchange','newRem(event.target.value)')
				
				     input9.value= Number(dailyha3[i]/(numberrows/number1)).toFixed(6);
					  
					
					td.appendChild(input9);
					}
					if (c == 11) {

					
var input10 = document.createElement("input");
                input10.setAttribute('type','number');
                input10.name = "prorate" + i;
                //input10.setAttribute('step','0.05');
                input10.id = "prorate" + i;
					  input10.setAttribute('class','full');
					
					arrProRate.forEach(getProRate)
					  function getProRate(item,index){
					
					    if(String(input5.value)==String(arrProRate[index].name)){
					      input10.value = Number(arrProRate[index].prorate);
					
					    }
					    
					  }
			
					td.appendChild(input10);
					
					}
					if (c == 12) {

var input11 = document.createElement("input");
                input11.setAttribute('type','number');
                //input11.step= "0.001";
                input11.name = "adjha" + i;
                input11.id = "adjha" + i;
					  //input11.value = Number(input10.value * input9.value).toFixed(6);
					  input11.readOnly= true;
					  input11.setAttribute('class','full');
					
					td.appendChild(input11);
					}
					if (c == 13) {
					
var input12 = document.createElement("input");
                input12.setAttribute('type','number');
                //input12.step= "0.01";
                input12.name = "harate" + i;
                input12.id = "harate" + i;
                input12.setAttribute('class','full');
               
					
					if(input5.value== document.getElementById("Lead").value) {
					  input12.value = Number(arrprice3[i]*1.1).toFixed(2);
//Number(document.getElementById("HaRate").value)*1.1
					}else{
					  input12.value = Number(arrprice3[i]).toFixed(2);
//document.getElementById("HaRate").value;
					}
					
					td.appendChild(input12);
					
					}
					if (c == 14) {
					
var input13 = document.createElement("input");
                input13.setAttribute('type','text');
                input13.name = "species" + i;
                input13.id = "species" + i;
                input13.setAttribute('class','full');
                input13.setAttribute('list','rklist');
					 if(rks[i]!=undefined){
					input13.value = rks[i]; 
					 }
					
					var list13 = document.createElement("datalist");
               list13.id="rklist";
					
					td.appendChild(input13);
					td.appendChild(list13);
					
					for (x= 0; x< document.getElementById("RK").length; x++){
                 var el= document.getElementById("RK").options[x];
                 var opt= document.createElement("option");
                 opt.value=el.value;

                 list13.appendChild(opt);
               }
					
					
					}
					if (c == 15) {
					
var input14 = document.createElement("input");
                input14.setAttribute('type','number');
                input14.name = "trees" + i;
                input14.id = "trees" + i;
                input14.setAttribute('class','full');
					  
	 if(document.getElementById("Coop").checked == true){
	            
					let uniqueNames = [...new Set(crewnames)];
					input14.value = Number(arrayBlockTrees[i]/uniqueNames.length).toFixed(4);
				
			
					}else{
					input14.value="";
					input14.style.border="2px solid rgb(255,0,0)";
					}
					
					input14.placeholder= input5.value;
					
				
					td.appendChild(input14);
					}
					if (c == 16) {
					
var input15 = document.createElement("input");
                input15.setAttribute('type','number');
                input15.name = "fert" + i;
                input15.id = "fert" + i;
					  input15.setAttribute('class','full');
					
			if(document.getElementById("Coop").checked == true){
					let uniqueNames = [...new Set(crewnames)];
					input15.value = Number(arrayBlockFert[i]/uniqueNames.length).toFixed(4);
					}else{
					input15.style.border="2px solid rgb(255,0,0)";
					}
					input15.placeholder= input5.value;
					td.appendChild(input15);
					
					}
					if (c == 17) {
					
var input16 = document.createElement("input");
                input16.setAttribute('type','number');
                input16.name = "cones" + i;
                input16.id = "cones" + i;
					  input16.setAttribute('class','full');
					
	  if(document.getElementById("Coop").checked == true){
					let uniqueNames = [...new Set(crewnames)];
					input16.value = Number(arrayBlockCones[i]/uniqueNames.length).toFixed(4);
		}else{
		input16.style.border="2px solid rgb(255,0,0)";
		}
					input16.placeholder= input5.value;
					td.appendChild(input16);
					}
					if (c == 18) {
					
var input17 = document.createElement("input");
                input17.setAttribute('type','number');
                //input17.setAttribute('step','0.01');
                input17.name = "$_hr" + i;
                input17.id = "$_hr" + i;
					  input17.value = "";
					  input17.readOnly= true;
					  input17.setAttribute('class','full');
					
					td.appendChild(input17);
					}
					if (c == 19) {
				
					
var input18 = document.createElement("input");
                input18.setAttribute('type','number');
                //input18.setAttribute('step','0.005');
                input18.name = "$_unit" + i;
                input18.id = "$_unit" + i;
                input18.setAttribute('onchange','calculateplanting()');


let task= document.getElementById("Task").value;
if(document.getElementById("PieceRate").checked == true && (task.toUpperCase().indexOf("BROWSE") > -1 || task.toUpperCase().indexOf("PLANTING") > -1)){
  
					input18.value = arrayBlockPrice[i];
					input18.style.border="2px solid rgb(255,0,0)";
}
					  input18.setAttribute('class','full');
					
					td.appendChild(input18);
					}
					if (c == 20) {
					
var input19 = document.createElement("input");
                input19.setAttribute('type','text');
                input19.name = "lead" + i;
                input19.id = "lead" + i;
					  input19.value = document.getElementById("Lead").value;
					  input19.setAttribute('class','full');
					  input19.setAttribute('list','leadlist');
					
					var list19 = document.createElement("datalist");
               list19.id="leadlist";
					
					td.appendChild(input19);
					td.appendChild(list19);
					
					for (x= 0; x< document.getElementById("Lead").length; x++){
                 var el= document.getElementById("Lead").options[x];
                 var opt= document.createElement("option");
                 opt.value=el.value;

                 list19.appendChild(opt);
               }
					
					
					}
					if (c == 21) {
					
					
var input20 = document.createElement("input");
                input20.setAttribute('type','number');
                input20.name = "trucks" + i;
                input20.id = "trucks" + i;
                input20.setAttribute('class','full');
					  
					if(i== 0) {
					input20.value = document.getElementById("Trucks").value;
					}
					td.appendChild(input20);
					}
					if (c == 22) {
					
var input21 = document.createElement("input");
                input21.setAttribute('type','number');
                //input21.setAttribute('step','0.1');
                input21.name = "kmd" + i;
                input21.id = "kmd" + i;
                input21.setAttribute('class','full');
					  
					if(i== 0) {
					input21.value = document.getElementById("KmD").value;
					}
					td.appendChild(input21);
					}
					if (c == 23) {
				
var input22 = document.createElement("input");
                input22.setAttribute('type','number');
                //input22.setAttribute('step','0.01');
                input22.name = "remha" + i;
                input22.id = "remha" + i;
					  input22.setAttribute('class','full');
					  input22.setAttribute('readonly','true');
				
			
					  input22.value = arrrem4[i];
					
//(Number(input3.value)-Number(input9.value)*(numberrows/cnt2))/(numberrows/cnt2);
					
					td.appendChild(input22);
					
					}
					if (c == 24) {
				
var input23 = document.createElement("input");
                input23.setAttribute('type','text');
                input23.name = "comments" + i;
                input23.id = "comments" + i;
                input23.setAttribute('class','full');
					  
					if (i==0){
					input23.value = document.getElementById("Comments").value;
					}
					td.appendChild(input23);
					


                
            }//end forc
        }//end fori


      }

//set focus for individual planting
      let task= document.getElementById("Task").value;

      if(document.getElementById("Individual").checked==true && (task.toUpperCase().indexOf("BROWSE") > -1 || task.toUpperCase().indexOf("PLANTING") > -1)){
        tbodyRef.rows[0].getElementsByTagName("input")[15].focus();
      }

//clear planting matrix

document.getElementById('RK').value="";

var div= document.getElementById("divTrees");
while (div.firstChild){
div.removeChild(div.lastChild);
  }
var div= document.getElementById("divFert");
while (div.firstChild){
div.removeChild(div.lastChild);
  }
var div= document.getElementById("divCones");
while (div.firstChild){
div.removeChild(div.lastChild);
  }
var div= document.getElementById("div$_Unit");
while (div.firstChild){
div.removeChild(div.lastChild);
  }
document.getElementById("Trees").value="";
document.getElementById("Fert").value="";
document.getElementById("Cones").value="";
document.getElementById("$_Unit").value="";

      
      removeduplicates();
      calcremha();

document.getElementById("myInput1").value=document.getElementById("Date").value;

      multiFilter();

      calculateprorate();
      calculateplanting();

      colourtable();
      sumtable();
     
      document.getElementById("Hours").value="";
      document.getElementById("OT1").value="";
      document.getElementById("OT2").value="";
      document.getElementById("Comments").value="";
      
}//end addrows



//multi filter on main table

function multiFilter() {

var input1, input2, input3, input4, input5, filter1, filter2, filter3, filter4, filter5, table, tr, td1, td2, td3, td4, td5, i, txtValue1, txtValue2, txtValue3, txtValue4, txtValue5;
  
table = document.getElementById("empTable");
  tr = table.getElementsByTagName("tr");
  input1 = document.getElementById("myInput1");
  filter1 = input1.value.toUpperCase();
  input2 = document.getElementById("myInput2");
  filter2 = input2.value.toUpperCase();
  input3 = document.getElementById("myInput3");
  filter3 = input3.value.toUpperCase();
  input4 = document.getElementById("myInput4");
  filter4 = input4.value.toUpperCase();
  input5 = document.getElementById("myInput5");
  filter5 = input5.value.toUpperCase();
  
   
  for (i = 1; i < tr.length; i++) {

    
  td1 = tr[i].getElementsByTagName("input")[1];
  td2 = tr[i].getElementsByTagName("input")[2];
  td3  = tr[i].getElementsByTagName("input")[3];
  td4  = tr[i].getElementsByTagName("input")[5];
  td5  = tr[i].getElementsByTagName("input")[6];


    if (td1,td2,td3,td4,td5){
      txtValue1 = td1.value;
      txtValue2 = td2.value;
      txtValue3 = td3.value;
      txtValue4 = td4.value;
      txtValue5 = td5.value;


      if (txtValue1.toUpperCase().indexOf(filter1) > -1 && txtValue2.toUpperCase().indexOf(filter2) > -1 && txtValue3.toUpperCase().indexOf(filter3) > -1 && txtValue4.toUpperCase().indexOf(filter4) > -1 && txtValue5.toUpperCase().indexOf(filter5) > -1){
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
  sumtable();
}

//calculate pro-rate

function calculateprorate(){

let myTab= document.getElementById("empTable");

var rows= myTab.rows.length
var tr = myTab.getElementsByTagName("tr");
var blkarray=[];
  var blkfilterarray=[];

//get block array from table

for(let k=1;k<myTab.rows.length;k++){
  
  let block =tr[k].getElementsByTagName("input")[3];//blk
  blkarray.push(block.value);
}

  blkfilterarray= [...new Set(blkarray)]
 
// calculate prorate by block
for (j=0; j<blkfilterarray.length; j++) {

  var datearray=[];
  var clientarray=[];
  var blockarray=[];
  
 
  var taskarray=[];
  var namearray=[];
  
  var haarray=[];
  var proratearray=[];
  var adjhaarray=[];
  var td1,td2,td3,td4,td5,td6,td7,td8;
  
  let blk= blkfilterarray[j];



// loop through each row of the table.
        for (i = 1; i < myTab.rows.length; i++){


          if (tr[i].style.display !== "none" && blk ==tr[i].getElementsByTagName("input")[3].value){


            // loop through each cell in each column.
                
					td1=tr[i].getElementsByTagName("input")[1];//date
					td2=tr[i].getElementsByTagName("input")[2];//clnt
					td3=tr[i].getElementsByTagName("input")[3];//blk
					td4=tr[i].getElementsByTagName("input")[5];//task
					td5=tr[i].getElementsByTagName("input")[6];//name
					td6=tr[i].getElementsByTagName("input")[10]; //ha
					td7=tr[i].getElementsByTagName("input")[11]; //pro
					td8=tr[i].getElementsByTagName("input")[12]; //adj
					
					haarray.push(Number(td6.value));
					proratearray.push(Number(td7.value));
					
			  }
			  
			}//end for i
			
			var l = haarray.length
      if(haarray !=""){
			  var sumha= haarray.reduce(function(a,b){return a + b});
      }else{
			  var sumha = 0
      }
			var sumpro = 0;
         for(var p=0; p<l; p++) {
           sumpro += haarray[p]*proratearray[p];
         }
			
			
			let x=0;
			
			if(sumpro>0){
			   x= (Number(sumha)-Number(sumpro))/l;
			}else{
			   x=0;
			}
			
// loop back through each row of the table.
  for (i = 1; i < myTab.rows.length; i++){

    if (tr[i].style.display !== "none" && blk ==tr[i].getElementsByTagName("input")[3].value){
      // loop through each cell in each column.
              
      var a= Number(tr[i].getElementsByTagName("input")[10].value); //ha
      var b= Number(tr[i].getElementsByTagName("input")[11].value); //pro


	   
	tr[i].getElementsByTagName("input")[12].value=((a*b)+x).toFixed(6);
	
     }//end if
	  
   }//end for i

}//end for j
  sumtable();
}

//calculate hourly planting

function calculateplanting(){


var myTab= document.getElementById("empTable")
var rows= myTab.rows.length
var tr = myTab.getElementsByTagName("tr");
  var datearray=[];
  var namearray=[];
  var datenamearray=[];
  var treearray=[];
  var treesumarray=[];
  var mytreearray=[];
  
  var td1,td6,td15;

// loop through each row of the table make name array
for (i = 1; i < myTab.rows.length; i++){
var treearray=[];
tr[i].getElementsByTagName("input")[18].value = "";

    var datename = tr[i].getElementsByTagName("input")[1].value + tr[i].getElementsByTagName("input")[6].value;
  for (j = 1; j < myTab.rows.length; j++){
    var datename2 = tr[j].getElementsByTagName("input")[1].value + tr[j].getElementsByTagName("input")[6].value;

let myPrice= tr[j].getElementsByTagName("input")[19].value;
let mTask= tr[j].getElementsByTagName("input")[5].value;

    if (datename == datename2 && (myPrice=="" || myPrice==0)&&   (mTask.toUpperCase().indexOf("PLANTING") > -1)){
      treearray.push(Number(tr[j].getElementsByTagName("input")[15].value));
    }

  }
  if(treearray!=""){
    var sumtrees= treearray.reduce(function(a,b){return a+b});
  
    let myPrice= tr[i].getElementsByTagName("input")[19].value;
    
    if (sumtrees >= 1200 && (myPrice=="" || myPrice==0)){
      tr[i].getElementsByTagName("input")[18].value = 6;
    }else{
      if (sumtrees >= 1000 && (myPrice=="" || myPrice==0)){
        tr[i].getElementsByTagName("input")[18].value = 4;
      }else{
        if(sumtrees >= 800 && (myPrice=="" || myPrice==0)){
          tr[i].getElementsByTagName("input")[18].value = 2;
        }else{
          tr[i].getElementsByTagName("input")[18].value = 0;
        }
      }
    }
    }
  
	 
           


}

sumtable();
}

//select all table rows

function selectAll(){

  let table= document.getElementById("empTable");

  var rows = table.rows;
  Array.from(rows).forEach(checkAll);

  function checkAll(item, index) {
    if(item.style.display==""){
      item.getElementsByTagName("input")[0].checked=event.target.checked;
    }

    
  }
  
  
}

//summarize table

function sumtable(){


  var myTab= document.getElementById("empTable");
  var tr = myTab.getElementsByTagName("tr");
  var datearray=[];
  var clientarray=[];
  var blockarray=[];
  var blockhaarray=[];
  var taskarray=[];
  var namearray=[];
  var hoursarray=[];
  var ot1array=[];
  var ot2array=[];
  var haarray=[];
  var proratearray=[];
  var adjhaarray=[];
  var haratearray=[];
  var speciesarray=[];
  var treesarray=[];
  var fertarray=[];
  var conesarray=[];
  var hrarray=[];
  var unitarray=[];
  var leadarray=[];
  var trucksarray=[];
  var kmarray=[];
  var remarray=[];


  var td1,td2,td3,td4,td5,td6,td7,td8,td9,td10,td11,td12,td13,td14,td15,td16,td17,td18,td19,td20,td21,td22,td23,td24;
  

  // loop through each row of the table.
        for (i = 1; i < myTab.rows.length; i++){

          if (tr[i].style.display !== "none"){
            // loop through each cell in each column.
            
            //datearray
               
					 td1=tr[i].getElementsByTagName("input")[1];
					
					 var str1= String(datearray);
					 var str2= String(td1.value);

					if (str1.toUpperCase().indexOf(str2.toUpperCase())== -1){
					 
					datearray.push(td1.value);
					}
					
				
				//client array
					 td2=tr[i].getElementsByTagName("input")[2];
					 var str1= String(clientarray);
					 var str2= String(td2.value);
					
					if (str1.toUpperCase().indexOf(str2.toUpperCase()) == -1){
					
					 clientarray.push(td2.value);
					
              }

               //blockarray
                
					 td3=tr[i].getElementsByTagName("input")[3];
					 td4=tr[i].getElementsByTagName("input")[4];
					 var str1= String(blockarray);
					 var str2= String(td3.value);
	

					if (str1.toUpperCase().indexOf(str2.toUpperCase())== -1){
					 
					blockarray.push(td3.value);
					blockhaarray.push(Number(td4.value));
					}
					
					//task array
					 td5=tr[i].getElementsByTagName("input")[5];
					 var str1= String(taskarray);
					 var str2= String(td5.value);
					
					if (str1.toUpperCase().indexOf(str2.toUpperCase()) == -1){
					
					 taskarray.push(td5.value);
					
              }

					//name array
					 td6 =tr[i].getElementsByTagName("input")[6];
					 var str1= String(namearray);
					 var str2= String(td6.value);
					
					
					if (str1.toUpperCase().indexOf(str2.toUpperCase()) == -1){
					
					 namearray.push(td6.value);
					
              }

					//hours array
					 td7=tr[i].getElementsByTagName("input")[7];
					
					 hoursarray.push(Number(td7.value));
					
					
					//ot1 array
					 td8=tr[i].getElementsByTagName("input")[8];
					
					 ot1array.push(Number(td8.value));
					

					//ot2 array
					 td9=tr[i].getElementsByTagName("input")[9];
					
					 ot2array.push(Number(td9.value));


					//ha array
					 td10=tr[i].getElementsByTagName("input")[10];
					
					 haarray.push(Number(td10.value));
					

					//prorate array
					 td11=tr[i].getElementsByTagName("input")[11];
					
					 proratearray.push(Number(td11.value));
					

					//adjha array
					 td12=tr[i].getElementsByTagName("input")[12];
					
					 adjhaarray.push(Number(td12.value));
					

              	//harate array
					 td13=tr[i].getElementsByTagName("input")[13];
					
					 haratearray.push(Number(td13.value));

					//species array
					 td14=tr[i].getElementsByTagName("input")[14];
					 var str1= String(speciesarray);
					 var str2= String(td14.value);
					
					if (str1.toUpperCase().indexOf(str2.toUpperCase()) == -1){
					 speciesarray.push(td14.value);
					}
					
					 //trees array
					 td15=tr[i].getElementsByTagName("input")[15];
					
					 treesarray.push(Number(td15.value));
					
					
					 //fert array
					 td16=tr[i].getElementsByTagName("input")[16];
					
					 fertarray.push(Number(td16.value));
					
					
					 //cones array
					 td17=tr[i].getElementsByTagName("input")[17];
					
					 conesarray.push(Number(td17.value));
					

					 //hr array
					 td18=tr[i].getElementsByTagName("input")[18];
					
					 hrarray.push(Number(td18.value));
					

					 //unit array
					 td19=tr[i].getElementsByTagName("input")[19];
					
					 unitarray.push(Number(td19.value));
					

					//lead array
					 td20=tr[i].getElementsByTagName("input")[20];
					 var str1= String(leadarray);
					 var str2= String(td20.value);
		
	
				
					if (str1.toUpperCase().indexOf(str2.toUpperCase()) == -1){
					
					 leadarray.push(td20.value);
					
              }

					 //trucks array
					 td21=tr[i].getElementsByTagName("input")[21];
					
					 trucksarray.push(Number(td21.value));


					 //km array
					 td22=tr[i].getElementsByTagName("input")[22];
					
					 kmarray.push(Number(td22.value));
    

                // rem array
					 td23=tr[i].getElementsByTagName("input")[23];
					
					 remarray.push(Number(td23.value));

					
            }
           

         }

var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'CAD',
  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

document.getElementById("sum1").value = datearray.length;
document.getElementById("sum2").value = clientarray.length;
document.getElementById("sum3").value = blockarray.length;
if(blockhaarray.length>0){
  document.getElementById("sum4").value = Number(blockhaarray.reduce(function(a,b){return a + b})).toFixed(2);
}
document.getElementById("sum5").value = taskarray.length;
document.getElementById("sum6").value = namearray.length;
if(hoursarray.length>0){
  document.getElementById("sum7").value = Number(hoursarray.reduce(function(a,b){return a + b})).toFixed(2);
}
if(ot1array.length>0){
  document.getElementById("sum8").value = Number(ot1array.reduce(function(a,b){return a + b})).toFixed(2);
}
if(ot2array.length>0){
  document.getElementById("sum9").value = Number(ot2array.reduce(function(a,b){return a + b})).toFixed(2);
}
if(haarray.length>0){
  document.getElementById("sum10").value = Number(haarray.reduce(function(a,b){return a + b})).toFixed(4);
}
if(proratearray.length>0){
  document.getElementById("sum11").value = (proratearray.reduce(function(a,b){return a + b})/proratearray.length).toFixed(4);
}
if(adjhaarray.length>0){
  document.getElementById("sum12").value =(adjhaarray.reduce(function(a,b){return a + b})).toFixed(4);
}
var sumprod = 0;
var l= haratearray.length;
         for(var i=0; i<l; i++) {
           sumprod += haratearray[i]*adjhaarray[i];
         }

document.getElementById("sum13").value = formatter.format(Number(sumprod)); //Number(sumprod)toFixed(2);

//(haratearray.reduce(function(r,a,i){return r+a*adjhaarray[i]})/adjhaarray.reduce(function(a,b){return a + b})).toFixed(4);

document.getElementById("sum14").value = speciesarray.length;
if(treesarray.length>0){
  document.getElementById("sum15").value = Number(treesarray.reduce(function(a,b){return a + b})).toFixed();
}
if(fertarray.length>0){
  document.getElementById("sum16").value = Number(fertarray.reduce(function(a,b){return a + b})).toFixed();
}
if(conesarray.length>0){
  document.getElementById("sum17").value = Number(conesarray.reduce(function(a,b){return a + b})).toFixed();
}
//alert(hrarray)
//alert(treesarray)

var sumprod = 0;
var l= hrarray.length;
         for(var i=0; i<l; i++) {
           sumprod += hrarray[i]*treesarray[i];
         }
if(treesarray.length>0){
  document.getElementById("sum18").value = formatter.format(sumprod/treesarray.reduce(function(a,b){return a + b}));
}

if (treesarray.length>0 && treesarray.reduce(function(a,b){return a + b})>0){

var sumprod = 0;
var l= hrarray.length;
         for(var i=0; i<l; i++) {
           sumprod += unitarray[i]*treesarray[i];
         }


document.getElementById("sum19").value = formatter.format(sumprod);

}else{

  if (conesarray.length>0 && conesarray.reduce(function(a,b){return a + b})>0){

  var sumprod = 0;
  var l= hrarray.length;
         for(var i=0; i<l; i++) {
           sumprod += unitarray[i]*conesarray[i];
         }

  document.getElementById("sum19").value = formatter.format(sumprod);


  //}else{
  //document.getElementById("sum19").value =0;
  }
}

document.getElementById("sum20").value = leadarray.length;
if(trucksarray.length>0){
  document.getElementById("sum21").value = trucksarray.reduce(function(a,b){return a + b});
}
if(kmarray.length>0){
  document.getElementById("sum22").value = kmarray.reduce(function(a,b){return a + b});
}
if(remarray.length>0){
  document.getElementById("sum23").value = Number(remarray.reduce(function(a,b){return a + b})/remarray.length).toFixed(2);
}
colourtable();
settabledata();
//(arr1.reduce(function(r,a,i){return r+a*arr2[i]},0));

}

//calculate table rem ha- might not be used!

function calculatetablerem(){

    var myTab= document.getElementById("empTable");
    var tr = myTab.getElementsByTagName("tr");
    var td3,td3a,td4,td10,td23;


    for (i=1; i<myTab.rows.length; i++){
      
    var arrsum=[];

      td3= tr[i].getElementsByTagName("input")[3];

      td4= tr[i].getElementsByTagName("input")[4];
      
      td10= tr[i].getElementsByTagName("input")[10];

      td23= tr[i].getElementsByTagName("input")[23];
      
      //if(td23.value>0){
          //tr[i+1].getElementsByTagName("input")[10].value= //td23.value;
          //var remainder= Number(td10.value)-Number(td23.value);
          //tr[i+2].getElementsByTagName("input")[10].value = //Number(tr[i+2].getElementsByTagName("input")[10].value)+ //Number(remainder);
          
        //}
 

      for (j=1; j<myTab.rows.length; j++){
   
        td3a= tr[j].getElementsByTagName("input")[3];
        

//alert(tr[j].getElementsByTagName("input")[10].value)
            
//alert(td23.value)

        
        
        td10= tr[j].getElementsByTagName("input")[10];
        

        if (td3a.value==td3.value){
          
            arrsum.push(Number(td10.value));
          
        }
        
  
      }

        tr[i].getElementsByTagName("input")[23].value = td4.value- arrsum.reduce(function(a,b) {return a+b});

    }
  
  }

//get block list

function getblocklist(obj){

  var myTab= document.getElementById("empTable");
  var myrow= obj.parentNode.parentNode.rowIndex;
  var mycell= myTab.rows[myrow].cells[4]
  var myinput= mycell.firstChild


  var myblocks= document.getElementById("Block");
  for(i=0; i< myblocks.length; i++){

    var opt= document.getElementById("Block").options[i];
      if(opt.text==obj.value){
        myinput.value= opt.value;
        
       
      }
    
  }


}

//remove duplicate rows

      function removeduplicates(){



        var myTab= document.getElementById("empTable")
        var myrows= myTab.rows.length
        var tr = myTab.getElementsByTagName("tr");
        var i,c,j,d;
        var str1="";
        var str2="";

        for(i = 1; i < myrows; i++){

          str1="";
          for(c=1; c <myTab.rows[0].cells.length; c++){
            var td= tr[i].getElementsByTagName("input")[c];

            if(isNaN(td.value)==false){
              var myVal= Number(td.value);
            }else{
              var myVal= td.value;
            }
            
            
			   str1 = str1+String(myVal).trim();
          }

          for(j = i+1; j< myrows; j++){
          str2="";
            for(d=1; d <myTab.rows[0].cells.length; d++){
              var td2=tr[j].getElementsByTagName("input")[d];
              
              if(isNaN(td2.value)==false){
                var myVal2= Number(td2.value);
              }else{
                var myVal2= td2.value;
              }

			     str2= str2 + String(myVal2).trim();
            }


            if(str2==str1){

              
              myTab.deleteRow(j);
              myrows=myrows-1;
             
             
              
             
              
             
            }
         
          
          }
        
        }
      settabledata();
      }



//colour table by block and date
      
function colourtable(){

  var myTab= document.getElementById("empTable")
  var myrows= myTab.rows.length
  var tr = myTab.getElementsByTagName("tr");
  var i,c,j,d;
  var str1="";
  var str2="";
  if(myTab.rows.length>1){
    for (c=0; c< myTab.rows[1].cells.length; c++){

      tr[1].getElementsByTagName("td")[c].style.backgroundColor="lightblue";
    }
  }
  for(i = 1; i < myTab.rows.length-1; i++){


      str1="";
          
      str1= tr[i].getElementsByTagName("input")[1].value + tr[i].getElementsByTagName("input")[3].value;
          

   
      str2="";
      str2= tr[i+1].getElementsByTagName("input")[1].value + tr[i+1].getElementsByTagName("input")[3].value;

      if(str2==str1){
      
        
        if (tr[i].getElementsByTagName("td")[0].style.backgroundColor=="lightblue"){
          
          for (c=0; c< myTab.rows[1].cells.length; c++){
            tr[i+1].getElementsByTagName("td")[c].style.backgroundColor="lightblue";
          }

        }else{
          
          for (c=0; c< myTab.rows[1].cells.length; c++){
            tr[i+1].getElementsByTagName("td")[c].style.backgroundColor="rgb(150,200,120)";
          }

        }
      }else{
         if (tr[i].getElementsByTagName("td")[0].style.backgroundColor=="lightblue"){
          
           for (c=0; c< myTab.rows[1].cells.length; c++){
             tr[i+1].getElementsByTagName("td")[c].style.backgroundColor="rgb(150,200,120)";
           }

        }else{
          for (c=0; c< myTab.rows[1].cells.length; c++){
            tr[i+1].getElementsByTagName("td")[c].style.backgroundColor="lightblue";
          }
        }
      
      }

   }
   settabledata();

  
}

    // function to extract and submit table data. maybe not used

    /*var objarray=[];
    var tablearray =[];
    function submit() {
        var myTab = document.getElementById('empTable');
        var arrValues = new Array();
        

        // loop through each row of the table.
        for (row = 1; row < myTab.rows.length - 1; row++) {
            // loop through each cell in a row.
            for (c = 1; c < myTab.rows[row].cells.length; c++) {
                
                var element = myTab.rows.item(row).cells[c];
                
					 var tr = myTab.getElementsByTagName("tr");
                
					 var td= tr[row].getElementsByTagName("input")[c];

					 objarray.push(td);
					 tablearray.push(td.value);
					
					
					
					

<!--
                if (element.childNodes[0].getAttribute('type') == 'input') {
                    //arrValues.push(","+ element.childNodes[0].value + ",");

                }
-->
            }

        }
        
        // finally, show the result in the console.
        
    }*/

//global

//save main table as object

function settabledata(){

  let myTable= document.getElementById("empTable")

  function Day(Date, Client, Block, BlockHa, Task, Name, Hours, OT1, OT2, Ha, ProRate, AdjHa, HaRate, Species, Trees, Fert, Cones, $_Hr, $_Unit, CrewLead, Trucks, DailyKm, RemHa, Comments) {
  this.Date=Date;
  this.Client=Client;
  this.Block=Block;
  this.BlockHa=BlockHa;
  this.Task=Task;
  this.Name=Name;
  this.Hours=Hours;
  this.OT1=OT1;
  this.OT2=OT2;
  this.Ha=Ha;
  this.ProRate=ProRate;
  this.AdjHa=AdjHa;
  this.HaRate=HaRate;
  this.Species=Species;
  this.Trees=Trees;
  this.Fert=Fert;
  this.Cones=Cones;
  this.$_Hr=$_Hr;
  this.$_Unit=$_Unit;
  this.CrewLead=CrewLead;
  this.Trucks=Trucks;
  this.DailyKm=DailyKm;
  this.RemHa=RemHa;
  this.Comments=Comments;
}

var arrDays=[];

  for(i=1;i<myTable.rows.length; i++){
    var tr= myTable.rows[i];
    var input= tr.getElementsByTagName("input");
    var day = new Day(input[1].value, input[2].value, input[3].value, input[4].value, input[5].value, input[6].value, input[7].value, input[8].value, input[9].value, input[10].value, input[11].value, input[12].value, input[13].value, input[14].value, input[15].value, input[16].value, input[17].value, input[18].value, input[19].value, input[20].value, input[21].value, input[22].value, input[23].value, input[24].value);
    arrDays.push(day)
  }

//var t= document.getElementById("empTable").innerHTML

   if(myTable.rows.length>1){
      var d= JSON.stringify(arrDays);
    }else{
      var d="";
    }

//localStorage.setItem("table",t);


localStorage.setItem('datalist',d);

}



//save data to storage

/*function settabledata(){

var objarray=[];
var tablearray=[];


var myTab = document.getElementById('empTable');
        var arrValues = new Array();
        


        // loop through each row of the table.
        for (row = 1; row < myTab.rows.length; row++) {
         
            // loop through each cell in a row.
            for (c = 1; c < myTab.rows[row].cells.length; c++) {
                
                var element = myTab.rows.item(row).cells[c];
                
					 var tr = myTab.getElementsByTagName("tr");
                
					 var td= tr[row].getElementsByTagName("input")[c];
					  
					 objarray.push(td);
					 tablearray.push(td.value);

        }
 
  }


var t= document.getElementById("empTable").innerHTML

   if(myTab.rows.length>1){
      var d= tablearray;
    }else{
      var d="";
    }


localStorage.setItem("table",t);
 localStorage.setItem("data",d);
}*/

//Get Lead Client Task

function getotherdata(){

document.getElementById("Lead").value=localStorage.getItem("myLead");

document.getElementById("Name").value=localStorage.getItem("myLead");


if(localStorage.getItem("myCrew")!= null){
let myCrewList=JSON.parse(localStorage.getItem("myCrew"));

  for(i=0; i< document.getElementById("Name").length; i++){

    let o = document.getElementById("Name").options[i];
    if ( myCrewList.indexOf( o.value ) != -1 ){
      o.selected = true;
    }
  }
}

document.getElementById("Start").value=localStorage.getItem("myStart");
document.getElementById("End").value=localStorage.getItem("myEnd");
document.getElementById("Task").value=localStorage.getItem("myTask");
document.getElementById("Client").value=localStorage.getItem("myClient");

  if(localStorage.getItem("myHourly")!= null){
    if(localStorage.getItem("myHourly")=="false"){

      document.getElementById("PieceRate").checked= true;
    }else{
      document.getElementById("Hourly").checked= true;
    }
    proArray();
  }

  if(localStorage.getItem("myCoop")!= null){
    if(localStorage.getItem("myCoop")=="false"){
      document.getElementById("Individual").checked= true;
    }else{
      document.getElementById("Coop").checked= true;
    }
  }

  if(localStorage.getItem("myBlock")!=null){

    let myTable=document.getElementById("BlockTable");
    for(i=1; i< myTable.rows.length; i++){
      let myRow= myTable.rows[i];
      let myCheck= myRow.getElementsByTagName("input")[0];
      let myBlockStore= JSON.parse(localStorage.getItem("myBlock"));

      if(myBlockStore.indexOf(myCheck.id) !=-1){
        myCheck.checked= true;
//alert(myCheck.parentNode.parentNode.getElementsByTagName('input').length)
      let inputs= myCheck.parentNode.parentNode.getElementsByTagName('input');

        for (x=1; x< inputs.length; x++){
          
          inputs[x].style.backgroundColor="rgb(255,255,200)";
        }
        
      }
    }
    
  }

}

//get table data from storage

/*function gettabledata(){


var rt= localStorage.getItem("table");

var rd= localStorage.getItem("data");
var table= document.getElementById("empTable");

if ((rd != null || rd != undefined) && (rt != null || rt != undefined)){
table.innerHTML = rt;



var myTab = document.getElementById('empTable');


        var arr = rd.split(",");
        var l=0;
        

        // loop through each row of the table.
        for (row = 1; row < myTab.rows.length; row++) {
            // loop through each cell in a row.
            for (c = 1; c < myTab.rows[row].cells.length; c++) {
                
                var element = myTab.rows.item(row).cells[c];
                
					 var tr = myTab.getElementsByTagName("tr");
                
					 var td= tr[row].getElementsByTagName("input")[c];
                td.value=arr[l];
                l++;
					 
					}
			}

  }
  sumtable();
}*/

//get data from JSON

function gettabledata(){

//var rt= localStorage.getItem("table");
if(localStorage.getItem("datalist")==""){
  var rd = null
}else{  
  var rd= JSON.parse(localStorage.getItem("datalist"));
}
var table= document.getElementById("empTable");


if (rd != null || rd != undefined){
//table.innerHTML = rt;

//let dataObject= Array.from(rd)[0]


var objArray= Array.from(rd)


createRows(objArray)
					 

//var myTab = document.getElementById('empTable');

//var mydata= Object.keys(rd)


        //var arr = (mydata)
        //var l=0;
        

        // loop through each row of the table.
        /*for (row = 1; row < myTab.rows.length; row++) {
            // loop through each cell in a row.
            for (c = 1; c < myTab.rows[row].cells.length; c++) {
                
                var element = myTab.rows.item(row).cells[c];
                
					 var tr = myTab.getElementsByTagName("tr");
                
					 var td= tr[row].getElementsByTagName("input")[c];
					
					  let myValue= (Object.values(objArray[row-1])[c-1])

					
                td.value= String(myValue) //arr[l];
                //l++;
					 
					}
			}*/

  }
  removeduplicates();
  sumtable();
  colourtable();
}

function createRows(objArray){


let BlockTable= document.getElementById("BlockTable");

var objlength=(objArray.length)

//create table rows

var tbodyRef = document.getElementById('empTable').getElementsByTagName('tbody')[0];

        for (i=0; i<objlength; i++){
        var empTab = document.getElementById('empTable');
        
        var rowCnt = tbodyRef.rows.length;    // get the number of rows.
          

        var tr = tbodyRef.insertRow(0); // table row.
        //tr = empTab.insertRow(rowCnt);

        var arrHead= Array.from(document.getElementById("empTable").rows[0].getElementsByTagName("input"));

arrHead.shift()//take off extra input in first column of header

//crazy
        for (var c = 0; c < arrHead.length; c++) {


            var td = document.createElement('td'); 
              
//TABLE DEFINITION.
            td = tr.insertCell(c);
                 
       

            if (c == 0) {   // if its the first column of the table.
                // add a button control.
                //var button = document.createElement('input');
                var check1= document.createElement('input');


                check1.setAttribute('id', 'Check'+i);
                check1.setAttribute('type', 'checkbox');
                //check1.setAttribute('style','align-center');
                check1.setAttribute('height','40px');
                check1.setAttribute('width','40px');
                check1.setAttribute('onclick','highlightRow(event.target)')

                
               
                td.appendChild(check1);


               
            }

            

            if (c == 1) {

            
                var input0 = document.createElement("input");
                input0.setAttribute('type','text');
                input0.name = "date" + i;
                input0.id = "date" + i;
                input0.setAttribute('class','full');
                input0.value= Object.values(objArray[i])[c-1];

					  
					td.appendChild(input0);
                
					
				}
				if (c == 2) {
				
var input1 = document.createElement("input");
                input1.setAttribute('type','text');
                input1.name = "client" + i;
                input1.id = "client" + i;
                input1.setAttribute('class','full');
                input1.setAttribute('list','clientlist');
                input1.value= Object.values(objArray[i])[c-1];


var list1 = document.createElement("datalist");
                list1.id="clientlist";
 
					  
					td.appendChild(input1);
					td.appendChild(list1);
					
					for (x= 0; x< document.getElementById("Client").length; x++){
                 var el= document.getElementById("Client").options[x];
                 var opt= document.createElement("option");
                 opt.value=el.value;

                 list1.appendChild(opt);
               }
              
                
				}
				if (c == 3) {
				
var input2= document.createElement("input");
                input2.setAttribute('type','text');
                input2.name = "block" + i;
                input2.id = "block" + i;
                input2.value=  Object.values(objArray[i])[c-1];
                input2.setAttribute('class','full');
                input2.setAttribute('list','blocklist');
                input2.setAttribute('onblur','getblocklist(this)');
                //td.setAttribute('class','sticky');

var list2 = document.createElement("datalist");
                list2.id="blocklist";
					  
					td.appendChild(input2);
					td.appendChild(list2);
					
					
					
					for (x= 0; x< length; x++){
					   var blockrow= BlockTable.rows[x]
                 var el= blockrow.getElementsByTagName("input")[1];
                 var opt= document.createElement("option");
                 opt.value=el.value;
                

                 list2.appendChild(opt);
               }
                
				}
				if (c == 4) {
				
var input3 = document.createElement("input");
                input3.setAttribute('type','number');
                //input3.setAttribute('step','0.01');
                input3.name = "blockha" + i;
                input3.id = "blockha" + i;
                input3.value=  Object.values(objArray[i])[c-1];
                input3.setAttribute('class','full');
                
					  
					td.appendChild(input3);
					
					

            }
            if (c == 5) {
           
var input4 = document.createElement("input");
                input4.setAttribute('type','text');
                input4.name = "task" + i;
                input4.id = "task" + i;
					  input4.value =  Object.values(objArray[i])[c-1];
					  input4.setAttribute('class','full');
                 input4.setAttribute('list','tasklist');

                var list4 = document.createElement("datalist");
                list4.id="tasklist";

                td.appendChild(input4);
                td.appendChild(list4);

					
					for (x= 0; x< document.getElementById("Task").length; x++){
                 var el= document.getElementById("Task").options[x];
                 var opt= document.createElement("option");
                 opt.value=el.value;
                 list4.appendChild(opt);
               }
               
            }
            if (c == 6) {
             
var input5 = document.createElement("input");
                input5.setAttribute('type','text');
                input5.name = "name" + i;
                input5.id = "name" + i;
					  input5.value =  Object.values(objArray[i])[c-1];
					 input5.setAttribute('class','full');
                 input5.setAttribute('list','crewlist');
					  
					  var list5 = document.createElement("datalist");
                list5.id="crewlist";
                
                
					  td.setAttribute('class','sticky');
                td.appendChild(input5);
                td.appendChild(list5);
               
                for (x= 0; x< document.getElementById("Name").length; x++){
                 var el= document.getElementById("Name").options[x];
                 var opt= document.createElement("option");
                 opt.value=el.value;
                 list5.appendChild(opt);
                }
                

             }
             if (c == 7) {

var input6 = document.createElement("input");
                input6.setAttribute('type','number');
                //input6.setAttribute('step','0.25');
                input6.name = "hours" + i;
                input6.id = "hours" + i;
                input6.setAttribute('class','full');
                input6.value=  Object.values(objArray[i])[c-1];
					

					td.appendChild(input6);
					
					}
					if (c == 8) {
					
var input7 = document.createElement("input");
                input7.setAttribute('type','number');
                input7.name = "ot1" + i;
                input7.id = "ot1" + i;
                //input7.setAttribute('step','0.25');
					  input7.value = Object.values(objArray[i])[c-1];
					  input7.setAttribute('class','full');
					
					td.appendChild(input7);
					}
					if (c == 9) {
					
var input8 = document.createElement("input");
                input8.setAttribute('type','number');
                input8.name = "ot2" + i;
                input8.id = "ot2" + i;
                //input8.setAttribute('step','0.25');
					  input8.value = Object.values(objArray[i])[c-1];
					  input8.setAttribute('class','full');
					
					td.appendChild(input8);
					
					}
					if (c == 10) {
					
var input9 = document.createElement("input");
                input9.setAttribute('type','number');
                //input9.setAttribute('step','0.001');
                input9.name = "ha" + i;
                input9.id = "ha" + i;
					  input9.setAttribute('class','full');
					  input9.setAttribute('onclick','updateRem()')
					  input9.setAttribute('onchange','newRem(event.target.value)')
				
				     input9.value= Number(Object.values(objArray[i])[c-1]).toFixed(6);
					  
					
					td.appendChild(input9);
					}
					if (c == 11) {

					
var input10 = document.createElement("input");
                input10.setAttribute('type','number');
                input10.name = "prorate" + i;
                //input10.setAttribute('step','0.05');
                input10.id = "prorate" + i;
					  input10.setAttribute('class','full');
					  input10.value= Object.values(objArray[i])[c-1];
			
					td.appendChild(input10);
					
					}
					if (c == 12) {

var input11 = document.createElement("input");
                input11.setAttribute('type','number');
                //input11.step= "0.001";
                input11.name = "adjha" + i;
                input11.id = "adjha" + i;
					  input11.value = Number(Object.values(objArray[i])[c-1]).toFixed(6);
					  input11.readOnly= true;
					  input11.setAttribute('class','full');
					
					td.appendChild(input11);
					}
					if (c == 13) {
					
var input12 = document.createElement("input");
                input12.setAttribute('type','number');
                //input12.step= "0.01";
                input12.name = "harate" + i;
                input12.id = "harate" + i;
                input12.setAttribute('class','full');
                input12.value= Number(Object.values(objArray[i])[c-1]).toFixed(2);
               
					
					td.appendChild(input12);
					
					}
					if (c == 14) {
					
var input13 = document.createElement("input");
                input13.setAttribute('type','text');
                input13.name = "species" + i;
                input13.id = "species" + i;
                input13.setAttribute('class','full');
                input13.setAttribute('list','rklist');
                input13.value= Object.values(objArray[i])[c-1];
					 
					
					var list13 = document.createElement("datalist");
               list13.id="rklist";
					
					td.appendChild(input13);
					td.appendChild(list13);
					
					for (x= 0; x< document.getElementById("RK").length; x++){
                 var el= document.getElementById("RK").options[x];
                 var opt= document.createElement("option");
                 opt.value=el.value;

                 list13.appendChild(opt);
               }
					
					
					}
					if (c == 15) {
					
var input14 = document.createElement("input");
                input14.setAttribute('type','number');
                input14.name = "trees" + i;
                input14.id = "trees" + i;
                input14.setAttribute('class','full');
                input14.value= Object.values(objArray[i])[c-1];
					  input14.placeholder=input5.value
				
					td.appendChild(input14);
					}
					if (c == 16) {
					
var input15 = document.createElement("input");
                input15.setAttribute('type','number');
                input15.name = "fert" + i;
                input15.id = "fert" + i;
					  input15.setAttribute('class','full');
					  input15.value= Object.values(objArray[i])[c-1];
					
			
					input15.placeholder= input5.value;
					td.appendChild(input15);
					
					}
					if (c == 17) {
					
var input16 = document.createElement("input");
                input16.setAttribute('type','number');
                input16.name = "cones" + i;
                input16.id = "cones" + i;
					  input16.setAttribute('class','full');
					  input16.value= Object.values(objArray[i])[c-1];
					
	  
					input16.placeholder= input5.value;
					td.appendChild(input16);
					}
					if (c == 18) {
					
var input17 = document.createElement("input");
                input17.setAttribute('type','number');
                //input17.setAttribute('step','0.01');
                input17.name = "$_hr" + i;
                input17.id = "$_hr" + i;
					  input17.value = Object.values(objArray[i])[c-1];
					  input17.readOnly= true;
					  input17.setAttribute('class','full');
					
					td.appendChild(input17);
					}
					if (c == 19) {
				
					
var input18 = document.createElement("input");
                input18.setAttribute('type','number');
                //input18.setAttribute('step','0.005');
                input18.name = "$_unit" + i;
                input18.id = "$_unit" + i;
                input18.setAttribute('onchange','calculateplanting()');
  
					input18.value = Object.values(objArray[i])[c-1];
					//input18.style.border="2px solid rgb(255,0,0)";

					  input18.setAttribute('class','full');
					
					td.appendChild(input18);
					}
					if (c == 20) {
					
var input19 = document.createElement("input");
                input19.setAttribute('type','text');
                input19.name = "lead" + i;
                input19.id = "lead" + i;
					  input19.value = Object.values(objArray[i])[c-1];
					  input19.setAttribute('class','full');
					  input19.setAttribute('list','leadlist');
					
					var list19 = document.createElement("datalist");
               list19.id="leadlist";
					
					td.appendChild(input19);
					td.appendChild(list19);
					
					for (x= 0; x< document.getElementById("Lead").length; x++){
                 var el= document.getElementById("Lead").options[x];
                 var opt= document.createElement("option");
                 opt.value=el.value;

                 list19.appendChild(opt);
               }
					
					
					}
					if (c == 21) {
					
					
var input20 = document.createElement("input");
                input20.setAttribute('type','number');
                input20.name = "trucks" + i;
                input20.id = "trucks" + i;
                input20.setAttribute('class','full');
                input20.value= Object.values(objArray[i])[c-1];
					  
					
					td.appendChild(input20);
					}
					if (c == 22) {
					
var input21 = document.createElement("input");
                input21.setAttribute('type','number');
                //input21.setAttribute('step','0.1');
                input21.name = "kmd" + i;
                input21.id = "kmd" + i;
                input21.setAttribute('class','full');
                input21.value= Object.values(objArray[i])[c-1];
					  
					
					td.appendChild(input21);
					}
					if (c == 23) {
				
var input22 = document.createElement("input");
                input22.setAttribute('type','number');
                //input22.setAttribute('step','0.01');
                input22.name = "remha" + i;
                input22.id = "remha" + i;
					  input22.setAttribute('class','full');
					  input22.setAttribute('readonly','true');
			
					  input22.value = Object.values(objArray[i])[c-1];
					
					td.appendChild(input22);
					
					}
					if (c == 24) {
				
var input23 = document.createElement("input");
                input23.setAttribute('type','text');
                input23.name = "comments" + i;
                input23.id = "comments" + i;
                input23.setAttribute('class','full');
					  
					if (i==0){
					input23.value = Object.values(objArray[i])[c-1];
					}
					td.appendChild(input23);
					


                
            }//end forc
        }//end fori
  }

}




//clear table data from storage

function cleartabledata(){
  if (confirm("Confirm Delete?")) {
    localStorage.removeItem('datalist')
    localStorage.removeItem('table')
  }
}

//download data to browser


function downloaddata(){

let Lead= document.getElementById("Lead");
let Start= document.getElementById("Start");
let End= document.getElementById("End");

if(Lead.value==""||Start.value==""||End.value==""){
  alert("Please fill out information for the pay period")
}else{

var filename= String(Lead.value + "_" + Start.value+ "-" + End.value + ".csv")

/*var inputs = document.getElementById('cont').getElementsByTagName('input');

var data = '';

var myTab = document.getElementById('empTable');
        var arrValues = new Array();
        


        // loop through each row of the table.
        for (row = 0; row < myTab.rows.length; row++) {
            // loop through each cell in a row.
             var rowdata='';
             
             var sep = '';

            for (c = 1; c < myTab.rows[row].cells.length; c++) {
                
                var element = myTab.rows.item(row).cells[c];
                
					 var tr = myTab.getElementsByTagName("tr");
					
					if (row==0){
					
					  var td= element.innerHTML
					  var x= td.indexOf("<");
					  var y= td.slice(0,x);
					
					
					
					  rowdata += sep + y;
					  sep = ',';
					
					}else{
                
					 var td= tr[row].getElementsByTagName("input")[c];
					 
					
					
					rowdata += sep + td.value
					sep = ',';
            
               }
        }
       
        if (rowdata != ''){
        data += rowdata + '\r\n'
        }
    }
data1= String(data)*/


// (document.querySelector("html").innerHTML) 
//let blob = new Blob([data1], {type: 'text/html'});



  let myTable= document.getElementById("empTable")

  function Day(Date, Client, Block, BlockHa, Task, Name, Hours, OT1, OT2, Ha, ProRate, AdjHa, HaRate, Species, Trees, Fert, Cones, $_Hr, $_Unit, CrewLead, Trucks, DailyKm, RemHa, Comments) {
  this.Date=Date;
  this.Client=Client;
  this.Block=Block;
  this.BlockHa=BlockHa;
  this.Task=Task;
  this.Name=Name;
  this.Hours=Hours;
  this.OT1=OT1;
  this.OT2=OT2;
  this.Ha=Ha;
  this.ProRate=ProRate;
  this.AdjHa=AdjHa;
  this.HaRate=HaRate;
  this.Species=Species;
  this.Trees=Trees;
  this.Fert=Fert;
  this.Cones=Cones;
  this.$_Hr=$_Hr;
  this.$_Unit=$_Unit;
  this.CrewLead=CrewLead;
  this.Trucks=Trucks;
  this.DailyKm=DailyKm;
  this.RemHa=RemHa;
  this.Comments=Comments;
}

var arrDays=[];

  for(i=1;i<myTable.rows.length; i++){

    
    var tr= myTable.rows[i];
    var input= tr.getElementsByTagName("input");

    let end= new Date(End.value).getTime();
    let start= new Date(Start.value).getTime();
    let mydate= new Date(input[1].value).getTime();

    if(mydate >= start && end >= mydate){

    var day = new Day(input[1].value, input[2].value, input[3].value, input[4].value, input[5].value, input[6].value, input[7].value, input[8].value, input[9].value, input[10].value, input[11].value, input[12].value, input[13].value, input[14].value, input[15].value, input[16].value, input[17].value, input[18].value, input[19].value, input[20].value, input[21].value, input[22].value, input[23].value, input[24].value);
    arrDays.push(day)
    //}else{
      
      //return alert("Table data is outside pay period range. No data submitted!")
    }
    
  }

    if(arrDays.length==0){
    
       alert("Table data is outside pay period range. No data submitted!");
       return;
     }else{
  

    let data1= Papa.unparse(arrDays)


    const blob = new Blob([data1], {type: 'text/csv;base64'});


    link.href =  URL.createObjectURL(blob)

//data:application/csv;charset=utf-8

//link.href= "data:application/octet-stream," + data1
    link.setAttribute('download', filename);
    
    URL.revokeObjectURL(blob);
    

         
     }
 

    
    
}
}

/*

/////////////
Papa.parse(fileInput.files[0], {
	complete: function(results) {
		console.log(results);
	}
});
*/
////////////////////

//parse csv and create task list

  function openTaskFile(event) {

    var input = event.target;

    var reader = new FileReader();
    reader.onload = function(){
      var text = reader.result;

//var arrdata= Papa.parse(data).data

var results = Papa.parse(text, {
   header: true,
   dynamicTyping: true,
	delimiter: "",// auto-detect
	newline: "",	// auto-detect
	

});

let taskObj= results.data;

let Jtask= JSON.stringify(taskObj)

 

localStorage.setItem('taskstore',Jtask);
    
     document.getElementById("Tsearch").value="";
     addtasks();

      console.log(reader.result.substring(0, 200));
    };
    reader.readAsText(input.files[0]);
    
  };

//parse csv and create name list

  function openNameFile(event) {

    var input = event.target;

    var reader = new FileReader();
    reader.onload = function(){
      var text = reader.result;

//var arrdata= Papa.parse(data).data

var results = Papa.parse(text, {
   header: true,
   dynamicTyping: true,
	delimiter: "",// auto-detect
	newline: "",	// auto-detect
	

});

let nameObj= results.data;

let Jname= JSON.stringify(nameObj)

 

localStorage.setItem('namestore',Jname);
    
     document.getElementById("Nsearch").value="";
     addnames();

      console.log(reader.result.substring(0, 200));
    };
    reader.readAsText(input.files[0]);
    
  };

//parse csv and create lead list

  function openLeadFile(event) {

    var input = event.target;

    var reader = new FileReader();
    reader.onload = function(){
      var text = reader.result;

//var arrdata= Papa.parse(data).data

var results = Papa.parse(text, {
   header: true,
   dynamicTyping: true,
	delimiter: "",// auto-detect
	newline: "",	// auto-detect
	

});

let leadObj= results.data;

let Jlead= JSON.stringify(leadObj)

localStorage.setItem('leadstore',Jlead);
    
     //document.getElementById("Nsearch").value="";
     addLeads();

      console.log(reader.result.substring(0, 200));
    };
    reader.readAsText(input.files[0]);
    
  };

//parse csv and create client list

  function openClientFile(event) {

    var input = event.target;

    var reader = new FileReader();
    reader.onload = function(){
      var text = reader.result;

//var arrdata= Papa.parse(data).data

var results = Papa.parse(text, {
   header: true,
   dynamicTyping: true,
	delimiter: "",// auto-detect
	newline: "",	// auto-detect
	

});

let clientObj= results.data;

let Jclient= JSON.stringify(clientObj)

localStorage.setItem('clientstore',Jclient);
    
     document.getElementById("Csearch").value="";
     addClients();

      console.log(reader.result.substring(0, 200));
    };
    reader.readAsText(input.files[0]);
    
  };

//parse csv and create rk list

  function openRKFile(event) {

    var input = event.target;

    var reader = new FileReader();
    reader.onload = function(){
      var text = reader.result;

//var arrdata= Papa.parse(data).data

var results = Papa.parse(text, {
   header: true,
   dynamicTyping: true,
	delimiter: "",// auto-detect
	newline: "",	// auto-detect
	

});

let rkObj= results.data;

let Jrk= JSON.stringify(rkObj)

localStorage.setItem('rkstore',Jrk);
    
     document.getElementById("RKsearch").value="";
     addRKs();

      console.log(reader.result.substring(0, 200));
    };
    reader.readAsText(input.files[0]);
    
  };

function hideThis(){
  let div = document.getElementById("divFiles");
  
    if (document.getElementById("checkHide").checked==false){
      div.style.display="none";
    }else{
      div.style.display="";
    }
   
  /*let c = div.getElementsByTagName("div")
  

  for (i=0; i<c.length; i++){

    if(c[i].style.display=="none"){
      c[i].style.display="";
    }else{
      c[i].style.display="none";
    }
  }*/
}

function addClients(){

var teststring="";

var select= document.getElementById("Client")
var l= select.length
  for (j=l; j>=0; j--){
    if (j<l){
      if(select.options[j].selected == false){
        select.remove(j);
      }else{
        teststring += select.options[j].text;
      }
    }
  }

  if(localStorage.getItem("clientstore") != null){
    var values = JSON.parse(localStorage.getItem("clientstore"));


//var el = document.createElement("option")

//el.text = "";

//el.value = "";

//document.getElementById("Name").add(el);

    for (i = 0; i < values.length; i++) {
      if(values[i].Client != null){
        var str = String(values[i].Client).trim();
        var opt = String(values[i].Client).trim();
        var el = document.createElement("option")
        el.text = opt;
        el.value = opt;

       }

      var filter= document.getElementById("Csearch").value;


      if (filter !== ""){

        if (opt.toLowerCase().startsWith(filter.toLowerCase())){
          if (teststring.toUpperCase().indexOf(opt.toUpperCase()) == -1){
            document.getElementById("Client").add(el);
          }
        }
      }else{
        if (teststring.toUpperCase().indexOf(opt.toUpperCase()) == -1){
          document.getElementById("Client").add(el);
        }
      }

    }

    var sel= document.getElementById("Client")

    var cnt = 0;
    for (var i = 0; i < sel.options.length; i++) {
      if (sel.options[i].selected) {
        cnt++;
      }
    }


    if(document.getElementById("Client").length - cnt ==0){
      var x= prompt("Client not found, please enter");
  //var y= prompt("Please enter block ha");
  
      var opt = x;
  //var ha = y;
      var el = document.createElement("option")
      el.text = opt;
      el.value = opt;

      document.getElementById("Client").add(el);

//create new task object and save to storage
      let newObj={Client:x}
      values.push(newObj)


      localStorage.setItem('clientstore',JSON.stringify(values))

    }
  }

}

function addRKs(){

var teststring="";

var select= document.getElementById("RK")
var l= select.length
  for (j=l; j>=0; j--){
    if (j<l){
      if(select.options[j].selected == false){
        select.remove(j);
      }else{
        teststring += select.options[j].text;
      }
    }
  }

  if(localStorage.getItem("rkstore") != null){
    var values = JSON.parse(localStorage.getItem("rkstore"));


//var el = document.createElement("option")

//el.text = "";

//el.value = "";

//document.getElementById("Name").add(el);

    for (i = 0; i < values.length; i++) {
      if(values[i].RK != null){
        var str = String(values[i].RK).trim();
        var opt = String(values[i].RK).trim();
        var el = document.createElement("option")
        el.text = opt;
        el.value = opt;

       }

    var filter= document.getElementById("RKsearch").value;


      if (filter !== ""){

        if (opt.toLowerCase().startsWith(filter.toLowerCase())){
          if (teststring.toUpperCase().indexOf(opt.toUpperCase()) == -1){
            document.getElementById("RK").add(el);
          }
        }
      }else{
        if (teststring.toUpperCase().indexOf(opt.toUpperCase()) == -1){
          document.getElementById("RK").add(el);
        }
      }

    }

    var sel= document.getElementById("RK")

    var cnt = 0;
    for (var i = 0; i < sel.options.length; i++) {
      if (sel.options[i].selected) {
        cnt++;
      }
    }


    if(document.getElementById("RK").length - cnt ==0){
      var x= prompt("RK not found, please enter");
  //var y= prompt("Please enter block ha");
  
      var opt = x;
  //var ha = y;
      var el = document.createElement("option")
      el.text = opt;
      el.value = opt;

      document.getElementById("RK").add(el);

//create new task object and save to storage
      let newObj={RK:x}
      values.push(newObj)


      localStorage.setItem('rkstore',JSON.stringify(values))

    }
  }

}

//add leads

function addLeads(){
if(localStorage.getItem("leadstore") != null){
  var values = JSON.parse(localStorage.getItem("leadstore"))//.     Array.from(JSON.parse(localStorage.getItem("leadstore")));
  let objKey= Object.keys(JSON.parse(localStorage.getItem("leadstore"))[0])


//alert(Object.keys(leadObj[0]))


//var el = document.createElement("option")

//el.text = "";

//el.value = "";

//document.getElementById("Name").add(el);

  for (i = 0; i < values.length; i++) {
    if(values[i].Name != null){
      var str = String(values[i].Name).trim();
      var opt = String(values[i].Name).trim();
      var el = document.createElement("option")
      el.text = opt;
      el.value = opt;

     }


document.getElementById("Lead").add(el);
    }
  }
}


//add employees

function addnames(){

var teststring="";

var select= document.getElementById("Name")
var l= select.length
  for (j=l; j>=0; j--){
    if (j<l){
      if(select.options[j].selected == false){
        select.remove(j);
      }else{
        teststring += select.options[j].text;
      }
    }
  }

if(localStorage.getItem("namestore") !=null){
  var values = JSON.parse(localStorage.getItem("namestore"));


//var el = document.createElement("option")

//el.text = "";

//el.value = "";

//document.getElementById("Name").add(el);

  for (i = 0; i < values.length; i++) {
    if(values[i].Name != null){
      var str = String(values[i].Name).trim();
      var opt = String(values[i].Name).trim();
      var el = document.createElement("option")
      el.text = opt;
      el.value = opt;

     }

  var filter= document.getElementById("Nsearch").value;


    if (filter !== ""){

      if (opt.toLowerCase().startsWith(filter.toLowerCase())){
        if (teststring.toUpperCase().indexOf(opt.toUpperCase()) == -1){
          document.getElementById("Name").add(el);
        }
      }
    }else{
      if (teststring.toUpperCase().indexOf(opt.toUpperCase()) == -1){
        document.getElementById("Name").add(el);
      }
    }

  }

  var sel= document.getElementById("Name")

  var cnt = 0;
  for (var i = 0; i < sel.options.length; i++) {
    if (sel.options[i].selected) {
        cnt++;
    }
  }


    if(document.getElementById("Name").length - cnt ==0){
      var x= prompt("Name not found, please enter name");
  //var y= prompt("Please enter block ha");
  
      var opt = x;
  //var ha = y;
      var el = document.createElement("option")
      el.text = opt;
      el.value = opt;

      document.getElementById("Name").add(el);

//create new task object and save to storage
      let newObj={Name:x}
      values.push(newObj)


      localStorage.setItem('namestore',JSON.stringify(values))

    }
  }

}

function addtasks(){

//document.getElementById("Block").length = 0;
var teststring="";

var select= document.getElementById("Task")
var l= select.length
  for (j=l; j>=0; j--){
    if (j<l){
      if(select.options[j].selected == false){
        select.remove(j);
      }else{
        teststring += select.options[j].text;
      }
    }
  }

  if(localStorage.getItem("taskstore") !=null){

    var values = Array.from(JSON.parse(localStorage.getItem("taskstore")));


//var el = document.createElement("option")

//el.text = "";

//el.value = "";

//document.getElementById("Task").add(el);

    for (i = 0; i < values.length; i++) {
      if(values[i].Task != null){
        var str = String(values[i].Task).trim();
        var opt = String(values[i].Task).trim();
        var el = document.createElement("option")
        el.text = opt;
        el.value = opt;

       }


    var filter= document.getElementById("Tsearch").value;


      if (filter !== ""){

        if (opt.toLowerCase().startsWith(filter.toLowerCase())){
          if (teststring.toUpperCase().indexOf(opt.toUpperCase()) == -1){
        document.getElementById("Task").add(el);
          }
        }
      }else{
        if (teststring.toUpperCase().indexOf(opt.toUpperCase()) == -1){
      document.getElementById("Task").add(el);
        }
      }

    }

    var sel= document.getElementById("Task")

    var cnt = 0;
    for (var i = 0; i < sel.options.length; i++) {
        if (sel.options[i].selected) {
          cnt++;
        }
    }


      if(document.getElementById("Task").length-cnt ==0){
      var x= prompt("Task not found, please enter");
  
      var opt = x;
      var el = document.createElement("option")
      el.text = opt;
      el.value = opt;

      document.getElementById("Task").add(el);

//create new task object and save to storage
      let newObj={Task:x}
      values.push(newObj)
      localStorage.setItem('taskstore',JSON.stringify(values))
 
      }
    }
}

//show remaining local storage
function checkStorage(){

  var _lsTotal = 0,
    _xLen, _x;
for (_x in localStorage) {
    if (!localStorage.hasOwnProperty(_x)) {
        continue;
    }
    _xLen = ((localStorage[_x].length + _x.length) * 2);
    _lsTotal += _xLen;
    console.log(_x.substr(0, 50) + " = " + (_xLen / 1024).toFixed(2) + " KB")
};
//alert("Total = " + (_lsTotal / 1024).toFixed(2) + " KB");

/*let z= document.getElementById("disk_c");
z.setAttribute("min", "0");
z.setAttribute("max","(1024*1024*5)");
z.setAttribute("value", _lsTotal);*/

//x.value= _lsTotal;


return (Number(_lsTotal)/Number(5242880))

//alert(1024*1024*5)

alert("Total = " + (_lsTotal / 1024).toFixed(2) + " KB")
alert(document.getElementById("disk_c").value)
}



function remStorage(){

alert(unescape(encodeURIComponent(JSON.stringify(localStorage))).length)

alert((1024 * 1024 * 5 - unescape(encodeURIComponent(JSON.stringify(localStorage))).length)/(1024*1024*5))

}

function localStorageSpace(){
        var allStrings = '';
        for(var key in window.localStorage){
            if(window.localStorage.hasOwnProperty(key)){
                allStrings += window.localStorage[key];
            }
        }
        return allStrings ? 3 + ((allStrings.length*16)/(8*1024)) + ' KB' : 'Empty (0 KB)';
    
    //alert((allStrings.length*16)/(8*1024) + ' KB : Empty (0 KB)');
    //alert(allStrings.length);

  };

function openTab(evt, tabName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";

  if(tabName=="Ops Records"){
    createOpsTable();
  }
}

function createOpsTable(){


  var opstorage= JSON.parse(localStorage.getItem('opslist'));
  var opsobj=opstorage;


  


//let header = Object.keys(obj[0]);

  let opsheader=['Date','Client','Name & Certificate','Location','Pest Controlled & Purpose','Product','Litres','Adjuvant','Litres','Area','Rate','Method','Windspeed AM','Wind Dir AM','Temperature AM','Humidity AM','Windspeed PM', 'Wind Dir PM','Temperature PM', 'Humidity PM'];
  let myTable=document.getElementById("OpsTable")
  myTable.deleteTHead();

  var thead = myTable.createTHead(0);



   let row = thead.insertRow();
   let th = document.createElement("th");
     //th.setAttribute('class','sticky')
   let button = document.createElement("button");
     button.setAttribute('id','DeleteOps');
     button.style= "background-color: rgb(255,200,200)" 
     button.setAttribute('onclick','deleteRows(document.getElementById("OpsTable"))');
     button.textContent='Delete'+'\n'+'Selected';
     th.appendChild(button);
     row.appendChild(th);


  for(let key of opsheader){

    th= document.createElement("th");
    //th.setAttribute('class','sticky');
    let text = document.createTextNode(key);
     
      let input = document.createElement("input");
      input.id= 'ops'+key;
    if(key =='Date'){
      input.setAttribute('placeholder','add '+ key)
      input.setAttribute('class','full');
      input.setAttribute('type','date');
      //input.setAttribute('type','text');
      //input.setAttribute('onclick','formatdate(this)');
    }else{

     if(key=='Location'){

       let mylist=JSON.parse(localStorage.getItem('blocklist'))
       
       let y=document.createElement("datalist");
         y.setAttribute('id','myblocklist');

       for(i=0; i< mylist.length; i++){
         let opt= document.createElement("option")
         opt.setAttribute('value',mylist[i].Block)
         y.appendChild(opt)
       }
       th.appendChild(y)
       th.setAttribute('class','sticky');

       input.setAttribute('placeholder','add '+ key)
       //input.setAttribute('onkeyup','blockFilter(event)')
       input.setAttribute('class','full');
       input.setAttribute('type','text');
       input.setAttribute('list','myblocklist');
       //input.setAttribute('onblur','getblocklist(this)');

     }else{
       if(key=='Name & Certificate'){
         
        let mylist=JSON.parse(localStorage.getItem('namestore'))

         let y=document.createElement("datalist");
         y.setAttribute('id','mycertlist');

         for(i=0; i< mylist.length; i++){
           let opt= document.createElement("option")
           if(mylist[i].Certificate != undefined){
             opt.setAttribute('value',mylist[i].Name + "-" + mylist[i].Certificate)
             y.appendChild(opt)
           }
         }
         th.appendChild(y)

         input.setAttribute('placeholder','add '+ key);
         input.setAttribute('list','mycertlist');
         input.setAttribute('type','text');
       }else{
         if(key=='Client'){

           let mylist=JSON.parse(localStorage.getItem('clientstore'))

           let y=document.createElement("datalist");
           y.setAttribute('id','myclientlist');

           for(i=0; i< mylist.length; i++){
             let opt= document.createElement("option")
             opt.setAttribute('value',mylist[i].Client)
             y.appendChild(opt)  
           }
           th.appendChild(y)

           input.setAttribute('placeholder','add '+ key);
           input.setAttribute('list','myclientlist');
           input.setAttribute('type','text');

         }else{
           if(key=='Pest Controlled & Purpose'){
             input.setAttribute('placeholder','add '+ key);
             input.setAttribute('type','text');
             input.setAttribute('list','pestlist');//need to make this list
           }else{
             if(key=='Product'){
               input.setAttribute('placeholder','add '+ key);
               input.setAttribute('type','text');
               input.setAttribute('class','full');
               input.setAttribute('list','productlist');//need to make this list
             }else{
               if(key=='Adjuvant'){
                 input.setAttribute('placeholder','add '+ key);
                 input.setAttribute('type','text');
                 input.setAttribute('class','full');
                 input.setAttribute('list','productlist');//need to make this list
               }else{
                 input.setAttribute('placeholder','add '+ key);
                 input.setAttribute('class','full');
                 input.setAttribute('type','number');
               }
             }
           }
         }
       }
     }
    }
     th.appendChild(text);
       th.appendChild(input);
       row.appendChild(th);
     
  }

  th = document.createElement('th');
  //th.setAttribute('class','sticky');
  button = document.createElement('button');
  button.setAttribute('id','AddOpsRecord');
  button.setAttribute('onclick','addOpsRow(event)')
  button.style= "background-color: rgb(200,255,200)" 
  button.textContent='Add Ops Record';
  th.appendChild(button);
  row.appendChild(th);

  if(myTable.children.length<2){
    let tbody = document.createElement('tbody');
    myTable.appendChild(tbody);
  
  //tbody.setAttribute('onmouseout','sumHours()');



    if(opsobj!= null){
          
      for (var i = 0; i < opsobj.length; i++) {
        let element = (opsobj[i]);
      

        //var tbody = document.getElementById('tbody');

        let row = tbody.insertRow();
        let cell = row.insertCell();

        let check = document.createElement("input");
        check.setAttribute('type','checkbox')
        check.setAttribute('id','CheckOps'+i);
        check.setAttribute('onclick','highlightRow(event.target)')
        cell.appendChild(check);
        //row.appendChild(td);
    
       
        
       

      //for (let element of obj) {
      //let row = table.insertRow();
      //alert(Object.keys(element))
      for (key in element) {
      
        let cell = row.insertCell();
        let input = document.createElement('input');
      
        
        if(key=='Date'){
          
          input.setAttribute('type','text');
          input.setAttribute('class','full');
          input.value = element[key];
          
        }else{

          if(key=='Location'){
            cell.setAttribute('class','sticky')
            input.setAttribute('type','text');
            input.setAttribute('list','myblocklist');
            input.setAttribute('class','full');
            input.value = element[key];
            
          }else{

            if(key=='Wind_Dir_AM'||key=='Wind_Dir_PM'){
              input.setAttribute('type','text');
              input.setAttribute('class','full');
              input.value = element[key];
            
            }else{
              if(key=='Litres'||key=='ALitres'||key=='Area'||key=='Rate'||key=='Temperature_AM'||key=='Humidity_AM'||key=='Temperature_PM'||key=='Humidity_PM'||key=='Windspeed_AM'||key=='Windspeed_PM'){
                input.setAttribute('type','number');
                input.setAttribute('class','full');
                input.value = element[key];
                //alert((element[key])+" "+typeof(element[key]))
              
              }else{
                if(key=='Product'||key=='Adjuvant'||key=='Method'){
                  input.setAttribute('class','full');
                  input.value = element[key];
                }
                  input.setAttribute('type','datalist');
                  input.value = element[key];       
                }
              }
            }  
            
          }
          cell.appendChild(input)
        }
      } 
    }
  } 
}


//add ops row
function addOpsRow(event){

  let myTable= document.getElementById("OpsTable");

  let tbody = myTable.getElementsByTagName('tbody')[0];
  
  var rows= myTable.rows.length;


       let row = tbody.insertRow(0);
       let cell = row.insertCell();

       let check = document.createElement("input");
         check.setAttribute('type','checkbox')
         check.setAttribute('id','CheckOps' + rows);
         check.setAttribute('onclick','highlightRow(event.target)')
         cell.appendChild(check);
        
        cell=row.insertCell();
        input=document.createElement("input");
        input.setAttribute('id','opsDate'+rows)
        input.setAttribute('type','text')
        input.setAttribute('class','full');
        input.value = document.getElementById("opsDate").value;
        cell.appendChild(input)
   
        cell=row.insertCell();
        input= document.createElement("input");
        input.setAttribute('id','opsClient'+rows);
        input.setAttribute('type','text')
        //input.setAttribute('class','full');
        input.setAttribute('list','myclientlist');
        input.value= document.getElementById("opsClient").value;
        cell.appendChild(input);

        cell=row.insertCell();
        input= document.createElement("input");
        input.setAttribute('id','opsName & Certificate'+rows);
        input.setAttribute('type','text');
        //input.setAttribute('class','full');
        input.setAttribute('list','mycertlist');
        input.value= document.getElementById("opsName & Certificate").value;
        cell.appendChild(input);

        cell=row.insertCell();
        cell.setAttribute('class','sticky')
        input=document.createElement("input");
        input.setAttribute('id','opsLocation'+rows)
        //input.setAttribute('readonly','true')
        input.setAttribute('type','text');
        input.setAttribute('class','full');
        input.setAttribute('list','myblocklist');
        input.value= document.getElementById("opsLocation").value;
        cell.appendChild(input)
        
   
        cell=row.insertCell();
        input= document.createElement("input");
        input.setAttribute('id','opsPest Controlled & Purpose'+rows);
        input.setAttribute('type','text');
        //input.setAttribute('class','full');
        input.value = document.getElementById('opsPest Controlled & Purpose').value;
        cell.appendChild(input);

        cell = row.insertCell();
        input= document.createElement("input");
        input.setAttribute('id','opsProduct'+i);
        input.setAttribute('class','full');
        input.setAttribute('type','text');
        input.setAttribute('list','productlist');
        input.value = document.getElementById('opsProduct').value;
        cell.appendChild(input);

        cell = row.insertCell();
        input= document.createElement("input");
        input.setAttribute('id','opsLitres'+i);
        input.setAttribute('class','full');
        input.setAttribute('type','number');
        input.value = document.getElementById('opsLitres').value;
        cell.appendChild(input);

        cell = row.insertCell();
        input= document.createElement("input");
        input.setAttribute('id','opsAdjuvant'+i);
        input.setAttribute('class','full');
        input.setAttribute('type','text');
        input.setAttribute('list','productlist');
        input.value = document.getElementById('opsProduct').value;
        cell.appendChild(input);

        cell = row.insertCell();
        input= document.createElement("input");
        input.setAttribute('id','opsALitres'+i);
        input.setAttribute('class','full');
        input.setAttribute('type','number');
        input.value = document.getElementById('opsLitres').value;
        cell.appendChild(input);

        cell = row.insertCell();
        input= document.createElement("input");
        input.setAttribute('id','opsArea'+i);
        input.setAttribute('class','full');
        input.setAttribute('type','number');
        input.value = document.getElementById('opsArea').value;
        cell.appendChild(input);

        cell = row.insertCell();
        input= document.createElement("input");
        input.setAttribute('id','opsRate'+i);
        input.setAttribute('class','full');
        input.setAttribute('type','number');
        input.value = document.getElementById('opsRate').value;
        cell.appendChild(input);

        cell = row.insertCell();
        input= document.createElement("input");
        input.setAttribute('id','opsMethod'+i);
        input.setAttribute('class','full');
        input.setAttribute('type','text');
        input.setAttribute('list','methodlist');
        input.value = document.getElementById('opsMethod').value;
        cell.appendChild(input);

        cell = row.insertCell();
        input= document.createElement("input");
        input.setAttribute('id','opsWindspeed AM'+i);
        input.setAttribute('class','full');
        input.setAttribute('type','number');
        input.value = document.getElementById('opsWindspeed AM').value;
        cell.appendChild(input);

        cell = row.insertCell();
        input= document.createElement("input");
        input.setAttribute('id','opsWind Dir AM'+i);
        input.setAttribute('class','full');
        input.setAttribute('type','text');
        input.value = document.getElementById('opsWind Dir AM').value;
        cell.appendChild(input);

        cell = row.insertCell();
        input= document.createElement("input");
        input.setAttribute('id','opsTemperature AM'+i);
        input.setAttribute('class','full');
        input.setAttribute('type','number');
        input.value = document.getElementById('opsTemperature AM').value;
        cell.appendChild(input);

        cell = row.insertCell();
        input= document.createElement("input");
        input.setAttribute('id','opsHumidity AM'+i);
        input.setAttribute('class','full');
        input.setAttribute('type','number');
        input.value = document.getElementById('opsHumidity AM').value;
        cell.appendChild(input);

        cell = row.insertCell();
        input= document.createElement("input");
        input.setAttribute('id','opsWindspeed PM'+i);
        input.setAttribute('class','full');
        input.setAttribute('type','number');
        input.value = document.getElementById('opsWindspeed PM').value;
        cell.appendChild(input);

        cell = row.insertCell();
        input= document.createElement("input");
        input.setAttribute('id','opsWind Dir PM'+i);
        input.setAttribute('class','full');
        input.setAttribute('type','text');
        input.value = document.getElementById('opsWind Dir PM').value;
        cell.appendChild(input);

        cell = row.insertCell();
        input= document.createElement("input");
        input.setAttribute('id','opsTemperature PM'+i);
        input.setAttribute('class','full');
        input.setAttribute('type','number');
        input.value = document.getElementById('opsTemperature PM').value;
        cell.appendChild(input);

        cell = row.insertCell();
        input= document.createElement("input");
        input.setAttribute('id','opsHumidity PM'+i);
        input.setAttribute('class','full');
        input.setAttribute('type','number');
        input.value = document.getElementById('opsHumidity PM').value;
        cell.appendChild(input);




//document.getElementById("BlockHa").value="";
//document.getElementById("RemHa").value="";
  
  saveOpsList();

}

function saveOpsList(){
  let myTable= document.getElementById("OpsTable")

  function Obj(Date,Client,Name_Certificate,Location,Pest_Controlled_Purpose,Product,Litres,Adjuvant,ALitres,Area,Rate,Method,Windspeed_AM,Wind_Dir_AM,Temperature_AM,Humidity_AM,Windspeed_PM, Wind_Dir_PM,Temperature_PM, Humidity_PM){
    this.Date=Date;
    this.Client=Client;
    this.Name_Certificate=Name_Certificate;
    this.Location=Location;
    this.Pest_Controlled_Purpose=Pest_Controlled_Purpose;
    this.Product=Product;
    this.Litres=Litres;
    this.Adjuvant=Adjuvant;
    this.ALitres=ALitres;
    this.Area=Area;
    this.Rate=Rate;
    this.Method=Method;
    this.Windspeed_AM=Windspeed_AM; 
    this.Wind_Dir_AM=Wind_Dir_AM;
    this.Temperature_AM=Temperature_AM;
    this.Humidity_AM=Humidity_AM;
    this.Windspeed_PM=Windspeed_PM;
    this.Wind_Dir_PM=Wind_Dir_PM;
    this.Temperature_PM=Temperature_PM;
    this.Humidity_PM=Humidity_PM;
  }
var myObjArr=[];
  for(i=1;i<myTable.rows.length; i++){
    
    var tr= myTable.rows[i];
    var input= tr.getElementsByTagName("input");
    var opsobj = new Obj(input[1].value, input[2].value, input[3].value, input[4].value, input[5].value, input[6].value, input[7].value, input[8].value, input[9].value, input[10].value, input[11].value, input[12].value, input[13].value, input[14].value, input[15].value, input[16].value, input[17].value, input[18].value,input[19].value,input[20].value);
    myObjArr.push(opsobj)
    
  }
  
localStorage.setItem('opslist',JSON.stringify(myObjArr))
//alert(localStorage.getItem('opslist'))
}

function loadJSON(file,callback) {
  
  var xobj = new XMLHttpRequest();
      xobj.overrideMimeType("application/json");
  xobj.open('GET', file, true);
  xobj.onreadystatechange = function() {
       if (xobj.readyState == 4 && xobj.status == "200"){
         callback(xobj.responseText);
       }
  };
  xobj.send(null)
}

function loadCSV(file,callback){
alert(file)
  var xobj = new XMLHttpRequest();
      xobj.overrideMimeType("application/csv");
  xobj.open('GET', file, true);
  alert(xobj.status)
  xobj.onreadystatechange = function(){
       if (xobj.readyState == 4 && xobj.status == "200"){
         callback(xobj.responseText);
       }
  };
  xobj.send(null);
}

function getJSON(file){
  loadJSON(file,function(response){
    var myJSON = JSON.parse(response)
  });
}

function getCSV(file){
    loadCSV(file,function(response){
    var myCSV = Papa.parse(response,
      {header: true,
        dynamicTyping: true,
        delimiter: "",
        newline: "",
      });
      
    alert(myCSV)
  });
  
}
//getCSV('Employees.csv');

/*{const employees = {name: 'me', list: getCSV('Employees.csv')}
  //alert(employees.list)
};*/