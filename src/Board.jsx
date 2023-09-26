import React, { useState } from 'react'

const board = () => {
    const [list, setList] = useState([])
    const [todo, setTodo] = useState({ todo: '', inTodoStage: false, inprocess: false, done: false })
    const [inTodoStage, setInTodoStage] = useState(false)
    const [inprocess, setInprocess] = useState(false)
    const [done, setdone] = useState(false)
    const [stage, setStage] = useState('Todo')
    const [timeList, setTimeList] = useState([])
    const [showTime, setShowTime] = useState(0)

    const handeler = (e) => {
        let data = { ...todo, [e.target.name]: e.target.value }
        // console.log(data);
        setTodo(data)
    }

    const timeStampFunction = () => {
        const date = new Date();
        const ShowTime = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        let newList = [...timeList, ShowTime]
        setTimeList(newList)
        setShowTime(ShowTime)

    }
    const check = () => {
        if (todo.todo == '') {
            return 1;
        }
    }

    const addTask = () => {
        if (check()) {
            alert("Plz Fill Task")
        } else {
            todo.inTodoStage = true;
            let newArray = [...list, todo]
            // console.log(newArray);
            setList(newArray)
            setInTodoStage(true)
            setTodo({ todo: '', inTodoStage: false, inprocess: false, done: false })
            timeStampFunction()
        }
    }
    const next = (i) => {
        console.log(i)
        if (stage === 'Todo') {
            let newlist=list        
            console.log(newlist[i])
            newlist[i].inTodoStage=false;
            newlist[i].inprocess=true;
            let newData=[...newlist]
            console.log(newData);
            setList(newData)
            setInTodoStage(false)
            setInprocess(true)
            setStage('inProgress')
            timeStampFunction()
        } else if (stage == 'inProgress') {
            setInprocess(false)
            setStage('Done')
            setdone(true)
            timeStampFunction()
        }
    }
    const previous = (i) => {
        if (stage === 'inProgress') {
            setInprocess(false)
            setInTodoStage(true)
            setStage('Todo')
            timeStampFunction()
        } else if (stage === 'Done') {
            setStage('inProgress')
            setdone(false)
            setInprocess(true)
            timeStampFunction()
        }

    }

    return (
        <>
            <div className='card'>
                <input type="text" name="todo" className='form-control' value={todo.todo} onChange={handeler} placeholder='task' />
                <button className='btn btn-primary' onClick={addTask}> Add</button>
            </div>
            <table className='mytable' style={{ width: '' }}>
                <thead>
                    <tr>
                        <th>ToDo</th>
                        <th>InProgress</th>
                        <th>Done</th>
                    </tr>
                    <tr>
                        <td>{
                            inTodoStage && list.map((ele, i) => (
                                
                                <div className='card' style={{ background: inTodoStage == true ? 'red' : inprocess == true ? 'yellow' : done == true ? 'green' : 'inherit',width:'16rem' }}>

                                    <h5 className="card-title" >{ele.todo}</h5>
                                    <div className="card-body">
                                        {inTodoStage == true ? <button className='btn btn-info' onClick={()=>previous(i)} disabled>Previous</button> : <button className='btn btn-info' onClick={()=>previous(i)}>Previous</button>}

                                        {done == true ? <button className='btn btn-success' onClick={()=>next(i)} disabled>Next</button> : <button className='btn btn-success' onClick={()=>next(i)} >Next</button>}
                                    </div>
                                    
                                </div>
                            ))
                        }</td>
                        <td>
                        {
                            inprocess && list.map((ele, i) => (
                                <div className='card' style={{ background: inTodoStage == true ? 'red' : inprocess == true ? 'yellow' : done == true ? 'green' : 'inherit',width:'16rem' }}>

                                    <h5 className="card-title" >{ele.todo}</h5>
                                    <div className="card-body">
                                        {inTodoStage == true ? <button className='btn btn-info' onClick={()=>previous(i)} disabled>Previous</button> : <button className='btn btn-info' onClick={()=>previous(i)}>Previous</button>}

                                        {done == true ? <button className='btn btn-success' onClick={()=>next(i)} disabled>Next</button> : <button className='btn btn-success' onClick={()=>next(i)} >Next</button>}
                                    </div>
                                    
                                </div>
                            ))
                        }
                        </td>
                        <td>
                        {
                           done && list.map((ele, i) => (
                                <div className='card' style={{ background: inTodoStage == true ? 'red' : inprocess == true ? 'yellow' : done == true ? 'green' : 'inherit',width:'16rem' }}>

                                    <h5 className="card-title" >{ele.todo}</h5>
                                    <div className="card-body">
                                        {inTodoStage == true ? <button className='btn btn-info' onClick={()=>previous(i)} disabled>Previous</button> : <button className='btn btn-info' onClick={()=>previous(i)}>Previous</button>}

                                        {done == true ? <button className='btn btn-success' onClick={()=>next(i)} disabled>Next</button> : <button className='btn btn-success' onClick={()=>next(i)} >Next</button>}
                                    </div>
                                    
                                </div>
                            ))
                        }
                        </td>
                    </tr>

                </thead>
            </table>
            <div className='card-body'>
                                        {
                                            timeList.map((ele, i) => (
                                                <p style={{ lineHeight: 0.5, textAlign: 'right' }} >
                                                    <em key={i}>{ele}</em>
                                                </p>
                                            ))
                                        }

                                    </div>

        </>

    )
}

export default board