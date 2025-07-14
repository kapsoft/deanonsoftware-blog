---
id: 1185
title: ISDB.IO Stack
date: '2017-04-26T16:18:30.000Z'
author: kaplandj
guid: 'http://deanonsoftware.com/?p=1185'
categories:
  - Software Business
---
So I used the following tools to develop <http://isdb.io.>

 

[**Algolia**](http://Algolia.com)

Had a need to index tons of data and provide a great user experience for searching this data. Algolia really is a great product. My only complaint is that it’s pricey. I’ve used Elastic Search in the past. This is a much better product from top to bottom. Integrates well with Laravel, although I ran into some issues that forced me to use their PHP lib.

**[Postgresql](http://postgresql.org)**

The DB. I knew this existed back when, but came on my radar when I listened to the  [Three Devs and a Maybe Podcast](http://threedevsandamaybe.com/). I was struggling using Graph Dbs. (More on this in a future podcast: _Why I hate Graph Dbs?) . _The [ISDB.IO](http://isdb.io) Graph is for the most part one or two levels deep. Who played for what team, events for a team, who wrote about that player, and so on. Graph db’s were so hard to use so I finally raised the red flag of surrender. Back to the fundamentals. Good old SQL relational dbs.

The kicker here is the JSON columns types that were introduced into Postgresql a while back. What makes Graph Db’s so great is the ability to assign non-structured Properties (data) to any vertex or edge. Basically you get free key pairs or a Mongo in any table with the JSON column types. After that the schema for the graph is pretty simple. Performance is good so far and more things can be done in future to help that.

**[Laravel](https://laravel.com/)**

The brain child of the wizard [Taylor Otwell](https://medium.com/@taylorotwell) this is the best framework I’ve ever used. Clean design, all facets of development covered, and a great community to boot. I also developed a full API using Laravel for ISDB.IO, as well as the front end. I’m a real fan of this and look forward to doing more projects with it.

Throw in tons of PHP code written with the Sublime Editor and there you go. The Stack is simple when you look at it, but the site is deep and ambitious. Granted ISDB.IO has a long way to go since its’ only a beta currently. I’m working to deploy more updates and will keep you posted on our progress.

Cheers!
