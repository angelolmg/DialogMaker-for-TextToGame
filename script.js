var dialogContent = [];

/*
function setupActions() {
    var selectAction = document.createElement('select');
    var title = document.createElement('option');
    title.text = title.value = "Selecione ação";
    title.disabled = title.selected = true;

    selectAction.add(title,0)

    for(i = 0; i < actions.length; i++){
        var option = document.createElement('option');
        option.text = option.value = actions[i];
        selectAction.add(option,selectAction.length);
    }
    selectAction.className = "editorSelection";
    selectAction.addEventListener("change", function(){
        var selectedOption = selectAction.options[selectAction.selectedIndex].value[0];
        handleAction(selectedOption);

    });

    return selectAction;
}

function handleAction(selectedOption){
    var editorRegion = document.getElementById("editorRegion");
    switch(selectedOption){
        case '1':
            var nameSelector = document.getElementById("names");
            var inputRegion = document.createElement("input");
            inputRegion.placeholder = "Digite a fala do personagem";
            inputRegion.class = inputRegion.name = "selectedName";
            editorRegion.append(nameSelector);
            editorRegion.append(inputRegion);

            editorRegion.innerHTML.append("<br>");
            console.log(selectedOption);
    }
}
*/
// Adds a new option on the drop-down list
function addOption(name){
    if(name){
        var newObj = {
            name: name,
            content: ""
        }
        dialogContent.push(newObj);

        saveEditor();
        atualizarSelect();
        fetchEditor(); 
    }
}

function atualizarSelect(){
    var select = document.getElementById("dialogs");

    clearSelect();
    for(i = 0; i < dialogContent.length; i++){
        var option = document.createElement("option");
        option.text = option.value = i + " - " + dialogContent[i].name;
        select.add(option, select.length);
        select.selectedIndex = select.length-1;
    }
}

// Removes selected option on the drop-down
function removeSelectedOption(){
    var select = document.getElementById("dialogs");
    var toRemove = select.selectedIndex;
    var nameToRemove = select.options[toRemove].value;

    if(select.length > 1){
        dialogContent.splice(findArrayPositionFromName(nameToRemove), 1);
        atualizarSelect();
        select.selectedIndex = toRemove;
    } else {
        select.innerHTML = "<option value='' disabled selected>Adicione um Diálogo para Editar</option>";
    }

    fetchEditor();
}

function findArrayPositionFromName(name){
    var splitedName = name.split("-");
    var cleanPositionStr = splitedName[0].trim();

    return parseInt(cleanPositionStr);
}

// Clears drop-down list
function clearSelect(){
    var select = document.getElementById("dialogs");
    for(i = select.length-1; i >= 0 ; i--){
        select.selectedIndex = i;
        select.remove(select.selectedIndex);
    }
    select.innerHTML = "<option value='' disabled selected>Adicione um Diálogo para Editar</option>";
    fetchEditor();
}

function clearArray(){
    dialogContent = [];
    atualizarSelect();
}

function saveFile(){
    var select = document.getElementById("dialogs");
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
    var selector = document.getElementById("dialogs");
    var editor = document.getElementById("editor");
/*
    var actualContent = editor.value;
    var actualIndex = selector.selectedIndex;

    if(actualIndex)
        dialogContent[actualIndex-1].content = actualContent;*/
}

function fetchEditor(){
    var selector = document.getElementById("dialogs");
    var editor = document.getElementById("editor");
/*
    var actualIndex = selector.selectedIndex;
    if(actualIndex){
        var actualContent = dialogContent[actualIndex-1].content;
        editor.value = actualContent;
    } */
}

function atualizarEditor(){
    saveEditor();
    fetchEditor();

    //console.log("HI");
    //document.getElementById("editorRegion").append(setupActions());
    //document.getElementById("bottomDivider").insertAdjacentElement("beforebegin", select);

}

document.getElementById("addBtnDialog").addEventListener("click", function(){
    var dialog = document.getElementById("dname");
    addOption(dialog.value);
    dialog.value = "";
});
