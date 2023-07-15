import {projects} from "./project";
import { todo } from "./todo";
const dom=(()=>{


    //project creation and its functioning
    const projectDomList=document.querySelector("[data-project-list]");
    const ProjectFormInput=document.querySelector("[data-project-input]");
    const projectSubmitButton=document.querySelector("[data-project-submit]");
    const projectShow=document.querySelector("#project-show")

    projectSubmitButton.addEventListener("click",(e)=>{
        if(ProjectFormInput.value==""){
            return;
        }
        e.stopPropagation();
        projects.createProject(ProjectFormInput.value);
        renderProject();
        ProjectFormInput.value="";
    
    })
    
    function renderProject(){
        projectDomList.innerText="";
        projects.projectList.forEach(list => {
            const newList=document.createElement("li");
            newList.textContent=list.name;
            newList.id=list.id;
            projectDomList.append(newList);
        });
        console.log("projects",projects.projectList)
        //add click listener to all projects;
        projectListenClick();
    }

    function projectListenClick(){
        const projectAllLists=document.querySelectorAll("[data-project-list] li")
        projectAllLists.forEach(list=>{
            list.addEventListener("click",(e)=>{
                list.classList.toggle("active-project");
                e.stopPropagation();
                const Project=projects.projectList.find(item=>item.id==list.id);
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
            makeListDiv(todo.title,todo.description,todo.dueDate,todo.priority);
        })
        
    }

    

    function makeListDiv(title,description,dueDate,priority){
        const listDiv=document.createElement("div");
        const listDivTitle=document.createElement("h3");
        const listDivDescription=document.createElement("p");
        const listDivDueDate=document.createElement("p");
        const listDivPriority=document.createElement("h4");
        const listDivEdit=document.createElement("button");

        listDivTitle.textContent=title;
        listDivDescription.textContent=description;
        listDivDueDate.textContent=dueDate;
        listDivPriority.textContent=priority;
        listDivEdit.textContent="Edit";
        listDiv.classList.add("style-todo");

        listDiv.append(listDivTitle,listDivDescription,listDivDueDate,listDivPriority,listDivEdit)
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
        listFormSubmit.addEventListener("click",(e)=>{
            listForm.classList.add("invisible");
            const listTitle=document.querySelector("[data-list-title]");
            const listDescription=document.querySelector("[data-list-description]");
            const listDueDate=document.querySelector("[data-list-due-date]");
            const listPriority=document.querySelector("[data-list-priority]");
            
            todo.createToDo(Project,listTitle.value,listDescription.value,listDueDate.value,listPriority.value);
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

export {dom};
