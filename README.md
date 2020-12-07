Run with `mvnw spring-boot:run`. Build within IntelliJ to cause an auto-reload.

This is a template approach to try out some game concepts backed by spring-boot. Current status is bare-bones.

Progress Bars start/end time are stored in the database to be used to create state when the page is opened. A new one can be kicked off and now a completed one needs to be able to be 'collected'.

I slid the BarController into its own package and was getting some errors with the import/autowire of a service from a different package. Adding the @ComponentScan({...}) didn't seem to work. I've determined this is an IntelliJ community edition thing and the server actually works correctly despite the supposed error. Thankfully, invalidating the cache and restarting seemed to fix the visual bug.