var dialogContent = [];
var editor = document.getElementById("editor");
var select = document.getElementById("dialogs");
var dialogName = document.getElementById("dname");
var removeButton = document.getElementById("removeBtn");
var clearButton = document.getElementById("clearBtn");

var enterKeyCode = 13;
var tabKeyCode = 9;
var rightArrowKeyCode = 39;

// Saves the editor.value to the selected dialog index every 500ms
var saveState = setInterval(saveEditor, 500);
// Disables editor if no dialog is selected or a dialog is being made
var editorToggle = setInterval(ToggleEditor, 200);

// Adds a new option on the drop-down list
function addOption(name){
    if(name){
        var newObj = {
            name: name,
            content: ""
        }
        if(dialogContent.length == 0)
            newObj.content = editor.value;
        dialogContent.push(newObj);  
    }
    console.log("ON ADD =>");
    console.log(dialogContent);
}

function UpdateSelect(){
    clearSelect();
    for(i = 0; i < dialogContent.length; i++){
        var option = document.createElement("option");
        option.text = option.value = (i+1) + " - " + dialogContent[i].name;
        select.add(option, select.length);
    } 
}

// Removes selected option on the drop-down
function removeSelectedOption(){
    var toRemove = select.selectedIndex;

    // Remove option from list of objects and update select
    dialogContent.splice(toRemove - 1, 1);
    UpdateSelect();

    // If removed was not last, select the new option at toRemove index
    if(toRemove < select.length){
        select.selectedIndex = toRemove;
    } else {
        select.selectedIndex = select.length - 1;
    }
        
    if(select.length <= 1)
        select.innerHTML = "<option value='' disabled selected>Adicione um Diálogo para Editar</option>";
    console.log("ON REMOVE =>");
    console.log(dialogContent);
    
    fetchEditor();
}

function findArrayPositionFromName(name){
    var splitedName = name.split("-");
    var cleanPositionStr = splitedName[0].trim();

    return parseInt(cleanPositionStr);
}

// Clears drop-down list
function clearSelect(){
    for(i = select.length-1; i >= 0 ; i--){
        select.selectedIndex = i;
        select.remove(select.selectedIndex);
    }
    select.innerHTML = "<option value='' disabled selected>Adicione um Diálogo para Editar</option>";
    editor.value = "";
}

function clearArray(){
    dialogContent = [];
    UpdateSelect();
    select.selectedIndex = 0;
}

function saveFile(){
    var content = "";
    for(i = 0; i < select.length; i++)
        content += select.options[i].value + "\n";
    
    uriContent = "data:application/octet-stream," + encodeURIComponent(content);
    document.getElementById("dlink").innerHTML = "<a href=" + uriContent + " download=\"savedfile.txt\">Here is the download link</a>";
}

function loadFileAsText(){
    var fileReader = new FileReader();
    var userFile = document.getElementById("userFile").files[0];
    
    fileReader.addEventListener("loadend", function() {
        var textFileAsString = fileReader.result;
        var strings = textFileAsString.split("\n");

        clearArray();
        
        for(i = 0; i < strings.length; i++){
            addOption(strings[i]);
        }
    });
    fileReader.readAsText(userFile);
}

function saveEditor(){
    if(dialogContent.length > 0 && select.selectedIndex > 0)
        dialogContent[select.selectedIndex - 1].content = editor.value;   
}

function fetchEditor(){
    var indexToFetchFrom = select.selectedIndex-1;
    var contentBox = dialogContent[indexToFetchFrom];

    ToggleEditor();

    if(contentBox)
        editor.value = contentBox.content;
    else 
        console.log("Nothing in the contents of index " + indexToFetchFrom);
}

function atualizarEditor(){
    fetchEditor();
}

function ToggleEditor(){
    if(dialogName.value != "" || dialogContent.length == 0){
        editor.disabled = true;
    } else {
        editor.disabled = false;
    }
}

function addValue(){
    if(dialogName.value){
        addOption(dialogName.value);
        dialogName.value = "";
    
        UpdateSelect();
        select.selectedIndex = select.length - 1;

        fetchEditor();
    }
    toggleFocus();
}

function toggleFocus(){
    var activeElement = document.activeElement;
    if(activeElement.id == "addDialogBtn" ||
       activeElement.id == "dname" ){
        editor.focus();
    } else if(activeElement.id == "downloadBtn"){
        dialogName.focus();
    }
}

document.onkeypress = function (e) {
    e = e || window.event;
    // Handles ENTER key press
    if(e.keyCode == enterKeyCode)
        addValue();     
};


// Handles TAB button press
document.addEventListener("keyup", event => {
    if (event.isComposing || event.keyCode === tabKeyCode)
        toggleFocus();
});

removeButton.addEventListener("click", function(){
    if(confirm("Do you really want to remove the selected option?"))
        removeSelectedOption();
});

clearButton.addEventListener("click", function(){
    if(confirm("Do you really want to clear ALL the dialog?\nBe reminded that if you don't save it, it's lost."))
        clearArray();
});
