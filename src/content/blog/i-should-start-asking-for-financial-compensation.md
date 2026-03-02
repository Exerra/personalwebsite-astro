---
description: I've released Benchmarks, am working on Identity and have news about my CDN and the horizon.
title: Projects on the horizon
publishDate: 04 Oct 2022
image: /assets/blog/casual-life-3d-workspace.webp
imagealt: Image of a workspace
author: exerra
tags:
  - project-launch
---

It's been 2 months since the last update, not much has happened, but there are a few updates and new pieces of info.

# Benchmarks

For the past few weeks, I have been building a platform for benchmarks 📊. The platform focuses on GPU benchmarks for games, with integrated GPUs being the main focus as they *often* are underrepresented and need the benchmarks more than dedicated GPUs. It is already live and you can check it out by [clicking here](https://benchmarks.exerra.xyz)!

## How it works

The obvious choice would be to create a statically generated website with frameworks like Hugo or even NextJS (hey, that's what the blog runs on!), but that would mean that I have to re-build the website every time content changes; which isn't necessarily bad, but if Cloudflare ever decides to add build minutes for Pages, I would be kinda screwed.

So what did I do? I made the website with **Remix & TailwindCSS** (which is what I have been using for everything lately, gotta 💜 Remix & TailwindCSS) and the "backend" is **AWS S3**. S3 offers a great API for listing, which is critical for the search feature and I can add new benchmarks *without* rebuilding the entire website (which can start becoming quite long with large sites).

## 3rd party benchmark support

I am thinking of letting people submit their own benchmarks, but currently I do **not** want to deal with validating that data  so instead if people want me to cover a certain game they can send an email (exerra@exerra.xyz).

---

# Identity

I am actively working on a new identity system for all of my projects. It is not done yet, but I am almost finished writing the code for it and I hope to release it within the next 2 months (yes, it is quite long, but we are talking about an identity system here 😅). I have made sure to make the system flexible so I can slap on new projects willy-nilly.

As this is a sensitive project, I cannot elaborate that much on what is going on in the background as that will expose the project to attacks, but I will tell you about the surface-level stuff and be transparent about the data stored.

## Data stored

To make this make sense, I will have to introduce **2 new terms: "Fixed data" & "Dynamic data".** Fixed data is key/value storage where **the fields cannot be removed** (such as user info, username, socials, etc). To be clear, the value of those fields can be changed or even set to "", but the field itself cannot be deleted. Dynamic data is data that gets generated on-demand and **the fields can be safely removed** without breaking anything (such as info from various services, etc).

With that out of the way, let me talk about the data stored.

### User info (Fixed)

In this category, Identity will store information about the users' username, profile picture, legal name, country, email, and *possibly* phone number (it is there in case I need it, but currently I have no plans on using it so it will not be required).

### Socials (Fixed)

In this category, Identity will store information about the users' socials. None of the fields are required, but if you try to use a service that is associated with a social (for example Karen Bot dashboard which is associated with Discord), you will need to link that social to your account in order to use the service.

### Services (Dynamic)

So this is where I can give a less detailed explanation due to the nature of the data. This is where services can add their own data for whatever purpose they might have. There are a few shared fields that I can elaborate on, but the rest is entirely up to the service.

The shared fields are metadata about when the user has first accessed the service, when they have last accessed the service and, lastly, if they even have used the service (more of a fail-safe since there shouldn't be any data on a service if it hasn't been used)

The dynamic nature of this category will really help me create better websites with a centralised identity service while still letting me be flexible on the data, which is the main reason why I went with this approach.

## Data removal

As I live in the European Union, I am subject to its data protection laws and therefore have to have a way to fully remove the data stored. Even if I wasn't subject to those laws, I would still offer a way to do it, but since I am subject to those laws you can rest assured knowing that such functionality will not be removed.

As of writing, there is no way to fully remove the data stored, but it is in the pipeline and will be there when Identity is going to be available to the public.

## How it works

As I said before, I cannot talk much about what is going on in the background, but I can say that it uses Auth0 for the actual login/signup and user management.

---

# CDN

In the previous blog post, I mentioned how I was going to move to S3. This is the update to that.

## What has happened

After I published the blog post, I created a bucket in S3, moved all the files over to there, and started trying to make it work. At first, it didn't quite succeed, and the way S3 works is that I had to change the DNS records to S3 for it to even have a chance to work, so for a bit of time the CDN was down on 2022-08-18.

Eventually, I got everything figured out and it worked, but I had an issue where I no longer could browse the files as before, so I added [AWS S3 Bucket Browser by qoomon.](https://github.com/qoomon/aws-s3-bucket-browser) I had to change a few settings, so the CDN was down on 2022-08-19 for a few minutes as well.

I am sorry about the CDN being down, after this the CDN should have a >99,9% uptime.

## Before the move

Before I moved to S3, the "CDN" was an express server using the serve-index package to serve files. Because of that, the reliability wasn't that great as I was hosting it on a very cheap VPS with 1GB of RAM and a 1 core shared CPU. I did that when I had a decent VPS and didn't need the CDN beyond my profile picture and a few other things, but now with it growing in scale and *needing* the uptime, I have finally made the switch to S3. Best part? My API that was hosted on the same VPS is now more stable as well, and the CDN costs me like 0,25 € a month!

# Future plans

And with this blog post coming to an end, I want to just talk a bit about what I have planned for the future.

In terms of projects, I plan on finally creating the Karen Bot dashboard. The main reason why I haven't done it yet is simply that I had an idea for the Identity system and didn't want to create it before the Identity system. I also plan to create new bots and start separating from the Karen Bot umbrella as the bot has become too old for me to update. I could redesign Karen Bot, but I have no real motivation and time to do it.

Another idea I have been exploring is paid APIs. I know, I know, they kinda suck from a development POV, but infrastructure costs money and I need to start subsidising the projects I am hosting right now.

Beyond projects, I want to start creating blog posts about languages, technologies ([like this example](https://t3.gg/blog/post/types-and-nextjs)) and other more technical subjects. I also want to start making guides, which could go either on the blog or [my docs](https://docs.exerra.xyz/) (which is more likely). I could also start tinkering with real hardware, which seems like it would be a really fun side hobby that I could document on my blog 😄.

P.S: I totally didn't write this blog post on the same day my benchmark website released just so google could see it and display it on search results 👀👀👀