import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

const defaultValues = {
  name: "",
  status: "",
};

const status = [{ name: "Active" }, { name: "Completed" }];
const Problem1 = () => {
  const [show, setShow] = useState("all");
  const [tableData, setTableData] = useState([]);

  const {
    control,

    handleSubmit,

    getValues,
  } = useForm({
    mode: "onChange",
    defaultValues,
  });

  const onSubmit = async () => {
    const data = getValues();
    console.log("getvalue", data);

    setTableData([...tableData, data]);
    setShow("all");
  };

  function filterTasks(task) {
    switch (show) {
      case "active":
        return task.status === "Active";
      case "completed":
        return task.status === "Completed";
      default:
        return true;
    }
  }

  function sortTasks(a, b) {
    if (a.status === "Active" && b.status !== "Active") {
      return -1;
    } else if (a.status !== "Active" && b.status === "Active") {
      return 1;
    } else if (a.status === "Completed" && b.status !== "Completed") {
      return 1;
    } else if (a.status !== "Completed" && b.status === "Completed") {
      return -1;
    } else {
      return 0;
    }
  }
  const filteredTasks = tableData.filter(filterTasks).sort(sortTasks);

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-1</h4>
        <div className="col-6 ">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="row gy-2 gx-3 align-items-center mb-4"
          >
            <div className="col-auto">
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className="form-control"
                    placeholder="Name"
                  />
                )}
              />
            </div>
            <div className="col-auto">
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className="form-control"
                    placeholder="Status"
                  />
                )}
              />
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="col-8">
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li className="nav-item">
              <button
                className={`nav-link ${show === "all" && "active"}`}
                type="button"
                onClick={() => setShow("all")}
              >
                All
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "active" && "active"}`}
                type="button"
                onClick={() => setShow("active")}
              >
                Active
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "completed" && "active"}`}
                type="button"
                onClick={() => setShow("completed")}
              >
                Completed
              </button>
            </li>
          </ul>
          <div className="tab-content"></div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map((e) => (
                <tr>
                  <td>{e.name}</td>
                  <td>{e.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Problem1;
