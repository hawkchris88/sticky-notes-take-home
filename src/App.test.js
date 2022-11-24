import '@testing-library/jest-dom';
import {fireEvent, render, screen} from '@testing-library/react';
import App from './App';
import {noteStoreKey} from "./utils/constants";

const dummyNote = {
    id: 1, text: 'We are testing', x: 100, y: 100, width: 200, height: 200
}

test('renders without crashing', () => {
    render(<App/>);
});

test("loads note from local storage", ()=> {
    localStorage.setItem(noteStoreKey, JSON.stringify([dummyNote]))
    render(<App/>);
    const note = screen.getByText(dummyNote.text)
    expect(note).toBeInTheDocument();
});
