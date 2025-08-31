import {TasksList} from "./TasksList.tsx";
import {TaskDetail} from "./TaskDetail.tsx";
import {useState} from "react";


export function App() {

    const [task, setTask] = useState("")
    console.log(task);

    return (
        <div style={{ display: 'flex', alignItems: 'center' , gap: '40px' }}>
            <TasksList  onTaskSelect={(taskId)=>setTask(taskId)} />
            <TaskDetail taskId={task} />
        </div>
    );
}
