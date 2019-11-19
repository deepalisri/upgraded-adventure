
var record=document.getElementById("record");
var stopRecord=document.getElementById("stopRecord");

AWS.config.region = 'us-east-2'; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-2:d83bc304-6b63-4f4f-9740-b5eb72a33f62',
});
// Make the call to obtain credentials
AWS.config.credentials.get(function () {
    // Credentials will be available when this function is called.
    var accessKeyId = AWS.config.credentials.accessKeyId;
    var secretAccessKey = AWS.config.credentials.secretAccessKey;
    var sessionToken = AWS.config.credentials.sessionToken;
});
AWS.region = "us-east-2";

//var transcribeservice = new AWS.TranscribeService({apiVersion: '2017-10-26'});
//var comprehend = new AWS.Comprehend();
var s3 = new AWS.S3();
//var dynamodb = new AWS.DynamoDB();
//var rekognition = new AWS.Rekognition();

//</script>
//<script>
    function uploadS3() {
      console.log('test')
  var s3 = new AWS.S3({params: {Bucket: 'interviewastha'}});
  var files = document.getElementById('fileinput').files;
  var params = {
    Bucket: 'interviewastha',
    Key: "tessdftghndfx123456789.jpeg",
    Body: files
  };

  s3.upload(params, function(err, data) {
    if (err) {
      console.log(err, err.stack);
      //showModal('Failed to upload', 'Network Error. Please contact admin.');
    } else {
      console.log(data.key + ' successfully uploaded to' + data.Location);
      //showModal('Upload Success!', data.key + ' successfully uploaded!');
    }
  });
}
//</script>
//<script>
function uploadS3() {
      console.log('test')
  var s3 = new AWS.S3({params: {Bucket: 'interviewastha'}});
  var files = document.getElementById('fileinput').files;
  var params = {
    Bucket: 'interviewastha',
    Key: "tessdftghndfx123456789.jpeg",
    Body: files[0]
  };

  s3.upload(params, function(err, data) {
    if (err) {
      console.log(err, err.stack);
      //showModal('Failed to upload', 'Network Error. Please contact admin.');
    } else {
      console.log(data.key + ' successfully uploaded to' + data.Location);
      //showModal('Upload Success!', data.key + ' successfully uploaded!');
    }
  });
}
//</script>

//<script>
   function startMultiUpload(blob, filename) {
    var self = this;
    var audioBlob = blob;
    var params = {
    Bucket: 'interviewastha',
    Key: "tessdftghndfx123456789.mp3",
    ContentType: 'audio/webm',
    //ACL: 'private',
    };
    self.s3.createMultipartUpload(params, function(err, data) {
    if (err) {
    console.log(err, err.stack); // an error occurred
    } else {
    self.uploadId = data.UploadId
    self.incr = 1;
    self.continueMultiUpload(audioBlob, self.incr, self.uploadId, self.filename, self.bucketName);
    }
    });
    }
  function continueMultiUpload(audioBlob, PartNumber, uploadId, key, bucketName) {
    var self = this;
    var params = {
    Body: audioBlob,
    Bucket: 'interviewastha',
    Key: "tessdftghndfx123456789.mp3",
    PartNumber: PartNumber,
    UploadId: uploadId
    };
    console.log(params);
    self.s3.uploadPart(params, function(err, data) {
    if (err) {
    console.log(err, err.stack)
    } // an error occurred
    else {
    self.etag.push(data.ETag);
    if (self.booleanStop == true) {
    self.completeMultiUpload();
    }
    }
    });
    }
    
function completeMultiUpload() {
var self = this;
var outputTag = [];
/*
here we are constructing the Etag data in the required format.
*/
self.etag.forEach((data, index) => {
const obj = {
ETag: data,
PartNumber: ++index
};
outputTag.push(obj);
});
var params = {
Bucket: 'interviewastha', // required
Key: 'tessdftghndfx123456789.mp3', // required
UploadId: self.uploadId, // required
MultipartUpload: {
Parts: outputTag
}
};
self.s3.completeMultipartUpload(params, function(err, data) {
if (err) {
console.log(err, err.stack)
} // an error occurred
else {
// initialize variable back to normal
self.etag = [], self.recordedChunks = [];
self.uploadId = "";
self.booleanStop = false;
self.disableAllButton();
self.removeLoader();
 alert("we have successfully saved the questionaire..");
    }
    });
    }

    //</script>
//<!-- <script>
function HandleBrowseClick()
{
    var fileinput = document.getElementById("browse");
    fileinput.click();
}
//</script>
//<script>
function Handlechange()
{
    var fileinput = document.getElementById("browse");
    var textinput = document.getElementById("filename");
    textinput.value = fileinput.value;
} 

//<script>
 function readURL(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    $('#fileinput')
                        .attr('src', e.target.result)
                        .width(150)
                        .height(200);
                };

                reader.readAsDataURL(input.files[0]);
            }
        }
//</script>

//<!-- <script>
function HandleBrowseClick()
{
    var fileinput = document.getElementById("browse");
    fileinput.click();
}
//</script>
//<script>
function Handlechange()
{
    var fileinput = document.getElementById("browse");
    var textinput = document.getElementById("filename");
    textinput.value = fileinput.value;
} 

//<script>
 function readURL(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    $('#fileinput')
                        .attr('src', e.target.result)
                        .width(150)
                        .height(200);
                };

                reader.readAsDataURL(input.files[0]);
            }
        }
//</script>
//<script>
  navigator.mediaDevices.getUserMedia({audio:true})
  .then(stream => {handlerFunction(stream)})


        function handlerFunction(stream) {
        rec = new MediaRecorder(stream);
        rec.ondataavailable = e => {
          var normalArr = [];
          audioChunks.push(e.data);
          if (rec.state == "inactive"){
            let blob = new Blob(audioChunks,{type:'audio/mpeg-3'});
            recordedAudio.src = URL.createObjectURL(blob);
            recordedAudio.controls=true;
            recordedAudio.autoplay=true;
            sendData(blob)
          }
        }
      }
            function sendData(data) {}
           

    record.onclick = e => {
      console.log('I was clicked')
      record.disabled = true;
      record.style.backgroundColor = "blue"
      stopRecord.disabled=false;
      audioChunks = [];
      rec.start();
    }
    
    stopRecord.onclick = e => {
      console.log("I was clicked")
      record.disabled = false;
      stop.disabled=true;
      record.style.backgroundColor = "red"
      rec.stop();
    }
   

   
//</script>

