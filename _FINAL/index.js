import { WebApp, Component, EventManager } from './modules/app.js';

// Required to initialize our web app
const app = new WebApp();

// Example of creating a new component with dummy data
// And rendering it to the page
const main = app.component({
    name: "Main",
    selector: "#DemoArea",
    template: "#FooBar",
    data: {
        title: "CPSC431 Final Demo Page",
        buttons: [
            { msg: "Hello", displayText: "Say Hi" },
            { msg: "Goodbye my firend", displayText: "Say Bye" }
        ]
    }
});

main.render("replace");


// Example of adding a regular click event
app.events.click("bar", (e) => {

    const src = e.target;
    const message = src.dataset.message ?? "NO MESSAGE!";
    alert(message);
});

//fetchApiDemo
// Example of rendering a component with an async click event
app.events.click("fetchApiDemo", async () => {
    let fakeData = await app.GET("api/test.php");

    let comp = app.component({
        name: "ApiDemoComp",
        selector: "#ApiArea",
        template: "#ApiTemplate", 
        data: fakeData
    });

    comp.render();
});

//Example of using a template that has to be downloaded first
//**Dynamically download the template */
(async () => {

    let dynamicTemplate = await app.GET("templates/demo.html", "text");

    let dynamicData = {
        title: "Dynamic Template and Content $$$$$",
        message: "This is all very dynamic! $$$$$"
    };

    let options = {
        name: "DynamicDemo",
        selector: "#DynamicArea",
        template: dynamicTemplate,
        data: dynamicData
    };

    let comp = app.component(options);

    comp.render();

})(); // Self-Executing function as we can use async/await more easily. 


//NEW FUNCTION 
// app.events.click("jojo",  (e) => {

//     const src = e.target;
//     const message = src.dataset.message ?? "NO MESSAGE!";
//     alert(message);
// });


// list PUT  ======== not work, working on it
//* ****************************************************************************DELETE LIST************************************************************************* */
//* ***************************************************************************************************************************************************** */
//#1 list DELETE data ======== work good  ========   ========    ========   ========   ========   ========   ======== List DELETE data GOOD ======== GOOD DEL
app.events.click("deleteList", async (e) => {

    let src = e.target;

    // get delete button's idx, by dataset
    let idx_js_num = src.dataset.idxhtml;  
                      
    // using async DELETE(url, data, returnType), delete from app.js
    let listData = await app.DELETE(`api/test.php?idx=${idx_js_num}`);

    if(listData.status == "ok"){
        alert("Deleted Successfully !");
    }

    //refresh the page
    refreshPage();
});
   
// ** Teacher's code **
//     let src = e.target;
//     let idx = src.dataset.idx; // This is where we get the index!
//     let request = await app.DELETE(`api/list.php?idx=${idx}`);
//     if(request.status == "ok"){
//         alert("Deleted!");
//     }
// });
//* ****************************************************************************************/
// DELETE item
app.events.click("deleteOneItem", async (e) => {

    let src = e.target;

    // get delete button's idx, by dataset
    let idx_item_num_js = src.dataset.deleteOneItemIdx;     
   
    // using async DELETE(url, data, returnType), delete from app.js
    let oneItem = await app.DELETE(`api/items.php?delete_one_Item_idx_url=${idx_item_num_js}`);

    console.log(oneItem);
    if(oneItem.status == "ok"){
        alert(" Successfully cancel one item !");
    }

    //refresh the page
    //refreshPage();
});


// Helper function to refresh the page
// And get information from DB again by calling the GET function again 
// refresh/render the page again 
function refreshPage(){
    (async () => {

        // JS object get back from PHP code 
        let dataFromDb = await app.GET("api/test.php");
    
        let comp = app.component({
            name: "GetDataFromDB",  //DB return something  [ {"name":"bob", "created" : "2022-02-02"} , {"name":"bob", "created" : "2022-02-02"}]
            selector: "#get_data",
            template: "#getDataTemplate", 
            data: dataFromDb
        });
        comp.render();
    })();
}


