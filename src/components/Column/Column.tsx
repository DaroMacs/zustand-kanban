import { shallow } from "zustand/shallow";
import { ITask, useStore } from "../../zustand/store";
import Task from "../Task/Task";
import "./Column.css";
import { useState } from "react";

interface IColumn {
  state: string;
}

const Column = ({ state }: IColumn) => {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);

  const tasks = useStore(
    (store) => store.tasks.filter((task: ITask) => task.state === state),
    shallow
  );

  const setDraggedTask = useStore((store) => store.setDraggedTask);
  const draggedTask = useStore((store) => store.draggedTask);

  const addTask = useStore((store) => store.addTask);
  const moveTask = useStore((store) => store.moveTask);

  const handleSubmit = () => {
    if (!text) {
      setOpen(false);
      return;
    }
    addTask(text, state);
    setText("");
    setOpen(false);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return (
    <div
      className="column"
      onDragOver={(e) => e.preventDefault()}
      onDrop={() => {
        moveTask(draggedTask, state);
        setDraggedTask(null);
      }}
    >
      <div className="titleWrapper">
        <p>{state}</p>
        <button onClick={() => setOpen(true)}>Add</button>
      </div>
      {tasks.map((task: ITask) => (
        <Task title={task.title} key={task.title} />
      ))}

      {open && (
        <div className="Modal">
          <div className="modalContent">
            <input
              type="text"
              onChange={(e) => handleOnChange(e)}
              value={text}
              placeholder="Input here"
            />
            <button onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Column;
