import { projects } from "./project";
const todo=(()=>{

    class Todo{
        constructor(title,description,dueDate,priority){
            this.title=title;
            this.description=description;
            this.dueDate=dueDate;
            this.priority=priority;

        }
    }

    function createToDo(project,title,description,dueDate,priority){
        const newToDo=new Todo(title,description,dueDate,priority);
        const foundProject=projects.projectList.find(list=>project.id==list.id);
        console.log("in todo found project",foundProject);
        foundProject.list.push(newToDo);
        console.log(foundProject.list);
    }


    return{createToDo};
})();

export {todo};