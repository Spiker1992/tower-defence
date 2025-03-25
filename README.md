# Tower Defence

The broad goal for this project would be to deliver a Tower Defense game, which many of us may have played in the past. For those who haven’t, the Tower Defense game involves placing towers strategically around the map to defend against waves of enemies. This game offers various avenues for development, we have the map, enemies and towers that can be modelled to start with. And there are plenty of opportunities to expand the business logic or visual representation of this game.

For this game, I will use TS (TypeScript) and Jest, but the scope of my stack may grow as we dive deeper. Whilst, I will be using TS, the same solution can also be produced in other languages (i.e. Python, PHP). 

I have used TS for three reasons:
1. It has low barriers to begin work. We just need an NVM and NPM on the machine. 
2. I could have gone with JavaScript, without TS, which would have reduced barriers even further down, but static typing, in my opinion, is priceless. With static typing, we can reduce errors and make our code easier to understand.
3. Lastly, this should make it easier and quicker for us to interact with UI.

Tower Defense consist of multiple core parts: 

- Grid. This will be used to place game elements.
- Enemy Path. This is the path our enemies will travel on.
- Enemies. Enemies will use a path to move on.
- Tower. Towers can be placed within the grid outside of the path.


At this initial stage, I would focus on the mechanics of the game, listed above. As a result, we will lay a foundation that we can then expand. 

# Introduction

In this REPO I am recreating the game in an Event Sourced way. I started working with an enemy behaviour and everything enemy related can be found within the `/src/enemy` folder. 