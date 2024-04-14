// import { useRef } from "react";
// import { FilterValuesType } from "./App";
// import { Button } from "./Button";

// export type TaskType = {
//   id: string;
//   title: string;
//   isDone: boolean;
// };

// type TasksPropsType = {
//   title: string;
//   tasks: TaskType[];
//   addTask: (title: string) => void;
//   removeTask: (taskId: string) => void;
//   changeTodoListFilter: (filter: FilterValuesType) => void;
// };

// export const Todolist = ({
//   title,
//   tasks,
//   removeTask,
//   changeTodoListFilter,
//   addTask,
// }: TasksPropsType) => {
//   const taskTitleINput = useRef<HTMLInputElement>(null);

//   let tasksList;
//   if (tasks.length === 0) {
//     tasksList = <span>Список пуст</span>;
//   } else {
//     tasksList = (
//       <ul>
//         {tasks.map((task: TaskType) => {
//           return (
//             <li key={task.id}>
//               <input type="checkbox" checked={task.isDone} />
//               <span>{task.title}</span>
//               <Button title="x" onClickHandler={() => removeTask(task.id)} />
//             </li>
//           );
//         })}
//       </ul>
//     );
//   }

//   const addNewTask = () => {
//     if (taskTitleINput.current) {
//       addTask(taskTitleINput.current.value);
//       taskTitleINput.current.value = "";
//     }
//   };
//   return (
//     <div className="todolist">
//       <h3>{title}</h3>
//       <div>
//         <input ref={taskTitleINput} />
//         <Button title={"+"} onClickHandler={addNewTask} />
//       </div>
//       {tasksList}
//       <div>
//         <Button
//           title={"All"}
//           onClickHandler={() => changeTodoListFilter("all")}
//         />
//         <Button
//           title={"Active"}
//           onClickHandler={() => changeTodoListFilter("active")}
//         />
//         <Button
//           title={"Completed"}
//           onClickHandler={() => changeTodoListFilter("completed")}
//         />
//       </div>
//     </div>
//   );
// };
