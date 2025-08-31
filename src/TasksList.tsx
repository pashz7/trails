import {TaskListItem} from "./TaskListItem.tsx";
import {useEffect, useState} from "react";
import type {Task, TasksResponse} from "./type.ts";


type Props = {
    onTaskSelect : (taskId: string) => void;
}

export function TasksList(props: Props) {
    const [tasks, setTasks] = useState<Task[]>([])
    const [listQueryStatus, setListQueryStatus] = useState<'success' | "loading">("loading")
    const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null)


    useEffect(() => {
        // rest api

        fetch('https://trelly.it-incubator.app/api/1.0/boards/tasks', {
            headers: {
                'API-KEY': '55ce7689-38f3-4962-98ba-f768b873fa95'
            }
        })
            .then(res => res.json() as Promise<TasksResponse>)
            .then(json => {

                setTasks(json.data)
                setListQueryStatus("success")

            })
    }, [])


    if (listQueryStatus=== "loading") {
        return <div>loading...</div>
    }
const handleSelect = (taskId: string) => {
        setSelectedTaskId(taskId)
    props.onTaskSelect(taskId)
}


    return <ul>
        {tasks.map(t => <TaskListItem isSelected={selectedTaskId===t.id}
            task={t} onSelect={handleSelect} />)}
    </ul>
}