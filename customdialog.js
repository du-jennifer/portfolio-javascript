let alertButton = document.getElementById('alertB');
let confirmButton = document.getElementById('confirmB');
let promptButton = document.getElementById('promptB');
let alertDialog = document.getElementById('alertD');
let confirmDialog = document.getElementById('confirmD');
let promptDialog = document.getElementById('promptD');
let outputT = document.getElementById('outputText');

alertButton.addEventListener('click',() => {
    alertDialog.showModal();
});

confirmButton.addEventListener('click',() => {
    confirmDialog.showModal();
});

confirmDialog.addEventListener('close',() => {
    let text = "The value returned by the confirm method is: ";
    if (confirmDialog.returnValue == "submit"){
        text = text.concat("OK");
    } else {
        text = text.concat("Cancel");
    } 
    outputT.innerHTML = text;
   //document.getElementById('outputText').innerHTML = text;
});

promptButton.addEventListener('click',() => {
    promptDialog.showModal();
});

promptDialog.addEventListener('close',() => {
    let text = "The value returned by the prompt method is: ";
    let nameText = document.getElementById('inName').value;
    if (promptDialog.returnValue == "submit"){
        let cleanName = DOMPurify.sanitize(nameText);
        text = text.concat(cleanName);
    } else {
        text = "User didn’t enter anything";
    } 
    outputT.innerHTML = text;
});

