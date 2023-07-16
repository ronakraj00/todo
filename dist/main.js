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

    themeAll.forEach(theme=>{
        theme.addEventListener("click",(e)=>{
            if(e.target.id=="theme1"){
                body.setAttribute("style","background:url(../src/theme1.webp);background-attachment: fixed")
            }
            if(e.target.id=="theme2"){
                body.setAttribute("style","background:url(../src/theme4.jpg);background-attachment: fixed")
            }
            if(e.target.id=="theme3"){
                body.setAttribute("style","background:url(../src/theme3.avif);background-attachment: fixed")
            }
        })
    })

    menu.addEventListener("click",()=>{
        // sidebar.classList.toggle("animate-sidebar-invisible");
        sidebar.classList.add("animate-sidebar");
        sidebar.classList.toggle("menu-invisible");
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
        console.log("projects",_project__WEBPACK_IMPORTED_MODULE_0__.projects.projectList)
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
                console.log("found",Project);
                renderProjectList(Project);
                
            })
        })
    }

    function renderProjectList(Project){
        projectShow.textContent="";
        const projectNameShow=document.createElement("h2");
        projectNameShow.textContent=Project.name;
        projectShow.append(projectNameShow);
        console.log("received",Project);
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
            renderProjectList(project);
        })
    }

    function makeListDiv(title,description,dueDate,priority,id){
        const listDiv=document.createElement("div");
        const listDivTitle=document.createElement("h3");
        const listDivDescription=document.createElement("p");
        const listDivDueDate=document.createElement("p");
        const listDivPriority=document.createElement("h4");
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
            }, 920);
        })

        listDiv.classList.add(`priority-${priority}`);


        listCheck.setAttribute("type","checkbox");
        listCheck.id=id;


        deleteIcon.setAttribute("class","pointer");
        deleteIcon.textContent="DEL";
        listDivTitle.textContent=title;
        listDivDescription.textContent=description;
        listDivDueDate.textContent=dueDate;
        listDivPriority.textContent=priority;
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
            console.log("after create todo received",Project);
            console.log(Project.list);
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