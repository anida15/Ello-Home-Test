import React, { useEffect, useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import '../App.css';  
import SideBar from '../navigation/Siderbar';
import { useLocation } from 'react-router-dom';
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

 

function StudentTeacher() {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const query = useQuery();
  const actionStatus = query.get('status');
  const [removeButton, setRemoveButton] = useState(false);
  const [alertmsg, setAlertmsg]  = useState(false);
  const [message, setMessage] = useState('');
  const [indexHolder, setIndexHolder] = useState('');


  useEffect(() =>{
    if(actionStatus ==='student'){
      setRemoveButton(false);
    } else if(actionStatus === 'teacher'){
      setRemoveButton(true);
    }else{
      setRemoveButton(false);
    }},[actionStatus,setRemoveButton]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const existingBooksJSON = localStorage.getItem('books');
        if (existingBooksJSON) {
          setBooks(JSON.parse(existingBooksJSON));
        }
        
      } catch (err) {
       console.log(err);
      }
    };

    fetchBooks();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSuggestions([]);
      return;
    }

    const filteredSuggestions = books
      .filter(book => book.title.toLowerCase().includes(searchQuery.toLowerCase()))
      .slice(0, 5);  
    setSuggestions(filteredSuggestions);
  }, [searchQuery, books]);

  const handleSearchChange = (event, value) => {
    setSearchQuery(value);
  };



  const handIndexHolder = (index) => () => {

    setIndexHolder(index);
    setAlertmsg(true);
    setMessage('Remove '+ books[index].author + ' Book`s From List');
  }


  const handRemoveBook = (index) => () => {
    console.log('Removed book', books[index]);
    const updatedBooks = [...books];
    updatedBooks.splice(index, 1);  
    setBooks(updatedBooks);
    localStorage.setItem('books', JSON.stringify(updatedBooks));  
    setAlertmsg(false);
  };

  const cancelAlertMsg = () =>{
    setAlertmsg(false);
    setMessage('');
  }
  
  const filteredBooks = books.filter(book => book.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="content flex-grow">
      < SideBar />
      <div className="home-brand-name">
        <p className={`${ removeButton ? 'block':'hidden'} p-3 text-white   text-xl text-gray-700 font-mono font-bold uppercase`}>
          Teachers Assigning List
        </p>
        <p className={`${ removeButton ? 'hidden':'block'} p-3 text-white bg-gradient-to-r from-gray-900 text-xl text-gray-700 font-mono font-bold uppercase`}>
         Students Reading List
        </p>
      </div>
      <div className="flex items-center justify-center bg-white p-4 rounded shadow-lg my-4">
        <Autocomplete
          freeSolo
          options={suggestions.map(book => book.title)}
          inputValue={searchQuery}
          onInputChange={handleSearchChange}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search for Books"
              variant="outlined"
              fullWidth
            />
          )}
          className="w-1/3"
        />
      </div>
      {filteredBooks.length === 0 ? (
        <div className="flex justify-center items-center h-full">
          <p className="text-xl text-gray-700 font-mono">No books found</p>
        </div>
      ) : (
        <div className="device-content grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 mb-4 p-3">
          {filteredBooks.map((book, index) => (
            <div key={index} className="device flex flex-col items-center border rounded-lg bg-white shadow-3xl">
              <img className="  w-80 h-80 pt-3" src={book.coverPhotoURL} alt={book.title} />
              <div class="bg-gray-100 rounded-lg p-6 shadow-md h-36 self-start w-full">
                  <p class="text-base text-gray-800 font-semibold">Title: <span class="text-gray-600">{book.title}</span></p>
                  <p class="text-base text-gray-700 font-normal">Author: <span class="italic">{book.author}</span></p>
                  <p class="text-base text-gray-700 font-normal">Reading Level: <span class="font-semibold">{book.readingLevel}</span></p>
              </div>
              <div className={`${ removeButton ? 'block':'hidden'} border rounded cursor-pointer bg-red-500 p-3 flex justify-center items-center flex-row`}>
                <p onClick={handIndexHolder(index)}  className={`ml-2`} >REMOVE TO READING LIST</p>
              </div>
            </div>
          ))}
        </div>
      )}

            <div className={`alert-message shadow-3xl  text-white fixed inset-0 flex items-center justify-center z-50 ${alertmsg ? 'block' : 'hidden'}`}>
                    <div className="w-auto h-auto opacity-100 bg-gray-600 text-white  flex flex-col items-center justify-center shadow-2xl   text-gray-800 p-3 rounded-lg  ">
                        <span className=" text-white mb-2">{message}</span>

                        <div className='flex justify-between w-full'>

                        <button onClick={cancelAlertMsg} 
                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600  "
                        > NO </button> 

                        <button onClick={handRemoveBook(indexHolder)} 
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600  "
                        > YES</button>
                        </div>
                </div>
     </div>
    </div>
  );
}

export default StudentTeacher;
