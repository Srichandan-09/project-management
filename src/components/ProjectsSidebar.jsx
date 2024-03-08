import Button from "./Button.jsx";

export default function ProjectsSidebar({
  onStartAddProject,
  projects,
  onSelectProject,
  selectedProjectId,
}) {
  return (
    <aside className="w-1/3 px-8 py-16 rounded-r-xl bg-stone-900 text-stone-50 md:w-72 ">
      <h2 className="mb-8 font-bold uppercase text-stone-200 md:text-xl">
        Your Projects
      </h2>
      <div>
        <Button onClick={onStartAddProject}>+ Add Projects</Button>
      </div>
      <ul className="mt-8">
        {projects.map((project) => {
          let cssClasses = "w-full text-left px-2 py-1 rounded-sm my-1 hover:text-stone-200 hover:bg-stone-800";

          if(project.id === selectedProjectId) {
            cssClasses += " text-stone-200 bg-stone-800";
          } else {
            cssClasses += " text-stone-400";
          }
          return (
            <li key={project.id}>
              <button
                onClick={() => onSelectProject(project.id)}
                className={cssClasses}
              >
                {project.title}
              </button>
            </li>
          );
        } )}
      </ul>
    </aside>
  );
}

