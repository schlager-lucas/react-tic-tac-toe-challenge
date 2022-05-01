# react-tic-tac-toe-challenge

first I read the whole tutorial
https://reactjs.org/tutorial/tutorial.html

then watched a video about debbuging in VSCdoe
// => https://www.youtube.com/watch?v=PJeNReqyH88

biggest Problem i had, was to find a way how you can dynamically render <div className "">
// => in the Code 
```
<div className="board-row">
   {this.renderSquare(0)}
   {this.renderSquare(1)}
   {this.renderSquare(2)}
</div>
```
i only found a way to render a list dynamically (on stackoverflow or how to render with conditions on youtube: https://www.youtube.com/watch?v=4oCVDkb_EIs&t=376s) but not how to render the whole: class "board-row"

so, i decided to make it by hand. I wrote a switch case for three differtent sizes of the game.

Next Problem i had was to find a way using the variable gameSize outside the class Game. So i made the var Global.

Another Problem was to use the this.state methode, but after a lot of TryAndError and debugging i understood how it works and was able to use it

-> for exmaple for the tictactoe boolean or the setSize and changeVariety methods

i relized that you need to call it by this.state.abc

finding a way to check if someone has won, wasnt a problem but it needed some time.
Drawing of how i created the methods:

![image](https://user-images.githubusercontent.com/82469143/166156161-f8b84056-87ff-4f00-9f5a-e916b1a8bc25.png)

![image](https://user-images.githubusercontent.com/82469143/166156520-20f3b024-89fc-4e94-8e1f-f41d0d060a88.png)

