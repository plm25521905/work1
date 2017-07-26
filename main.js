//namespace
(function() {
    //==============================================
    //HTML DOM
    //==============================================
    let doc = document;
    let viewer = doc.getElementById("viewer"); 
    let formula = doc.getElementById("formula");
    let answer = doc.getElementById("answer");
    let number_input = doc.getElementById("number_input");
    let operator_input = doc.getElementById("operator_input");
    let controller_input = doc.getElementById("controller_input");
    //==============================================
    //Variable
    //==============================================
    const NUMBER = [7,8,9,4,5,6,1,2,3,0,"."];
    const OPERATOR = Array.from("+-*/()C");
    let tmp = "";
    //==============================================
    //Initialize
    //==============================================
    (function() {
        //create button
        let createButton = function(text){
            let node = doc.createElement("button");
            let text_node = doc.createTextNode(text);
            node.appendChild(text_node);
            return node;
        };
        //create number button
        for(let i in NUMBER){
            let number = NUMBER[i];
            let button = createButton(number);
            number_input.appendChild(button);
            button.onclick = function(){
                let last = tmp[tmp.length - 1];
                if(last === ")"){
                    tmp += `*${number}`;
                }
                else {
                    tmp += number;
                }
                getAnswer();
            };
        }
        //create operator button
        for(let i in OPERATOR){
            let operator = OPERATOR[i];
            let button = createButton(operator);
            operator_input.appendChild(button);
            switch(operator) {
                case "C": //clear
                    button.onclick = function(){
                        tmp = "";
                        answer.innerHTML = "";
                    };
                    break;

                case "(":
                    button.onclick = function(){
                        let last = tmp[tmp.length - 1];
                        if(last === "."){
                            tmp += `0*${operator}`;
                        }
                        else if (NUMBER.includes(Number(last))){
                            tmp += `*${operator}`;
                        }
                        else {
                            tmp += operator;
                        }
                    };
                    break;
                /*case "=":
                    button.onclick = function(){
                        try{
                            let last = tmp[tmp.length - 1];
                            if(last === "."){
                                tmp += "0";
                            }
                            answer.innerHTML = Number(eval(tmp) || 0);
                        }
                        catch(error){
                            answer.innerHTML = "運算式不正確" ;
                            throw error;
                        }
                    };
                    break;*/
                default:
                    button.onclick = function(){
                    tmp += operator;
                    getAnswer();
                    };
                    break;
            }
        }
    })();
    //==============================================
    //Main
    //==============================================
    //getAnswer
    let getAnswer = function(){
        try{
            answer.innerHTML = Number(eval(tmp) || 0);
        }
        catch(error){
            answer.innerHTML = "運算式不正確" ;
        }
    }
    //interval
    setInterval(function(){
        formula.innerHTML = tmp;
    }, 100);
})();