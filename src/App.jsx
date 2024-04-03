import { Routes, Route } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { Suspense } from "react";
import Loading from "./components/Loading";
import RequireAuth from "./components/RequireAuth";
import Todos from "./pages/Todos";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import PageNotFound from "./pages/PageNotFound";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import EditTask from "./pages/Todos/EditTask";
import Profile from "./pages/User";

const App = () => {
  return (
    <>
      <CssBaseline />
      <Navbar />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/profile"
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          />
          <Route
            path="/todos"
            element={
              <RequireAuth>
                <Todos />
              </RequireAuth>
            }
          />
          <Route
            path="/edit-task/:taskId"
            element={
              <RequireAuth>
                <EditTask />
              </RequireAuth>
            }
          />
          <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
