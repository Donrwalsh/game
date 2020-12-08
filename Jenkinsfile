node {
    tools {
        maven 'Maven 3.2.5'
    }
    stage('Initialize') {
        sh '''
            echo "PATH = ${PATH}"
            echo "M2_HOME = ${M2_HOME}"
        ''' 
    }
    stage('Checkout') {
        git 'https://github.com/Donrwalsh/game'
    }

    stage('Compile') {
        echo "-=- compiling project -=-"
        sh "sudo ./mvnw clean compile"
    }

    stage('Tests') {
        echo "-=- executing tests -=-"
        sh "sudo ./mvnw test"
    }

    stage("deploy") {
        echo "-=- deploying application -=-"
        sh 'sudo nohup ./mvnw spring-boot:run'
    }
}