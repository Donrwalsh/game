## Requirements

For building and running the application you need:

- [JDK 1.8](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)
- [Maven 3](https://maven.apache.org)

## Running the application locally

You can use the [Spring Boot Maven plugin](https://docs.spring.io/spring-boot/docs/current/reference/html/build-tool-plugins-maven-plugin.html) like so:

```shell
mvn spring-boot:run
```

Intellij Ultimate is probably very easy to setup, but for community edition I needed to do the following:

- New "Application" Configuration.
- Build and run: Java 1.8.
- Main Class: `com.bigbrass.game.GameApplication`
- Environmental Variables: `-Dspring.profiles.active=development`

In both cases, build project while running to auto-reload server with changes applied.

## Details and Running Notes

This is a template approach to try out some game concepts backed by spring-boot. Current status is bare-bones.

Progress Bars start/end time are stored in the database to be used to create state when the page is opened. A new one can be kicked off and now a completed one needs to be able to be 'collected'.

I slid the BarController into its own package and was getting some errors with the import/autowire of a service from a different package. Adding the @ComponentScan({...}) didn't seem to work. I've determined this is an IntelliJ community edition thing and the server actually works correctly despite the supposed error. Thankfully, invalidating the cache and restarting seemed to fix the visual bug.

Ok, so now I've got a small handful of endpoints. Seems like a good time to figure out how to test them. Tinkered with it for a bit on my own and spiraled quickly out of control. Going to look at a tutorial on it to get some guidance.

Tests are coming together nicely. Only the 'sanity' tests are currently working, but I'm building them out to get a better understanding of the basics before applying lessons to the stuff I've built.

Milliseconds are awkward to work with, and I don't really need that level of precision. By restricting the LocalDateTime values to seconds precision I bypass a weird issue in the test and since this is what I've been storing in the database anyway, I don't see a problem.

## Todo Section

[] by way of request params enable 'faking' of user login

[] Obviously it would be great to use an actual database rather than one that is in memory.

[] Devops shenanigans

[] All this bar stuff shouldn't be top level.