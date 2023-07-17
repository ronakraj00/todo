/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/domStuff.js":
/*!*************************!*\
  !*** ./src/domStuff.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   dom: () => (/* binding */ dom)
/* harmony export */ });
/* harmony import */ var _project__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./project */ "./src/project.js");
/* harmony import */ var _todo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./todo */ "./src/todo.js");


const dom=(()=>{

    //project creation and its functioning
    const body=document.querySelector("body");
    const projectDomList=document.querySelector("[data-project-list]");
    const ProjectFormInput=document.querySelector("[data-project-input]");
    const projectSubmitButton=document.querySelector("[data-project-submit]");
    const projectShow=document.querySelector("#project-show")
    const sidebar=document.querySelector("#sidebar");
    const themeAll=document.querySelectorAll("#theme div");
    const menu=document.querySelector("#menu");
    const listForm=document.querySelector("[data-list-form]");
    
    //retrieve last theme
    const receivedTheme=localStorage.getItem("UserTheme");
    if(receivedTheme){
        body.setAttribute("style",`background:url(./${receivedTheme});background-attachment: fixed;backdrop-filter:blur(10px)`)
        listForm.setAttribute("style",`background:url(./${receivedTheme});background-attachment: fixed;backdrop-filter:blur(10px)`)

    }
       

    //retrieve any projects saved earlier
    const receivedProject=JSON.parse(localStorage.getItem("UserProjects"));
    if(receivedProject){
        receivedProject.forEach(project=>_project__WEBPACK_IMPORTED_MODULE_0__.projects.projectList.push(project));
        renderProject();
        renderProjectList(_project__WEBPACK_IMPORTED_MODULE_0__.projects.projectList[0]);
    }
    


    themeAll.forEach(theme=>{
        theme.addEventListener("click",(e)=>{
            if(e.target.id=="theme1"){
                body.setAttribute("style","background:url(./theme1.webp);background-attachment: fixed")
                listForm.setAttribute("style","background:url(./theme1.webp);background-attachment: fixed")
                saveTheme("theme1.webp");
            }
            if(e.target.id=="theme2"){
                body.setAttribute("style","background:url(./theme2.jpg);background-attachment: fixed")
                listForm.setAttribute("style","background:url(./theme2.jpg);background-attachment: fixed")
                saveTheme("theme2.jpg");
            }
            if(e.target.id=="theme3"){
                body.setAttribute("style","background:url(./theme3.avif);background-attachment: fixed;backdrop-filter:blur(10px)")
                listForm.setAttribute("style","background:url(./theme3.avif);background-attachment: fixed;backdrop-filter:blur(10px)")
                saveTheme("theme3.avif");
            }
        })
    })

    // function setTheme(theme){
    //     body.setAttribute("style",`background:url(./${theme}.webp);background-attachment: fixed`)
    //     listForm.setAttribute("style",`background:url(./${theme}.webp);background-attachment: fixed`)
    // }

    function saveTheme(theme){
        localStorage.setItem("UserTheme",theme);
    }

    let menuClick=0;

    sidebar.classList.add("menu-invisible")

    menu.addEventListener("click",()=>{
        // sidebar.classList.add("animate-sidebar");
        sidebar.classList.toggle("menu-invisible");
        const root=document.querySelector(':root');
        menuClick++;
        if(menuClick%2!=0){
            root.style.setProperty("--blur-body","0px");
        }
        else{
            root.style.setProperty("--blur-body","10px");
        }
    })


    projectSubmitButton.addEventListener("click",(e)=>{
        if(ProjectFormInput.value==""){
            return;
        }
        e.stopPropagation();
        _project__WEBPACK_IMPORTED_MODULE_0__.projects.createProject(ProjectFormInput.value);
        renderProject();
        ProjectFormInput.value="";
    
    })
    
    function renderProject(){
        projectDomList.innerText="";
        _project__WEBPACK_IMPORTED_MODULE_0__.projects.projectList.forEach(list => {
            const newList=document.createElement("li");
            newList.textContent=list.name;
            newList.id=list.id;
            projectDomList.append(newList);
        });

        //local storage
        localStorage.setItem("UserProjects",JSON.stringify(_project__WEBPACK_IMPORTED_MODULE_0__.projects.projectList));
        //add click listener to all projects;
        projectListenClick();
    }

    function projectListenClick(){
        const projectAllLists=document.querySelectorAll("[data-project-list] li")
        projectAllLists.forEach(list=>{
            list.addEventListener("click",(e)=>{
                projectAllLists.forEach(elem=>{
                    elem.classList.remove("active-project");
                })
                list.classList.add("active-project");
                e.stopPropagation();
                const Project=_project__WEBPACK_IMPORTED_MODULE_0__.projects.projectList.find(item=>item.id==list.id);
                renderProjectList(Project);
                sidebar.classList.toggle("menu-invisible");
                
            })
        })
    }

    function renderProjectList(Project){

        projectShow.textContent="";

        if(!Project){
            return;
        }

        const projectNameShow=document.createElement("h2");
        const delProject=document.createElement("label");

        delProject.classList.add("delete-project");
        delProject.textContent="DEL Project";
        projectNameShow.textContent=Project.name;
        projectNameShow.append(delProject);
        projectShow.append(projectNameShow,delProject);

        delProject.addEventListener("click",(e)=>{
            _project__WEBPACK_IMPORTED_MODULE_0__.projects.projectList.splice(_project__WEBPACK_IMPORTED_MODULE_0__.projects.projectList.indexOf(Project),1)
            localStorage.setItem("UserProjects",JSON.stringify(_project__WEBPACK_IMPORTED_MODULE_0__.projects.projectList));
            renderProject();
            renderProjectList(_project__WEBPACK_IMPORTED_MODULE_0__.projects.projectList[0]);
            e.stopPropagation();
        })

        renderListAddButton(Project);

        Project.list.forEach(todo=>{
            makeListDiv(todo.title,todo.description,todo.dueDate,todo.priority,todo.id);
        })
        
    }

    //handle checked action of list
    
    function removeToDo(listCheck){
        _project__WEBPACK_IMPORTED_MODULE_0__.projects.projectList.forEach(project=>{
            const foundToDo=project.list.find(todo=>todo.id==listCheck.id);
            project.list.splice(project.list.indexOf(foundToDo),1);
            localStorage.setItem("UserProjects",JSON.stringify(_project__WEBPACK_IMPORTED_MODULE_0__.projects.projectList));
            renderProjectList(project);
        })
    }

    function makeListDiv(title,description,dueDate,priority,id){
        const listDiv=document.createElement("div");
        const listDivTitle=document.createElement("h3");
        const listDivDueDate=document.createElement("p");
        const listDivEdit=document.createElement("button");
        const listCheck=document.createElement("input");
        const deleteIcon=document.createElement("div");


        listCheck.addEventListener("click",()=>{
                listDivTitle.classList.toggle("strike-through");
        })


        deleteIcon.addEventListener("click",()=>{
            listDiv.classList.add("animate-delete");
            setTimeout(() => {
                removeToDo(listCheck);
            }, 400);
        })

        listDiv.classList.add(`priority-${priority}`);


        listCheck.setAttribute("type","checkbox");
        listCheck.id=id;


        deleteIcon.setAttribute("class","pointer");
        deleteIcon.textContent="DEL";
        listDivTitle.textContent=title;
        listDivDueDate.textContent=dueDate;
        listDivEdit.textContent="Edit";
        listDiv.classList.add("style-todo");

        listDiv.append(listCheck,listDivTitle,listDivDueDate,listDivEdit,deleteIcon)
        projectShow.append(listDiv);
        
    }

    function renderListAddButton(Project){
        const listAddButtonDiv=document.createElement("div");
        // listAddButtonDiv.setAttribute("id","list-add-button-div");
        const listAddButton=document.createElement("button");
        listAddButton.textContent="+";
        listAddButton.addEventListener("click",(e)=>{
            e.stopPropagation();
            renderListForm(Project);
        })
        listAddButtonDiv.id="list-button-div"
        listAddButtonDiv.append(listAddButton);
        projectShow.append(listAddButtonDiv);
    }

    function renderListForm(Project){
        const listForm=document.querySelector("[data-list-form]")
        listForm.classList.remove("invisible");
        const listFormSubmit=document.querySelector("[data-list-form] form button")
        const priorityType=document.querySelector("[data-priority-type");
        const listTitle=document.querySelector("[data-list-title]");
        const listDescription=document.querySelector("[data-list-description]");
        const listDueDate=document.querySelector("[data-list-due-date]");
        const listPriority=document.querySelector("[data-list-priority]");
       
        setInterval(()=>{
            if(listPriority.value==1){
                priorityType.textContent="(Low)";
            }
            if(listPriority.value==2){
                priorityType.textContent="(Mid)";
            }
            if(listPriority.value==3){
                priorityType.textContent="(High)";
            }
            
        },1)
        listFormSubmit.addEventListener("click",(e)=>{
            listForm.classList.add("invisible");

            if(listTitle.value==""){
                return;
            }

            _todo__WEBPACK_IMPORTED_MODULE_1__.todo.createToDo(Project,listTitle.value,listDescription.value,listDueDate.value,listPriority.value);
            localStorage.setItem("UserProjects",JSON.stringify(_project__WEBPACK_IMPORTED_MODULE_0__.projects.projectList));
            renderProjectList(Project);
            e.stopPropagation();
        }, { once: true });
    }

    return {
        renderProject
    }
})();




