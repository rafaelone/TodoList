import React from 'react'
import List from './components/List'
import localStorageJson from './utils/localStorageJson'

function getPosition(item, state){
    return state.tasks.map(item => item.task).indexOf(item)
}

class Todo extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            tasks: [],
            errorMessage: false
        }
        this.addTask = this.addTask.bind(this);
        this.check = this.check.bind(this);
        this.remove = this.remove.bind(this);
        this.handleInput = this.handleInput.bind(this)
    }

    componentWillMount(){
        const storage = localStorageJson.get('tasks')
        let state = this.state
        if(storage){
            state.tasks = storage
            this.setState(state)
        }
    }

    addTask(){
        let state = this.state;
        let field = document.getElementById('taskInput').value
        if(!field.length){
            this.setState({errorMessage: true})
        }else{
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
            document.getElementById('taskInput').value = ""
        }
        
    }

    check(item){
        let state = this.state;
        let storage = localStorageJson.get("tasks")
        if(storage){
            let position = getPosition(item, state)
       
            if(state.tasks[position].done){
                state.tasks[position].done = false;
                storage[position].done = false;
                localStorageJson.set("tasks", storage)
                this.setState(state)
            }else{
                state.tasks[position].done = true
                storage[position].done = true;
                localStorageJson.set("tasks", storage)
                this.setState(state)
            }
        }else{
            this.setState({tasks: []})
        }
        
    }

    remove(item){
        let storage = localStorageJson.get("tasks")
        if(storage){
            let state = this.state;
            let position = getPosition(item, state)
            if(!state.tasks.length){
                this.setState({tasks: []})
            }else{
                state.tasks.splice(position, 1)
                localStorageJson.set("tasks", storage)
                this.setState(state)
            }
        }else{
            this.setState({tasks: []})
        }
       
    }

    handleInput(e){
        if(e.target.value.length){
            this.setState({errorMessage:false})
        }
    }

    listTasks(){
        const { state } = this;
        if(!state.tasks.length){
            return <p>No task</p>
        }else{
            return(
                <React.Fragment>
                  <ul className="lista">
                    { this.state.tasks.map(item => (
                     <List task={item.task} done={item.done} check={this.check} remove={this.remove}/>
                        ))}     
                  </ul>
                  </React.Fragment>
            )
        }
    }

    render(){

        const errorMessage = () => {
            const { errorMessage } = this.state
            if(errorMessage){
                return ( <span>Please, enter a task</span>)
            }else{
                return ""
            }
           
        }

        return(
            <div className="container">
            <div className="box">
            <div>
            <input id="taskInput" style={{marginTop: 20}} onChange={this.handleInput}/>
              
              <button onClick={this.addTask} id="addClass">Add</button>
             
            </div>
            <div className="errorMessage">{errorMessage()}</div>
                <div style={{textAlign: "center"}}>
                    {this.listTasks()}
                </div>
            </div>
            </div>
              
        )
    }
}
export default Todo;