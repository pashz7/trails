import type {Task} from "./type.ts";


type Props = {
    task: Task
    isSelected: boolean
    onSelect: (id: string) => void
}


export function TaskListItem(props: Props) {


    const color = props.isSelected ? 'red' : 'white'

    return   <li style={{color: color}}>
        <h4 onClick={()=>props.onSelect(props.task.id)}>
            {props.task.attributes.title}
        </h4>

    </li>


}