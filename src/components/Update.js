import React from 'react';
import { useState } from 'react';
class Update extends React.Component{
    constructor(){
        super();
        this.state={
            status_id:'',
            status:'',
            notes:'',
            date:'',

        }
        this.changeHandler=this.changeHandler.bind(this);
        this.submitForm=this.submitForm.bind(this);
    }



    // Input Change Handler
    changeHandler(event){
        this.setState({
            [event.target.name]:event.target.value
        });
    }

    // Submit Form
    submitForm(){
        var id= this.state.status_id;
        fetch('http://127.0.0.1:8000/installations/v1/status/'+id+'/',{
            method:'PUT',
            body:JSON.stringify(this.state, ['status', 'notes','date']),
            headers:{
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then(response=>response.json())
        .then((data)=>console.log(data));
    }

    fetchData(){
        var id=this.props.match.params.id;
        fetch('http://127.0.0.1:8000/installations/v1/installation/'+id)
        .then(response=>response.json())
        .then((data)=>{
            this.setState({
                status_id:data.Status.map((inst) => inst.id),

                status:data.Status.map((inst) => inst.status),
                notes:data.Status.map((inst) => inst.notes),
                date:data.Status.map((inst) => inst.date),
            });
            console.log(data.Status.map((inst) => inst.id));
        });
        
    }

    componentDidMount(){
        this.fetchData();
    }

    render(){
        return (
            <table className="table table-bordered">
                <tbody>
                   <tr>
                        <th>Status</th>
                        <td>
                        <select className="form-select" aria-label="Default select example" value={this.state.status}  name="status" onChange={this.changeHandler} >
                          <option selected>REQUESTED</option>
                          <option value="Installation requested">REQUESTED</option>
                          <option value="Installation in progress">IN_PROGRESS</option>
                          <option value="Installation CompleteCOMPLETE">COMPLETE</option>
                          <option value="Installation Rejected">REJECTED</option>
                        </select>
                        </td>
                    </tr>
                    <tr>
                        <th>Notes</th>
                        <td>
                        <textarea className="form-control" aria-label="With textarea" value={this.state.notes} name="notes" onChange={this.changeHandler}></textarea>
                        </td>
                    </tr>
                    <tr>
                        <th>Date</th>
                        <td>

                        <input type="date" className="form-control" value={this.state.date} name="date" onChange={this.changeHandler} />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="2">
                            <input type="submit" onClick={this.submitForm} className="btn btn-dark" />
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}

export default Update;