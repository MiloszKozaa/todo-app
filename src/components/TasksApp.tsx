import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import Task from './Task';
import TaskHeader from './TaskHeader';
import FirstView from './FirstView';
import CreateTask from './CreateTask';
import Progressbar from './Progressbar';
import './TasksApp.css';
import { useReducer, useState } from 'react';

export const ACTIONS = {
  ADD_TASK: 'add-task',
  TOGGLE_TASK: 'toggle-task',
  DELETE_TASK: 'delete-task',
};

const reducer = (tasks: any, actions: any) => {
  switch (actions.type) {
    case ACTIONS.ADD_TASK:
      return [...tasks, newTask(actions.payload.name)];
    case ACTIONS.TOGGLE_TASK:
      return tasks.map((task: any) => {
        if (task.id === actions.payload.id) {
          return { ...task, complete: !task.complete };
        }
        return { ...task };
      });
    case ACTIONS.DELETE_TASK:
      return tasks.filter((task: any) => task.id !== actions.payload.id);
  }
};

const newTask = (name: string, time?: string) => {
  return { id: Math.random(), name: name, time: time, complete: false };
};

const TasksApp = () => {
  const [tasks, dispatch] = useReducer(reducer, []);
  const [inputMode, inputModeSet] = useState(false);

  return (
    <div className='tasksApp'>
      <Header />
      <div className='taskApp_wrapper'>
        <TaskHeader
          tasksCounter={tasks.length}
          onClick={() => inputModeSet(!inputMode)}
          inputMode={inputMode}
        />
        <div className='taskApp_content'>
          {tasks.length === 0 && !inputMode && (
            <FirstView activeMode={tasks.length === 0 && !inputMode} />
          )}

          {inputMode && <CreateTask dispatch={dispatch} />}

          {tasks.length !== 0 && !inputMode && (
            <div className='tasks_wrapper'>
              <Progressbar tasks={tasks} />
              {tasks.map((task: any) => {
                return <Task key={task.id} task={task} dispatch={dispatch} />;
              })}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TasksApp;
