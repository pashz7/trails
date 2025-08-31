import {useEffect, useState} from "react";
import type {TaskResponse} from "./type.ts";

type Props = {
    taskId: string | null
}


export function TaskDetail(props: Props) {
    const [detailQueryStatus, setDetailQueryStatus] = useState<"pending" | "success" | "loading">("pending")
    const [task, setTask] = useState<TaskResponse | null>(null)


    // useEffect(() => {
    //     fetch('https://trelly.it-incubator.app/api/1.0/boards/{boardId}/tasks/' + taskId, {
    //         // signal: abortControllerRef.current.signal,
    //         headers: {
    //             'API-KEY': '55ce7689-38f3-4962-98ba-f768b873fa95'
    //         }
    //     })
    //         .then(res => res.json() as Promise<TaskResponse>)
    //         .then(json => {
    //
    //             setTask(j son)
    //             setDetailQueryStatus("success")
    //
    //         })
    // }, []);
if (detailQueryStatus==="pending") {
    return <span>No task.... </span>
}

    if(detailQueryStatus == "loading") {
        return <div>Loading...</div>;
    }



    return  <div>
        <h2>Details</h2>
        {/*{isDetailLoading && <p>Loading...</p>}*/}
        {/*{!isDetailLoading && selectedTask && <div>*/}
            <div>{task.data.attributes.status}</div>
            <div>{task.data.attributes.addedAt}</div>
            <div>{task.data.attributes.priority}</div>

        {/*</div>*/}
        {/*// }*/}

    </div>
}