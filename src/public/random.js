var lsQuestion = [];
var lsRandomDone = [];
var lsAnswer = [];
var method = "1";
var isShowTextArea = false;
var dataQuestion = null;
var dataAnswer = null;

function getLsIndAnswer(content, type) {
  let format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  let arrayInd = [];
  for (let i = 0; i < content.length; i++) {
    switch (type) {
      case 1:
        if (!isNaN(parseInt(content[i])) && format.test(content[i + 1])) {
          arrayInd.push(i);
        }
        break;
      case 2:
        if (i == 0) arrayInd.push(i);
        if (
          (content[i] == "A" ||
            content[i] == "B" ||
            content[i] == "C" ||
            content[i] == "D") &&
          i > 10 &&
          content[i + 1] != " " &&
          format.test(content[i + 1])
        ) {
          arrayInd.push(i);
        }
        break;
    }
  }
  return arrayInd;
}
function AddQuestion() {
  var dataInp = $("#input-questions").val();
  if (dataInp) {
    lsQuestion = [];
    lsRandomDone = [];
    let arrayInd = getLsIndAnswer(dataInp, 1);
    let arrObjQs = [];
    if (arrayInd.length > 0) {
      for (let i = 0; i < arrayInd.length; i++) {
        var content = dataInp.slice(arrayInd[i], arrayInd[i + 1]);
        arrObjQs.push({ content: content, ind: i, answer: "" });
      }
    }
    lsQuestion = [...arrObjQs];
    alert("Add list Questions success! thank you");
  } else {
    alert("Content is not exists, Please import content question! thank you");
  }
}
function RandomEachQuestion() {
  if (lsAnswer == 0) {
    alert(
      "List Answer is not exists.Please import list answer before random question. Thanks"
    );
    return;
  }
  if (lsQuestion == 0) {
    alert("List Question Random is over. Please AddList again to test. Thanks");
    return;
  }
  $(".total-answers").html("");
  $("#A").prop("checked", true);
  $(".show-message").html("");
  $(".answers").html("");
  let randomNotYet = lsQuestion[Math.floor(Math.random() * lsQuestion.length)];
  lsQuestion = [...lsQuestion.filter((item) => item != randomNotYet)];

  let htmlRandom = "";
  let randomInd = getLsIndAnswer(randomNotYet.content, 2);
  let arrObj = [];
  if (randomInd.length > 0) {
    for (let i = 0; i < randomInd.length; i++) {
      var content = randomNotYet.content.slice(randomInd[i], randomInd[i + 1]);
      arrObj.push(content);
    }
  }

  let ObjectQs = {
    question: arrObj[0],
    lsAnswer: [arrObj[1], arrObj[2], arrObj[3], arrObj[4]],
  };

  lsRandomDone.push({
    ContentQs: ObjectQs,
    ind: randomNotYet.ind,
    answer: randomNotYet.answer,
  });
  $(".Random").html(ObjectQs.question);
  $("#label-a").html(ObjectQs.lsAnswer[0]);
  $("#label-b").html(ObjectQs.lsAnswer[1]);
  $("#label-c").html(ObjectQs.lsAnswer[2]);
  $("#label-d").html(ObjectQs.lsAnswer[3]);
  $(".question").attr("data-question", randomNotYet.ind);
}
function ChooseAnswer() {
  var rs = $("input[name='drone']:checked").val();
  var ind = $(".question").attr("data-question");
  if (ind) {
    var qsCurrent = lsRandomDone.find((item) => item.ind == ind);
    qsCurrent.answer = rs;
    console.log(lsRandomDone, "lsRandomDone");
    $(".show-message").html("Summit answer success");
    setTimeout(() => {
      $(".show-message").html("");
    }, 1000);
  } else {
    alert("Please random question!");
  }
}
function ShowAnswer() {
  var lsHaveAnswer = [...lsRandomDone.filter((item) => item.answer != "")];
  if (lsHaveAnswer.length == 0) {
    alert(
      "List is empty! Please choose answer for question. And retry click button again Thanks"
    );
    return;
  }
  let totalCorrect = 0;
  let totalWrong = 0;
  let lsAnswerStr = ``;
  lsHaveAnswer.forEach((item) => {
    let answerR = lsAnswer.find((item1) => item1.ind == item.ind);
    let checkCorrect = item.answer.includes(answerR.answer) ? true : false;
    if (checkCorrect) totalCorrect += 1;
    else totalWrong += 1;
    lsAnswerStr = `${lsAnswerStr} </br> ${item.ContentQs.question}  
            </br> ${item.ContentQs.lsAnswer[0]}
            </br>${item.ContentQs.lsAnswer[1]}  
            </br> ${item.ContentQs.lsAnswer[2]}  
            </br> ${
              item.ContentQs.lsAnswer[3] ? item.ContentQs.lsAnswer[3] : ""
            } 
            </br> <b>Your answer</b>: <span class='${
              !checkCorrect ? "red" : "green"
            }'>${item.answer} </span>, <b>Right answer: ${
      answerR.answer
    }</b> <br/> ${answerR.explan}<hr>`;
  });
  let showTotal = `<b>TotalCorect: <span style="color:green">${totalCorrect}</span> </b> <br/> <b>TotalWrong: <span style="color:red">${totalWrong}</span> </b>`;
  $(".answers").html(lsAnswerStr);
  $(".total-answers").html(showTotal);
}
function AddnewQuestion() {
  var dataInp = null;
  if(!isShowTextArea)
  {
    dataInp = getDataFile('list_questions-import');
  }
  else{
    dataInp = $("#input-questions").val();
  }
   
  if (dataInp) {
    lsQuestion = [];
    lsRandomDone = [];

    let arrObjQs = [];
    var lsNumber = dataInp.match(/\d+[\)\)]/g);

    for (let i = 0; i < lsNumber.length; i++) {
      var content = dataInp.slice(
        dataInp.indexOf(lsNumber[i]),
        dataInp.indexOf(lsNumber[i + 1])
      );
      arrObjQs.push({ content: content, ind: i + 1, answer: "" });
    }

    lsQuestion = [...arrObjQs];
    console.log(lsQuestion, "lsQuestion");
    alert("Add list Questions success! thank you");
  } else {
    alert("Content is not exists, Please import content question! thank you");
  }
}
function AddAnswer() {
  var dataInp = null;
  if(isShowTextArea)
  {
    dataInp = $("#input-answer").val();
  }
  else {
    dataInp = getDataFile('list_answers-import');
  }
  if (dataInp) {
    let arrObjAns = [];
    let indAnsers = dataInp.match(/\d+[\)\)]/g);
    for (let i = 0; i < indAnsers.length; i++) {
      var content = dataInp.slice(
        dataInp.indexOf(indAnsers[i]),
        dataInp.indexOf(indAnsers[i + 1])
      );
      var expInd = content.indexOf("Explan:");
      var ansInd = content.indexOf(")");
      var explan = content.slice(expInd, content.length);
      var answer = content.slice(ansInd + 1, expInd).replace("\n", "");
      arrObjAns.push({ explan: explan, ind: i + 1, answer: answer });
    }
    lsAnswer = [...arrObjAns];
    console.log(lsAnswer, "lsAnswers");
    alert("Import List answers success ! Thanks");
  } else {
    alert("Please Input List Answer! Thanks");
  }
}
function onLoadBody() {
  $(".method-text").css("display", "none");
  $(".method-default").css("display", "none");
}
$("input[name='method-import']").on("change", (event) => {
  if (event.target.value == "1") {
    $(".method-text").css("display", "none");
    $(".method-default").css("display", "block");
    this.isShowTextArea = false;
  } else {
    this.isShowTextArea = true;
    $(".method-text").css("display", "flex");
    $(".method-default").css("display", "none");
    
  }
});
// const {readFileSync, promises: fsPromises} = require('fs');
// async function asyncReadFile(filename) {
//     try {
//       const contents = await fsPromises.readFile(filename, 'utf-8');

//       const arr = contents.split(/\r?\n/);

//       console.log(arr); // 👉️ ['One', 'Two', 'Three', 'Four']

//       return arr;
//     } catch (err) {
//       console.log(err);
//     }
//   }
//   asyncReadFile('list_questions-import.txt');
function getDataFile(fileName) {
  var dataFile = "";
  $.ajax({
    url: `../${fileName}`,
    async: false,
    success: function (data) {
      dataFile = data;
    },
  });
  return dataFile;
}
function AddDefault(type) {
  switch (type) {
    case 1: //default dum
      alert("Dum default not yet!");
      break;
    case 2: //default BAC
      // dataQuestion = getDataFile('list_questions-import');
      // dataAnswer = getDataFile('list_answers-import');
      AddnewQuestion();
      AddAnswer()
      break;
  }
}
