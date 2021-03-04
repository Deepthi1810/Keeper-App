import React, { useState ,useEffect} from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios";



// const exercise = {
//   username: this.state.username,
//   description: this.state.description,
//   duration: this.state.duration,
//   date: this.state.date
// }
//
// console.log(exercise);
//
// axios.post('http://localhost:5000/exercises/add', exercise)
//   .then(res => console.log(res.data));
//
// window.location = '/';
// }


function App() {


  const [notes, setNotes] = useState([]);

useEffect(function(){
  axios.get('http://localhost:5000/')
    .then((response) => {
      //console.log(response.data);
    setNotes(response.data);
      })

      // console.log(notes);

    .catch((error) => {
      console.log(error);
    })

})



  function addNote(newNote) {

    axios.post("http://localhost:5000/",newNote)
    .then( res => console.log(res.data));

    setNotes(prevNotes => {
      return [...prevNotes, newNote];
    });
  
  }

  function deleteNote(id) {
    axios.delete("http://localhost:5000/delete/"+id)
     .then(res => console.log(res.data))

    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />

      { notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={noteItem._id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
