import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref,push, onValue,remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL:"https://notebookapp-45be7-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings);
const database = getDatabase(app)
const noteListAppDB = ref(database, "NoteBook");

const inputEL = document.getElementById("input")

const addButtonEL = document.getElementById("btn")

const noteListingApp =  document.getElementById("list")


addButtonEL.addEventListener('click',function(){
    let pushNote = inputEL.value
    push(noteListAppDB,pushNote)
    clearInputField()

    
})

onValue(noteListAppDB,function(snapshot){ 
    if(snapshot.exists()){
        let noteArray = Object.entries(snapshot.val())
        clearNoteList()
        for(let i=0; i<noteArray.length;i++){
            let currentNote =noteArray[i]
            let currentNoteID = noteArray[0]
            let noteArrayValue = noteArray[1];
            appendNoteIntoList(currentNote)
        }
    }
    else{
        noteListingApp.innerHTML = "No items here... yet"
    }

})

function appendNoteIntoList(note){
    let noteKey = note[0];
    let noteValue = note[1]

    let newEl = document.createElement("li");
    newEl.textContent =noteValue

    newEl.addEventListener('click',function(){
        let deleteNote = ref(database,`NoteBook/${noteKey}`)
        remove(deleteNote);
    })

    noteListingApp.append(newEl)
}

function clearInputField(){
    inputEL.value = "";
}

function clearNoteList(){
    noteListingApp.innerHTML = ""

}
