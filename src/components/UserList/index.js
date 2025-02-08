import { useState, useEffect, useCallback } from "react"; // Import React hooks (useState, useEffect, useCallback)
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesome icon component
import { faPen } from "@fortawesome/free-solid-svg-icons"; // Import "pen" icon from FontAwesome
import { faTrash } from "@fortawesome/free-solid-svg-icons"; // Import "trash" icon from FontAwesome
import axios from "axios"; // Import Axios for making HTTP requests
import { Modal, Button } from "react-bootstrap"; // Import Modal and Button components from React Bootstrap
import UserForm from "../UserForm"; // Import UserForm component (for creating or editing users)
import "./index.css"; // Import CSS file for styling

const API_URL = "https://67a6184a510789ef0dfa5f16.mockapi.io/users"; // Base URL for user data API

// ViewFormModal component: displays user details in a modal
const ViewFormModal = ({ show, onHide, user }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>User Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Full Name: {user.firstName + " " + user.lastName}</p>{" "}
        {/* Display user's full name */}
        <p>Email: {user.email}</p> {/* Display user's email */}
        <p>Department: {user.department}</p> {/* Display user's department */}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          {" "}
          {/* Button to close the modal */}
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

// UserList component: renders the list of users and handles CRUD operations
const UserList = () => {
  const [data, setData] = useState(null); // State to store fetched user data
  const [userToEdit, setUserToEdit] = useState(null); // State to store the user being edited
  const [showModal, setShowModal] = useState(false); // State to control modal visibility (for edit/create)
  const [showViewModal, setShowViewModal] = useState(false); // State to control modal visibility (for view)
  const [createBtn, setCreateBtn] = useState(false); // State to determine if it's create mode
  const [selectedUser, setSelectedUser] = useState(null); // State to store the selected user for viewing

  // Function to show the modal for editing a user
  const handleShowModal = (user) => {
    setUserToEdit(user); // Set the user to be edited
    setShowModal(true); // Open the modal
  };

  // Function to show the modal for viewing user details
  const handleShowViewModal = (user) => {
    setSelectedUser(user); // Set the selected user for viewing
    setShowViewModal(true); // Open the view modal
  };

  // Function to close the edit/create modal
  const handleCloseModal = () => {
    setShowModal(false); // Close the modal
    setUserToEdit(null); // Reset userToEdit state
    setCreateBtn(false); // Reset create mode flag
  };

  // Function to close the view modal
  const handleCloseViewModal = () => {
    setShowViewModal(false); // Close the view modal
    setSelectedUser(null); // Reset selected user
    setUserToEdit(null); // Reset user being edited
  };

  // Fetch user data from API
  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(API_URL); // Make GET request to fetch users
      const jsonData = await response.json(); // Convert response to JSON
      setData(jsonData); // Update state with fetched user data
    } catch (error) {
      console.error("Error fetching data:", error); // Log error if fetch fails
      alert("Failed to fetch user data. Please try again later."); // Show error message
    }
  }, []); // Use empty dependency array to call fetchData once on component mount

  useEffect(() => {
    fetchData(); // Call fetchData when component is mounted
  }, [fetchData]);

  // Update user details
  const onUpdate = async (updatedUser) => {
    try {
      const response = await axios.put(
        `${API_URL}/${updatedUser.id}`, // PUT request to update user by ID
        updatedUser // Send updated user data
      );
      if (response.status === 200) {
        fetchData(); // Re-fetch data after successful update
        alert("User details updated successfully!"); // Success message
        setShowModal(false); // Close the modal
      } else {
        console.error("Error updating user details:", response.status); // Log error if update fails
        alert("Failed to update user details."); // Show error message
      }
    } catch (error) {
      console.error("Error updating user details:", error); // Log error if Axios fails
      alert("Failed to update user details."); // Show error message
    }
  };

  // Delete a user by ID
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/${id}`); // DELETE request to delete user by ID
      if (response.status === 200) {
        fetchData(); // Re-fetch data after successful deletion
        alert("User deleted successfully!"); // Success message
      } else {
        alert("Error deleting user."); // Show error message if delete fails
      }
    } catch (error) {
      console.error("Error deleting user:", error); // Log error if Axios fails
      alert("Failed to delete user."); // Show error message
    }
  };

  // Show the modal for creating a new user
  const handleCreate = () => {
    setCreateBtn(true); // Set create mode flag to true
    setShowModal(true); // Open the modal
  };

  // Create a new user
  const onCreate = async (newUser) => {
    try {
      const response = await axios.post(API_URL, newUser); // POST request to create a new user
      if (response.status === 201) {
        fetchData(); // Re-fetch data after successful creation
        alert("New User created successfully!"); // Success message
        setShowModal(false); // Close the modal
        setCreateBtn(false); // Reset create mode flag
      } else {
        console.error("Error creating user:", response.status); // Log error if creation fails
        alert("Failed to create new user."); // Show error message
        setCreateBtn(false); // Reset create mode flag
      }
    } catch (error) {
      console.error("Error creating user:", error); // Log error if Axios fails
      alert("Failed to create new user."); // Show error message
      setCreateBtn(false); // Reset create mode flag
    }
  };

  // If no data is available, show a loading message
  if (!data) {
    return <div>Loading...</div>; // Show loading message while data is being fetched
  }

  return (
    <div className="table-container">
      <h1 className="heading">User Management Dashboard</h1>
      <Button onClick={handleCreate} className="create-btn">
        {" "}
        {/* Button to create a new user */}
        Create User
      </Button>
      <table>
        <thead>
          <tr>
            <th className="course-id">Id</th>
            <th className="course-name">First Name</th>
            <th className="course-name">Last Name</th>
            <th className="price">Email</th>
            <th className="instructor-name">Department</th>
            <th className="action">Action</th>
          </tr>
        </thead>
        <tbody>
          {/* Map over the data array and display user details in rows */}
          {data.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td> {/* Display user ID */}
              <td>{user.firstName}</td> {/* Display user's first name */}
              <td>{user.lastName}</td> {/* Display user's last name */}
              <td>{user.email}</td> {/* Display user's email */}
              <td>{user.department}</td> {/* Display user's department */}
              <td>
                <span className="pen">
                  <FontAwesomeIcon
                    icon={faPen} // Render "pen" icon for editing
                    onClick={() => handleShowModal(user)} // Show modal for editing user
                  />
                </span>
                <span className="delete">
                  <FontAwesomeIcon
                    icon={faTrash} // Render "trash" icon for deleting
                    onClick={() => handleDelete(user.id)} // Delete the user
                  />
                </span>
                <button
                  className="view"
                  onClick={() => handleShowViewModal(user)} // Show modal to view user details
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pass props to UserForm component to handle create/edit user */}
      <UserForm
        show={showModal}
        onClose={handleCloseModal}
        data={userToEdit}
        onUpdate={onUpdate}
        onCreate={onCreate}
        createBtn={createBtn}
      />

      {/* Pass selected user to ViewFormModal to display their details */}
      {selectedUser && (
        <ViewFormModal
          show={showViewModal}
          onHide={handleCloseViewModal}
          user={selectedUser}
        />
      )}
    </div>
  );
};

export default UserList; // Export UserList component for use in other parts of the application
