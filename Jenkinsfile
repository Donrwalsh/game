node {
    stage('Checkout') {
        git 'https://github.com/Donrwalsh/game'
    }

    stage('Compile') {
        echo "-=- compiling project -=-"
        sh "./mvnw clean compile"
    }

    stage('Tests') {
        echo "-=- executing tests -=-"
        sh "./mvnw test"
    }

    stage("deploy") {
        echo "-=- deploying application -=-"
        sh 'nohup ./mvnw spring-boot:run'
    }
}