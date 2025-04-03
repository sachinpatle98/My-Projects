export const formatDate = (timestamp) => {
    const date = new Date(timestamp);

    // Date format (DD-MM-YYYY)
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;

    // Time format (hh:mm:ss AM/PM)
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';

    // Convert hours from 24-hour to 12-hour format
    hours = hours % 12;
    hours = hours ? String(hours).padStart(2, '0') : '12'; // If hours are 0, set it to 12 for AM/PM

    const formattedTime = `${hours}:${minutes}:${seconds} ${ampm}`;

    return `${formattedDate} ${formattedTime}`; // Combine Date and Time
};  