/***/ }),

/***/ "./src/project.js":
/*!************************!*\
  !*** ./src/project.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   projects: () => (/* binding */ projects)
/* harmony export */ });
const projects=(()=>{
    let projectList=[];

    class project{
        constructor(name){
            this.name=name;
        }
        id=Date.now();
        list=[];
    }

    function addList(Project,item){
        Project.list.push(item);
        console.log("list has been appended in ",Project);
    }

    function createProject(name){
        const newProject=new project(name);
        projectList.push(newProject);
        return newProject;
    }
    

    

    return {projectList,createProject,addList};
})();



/***/ }),

/***/ "./src/todo.js":
/*!*********************!*\
  !*** ./src/todo.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   todo: () => (/* binding */ todo)
/* harmony export */ });
/* harmony import */ var _project__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./project */ "./src/project.js");

const todo=(()=>{

    class Todo{
        constructor(title,description,dueDate,priority){
            this.title=title;
            this.description=description;
            this.dueDate=dueDate;
            this.priority=priority;

        }
        strike=false;
        id=Date.now();
    }

    function createToDo(project,title,description,dueDate,priority){
        const newToDo=new Todo(title,description,dueDate,priority);
        const foundProject=_project__WEBPACK_IMPORTED_MODULE_0__.projects.projectList.find(list=>project.id==list.id);
        console.log("in todo found project",foundProject);
        foundProject.list.push(newToDo);
        console.log(foundProject.list);
    }


    return{createToDo};
})();



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _domStuff__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./domStuff */ "./src/domStuff.js");


// dom.renderProject();
})();

/******/ })()
;
//# sourceMappingURL=main.js.map