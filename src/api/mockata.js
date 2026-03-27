const TAGS = [
  { id: 1, name: "Design", color: "#DEEBCB" },
  { id: 2, name: "Analyses", color: "#CBDEEB" },
  { id: 3, name: "Programming", color: "#EBE8CB" },
  { id: 4, name: "Implementation", color: "#E8CBEB" },
  { id: 5, name: "Admin", color: "#CBEBD8" },
  { id: 6, name: "Review", color: "#EBD8CB" },
  { id: 7, name: "Testing", color: "#DEEBCB" },
];

const PROJECTS = [
  { id: 1, name: "Project Planner" },
  { id: 2, name: "My Bookshelf" }
];

const TASKS = [
  {
    id: 1,
    name: "Make Mockup Homescreen",
    project: { id: 2, name: "My Bookshelf" }, 
    estimatedTime: 30,
    tags: [
      { id: 1, name: "Design", color: "#DEEBCB" },
      { id: 2, name: "Analyses", color: "#CBDEEB" },
    ],
    status: "completed",
    date: new Date(),
    timeSpent: 60,
  },
  {
    id: 2,
    name: "Implement Feature x",
    project: { id: 1, name: "Project Planner" },
    estimatedTime: 60,
    tags: [
      { id: 3, name: "Programming", color: "#EBE8CB" },
      { id: 4, name: "Implementation", color: "#E8CBEB" },
    ],
    status: "planned",
    date: new Date(),
    timeSpent: 0,
  },
  {
    id: 3,
    name: "Make mockup feature x",
    project: { id: 1, name: "Project Planner" },
    estimatedTime: 30,
    tags: [
      { id: 1, name: "Design", color: "#DEEBCB" },
      { id: 2, name: "Analyses", color: "#CBDEEB" },
    ],
    status: "planned",
    date: new Date(),
    timeSpent: 0,
  },
  {
    id: 4,
    name: "Document feature x",
    project: { id: 1, name: "Project Planner" },
    estimatedTime: 20,
    tags: [
      { id: 5, name: "Admin", color: "#CBEBD8" },
    ],
    status: "planned",
    date: new Date(),
    timeSpent: 0,
  },
  {
    id: 5,
    name: "Review feature x",
    project: { id: 1, name: "Project Planner" },
    estimatedTime: 60,
    tags: [
      { id: 7, name: "Testing", color: "#DEEBCB" },
      { id: 6, name: "Review", color: "#EBD8CB" },
    ],
    status: "planned",
    date: new Date("2026-03-15"),
    timeSpent: 0,
  },
];

export { PROJECTS, TAGS, TASKS };

