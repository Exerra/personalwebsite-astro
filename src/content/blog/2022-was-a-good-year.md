---
description: To celebrate the conclusion of 2022, I have made a blog post about v2 of the Exerra API, CDN, a new (released) project, and a bit about my personal life.
title: 2022 was a good year
publishDate: 03 Jan 2023
image: http://cdn.exerra.xyz/jpg/new-years-2022:2023-riga.jpeg
imagealt: Image of new years celebrations in Riga, Latvia
---

New year, new blog update. To be honest, I was waiting for more stuff to share before writing a blog update, but since it is the new year I decided to release it anyway.

2022 has been an amazing year for me, and I hope 2023 is even better. I've made a bunch of amazing projects, and I have won something (read on to find out where). It hasn't been without it's downsides, for example I caught Covid-19 in september, and that was horrible, but overall it has been great (except Apple releasing AirPods Pro gen 2 a few months after I get the gen 1 :c).

# Exerra API v2

I have spent a while remaking the Exerra API. It is redesigned from the ground up to be more modular, secure and user-friendly. The original API wasn't very modular; everything was in one file (as it started in very humble roots) and thus was a nightmare to develop in. Alongside that, due to the nature of the API, it was saving a lot of files which meant it wasn't really git-ready. And to top it all off, it had Basic auth meaning it was insecure and wasn't really built to handle a dynamic user system.

... v2 changes *all* of that. Starting with the core structure - it has been built to be as modular as it can be, *and* it doesn't store any files which lets it be nicely stored on git. Auth has been built using the Identity backbone, which let me implement OAuth2 (more info about how it works later). Some small extras include: a single response system for the entire API, improvements to the Phishing API, powerful validation and more.

## OAuth2

By using the Identity system, it is possible to create OAuth2 that lets users interact with the API in a safe way. Identity has been expanded to include another record: auth. In it, there will be the users OAuth2 secret, which when coupled with the users ID can be used to generate OAuth2 tokens. With a token you won't be able to access everything though, as the auth record also will contain scopes the user has access to, and if the user doesn't have a scope needed for a route, then the request will be denied with a 401. Alongside that, if you want to have some particular scopes (provided you have access to them), you can include them in the "scopes" field when creating an OAuth2 token, which in turn will create a token with only the scopes you've asked for.

This system will satisfy everyone and let users interact with the Exerra API in ways they couldn't before.

## Response system

A large problem v1 of the API had, was that there was no single response system. Every endpoint could spit out data in its own structure. With v2 of the API, that is no more. Every single route (except the OAuth2 token issuer route) uses the same custom response function, which formats the data in this schema:
```typescript
{
    status: HTTPStatusCode,
    data: object
}
```

I know, it isn't much, but when writing applications that use the API, a unified response system goes a long way in ensuring a good development experience (DX).

## Validation

With v2 of the API, a clear focus has been set on ensuring safety. Whether it be Auth safety, or parameter safety, v2 has been built with that in mind. And so because of that, v2 of the API features strong validation of the query parameters, route parameters and body for endpoints that need it. If you have made a mistake, the API will return an error clearly stating what has went wrong. I hope the DX improvement this has is immeasurable (not only for you, but also for me 😅).

## Phishing API

The original API was... fine. It certainly wasn't bad, but developing in it wasn't nice and it was lacking crucial features. For example, v1 of the API only grabbed domains, and it saved those in a JSON file. V2 of the API grabs both domains and URLs, and it saves them in memory, which should improve speeds + make the API more git-friendly. Along with that, the "Get all" endpoint has been modified a bit to allow you to grab either all domains or all links (I seperated them because both of them are >14 MB in size), and the "Check a URL" endpoint has been modified to check against URLs first, and then domains. The response for "Check a URL" also indicates whether the URL was checked against URLs or domains. API docs for v2 are coming soon, when they are done I will update this blog post with a URL to them.

And the best part? V2 of the Phishing API brings 130k more flagged domains, and, of course, also includes the **830k!!** new flagged URLs.

## Identity API

The Identity API is now live! It isn't complete, but it does have the most necessary endpoints for 3rd party users. Currently finished endpoints include:

* Get self (Uses OAuth2 to return a (nearly complete) database record of you)
* Get user by ID (Public endpoint for getting info about an Identity user by their Identity ID. The response contains their ID, username, profile data, socials and picture)
* Find user by platform (OAuth2-protected endpoint for finding a user by a platform and their ID (only works if the user has linked that platform to their account))
* Patch profile (Uses OAuth2 to update the profile record of you)

API docs are coming soon. More info down below.

## API docs

A crucial part of every API are the docs, and sadly the release of v2 doesn't come with them. I will be working on the docs soon, I first have to fully finish the API with mostly QOL features like:

* each module of the API defining which env variables they need, and if they aren't provided then not loading those modules
* improved error handling (if a module cannot load, the API cannot load)
* speed improvements (the speed is better than v1, but I imagine there is still more stuff to be done)

