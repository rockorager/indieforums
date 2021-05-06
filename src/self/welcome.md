---
title: Welcome to IndieForums!
date: 2021-05-05+'T'+19:46:09-05:00
layout: self
permalink: /self/welcome.html
---

IndieForums is a proof-of-concept site built around the [IndieWeb](https://indieweb.org). All content on this site (with the exception of /self/ posts) is generated through [webmentions](https://webmention.io).

## Quick Start

To submit a top level post, send a webmention from your post to indieforums.net. That's it. The cleanest way to do this is an empty `a` tag with `class="u-syndication"`. 

![Example of syndication link](../assets/img/indieforums-syndication-example.png)

To reply to a thread, send a webmention to the URL of that thread ("https://indieforums.net/threads/7de25018ef5fdcbf.html"). You should also include a reply-to webmention back to the original authors site, too. To make this easy, just click reply on any post and the links for that post will be ready for you!

![Example of reply](../assets/img/indieforums-reply-example.png)

If you don't have a site, check out the [Getting Started](https://indieweb.org/Getting_Started) section of the IndieWeb wiki. [Micro.blog](https://micro.blog) is probably your quickest choice.

## But why?

The IndieWeb is a decentralized way of interacting on the internet. Through webmentions, one site (or person, organization, etc) can tell another that it was linked to, that they replied to a post, liked a page, RSVP'd to an event, bookmarked a page, etc. You can also syndicate your post to other sites, and that is the mechanism for publishing to IndieForums. Using the IndieWeb to run a forum means the forum needs no database. No usernames, passwords, forms. All content is independently archived somewhere else on the internet.

And why a forum? Who doesn't like old-school forums? You want threaded comments? Not here! Just plain old sort-by-new, single threads.

## More site details

This site is built using the following tools:

- [11ty](https://11ty.com) to build the site
- [Github](https://github.com) to host the repository
- [Netlify](https://netlify.com) to host the site