import React from 'react'
import List from './components/List'
import localStorageJson from './utils/localStorageJson'

class Todo extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            tasks: []
        }
        this.addTask = this.addTask.bind(this);
    }

    componentWillMount(){
        const storage = localStorageJson.get('tasks')
        let state = this.state
        if(storage){
            state.tasks = storage
            this.setState(state)
        }
    }

    listTasks(){
        const { state } = this;
        if(!state.tasks.length){
            return <p>Sem tarefas</p>
        }else{
            return(
                <table>
                <thead>
                    <tr>
                        <th>Check</th>
                        <th>Task</th>
                        <th>Done</th>
                    </tr>
                    </thead>
                    { this.state.tasks.map(item => (
                 <List task={item.task} done={item.done}/>
                    ))}
                </table>
            )
           
        }
    }

    addTask(){
        let state = this.state;
        let field = document.getElementById('taskInput').value
        let storage = localStorageJson.get("tasks")
        let array = []
        if(!storage){
            array.push({task: field, done: false})
            localStorageJson.set('tasks', array)
            this.setState({tasks: [{task: field, done: false}]})
        }else{
            storage.push({task: field, done: false})
            localStorageJson.set('tasks', storage)
            state.tasks.push({task: field, done: false})
            this.setState(state)
        }
        field = ""
    }

    render(){
        return(
            <div>
                <input id="taskInput"/>
                <button onClick={this.addTask}>Add</button>
                {this.listTasks()}
             
            </div>
              
        )
    }
}
export default Todo;