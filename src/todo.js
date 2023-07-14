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
        projects.addList(project,newToDo);
    }


    return{createToDo};
})();

export {todo};