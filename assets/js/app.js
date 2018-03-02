// TriviaGame

function replay() {
    location.reload();
}
// 
$(document).ready(startGame);
    
//  global variables
    var count=41;
    var counter; 
    var counterQuestionNumber = 0;
    var jumpQuestion = true;
    var unanswered = 0;
    var corrects = 0;
    var incorrects = 0;
    var questions = [

//        question1
        {
            questionNumber:1,
            theQuestion:"Who's won the most NBA Championships all-time?",
            theUserAnswer:null,
            theCorrectAnswer:3,
            possibleAnswers:['Michael Jordan','Magic Johnson','Kobe Bryant', 'Bill Russell', 'Tim Duncan'],
        },
//        question2
        {
            questionNumber:2,
            theQuestion:"Who's won the most PGA Championships all-time?",
            theUserAnswer:null,
            theCorrectAnswer:1,
            possibleAnswers:['Arnold Palmer','Jack Nicklaus','Tiger Woods','Walter Hagen','Ben Hogan'],
        },
//        question3
        {
            questionNumber:3,
            theQuestion:"Which of these all-time tennis greats did not complete the career grand slam?",
            theUserAnswer:null,
            theCorrectAnswer:2,
            possibleAnswers:['Rafael Nadal','Rod Laver','Pete Sampras','Roger Federer','Serena Williams','Steffi Graf'],
        },
//        question4
        {
            questionNumber:4,
            theQuestion:"He is the only one of these NBA players who won either the MVP or Defensive Player of the Year trophy; not both.",
            theUserAnswer:null,
            theCorrectAnswer:4,
            possibleAnswers:['Hakeem Olajuwon','Kevin Garnett','David Robinson','Michael Jordan','Tim Duncan'],
        },        
//        question5
        {
            questionNumber:5,
            theQuestion:"The only artiste on this list who's had a number 1 album on the billboard charts",
            theUserAnswer:null,
            theCorrectAnswer:4,
            possibleAnswers:['Tina Turner','Bob Marley','Dr Dre','Sting','Santana','Cher'],
        }       
     
            
    ]

// end of questions

function startGame(){
    $('#start').click(start);
}
//    ********************************
function start(){
    $('#start').hide();
    $('#next').removeClass('invisible');
    counter = setInterval(timer, 1000); 
    timer();
    getQuestionAnswers();
    getClickedID();
    clickNext();
}
//    ********************************
function timer(){
    count--;
    if (count <= 0){
        clearInterval(counter);
        showResults();
        showSorry();
    }
    $("#timer").text(count + " secs"); 
}
//    ********************************
function getQuestionAnswers(){
    createQuestion();
    for (var g = 0; g<questions[counterQuestionNumber].possibleAnswers.length; g++){
        createAnswers(g,questions[counterQuestionNumber].possibleAnswers[g]);    
    }
}
//    ********************************
function createQuestion(){
    var container = $('#answersArea');
    var question = questions[counterQuestionNumber].theQuestion;
    var questionSpanOpenTag = '<span class="mx-auto text-center">';
    var questionSpanCloseTag = '</span>';
    var questionComplete = questionSpanOpenTag+question+questionSpanCloseTag;
    container.append(questionComplete);
}
//    ********************************
function createAnswers(radioID,ans){
    var container = $('#answersArea');
    var labelOpenTag = '<label class="custom-control custom-radio">';
    var input = '<input id="'+radioID+'" name="radio-stacked" type="radio" class="custom-control-input">'
    var spanIndicator = '<span class="custom-control-indicator"></span>';
    var spanDescription = '<span class="custom-control-description">'+ans+'</span>';
    var labelCloseTag = '</label>';
    var radioComplete = labelOpenTag+input+spanIndicator+spanDescription+labelCloseTag;
    container.append(radioComplete); 
}
//    ********************************
function getClickedID(){
    $( "#answersArea" ).click(function(event) {
        var target = $( event.target );
        if ( target.is( "input" ) ) {
            questions[counterQuestionNumber].theUserAnswer = event.target.id;
        }
    });
}
//    ********************************
function checkIfCorrect(){
    if (questions[counterQuestionNumber].theUserAnswer == questions[counterQuestionNumber].theCorrectAnswer){
        corrects++;
    }else{
        incorrects++;
    }
}
//    ********************************
function clickNext(){
    $('#next').click(next);
} 
//    ********************************
function next(){
    checkIfCorrect();
    if (counterQuestionNumber < 4){
        counterQuestionNumber++;
        clear();
        getQuestionAnswers();
    }else{
        showResults();
    }
}    
//    ********************************
function clear(){
    $('#answersArea').empty();
}
//    ********************************
function showResults(){
    clearInterval(counter);
    clear();
    
    createResults(corrects,incorrects);
    $('#next').hide();
    $("#timer").hide();
    showReplay();
}
//    ********************************
function showUnaswered(){
    for (var i =0; i<questions.length; i++){
        if (questions[i].theUserAnswer == null){
            unanswered++;
        }
    }
    var container = $('#answersArea');
    var spanUnaswered = '<span id="unansweredSpan">You had '+unanswered+' unanswered questions</span>';
    container.append(spanUnaswered);
}   
//    ********************************    
function showSorry(){
    var container = $('#answersArea');
    var sorry = '<span class="text-center" id="SORRY">SORRY, TIME OUT</span>';
    container.prepend(sorry);
}
//    ********************************    
function showReplay(){
    $('#replayArea').removeClass('invisible');
}   
//    ********************************
function createResults(co,inc){
    showUnaswered();
    var container = $('#answersArea');
    var spanCorrect = '<span id="correctSpan">You had '+co+' correct questions</span>';
    var spanIncorrects = '<span id="incorrectSpan">You had '+inc+' incorrect questions</span>';
    var allResults = spanCorrect+spanIncorrects;
    container.append(allResults);
}

 
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    

    