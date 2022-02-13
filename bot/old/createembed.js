const axios = require('axios');
const Discord = require('discord.js');

module.exports = {
	name: 'createmessage',
	description: 'Bot Message',
	execute(message) {
        // CREATE EMBED IN DATABASE //
        function createEmbed(x){
            axios.post('http://localhost:8000/api/commands/new', x)
                .then(res =>{
                    return message.channel.send('Created!');
                })
                .catch(err =>{
                    console.log(err);
                })
        }
        
    // ------------------- Data -------------------//
        // DATA TO SAVE //
        const data = {}; 
        let fieldData = {};

        // BOT QUESTIONS & VALUES //
        let coreQuestions = [{
            question: "Command?",
            value: "command"
        },/*{
            question: "Color?",
            value: "color"
        },{
            question: "Title?",
            value: "title"
        },{
            question: "Description?",
            value: "description"
        },{
            question: "Thumbnail?", //Optional
            value: "thumbnail"
        },{
            question: "Image?", //Optional
            value: "image"
        },{
            question: "URL?", //Optional
            value: "url"
        }*/{
            question: "How many fields?",
            value: "field"
        }];

        let fieldQuestions = [{
            question: "Title of field?",
            value: "name"
        }/*,{
            question: "Description of field?",
            value: "value"
        },{
            question: "Inline? True or false.",
            value: "inline"
        }*/];

        let footerQuestions = [{
            question: "Footer Text?",
            value: "text"
        },{
            question: "Footer Icon_URL?",
            value: "icon_url"
        }];

        // FIELD ITERATORS //
        let numFields = 0;
        let baseFields = 0;

        let field = false;
        let footer = false;
    // ------------------- Data -------------------//

    // ------------------- Generators -------------------//

        function* questionGenerator(array){
            for (const q of array){
                yield q;
            }
        }

        var cGen = questionGenerator(coreQuestions);
        var fGen = questionGenerator(fieldQuestions);
        var ftGen = questionGenerator(footerQuestions);
        var fGens = [];

    // ------------------- Generators -------------------//

        // CALLS EACH QUESTION & VALUE //
        function callQuestion(gen, obj){
            if(obj != undefined){
                message.channel.send(obj.question)
                    .then(() => {
                        let filter = m => message.author.id === m.author.id;
            
                        message.channel.awaitMessages(filter, { time: 60000, max: 1, errors: ['time'] })
                            .then(messages => {
                                const input = messages.first().content;
            
                                if (input === 'Cancel'){
                                    message.channel.send('Creation of embed canceled.')
                                }
                                else {
                                    saveData(gen, obj.value, input);
                                }
                            })
                            .catch(() => {
                                message.channel.send('You did not enter any input! You will need to start over.');
                            })
                    })
            }
            else{
                console.log(data);
                console.log(`!!FINISHED!! : ${data.command}`);
                //createEmbed(data);
            }
        }

        // NUMBER OF FIELDS WANTED LOOP //
        function callFields(){
            if (baseFields < numFields){
                baseFields += 1;

                message.channel.send("**Questions for Field "+(baseFields+1)+".**")

                fGens[baseFields] = questionGenerator(fieldQuestions);

                callQuestion(fGens[baseFields], fGens[baseFields].next().value);
            }
            else {
                console.log("No more fields!");
                console.log(data.fields);
                console.log(data.fields[0]['name']);


                //field = false;
                //footer = true;
                //data.footer= {};
                //callQuestion(ftGen,ftGen.next().value);

            }
        }

        // SAVES DATA FROM CALLQUESTION //
        function saveData(gen, dataValue, input){
            if (dataValue === 'field'){
                field = true;
                data.fields = [];
                numFields = Number(input)-1;

                message.channel.send("**Questions for Field "+(baseFields+1)+".**")

                callQuestion(fGen,fGen.next().value);
            }
            else if(field == true){
                fieldData[dataValue] = input;

                let next = gen.next().value;

                if (next != undefined){
                    callQuestion(gen, next);
                }
                else {
                    callFields();
                }
                
            }
            else if (footer == true){
                data.footer[dataValue] = input;
                callQuestion(gen, gen.next().value);
            }
            else {
                data[dataValue] = input;
                callQuestion(gen, gen.next().value);
            }
        }

    // ------------------- Starts Bot Question Loop -------------------//

        callQuestion(cGen, cGen.next().value);

     // ------------------- Starts Bot Question Loop -------------------//
    },
};