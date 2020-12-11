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

## DevOps

I use a Raspberry Pi as my DevOps machine. It runs Jenkins and uses a pipeline project to deploy the application on itself.

<details>
  <summary>Setup Details</summary>

Using https://raspberrytips.com/install-jenkins-raspberry-pi/ for Jenkins setup on the pi.
- Doing Raspbian Full since I had no option for Lite
- `sudo apt update`
- `sudo apt upgrade`
- `ifconfig` to get ip address.
- opted for openjdk: `sudo apt install openjdk-8-jdk`
  - OS install came with Java 11 installed, so I used `sudo update-alternatives --config java` to select openjdk 8.
- `wget -q -O - https://pkg.jenkins.io/debian/jenkins.io.key | sudo apt-key add -`
- `sudo sh -c 'echo deb https://pkg.jenkins.io/debian-stable binary/ > /etc/apt/sources.list.d/jenkins.list'`
- `sudo apt update`
- `sudo apt install jenkins`
- Access Jenkins at http://<ipaddress>:8080
- `sudo cat /var/lib/jenkins/secrets/initialAdminPassword`
- Initial login, installed suggested plugins

- Installed Maven:
- `sudo wget http://www.mirrorservice.org/sites/ftp.apache.org/maven/maven-3/3.2.5/binaries/apache-maven-3.2.5-bin.tar.gz`
- `cd /opt && sudo tar -xzvf /apache-maven-3.2.5-bin.tar.gz`
- `sudo vi /etc/profile.d/maven.sh` and add the following:
  - `export M2_HOME=/opt/apache-maven-3.2.5`

    `export "PATH=$PATH:$M2_HOME/bin"`
- Corrected JAVA_HOME by modifying `~/.bashrc` and adding the following:
  - `export JAVA_HOME="/usr/lib/jvm/java-8-openjdk-armhf"`

    `export PATH=$PATH:$JAVA_HOME/bin`
- Via Global Tool Configuration, setup Java and Maven.

- Created new Pipeline project. Configured it to poll SCM every three minutes and look for a Jenkinsfile.
- Not having a lot of luck, needed to add jenkins to the sudoers file by way of `sudo visudo`

At this point the Jenkinsfile needed lots of tweaking to work properly. Key points:
- Designation of the tools is required and must match the java/maven Global Tools that were configured. This bypassed consistent issues getting the jenkins user to run basic commands (probably removes the sudo requirement)
- Running the app was tricky due to Jenkins consistent killing of child processes. I used the helpful `at` command to allow this, which needed to be installed.
</details>

## Details and Running Notes

This is a template approach to try out some game concepts backed by spring-boot. Current status is bare-bones.

Progress Bars start/end time are stored in the database to be used to create state when the page is opened. A new one can be kicked off and now a completed one needs to be able to be 'collected'.

I slid the BarController into its own package and was getting some errors with the import/autowire of a service from a different package. Adding the @ComponentScan({...}) didn't seem to work. I've determined this is an IntelliJ community edition thing and the server actually works correctly despite the supposed error. Thankfully, invalidating the cache and restarting seemed to fix the visual bug.

Ok, so now I've got a small handful of endpoints. Seems like a good time to figure out how to test them. Tinkered with it for a bit on my own and spiraled quickly out of control. Going to look at a tutorial on it to get some guidance.

Tests are coming together nicely. Only the 'sanity' tests are currently working, but I'm building them out to get a better understanding of the basics before applying lessons to the stuff I've built.

Milliseconds are awkward to work with, and I don't really need that level of precision. By restricting the LocalDateTime values to seconds precision I bypass a weird issue in the test and since this is what I've been storing in the database anyway, I don't see a problem.

## Todo Section

- Obviously it would be great to use an actual database rather than one that is in memory.
- Some sort of popup when I get an error on action taken?
- Expand bars with a new feature, how about autocomplete -> happens consistently with the page open but only x times in a row when closed
    - in-page elements and backing structure is in place, but these do not do anything yet.
    - Ability to set bar-specific completion value
- A 'built with' readme section itemizing all the different technologies would be cool.