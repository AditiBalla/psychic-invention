//teachablemachine.withgoogle.com/models/HPDEl3OSW//

prediction_1 = "";
prediction_2 = "";

Webcam.set({
    width: 350,
    height: 300,
    image_format: "png",
    png_quality: 90
});
camera = document.getElementById("Camera");
Webcam.attach('#camera');

function takePicture(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = "<img id='pictureBox' src='"+data_uri+"'>";
    });
}
console.log('ml5 version', ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/HPDEl3OSW/model.json", modelLoded);

function modelLoded(){
    console.log("The Model is Loaded");
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data_1 = "The first prediction is"+prediction_1;
    speak_data_2 = "And the second prediction is"+prediction_2;
    var utterthis = new SpeechSynthesisUtterance(speak_data_1+speak_data_2);
    synth.speak(utterthis);

}

function check(){
    img = document.getElementById("pictureBox");
    classifier.classify(img, gotResult);
}

function gotResult(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_gesture_name").innerHTML = results[0].label;
        document.getElementById("result_gesture_name_2").innerHTML = results[1].label;
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        speak();

        if(results[0].label == "Thumbs Up"){
            document.getElementById("update_gesture").innerHTML = "&#128077;";
        }
        if(results[0].label == "Peace/Victory"){
            document.getElementById("update_gesture").innerHTML = "&#9996;";
        }
        if(results[0].label == "Superb"){
            document.getElementById("update_gesture").innerHTML = "&#128076;";
        }
        if(results[1].label == "Thumbs Up"){
            document.getElementById("update_gesture_2").innerHTML = "&#128077;";
        }
        if(results[1].label == "Peace/Victory"){
            document.getElementById("update_gesture_2").innerHTML = "&#9996;";
        }
        if(results[1].label == "Superb"){
            document.getElementById("update_gesture_2").innerHTML = "&#128076;";
        }

    }
}