//#1
// Using GET method, get all lists to display on cnosole
(async () => {

    //get data from DB, turn in javascript object
    let data = await app.GET("api/test.php");

    console.log(data);
})();
//* *************************************************************************GET LIST**************************************************************************** */
//* ***************************************************************************************************************************************************** */
//#2 
// list GET data ======== work good  ========   ========    ========   ========   ========   ========   ======== List GET data GOOD ======== GOOD GET
// Click a button with id = "getData"  
// and use GET method, compnents class and render()
// to get all lists to display on webpage
app.events.click("getData", async () => {

    // JS object get back from PHP code 
    let dataFromDb = await app.GET("api/test.php");

    let comp = app.component({
        name: "GetDataFromDB",  //DB return something  [ {"name":"bob", "created" : "2022-02-02"} , {"name":"bob", "created" : "2022-02-02"}]
        selector: "#get_data",
        template: "#getDataTemplate", 
        data: dataFromDb
    });

    comp.render();
});

    // // ==================   #3 POST/CREATE A STUDENT  ================== GOOD 
    // actions.postName = async () => {
    //     //alert("Post a name ");
    //     // 1.  Get form data as JavaScript object
    //     const formData =  getFormData("postNameForm");  // FORMDATA IS AN JSON "OBJECT"
    //     // 2. Get Student NAME from form data
    //     //const NAME = formData.name;
    //     // 3. Create HTTP GET request via fetch() to 'api/student?id={CWID}'—use await!
    //     const oneStudentData = await getJsonResult("api/student", "POST", formData) ;
    //     // 4. Do something with result (maybe use postResult();)
    //     console.log(oneStudentData); 
    //     postResult(oneStudentData);
    // };


//* ***************************************************************************************************/
//************** downlaodList Button Not Work ! **************  downlaodList not work  ***** GET ITEMS
//************** downlaodList Button Not Work ! **************  downlaodList not work  ***** GET ITEMS
// Download list from the list button 
// click the buttons with id = "downlaodList"
// items in the list will be poped up 
app.events.click("downlaodList", async (e) => {

    let src = e.target;
    let idx = src.dataset.idx ?? 0 ;

    if (idx < 1 ) return false;

    //let items = await app.GET(`api/items?list_idx=${idx}`);
    // this function can work is because of test.php file 

    //let items = await app.GET(`api/test.php?idx=${idx}`);   // list_idx is the attribute in the items table 
    let items = await app.GET(`api/items.php?anyListIdxNameHereInUrlForListButton=${idx}`); 

    console.log(items);


    let list = document.querySelector(`#list_${idx}`);

    list.classList.remove("hidden");

    // let result = await app.GET(`api/items.php?list_idx=${idx}`);  //itemDatafromDB
    // if (result.status != "ok"){
    //     alert("NOOOOO");
    // }
    // let items = result.items;
    //let items = await app.GET(`api/items?list_idx=${idx}`);  //itemDatafromDB
                            // (`api/student?id=${CWID}`, "GET", " ") ; 
    //list.classList.remove("hidden");  // not yet defined **

    items.forEach((item, index)=> {
        // for each items we fetch back from the DB, we using <li> to display it agian and again 
        // display text and adding delete button to each text 
        let listItemTemplate = `
        <li>
            <input type="checkbox" name="checked">  
            ${item.text}
            <button type='button'  data-click='deleteOneItem'  data-deleteOneItemIdx = '${item.idx}'>  Delete Item#${index +1}  </button>
        </li> `;

        // Appending each item to the button with id = "toggleList",
        // "beforeend" to display the <li>
        const myDiv = document.getElementById ("toggleList");
        myDiv.insertAdjacentHTML ("beforeend",  listItemTemplate );

    } );
    // what this for ?  to clean GET error ? 
    // what this attributes for ? 

    let form= `<form id="postItemForm">
               <input type="text" placeholder="Item Name" name="name" maxlength="512">  
               <button type="submit" data-click='postOneItem'  > Submit </button> 
              </form>`;

    const myDiv = document.getElementById ("toggleList");
    myDiv.insertAdjacentHTML ("beforeend",  form );

    src.dataset.click = "toggleList"; 
});

