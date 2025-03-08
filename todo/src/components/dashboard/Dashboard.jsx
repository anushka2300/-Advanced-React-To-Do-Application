import { useState, useEffect } from "react";
import { FaBars, FaRegStar, FaStar, FaClipboardList } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, addTask, deleteTask, toggleComplete, toggleImportant } from "../../reducers/actions";
import { PiBell, PiArrowClockwise, PiCalendar, PiStar, PiUser } from "react-icons/pi";
import { useTheme } from "../../themeContext";
import Navbar from "../navbar/navbar";

export default function TaskDashboard() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const completedTasks = tasks.filter((task) => task.status === "completed");
  const [newTask, setNewTask] = useState("");
  const [showSideMenu, setShowSideMenu] = useState(true);
  const [showRightSidebar, setShowRightSidebar] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [activeTab, setActiveTab] = useState("Today");
  const { theme } = useTheme();
  
  
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleAddTask = () => {
    if (newTask.trim() === "") return;
    dispatch(addTask({ title: newTask, status: "not completed" }));
    setNewTask("");
  };

  const handleComplete = (id, currentStatus) => {
    const newStatus = currentStatus === "completed" ? "not completed" : "completed";
    dispatch(toggleComplete(id, newStatus));
  };

  const handleImportant = (id) => {
    dispatch(toggleImportant(id));
  };

  const handleSidebarOpen = (task) => {
    setSelectedTask(task);
    setShowRightSidebar(true);
  };

  const handleDeleteTask = (id) => {
    dispatch(deleteTask(id));
    if (selectedTask && selectedTask._id === id) {
      setShowRightSidebar(false);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    dispatch(fetchTasks(tab.toLowerCase()));
  };


  const bgClass = theme === 'dark' ? 'bg-black' : 'bg-gray-100';
  const textClass = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const sidebarBgClass = theme === 'dark' ? 'bg-gray-900' : 'bg-gray-200';
  const cardBgClass = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
  const inputBgClass = theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50';
  const inputBorderClass = theme === 'dark' ? 'border-gray-600' : 'border-gray-300';
  const completedTaskBgClass = theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100';
  const completedTextClass = theme === 'dark' ? 'text-gray-500' : 'text-gray-400';
  const hoverBgClass = theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-300';

  return (
    <>
      <Navbar />

      <div className={`flex min-h-screen ${bgClass} ${textClass}`}>

        {showSideMenu && (
          <aside className={`w-64 p-6 ${sidebarBgClass} flex flex-col transition-all duration-300`}>

            <FaBars onClick={() => setShowSideMenu(false)} className={`cursor-pointer ${textClass} mb-4`} size={24} />

            <div className="flex flex-col items-center">
              <img src="https://png.pngtree.com/png-vector/20240529/ourlarge/pngtree-office-girl-wearing-formal-dress-with-brown-long-hair-style-png-image_12502555.png" alt="Profile" className="w-20 h-20 rounded-full mb-3" />
              <h2 className="text-lg font-semibold mb-6">Hey, ABCD</h2>
            </div>
 
            <ul className="space-y-3">
              <li onClick={() => handleTabChange("All")} className={`flex items-center space-x-3 p-3 rounded-md cursor-pointer ${ activeTab === "all" ? "bg-green-700" : hoverBgClass}`}>
                <FaClipboardList size={20} />
                <span>All Tasks</span>
              </li>

              <li onClick={() => handleTabChange("Today")} className={`flex items-center space-x-3 p-3 rounded-md cursor-pointer ${ activeTab === "Today" ? "bg-green-700" : hoverBgClass}`}>
                <PiCalendar size={20} />
                <span>Today</span>
              </li>

              <li onClick={() => handleTabChange("Important")}  className={`flex items-center space-x-3 p-3 rounded-md cursor-pointer ${activeTab === "Important" ? "bg-green-700" : hoverBgClass
                  }`}>
                <PiStar size={20} />
                <span>Important</span>
              </li>
            </ul>
          </aside>
        )}


        <main className={`p-6 transition-all duration-300 ${showSideMenu ? "w-full" : "w-full"}`}>

          {!showSideMenu && <FaBars onClick={() => setShowSideMenu(true)} className={`cursor-pointer ${textClass} mb-4`} size={24} />}


          <div className={`${cardBgClass} p-4 rounded-lg shadow-md`}>
            <h3 className="text-lg font-semibold mb-2">Add A Task</h3>
            <input
              type="text"
              placeholder="New Task"
              className={`w-full px-3 py-2 ${inputBgClass} border ${inputBorderClass} rounded-md ${textClass}`}
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
            <button onClick={handleAddTask} className="mt-3 px-4 py-2 bg-green-600 rounded-md font-semibold cursor-pointer">
              ADD TASK
            </button>
            <div className="flex m-3 ">
              <PiBell onClick={() => { setShowRightSidebar(true) }} className="mr-4 cursor-pointer"></PiBell>
              <PiCalendar onClick={() => { setShowRightSidebar(true) }} className="mr-4 cursor-pointer"></PiCalendar>
              <PiArrowClockwise onClick={() => { setShowRightSidebar(true) }} className="mr-4 cursor-pointer"></PiArrowClockwise>
            </div>
          </div>

        
          <h3 className="text-lg font-semibold mt-6">{activeTab} Tasks</h3>
          <div className="mt-3">
            {tasks
              .filter((task) => task.status !== "completed")
              .map((task) => (
                <div
                  key={task._id}
                  className={`flex items-center justify-between ${cardBgClass} p-3 rounded-md mb-2 shadow-sm`}
                  onClick={() => handleSidebarOpen(task)}
                >
                  <input
                    type="checkbox"
                    checked={task.status === "completed"}
                    onChange={() => handleComplete(task._id, task.status)}
                    className="w-5 h-5 cursor-pointer"
                  />
                  <span className={`flex-1 ml-3 ${task.status === "completed" ? `line-through ${completedTextClass}` : ""}`}>
                    {task.title}
                  </span>
                  <button onClick={(e) => {
                    e.stopPropagation();
                    handleImportant(task._id);
                  }}>
                    {task.important ? <FaStar className="text-yellow-500 mr-6" /> : <FaRegStar className="mr-6" />}
                  </button>
                  <button onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteTask(task._id);
                  }}>❌</button>
                </div>
              ))}
          </div>

          <h3 className="text-lg font-semibold mt-6">Completed</h3>
          <div className="mt-3">
            {completedTasks.map((task) => (
              <div
                key={task._id}
                className={`flex items-center justify-between ${completedTaskBgClass} p-3 rounded-md mb-2 shadow-sm`}
                onClick={() => handleSidebarOpen(task)}
              >
                <input
                  type="checkbox"
                  checked={true}
                  onChange={() => handleComplete(task._id, task.status)}
                  className="w-5 h-5 cursor-pointer"
                />
                <span className={`flex-1 ml-3 line-through ${completedTextClass}`}>{task.title}</span>
                <button onClick={(e) => {
                  e.stopPropagation();
                  handleImportant(task._id);
                }}>
                  {task.important ? <FaStar className="text-yellow-500 mr-6" /> : <FaRegStar className="mr-6" />}
                </button>
                <button onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteTask(task._id);
                }}>❌</button>
              </div>
            ))}
          </div>
        </main>


        {showRightSidebar && (
          <div className={`w-1/4 h-full ${cardBgClass} ${textClass} p-4 shadow-lg transition-all duration-300`}>
            <h3 className="text-lg font-semibold">Task Details</h3>
            <div className="mt-4">
              <p className={theme === 'dark' ? "text-gray-300" : "text-gray-700"}>{selectedTask?.title}</p>

              <div className="mt-4 flex flex-col space-y-2">
                <button className={`flex items-center space-x-2 p-2 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} rounded-md`}>
                  <FiPlus /> <span>Add Step</span>
                </button>
                <button className={`flex items-center space-x-2 p-2 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} rounded-md`}>
                  <PiBell /> <span>Set Reminder</span>
                </button>
                <button className={`flex items-center space-x-2 p-2 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} rounded-md`}>
                  <PiCalendar /> <span>Add Due Date</span>
                </button>
                <button className={`flex items-center space-x-2 p-2 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} rounded-md`}>
                  <PiArrowClockwise /> <span>Repeat</span>
                </button>
              </div>

              <div className="flex justify-between mt-4">
                <button onClick={() => setShowRightSidebar(false)} className={`px-3 py-2 ${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-300'} rounded-md cursor-pointer`}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}