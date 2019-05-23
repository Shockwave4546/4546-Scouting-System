const teamdataList = document.querySelector('#teamdata-list');
const form = document.querySelector('#add-teamdata-form');

// create element & render teamdata
function renderteamdata(doc){
    let li = document.createElement('li');
    let matchNum = document.createElement('span');
    let scoutedTeam = document.createElement('span');
    let cross = document.createElement('div');

    li.setAttribute('data-id', doc.id);
    matchNum.textContent = doc.data().matchNum;
    scoutedTeam.textContent = doc.data().scoutedTeam;
    cross.textContent = 'x';

    li.appendChild(matchNum);
    li.appendChild(scoutedTeam);
    li.appendChild(cross);

    teamdataList.appendChild(li);

    // deleting data
    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('teamdata').doc(id).delete();
    });
}

// getting data
// db.collection('teamdata').orderBy('scoutedTeam').get().then(snapshot => {
//     snapshot.docs.forEach(doc => {
//         renderteamdata(doc);
//     });
// });

// saving data
form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('teamdata').add({
        matchNum: form.matchNum.value,
        scoutedTeam: form.scoutedTeam.value
    });
    form.matchNum.value = 0;
    form.scoutedTeam.value = 0;
});

// real-time listener
db.collection('teamdata').orderBy('scoutedTeam').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        console.log(change.doc.data());
        if(change.type == 'added'){
            renderteamdata(change.doc);
        } else if (change.type == 'removed'){
            let li = teamdataList.querySelector('[data-id=' + change.doc.id + ']');
            teamdataList.removeChild(li);
        }
    });
});

// updating records (console demo)
// db.collection('teamdata').doc('DOgwUvtEQbjZohQNIeMr').update({
//     matchNum: 'mario world'
// });

// db.collection('teamdata').doc('DOgwUvtEQbjZohQNIeMr').update({
//     scoutedTeam: 'hong kong'
// });

// setting data
// db.collection('teamdata').doc('DOgwUvtEQbjZohQNIeMr').set({
//     scoutedTeam: 'hong kong'
// });