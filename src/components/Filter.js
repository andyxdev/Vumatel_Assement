import React from 'react';
import { Link } from 'react-router-dom';

class Installations extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data:[],
            filter:'',

        };
    }

     fetchData(){
        fetch('http://127.0.0.1:8000/installations/v1/installation/')
        .then(response=>response.json())
        .then((data)=>{
            this.setState({
                data:data
            });
        });
    }

    componentDidMount(){
        this.fetchData();
    } 

     deleteData(id){
        fetch('http://127.0.0.1:8000/installations/v1/installation/'+id+'/',{
            method:'DELETE',
            body:JSON.stringify(this.state),
        })
        .then(response=>response)
        .then((data)=>{
            if(data){
                this.fetchData();
            }
        });
    } 


    changeHandler(event){
        this.setState({
          filter: event.target.value

        });
         

    }
 
    render(){

        const Datasearch = this.state.data.filter(item => {
            return item.Status.map((inst) => inst.status).indexOf(this.state.filter) >=0
    

        });
        const installData=Datasearch;
        const rows=installData.map((install)=>
            <tr key={install.id}>
                <td>{install.Status.map((inst) => inst.status)}</td>
                <td>{install.customer_name}</td>
                <td>{install.address}</td>
                <td>{install.appointment_date}</td>
                <td>{install.date_created}</td>
                <td>{install.date_modified}</td>
                <td>
                    <Link to={'Update/'+install.id} className="btn btn-info mr-2 mb-2 mt-2 ">Update</Link>
                    <button onClick={()=>this.deleteData(install.id)}  className="btn btn-danger">Delete</button>
                </td>
            </tr>
        );
        return (

  
            <table className="table table-bordered" border >
                <thead>

                 <tr>
                        <th>Filter By Status</th>
                        <td>
                        <select className="form-select" aria-label="Default select example" value={this.state.filter}  name="filter" onChange={this.changeHandler.bind(this)} >
                          <option selected>All</option>
                          <option value="">ALL</option>
                          <option value="Installation requested">REQUESTED</option>
                          <option value="Installation in progress">IN_PROGRESS</option>
                          <option value="COMPLETE">COMPLETE</option>
                          <option value="REJECTED">REJECTED</option>
                        </select>
                        </td>
                    </tr> 
                    
                    <tr>
                        <th>Status</th>
                        <th>Full Name</th>
                        <th>Address</th>
                        <th>Appointment_Date</th>
                        <th>Date_Created</th>
                        <th>Date_Modified</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>

        
            
            
        );
    }
    
}

export default Installations;