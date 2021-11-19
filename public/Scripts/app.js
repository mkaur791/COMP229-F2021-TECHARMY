// IIFE -- Immediately Invoked Function Expression
(function(){

    function Start()
    {
        console.log("App Started...");

        let deleteButtons = document.querySelectorAll('.delete');
        
        for(button of deleteButtons)
        {
            button.addEventListener('click', (event)=>{
                if(!confirm("Are you sure?")) 
                {
                    event.preventDefault();
                    window.location.assign('/');
                }
            });
        }
    }

    window.addEventListener("load", Start);

})();

const createQuesTypeChoice = (count) => {
    // creating select element
    let typeOptions =  document.createElement('select');
    typeOptions.classList.add('form-control') // adding class to select element
    typeOptions.id = "question"+count+"type" // assigning unique id to select element
    typeOptions.name = "question"+count+"type" // assigning unique name to select element
    typeOptions.setAttribute("required", ""); 
    // defining question type array
    let options = [{label:"Select Type",value:""},{label:"Single Textbox",value:"text"},{label:"Multiple Choice",value:"mcq"}]
    
    // appending options to select
    for(let i=0;i<options.length;i++){
        let op = document.createElement('option');
        op.innerHTML = options[i].label
        op.value = options[i].value
        typeOptions.appendChild(op)
    }

    // method to create input for option if selected type is 'mcq'(This will be on onchange event to select)
    typeOptions.onchange = function(event) {
        let optionInput = document.getElementById("question"+count+"type"+count+"option"+count);
 
        if(event.target.value == 'mcq'){
            if(!optionInput){
                // creating option input with add icon
                let optionInput = document.createElement('input')
                let addIcon = createAddIcon()
                console.log("optionInput",optionInput)
                optionInput.id = "question"+count+"options"
                optionInput.name = "question"+count+"options"
                optionInput.setAttribute("required", ""); 
                addIcon.id =  "question"+count+"add"
                let parent = document.getElementById("question"+count);
                parent.appendChild(optionInput)
                parent.appendChild(addIcon)

                // create next option field on add icon click
                addIcon.onclick = function(event){
                    event.preventDefault()
                    let nextOptionInput = document.createElement('input')
                    //assigning unique id to every option input
                    nextOptionInput.id = "question"+count+"options" 
                    nextOptionInput.name = "question"+count+"options"
                    nextOptionInput.setAttribute("required", ""); 
                    parent.appendChild(document.createElement('br'))
                    parent.appendChild(nextOptionInput)   
                }
                 
            }
        }
        else{
                let parent = typeOptions.parentElement
                for(let i=0;i<parent.childNodes.length;i++){
                    if(parent.childNodes[i].id.indexOf('option') !== -1)
                    parent.removeChild(parent.childNodes[i]);
                }
        }
    }
  
    return typeOptions;
}

var count =1
const appendQuesAns = () =>{
    // get the add form element
    let form = document.getElementById('add-form');

    // create a div element
    let div = document.createElement('div');
    div.classList.add('form-group','question-fields') // adding class to div
    div.id="question"+count // assigning unique id to each div

    // creating label for Question Type
    let labelType =  document.createElement('label');
    labelType.innerHTML = "Question Type"

    // creating label for Question
    let labelQues =  document.createElement('label');
    labelQues.innerHTML = "Question"

    // creating input element 
    let input =  document.createElement('input');
    input.classList.add("form-control"); // adding class to input 
    input.type = "text";
    input.name = "question"+count // assigning unique name to each input question
    input.id= "question"+count // assigning unique id to each input question 
    input.setAttribute("required", ""); 
    
    // appending all elements to parent div
    div.appendChild(labelQues)
    div.appendChild(input)
    div.appendChild(labelType)
    div.appendChild(createQuesTypeChoice(count))
    div.appendChild(document.createElement('br'))

    // appending div to form
    form.appendChild(div)
    let totalQuestions = document.getElementById('questionCount')
    totalQuestions.value = count
    count++
    return form;
}

//create add icon
const createAddIcon = () => {
    var button = document.createElement("button");
    button.setAttribute('class', 'btn btn-default add-option');
    var icon = document.createElement("span");
    icon.className ="fas fa-plus-circle";
    button.appendChild(icon);
    return button;
}

// remove qeustion
const removeQues = () => {
    $('.question-fields').click(function(){
        let id_check = $(this).attr("id");
        console.log(id_check);
        $("div").remove("#"+id_check);
    });
}
