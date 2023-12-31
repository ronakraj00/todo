import {projects} from "./project";
import { todo } from "./todo";
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
        receivedProject.forEach(project=>projects.projectList.push(project));
        renderProject();
        renderProjectList(projects.projectList[0]);
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
            // e.stopPropagation();
        })
    })


    function saveTheme(theme){
        localStorage.setItem("UserTheme",theme);
    }

    let menuClick=0;

    sidebar.classList.add("menu-invisible")

    menu.addEventListener("click",()=>{
        
        menu.classList.toggle("menu-active");

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
        // e.stopPropagation();
    })


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

        //local storage
        localStorage.setItem("UserProjects",JSON.stringify(projects.projectList));
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
                const Project=projects.projectList.find(item=>item.id==list.id);
                renderProjectList(Project);
                sidebar.classList.toggle("menu-invisible");
                menu.classList.toggle("menu-active")
                
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
            projects.projectList.splice(projects.projectList.indexOf(Project),1)
            localStorage.setItem("UserProjects",JSON.stringify(projects.projectList));
            renderProject();
            renderProjectList(projects.projectList[0]);
            // e.stopPropagation();
        })

        renderListAddButton(Project);

        Project.list.forEach(todo=>{
            makeListDiv(todo,todo.title,todo.dueDate,todo.priority,todo.id);
        })
        
    }

    
    function removeToDo(listCheck){
        projects.projectList.forEach(project=>{
            const foundToDo=project.list.find(todo=>todo.id==listCheck.id);
            if(foundToDo){
                project.list.splice(project.list.indexOf(foundToDo),1);
                localStorage.setItem("UserProjects",JSON.stringify(projects.projectList));
                renderProjectList(project);
            }
            
        })
    }

    function makeListDiv(todo,title,dueDate,priority,id){
        const listDiv=document.createElement("div");
        const listDivTitle=document.createElement("h3");
        const listDivDueDate=document.createElement("p");
        const listDivEdit=document.createElement("button");
        const listCheck=document.createElement("input");
        const deleteIcon=document.createElement("div");

        // let clickCount=0;

        listCheck.addEventListener("click",(e)=>{
            
            listDivTitle.classList.toggle("strike-through");

            if(todo.strike){
                todo.strike=false;
            }
            else{
                todo.strike=true;
            }
            // (clickCount++%2!=0)?todo.strike=true:todo.strike=false;
            
            localStorage.setItem("UserProjects",JSON.stringify(projects.projectList));
            
            // e.stopPropagation();
        })

        if(todo.strike){
            listDivTitle.classList.toggle("strike-through");
            listCheck.checked=true;
        }

        deleteIcon.addEventListener("click",()=>{
            listDiv.classList.add("animate-delete");
            setTimeout(() => {
                removeToDo(listCheck);
            }, 400);
            // e.stopPropagation();
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

            todo.createToDo(Project,listTitle.value,listDescription.value,listDueDate.value,listPriority.value);
            localStorage.setItem("UserProjects",JSON.stringify(projects.projectList));
            renderProjectList(Project);
            e.stopPropagation();
        }, { once: true });
    }

    return {
        renderProject
    }
})();

export {dom};
