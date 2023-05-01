import classNames from "classnames";
import "./Task.css";
import { useStore } from "../../zustand/store";
import trash from "../../assets/trash-2.svg";

interface ITask {
  title: string;
}

const Task = ({ title }: ITask) => {
  const task = useStore((store) =>
    store.tasks.find((task: ITask) => task.title === title)
  );
  const setDraggedTask = useStore((store) => store.setDraggedTask);
  const deleteTask = useStore((store) => store.deleteTask);

  return (
    <div
      className="task"
      draggable
      onDragStart={() => setDraggedTask(task!.title)}
    >
      <div>{title}</div>
      <div className="bottomWrapper">
        <div>
          <img
            src={trash}
            alt="trash"
            onClick={() => deleteTask(task!.title)}
          />
        </div>
        <div className={classNames("status", task?.state)}>{task?.state}</div>
      </div>
    </div>
  );
};

export default Task;
