pipeline {
    agent any
    tools {
        maven 'JenkinsMaven'
        jdk 'JenkinsJava'
    }
    stages {
        stage ('Initialize') {
            steps {
                sh '''
                    echo "PATH = ${PATH}"
                    echo "M2_HOME = ${M2_HOME}"
                '''
                git 'https://github.com/Donrwalsh/game'
            }
        }
        stage ('Compile') {
            steps {
                echo "-=- compiling project -=-"
                sh "mvn compile"
            }
        }
        stage('Test') {
            steps {
                echo "-=- executing tests -=-"
                sh "mvn package"
            }
        }
        stage('Deploy') {
            steps {
                echo "-=- deploying application -=-"
                script {
                    try {
                        sh "kill \$(lsof -t -i:8088)"
                    } catch (err) {
                        echo "Caught: ${err}"
                    }
                }
                sh 'echo "java -jar target/game-0.0.1-SNAPSHOT.jar > spring-log.txt" | at now + 1 minutes'
            }
        }
    }
}