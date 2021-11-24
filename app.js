let blackjackGame = {
    'you': {'scoreSpan': '#your-score', 'div': '.your-display', 'score':0 },
    'dealer': {'scoreSpan': '#bot-score', 'div': '.bot-display', 'score':0 },
    'cards': ['2','3','4','5','6','7','8','9','10','J','Q','K','A'],
    'cardMap': {'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'J':10,'Q':10,'K':10,'A':[1,11] },

};


const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];
var activePlayer = YOU; 
const displaySection = document.querySelector('#display-message');
var standButton = false;
var wins =0, losses=0, draws=0; 

const hitSound = new Audio('sounds/swish.mp3');
const wonSound = new Audio('sounds/cash.mp3');
const lostSound = new Audio('sounds/aww.mp3');


document.querySelector('#hit-button').addEventListener('click', blackjackHit);
document.querySelector('#deal-button').addEventListener('click', blackjackDeal);
document.querySelector('#stand-button').addEventListener('click', blackjackStand);


function blackjackHit(){
    let card = randomCard();
    showCard(activePlayer, card);
    updateScore(card, activePlayer);
    displayScore(activePlayer);
    hitSound.play();
   



  
   
  
}

function displayScore(activePlayer){
    document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];

}


function blackjackDeal(){
    let yourImages = document.querySelector(YOU['div']).querySelectorAll('img');
    let botImages = document.querySelector(DEALER['div']).querySelectorAll('img');

    for(i=0;i<yourImages.length;i++){
        yourImages[i].remove();
    }
    for(i=0;i<botImages.length;i++){
        botImages[i].remove();
    }

    YOU['score'] = 0;
    document.querySelector(YOU['scoreSpan']).textContent=YOU['score'];


    DEALER['score'] = 0;
    document.querySelector(DEALER['scoreSpan']).textContent= DEALER['score'];

    activePlayer = YOU;

    displaySection.textContent='Lets Play';

   

    document.querySelector('#wins').textContent=wins;
    document.querySelector('#losses').textContent=losses;
    document.querySelector('#draws').textContent=draws;

    enableHitStand();



}

function showCard(activePlayer, Card){

if(activePlayer['score'] <= 21){


    let cardImage = document.createElement('img');
    cardImage.src = `images/${Card}.png`;
    cardImage.style.width= '150px';
    cardImage.style.height= '150px';
    cardImage.style.padding='5px';
    document.querySelector(activePlayer['div']).appendChild(cardImage);
}
    

}

function randomCard(){
    let randomindex = Math.floor(Math.random() * 13);
    return blackjackGame['cards'][randomindex];

}

function updateScore(card, activePlayer){



    if(card === 'A'){

        if(activePlayer['score'] + blackjackGame['cardMap'][card][1] <= 21){
            activePlayer['score']  += blackjackGame['cardMap'][card][1];
        }else{
            activePlayer['score']  += blackjackGame['cardMap'][card][0];
        }

    
    }else{
        activePlayer['score']  += blackjackGame['cardMap'][card];


         

            if(activePlayer['score']===21){
                if(activePlayer===YOU){
                    displaySection.textContent = `You Won!`;
                    wins++;
                    wonSound.play();
                    disableHitStand();
                }else{
                    displaySection.textContent = `You Lost!`;
                    losses++;
                    lostSound.play();
                    disableHitStand();
                }
            }
            else if(activePlayer['score']>21){
                if(activePlayer===YOU){
                    displaySection.textContent = 
                    `You Busted!`;
                    losses++;
            
                    lostSound.play();
                    disableHitStand();
            
                }else{
                    displaySection.textContent = 
                    `Dealer Busted! You Won!`;
                    wins++;
                    wonSound.play();
                    disableHitStand();
                }



            }
            else if(standButton === true){
                
                let yourScore = YOU['score'];
                let botScore = DEALER['score'];

                if(botScore>yourScore){
                    displaySection.textContent = `You Lost!`;
                    losses++;
                    lostSound.play();
                    disableHitStand();

                }
                else if(botScore===yourScore){
                    displaySection.textContent = 'You Tied!'
                    draws++;
                    disableHitStand();
                }


            }

           




    }


}


function blackjackStand(){
    standButton = true;
    activePlayer = DEALER;
    blackjackHit();

   
   

  


}

function disableHitStand(){
    document.getElementById('hit-button').disabled = true;
    document.getElementById('stand-button').disabled = true;
}

function enableHitStand(){
    document.getElementById('hit-button').disabled = false;
    document.getElementById('stand-button').disabled = false;
}

