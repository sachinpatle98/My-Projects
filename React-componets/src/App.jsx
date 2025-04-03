import React from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import AuthenticationApp from "./components/Authentication/AuthApp";
import ModalComponent from "./components/Modal/ModalApp";
import PaginationComponent from "./components/Pagination/Post";
import ToastComponent from "./components/Toast/Toast";
import Translation from "./components/Translation/app";
import TraficLight from "./components/TraficLight/TraficLight";
import TaskApp from "./components/Task-Manager/TaskApp";
import Google from "./components/GooglePage/Google";
import NoteApp from "./components/NoteApp/NoteApp";
import BlogApp from "./components/BlogApp/BlogApp";

const projects = [
  { id: 1, name: "Authentication App", path: "/project/1/auth" },
  { id: 2, name: "Modal Component", path: "/project/2" },
  { id: 3, name: "Pagination Component", path: "/project/3" },
  { id: 4, name: "Toast Component", path: "/project/4" },
  { id: 5, name: "Translation", path: "/project/5" },
  { id: 6, name: "TraficLight", path: "/project/6" },
  { id: 7, name: "Task Manager", path: "/project/7" },
  { id: 8, name: "Google Page", path: "/project/8" },
  { id: 9, name: "Notes App", path: "/project/9" },
  { id: 10, name: "Blog App", path: "/project/10" },
];

const App = () => {
  const location = useLocation();
  const isProjectPage = location.pathname.startsWith("/project/");

  return (
    <div>
      {!isProjectPage && (
        <>
          <h2>Project List</h2>
          <ul>
            {projects.map((project) => (
              <li key={project.id}>
                <Link to={project.path}>{project.name}</Link>
              </li>
            ))}
          </ul>
        </>
      )}

      <Routes>
        <Route path="/project/1/auth/*" element={<AuthenticationApp />} />
        <Route path="/project/2" element={<ModalComponent />} />
        <Route path="/project/3" element={<PaginationComponent />} />
        <Route path="/project/4" element={<ToastComponent />} />
        <Route path="/project/5" element={<Translation />} />
        <Route path="/project/6" element={<TraficLight />} />
        <Route path="/project/7" element={<TaskApp />} />
        <Route path="/project/8" element={<Google />} />
        <Route path="/project/9/*" element={<NoteApp />} />
        <Route path="/project/10/*" element={<BlogApp />} />
      </Routes>
    </div>
  );
};

export default App;
