---
description: Comprehensive guide on how to send emails from a Cloudflare Worker with MailChannels with proper DKIM.
title: How to send emails from Cloudflare Workers with MailChannels & DKIM
publishDate: 17 Jun 2023
author: exerra
tags:
  - email
  - cloudflare
  - workers
  - mailchannels
  - spf
  - dkim
hideToC: true
image: https://share.exerra.xyz/4PGtCPo.png
---

**Mailchannels will be shutting down the Workers Email API on `July 1st 2024 @ 00:00 (UTC+0)`. This WILL cause all existing projects to break and any future projects won't work.**

**More information [here](https://support.mailchannels.com/hc/en-us/articles/26814255454093-End-of-Life-Notice-Cloudflare-Workers).** 

---

If you're using Cloudflare Email Routing alongside Cloudflare Workers, you've probably noticed an issue. You can only send or forward emails to approved email addresses. Fortunately, if you want to send emails to any address you want, [Cloudflare has partnered up with MailChannels](https://blog.mailchannels.com/mailchannels-enables-free-email-sending-for-cloudflare-workers-customers) to provide every Cloudflare customer free email sending through a Cloudflare Worker.

This is a complete guide for sending emails using MailChannels through Cloudflare workers.

# Creating a worker

First, make sure wrangler is installed. You can use the [official guide](https://developers.cloudflare.com/workers/wrangler/get-started/)

Then, create a Cloudflare worker project. For the sake of this guide, we will be using the TypeScript template.
```sh
npm init cloudflare my-project worker-typescript
# or
yarn create cloudflare my-project worker-typescript
# or
pnpm create cloudflare my-project worker-typescript
```

Then navigate into the directory by doing 
```sh
cd my-project
```

---

# Setting up DNS records

Before we go any further, we need to generate DNS records for SPF and DKIM. I'll assume that Cloudflare has already auto generated the DMARC DNS record, and that you haven't touched it (since you really shouldn't!).

## SPF

A Sender Policy Framework (SPF) record is a type of DNS TXT record that lists all of the servers authorised to send emails from a particular domain.

Without this record, if we try send an email through MailChannels, email servers wouldn't know if MailChannels is authorised to send emails.

(Fun fact! I spent a week troubleshooting DKIM not working, because I forgot to add this!)

**If you DO NOT have an SPF DNS record already** (which is unlikely), just create a new DNS TXT record, with the name being the domain you want to send emails from (if no subdomains, then just put `@`) and the value being:

```
v=spf1 a mx include:relay.mailchannels.net ~all
```

**If you do** (which you should already have if you set up Email Routing), add `include:relay.mailchannels.net` after the other includes. Example:

```
v=spf1 include:_spf.mx.cloudflare.net include:relay.mailchannels.net ~all
```

![Adding the TXT record](https://share.exerra.xyz/hDOWMYA.png)

Pro tip: You cannot have multiple SPF TXT records, so if you have to add another include, just append it in the existing TXT record.

## DKIM

DKIM ensures that emails you sent are verifiably yours. Without DKIM, people could send emails in your name, and no one would know it's not you!

*This part was taken from the wonderful GitHub repository [`maggie-j-liu/mail`](https://github.com/maggie-j-liu/mail/tree/main#readme)*

### Generate the private key

To generate a private key and upload it to the worker, run the following command
```sh
openssl genrsa 2048 | tee priv_key.pem | openssl rsa -outform der | openssl base64 -A | wrangler secret put DKIM_PRIVATE_KEY
```

`openssl genrsa 2048` generates a 2048-bit RSA key.

The output of that is then passed on to `tee priv_key.pem`, which writes the key to the `priv_key.pem` file.

Then THAT gets passed on to `openssl rsa -outform der | openssl base 64 -A`, which converts the key from the PEM format to the DER format, then base64 encodes it (pretty much just removes the header from the PEM formatted key).

And, finally, the output of that gets passed on to `wrangler secret put DKIM_PRIVATE_KEY`, which adds the base64 encoded key as a secret in the Cloudflare Worker.

### Creating the DNS record

Now we need to add the public key to a TXT record. Run the following command:
```sh
echo -n "v=DKIM1;p=" > record.txt && openssl rsa -in priv_key.pem -pubout -outform der | openssl base64 -A >> record.txt
```

This creates a public key from the private key (`openssl rsa -in priv_key.pem -pubout -outform der`), encodes it in base64 (`openssl base64 -A`), and finally writes it to the `record.txt` file.

Copy the contents of `record.txt` file and add it as a TXT record of `mailchannels._domainkey`.
```
mailchannels._domainkey IN TXT "<content of the file record.txt>"
```

![Adding the TXT record](https://github.com/maggie-j-liu/mail/raw/main/dns.png)

## Domain protection

After this blog post was written, MailChannels has introduced [Domain Lockdown](https://support.mailchannels.com/hc/en-us/articles/16918954360845-Secure-your-domain-name-against-spoofing-with-Domain-Lockdown-) that is MANDATORY for Cloudflare Workers users… which means yet another DNS record to add.

First you need to obtain your Workers subdomain. Go to "Workers & Pages" on your Cloudflare account, and in the right sidebar it should be there.

![Cloudflare Workers subdomain](https://share.exerra.xyz/sjXluJ2.png)

After that, add a TXT record `_mailchannels` with the value of `v=mc1 cfid=<WORKERS SUBDOMAIN>`

**Note that it may take a while for this to update - if it doesn't work at first, wait a bit.**

Also, you can add as many `cfid` as you want, so I would also suggest adding one for both your domain and the subdomain of the CF Worker you will be sending email from (not sure if it does something, but just in case). 

![Domain protection TXT DNS record example](https://share.exerra.xyz/azfwwKa.png)

---

# Call the MailChannels API

MailChannels has created a transactional API for Cloudflare customers. This API can only be ran from Cloudflare IP addresses, so don't even try to run it from your own server (or on local mode).

```ts
// src/index.ts

interface Env {
  DKIM_PRIVATE_KEY: string;
}

export default {
    async email (message: ForwardableEmailMessage, env: Env) {
        const { DKIM_PRIVATE_KEY } = env

        let emailReq = await fetch( 'https://api.mailchannels.net/tx/v1/send', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify( {
                personalizations: [
                    {
                        to: [ { email: "" }], // who to send the email to, add your own recipient
                        dkim_domain: '[YOUR DOMAIN]',
                        dkim_selector: 'mailchannels', // [selector]._domainkey.yourdomain.com
                        dkim_private_key: DKIM_PRIVATE_KEY,
                    },
                ],
                from: {
                    email: '' // add your FROM email here
                },
                //reply_to: { email: email.from.address },
                subject: "Subject",
                content: [
                    {
                        type: 'text/plain',
                        value: "content",
                    }
                ],
            } ),
        } );
    }
}
```

More documentation on the transactional API can be found [here](https://api.mailchannels.net/tx/v1/documentation).

---

I made a small edit that fixed a major issue, sorry if you had any issues with what I wrote beforehand 😥