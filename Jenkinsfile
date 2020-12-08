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
                sh "mvn clean compile"
            }
        }
        stage('Test') {
            steps {
                echo "-=- executing tests -=-"
                sh "mvn test"
            }
        }
        stage('Deploy') {
            steps {
                echo "-=- deploying application -=-"
                sh 'nohup mvn spring-boot:run'
            }
        }
    }
}