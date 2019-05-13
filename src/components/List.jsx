import React from 'react'

const List = (props) => (
    <React.Fragment>
         <tbody>
        <tr>
            <td>
                <input type="checkbox"></input>
            </td>
            <td>
                {props.task}
            </td>
            <td>
                {props.done}
            </td>
        </tr>
        </tbody>
    </React.Fragment>
      
    )

export default List;