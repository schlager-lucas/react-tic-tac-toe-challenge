# react-tic-tac-toe-challenge

watched a video about debbuging in VSCdoe
// => https://www.youtube.com/watch?v=PJeNReqyH88

biggest Problem i had, was to find a way how u can dynamiclly render classes
// => in the Code 

<div className="board-row">
   {this.renderSquare(0)}
   {this.renderSquare(1)}
   {this.renderSquare(2)}
</div>

i only found a way to render a list dynamiclly but not how to render the whole class "board-row"
so i dicided to make it by hand. And wrote a switch case for three differtent sizes of the game.

Next Problem i had was to find a way using the variable gameSize outside the class Game. So i made the var Global.

3. Problem was to use the this.state methode, but after a lot of TryAndError i understood how it works and was able to use it -> for exmaple for the tictactoe boolean
i relized that you need to call it by this.stat.abc

finding a way to check if someone has won, wasnt a problem but it needed some time.
Drawings how i created the methods:
![image](https://user-images.githubusercontent.com/82469143/166156161-f8b84056-87ff-4f00-9f5a-e916b1a8bc25.png)
