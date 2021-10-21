import React from 'react';
import Status from './Status';
class Add extends React.Component{
    constructor(props){
        super(props);
        this.state={
            customer_name:'',
            Status:[],
            address:'',
            appointment_date:'',

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

        fetch('http://127.0.0.1:8000/installations/v1/installation/',{
            method:'POST',
            body:JSON.stringify(this.state),
            headers:{
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then(response=>response.json())
        .then((data)=>{
            this.setState({
                Status:data
            });
            
        });
        


        this.setState({
            address:'',
            appointment_date:''

        });
    }

    render(){
        const installData=this.state.Status;
        console.log(installData)
        return (
            <div>

            <table className="table table-bordered">
            
                <tbody>
                    <tr>
                        <th>Full Name</th>
                        <td>
                            <input value={this.state.customer_name} name="customer_name" onChange={this.changeHandler} type="text" className="form-control" />
                        </td>
                    </tr>
                    <tr>
                        <th>address</th>
                        <td>
                            <textarea className="form-control" aria-label="With textarea" value={this.state.Address} name="address" onChange={this.changeHandler} type="text"/>
                        </td>
                    </tr>
                    <tr>
                        <th>Appointment_Date</th>
                        <td>
                            <input  value={this.state.appointment_date} name="appointment_date" onChange={this.changeHandler} type="date" className="form-control" />
                        </td>
                    </tr>
                    
                    <tr>
                        <td colSpan="2">
                            <input type="submit" onClick={this.submitForm} className="btn btn-dark" />
                        </td>
                    </tr>
                </tbody>
            </table>
            <Status name = {installData}/>
            
            </div>
        );
    }
}

export default Add;