When all of that is finished, I will focus more on the API docs, which should help a ton with developers adopting the API. If you want to use it now, and have any questions, go to [my website](https://exerra.xyz) as it contains social links where you can contact me (Discord is recommended).

---

# Shortener

![A mockup image of Exerra Shortener](https://cdn.exerra.xyz/png/mockups/exerra-shortener-1x.png)

After the last blog update, I have launched [Exerra Shortener](https://s.exerra.xyz). It is a URL shortener that incorporates the Phishing API for unparalleled phishing protection. Alongside that, it is one of the many (upcoming) projects in the Identity ecosystem. Sadly, the dashboard for Identity isn't done yet, but you can already sign up for an Identity account in any project using Identity.

I am looking for beta-testers, so if you want to help test Exerra Shortener (or any of my projects), then please go to [my website](https://exerra.xyz) and contact me on any of the platforms listed there.

---

# CDN

I have added Twemoji to the CDN. If you want to use Twemoji without self-hosting it on your own CDN or using the Twemoji JS library, you can use my CDN alongside my new [extract-unicode](https://npmjs.com/package/extract-unicode) package. It extracts all unicode codepoints for a given symbol, which is perfect for custom emoji libraries.

I would suggest using Twemoji for flags, as Windows 11 has completely removed country flags from its emojis, which leads to flags appearing as the country code (which is why you can see a Twemoji flag on my blog and my website).

---

# Blog

There is a new website for the blog! The file paths have changed a bit, sorry about that, but the new version features a sitemap, RSS and a nicer design! + it is built with Astro 🚀

The RSS feed puts the parsed HTML code in the description part, so you don't have to leave the RSS reader!

---

# Benchmarks

Unfortunately, I haven't had time to benchmark a lot of games, so the [Benchmarks project](https://benchmarks.exerra.xyz) has kind of died. I plan on soon giving it a fresh coat of paint (remake the design), and add info about how games run on the Apple M1 as well! I have been playing a few games on my M1 mac, like The Witcher 3: Wild Hunt and some Nintendo Switch games thru Ryujinx. I haven't yet uploaded the benchmarks as I havent updated to macOS Ventura, which features an FPS counter for games running on Metal. Once I upgrade to macOS Ventura, I will have the ability to write benchmarks for a bunch of games for Apple M1.

---

# Personal news

My blog up until now has been mostly acting as a DevLog, but I want to change things up a bit. In the [previous update](/blog/i-should-start-asking-for-financial-compensation) I mentioned that I want to start writing more technological articles which critique a technology, point out their flaws and upsides. That hasn't changed, but, sadly, I haven't yet figured out what to write about. I have a few ideas, but I haven't been able to come up with a solid article for them. What I haven't mentioned, though, is that I want to start writing more about my personal life, but my life is kinda boring and currently I want to stay a bit anonymous, so that is kind of hard to do.

There are a few news which aren't linked to me, or which can be anonymised a bit, so here we go.

## iPhone 14

![An image of the Apple iPhone 14 in purple](https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-14-finish-select-202209-6-1inch-purple_AV1_FMT_WHH?wid=1280&hei=492&fmt=p-jpg&qlt=80&.v=1661026908259)

I have gotten a new phone! I upgraded from the royal blue iPhone 12 to the purple iPhone 14 and, to be honest, the difference is underwhelming, yet nice.

The battery on my old phone already had started to degrade, and with my (usually) long days the better battery in the iPhone 14 is great. And the colour? Much better. When the iPhone 12 released I grabbed the royal blue version, which was quite nice... until the lavander colour dropped. I wanted it so bad as it is my favourite colour, but I already had bought the royal blue one. With the iPhone 14, I finally got the chance to get a purple phone, and while the colour on the 14 is a very white-ish purple, it is still a shade of purple.

The notch took some time to get used to, but in the end I preferred the smaller notch and the bolder time + connectivity icons. I read about how the notch cut into the content on the newer iPhones, but to be honest on the regular version the notch cuts in by like 1px, which is barely noticeable (I had to LOOK for it). My friends on larger models, though, are saying that it cuts in way more on a larger screen, so if you're worried about that, then pick the regular model.

I haven't yet had the time to test the cameras, as I have been sick a lot lately, but once I get a chance I will test it and include the results in a new blog post (or update this one, who knows). I mainly want to test the action mode, the cinematic mode and the filters. I've heard that cinematic mode has improved a bunch, so I am excited to test that one out.

Connectivity is a strange one. For some reason my iPhone 14 likes to switch to 3G, even when there is an LTE signal. I don't know why that is happening, but I didn't have that issue on my iPhone 12. I hope this is just some weird software issue, and will wait until the next iOS update to truly judge if it's a product defect or a software issue.

Overall, it isn't a large upgrade, but it is a solid update. Not much has changed, but the features that have been here have been polished and improved, which is something I like more than Android. A lot of Android phones add a bunch of gimmicks that aren't fully fleshed-out and get abandoned after a year or two, with Apple it is overall much more underwhelming, but the features that already have been added get perfected, and if there is a new feature then you can be sure that it will last and only get better.

## Hackathon

For anonymity purposes I won't reveal which hackathon it was, but I have won first place in a nation-wide hackathon! 🥳

The prize sum was definitely nice, and I've already bought a few tech products with it. I haven't yet gotten a Raspberry Pi, which was one of the things I wanted to indulge in, but the prices have been actually insane! Old models are selling for 100 €, and newer models aren't in a better state! 130 € for a 2gb version of the Raspberry Pi 4 Model B is insane, and the larger RAM models are even more expensive. Sadly, an Arduino isn't going to cut it for me, so I am now waiting for a good deal, which seems to only exist on eBay (not even in local stores 😕).

Nevertheless, I have bought a few goodies and have saved the rest for a good deal on a Raspberry Pi and some more items I am currently checking out (like a desk mat! I am torn between leather and the other material, so if you have a preference please tweet at me!).

---

And with that, the blog post comes to a close. I hope that 2023 can bring great projects to you all, and I may even start making SaaS projects (something I've been putting off for a while). I wish you all a happy 2023.
