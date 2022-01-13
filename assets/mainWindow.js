const electron= require("electron");
const {ipcRenderer}=electron;

checkTodoCount();

const inputValue=document.querySelector("#todoValue");

// ipcRenderer.on("initApp",(e,todoDB)=> {
//   todoDB.forEach(todo=> {
//     drawRow(todo)
//   })
// })

todoValue.addEventListener("keypress", e => {
    if (e.keyCode == 13) {
      ipcRenderer.send("newTodo:save", {
        ref: "main",
        todoValue: e.target.value
      });
      e.target.value = "";
    }
  });

document.querySelector("#addBtn").addEventListener("click", ()=> {

 ipcRenderer.send("newTodo:save", {ref:"main", todoValue:todoValue.value})
 todoValue.value="";

})


ipcRenderer.on("todo:addItem",(e,todo)=> {

  drawRow(todo);

});


/*To do listte count sayısını kontrol ederek alert container'ı tetikleyeceğiz.Count 0 ise alert container çalışır. */

function checkTodoCount(){

    const container=document.querySelector(".todo-container");
    const alertContainer=document.querySelector(".alert-container");

    document.querySelector(".total-count-container").innerText =
    container.children.length-1;

    container.children.length

    if(container.children.length!==0){

        alertContainer.style.display="none";
    }
    else{
        alertContainer.style.display="block";
    }

}


function drawRow(todo){

  //container
const container=document.querySelector(".todo-container");

//ro6
const row= document.createElement("div");
row.className="row";

//col
const col=document.createElement("div");

col.className="todo-item p-2 mb-3 text-light col-md-12 shadow card d-flex justify content-center flex-row align-items-center";


//p
const p=document.createElement("p");
p.className="m-0 w-100 text-dark";
p.innerText=todo.text;


//Silme btn oluşturma

const deleteBtn= document.createElement("button");
deleteBtn.className="btn btn-sm btn-outline-danger flex-shrink-1";
deleteBtn.innerText="X";




//Silme Olayı
deleteBtn.addEventListener("click", (e)=>{

  if(confirm("Bu kaydı silmek istediğinize emin misiniz ?"))
  {
      e.target.parentNode.parentNode.remove()
      
      checkTodoCount()
      


  }
})

col.appendChild(p);
col.appendChild(deleteBtn);

row.appendChild(col);

checkTodoCount();

container.appendChild(row);

checkTodoCount();


}
