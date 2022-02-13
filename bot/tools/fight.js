module.exports = (interaction) => {
    let botHP = 10;
    let ownerHP = 10;
    let turn = 1;

    let filter = m => interaction.author.id === m.author.id;
    let filter2 = m => 852613562940784661 === m.author.id;
    let channel = interaction.channel;

    let string = '';
    
    const getNum = (min, max) => Math.floor(Math.random()*(max - min + 1)) + min;

    const hitChance = () => getNum(1,3);
    const totalDmg = () => getNum(1,5);

    function* turnGen(){
        while(botHP > 0 && ownerHP > 0){
            yield turn++;   
        } 
    }

    const tGen = turnGen();

    function punch(){
        if (hitChance() < 3){
            return totalDmg();
        }
        else{
            return 0;
        }
    };

    function botTurn(gen,bm){
        let dmg = punch();

        if (dmg == 0){
            string = string+"\`\`\`Bot Missed!\`\`\`\n"
        }
        else {
            ownerHP -= dmg;
            string = string+`\`\`\`Bot hit you for ${dmg}! \n \> Your HP: ${ownerHP}\`\`\`\n`

        }
        turnTracker(gen, gen.next().value,bm);
    };

    function userTurn(gen,bm){
        channel.awaitMessages({ filter, max: 1, time: 30000, errors: ['time'] })
            .then(messages => {
                const input = messages.first().content;
                
                if (input === 'punch'){
                    let dmg = punch();

                    if (dmg == 0){
                        string = string+"\`\`\` You Missed!\`\`\`\n"
                        }
                    else {
                        botHP -= dmg;
                        string = string+`\`\`\` You hit me for ${dmg}! \n \> My HP: ${botHP}\`\`\`\n `
                    }
                    turnTracker(gen, gen.next().value,bm);
                }
                else if (input === 'cancel'){
                    channel.send(`Fight canceled : (`);
                }

                else {
                    channel.send('Bad input, try again!');
                    userTurn(gen,bm);
                }
            })
            .catch(() => {
                bm.edit('You ran out of time!');
            })
        
    };



    function turnTracker(gen, count, bm){
        bm.edit(`${string}`)
        if(botHP <= 0){
            interaction.reply("**Owner Wins!**");
            return;
        }
        else if(ownerHP <= 0){
            interaction.reply("**Bot Wins!**");
            return;
        }

        string=string+`**Turn:** ${count}`

        if (count % 2 == 0){
            botTurn(gen,bm);
        }
        else {
            userTurn(gen,bm);
        }
    };


    channel.awaitMessages({ filter2, max: 1, time: 30000, errors: ['time'] })
            .then(messages => {
                let botMessage = messages.first()
                string = botMessage.content+"\n"
                turnTracker(tGen, tGen.next().value, botMessage);
            })
            .catch(() => {
                channel.send('oop!');
            })
};