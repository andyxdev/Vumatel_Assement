import React from 'react';

class Status extends React.Component{
    constructor(props){
        super(props);
        this.state={
            status:'',
            notes:'',
            date:'',
            customer_name:this.props.name.id + 1,

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
            this.setState({
               customer_name:this.props.name.id + 1,


         });

        fetch('http://127.0.0.1:8000/installations/v1/status/',{
            method:'POST',
            body:JSON.stringify(this.state),
            headers:{
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then(response=>response.json())
        .then((data)=>console.log(data));



        // this.setState({
 /*            customer_name:'', */
/*             address:'',
            appointment_date:'' */

        // });
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
                          <option value="COMPLETE">COMPLETE</option>
                          <option value="REJECTED">REJECTED</option>
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
                    {/* <tr>
                        <th>Full Name</th>
                        <td>
                            <input value={this.props.name.id} name="customer_name" onChange={this.changeHandler} type="text" className="form-control" />
                        </td>
                    </tr> */}
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

export default Status;