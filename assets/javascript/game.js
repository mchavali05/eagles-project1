var suits = ["Spades", "Hearts", "Diamonds", "Clubs"];
var values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
var deck = new Array();
var player;
var playerPoints;
var dealerPoints;
var playerHand =[];
var dealerHand=[];        
var PlayerBankAccount= 100;
var dealerBankAccount= 100;
var betValue= 10;
var deckAfterDealing = [];
var card;

    $("#startGame").on("click", function(){
            
        function createDeck(){
            
            for (var i = 0 ; i < values.length; i++)
            {
                for(var x = 0; x < suits.length; x++)
                {
                    var weight = parseInt(values[i]);
                    if (values[i] == "J" || values[i] == "Q" || values[i] == "K")
                        weight = 10;
                    if (values[i] == "A")
                        weight = 11;
                    var card = { Value: values[i], Suit: suits[x], Weight: weight };
                    deck.push(card);
                   
                }
            }
            deck.sort(() => Math.random() - 0.5);  
        }
        createDeck();
        console.log(deck);
     
         
        $("#playerBank").text("$" + PlayerBankAccount);
        $("#dealerBank").text("$" + dealerBankAccount);
        
        function dealCards() {
            for (var i=0; i<deck.length; i++) {
                if (i<1) {
                    playerHand.push(deck[i]);
                } else if(i>0 && i<2){                                                  
                    dealerHand.push(deck[i]);
                } else if(i>1 && i<3) {
                    playerHand.push(deck[i]);
                } else if(i>2 && i<4) {
                    dealerHand.push(deck[i]);
                } else {
                    deckAfterDealing.push(deck[i]);
                }

            }
        }

      dealCards();
      console.log("dealerHand", dealerHand);
      console.log("playerHand", playerHand);
      console.log(deckAfterDealing);           
          
         
        function getTotalPlayerPoints(){
            var totalPlayerPoints = 0;
            for(var i = 0; i < playerHand.length; i++)
            {
                playerHand[i].Weight;
                console.log(playerHand[i].Weight);
                totalPlayerPoints += playerHand[i].Weight;                        
                console.log(totalPlayerPoints +" total player points ");
                $("#playerHand").text(totalPlayerPoints);
            }
            return totalPlayerPoints;
        }
        
        getTotalPlayerPoints(); 

        // check if the player or dealer points are 21 
        function BlackjackPo(){
             playerPoints = getTotalPlayerPoints();
             if(playerPoints ==21 && getPoints(dealerHand)!=21){
                console.log( "Player has got Blackjack." +"game is over!");
                $('#message').text("Player has got Blackjack." +"game is over!");
                $('#stand').attr('disabled','disabled');
                $('#hit').attr('disabled','disabled');
                $('#bet_value').empty();
                PlayerBankAccount += betValue * 2;
                $("#playerBank").text("$" + PlayerBankAccount);
                $("#playerHand").text(playerPoints);               
                $('#startGame').attr('disabled','disabled');
             } else {
                if(playerPoints !=21 && getPoints(dealerHand)==21){
                  console.log( "Dealer has got Blackjack." +"game is over!");
                  $('#message').text("Dealer has got Blackjack." +"game is over!");
                  $('#stand').attr('disabled','disabled');
                  $('#hit').attr('disabled','disabled');
                  $('#bet_value').empty();                
                  dealerBankAccount += betValue *2;
                  $("#dealerBank").text("$" + dealerBankAccount);
                  $("#reset").removeAttr('disabled');
                  $('#startGame').attr('disabled','disabled');
                }
              }  
         }
         BlackjackPo();

         // calculating the total dealer  points 
         function getPoints(dealerHand){
            $('#startGame').attr('disabled','disabled');
            var points = 0;
            for(var i = 0; i < dealerHand.length; i++){
                points += dealerHand[i].Weight;
                dealerPoints = points;
            
                console.log(points);
                console.log(dealerPoints + "dealer points before stand");
                $("#dealHand").text(points);
            }
            return points;
        }
        getPoints(dealerHand);

        $('#startGame').attr('disabled','disabled');
        $('#stand').attr('disabled','disabled');
        $('#hit').attr('disabled','disabled');
        $("#bet").removeAttr('disabled');
        //$("#bet_value").text("$" + betValue);


    });

         

    $('#hit').on('click',function(){

        function giveCard(){
            //how about picking card from the deckAfterDealing function? Upon hit, we need to distribute cards from the rest 48 cards.
            card = deckAfterDealing.pop();
            console.log(deckAfterDealing);
            console.log(card +" the given card"); 
            playerHand.push(card);
            console.log(playerHand + "player hand after given");
            console.log(card.Weight + "new card weight");
            //console.log(getPoints() + "new card weight and point");   
        }
        giveCard();

        //calculating total player points   
        function getPoints(playerHand){            
            $('#startGame').attr('disabled','disabled');
            var points = 0;
            for(var i = 0; i < playerHand.length; i++)
            {
                points += playerHand[i].Weight;
                playerPoints = points;                 
            
             console.log(points);
             console.log(playerPoints +"points after given");
             $("#playerHand").text(points);
            }
            return points;
        }
        
        getPoints(playerHand);    

        //check the player points are >21
        function checkPoints(){
            playerPoints= getPoints(playerHand);
            if(playerPoints >21){
                 console.log("game over!");
                 $('#stand').attr('disabled','disabled');
                 $('#hit').attr('disabled','disabled');
                 $('#bet_value').empty();                
                 dealerBankAccount += betValue *2;
                 $("#dealerBank").text("$" + dealerBankAccount);
                 $("#reset").removeAttr('disabled');
                 $('#startGame').attr('disabled','disabled');
            }
        }
        checkPoints();

       
        function updateDeck(){
           var deckSize = deckAfterDealing.length; 
           console.log(deckSize + "decksize");
           return deckSize;
        }          

    }); 


    $('#stand').on('click',function(){

        function getPoints(dealerHand){
            $('#startGame').attr('disabled','disabled');
            var points = 0;
            for(var i = 0; i < dealerHand.length; i++){
                points += dealerHand[i].Weight;
                dealerPoints = points;
            
                console.log(points);
                console.log(dealerPoints + "dealer points before stand");
                $("#dealHand").text(points);
            }
            return points;
        }
        getPoints(dealerHand);

        function dealerTurn(){
            
         console.log(dealerPoints);
         console.log(playerPoints);
            if (dealerPoints >= 17 && dealerPoints <playerPoints) {

              //console.log("player won");
              alert("Player won!");
              $('#stand').attr('disabled','disabled');
              $('#hit').attr('disabled','disabled');
              $('#bet_value').empty();
              PlayerBankAccount += betValue *2;
              $("#playerBank").text("$" + PlayerBankAccount);
              $("#reset").removeAttr('disabled');
              $('#startGame').attr('disabled','disabled');

            } else if (dealerPoints >= 17 && dealerPoints > playerPoints  && dealerPoints <= 21){

              console.log("dealer won");
              alert("Dealer Won!");
              $('#stand').attr('disabled','disabled');
              $('#hit').attr('disabled','disabled');
              $('#bet_value').empty();                
              dealerBankAccount += betValue *2;
              $("#dealerBank").text("$" + dealerBankAccount);
              $("#reset").removeAttr('disabled');
              $('#startGame').attr('disabled','disabled');

            } else if (dealerPoints >21){

                console.log("player won! The dealer busted.");
                alert("player won! The dealer busted.");
                $('#stand').attr('disabled','disabled');
                $('#hit').attr('disabled','disabled');
                $('#bet_value').empty();
                PlayerBankAccount += betValue *2;
                $("#playerBank").text("$" + PlayerBankAccount);
                $("#reset").removeAttr('disabled');
                $('#startGame').attr('disabled','disabled');
            } else if (dealerPoints <17 || dealerPoints <playerPoints && dealerPoints<21){             
                function dealerTurnS(){
                    card = deckAfterDealing.pop();
                    console.log(deck);
                    console.log(card); 
                    dealerHand.push(card);
                    console.log(dealerHand);                
                };
                //pop a card from the deck to the dealer  
                dealerTurnS(); 
                getPoints(dealerHand);
                dealerTurn();    
            } else{
             console.log("it is a tie");
             $('#stand').attr('disabled','disabled');
             $('#hit').attr('disabled','disabled');
             $('#bet_value').empty();
             PlayerBankAccount += betValue;
             dealerBankAccount += betValue;
             $("#playerBank").text("$" + PlayerBankAccount);
             $("#dealerBank").text("$" + dealerBankAccount);
             $("#reset").removeAttr('disabled');
             $('#startGame').attr('disabled','disabled');
            }
            console.log(dealerHand);
        }
        dealerTurn(); 
    });

    $("#bet").on("click",function(){
            
        $("#bet_value").text("$" + betValue);
        PlayerBankAccount-=betValue;
        dealerBankAccount-=betValue;
        $("#playerBank").text("$" + PlayerBankAccount);
        $("#dealerBank").text("$" + dealerBankAccount);
        $("#bet").attr('disabled','disabled');
        $("#reset").attr('disabled','disabled');
        $('#stand').removeAttr('disabled');
        $('#hit').removeAttr('disabled');
        $('#startGame').attr('disabled','disabled');
        
        //ending the game
        function endGame(){
            if (PlayerBankAccount < betValue ||dealerBankAccount < betValue ) {
                console.log('Bank account is out of money!');
                $("#bet").attr('disabled','disabled');
                $('#stand').attr('disabled','disabled');
                $('#hit').attr('disabled','disabled');
                $('#startGame').attr('disabled','disabled');
            }
        }
        endGame();
    }); 


    $("#reset").on("click", function(){
        $('#startGame').removeAttr('disabled');
        $('#message').empty();
        $('#bet_value').empty();
        $('#playerHand').empty();
        $('#dealHand').empty();
        playerHand=[];
        dealerHand=[];
    });

    function endGame(){
        if (PlayerBankAccount < betValue ||dealerBankAccount < betValue) {
            console.log('Bank account is out of money!');
            alert("Game Over!");
            $("#bet").attr('disabled','disabled');
            $('#stand').attr('disabled','disabled');
            $('#hit').attr('disabled','disabled');
            $('#startGame').attr('disabled','disabled');
        }
    }
    endGame();