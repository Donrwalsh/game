pipeline {
    agent any
    tools {
        maven 'JenkinsMaven'
        jdk 'JenkinsJava'
    }
    stages {
        stage ('Compile') {
            steps {
                echo "-=- compiling project -=-"
                sh "mvn clean compile"
            }
        }
        stage('Test') {
            steps {
                echo "-=- executing tests -=-"
                sh "mvn clean package"
            }
        }
        stage('Deploy') {
            steps {
                echo "-=- deploying application -=-"
                sh 'kill $(lsof -t -i:8088)'
                sh 'echo "java -jar target/game-0.0.1-SNAPSHOT.jar > spring-log.txt" | at now + 1 minutes'
            }
        }
    }
}