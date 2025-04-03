import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { removedTask, toggleComplete, editTask } from "../redux/taskSlice"; // Add editTask action

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.text);

  const handleEdit = () => {
    if (isEditing && editedText.trim()) {
      dispatch(editTask({ id: task.id, newText: editedText }));
    }
    setIsEditing(!isEditing);
  };

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      {isEditing ? (
        <input
          type="text"
          className="form-control flex-grow-1"
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
        />
      ) : (
        <span
          className="flex-grow-1"
          style={{
            textDecoration: task.completed ? "line-through" : "none",
            cursor: "pointer",
          }}
          onClick={() => dispatch(toggleComplete(task.id))}
        >
          {task.text}
        </span>
      )}

      <button className="btn btn-primary btn-sm ms-3" onClick={handleEdit}>
        <i className={isEditing ? "fas fa-save" : "fas fa-edit"}></i>
      </button>

      <button
        className="btn btn-danger btn-sm ms-2"
        onClick={() => dispatch(removedTask(task.id))}
      >
        <i className="fa fa-trash" aria-hidden="true"></i>
      </button>
    </li>
  );
};

export default TaskItem;
