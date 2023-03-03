let addButton = document.getElementById('addB');
let addDialog = document.getElementById('addD');
let outputT = document.getElementById('outputText');
let row = null;
document.onload=displayData();
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
        var postData = [postTitle, postDate,postSummary];     

        if (row ==null){

            // save post into localStorage
            var postList = getPostList();
            
            postList.push({
                postTitle:  postTitle,
                postDate:  postDate,
                postSummary: postSummary,
             }); 
            localStorage.setItem("postList", JSON.stringify(postList));

            // add new data to table 
            addNewPostToTable(postData);

            outputT.innerHTML = "New Post Added!";
        } else {
            updatePost();
            outputT.innerHTML = "Post Updated!";
        }

        // reset values!!
        document.getElementById('postTitle').value = "";
        document.getElementById('postDate').value ="";
        document.getElementById('postSummary').value= "";

    }
});

function displayData(){
    var postList = getPostList();
    postList.forEach(function(element){
        let postData = [element.postTitle, element.postDate, element.postSummary]
        addNewPostToTable(postData);
    });
}


function addNewPostToTable(postData){
    // create post on table
    var newPost = postList.insertRow();
    var cell1 = newPost.insertCell(0);
    var cell2 = newPost.insertCell(1);
    var cell3 = newPost.insertCell(2);
    
    cell1.innerHTML = postData[0];
    cell2.innerHTML = postData[1];
    cell3.innerHTML = postData[2];
    newPost.insertCell(3).innerHTML = `<button onclick = editPost(this)>Edit
    <i class="fa-solid fa-pen"></i>
    </button>
    <button onclick = removePost(this)>Delete
    <i class="fa-solid fa-trash-can"></i>
    </button>`;
}

function updatePost() {
    // update post on table
    row.cells[0].innerHTML = document.getElementById("postTitle").value;
    row.cells[1].innerHTML = document.getElementById("postDate").value;
    row.cells[2].innerHTML = document.getElementById("postSummary").value;

    //update in storage
    var postList = getPostList();
    postList[row.rowIndex-1].postTitle = document.getElementById("postTitle").value; 
    postList[row.rowIndex-1].postDate = document.getElementById("postDate").value;
    postList[row.rowIndex-1].postSummary = document.getElementById("postSummary").value;
    localStorage.setItem("postList", JSON.stringify(postList));

    row = null;
}

function editPost(cellVal) {
    // edit post on table
    addDialog.showModal();
    row = cellVal.parentElement.parentElement; // tr
  /*  document.getElementById("postTitle").value = row.cells[0].innerHTML;
    document.getElementById("postDate").value = row.cells[1].innerHTML;
    document.getElementById("postSummary").value = row.cells[2].innerHTML; */

    // get in storage
    var postList = getPostList();
    document.getElementById("postTitle").value = postList[row.rowIndex-1].postTitle;
    document.getElementById("postDate").value = postList[row.rowIndex-1].postDate;
    document.getElementById("postSummary").value = postList[row.rowIndex-1].postSummary;

}

function removePost(cellVal){
    row = cellVal.parentElement.parentElement; // tr

    // delete from storage
    var postList = getPostList();
    postList.splice(row.rowIndex-1, 1);
    localStorage.setItem("postList", JSON.stringify(postList));

    // delete post on table
    document.getElementById("postList").deleteRow(row.rowIndex);

    row = null;

    outputT.innerHTML = "Post Deleted!";
}

function getPostList(){
    var postList;
    if (localStorage.getItem("postList")==null){
        postList = [];
    } else {
        postList = JSON.parse(localStorage.getItem("postList"));
    }
    return postList;
}