// {/* <ol>
// <!-- many objects in an array  -->
// {{#.}}
//     <li>
//         <!-- {{name}}, {{created}}, {{idx}} -->
//         <button type="button" data-click="downlaodList" data-idx="{{idx}}" id="toggleList">{{name}}</button>
//         <button type="button" data-click="deleteList" data-idxHtml="{{idx}}" id="deleteButton"> DELETE </button>
//         {{idx}}
//         <!-- what is the purpose for this ul ? Just for create another varaible which name is   list_idx  ?   -->
//         <ul id="list_{{idx}}" class="hidden"> </ul>
//     </li>
// {{/.}}
// </ol>  */}


//* *************************************************************************POST LIST**************************************************************************** */
//* ***************************************************************************************************************************************************** */
// list POST data ======== work good  ========   ========    ========   ========   ========   ========   ======== List POST data GOOD ======== GOOD POST
// list post ======== work good 
app.events.click("postList", async () => {

    // get form id , and return js object 
    let listFormData = getFormData("postListForm");
   
    // using  POST(url, data, returnType) from app.js
    // POST method can send listFrom js object to database
    const listData = await app.POST("api/test.php", listFormData);
    console.log(listData); 
    alert("You Add a New Lisk, After Close the Window. Please Refresh the Page and Click the `** Get List Info from DB **` Button to See Latest Lists ! ");
});

//************* Wrapping Data from Form into an JSON Object ***************
// Give this the "id" value of any HTML form and it will return
// a native JavaScript object with all the form inputs. 
function getFormData(formId) {
    const form = document.querySelector(`#${formId}`);

    const formData = new FormData(form);

    const entries = Object.fromEntries(formData.entries());

    return entries;
}

//* ********************************************************************************* */
// Item POST ======== working
app.events.click("postOneItem", async () => {

    // get form id , and return js object 
    let itemFormData = getFormData("postItemForm");
    console.log(itemFormData);
   
    // using  POST(url, data, returnType) from app.js
    // POST method can send listFrom js object to database
    const itemData = await app.POST("api/items.php", itemFormData);
    console.log(itemData); 
});

//Tring to add _____________________________________________________________________________________________________
//Modal Windown Associated Code _____________________________________________________________________________________       GOOD   MODEL WINDOW
//**************************************************************************************************************** */
//Add list modal window
app.events.click("addList", async (e) => {

    // JS object get back from PHP code 
    let src = e.target;

    let formId = "AddListForm";

    let comp = app.component({
        name: "AddListComponet",  
        selector: "body",
        template: "#AddListInterface", 
        data: {}
    });

    document.addEventListener(formId, (e)=> {
        let entries = e.detail; 
    }), ({once: true});

    comp.render();
});

// close modal window button 
const closeModal = () => {
    document.querySelector(".modal").remove();
    // Get the modal
    // const modal = document.querySelector(".modal");
    // modal.style.display = "none";

};

app.events.click ("closeModal", ()=>{
    //  alert("!");
    closeModal();

});

// submit button 
app.events.click("submit", async (e) => {
    
    e.preventDefault();

    let formId = e.target.idx ?? "noid" ;  // e.target is the from itself

    let formData = new FormData(e.target); // turn from data to nice JS object 

    let entries = Object.fromEntries(formData.entries());

    let submitted = new CustomEvent(formId, {detail: entries}); // detail is optional , we have lisener of this form 

    document.dispatchEvent(submitted);
});

//Tring to add _____________________________________________________________________________________________________
//Modal Windown Associated Code _____________________________________________________________________________________