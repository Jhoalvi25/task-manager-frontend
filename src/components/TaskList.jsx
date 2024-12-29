import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, deleteTask, toggleTaskStatus, setFilter } from '../redux/taskSlice';
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin2Line } from "react-icons/ri";
import EditTask from './EditTask';

const TaskList = () => {
  const dispatch = useDispatch();
  const { tasks, status, error, filter } = useSelector((state) => state.tasks);
  const [isEditing, setIsEditing] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  const handleToggleStatus = (id) => {
    dispatch(toggleTaskStatus(id));
  };

  const handleFilterChange = (filterValue) => {
    dispatch(setFilter(filterValue));
  };

  const handleEditClick = (task) => {
    setTaskToEdit(task);
    setIsEditing(true);
  };

  const handleCloseEditModal = () => {
    setIsEditing(false);
    setTaskToEdit(null);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') return true;
    return filter === 'completed' ? task.status : !task.status;
  });

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Task List</h2>
      <div className="mb-4">
        <button onClick={() => handleFilterChange('all')} className="bg-blue-500 text-white p-2 rounded">All</button>
        <button onClick={() => handleFilterChange('completed')} className="bg-green-500 text-white p-2 rounded ml-2">Completed</button>
        <button onClick={() => handleFilterChange('pending')} className="bg-yellow-500 text-white p-2 rounded ml-2">Pending</button>
      </div>
      {filteredTasks.length === 0 ? (
        <p>No tasks available</p>
      ) : (
        <ul>
          {filteredTasks.map((task) => (
            <li key={task._id} className="flex justify-between items-center bg-gray-100 p-3 my-2 rounded shadow-lg">
              <div className="flex-1">
                <h3 className="font-semibold">{task.title}</h3>
                <p className="text-sm">{task.description}</p>
                <p className="text-xs text-gray-500">{new Date(task.createdAt).toLocaleString()}</p>
              </div>
              <div>
                <button
                  onClick={() => handleToggleStatus(task._id)}
                  className={`p-2 rounded mr-2 ${task.status ? 'bg-green-500' : 'bg-red-500'}`}
                >
                  {task.status ? 'Completed' : 'Pending'}
                </button>
                <button
                  onClick={() => handleEditClick(task)}
                  className="bg-yellow-500 text-white p-2 rounded mr-2"
                >
                  
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(task._id)}
                  className="bg-red-500 text-white p-2 rounded"
                >
                  <RiDeleteBin2Line />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {isEditing && <EditTask task={taskToEdit} closeEditModal={handleCloseEditModal} />}
    </div>
  );
};

export default TaskList;

