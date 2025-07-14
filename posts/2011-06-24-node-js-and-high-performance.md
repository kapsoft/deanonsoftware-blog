---
id: 908
title: node.js and High Performance
date: '2011-06-24T18:30:37.000Z'
author: kaplandj
guid: 'http://deanonsoftware.com/?p=908'
dsq_thread_id: '341400900'
categories:
  - Software Business
---
I’m looking for performance. You know. The kind of performance that Google gets. Where that page comes back in warp speed so fast like a [dilithium crystal](http://www.startrek.com/database_article/dilithium-crystal-articulation-frame) powered it. My long search for the “perfect” Web Application layer development system brings me to [node.js](http://nodejs.org/).

Why node.js?

Let’s take a step back ito the near way back machine. Not so far back in time. A recent job for a client had me and my colleague build upon a [State Machine Framework](http://www.state-machine.com/) based on the [work](http://www.amazon.com/Practical-UML-Statecharts-Second-Event-Driven/dp/0750687061/ref=sr_1_1?s=books&ie=UTF8&qid=1308939742&sr=1-1) of Miro Samek.  The System was a Testing Framework for Wireless Radio testing. Very complex. So complex that we made it overly flexible and so fantastic it nearly killed me. Did the client appreciate what went into it? Probably not, but it works well and nothing in the system from the UI (user) perspective ever seems frozen. You know those systems you have worked on that have those blocked UI’s.

Two key premises of the State Machine are “Run To Completion” RTC and the “Non Blocking” of IO. RTC means that every State in the system runs through it processing in an atomic way. The running thread does not give up control unil it is completed. Samek likes to use the Quantum analogy. The events and processing that drive the system should never be blocked or synchronous. Threads are an afterthought. Threads are hard to do. Programming in this model is a different way to dissecting the problem, but the results speak for themselves. node.js gives one the same opportunity to create RTC type systems that perform way better then other solutions.

Check out this [great talk by Douglas Crockford on server side JavaScript](http://www.yuiblog.com/blog/2010/08/30/yui-theater-douglas-crockford-crockford-on-javascript-scene-6-loopage-52-min/). He really explains it better then I could ever hope to do so. We are living in a different age of what is expected on the performance side. Performance counts. Always did and always will.
