import Task from './Task'


const Tasks = ({ tasks , onDelete, onToggle }) => {



    //todo Note the arrow function of map has the () brackets instead of {}
    // Note for passing the proc....the first is the name and the second is the value
    return(
        <>

            {tasks.map((task) =>
                (
                <Task key={task.id} task={task} onDelete={onDelete} onToggle={onToggle}/>)
            )}
        </>
    )
}

export default Tasks