const cafeList = document.querySelector('#cafe-list');
const form = document.querySelector('#add-cafe-form');

// create element & render cafe
function renderCafe(doc){
    let li = document.createElement('li');
    let matchNum = document.createElement('span');
    let scoutedTeam = document.createElement('span');
    let matchType = document.createElement('span');
    let notes = document.createElement('span');
    let cross = document.createElement('div');

    li.setAttribute('data-id', doc.id);
    matchNum.textContent = doc.data().matchNum;
    scoutedTeam.textContent = doc.data().scoutedTeam;
    matchType.textContext = doc.data().matchType;
    notes.textContext = doc.data().notes;
    cross.textContent = 'x';

    li.appendChild(matchNum);
    li.appendChild(scoutedTeam);
    li.appendChild(matchType);
    li.appendChild(notes);
    li.appendChild(cross);

    cafeList.appendChild(li);

    // deleting data
    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('cafes').doc(id).delete();
    });
}

// getting data
// db.collection('cafes').orderBy('scoutedTeam').get().then(snapshot => {
//     snapshot.docs.forEach(doc => {
//         renderCafe(doc);
//     });
// });

// saving data
form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('cafes').add({
        matchNum: form.matchNum.value,
        scoutedTeam: form.scoutedTeam.value,
        matchType: form.matchType.value,
        notes: form.notes.value
    });
    form.matchNum.value = '';
    form.scoutedTeam.value = '';
    form.matchType.value = '';
    form.notes.value = '';
});

// real-time listener
db.collection('cafes').orderBy('scoutedTeam').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        console.log(change.doc.data());
        if(change.type == 'added'){
            renderCafe(change.doc);
        } else if (change.type == 'removed'){
            let li = cafeList.querySelector('[data-id=' + change.doc.id + ']');
            cafeList.removeChild(li);
        }
    });
});

// updating records (console demo)
// db.collection('cafes').doc('DOgwUvtEQbjZohQNIeMr').update({
//     matchNum: 'mario world'
// });

// db.collection('cafes').doc('DOgwUvtEQbjZohQNIeMr').update({
//     scoutedTeam: 'hong kong'
// });

// setting data
// db.collection('cafes').doc('DOgwUvtEQbjZohQNIeMr').set({
//     scoutedTeam: 'hong kong'
// });