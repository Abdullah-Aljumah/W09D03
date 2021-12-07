import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import "./style.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { get_tasks } from "../../reducers/tasks";
import { delete_tasks } from "../../reducers/tasks";
import { update_tasks } from "../../reducers/tasks";
import { new_tasks } from "../../reducers/tasks";
// import { get_tasks_admin } from "../../reducers/tasks";

const Tasks = () => {
  const state = useSelector((state) => {
    return state;
  });
  const dispatch = useDispatch();

  const [id, setId] = useState("");
  const [role, setRole] = useState("");
  const [edit, setEdit] = useState("");
  const [btn1, setBtn1] = useState(true);
  const [showHide, setShowHide] = useState(false);

  // Use effects
  // Get id from local storage
  useEffect(() => {
    setId(localStorage.getItem("user"));
    setRole(localStorage.getItem("role"));
  }, []);

  // Invoke function get tasks from backend
  useEffect(() => {
    getTasks();
    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    getTasksAdmin();
    // eslint-disable-next-line
  }, [role]);

  // Get user tasks
  const getTasks = async () => {
    if (role === "61aca7fbcab490bd2fadfd62") {
      console.log("HERE GET TASKS");
      let res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/todoss/${id}`,
        {
          headers: { Authorization: `Bearer ${state.signIn.token}` },
        }
      );

      const data = {
        tasks: res.data,
      };
      dispatch(get_tasks({ data }));
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    // eslint-disable-next-line
    let deleteTask = await axios.delete(
      `${process.env.REACT_APP_BASE_URL}/deleteTask/${id}`,
      {
        headers: { Authorization: `Bearer ${state.signIn.token}` },
      }
    );

    // Re render
    getTasks();
    getTasksAdmin();

    const data = {
      del: "",
    };

    dispatch(delete_tasks({ data }));
  };

  // Get all tasks for admin
  const getTasksAdmin = async () => {
    // eslint-disable-next-line
    if (role === "61a5f3cf99ca3c5064ba5c6b") {
      let res = await axios.get(`${process.env.REACT_APP_BASE_URL}/tasks`, {
        headers: { Authorization: `Bearer ${state.signIn.token}` },
      });

      const data = {
        tasks: res.data.map((item) => {
          return item;
        }),
      };
      dispatch(get_tasks({ data }));
    }
  };

  const newTask = async (e) => {
    e.preventDefault();
    // console.log(e.target[0].value);
    console.log(state, "state.signIn.user._id");
    // eslint-disable-next-line
    let res = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/newTask/${id}`,
      { task: e.target[0].value },
      {
        headers: { Authorization: `Bearer ${state.signIn.token}` },
      }
    );

    const data = {
      newTask: e.target[0].value,
    };

    dispatch(new_tasks({ data }));

    e.target[0].value = "";
    if (role === "61aca7fbcab490bd2fadfd62") {
      getTasks();
    } else if (role === "61a5f3cf99ca3c5064ba5c6b") {
      getTasksAdmin();
    }
  };

  const updateTask = async (e, idTask) => {
    e.preventDefault();
    // eslint-disable-next-line
    let newTask = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/upadteVal/${idTask}`,
      { task: edit },
      {
        headers: { Authorization: `Bearer ${state.signIn.token}` },
      }
    );
    const data = {
      updatedTask: edit,
    };
    dispatch(update_tasks({ data }));

    setShowHide(!showHide);
    setBtn1(true);
    setEdit();
    getTasks();
    getTasksAdmin();
  };

  const hide = () => {
    setShowHide(!showHide);
    setBtn1(false);
  };
  const logout = () => {
    localStorage.clear();
  };
  return (
    <div className="container">
      <form onSubmit={(e) => newTask(e)}>
        <input
          type="text"
          name="task"
          placeholder="New task"
          className="inpt"
        />
        <input
          type="submit"
          id="newTask"
          value="NEW TASK"
          className="btn btn-success inpt2"
        />
      </form>
      {state.task.tasks && (
        <div className="cont">
          {state.task.tasks.map((item) => {
            return (
              <div key={item._id} className="task">
                {" "}
                <h1>{item.task}</h1>
                <button
                  className="btn btn-danger inpt2"
                  onClick={() => deleteTask(item._id)}
                >
                  Delete
                </button>
                <form onSubmit={(e) => updateTask(e, item._id)}>
                  <div>
                    {btn1 ? (
                      <input
                        type="button"
                        value="Edit Task"
                        className="btn btn-info inpt2"
                        onClick={hide}
                      ></input>
                    ) : (
                      <p></p>
                    )}
                  </div>
                  <div>
                    {showHide ? (
                      <div>
                        <input
                          type="submit"
                          value="Submit"
                          className="btn btn-success inpt2"
                          id="idSub"
                          onClick={(e) => updateTask(e, item._id)}
                        />
                        <input
                          type="text"
                          onChange={(e) => setEdit(e.target.value)}
                          placeholder=" New Task"
                          className="inpt"
                        />
                      </div>
                    ) : (
                      <p></p>
                    )}
                  </div>
                </form>
              </div>
            );
          })}{" "}
        </div>
      )}
      <form>
        <button className="btn btn-dark" onClick={() => logout()}>
          Log out{" "}
        </button>
      </form>
    </div>
  );
};

export default Tasks;
