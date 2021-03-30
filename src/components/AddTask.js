import { useState } from 'react'

//todo IMP while destructuring the input prop
// use the key of the passed prop

const AddTask = ({ onAdd })=>{

    //todo this is a component level state
    // Note how the state is initialized using the
    // input from the form and then state is modified using
    // the corresponding set method
    const [text,setText] = useState('');
    const [day,setDay] = useState('');
    const [reminder,setReminder] = useState(false);

    const onSubmit = (e)=>{
        e.preventDefault();

        //todo note direct the state of this component itself is used
        if(!text){
            alert('Please add a Task');
            return
        }

        //todo IMP Note how the state is passed to the input Prop
        onAdd({text,day,reminder});

        setText('');
        setDay('');
        setReminder(false);

    }

    return(
        <form className='add-form' onSubmit={onSubmit}>
            <div className='form-control'>
                <label>Task</label>
                <input type='text' placeholder='Add Task'
                    value={text}
                    onChange={(e)=> setText(e.target.value)}
                />
            </div>
            <div className='form-control'>
                <label>Day & Time</label>
                <input type='text' placeholder='Add Day & Time'
                       value={day}
                       onChange={(e)=> setDay(e.target.value)}
                />
            </div>
            <div className='form-control form-control-check'>
                <label>Set Reminder</label>
                <input type='checkbox'
                       checked={reminder}
                       value={reminder}
                       onChange={(e)=> setReminder(e.currentTarget.checked)}
                />
            </div>
            <input type='submit' value='Save Task' className='btn btn-block'/>
        </form>

    )

}

export default AddTask