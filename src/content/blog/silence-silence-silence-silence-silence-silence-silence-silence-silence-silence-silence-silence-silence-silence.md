---
description: I've been gone for a while, but I've released a package, improved Karen Bot & API.
title: The silence, it's deafening
publishDate: 07 Nov 2021
image: https://cdn.exerra.xyz/png/icons8/casual-life/clock-and-calendar_512x356.png
alt: Clock and calendar
---
# Where I went

There's a little app I'm making. Now, I won't spoil it because it is not nearly done (still working on iCloud stuff), but what I can say is that it is sweet, will be 1,99$ and will only be on iOS (possibly on M1 too if it works well there). My goal is to make it be iOS 14 and up, but supporting 14 is quite difficult and if the market share is big enough I may go with iOS 15 and up (it will upset my jailbroken friends, but just don't jailbreak :fr:).

---

# node-musickit-api

A month(?) ago I released node-musickit-api. It is a simple to use and elegant wrapper for the Apple Music API. Currently it supports both catalogue and personalized routes. The package also handles authentification, but for personalized routes you will need to somehow obtain a user token because Apple doesn't have any methods for that in the documentation. If that seems like something you're interested in you can check out [the documentation](https://musickit.js.org/#/).

---

# Karen Bot

This section focuses on various things that have happened to Karen Bot

## Twitter

Karen has a twitter now! It just informs about status updates for now, but it may do even more in the future :eyes:

<p><TwitterFollowButton screenName={'KarenBotDiscord'}/></p>

## Code updates

Karen Bot has not been receiving that many code updates. I've only committed these things to the repo:

1. Changed some outdated images that returned a 404 (now hosted on my CDN)
2. Changed some embed colours
3. Added a self-hosted GitHub runner that along with a GitHub action automatically deploys code

The GitHub runner was a bit interesting to set up, which I had done because I wanted to change hosting from Heroku to my own VPS. First I needed to create a relatively safe environment for Karen Bot to run in; I accomplished it by creating a new user with barely any permissions that can't do anything crazy. Then, I had to create a script to launch Karen Bot which was super easy to do with GitHub runners and only took me about 20 mins to create and iron out the imperfections. With this new switch of hosting providers I can ensure that Karen Bot has minimal downtime which most likely only will be due to deploying code. Sadly, though, during the whole process Karen Bot was down for which I apologize, From now on Karen Bot will have minimal downtime.

---

# API

For those who don't know, my API handles most of Karen Bot's tasks alongside with some other comparatively insignificant things.

## Switch from IPv4 to IPv6

During 2021-11-01 I decided to switch the API to IPv6. In theory it should make speeds faster

.. in theory

You see, IPv6 transmits larger packets, which for small requests isn't ideal. Along that, many ISPs have terrible support for IPv6 resulting in some peoples speeds dropping to a halt. Previously the response time for a request made in the US from my monitoring software was roughly 200, maybe 250 ms; after adding IPv6 it doubled to around 500ms

![Chart showing historical response times](https://cdn.exerra.xyz/files/png/api_response_time_nov1-nov2.png "Response times")

Because of all of this, I will schedule API maintenance on 2021-11-09 to go back to IPv4. During that the API will be down.

## Possible future of the API

### Websockets

Currently the API only supports HTTPS endpoints, but I am exploring the idea of having certain things be websockets. I may rewrite Karen Bot and it's segment of the API to use websockets allowing the server to send events as soon as they happen (e.g guild settings changed and stuff). It's not a guarantee, and profiles definitely won't be rewritten, but for some aspects websockets make way more sense than webhooks.

### Streaming platform

This one will be purely for fun, but I am thinking of creating something similar to Twitch to stream/record gameplay. It is not intended for a lot of people to use, mostly just me doing it for fun, but if I do manage to make it I will definitely write a guide :)

## Mail server

I am thinking of making a mail server (mostly for myself) because I don't want to pay Zoho (my current mail provider). Unfortunately, I haven't had that much luck seeing any good mail servers with relatively simple install steps, so if you have any please send it to exerra@exerra.xyz :)

I can also offer a service to have @exerra.xyz emails if people really want it

---

# A few ending statements

Congratulations, you made it to the end. I hope you liked my blog post, I spent all of my free time writing it haha

If you want to support me or the work I do, you can always donate either on [Kofi](https://ko-fi.com/exerra), [LiberaPay](https://liberapay.com/Exerra/) or [directly thru Paypal](https://paypal.me/exerrabusiness)

If you're thinking of using DigitalOcean, you can use my promo code to get credits worth 100 USD for 60 days and when you spend 25 USD I will get 25 USD in credits! It is a mutually benefitial deal

[![DigitalOcean Referral Badge](https://web-platforms.sfo2.digitaloceanspaces.com/WWW/Badge%203.svg)](https://www.digitalocean.com/?refcode=724deb483716&utm_campaign=Referral_Invite&utm_medium=Referral_Program&utm_source=badge)