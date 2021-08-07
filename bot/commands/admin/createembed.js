const axios = require('axios');
const Discord = require('discord.js');

module.exports = {
	name: 'createmessage',
	description: 'Bot Message',
	execute(message) {
        function createEmbed(x){
            axios.post('http://localhost:8000/api/commands/new', x)
                .then(res =>{
                    return message.channel.send('Created!');
                })
                .catch(err =>{
                    console.log(err);
                })
        }
        
        const data = {
            fields: [{}]
        }; 

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
        },{
            question: "Description of field?",
            value: "value"
        },{
            question: "Inline? True or false.",
            value: "inline",
            final: true
        }];

        let numFields = 0;
        let baseFields = 0;

        let field = false;

        function* questionGenerator(array){
            for (const q of array){
                yield q;
            }
        };

        function* numberGenerator(){
            for (let i = 0 ; i< 2; i++){
                yield i;
            }
        };

        var cGen = questionGenerator(coreQuestions);
        var fGen = questionGenerator(fieldQuestions);
        var nGen = numberGenerator();

        function callQuestion(gen, obj){
            if(obj != undefined){
                message.channel.send(obj.question)
                    .then(() => {
                        let filter = m => message.author.id === m.author.id;
            
                        message.channel.awaitMessages(filter, { time: 60000, max: 1, errors: ['time'] })
                            .then(messages => {
                                const input = messages.first().content;
            
                                if (input === 'Cancel'){
                                    message.channel.send('Message canceled.')
                                }
                                else {
                                    console.log("Sending to Save")
                                    saveData(gen, obj.value, input);
                                }
                            })
                            .catch(() => {
                                message.channel.send('You did not enter any input!');
                            })
                    })

            }
            else{
                console.log(`!!FINISHED!! : ${data.command}`);
            }
        }

      //  function callFields(num){
//
       // }

        function saveData(gen, dataValue, input){
            if (dataValue === 'field'){
                field = true;

                console.log("Has Fields");
                numFields = Number(input);

                callQuestion(fGen,fGen.next().value);

            }
            else if(field == true)
            {
                console.log("Field = True");
                //data.fields[baseFields][dataValue] = input.toLowerCase();
                //console.log(data[fields][baseFields][dataValue]);
                baseFields += 1;
                callQuestion(gen, gen.next().value);
            }
            else {
                data[dataValue] = input.toLowerCase();
                callQuestion(gen, gen.next().value);
            }
        }

        // ---------------------------------------------------- //

        callQuestion(cGen, cGen.next().value);

        // ---------------------------------------------------- //
    },
};