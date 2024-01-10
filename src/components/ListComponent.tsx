import React, { useState, useEffect } from 'react';
import { deleteUser, listEmployees } from "../service/EmployeeService";
import { useNavigate } from 'react-router-dom';

const ListComponent = () => {
    const [employees, setEmployee] = useState([]);
    const navigator = useNavigate();

    useEffect(() => {
        listEmployees().then((response) => {
            setEmployee(response.data);
        })
        .catch((error) => {
            console.error('Error fetching employee list:', error);
            // Handle errors as needed
        });
    }, []);

    function ClickAddUser() {
        navigator('/addUser');
    }

    function UpdateUser(id: any){
        navigator(`/update/${id}`);
    }

    function DeleteUser(id: any){
        deleteUser(id)
            .then(() => {
                console.log(`${id} : Successfully deleted`);
                // Refresh the employee list after deletion
                listEmployees().then((response) => {
                    setEmployee(response.data);
                });
            })
            .catch((error) => {
                console.error('Error deleting employee:', error);
                // Handle errors as needed
            });
    }

    return (
        <div className="text-center">
            <h1>Employees Details</h1>
            <button type="button" onClick={ClickAddUser} className="btn btn-primary">Add User</button>

            <div className="table-responsive mx-auto">
                <table className="table custom-table">
                    <thead>
                        <tr className='table-active'>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((employee) => (
                            <tr key={employee.id}>
                                <td>{employee.id}</td>
                                <td>{employee.name}</td>
                                <td>{employee.email}</td>
                                <td>
                                    <div className="btn-group" role="group" aria-label="Basic example">
                                        <button type="button" className="btn btn-primary btn-lg" onClick={() => UpdateUser(employee.id)}>Update</button>
                                        <button type="button" className="btn btn-primary btn-lg" onClick={() => DeleteUser(employee.id)}>Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ListComponent;
