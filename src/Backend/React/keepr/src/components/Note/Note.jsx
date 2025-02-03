import '../../App.css';

import PropTypes from 'prop-types'; // Importar PropTypes

const Note = ({ title, content }) => {
    return (
        <div className="note">
            <h1>{title}</h1>
            <p>{content}</p>
        </div>
    );
};

// Definir PropTypes
Note.propTypes = {
    title: PropTypes.string.isRequired, // title debe ser un string y es obligatorio
    content: PropTypes.string.isRequired, // content debe ser un string y es obligatorio
};

export default Note;