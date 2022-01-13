const electron = require("electron");
const url=require("url");
const path=require("path");
// const db=require("./lib/connection").db



const {app,BrowserWindow, Menu,ipcMain,webContents}=electron;

let mainWindow,addWindow;

let todoList =[];





app.on("ready", ()=>{

 mainWindow= new BrowserWindow({

    // frame:false
 });

 mainWindow.setResizable(false) //Ana pencerenin boyutların değiştirmemizi engeller.

 //Pencerenin oluşturulması
 mainWindow.loadURL(

    url.format({

        pathname:path.join(__dirname,"pages/mainWindow.html"),
        protocol:"file",
        slashes:true

    })
);

//Menünün oluşturulması

const mainMenu=Menu.buildFromTemplate(mainMenuTemplate); //Aşağıda tanımlanan "Dosya" menüsünü burada mainMenu içerine sabit olarak tanımlıyoruz.

Menu.setApplicationMenu(mainMenu);

//NewTodo Penceresi Close Event'i

ipcMain.on("newTodo:close",()=>{

    addWindow.close();
})

//NewTodo Penceresinde inputa girilen todo value'nun kaydedilme event'i

ipcMain.on("newTodo:save",(err,data)=>{

    if(data){
        let todo = {
            id: todoList.length+1,
            text: data.todoValue
        };
        todoList.push(todo);

        mainWindow.webContents.send("todo:addItem",todo);

        if(data.ref=="new"){

        addWindow.close();
        addWindow=null;
        
    }
    }


    // maimWindow.webContents.once("dom-ready", () => {

    //     db.query("SELECT * FROM todoDB", (error, result, fields)=>{
    //         mainWindow.webContents.send("initApp",result)
    //     })
    // })
    
});

});

const mainMenuTemplate =[
    
    { 
        label:"Dosya",
        submenu: [
            {
                label:"Yeni TODO Ekle",
                click(){
                    createWindow();

                }
            },

            {
                label: "Tümünü Sil"
            },

            {
                label:"Çıkış",
                role:"quit"
            }

        ]

},

]


if(process.env.NODE_ENV !== "production")
{
    mainMenuTemplate.push(
        {
        
        
            label :"Dev Tools",
            submenu: [
    
                {
                    label: "Geliştirici Penceresini Aç",
                    click(item,focusedWindow){
                        focusedWindow.toggleDevTools();
                    }
                },
    
                {
                    label: "Yenile",
                    role: "reload"
                }
    
            ]
    }

    )
}


function createWindow(){
   addWindow=new BrowserWindow({
       width:575,
       height:375,
       title:"Yeni Todo Ekle"
     // frame:false
   });

   addWindow.setResizable(false) //Ana pencerenin boyutların değiştirmemizi engeller.


   addWindow.loadURL(url.format({
       pathname: path.join(__dirname,"pages/newTodo.html"),
       protocol:"file:",
       slashes:true
   }));

   addWindow.on("close",()=>{
       addWindow=null;
   })

}

function getTodoList(){

    console.log(todoList);
}
