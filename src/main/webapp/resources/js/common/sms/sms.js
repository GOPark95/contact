const fromPhoneNumber = "0260092750";
const serviceID = "ncp:sms:kr:260035190398:lg_hnh";
const accessKey = "AD2959CBB7D4CC37C018";
const secretKey = "8D203D457D68AF0ED5A33C8868DD18DCD83593F0";
 
function makeSignature(timestamp) {
	var space = " ";				// one space
	var newLine = "\n";				// new line
	var method = "POST";				// method
    var url = "/sms/v2/services/" + encodeURIComponent(serviceID) + "/messages";
	
	var hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);
	hmac.update(method);
	hmac.update(space);
	hmac.update(url);
	hmac.update(newLine);
	hmac.update(timestamp);
	hmac.update(newLine);
	hmac.update(accessKey);

	var hash = hmac.finalize();
	
	return hash.toString(CryptoJS.enc.Base64);
}

function sendSMS(fromphone, phoneNumber, contentStr, rT){ // rT -> yyyy-MM-dd HH:mm
    var timestamp = new Date().getTime().toString();

	var bodyObj = {
		"type" : "LMS",
		"contentType" : "COMM",
		"countryCode" : "82",
		"from" : fromphone,
		"content" : contentStr,
		"messages" : [{"to" : phoneNumber}]
	};
    if(rT){
        bodyObj["reserveTime"] = rT;
    }

	var headerObj = {
		"Contype":"application/json; charset=utf-8",
		"acckey":accessKey,
		"apitsp":timestamp,
		"sigkey":makeSignature(timestamp)
	};
	
	var url = "https://sens.apigw.ntruss.com/sms/v2/services/" + encodeURIComponent(serviceID) + "/messages";
	var param = {
		"url" : url,
		"body" : JSON.stringify(bodyObj)
		
	};dl
	param = Object.assign(param, headerObj);
	var retJson;
	$.ajax({
        type: "POST",
		data: param,
        async: false,
        url: "./sproxy.asp",
        success: function (res) {
            retJson = JSON.parse(res);
        },
		error: function(err){
			console.log(err);
		}
    });
    return retJson;
}

function sendSMSMulti(fromphone, phoneNumbers, contentStr, rT){ // rT -> yyyy-MM-dd HH:mm
    var timestamp = new Date().getTime().toString();
	var phones = $.map(phoneNumbers, function(phone){ return {"to":phone, "subject":"코리아리서치"}});
	var conStr = ".";
	if(Array.isArray(contentStr)) {
		if(phones.length == contentStr.length){
			$.each(phones, function(i, o){
				o.content = contentStr[i];
			});
		}
	}else{
		conStr = contentStr;
	}
	var bodyObj = {
		"type" : "LMS",
		"contentType" : "COMM",
		"countryCode" : "82",
		"from" : fromphone,
		"content" : conStr,
		"messages" : phones
	};
    if(rT){
        bodyObj["reserveTime"] = rT;
    }

	var headerObj = {
		"Contype":"application/json; charset=utf-8",
		"acckey":accessKey,
		"apitsp":timestamp,
		"sigkey":makeSignature(timestamp)
	};
	
	var url = "https://sens.apigw.ntruss.com/sms/v2/services/" + encodeURIComponent(serviceID) + "/messages";
	var param = {
		"url" : url,
		"body" : JSON.stringify(bodyObj)
		
	};
	param = Object.assign(param, headerObj);
	var retJson;
	$.ajax({
        type: "POST",
		data: param,
        async: false,
        url: "./sproxy.asp",
        success: function (res) {
            retJson = JSON.parse(res);
            ajax_returnData("./user-ajax.asp", {"COMMAND": "SEND_LOG","RESULT":"SUCCESS", "CONTENT":res});
        },
		error: function(err){
			console.log(err);
            ajax_returnData("./user-ajax.asp", {"COMMAND": "SEND_LOG","RESULT":"ERROR", "CONTENT":err});
		}
    });
    return retJson;
}