---
title: Arc is worse than advertised
description: A privacy analysis on Arc - a comparatively unique browser by The Browser Company.
publishDate: 08 Jan 2023
image: https://share.exerra.xyz/QGO2Cl2.png
imagealt: Image of the Arc browser
---

Arc is a browser by the startup named "The Browser Company". It claims to be a different, better, browsing experience. The idea is unique in comparison to what Google, Mozilla and Apple is doing with their browsers, but it isn't anything revolutionary, and some browsers have already implemented certain features of Arc long ago.

If Arc was just what it is at face value, I wouldn't be writing a blog post. So far from what I've seen nobody is talking about this, so I feel obligated to write an analysis on Arc by Browser company.

In order to understand what Arc is about and be able to check network logs, all of the research was done on Arc.

---

# Arc's gimmick

The Browser Company invisions Arc as a revolution; as a browser that will change the way you use the internet. Arc does have unique features that other browsers don't, such as:

* A command bar
* Split view
* Boosts (extension maker for non-coders)
* Notes
* A whiteboard feature
* Previews on pinned tabs (only have gotten it to work with Google Calendar though)

While these features are nice-to-haves, I do not believe that they are must-haves. If you become proficient with them, sure they can be must-haves, but using the browser is weird at first and you have to re-learn how to browse the web (large friction points are never good). And there are a few features which already exist on some browsers, but not others. For example: Spaces.

Spaces is an organisational tool which lets you split your tabs, pinned tabs, bookmarks and notes into seperate screens. Normally this would work with user profiles and multiple windows on most of the other browsers, but Safari already has such a feature, and considering that Arc is (currently) only available on macOS, you have to wonder if the high friction point and loss of some Apple ecosystem exclusive features is worth it.

---

# The bad side of Arc

Arc, like many apps, sends analytics. Normally that isn't an issue, but in Arc's case a number of factors make this, in my opinion, pretty shady.

While poking around in my proxy with Arc open, I noticed the analytics. I thought nothing of it until I saw just how frequently it got sent, so I decided to investigate. Arc features analytics by Segment and monitoring by Sentry.

Sentry is a performance and error monitoring service. It is built for developers to monitor any issues with their code, and is nothing to worry about. Normally it doesn't send anything unless an error has occured.

This is where it gets shady. Segment is a customer data platform by Twilio. It can build a profile on you across all platforms and channels and is most often used to deliver personalised experiences (mostly in commerce). There are plenty of analytics services that anonymise data and don't track users, but Segment is not one of them. Each request that gets sent includes a unique user ID for each user, so they can see exactly how **you** are using a service. Furthermore, the analytics that Arc sends includes the screen size, OS, locale, device (type, model, manufacturer), timezone and network connectivity.

Every time Arc is put into the foreground/background, it sends an analytic. Every time you open a URL, it sends an analytic. Hovering over the top bar? Arc sends an analytic. Dismissing a pop-up that Arc throws at you? Also sends an analytic. Most of what you do sends over an analytic to Segment's servers, where it then can be routed to different Analytics services & be used to build a profile of how **you** use Arc and what devices you own.

![Network logs of the analytics](https://share.exerra.xyz/pMT4mpV.png)

Let's not pretend that this isn't common, though. The most popular browser currently (and on whose engine Arc is based on) sends web usage data to Google, which includes the URLs you go to and more, but Arc doesn't send the URL you have visited. At this point you must be wondering why Arc sending analytics data is so blasphemous when Google sends *more* data. Well, you can disable the Google Web Usage data collection in your Google account settings, but you *cannot* disable Arc analytics, which also build up a profile on you that can be used to target ads (Segment is actually built for that, from what I can see). Google also lets you export your data easily and check what data it has collected on you, but Arc has no such feature. Furthermore with Google there is only one privacy policy, but with Segment that data can be routed to many different services, each with their own privacy policies that **can change**. Remember, if a tech company starts out with a strong privacy policy, that doesn't mean that they will never sell your data, as privacy policies can **always** change to allow more and more data harvesting and selling. Currently the privacy policy for The Browser Company seems to be fine, but you can never trust tech companies.

---

# In summary...

Arc is an app that sends analytics data to Segment, a customer data platform by Twilio, and Sentry, a performance and error monitoring service. Segment's analytics service is not anonymous and includes a unique user ID for each user, as well as information about their device and usage of the app. This data is used to build profiles of users' app usage and can be routed to other analytics services for targeted advertising. Google's Chrome browser also collects data on users' web usage, but this data collection can be disabled in the user's account settings and the collected data can be exported and reviewed. In contrast, Arc does not have a feature to disable analytics collection or review collected data, and the data collected by Segment can be routed to multiple services with potentially changing privacy policies.

If you are fine with that level of analytics, Arc is a great (but hard to get into) browser with interesting features that you could find useful, not to mention the unique (and nice) style. But if you are concerned about your privacy and the potential for your data to be used for targeted advertising, you may want to consider using a different browser that offers more control over data collection and usage.
