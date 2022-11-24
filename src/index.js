import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Notes} from "./contexts/NoteContext";

ReactDOM.render(
	<React.StrictMode>
		<Notes>
			<App />
		</Notes>
	</React.StrictMode>,
	document.getElementById('root')
);
