import {useEffect, useRef, useState} from 'react'
import type {Task, TaskAttributes, TaskResponse, TasksResponse} from "./type.ts";






export function App() {
    const [tasks, setTasks] = useState<Task[]>([])
    const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null)
    const [isListLoading, setIsListLoading] = useState<boolean>(true)
    const [isDetailLoading, setIsDetailLoading] = useState<boolean>(false)
    const [selectedTask, setSelectedTask] = useState<TaskResponse | null>(null)
    const abortControllerRef = useRef<null | AbortController>(null)



    // {title: 'Bruno Mars', url: "https://production-it-incubator.s3.eu-central-1.amazonaws.com/apihub-spotifun/Video/815b57b4-92f3-4134-9deb-749d27791ab1_file_example_MP3_700KB.mp3"},
    // {title: "Timberlake", url: "https://production-it-incubator.s3.eu-central-1.amazonaws.com/apihub-spotifun/Video/815b57b4-92f3-4134-9deb-749d27791ab1_file_example_MP3_700KB.mp3"}




    useEffect(() => {
        // rest api

        fetch('https://trelly.it-incubator.app/api/1.0/boards/tasks', {
            headers: {
                'API-KEY': '55ce7689-38f3-4962-98ba-f768b873fa95'
            }
        })
            .then(res => res.json() as Promise<TasksResponse>)
            .then(json => {
                console.log(json)
                setTasks(json.data)
                setIsListLoading(false)

            })
    }, [])




    const onClickHandler = (taskId: string) => {
        if (selectedTaskId === taskId) {
            setSelectedTaskId(null)
            setSelectedTask(null)
            setIsDetailLoading(false)
            return // Выходим из функции, не делаем fetch
        }
        abortControllerRef.current?.abort()
        abortControllerRef.current = new AbortController()
        // Если кликаем на новую задачу
        setSelectedTaskId(taskId)
        setIsDetailLoading(true)

        fetch('https://trelly.it-incubator.app/api/1.0/boards/{boardId}/tasks/' + taskId, {
            signal: abortControllerRef.current.signal,
            headers: {
                'API-KEY': '55ce7689-38f3-4962-98ba-f768b873fa95'
            }
        })
            .then(res => res.json() as Promise<TaskResponse>)
            .then(json => {

                setSelectedTask(json)
                setIsDetailLoading(false)

            })
    }


    return (
       <div style={{ display: 'flex', alignItems: 'center' , gap: '40px' }}>
           <div>
           <h2>Trails</h2>
               {isListLoading && <p>Loading...</p>}
           <ul>
            {tasks.map(task => {
                const color = task.id === selectedTaskId ? 'red' : 'white'

                return (
                    <li>
                        <h4 style = {{color: color}}
                            onClick={() => onClickHandler(task.id)}>
                        {task.attributes.title}</h4>



                    </li>

                )
            })}

        </ul>
           </div>
           <div>
               <h2>Details</h2>
               {isDetailLoading && <p>Loading...</p>}
               {!isDetailLoading && selectedTask && <div>
                   <div>{selectedTask.data.attributes.status}</div>
                   <div>{selectedTask.data.attributes.addedAt}</div>
                   <div>{selectedTask.data.attributes.priority}</div>

               </div>
               }

           </div>
       </div>
    )



}

