// javascript
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = { 
    databaseURL: 
    "https://realtime-database-184c7-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementListInDb = ref(database, "endorsements")

const inputFieldEl = document.getElementById("input-field")
const toEl = document.getElementById("to-el")
const fromEl = document.getElementById("from-el")
const publishBtn = document.getElementById("publish-btn")
const endorsementListEl = document.getElementById("endorsement-list")

publishBtn.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    let toValue = toEl.value
    let fromValue = fromEl.value
    push(endorsementListInDb, {inputValue, toValue, fromValue})
    clearInputFieldEl()
})

function clearInputFieldEl() {
    inputFieldEl.value = ""
    toEl.value = ""
    fromEl.value = ""
}

onValue(endorsementListInDb, function(snapshot){
    if (snapshot.exists()) {
        let endorsementArray = Object.values(snapshot.val())
        
        clearEndorsementListEl()
            
        for (let i = 0; i < endorsementArray.length; i++) {
            let currentEndorsement = endorsementArray[i]
            
            appendEndorsementToList(currentEndorsement)
        }
    } else {
        endorsementListEl.innerHTML = ""
    }
})

function clearEndorsementListEl() {
    endorsementListEl.innerHTML = ""
}

function appendEndorsementToList(item) {
    const listItems = document.createElement('li')
    listItems.innerHTML += `<span class="span1">To: ${item.toValue}</span> <span class="span2">${item.inputValue}</span> <span class="span3">From: ${item.fromValue}</span>`
    endorsementListEl.appendChild(listItems)
}