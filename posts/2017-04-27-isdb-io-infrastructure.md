---
id: 1191
title: ISDB.IO Infrastructure
date: '2017-04-27T15:14:59.000Z'
author: kaplandj
guid: 'http://deanonsoftware.com/?p=1191'
thesis_thumb_width:
  - '66'
thesis_thumb_height:
  - '66'
categories:
  - Laravel
  - PHP
  - Software Business
  - Software Design
---
[ISDB.IO](http://isdb.io) Infrastructure.

The site is hosted on AWS. M4 Large in US East running everything. I decided to start to make my life easy. So Postgres and Laravel PHP pieces are on same machine. No reason to scale early and the machine is big enough to make early going perform fine. The API and Web Application are deployed together for now, but are easy to split apart.

So I also used [Laravel Forge ](https://forge.laravel.com/)in an effort to save time. I’m a big fan of one click deploys. But here is where it failed me miserably. One thing I wish Taylor would enhance is the EC2 instance choices. They are very limited currently. So the instance I picked was not in the list, which led me to use [Matt Stauffer’s tutorial](https://mattstauffer.co/blog/laravel-forge-hosting-on-aws) for custom VPS’s.

The other gotcha was the SSL Cert. This just didn’t work out for me in Forge. I seem to be going round and round chasing my tail. I wanted to put the main server behind a load balancer and use letsencrpyt.org. That was not a good option under Forge. Putting the SSL cert on the load balancer seemed like a smart thing to do. A quick email to Forge support and Taylor suggested I use the AWS Load Balancer directly. Outside of Forge. That was a good idea and on top of it Amazon gives you free SSL certs.

Note: you do need to setup Laravel App to play nice (cookies) behind the load balancer. Use this [Truster Proxy Package](https://github.com/fideloper/TrustedProxy) and you are good to go.

So in the future scaling this app by breaking putting more instances in front of db will be easy. I could use AWS and let it spin up snapshots automatically. Now all we need is more traffic.
