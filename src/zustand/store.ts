import { create } from "zustand";

export interface ITask {
  title: string;
  state: string;
}

export interface IStore {
  tasks: ITask[];
  draggedTask: string | null;
  addTask: (title: string, state: string) => void;
  deleteTask: (title: string) => void;
  setDraggedTask: (title: string | null) => void;
  moveTask: (title: string | null, state: string) => void;
}

const store = (set: any): IStore => ({
  tasks: [],

  draggedTask: null,

  addTask: (title, state) =>
    set((store: IStore) => ({ tasks: [...store.tasks, { title, state }] })),

  deleteTask: (title) =>
    set((store: IStore) => ({
      tasks: store.tasks.filter((task) => task.title !== title),
    })),

  setDraggedTask: (title) => set({ draggedTask: title }),

  moveTask: (title, state) =>
    set((store: IStore) => ({
      tasks: store.tasks.map((task: ITask) =>
        task.title === title ? { title, state } : title
      ),
    })),
});

export const useStore = create(store);
