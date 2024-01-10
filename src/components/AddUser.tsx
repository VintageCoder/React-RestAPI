import React, { useEffect, useState } from 'react';
import { createUser, getUser, updateUser } from '../service/EmployeeService';
import { useNavigate, useParams } from 'react-router-dom';

const AddUser: React.FC = () => {
    const { id } = useParams();
    const navigator = useNavigate();

    const [userData, setUserData] = useState({
        name: '',
        email: '',
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        if (id) {
            // Fetch user data only if id is present
            getUser(id)
                .then((response) => {
                    setUserData(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching employee:', error);
                    // Handle errors as needed
                });
        }
    }, [id]); // Run the effect only when id changes

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value,
        });
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();

        if (!userData.name || !userData.email) {
            setErrorMessage('Name and email are required.');
            return;
        }

        // Clear previous messages
        setErrorMessage('');
        setSuccessMessage('');

        if (id) {
            // Update existing user if id is present
            updateUser(id, userData)
                .then((response) => {
                    setSuccessMessage('User updated successfully.');
                    navigator('/all');
                })
                .catch((error) => {
                    setErrorMessage('Failed to update user. Please try again.');
                    console.error('Error updating user:', error);
                });
        } 
            // Add new user if id is not present
        createUser(userData)
            .then((response) => {
                setSuccessMessage('User added successfully.');
                navigator('/all');
            })
            .catch((error) => {
                setErrorMessage('Failed to add user. Please try again.');
                console.error('Error adding user:', error);
            });
    
    };

    return (
        <div className="container mt-4">
            {id ? <h2>Update Form</h2> : <h2>Add Form</h2>}
            <form onSubmit={handleSave}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        Name:
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={userData.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Email:
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={userData.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="mb-3 text-danger">{errorMessage}</div>
                <div className="mb-3 text-success">{successMessage}</div>
                <button type="submit" className="btn btn-primary">
                    Save
                </button>
            </form>
        </div>
    );
};

export default AddUser;
