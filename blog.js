let addButton = document.getElementById('addB');
let addDialog = document.getElementById('addD');
let outputT = document.getElementById('outputText');
var row = null;

addButton.addEventListener('click',() => {
    addDialog.showModal();
});

addDialog.addEventListener('close',() => {
    let titleText = document.getElementById('postTitle').value;
    let dateText = document.getElementById('postDate').value;
    let summaryText = document.getElementById('postSummary').value;
    if (addDialog.returnValue == "submit"){
        // read values

        // clean title input 
        let cleanTitle = DOMPurify.sanitize(titleText);
        titleText = cleanTitle;
        // clean summary input
        let cleanSummary = DOMPurify.sanitize(summaryText);
        summaryText = cleanSummary;

        let postTitle =  titleText;
        let postDate = dateText;
        let postSummary = summaryText;
        // postData["postTitle"] = titleText;
        // postData["postDate"] = dateText;
        // postData["postSummary"] = summaryText;
        // outputT.innerHTML = postData[0] + " " + postData[1] + " " + postData[2];
        // outputT.innerHTML = titleText + dateText + summaryText;
        var postData = [postTitle, postDate,postSummary];
        //outputT.innerHTML = postData[0] + " " + postData[1] + " " + postData[2];

        var getData = storeAndGetPost(postData);

        if (row ==null){
//            addNewPost(postData);
            addNewPost(getData);
            outputT.innerHTML = "insert";
        } else {
            updatePost();
            outputT.innerHTML = "update";
        }

       // outputT.innerHTML = titleText.concat(dateText).concat(summaryText);
    } /* else {
        titleText = "";
        dateText = "";
        summaryText = "";
    }  */
});

function storeAndGetPost(postData){
    // store local storage
    var title = localStorage.setItem("Title",postData[0]);
    var date = localStorage.setItem("Date", postData[1]);
    var summary = localStorage.setItem("Summary", postData[2]);

    //get local values to put in table
    var getTitle = localStorage.getItem("Title",title);
    var getDate = localStorage.getItem("Date", date);
    var getSummary = localStorage.getItem("Summary", summary);

    var getData = [getTitle,getDate,getSummary];
    return getData;
}


function addNewPost(postData){
    console.log("added");
    // outputT.innerHTML = postData[0] + " " + postData[1] + " " + postData[2];
    //outputT.innerHTML = "hi";
    //let tableBody = document.getElementById("postList").getElementsByTagName("tbody")[0];
    //let newPost = tableBody.insertRow(table.length);
    var newPost = postList.insertRow();
    var cell1 = newPost.insertCell(0);
    var cell2 = newPost.insertCell(1);
    var cell3 = newPost.insertCell(2);
    /*var cell4 = newPost.insertCell(3);
    var cell4 = newPost.insertCell(4); */
    
    cell1.innerHTML = postData[0];
    cell2.innerHTML = postData[1];
    cell3.innerHTML = postData[2];
    newPost.insertCell(3).innerHTML = `<button onclick = editPost(this)>Edit</button>
    <button onclick = removePost(this)>Delete</button>`;
    outputT.innerHTML = "inside";
    console.log("adde2");
}

function editPost(cellVal) {
    console.log("pressed");
    outputT.innerHTML = "shownfirst";
    addDialog.showModal();
    outputT.innerHTML = "shownt";
    row = cellVal.parentElement.parentElement; // tr
    document.getElementById("postTitle").value = row.cells[0].innerHTML;
    document.getElementById("postDate").value = row.cells[1].innerHTML;
    document.getElementById("postSummary").value = row.cells[2].innerHTML;
}

function updatePost() {
    console.log("upadred");
    row.cells[0].innerHTML = document.getElementById("postTitle").value;
    row.cells[1].innerHTML = document.getElementById("postDate").value;
    row.cells[2].innerHTML = document.getElementById("postSummary").value;
    row = null;
}

function removePost(cellVal){
    row = cellVal.parentElement.parentElement; // tr
    document.getElementById("postList").deleteRow(row.rowIndex);
    row = null;
}

