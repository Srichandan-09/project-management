import { useState } from "react";

import ProjectsSidebar from "./components/ProjectsSidebar.jsx";
import NoProjectSelected from "./components/NoProjectSelected.jsx";
import NewProject from "./components/NewProject.jsx";
import SelectedProject from "./components/SelectedProject.jsx";

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
  });

  function handleStartAddProject() {
    setProjectsState((prevProjectsState) => {
      return {
        ...prevProjectsState,
        selectedProjectId: null,
      };
    });
  }

  function handleFinishAddProject(projectData) {
    setProjectsState((prevProjectsState) => {
      const projectId = Math.random();
      const newProject = {
        ...projectData,
        id: projectId,
      };

      return {
        ...prevProjectsState,
        projects: [...prevProjectsState.projects, newProject],
        selectedProjectId: undefined,
      };
    });
  }

  function handleCancelAddProject() {
    setProjectsState((prevProjectsState) => {
      return {
        ...prevProjectsState,
        selectedProjectId: undefined,
      };
    });
  }

  function handleSelectProject(id) {
    setProjectsState((prevProjectsState) => {
      return {
        ...prevProjectsState,
        selectedProjectId: id,
      };
    });
  }

  function handleDeleteProject() {
    setProjectsState((prevProjectsState) => {
      return {
        ...prevProjectsState,
        projects: prevProjectsState.projects.filter(
          (project) => project.id !== prevProjectsState.selectedProjectId
        ),
        selectedProjectId: undefined,
      };
    });
  }

  function handleAddTask(task) {
    setProjectsState((prevProjectsState) => {
      const taskId = Math.random();
      const newTask = {
        text: task,
        id: taskId,
        projectId: prevProjectsState.selectedProjectId
      };

      return {
        ...prevProjectsState,
        tasks: [...prevProjectsState.tasks, newTask],
      };
    });
  }

  function handleDeleteTask(id) {
    setProjectsState((prevProjectsState) => {
      return {
        ...prevProjectsState,
        tasks: prevProjectsState.tasks.filter(
          (task) => task.id !== id
        )
      };
    });
  }

  const displaySelectedProject = projectsState.projects.find(
    (project) => project.id === projectsState.selectedProjectId
  );

  const displayTasks = projectsState.tasks.filter(
    (task) => task.projectId === projectsState.selectedProjectId
  );

  let content = (
    <SelectedProject
      project={displaySelectedProject}
      onDelete={handleDeleteProject}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
      tasks={displayTasks}
    />
  );

  if (projectsState.selectedProjectId === null) {
    content = (
      <NewProject
        onSave={handleFinishAddProject}
        onCancel={handleCancelAddProject}
      />
    );
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar
        onStartAddProject={handleStartAddProject}
        projects={projectsState.projects}
        onSelectProject={handleSelectProject}
        selectedProjectId={projectsState.selectedProjectId}
      />
      {content}
    </main>
  );
}

export default App;
