---
id: 1204
title: Questions about Laravel Vapor
date: '2019-07-26T16:49:58.000Z'
author: kaplandj
guid: 'http://deanonsoftware.com/?p=1204'
thesis_thumb_width:
  - '66'
thesis_thumb_height:
  - '66'
categories:
  - Software Business
---
I’m impressed with the concepts behind Laravel Vapor, but I’m curious about some of the tech behind the curtain. I’d love to get some answers from Taylor on these before I buy.

  1. I assume AWS Lambda is used to execute the Laravel/PHP code behind the scenes?
  2. PHP is not a native language for Lambda. Can you elaborate how this was done?
  3. Lambda suffers from a cold start problem that sometimes causes uneven performance. Was anything special done to alleviate this?
  4. Is there a business case for using serverless for a Laravel App or API? Will this save users money?
  5. Databases still forces one to buy a separate AWS instance. Same with cache and any other external services. Can I use an existing database instance already reserved? Is Postgres supported? And is there any support in your console for database replicas, etc.? And automatic scaling “does not” apply to databases, correct?
  6. Does Vapor require the newest version of Laravel? (yes I’m behind a bit).
  7. Where does the code push to as final landing place? If I remember code gets run out of a S3 bucket.
  8. Is this vendor lock-in for Laravel cloud deployments? or do you have plans for other providers? Azure or Google?
  9. Does Vapor make Forge redundant? There seems no reason for both if one decides to go in this direction.

I appreciate if you could address my concerns. Great work as always!
