---
description: Email replies are essential, and if you are building a service that requires the sending of email replies, this is for you.
title: How to reply to an email in code
image: https://share.exerra.xyz/sharex/2023/05/lyAaiaGQBO.png
publishDate: 17 May 2023
author: exerra
hideToC: true
tags:
  - email
---

Email replies are an essential part of the email experience, and if you are building a service that requires the sending of email replies (for any reason), keep reading!

Each email sent contains headers with information about return paths, authentication results, provider info, signatures, subject, content type and etc. For replies, **the ones you should care about** are the headers `Message-Id` and `References`. **These provide references** for email providers, in order to let them determine to which email you are replying.

To make your email a reply, **just return a `References` header** with the value of the `References` header of the email you're replying to and the `Message-Id` header at the end, **alongside a `In-Reply-To` header** with the value of the `Message-Id` header.