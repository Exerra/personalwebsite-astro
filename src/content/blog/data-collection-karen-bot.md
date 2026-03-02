---
description: I am thinking about adding data collection. Find out more details in this post.
title: Data Collection for Karen Bot
publishDate: 23 May 2021
author: exerra
tags:
  - karen
  - api
---
Hiya!\
Here I will discuss my **plans** for data collection. I will be serious here since it is quite a delicate subject. **This is not finalized** yet and is **just an idea**. All criticism can be directed towards my Twitter ([@Exerra](https://twitter.com/Exerra)) or my email ([exerra@exerra.xyz](mailto:exerra@exerra.xyz)). **Your feedback is important** to me and I really want to create the best experience for Karen Bot.

# For users

So, don't worry it won't be so severe as Google or something. It will just interact with the Spotify commands and display your most searched for artists and their genres. **None** of the data will be exported to 3rd parties and it will be opt-in only.

## So how will it work

As mentioned before, it will interact with the **Spotify** commands to get your searched **artists** and their **genres** (e.g if you search for "Boyshit" it will send that you searched for a song by Madison Beer, and then send Madison Beer's genres) and after a while it could develop an understanding for what artists and genres you like and display them in your profile.

## What about my privacy

Data is **not** shared with 3rd parties. It stays safe in my servers. It will be **opt-in only** and **you will be able to delete that data** if need arises. I am actually wondering if I should implement a super easy way or data erasure only by contacting me thru email, send me feedback wherever you can about that, please.

## What will be the benefit

A nicer and more feature-rich profile command that can display data based on how you use Karen Bot.

# More advanced stuff

## How will it work

All profile related things stay on my servers. When you use profile commands it takes data from my central server. What I want to do here is that when Karen Bot's Spotify features get triggered, it fetches the Spotify API, then gets the artist and then fetches data for the artist, and then gets their genres (because Spotify API doesn't display genres for albums or songs) and sends that data over to my server which then processes it and saves it in the database. It won't immediately display that stuff in the profile, instead it will wait for enough data to accumulate so it can understand what the user likes and *then* display it.

## Opt-in system

I actually haven't decided how the opt-in will work. I am wondering if I should make the Spotify and Profile features just not work unless the user has opted in, or, limit their functionality. Again, please send me feedback everywhere you can.