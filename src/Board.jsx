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

    const next = (i, status) => {

        console.log(i)

        if (status === 'Todo') {

            let newlist = [...list]

            newlist[i].inTodoStage = false;

            newlist[i].inprocess = true;

            setList(newlist)

            timeStampFunction()

        } else if (status == 'inProgress') {

            let newlist = [...list]

            newlist[i].inTodoStage = false;

            newlist[i].inprocess = false;

            newlist[i].done = true;

            setList(newlist)

            timeStampFunction()

        }

    }

    const previous = (i,status) => {

        if (status === 'inProgress') {

            let newlist = [...list]

            newlist[i].inTodoStage = true;

            newlist[i].inprocess = false;

            newlist[i].done = false;

            setList(newlist)

            timeStampFunction()

        } else if (status === 'Done') {

            let newlist = [...list]

            newlist[i].inTodoStage = false;

            newlist[i].inprocess = true;

            newlist[i].done = false;

            setList(newlist)

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

                            list.map((ele, i) => {

                                if (ele.inTodoStage) {

                                    return <div className='card' style={{ background: 'red', width: '16rem' }}>

 

                                        <h5 className="card-title" >{ele.todo}</h5>

                                        <div className="card-body">

                                            <button className='btn btn-info' disabled>Previous</button>

                                            <button di className='btn btn-success' onClick={() => next(i, "Todo")} >Next</button>

                                        </div>

 

                                    </div>

                                }

                            })

                        }</td>

                        <td>

                            {

                                list.map((ele, i) => {

                                    if (ele.inprocess) {

                                        return <div className='card' style={{ background: 'yellow', width: '16rem' }}>

 

                                            <h5 className="card-title" >{ele.todo}</h5>

                                            <div className="card-body">

                                                <button className='btn btn-info' onClick={() => previous(i,"inProgress")}>Previous</button>

                                                <button di className='btn btn-success' onClick={() => next(i, "inProgress")}>Next</button>

                                            </div>

 

                                        </div>

                                    }

                                })

                            }

                        </td>

                        <td>

                            {

                                list.map((ele, i) => {

                                    if (ele.done) {

                                        return <div className='card' style={{ background: 'green', width: '16rem' }}>

 

                                            <h5 className="card-title" >{ele.todo}</h5>

                                            <div className="card-body">

                                                <button className='btn btn-info' onClick={() => previous(i,"Done")}>Previous</button>

                                                <button di className='btn btn-success' disabled>Next</button>

                                            </div>

 

                                        </div>

                                    }

                                })

                            }

                        </td>

                    </tr>

 

                </thead>

            </table>

            <div className='card-body'>
                        <h3 style={{textAlign:'right'}}>Time Stamp</h3>
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