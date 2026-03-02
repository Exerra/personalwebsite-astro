---
description: Release of a package, rework of a website and plans for CDN improvement.
title: I've been quite busy
publishDate: 18 Aug 2022
image: /assets/blog/casual-life-3d-likes.webp
imagealt: Image of a woman receiving likes
---

It has been quite a while since the last update, and of course a bunch has happened.

# react-fingerprint
I have created a package for generating a fingerprint in React. As far as I've tested the fingerprints are unique, have the same result for incognito mode and so on. Usage is *very* simple and if you are interested, [check out the docs](https://docs.exerra.xyz/docs/npm-packages/react-fingerprint/v1.x.x/intro).

It is made in Typescript so if you are using Typescript (you should if you aren't) then types are already built in. No reason to install a seperate `@types` package 😊

---

# Website overhaul
If you have visited my website in the past few months, you would have noticed that my website is different from the one before. Lemme tell you a few of the things changed

## Framework
I have recently fallen in love 💜 with Remix. I quite like the versatility of it and the SSR aspect. Because of that, I have made the website in Remix and TailwindCSS.
 I much prefer Tailwind over CSS because I find CSS files to generally be a mess of "where is this colour defined".

Beforehand, I was using a flavour of Vue that could be added to static HTML files to make them interactive. I had a mock "api" (and I am using that term **very** loosly) to fetch data about me client-side and then fill that data in. That proved to be quite a good method for easily changing the content of stuff, but was quite inefficient due to having quite a bunch of requests. Now the data sits in the loader function of the page which means that no API calls have to be done for them, not even server-side.

## Design
I could've went with the old design, but I thought that something more fun would be better, so I overhauled the design to be bright, colourful and card-shaped.

Each little piece of info is in its own card which makes it pop out more against the background.

## Last.fm
I have also added a Last.fm widget in the "About me" section. I spent quite a while figuring out how to do it. On one hand, if I only render it server-side it will not update when I start playing a different song, but if I only render it client-side then the user may not see it due to having JS be blocked (and Remix is about working without JS).

So I went with a hybrid approach. The server fetches the info and renders it onto the page, then sends it out to the client. When the client has received it, provided they have JS on, React starts a 10 second interval where it checks for changes and updates the widget accordingly.

Positives are that it works both with and without JS (and even updates!), but the negatives are that due to the server making an API call the time to first byte ([TTFB](https://web.dev/ttfb/)) is quite larger. Ultimately, I have decided that the [TTFB](https://web.dev/ttfb/) isnt large enough to go full client-side rendering for the widget.

**18 Nov 2022 update**: The widget is now entirely client-side for better SEO.

---

# Docs
As you might've seen, I have a docs website. It's purpose is to serve as a unified documentation system on all of my projects. It is built with Docusaurus which means that it is pretty, fast and customisable. I have already put my API docs, package docs and bot docs there and if I ever create a new type of project that needs docs, it will be there.

---

# Why are some CDN links broken?

![Gif of a 404 page](https://cdn.exerra.xyz/gif/404.gif)


Back when it was created, my CDN was meant as a quick way of storing files useful for my projects. It still is like that, though I have added stuff for the general public (Beta profiles of Apple OS's and so on). Eventually it grew into what I consider to be critical infrastructure

... and as with all critical infrastructure, eventually *something* goes wrong.

## What happened

I was clearing out some temporary files and accidentally forgot to add the file to the `rm` command. What should've been `rm -Rf cdn/file.zip` turned out to be `rm -Rf cdn/`. Thankfully, I had a backup, but it was quite old and so a bunch of additions were missing.

## CDN imperfections

As you can see, a quick command can wipe out an *entire* CDN used by a lot of projects. So, what exactly is the issue and are there any other future problems?

### Hosting

The CDN is hosted on a single server along with the API. As it is not the best server, if it gets overloaded for any reason (DDoS (which shouldn't happen due to Cloudflare but whatever), API overloaded, etc) then the CDN gets shut down as well. I have an idea on how to solve this, so keep on reading.

### Backups

A single command wiped out my entire CDN, but what saved me? **A backup!**

Unfortunately, it was quite old and thus a bunch of stuff was missing.

Backups for the CDN are done on Google Drive using rclone. Unfortunately, I am not in the habit of subscribing to every thing I see so I am limited to 15gb which is not ideal for a CDN of around 30gb.

## What can be done?

I am looking into moving the CDN to AWS (S3 + CloudFront) in order to have reliability, idiot-proofing (can't accidentally `rm -Rf` the CDN) and easier backups.

Pricing is quite good as well for (what I think) is usual usage.

> <!--StartFragment-->
>
> Tiered price for: 50 GB
>
> 50 GB x 0.0240000000 USD = 1.20 USD
>
> Total tier cost = 1.2000 USD (S3 Standard storage cost)
>
> 50,000 GET requests in a month x 0.00000042 USD per request = 0.021 USD (S3 Standard GET requests cost)
>
> 200 GB x 0.0008 USD = 0.16 USD (S3 select returned cost)
>
> 1.20 USD + 0.021 USD + 0.16 USD = 1.38 USD (Total S3 Standard Storage, data requests, S3 select cost)
>
> **S3 Standard cost (monthly): 1.38 USD**
>
> <!--EndFragment-->

I will experiment with that in the coming months and if it works good, I will switch the CDN to it while preserving the same URL structure (if even possible 😵‍💫)