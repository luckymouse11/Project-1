# Project 1 - Battleships Avengers
## Overview
The first project for the Software Engineering Course and personally my first project using JavaScript.
Battleships is a classic two-player board game where you position your ships on a grid and take turns shooting at specific coordinates in an attempt to sink the opposition's ships. In Battleships - Avengers, you play against the computer. The Avengers theme adds an exciting twist to the gaming experience.

Play Batteships Avengers <a href="https://luckymouse11.github.io/Project-1/" target="_blank">here</a>

<img width="867" alt="p1-screenshot-6 - midgame" src="https://user-images.githubusercontent.com/88091835/142726493-78aa90a1-c93e-41da-b41c-d944a2fa8ad3.png">


## Brief:
To build a functioning browser game using Vanilla JavaScript.


**Timeframe: 8 days**

## Technologies Used:

- HTML5
- CSS3
- JavaScript
- Git

## Process
### Planning

On Day 1, the importance of creating a good wireframe and the use of pseudocode was strongly stressed. With this in mind, I began by researching similar games to help me come up with a final plan of how I wanted my game to look. I was then able to clearly mark in HTML terms the elements I would require and which were likely to be controlled by "Flexbox". Working out the logic for the computer’s player also presented a challenge as making the computer "smart" would require a lot more array methods and functionality.

Whilst some of the styling of the project was done as the project went along, most of it was left as the final steps of the development process of the game.

## Game Mechanics
### Ship placement

At the start of the game, players navigate the board and position their ships by using the W, S, A, D keyboard keys and a Rotate button. I used the WSAD keys as opposed to arrow keys as it would be more intuitive to gamers.

<img width="228" alt="p1-screenshot-5" src="https://user-images.githubusercontent.com/88091835/142726716-adb946ac-413e-4579-8851-59ec30a19bea.png">
<img width="354" alt="p1-screenshot-1" src="https://user-images.githubusercontent.com/88091835/142726092-32dcef2e-b1a3-4dc6-a9ba-99d54503c457.png">


The placement of the individual ships is an integral part of the game. Therefore, considerations were taken to ensure that the ships always remain within the confines of the grid and that when ships are being set, they cannot overlap one another.

<img width="563" alt="p1-screenshot-2" src="https://user-images.githubusercontent.com/88091835/142726088-73973109-e7ef-47f8-bbbd-96e91f7cdf63.png">
<img width="864" alt="p1-screenshot-4 - full game screenshot" src="https://user-images.githubusercontent.com/88091835/142726607-50458e8a-5b08-44b4-8106-eb62b7c389df.png">


### Player and Computer Turns

Upon starting the game the player selects a square on the grid to shoot. If it's a hit then the player gets another turn. If it’s a miss then it's the computer’s turn to take a shot.

The scoreboard tracks the stats of how many enemy ships are remaining and how many squares are still occupied.

One of the trickier parts to the game mechanics was making sure that once all the pieces were set, the computer would recognise when a shot has hit or missed.

To do this, I had to create an array for the coordinates of each individual ship e.g. [1, 2], [25, 35, 45].

Once the ship position was saved I had to create an array of the ships saved arrays e.g. [[1, 2], [25, 35, 45]].

Having the game pieces in an array would allow me to write the logic for the scoreboard.

<img width="462" alt="p1-screenshot-3" src="https://user-images.githubusercontent.com/88091835/142726095-08d9f18c-6e6c-4840-9d7a-7fd009162be8.png">



## Win/ Loss logic

The game ends when either the player or computer manages to sink all the opponent’s ships.
The number of ship coordinates that have not been hit are tracked for player and computer; after each successful hit, the game checks if this variable is now equal to 0 for the opponent. If yes, this then ends the game and triggers an alert declaring the winner.

## Known errors/ bugs

There is currently no time delay between computer and player turns, making the game "untidy" as audio files will overlap if a player starts clicking too quickly.

## Wins and Challenges

### Wins
- Experiencing how to think programmatically as well as gaining problem-solving skills.

- Coming up with a theme to suit the game - this made it easier to be invested in the development process.

### Challenges
- The mathematical side of things - factoring in the placement of the ships and edge-case handling to ensure that ships can only rotate and land within the grid.

- Implementing a time delay between turns.

- Making the computer smart and being able to toggle difficulties.


## Future Improvements

- As noted in the challenges, working on a time delay between player and computer turns so there are no issues with overlapping audio.

- Adding a "Game Restart" button for users to restart the game without having to reload the page.

- Making the computer smart and having the option to toggle difficulty. Ideally, there would be an Easy Mode, where the computer fires shots randomly; a Medium Mode where the computer's target array would surround the previous shot coordinates if it hit a ship, therefore increasing the chances of consecutive hits; Hard Mode where the computer's target array would further decrease in size following the direction of the ship hit or have memory of previous hits.

- Changing the "ships" to more creative shapes than just straight lines on the grid.

## Key Learning

Taking on the challenge of Battleships was a great experience for me as it allowed me to reinforce the things I have learnt in JavaScript, such as DOM manipulation and different array methods. I was also able to appreciate the value of pseudo code and planning in order to increase efficiency.

