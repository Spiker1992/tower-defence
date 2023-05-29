# Tower Defence

The broad goal for this project would be to deliver a Tower Defense game, which many of us may have played in the past. For those who haven’t, the Tower Defense game involves placing towers strategically around the map to defend against waves of enemies. This game offers various avenues for development, we have the map, enemies and towers that can be modelled to start with. And there are plenty of opportunities to expand the business logic or visual representation of this game.

For this game, I will use TS (TypeScript) and Jest, but the scope of my stack may grow as we dive deeper. Whilst, I will be using TS, the same solution can also be produced in other languages (i.e. Python, PHP). 

I have used TS for three reasons:
1. It has low barriers to begin work. We just need an NVM and NPM on the machine. 
2. I could have gone with JavaScript, without TS, which would have reduced barriers even further down, but static typing, in my opinion, is priceless. With static typing, we can reduce errors and make our code easier to understand.
3. Lastly, this should make it easier and quicker for us to interact with UI.

## Introduction
Tower Defense consist of multiple core parts: 

- Grid. This will be used to place game elements.
- Enemy Path. This is the path our enemies will travel on.
- Enemies. Enemies will use a path to move on.
- Tower. Towers can be placed within the grid outside of the path.


At this initial stage, I would focus on the mechanics of the game, listed above. As a result, we will lay a foundation that we can then expand. 

This is what we have currently:
- single type of tower
- single enemy type
- single map
- enemy moves on the path
- towers shoot at enemies within it's range


<img width="269" alt="Screenshot 2023-05-29 at 00 14 12" src="https://github.com/Spiker1992/tower-defence/assets/68771766/038bbb43-820f-41fd-a40b-05207ef5bf95">


What will I do next:
- the game loop code needs to refactored further
- boundary between towers and enemies needs to be tidied. 
- i need to have a place for a central coordination point that will require input of a map, towers and enemies. this center point will contain the game loop logic.
- enemies will be defined on the map level
- boundary between layers (UI/Entities) needs to be made clearer, it feels coupled right now.

## Defining the scope

We need to define what the game should consist of which will then determine the structure of this application.

After gaining a bit of experience with Tower Defense I've come up with 3 ideas for how this game might work. In all 3 cases the level functionality remained the same, but  the outer was slightly different.

Out of 3 ideas, I like the sound of the 3rd idea. However, it's not something that I will go after right away, since I want to develop functionality of the level loop first. This is because development of the core functionality is the goal of this project.

### Idea 1

A user selects a map they are lock in until they complete all the levels. Note: map has multiple levels. 

<img width="885" alt="image" src="https://github.com/Spiker1992/tower-defence/assets/68771766/0c55c513-d53c-4a60-875f-4d082f194c7e">

### Idea 2

Levels can use different maps and paths, but as result towers would need to be placed every time new level is started.

<img width="599" alt="image" src="https://github.com/Spiker1992/tower-defence/assets/68771766/1fd6453a-ff6b-47a4-8c23-d0d5f656c45a">

### Idea 3

Have a mixture of maps and levels. Each map would have a predefined set of levels to complete. Up on completion of all levels map will be marked  as done and user will be moved to  the next map. 

For this we would use diagram from `Idea 1` and adjust the game loop logic to accomodate above requirement.


