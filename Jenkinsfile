node {
    stage('Checkout') {
        git 'https://github.com/Donrwalsh/game'
    }

    stage('Compile') {
        steps {
            echo "-=- compiling project -=-"
            sh "./mvnw clean compile"
        }
    }

    stage('Tests') {
        steps {
            echo "-=- executing tests -=-"
            sh "./mvnw test"
        }
    }

    stage("deploy") {
        steps {
            sh 'nohup ./mvnw spring-boot:run'
        }
    }
}