import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import { signOut, onAuthStateChanged, getAuth } from "firebase/auth";
import { auth, db } from "../firebase";
import Calendar from 'react-calendar';
import Sidebar from './components/Sidebar';
import { getDocs, collection, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';

function CalaBoard(){
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [todos, setTodos] = useState([]); //getting todos from firebase
    const [newTodo, setNewTodo] = useState(""); //load new Todo task
    const [selectedDate, setSelectedDate] = useState(null);

    const backgrounds = [
    "https://images.unsplash.com/photo-1630387775844-b15d0f769972?q=80&w=2662&auto=format&fit=crop&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1628933978021-818a464f9f5d?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=2069",
    "https://images.unsplash.com/photo-1766933366411-7a921aebe181?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1536625514102-9b187fc8b183?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1645411325990-a40d3a5697a3?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1500916434205-0c77489c6cf7?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1501466044931-62695aada8e9?q=80&w=1687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/flagged/photo-1565896141391-f1e7433604be?q=80&w=1672&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1589481169991-40ee02888551?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1557409518-691ebcd96038?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1582706883126-8cd659cf1594?q=80&w=2128&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1567165094819-ab473e9f277b?q=80&w=2232&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  ];


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          if (currentUser) {
            setUser(currentUser);
          } else {
            navigate("/login"); // redirect if not logged in
          }
        });
        return () => unsubscribe();
      }, [navigate]);

    useEffect(() => {
      if(!document.body.style.backgroundImage){
        const randomBg = backgrounds[Math.floor(Math.random() * backgrounds.length)];
          document.body.style.backgroundImage = `url("${randomBg}")`;
      } else {
        console.log("Image loaded");
      }
    }, [user]);


    const handleDayClick = (date) => {
      const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
      setSelectedDate(formattedDate);
    };

    const hasCompletedTasks = (date) => {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const formattedDate = `${day}/${month}/${year}`;
      return todos.some(
        (task) =>
          task.isCompleted === true &&
          task.completedTime === formattedDate
      );
    };

    const completedTasksForDay = todos.filter(task =>
      task.isCompleted === true &&
      task.completedTime === selectedDate
    );

    const getTodoList = async () => {
      if (!user) return;
        try{
          const todoListRef = collection(db,`users/${user.uid}/todos`);
          const tododata = await getDocs(todoListRef);
          const filteredData = tododata.docs.map((doc => ({
            ...doc.data(),
            id: doc.id,
          })));

          setTodos(filteredData);
        } catch(err) {
          console.log(err)
        }
      }

    useEffect(() =>{
      if (!user) return;
      getTodoList();
    },[user]);

    const addTodo = async () =>{
        try{
          const todoListRef = collection(db,`users/${user.uid}/todos`);
          await addDoc(todoListRef,{task: newTodo, isCompleted:false,completedTime:null,});
          getTodoList();
          setNewTodo("");
        } catch (err){
          console.log(err);
        }
    }

    const updateTodo = async (id) => {
        const todoListRef = doc(db,`users/${user.uid}/todos`,id);
        const today = new Date();
        const completedTime = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;

        await updateDoc(todoListRef, {isCompleted: true,completedTime});
        getTodoList();
    };

    const deleteTodo = async(id) => {
      const todoListRef = doc(db,`users/${user.uid}/todos`,id);
      await deleteDoc(todoListRef);
      getTodoList();
    }

    const handleLogout = async () => {
        const auth = getAuth();
        await signOut(auth);
        navigate("/");
      };


    //2-Month old task deletion engine
    const parseCompletedDate = (dateStr) => {
      const [day, month, year] = dateStr.split("/").map(Number);
      return new Date(year, month - 1, day);
    };

    const isOlderThanTwoMonths = (taskDate) => {
      const now = new Date();
      const twoMonthsAgo = new Date();
      twoMonthsAgo.setMonth(now.getMonth() - 2);
      return taskDate < twoMonthsAgo;
    };

    const deleteOldTasks = async () => {
      const oldTasks = todos.filter((task) => {
        if (!task.completedTime) return false;
        const taskDate = parseCompletedDate(task.completedTime);
        return isOlderThanTwoMonths(taskDate);
      });
    
      for (const task of oldTasks) {
        await deleteDoc(
          doc(db, `users/${user.uid}/todos/${task.id}`)
        );
      }
    };

    useEffect(() => {
      if (user && todos.length) {
        deleteOldTasks();
      }
    }, [user, todos]);

    

    return(
        <div className="lg:mt-45 md:mt-30 mt-5 lg:ml-20 ml-10 w-[95%] h-screen overflow-auto overflow-x-hidden no-scrollbar">
            <div className="font-sans font-normal text-white text-opacity-90 bg-no-repeat bg-cover antialiased min-h-screen overflow-auto overflow-x-hidden">
                <Sidebar handleLogout={handleLogout} />

                <div className="grid gap-6 grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 w-full">
                  <div className='lg:min-w-[850px]'>

                    <div className="text-white text-[1.17em] font-bold bg-black/35 backdrop-blur-[10px] shadow-lg border border-white/20 sm:h-[460px] h-[480px] text-center p-3">
                        <Calendar
                          className="text-1xl custom-calendar"
                          onChange={handleDayClick}
                          tileContent={({ date, view }) =>
                            view === "month" && hasCompletedTasks(date) ? (
                              <div className="flex justify-center mt-1">
                                <span className="h-2 w-2 bg-green-500 rounded-full"></span>
                              </div>
                            ) : null
                          }
                        />
                    </div><br/>

                    <div className="text-white text-[1.17em] font-bold bg-black/35 backdrop-blur-[10px] shadow-lg border border-white/20 sm:h-[540px] text-center p-3">
                        {!selectedDate && (<p>Select a date to view completed tasks</p>)}
                        {selectedDate && completedTasksForDay.length === 0 && <p>No tasks completed on {selectedDate}</p>}
                        {selectedDate && completedTasksForDay.length > 0 && <p>Tasks completed on {selectedDate}</p>}
                        {todos.filter(task => task.isCompleted === true && task.completedTime === selectedDate).map(tasks => (
                            <div className='flex justify-center items-center mt-3 bg-white/10 backdrop-blur-[10px] shadow-lg border border-white/20 p-3'>
                              <h3 key={tasks.id}>{tasks.task}</h3>
                              <button className="m-2 border-none rounded-full h-[31px] w-[33px] bg-[#545454] text-white cursor-pointer transition-all duration-200 ease-in-out hover:bg-white/75" onClick={() => deleteTodo(tasks.id)}>
                                ✖
                              </button> 
                            </div>
                          ))}
                    </div>

                  </div>
                  
                    
                  <div className='lg:min-w-[850px]'>

                    <div className="text-white text-[1.17em] font-bold bg-black/35 backdrop-blur-[10px] shadow-lg border border-white/20 h-[1023px] text-center p-3">
                        <h2>Your TO-DO Tasks</h2><br/>
                        <div className="flex justify-center items-center">
                            <input className='w-[55%] text-center bg-white/10 rounded-[20px] p-2' placeholder="Enter Your Tasks" value={newTodo} onChange={(e) => setNewTodo(e.target.value)}/>
                            <button onClick={addTodo}
                              className="m-2 border-none rounded-full h-[31px] w-[33px] bg-[#545454] text-white cursor-pointer transition-all duration-200 ease-in-out hover:bg-white/75 flex justify-center items-center" >
                              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" >
                                <path d="M474 152m8 0l60 0q8 0 8 8l0 704q0 8-8 8l-60 0q-8 0-8-8l0-704q0-8 8-8Z"></path>
                                <path d="M168 474m8 0l672 0q8 0 8 8l0 60q0 8-8 8l-672 0q-8 0-8-8l0-60q0-8 8-8Z"></path>
                              </svg>
                            </button>
                        </div>
                        
                        <div>
                          {todos.filter(task => task.isCompleted === false).map(tasks => (
                            <div className='flex justify-center items-center mt-3 bg-white/10 backdrop-blur-[10px] shadow-lg border border-white/20 p-3'>
                              <h3 key={tasks.id}>{tasks.task}</h3>
                              <button className="m-2 border-none rounded-full h-[31px] w-[33px] bg-[#545454] text-white cursor-pointer transition-all duration-200 ease-in-out hover:bg-white/75" onClick={() => updateTodo(tasks.id)}>
                                ✔
                              </button> 
                            </div>
                          ))}
                        </div>
                    </div>
                    
                  </div><br/><br/><br/>

                </div>
            </div>
        </div>
    );
}
export default CalaBoard