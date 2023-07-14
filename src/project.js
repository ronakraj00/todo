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

export {projects}