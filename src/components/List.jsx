import React from 'react'

const List = (props) => (
    <React.Fragment>
    <li className="lista__item">
        <div style={{width: "100%", display: "flex", justifyContent: "space-between"}}>
            <input type="checkbox" name="check" id="ck" checked={props.done} onChange={() => {props.check(props.task)}}/>
            <span style={{textDecoration: `${props.done ? 'line-through' : 'none'}`}}>{props.task}</span>
            <button style={{border: '1px solid black', borderRadius: 10, padding:10,}} onClick={() => {props.remove(props.task)}}>Delete</button>
        </div>
    </li>
    </React.Fragment>
      
    )

export default List;