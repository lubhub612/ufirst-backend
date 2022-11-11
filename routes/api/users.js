const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
const  nodemailer = require("nodemailer");
const  crypto = require('crypto');
const  multer = require('multer');
const IPFS = require('ipfs-api');
const fs = require('fs');
const pdf = require("pdf-creator-node");
const stripe = require('stripe')('sk_test_51HlapkKdKhcJ5CYYHP6P65j7rYw9frao5HmgjurlODFJltkfrFqg8Nye3j4JaYrZ9HRKMt84iA5xyGqGtw4ZdsBg00QYlCq3au');


// Load User model
const User = require("../../models/User");
const Usersurgical = require("../../models/Usersurgical");
const Uservaccine = require("../../models/Uservaccine");
const Userallergy = require("../../models/Userallergy");
const Userfamily = require("../../models/Userfamily");
const Userdoctor = require("../../models/Userdoctor");
const Userappointment = require("../../models/Userappointment");
const Usertimeline = require("../../models/Usertimeline");
const Userprescription = require("../../models/Userprescription");
const Userapproveappointment = require("../../models/Userapproveappointment");
const Usernotification = require("../../models/Usernotification");
const Userchatroom = require("../../models/Userchatroom");
const Userdoctorprescription = require("../../models/Userdoctorprescription");
const Usersmokinghabbit = require("../../models/Usersmokinghabbit");
const Userdrinkinghabbit = require("../../models/Userdrinkinghabbit");
const Userappointmentnotification = require("../../models/Userappointmentnotification");
const Userprescriptionmedicine = require("../../models/Userprescriptionmedicine");
const Userprescriptiontesting = require("../../models/Userprescriptiontesting");
const Usermedicine = require("../../models/Usermedicine");
const Usertesting = require("../../models/Usertesting");
const Usermedicine1 = require("../../models/Usermedicine1");
const Usertesting1 = require("../../models/Usertesting1");
const Usermedicine2 = require("../../models/Usermedicine2");
const Usertesting2 = require("../../models/Usertesting2");
const Usermedicine3 = require("../../models/Usermedicine3");
const Usertesting3 = require("../../models/Usertesting3");
const Usermedicine4 = require("../../models/Usermedicine4");
const Usertesting4 = require("../../models/Usertesting4");
const Usermedicine5 = require("../../models/Usermedicine5");
const Usertesting5 = require("../../models/Usertesting5");
const Usermedicine6 = require("../../models/Usermedicine6");
const Usertesting6 = require("../../models/Usertesting6");

const DIR = './public/uploads';

const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });


var transporter = nodemailer.createTransport({
 service: 'gmail',
 auth: {
        user: 'testingufirst@gmail.com',
        pass: 'Ninja6970*'
    }
});


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, fileName)
  }
});

// Multer Mime Type Validation
var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
          cb(null, true);
      }
});




// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
     console.log(req.body);
    var token = crypto.randomBytes(64).toString('hex');
    console.log(token);
  User.findOne({ useremail: req.body.useremail }).then(user => {
    if (user) {
      console.log(user);
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        userName: req.body.username,
        useremail: req.body.useremail,
        password: req.body.password,
        cpharse: req.body.cpharse,
        usercity: req.body.usercity,
        userstates: req.body.userstates,
        usercountry: req.body.usercountry,
        useraddress1: req.body.useraddress1,
        useraddress2: req.body.useraddress2,
        usersmoker: req.body.usersmoker,
        useralcholic: req.body.useralcholic,
        userdob: req.body.userdob,
        userage: req.body.userage,
        usergender: req.body.usergender,
        userrole: req.body.userrole,
        userbloodgroup: req.body.userbloodgroup,
        userphoneno: req.body.userphoneno,
        userpincode: req.body.userpincode,
        usermedino: req.body.usermedino,
        token: token,
        userstatus: "Unconfirm"
      });

      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => {
             const mailOptions = {
  		from: '"Testing uFirst" testingufirst@gmail.com', 
  		to:  req.body.useremail, 
  	        subject: 'Please verify your email address ', 
  	        html: '<header><a href="http://128.199.171.175:4200/">Ufirst-Global</a></header><div class="email-body">Hello,'+ req.body.firstname +'<p>Thank you for showing your interest in Ufirst-Global </p><p>If you have not opted to signup at ufirst-globalt, please ignore this email.</p><p>or</p>Kindly <a class="" href="http://128.199.171.175:4200/verifyemail/' + token + '">Complete Signup</a> process.<p>  Thanks &amp; regards<br/> Ufirst Global </p> </div> <footer> <ol> <li>The content of this email is confidential and intended for the recipient specified in message only. It is strictly forbidden to share any part of this message with any third party, without a written consent of the sender. If you received this message by mistake, please reply to this message and follow with its deletion, so that we can ensure such a mistake does not occur in the future.</li> <li>This message has been sent as a part of agreement between UfirstGlobal and the addressee whose name is specified above. Should you receive this message by mistake, we would be most grateful if you inform us at mail@ufirst.global, that the message has been sent to you. In this case, we also ask that you delete this message from your mailbox, and do not forward it or any part of it to anyone else. Thank you for your cooperation and understanding.</li> <li>Ufirst-global puts the security of the client at a high priority. Therefore, we have put efforts into ensuring that the message is error and virus-free. Unfortunately, full security of the email cannot be ensured as, despite our efforts, the data included in emails could be infected, intercepted, or corrupted. Therefore, the recipient should check the email for threats with proper software, as the sender does not accept liability for any damage inflicted by viewing the content of this email.</li></ol></footer>'
              };
             transporter.sendMail(mailOptions, function (err, info) {
   		if(err)
     		 console.log(err);
   		else
     		 console.log(info);
             });
           res.json(user)
        }).catch(err => console.log(err));
        });
      });
     const newUsertimeline = new Usertimeline({
        useremail: req.body.useremail,
        useractivity: "joined at ufirst-global",
	useractivitylink: "home"
     });
          newUsertimeline
            .save()
            .then(timel => res.json(timel))
            .catch(err => console.log(err));
    }
  });
});


router.post("/verifyemailconfirm", (req, res) => {
     console.log(req.body);
 
User.updateOne({ token: req.body.verifytoken  }, { userstatus : "Confirm" }, function(
    err,
    result
  ) {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });

});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
 

  const email = req.body.username;
  const password = req.body.password;

  // Find user by email
  User.findOne({ useremail: req.body.username }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }

    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id
        };

        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
          console.log(token);
            res.json({
              success: true,
              token: "Bearer " + token,
          username: user.userName,
          firstname: user.firstName,
          lastname: user.lastName,
          useremail: user.useremail,
          usercity: user.usercity,
          userstates: user.userstates,
          usercountry: user.usercountry,
          usersmoker: user.usersmoker,
          useralcholic: user.useralcholic,
          userdob: user.userdob,
          userage: user.userage,
          userrole: user.userrole,
          usergender: user.usergender,
          useraddress1: user.useraddress1,
          userbloodgroup: user.userbloodgroup,
          userphoneno: user.userphoneno,
          userpincode: user.userpincode,
          usermedino: user.usermedino
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});


router.get("/userhistory/(:id)", (req, res) => {
     //console.log(req.body);
 
      User.findOne({ useremail: req.params.id }).then(users => {
    if (!users) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    res.send(users);
 });
 
});


router.post("/surgical", (req, res) => {
     //console.log(req.body);
 
      const newUserSurgical = new Usersurgical({
        useremail: req.body.useremail,
        surgeryplace: req.body.surgeryplace,
	surgerytype: req.body.surgerytype,
	surgerydate: req.body.surgerydate,
      });

          newUserSurgical
            .save()
            .then(surg => res.json(surg))
            .catch(err => console.log(err));
         const newUsertimeline = new Usertimeline({
        useremail: req.body.useremail,
        useractivity: "add surgical data at ufirst-global",
	useractivitylink: "surgicalhistory"
     });
          newUsertimeline
            .save()
            .then(timel =>console.log(timel))
            .catch(err => console.log(err));
});


router.get("/surgicalhistory/(:id)", (req, res) => {
     //console.log(req.body);
 
      Usersurgical.find({ useremail: req.params.id }).then(usersurgery => {
    if (!usersurgery) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    res.send(usersurgery);
 });
 
});

router.post("/vaccine", (req, res) => {
     //console.log(req.body);
 
      const newUserVaccine = new Uservaccine({
        useremail: req.body.useremail,
        vaccinename: req.body.vaccinename,
	vaccinetype: req.body.vaccinetype,
	vaccinedate: req.body.vaccinedate,
      });

          newUserVaccine
            .save()
            .then(vacc => res.json(vacc))
            .catch(err => console.log(err));
           const newUsertimeline = new Usertimeline({
        useremail: req.body.useremail,
        useractivity: "add vaccine data at ufirst-global",
	useractivitylink: "vaccinehistory"
     });
          newUsertimeline
            .save()
            .then(timel =>console.log(timel))
            .catch(err => console.log(err));
});

router.get("/vaccinehistory/(:id)", (req, res) => {
     //console.log(req.body);
 
      Uservaccine.find({ useremail: req.params.id }).then(uservaccine => {
    if (!uservaccine) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    res.send(uservaccine);
 });
 
});


router.post("/allergy", (req, res) => {
     //console.log(req.body);
 
      const newUserAllergy = new Userallergy({
        useremail: req.body.useremail,
        allergyname: req.body.allergyname,
	allergytype: req.body.allergytype,
	allergyreason: req.body.allergyreason,
      });

          newUserAllergy
            .save()
            .then(allgr => res.json(allgr))
            .catch(err => console.log(err));
         const newUsertimeline = new Usertimeline({
        useremail: req.body.useremail,
        useractivity: "add allergy data at ufirst-global",
	useractivitylink: "allergieshistory"
     });
          newUsertimeline
            .save()
            .then(timel =>console.log(timel))
            .catch(err => console.log(err));
});


router.get("/allergyhistory/(:id)", (req, res) => {
     //console.log(req.body);
 
      Userallergy.find({ useremail: req.params.id }).then(userallergy => {
    if (!userallergy) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    res.send(userallergy);
 });
 
});

router.post("/family", (req, res) => {
     //console.log(req.body);
 
      const newUserFamily = new Userfamily({
        useremail: req.body.useremail,
        familymembername: req.body.familymembername,
	familymemberrelationship: req.body.familymemberrelationship,
	familymemberdiease: req.body.familymemberdiease,
      });

          newUserFamily
            .save()
            .then(famly => res.json(famly))
            .catch(err => console.log(err));
          const newUsertimeline = new Usertimeline({
        useremail: req.body.useremail,
        useractivity: "add family data at ufirst-global",
	useractivitylink: "familyhistory"
     });
          newUsertimeline
            .save()
            .then(timel =>console.log(timel))
            .catch(err => console.log(err));
});


router.get("/familyhistory/(:id)", (req, res) => {
     //console.log(req.body);
 
      Userfamily.find({ useremail: req.params.id }).then(userfamily => {
    if (!userfamily) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    res.send(userfamily);
 });
 
});


router.post("/doctordetails", (req, res) => {
     //console.log(req.body);
 
      const newUserDoctor = new Userdoctor({
        useremail: req.body.useremail,
        doctorname: req.body.doctorname,
	doctorcollage: req.body.doctorcollage,
	doctoroffice: req.body.doctoroffice,
        doctorspeciality: req.body.doctorspeciality,
	doctorotherspeciality: req.body.doctorotherspeciality,
	doctorpersonal: req.body.doctorpersonal,
        doctoravaliabity: req.body.doctoravaliabity,
	doctortiming: req.body.doctortiming,
        doctorfees: req.body.doctorfees
      });

          newUserDoctor
            .save()
            .then(doctor => res.json(doctor))
            .catch(err => console.log(err));
       
             const newUsertimeline = new Usertimeline({
        useremail: req.body.useremail,
        useractivity: "add doctor personal data at ufirst-global",
	useractivitylink: "doctorhistory"
     });
          newUsertimeline
            .save()
            .then(timel =>console.log(timel))
            .catch(err => console.log(err));
});

router.get("/doctorhistory/(:id)", (req, res) => {
     //console.log(req.body);
 
      Userdoctor.find({ useremail: req.params.id }).then(userdoctor => {
    if (!userdoctor) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    res.send(userdoctor);
 });
 
});


router.get("/patients", (req, res) => {
     //console.log(req.body);
 
      User.find({ userrole: "Patient" }).then(patient => {
    if (!patient) {
      return res.status(404).json({ usernotfound: "User not found" });
    }
    res.send(patient);
 });
 
});

router.get("/doctors", (req, res) => {
     //console.log(req.body);
 
      User.find({ userrole: "Doctor" }).then(doctor => {
    if (!doctor) {
      return res.status(404).json({ usernotfound: "User not found" });
    }
    res.send(doctor);
 });
 
});


router.get("/previousappointment/(:id)", (req, res) => {
     
 console.log(new Date().toISOString());
      Userappointment.find({
                   $and : [
                      { doctoremail: req.params.id  } , 
                      { appointmentdate:{"$lte":  new Date().toISOString() }}
                 ]
               }).then(user => {
    if (!user) {
      
      return res.status(400).json({ email: "Email already exists" });
    } else {
   // console.log(user);
    res.send(user);
}
 });
 
});


router.get("/nextappointment/(:id)", (req, res) => {
     
  console.log(new Date().toISOString());
      Userappointment.find({
                   $and : [
                      { doctoremail: req.params.id  } , 
                      { appointmentdate:{"$gte":  new Date().toISOString() }}
                 ]
               }).then(user => {
    if (!user) {
      
      return res.status(400).json({ email: "Email already exists" });
    } else {
//console.log(user);
    res.send(user);
   }
 });
 
});


router.post("/makeappointment", (req, res) => {
     console.log(req.body);
       var token = crypto.randomBytes(64).toString('hex');
       console.log(new Date(req.body.appointmentdate).toISOString());
Userappointment.findOne({
                   $and : [
                      { doctoremail: req.body.doctoremail } , 
                      { appointmentdate: new Date(req.body.appointmentdate).toISOString() }
                 ]
               }).then(user => {
    if (user) {
      console.log(user);
      return res.status(400).json({ email: "Email already exists" });
    } else {

      const newUserappointment = new Userappointment({
        patientemail: req.body.patientemail,
        doctoremail: req.body.doctoremail,
        token: token,
	appointmentdate: req.body.appointmentdate,
	appointmentstatus: "Pending",
        appointmentnumber: "00",
        appointmenttype: req.body.consultationtype,
        appointmentissue:  req.body.personalissue,
        prescriptionhash: req.body.prescriptionhash
      });
 

          newUserappointment
            .save()
            .then(userappo => {
             const mailOptions = {
  		from: '"Testing uFirst" testingufirst@gmail.com', 
  		to:  'debnathdibyajit@gmail.com', 
  	        subject: 'Appointment Timing of ' + req.body.fullname, 
  	        html: '<p> ' + req.body.fullname + ' appointment time is ' + req.body.appointmentdate + '</p> <p> Please Kindly <a class="" href="http://128.199.171.175:4200' + '/appointmentconfirm/' + token + '">Complete Appointment</a> process.<p>  Thanks &amp; regards<br/> Ufirst-Global </p>'
              };
             transporter.sendMail(mailOptions, function (err, info) {
   		if(err)
     		 console.log(err);
   		else
     		 console.log(info);
             });
             res.json(userappo);
           
             }).catch(err => console.log(err));

         const newUsertimeline = new Usertimeline({
        useremail: req.body.patientemail,
        useractivity: "make appointment at ufirst-global",
	useractivitylink: "appointmenthistory"
     });
          newUsertimeline
            .save()
            .then(timel =>console.log(timel))
            .catch(err => console.log(err));

        const newUsertimeline1 = new Usertimeline({
        useremail: req.body.doctoremail,
        useractivity: req.body.fullname + " " + " call appointment at ufirst-global",
	useractivitylink: "doctorappointmentlist"
     });
          newUsertimeline1
            .save()
            .then(timel1 =>console.log(timel1))
            .catch(err => console.log(err));

      const newUsernotification = new Usernotification({
        useremail: req.body.patientemail,
        usernotification: "make appointment at ufirst-global",
	usernotificationlink: "appointmenthistory"
     });
          newUsernotification
            .save()
            .then(notil =>console.log(notil))
            .catch(err => console.log(err));

        const newUsernotification1 = new Usernotification({
        useremail: req.body.doctoremail,
        usernotification: req.body.fullname + " " + " call  for appointment at ufirst-global",
	usernotificationlink: "doctorappointmentlist"
     });
          newUsernotification1
            .save()
            .then(notil1 =>console.log(notil1))
            .catch(err => console.log(err));
        
        const newUserappointmentnotification = new Userappointmentnotification({
        useremail: req.body.doctoremail,
        userappointmentnotification: req.body.fullname + " " + " call  for appointment at ufirst-global",
        userappointmenttoken: token,
	userappointmentnotificationlink: "appointmentconfirm"
     });
          newUserappointmentnotification
            .save()
            .then(anotil1 =>console.log(anotil1))
            .catch(err => console.log(err));
     }
   });
});


router.get("/appointmenthistory/(:id)", (req, res) => {
     //console.log(req.body);
 var mysort = { appointmentdate: -1 };
      Userappointment.find({ patientemail: req.params.id }).sort(mysort).then(userappoi => {
    if (!userappoi) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    res.send(userappoi);
 });
 
});

router.get("/lastappointment/(:id)", (req, res) => {
     //console.log(req.body);
 var mysort = { appointmentdate: -1 };
      Userappointment.find({ patientemail: req.params.id }).sort(mysort).limit(1).then(userappoi => {
    if (!userappoi) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    console.log(userappoi);
    res.send(userappoi);
 });
 
});

router.get("/lastappointmenthistory/(:id)", (req, res) => {
     //console.log(req.body);
 var mysort = { appointmentdate: -1 };
      Userappointment.find({ $and : [
                      { patientemail: req.params.id } , 
                      { appointmentstatus : 'Confirm' }
                 ]}).sort(mysort).limit(1).then(userappoi => {
    if (!userappoi) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    console.log(userappoi);
    res.send(userappoi);
 });
 
});

router.get("/appointmentdata/(:verifytoken)", (req, res) => {
     //console.log(req.body);
 
      Userappointment.findOne({ token: req.params.verifytoken }).then(userappoid => {
    if (!userappoid) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    res.send(userappoid);
 });
 
});


router.get("/doctorappointmenthistory/(:id)", (req, res) => {
     //console.log(req.body);
 
      Userappointment.find({ doctoremail: req.params.id }).then(userappoi => {
    if (!userappoi) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    res.send(userappoi);
 });
});



router.get("/approveappointmenthistory/(:id)", (req, res) => {
     //console.log(req.body);
 
      Userappointment.findOne({ appointmentnumber: req.params.id }).then(userappoi => {
    if (!userappoi) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    res.send(userappoi);
 });
});

router.post("/makeappointmentconfirm", (req, res) => {
     console.log(req.body);
 
    
       
var token = Math.floor(Math.random() * 899999 + 100000);
console.log( token);
Userappointment.updateOne({ token: req.body.verifytoken  }, { appointmentstatus : req.body.doctorconfirmation, appointmentnumber:  token }, function(
    err,
    result
  ) {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });

 const newUserapproveappointment  = new Userapproveappointment({
        patientemail: req.body.patientemail,
        doctoremail: req.body.useremail,
        appointmentnumber:  token,
	appointmentdate: req.body.appointmentdate,
     });
          newUserapproveappointment
            .save()
            .then(approvl  =>console.log(approvl))
            .catch(err => console.log(err)); 

 const newUsertimeline = new Usertimeline({
        useremail: req.body.useremail,
        useractivity: req.body.doctorconfirmation + " " + "appointment at ufirst-global",
	useractivitylink: "doctorappointmentlist"
     });
          newUsertimeline
            .save()
            .then(timel =>console.log(timel))
            .catch(err => console.log(err)); 

 const newUsertimeline1 = new Usertimeline({
        useremail: req.body.patientemail,
        useractivity: req.body.doctorconfirmation + " " + "appointment at ufirst-global",
	useractivitylink: "patientappointmentlist"
     });
          newUsertimeline1
            .save()
            .then(timel1 =>console.log(timel1))
            .catch(err => console.log(err));
    
    const newUsernotification = new Usernotification({
        useremail: req.body.patientemail,
        usernotification: req.body.doctorconfirmation + " " + "appointment at ufirst-global",
	usernotificationlink: "appointmenthistory"
     });
          newUsernotification
            .save()
            .then(notil =>console.log(notil))
            .catch(err => console.log(err));

        const newUsernotification1 = new Usernotification({
        useremail: req.body.useremail,
        usernotification: req.body.doctorconfirmation + " " + "appointment at ufirst-global",
	usernotificationlink: "doctorappointmentlist"
     });
          newUsernotification1
            .save()
            .then(notil1 =>console.log(notil1))
            .catch(err => console.log(err));

 
});

router.post("/makeappointmentconfirm1", (req, res) => {
     console.log(req.body);
 
    
       
var token = Math.floor(Math.random() * 899999 + 100000);
console.log( token);
Userappointment.updateOne({ token: req.body.verifytoken  }, { appointmentstatus : req.body.doctorconfirmation, appointmentdate: req.body.appointmentdate, appointmentnumber:  token }, function(
    err,
    result
  ) {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });

 const newUserapproveappointment  = new Userapproveappointment({
        patientemail: req.body.patientemail,
        doctoremail: req.body.useremail,
        appointmentnumber:  token,
	appointmentdate: req.body.appointmentdate,
     });
          newUserapproveappointment
            .save()
            .then(approvl  =>console.log(approvl))
            .catch(err => console.log(err)); 

 const newUsertimeline = new Usertimeline({
        useremail: req.body.useremail,
        useractivity: req.body.doctorconfirmation + " " + "appointment at ufirst-global",
	useractivitylink: "doctorappointmentlist"
     });
          newUsertimeline
            .save()
            .then(timel =>console.log(timel))
            .catch(err => console.log(err)); 

 const newUsertimeline1 = new Usertimeline({
        useremail: req.body.patientemail,
        useractivity: req.body.doctorconfirmation + " " + "appointment at ufirst-global",
	useractivitylink: "patientappointmentlist"
     });
          newUsertimeline1
            .save()
            .then(timel1 =>console.log(timel1))
            .catch(err => console.log(err));
    
    const newUsernotification = new Usernotification({
        useremail: req.body.patientemail,
        usernotification: req.body.doctorconfirmation + " " + "appointment at ufirst-global",
	usernotificationlink: "appointmenthistory"
     });
          newUsernotification
            .save()
            .then(notil =>console.log(notil))
            .catch(err => console.log(err));

        const newUsernotification1 = new Usernotification({
        useremail: req.body.useremail,
        usernotification: req.body.doctorconfirmation + " " + "appointment at ufirst-global",
	usernotificationlink: "doctorappointmentlist"
     });
          newUsernotification1
            .save()
            .then(notil1 =>console.log(notil1))
            .catch(err => console.log(err));

 
});


router.get("/confirmappointmentlist", (req, res) => {
     //console.log(req.body);
 
      Userappointment.find({}).then(userappoit => {
    if (!userappoit) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    res.send(userappoit);
 });
});

router.get("/timeline/(:id)", (req, res) => {
     //console.log(req.body);
 
      Usertimeline.find({ useremail: req.params.id  }).then(usert => {
    if (!usert) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    res.send(usert);
 });
});

router.get("/notification/(:id)", (req, res) => {
     //console.log(req.body);
 
      Usernotification.find({ useremail: req.params.id  }).then(usert => {
    if (!usert) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    res.send(usert);
 });
});

router.get("/appointmentnotification/(:id)", (req, res) => {
     //console.log(req.body);
 
      Userappointmentnotification.find({ useremail: req.params.id  }).then(usert => {
    if (!usert) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    res.send(usert);
 });
});

router.post('/uploadprescription', upload.single('avatar'), (req, res, next) => {
  const url = req.protocol + '://' + req.get('host')
  var pathfile =  'public/uploads/'+ req.file.filename;
   let testFile = fs.readFileSync(pathfile);
   let testBuffer = new Buffer(testFile);
  ipfs.files.add(testBuffer, function (err, file) {
    if (err) {
         console.log(err);
     }
    console.log(file)
    console.log(file[0].hash);

const newUserPrescription = new Userprescription({
        patientemail: req.body.useremail,
        avatarname: req.file.filename,
        avatar: url + '/ws/public/uploads/' + req.file.filename,
        avatarhash: file[0].hash
      });

          newUserPrescription
            .save()
            .then(prescription  => res.json(file[0].hash))
            .catch(err => console.log(err));
       
             const newUsertimeline = new Usertimeline({
        useremail: req.body.useremail,
        useractivity: "add prescription at ufirst-global",
	useractivitylink: "prescriptionhistory"
     });
          newUsertimeline
            .save()
            .then(timel =>console.log(timel))
            .catch(err => console.log(err));
      
});

});


router.post('/uploaddoctorprescription', upload.single('avatar'), (req, res, next) => {

/* 
  const url = req.protocol + '://' + req.get('host')
  var pathfile =  'public/uploads/'+ req.file.filename;
   let testFile = fs.readFileSync(pathfile);
   let testBuffer = new Buffer(testFile);
  ipfs.files.add(testBuffer, function (err, file) {
    if (err) {
         console.log(err);
     }
    console.log(file)
    console.log(file[0].hash);

const newUserDoctorPrescription = new Userdoctorprescription({
        doctoremail: req.body.useremail,
        patientemail: req.body.patientemail,
        appointmentnumber : req.body.appointmentnumber,
        avatarname: req.file.filename,
        avatar: url + '/ws/public/uploads/' + req.file.filename,
        avatarhash: file[0].hash
      });

          newUserDoctorPrescription
            .save()
            .then(doctorprescription  => {
	   const mailOptions = {
  		from: '"Testing uFirst" testingufirst@gmail.com', 
  		to:  'contact@ufirst.global', 
  	        subject: 'prescription hash  ' + file[0].hash, 
  	        html: '<p> Please download  your prescription from following link ' + ' ' +  '</p> <a class="" href="https://gateway.ipfs.io/ipfs/' + file[0].hash + '">Download Prescription</a> <p>  Thanks &amp; regards<br/> Ufirst-Global </p>'
              };
             transporter.sendMail(mailOptions, function (err, info) {
   		if(err)
     		 console.log(err);
   		else
     		 console.log(info);
             });
		res.json(doctorprescription)
          }).catch(err => console.log(err));
       
      const newUsertimeline = new Usertimeline({
        useremail: req.body.useremail,
        useractivity: "uploaded prescription at ufirst-global for " + req.body.patientemail,
	useractivitylink: "doctorprescriptionhistory"
     });
          newUsertimeline
            .save()
            .then(timel =>console.log(timel))
            .catch(err => console.log(err));

     const newUsertimeline1 = new Usertimeline({
        useremail: req.body.patientemail,
        useractivity: req.body.useremail +  " " + "uploaded prescription at ufirst-global",
	useractivitylink: "patientprescriptionhistory"
     });
          newUsertimeline1
            .save()
            .then(timel1 =>console.log(timel1))
            .catch(err => console.log(err));
    
    const newUsernotification = new Usernotification({
        useremail: req.body.useremail,
        usernotification: "uploaded prescription at ufirst-global for " + req.body.patientemail,
	usernotificationlink: "doctorprescriptionhistory"
     });
          newUsernotification
            .save()
            .then(notil =>console.log(notil))
            .catch(err => console.log(err));

        const newUsernotification1 = new Usernotification({
        useremail: req.body.patientemail,
        usernotification: req.body.useremail +  " " + "uploaded prescription at ufirst-global",
	usernotificationlink: "patientprescriptionhistory"
     });
          newUsernotification1
            .save()
            .then(notil1 =>console.log(notil1))
            .catch(err => console.log(err));

      
});

*/

});


router.post("/prescriptionsend", (req, res, next) => {
   
    var html = fs.readFileSync('template.html', 'utf8');
        
    var options = {
    format: "A3",
    orientation: "portrait",
    border: "10mm"
};

    const users = [
    {
        patient : req.body.patient,
        doctor :  req.body.doctor,
        prescription: req.body.prescription
    },
   ];


var pdfname = req.body.patient1 + '_' + req.body.doctor1 + '_' + req.body.appointmentnumber;
var document = {
    html: html,
    data: {
        users: users
    },
    path: "./public/uploads/" + pdfname + ".pdf"
};

pdf.create(document, options)
    .then(response => {
        console.log(response);
      const url = req.protocol + '://' + req.get('host')
  var pathfile =  'public/uploads/'+  pdfname + '.pdf';
   let testFile = fs.readFileSync(pathfile);
   let testBuffer = new Buffer(testFile);
  ipfs.files.add(testBuffer, function (err, file) {
    if (err) {
         console.log(err);
     }
    console.log(file)
    console.log(file[0].hash);
const newUserDoctorPrescription = new Userdoctorprescription({
        doctoremail: req.body.doctoremail,
        patientemail: req.body.patientemail,
        appointmentnumber : req.body.appointmentnumber,
        avatarname: pdfname + '.pdf',
        avatar: url + '/ws/public/uploads/' +  pdfname + '.pdf',
        avatarhash: file[0].hash
      });

          newUserDoctorPrescription
            .save()
            .then(doctorprescription  => {
	   const mailOptions = {
  		from: '"Testing uFirst" testingufirst@gmail.com', 
  		to:  'contact@ufirst.global', 
  	        subject: 'prescription hash  ' + file[0].hash, 
  	        html: '<p> Please download  your prescription from following link ' + ' ' +  '</p> <a class="" href="https://gateway.ipfs.io/ipfs/' + file[0].hash + '">Download Prescription</a> <p>  Thanks &amp; regards<br/> Ufirst-Global </p>'
              };
             transporter.sendMail(mailOptions, function (err, info) {
   		if(err)
     		 console.log(err);
   		else
     		 console.log(info);
             });
		res.json( doctorprescription );
          }).catch(err => console.log(err));
       
      const newUsertimeline = new Usertimeline({
        useremail: req.body.doctoremail,
        useractivity: "uploaded prescription at ufirst-global for " + req.body.patientemail,
	useractivitylink: "doctorprescriptionhistory"
     });
          newUsertimeline
            .save()
            .then(timel =>console.log(timel))
            .catch(err => console.log(err));

     const newUsertimeline1 = new Usertimeline({
        useremail: req.body.patientemail,
        useractivity: req.body.doctoremail+  " " + "uploaded prescription at ufirst-global",
	useractivitylink: "patientprescriptionhistory"
     });
          newUsertimeline1
            .save()
            .then(timel1 =>console.log(timel1))
            .catch(err => console.log(err));
    
    const newUsernotification = new Usernotification({
        useremail: req.body.doctoremail,
        usernotification: "uploaded prescription at ufirst-global for " + req.body.patientemail,
	usernotificationlink: "doctorprescriptionhistory"
     });
          newUsernotification
            .save()
            .then(notil =>console.log(notil))
            .catch(err => console.log(err));

        const newUsernotification1 = new Usernotification({
        useremail: req.body.patientemail,
        usernotification: 'prescription hash is :  ' + file[0].hash,
	usernotificationlink: "patientprescriptionhistory"
     });
          newUsernotification1
            .save()
            .then(notil1 =>console.log(notil1))
            .catch(err => console.log(err));

});

    })
    .catch(error => {
        console.error(error)
    });



});



router.get("/prescriptionhistory/(:id)", (req, res) => {
   
      Userprescription.find({ patientemail: req.params.id }).then(userpresc => {
    if (!userpresc) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    res.send(userpresc);
 });
});


router.get("/doctorprescriptionhistory/(:id)", (req, res) => {
   
      Userdoctorprescription.find({ doctoremail: req.params.id }).then(userpresc => {
    if (!userpresc) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    res.send(userpresc);
 });
});

router.get("/patientprescriptionhistory/(:id)", (req, res) => {
   
      Userdoctorprescription.find({ patientemail: req.params.id }).then(userpresc => {
    if (!userpresc) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    res.send(userpresc);
 });
});


router.get("/sendprescriptionhistory/(:id)", (req, res) => {
   
      Userdoctorprescription.find({ appointmentnumber : req.params.id }).then(userpresc => {
    if (!userpresc) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    res.send(userpresc);
 });
});

router.get("/prescriptionlist", (req, res) => {
   
      Userdoctorprescription.find({ }).then(userpresc => {
    if (!userpresc) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    res.send(userpresc);
 });
});

router.get("/chatroom/(:id)", (req, res) => {
   
    Userchatroom.find({ name: req.params.id  }).then(userchat => {
        if (!userchat) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
       console.log(userchat);
         console.log(userchat[0].messages);
	//res.send(userchat);
        res.send(userchat[0].messages);
    });
});

router.post("/smokinghabbit", (req, res) => {
     //console.log(req.body);
 
      const newUsersmokinghabbit = new Usersmokinghabbit({
        useremail: req.body.useremail,
        smokinghabbit: req.body.smokinghabbit,
	smokinghabbitstart: req.body.smokingstartingdate,
	smokinghabbitend: req.body.smokingquitdate,
      });

          newUsersmokinghabbit
            .save()
            .then(famly => res.json(famly))
            .catch(err => console.log(err));
          const newUsertimeline = new Usertimeline({
        useremail: req.body.useremail,
        useractivity: "add smoking history at ufirst-global",
	useractivitylink: "smokinghistory"
     });
          newUsertimeline
            .save()
            .then(timel =>console.log(timel))
            .catch(err => console.log(err));
});


router.post("/drinkinghabbit", (req, res) => {
     //console.log(req.body);
 
      const newUserdrinkinghabbit = new Userdrinkinghabbit({
        useremail: req.body.useremail,
        drinkinghabbit: req.body.drinkinghabbit,
	drinkinghabbitstart: req.body.drinkingstartingdate,
	drinkinghabbitend: req.body.drinkingquitdate,
      });

          newUserdrinkinghabbit
            .save()
            .then(famly => res.json(famly))
            .catch(err => console.log(err));
          const newUsertimeline = new Usertimeline({
        useremail: req.body.useremail,
        useractivity: "add drinking history at ufirst-global",
	useractivitylink: "drinkinghistory"
     });
          newUsertimeline
            .save()
            .then(timel =>console.log(timel))
            .catch(err => console.log(err));
});


router.get("/smokinghistory/(:id)", (req, res) => {
     //console.log(req.body);
 
      Usersmokinghabbit.find({ useremail: req.params.id }).then(usersmoke => {
    if (!usersmoke) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    res.send(usersmoke);
 });
 
});


router.get("/drinkinghistory/(:id)", (req, res) => {
     //console.log(req.body);
 
      Userdrinkinghabbit.find({ useremail: req.params.id }).then(userdrink => {
    if (!userdrink) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    res.send(userdrink);
 });
 
});


router.post("/stripe/payment", (req, res, next) => {

      stripe.charges.create({
      shipping: {
    name: 'Jenny Rosen',
    address: {
      line1: '510 Townsend St',
      postal_code: '98140',
      city: 'San Francisco',
      state: 'CA',
      country: 'US',
    },
  },
      amount: req.body.amount,
      currency: 'usd',
      description: 'Consultation Fees',
      source: req.body.token.id,
   }, (err, change) => {
      if(err) {
        next(err);
     }
  res.json({ success : true, status: "Payment Successful"})
   });

   console.log(req.body);
});

router.get("/chatfulllist", (req, res) => {
   
    Userchatroom.find({}).then(userchat => {
        if (!userchat) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
       //console.log(userchat);
         //console.log(userchat[0].messages);
	//res.send(userchat);
        res.send(userchat[0].messages);
    });
});

router.get("/timelinelist", (req, res) => {
     //console.log(req.body);
 
      Usertimeline.find({}).then(usert => {
    if (!usert) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    res.send(usert);
 });
});


router.get("/notificationlist", (req, res) => {
     //console.log(req.body);
 
      Usernotification.find({}).then(usert => {
    if (!usert) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    res.send(usert);
 });
});

router.get("/appointmentnotificationlist", (req, res) => {
     //console.log(req.body);
 
      Userappointmentnotification.find({}).then(usert => {
    if (!usert) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    res.send(usert);
 });
});

router.post("/medicinepresappo", (req, res) => {
     //console.log(req.body);
 
      const newUserprescriptionmedicine = new Userprescriptionmedicine({
        doctoremail: req.body.doctoremail,
        patientemail: req.body.patientemail,
        appointmentnumber: req.body.appointmentnumber,
	medicinename: req.body.medicinename,
	medicinetiming: req.body.medicinetiming,
        
      });

          newUserprescriptionmedicine
            .save()
            .then(medicine => res.json(medicine))
            .catch(err => console.log(err));
       
             
});

router.get("/medicinehistory/(:id)", (req, res) => {
     //console.log(req.body);
 
      Userprescriptionmedicine.find({ appointmentnumber: req.params.id }).then(userdrink => {
    if (!userdrink) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    res.send(userdrink);
 });
 
});


router.post("/testingpresappo", (req, res) => {
     //console.log(req.body);
 
      const newUserprescriptiontesting = new Userprescriptiontesting({
        doctoremail: req.body.doctoremail,
        patientemail: req.body.patientemail,
        appointmentnumber: req.body.appointmentnumber,
	testingname: req.body.testingname,
	testingtiming: req.body.testingtiming,
        
      });

          newUserprescriptiontesting
            .save()
            .then(medicinet => res.json(medicinet))
            .catch(err => console.log(err));
       
             
});

router.get("/testinghistory/(:id)", (req, res) => {
     //console.log(req.body);
 
      Userprescriptiontesting.find({ appointmentnumber: req.params.id }).then(userdrink => {
    if (!userdrink) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    res.send(userdrink);
 });
 
});


router.post("/medicinepres", (req, res) => {
     //console.log(req.body);
 
      Usermedicine.findOne({ $and : [
                      { appointmentnumber : req.body.appointmentnumber } , 
                      { medicinename : req.body.medicinename }
                 ]}).then(userappoi => {
    if (userappoi) {
      Usermedicine.updateOne({ appointmentnumber : req.body.appointmentnumber  , medicinename : req.body.medicinename  }, { medicinetiming: req.body.medicinetiming }, function(
    err,
    result
  ) {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
    } else {

       const newUsermedicine = new Usermedicine({
        doctoremail: req.body.doctoremail,
        appointmentnumber: req.body.appointmentnumber,
	medicinename: req.body.medicinename,
	medicinetiming: req.body.medicinetiming,
        
      });

          newUsermedicine
            .save()
            .then(medicine => res.json(medicine))
            .catch(err => console.log(err));
   }
 });
 
});

router.get("/medicinepreshistory/(:id)", (req, res) => {
     //console.log(req.body);
 
      Usermedicine.find({ appointmentnumber: req.params.id }).then(userdrink => {
    if (!userdrink) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    res.send(userdrink);
 });
 
});


router.post("/medicinepres1", (req, res) => {
     //console.log(req.body);
 
      Usermedicine1.findOne({ $and : [
                      { appointmentnumber : req.body.appointmentnumber } , 
                      { medicinename : req.body.medicinename }
                 ]}).then(userappoi => {
    if (userappoi) {
      Usermedicine1.updateOne({ appointmentnumber : req.body.appointmentnumber  , medicinename : req.body.medicinename  }, { medicinetiming: req.body.medicinetiming }, function(
    err,
    result
  ) {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
    } else {

       const newUsermedicine1 = new Usermedicine1({
        doctoremail: req.body.doctoremail,
        appointmentnumber: req.body.appointmentnumber,
	medicinename: req.body.medicinename,
	medicinetiming: req.body.medicinetiming,
        
      });

          newUsermedicine1
            .save()
            .then(medicine => res.json(medicine))
            .catch(err => console.log(err));
   }
 });
 
});

router.get("/medicinepres1history/(:id)", (req, res) => {
     //console.log(req.body);
 
      Usermedicine1.find({ appointmentnumber: req.params.id }).then(userdrink => {
    if (!userdrink) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    res.send(userdrink);
 });
 
});

router.post("/medicinepres2", (req, res) => {
     //console.log(req.body);
 
      Usermedicine2.findOne({ $and : [
                      { appointmentnumber : req.body.appointmentnumber } , 
                      { medicinename : req.body.medicinename }
                 ]}).then(userappoi => {
    if (userappoi) {
      Usermedicine2.updateOne({ appointmentnumber : req.body.appointmentnumber  , medicinename : req.body.medicinename  }, { medicinetiming: req.body.medicinetiming }, function(
    err,
    result
  ) {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
    } else {

       const newUsermedicine2 = new Usermedicine2({
        doctoremail: req.body.doctoremail,
        appointmentnumber: req.body.appointmentnumber,
	medicinename: req.body.medicinename,
	medicinetiming: req.body.medicinetiming,
        
      });

          newUsermedicine2
            .save()
            .then(medicine => res.json(medicine))
            .catch(err => console.log(err));
   }
 });
 
});

router.get("/medicinepres2history/(:id)", (req, res) => {
     //console.log(req.body);
 
      Usermedicine2.find({ appointmentnumber: req.params.id }).then(userdrink => {
    if (!userdrink) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    res.send(userdrink);
 });
 
});


router.post("/medicinepres3", (req, res) => {
     //console.log(req.body);
 
      Usermedicine3.findOne({ $and : [
                      { appointmentnumber : req.body.appointmentnumber } , 
                      { medicinename : req.body.medicinename }
                 ]}).then(userappoi => {
    if (userappoi) {
      Usermedicine3.updateOne({ appointmentnumber : req.body.appointmentnumber  , medicinename : req.body.medicinename  }, { medicinetiming: req.body.medicinetiming }, function(
    err,
    result
  ) {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
    } else {

       const newUsermedicine3 = new Usermedicine3({
        doctoremail: req.body.doctoremail,
        appointmentnumber: req.body.appointmentnumber,
	medicinename: req.body.medicinename,
	medicinetiming: req.body.medicinetiming,
        
      });

          newUsermedicine3
            .save()
            .then(medicine => res.json(medicine))
            .catch(err => console.log(err));
   }
 });
 
});

router.get("/medicinepres3history/(:id)", (req, res) => {
     //console.log(req.body);
 
      Usermedicine3.find({ appointmentnumber: req.params.id }).then(userdrink => {
    if (!userdrink) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    res.send(userdrink);
 });
 
});



router.post("/medicinepres4", (req, res) => {
     //console.log(req.body);
 
      Usermedicine4.findOne({ $and : [
                      { appointmentnumber : req.body.appointmentnumber } , 
                      { medicinename : req.body.medicinename }
                 ]}).then(userappoi => {
    if (userappoi) {
      Usermedicine4.updateOne({ appointmentnumber : req.body.appointmentnumber  , medicinename : req.body.medicinename  }, { medicinetiming: req.body.medicinetiming }, function(
    err,
    result
  ) {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
    } else {

       const newUsermedicine4 = new Usermedicine4({
        doctoremail: req.body.doctoremail,
        appointmentnumber: req.body.appointmentnumber,
	medicinename: req.body.medicinename,
	medicinetiming: req.body.medicinetiming,
        
      });

          newUsermedicine4
            .save()
            .then(medicine => res.json(medicine))
            .catch(err => console.log(err));
   }
 });
 
});

router.get("/medicinepres4history/(:id)", (req, res) => {
     //console.log(req.body);
 
      Usermedicine4.find({ appointmentnumber: req.params.id }).then(userdrink => {
    if (!userdrink) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    res.send(userdrink);
 });
 
});


router.post("/medicinepres5", (req, res) => {
     //console.log(req.body);
 
      Usermedicine5.findOne({ $and : [
                      { appointmentnumber : req.body.appointmentnumber } , 
                      { medicinename : req.body.medicinename }
                 ]}).then(userappoi => {
    if (userappoi) {
      Usermedicine5.updateOne({ appointmentnumber : req.body.appointmentnumber  , medicinename : req.body.medicinename  }, { medicinetiming: req.body.medicinetiming }, function(
    err,
    result
  ) {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
    } else {

       const newUsermedicine5 = new Usermedicine5({
        doctoremail: req.body.doctoremail,
        appointmentnumber: req.body.appointmentnumber,
	medicinename: req.body.medicinename,
	medicinetiming: req.body.medicinetiming,
        
      });

          newUsermedicine5
            .save()
            .then(medicine => res.json(medicine))
            .catch(err => console.log(err));
   }
 });
 
});

router.get("/medicinepres5history/(:id)", (req, res) => {
     //console.log(req.body);
 
      Usermedicine5.find({ appointmentnumber: req.params.id }).then(userdrink => {
    if (!userdrink) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    res.send(userdrink);
 });
 
});


router.post("/medicinepres6", (req, res) => {
     //console.log(req.body);
 
      Usermedicine6.findOne({ $and : [
                      { appointmentnumber : req.body.appointmentnumber } , 
                      { medicinename : req.body.medicinename }
                 ]}).then(userappoi => {
    if (userappoi) {
      Usermedicine6.updateOne({ appointmentnumber : req.body.appointmentnumber  , medicinename : req.body.medicinename  }, { medicinetiming: req.body.medicinetiming }, function(
    err,
    result
  ) {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
    } else {

       const newUsermedicine6 = new Usermedicine6({
        doctoremail: req.body.doctoremail,
        appointmentnumber: req.body.appointmentnumber,
	medicinename: req.body.medicinename,
	medicinetiming: req.body.medicinetiming,
        
      });

          newUsermedicine6
            .save()
            .then(medicine => res.json(medicine))
            .catch(err => console.log(err));
   }
 });
 
});

router.get("/medicinepres6history/(:id)", (req, res) => {
     //console.log(req.body);
 
      Usermedicine6.find({ appointmentnumber: req.params.id }).then(userdrink => {
    if (!userdrink) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    res.send(userdrink);
 });
 
});


router.post("/testingpres", (req, res) => {
     //console.log(req.body);
 
      Usertesting.findOne({ $and : [
                      { appointmentnumber : req.body.appointmentnumber } , 
                      { testingname : req.body.testingname }
                 ]}).then(userappoi => {
    if (userappoi) {
      Usertesting.updateOne({ appointmentnumber : req.body.appointmentnumber , testingname : req.body.testingname  }, { testingtiming: req.body.testingtiming }, function(
    err,
    result
  ) {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
    } else {

       const newUsertesting = new Usertesting({
        doctoremail: req.body.doctoremail,
        appointmentnumber: req.body.appointmentnumber,
	testingname: req.body.testingname,
	testingtiming: req.body.testingtiming,
        
      });

          newUsertesting
            .save()
            .then(medicinet => res.json(medicinet))
            .catch(err => console.log(err));
   }
 });
 
});


router.get("/testingpreshistory/(:id)", (req, res) => {
     //console.log(req.body);
 
      Usertesting.find({ appointmentnumber: req.params.id }).then(userdrink => {
    if (!userdrink) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    res.send(userdrink);
 });
 
});


router.post("/testingpres1", (req, res) => {
     //console.log(req.body);
 
      Usertesting1.findOne({ $and : [
                      { appointmentnumber : req.body.appointmentnumber } , 
                      { testingname : req.body.testingname }
                 ]}).then(userappoi => {
    if (userappoi) {
      Usertesting1.updateOne({ appointmentnumber : req.body.appointmentnumber , testingname : req.body.testingname  }, { testingtiming: req.body.testingtiming }, function(
    err,
    result
  ) {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
    } else {

       const newUsertesting1 = new Usertesting1({
        doctoremail: req.body.doctoremail,
        appointmentnumber: req.body.appointmentnumber,
	testingname: req.body.testingname,
	testingtiming: req.body.testingtiming,
        
      });

          newUsertesting1
            .save()
            .then(medicinet => res.json(medicinet))
            .catch(err => console.log(err));
   }
 });
 
});


router.get("/testingpres1history/(:id)", (req, res) => {
     //console.log(req.body);
 
      Usertesting1.find({ appointmentnumber: req.params.id }).then(userdrink => {
    if (!userdrink) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    res.send(userdrink);
 });
 
});

router.post("/testingpres2", (req, res) => {
     //console.log(req.body);
 
      Usertesting2.findOne({ $and : [
                      { appointmentnumber : req.body.appointmentnumber } , 
                      { testingname : req.body.testingname }
                 ]}).then(userappoi => {
    if (userappoi) {
      Usertesting2.updateOne({ appointmentnumber : req.body.appointmentnumber , testingname : req.body.testingname  }, { testingtiming: req.body.testingtiming }, function(
    err,
    result
  ) {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
    } else {

       const newUsertesting2 = new Usertesting2({
        doctoremail: req.body.doctoremail,
        appointmentnumber: req.body.appointmentnumber,
	testingname: req.body.testingname,
	testingtiming: req.body.testingtiming,
        
      });

          newUsertesting2
            .save()
            .then(medicinet => res.json(medicinet))
            .catch(err => console.log(err));
   }
 });
 
});


router.get("/testingpres2history/(:id)", (req, res) => {
     //console.log(req.body);
 
      Usertesting2.find({ appointmentnumber: req.params.id }).then(userdrink => {
    if (!userdrink) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    res.send(userdrink);
 });
 
});

router.post("/testingpres3", (req, res) => {
     //console.log(req.body);
 
      Usertesting3.findOne({ $and : [
                      { appointmentnumber : req.body.appointmentnumber } , 
                      { testingname : req.body.testingname }
                 ]}).then(userappoi => {
    if (userappoi) {
      Usertesting3.updateOne({ appointmentnumber : req.body.appointmentnumber , testingname : req.body.testingname  }, { testingtiming: req.body.testingtiming }, function(
    err,
    result
  ) {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
    } else {

       const newUsertesting3 = new Usertesting3({
        doctoremail: req.body.doctoremail,
        appointmentnumber: req.body.appointmentnumber,
	testingname: req.body.testingname,
	testingtiming: req.body.testingtiming,
        
      });

          newUsertesting3
            .save()
            .then(medicinet => res.json(medicinet))
            .catch(err => console.log(err));
   }
 });
 
});


router.get("/testingpres3history/(:id)", (req, res) => {
     //console.log(req.body);
 
      Usertesting3.find({ appointmentnumber: req.params.id }).then(userdrink => {
    if (!userdrink) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    res.send(userdrink);
 });
 
});

router.post("/testingpres4", (req, res) => {
     //console.log(req.body);
 
      Usertesting4.findOne({ $and : [
                      { appointmentnumber : req.body.appointmentnumber } , 
                      { testingname : req.body.testingname }
                 ]}).then(userappoi => {
    if (userappoi) {
      Usertesting4.updateOne({ appointmentnumber : req.body.appointmentnumber , testingname : req.body.testingname  }, { testingtiming: req.body.testingtiming }, function(
    err,
    result
  ) {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
    } else {

       const newUsertesting4 = new Usertesting4({
        doctoremail: req.body.doctoremail,
        appointmentnumber: req.body.appointmentnumber,
	testingname: req.body.testingname,
	testingtiming: req.body.testingtiming,
        
      });

          newUsertesting4
            .save()
            .then(medicinet => res.json(medicinet))
            .catch(err => console.log(err));
   }
 });
 
});


router.get("/testingpres4history/(:id)", (req, res) => {
     //console.log(req.body);
 
      Usertesting4.find({ appointmentnumber: req.params.id }).then(userdrink => {
    if (!userdrink) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    res.send(userdrink);
 });
 
});


router.post("/testingpres5", (req, res) => {
     //console.log(req.body);
 
      Usertesting5.findOne({ $and : [
                      { appointmentnumber : req.body.appointmentnumber } , 
                      { testingname : req.body.testingname }
                 ]}).then(userappoi => {
    if (userappoi) {
      Usertesting5.updateOne({ appointmentnumber : req.body.appointmentnumber , testingname : req.body.testingname  }, { testingtiming: req.body.testingtiming }, function(
    err,
    result
  ) {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
    } else {

       const newUsertesting5 = new Usertesting5({
        doctoremail: req.body.doctoremail,
        appointmentnumber: req.body.appointmentnumber,
	testingname: req.body.testingname,
	testingtiming: req.body.testingtiming,
        
      });

          newUsertesting5
            .save()
            .then(medicinet => res.json(medicinet))
            .catch(err => console.log(err));
   }
 });
 
});


router.get("/testingpres5history/(:id)", (req, res) => {
     //console.log(req.body);
 
      Usertesting5.find({ appointmentnumber: req.params.id }).then(userdrink => {
    if (!userdrink) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    res.send(userdrink);
 });
 
});


router.post("/testingpres6", (req, res) => {
     //console.log(req.body);
 
      Usertesting6.findOne({ $and : [
                      { appointmentnumber : req.body.appointmentnumber } , 
                      { testingname : req.body.testingname }
                 ]}).then(userappoi => {
    if (userappoi) {
      Usertesting6.updateOne({ appointmentnumber : req.body.appointmentnumber , testingname : req.body.testingname  }, { testingtiming: req.body.testingtiming }, function(
    err,
    result
  ) {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
    } else {

       const newUsertesting6 = new Usertesting6({
        doctoremail: req.body.doctoremail,
        appointmentnumber: req.body.appointmentnumber,
	testingname: req.body.testingname,
	testingtiming: req.body.testingtiming,
        
      });

          newUsertesting6
            .save()
            .then(medicinet => res.json(medicinet))
            .catch(err => console.log(err));
   }
 });
 
});


router.get("/testingpres6history/(:id)", (req, res) => {
     //console.log(req.body);
 
      Usertesting6.find({ appointmentnumber: req.params.id }).then(userdrink => {
    if (!userdrink) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    res.send(userdrink);
 });
 
});




router.post("/prescriptionsendtemplate", (req, res, next) => {
    
    console.log(req.body);
   
    var html = fs.readFileSync('template1.html', 'utf8');
        
    var options = {
    format: "A3",
    orientation: "portrait",
    border: "10mm"
};
let medicine1;
if(!req.body.medicine || req.body.medicine == null || req.body.medicine === '') {
        medicine = 0;
      } else {
        medicine = req.body.medicine
      }

let testing1;
if(!req.body.testing || req.body.testing == null || req.body.testing === '') {
        testing1 = ' ';
      } else {
        testing1 = req.body.testing;
      }

let medicine2;
if(!req.body.medicine1 || req.body.medicine1 == null || req.body.medicine1 === '') {
        medicine2 = ' ';
      } else {
        medicine2 = req.body.medicinel
      }

let testing2;
if(!req.body.testing1 || req.body.testing1 == null || req.body.testing1 === '') {
        testing2 = ' ';
      } else {
        testing2 = req.body.testing1;
      }

let medicine3;
if(!req.body.medicine2 || req.body.medicine2 == null || req.body.medicine2 === '') {
        medicine3 =  ' ';
      } else {
        medicine3 = req.body.medicine2;
      }

let testing3;
if(!req.body.testing2 || req.body.testing2 == null || req.body.testing2 === '') {
        testing3 =  ' ';
      } else {
        testing3 = req.body.testing2;
      }

let medicine4;
if(!req.body.medicine3 || req.body.medicine3 == null || req.body.medicine3 === '') {
        medicine4 = ' ';
      } else {
        medicine4 = req.body.medicine3;
      }

let testing4;
if(!req.body.testing3 || req.body.testing3 == null || req.body.testing3 === '') {
        testing4 = ' ';
      } else {
        testing4 = req.body.testing3;
      }

let medicine5;
if(!req.body.medicine4 || req.body.medicine4 == null || req.body.medicine4 === '') {
        medicine5 =  ' ';
      } else {
        medicine5 = req.body.medicine4;
      }

let testing5;
if(!req.body.testing4 || req.body.testing4 == null || req.body.testing4 === '') {
        testing5 = ' ';
      } else {
        testing5 = req.body.testing4;
      }

let medicine6;
if(!req.body.medicine5 || req.body.medicine5 == null || req.body.medicine5 === '') {
        medicine6 =  ' ';
      } else {
        medicine6 = req.body.medicine5;
      }

let testing6;
if(!req.body.testing5 || req.body.testing5 == null || req.body.testing5 === '') {
        testing6 =  ' ';
      } else {
        testing6 = req.body.testing5;
      }


    const users = [
    {
        patient : req.body.patient,
        doctor :  req.body.doctor,
        medicine1: medicine1,
        test1: testing1,
        medicine2: medicine2,
        test2: testing2,
        medicine3: medicine3,
        test3: testing3,
        medicine4 : medicine4,
        test4 : testing4,
        medicine5: medicine5,
        test5 : testing5,
        medicine6: medicine6,
        test6:  testing6,
        prescription: req.body.prescription
    },
   ];

 var datenow = new Date().getTime();
var pdfname = req.body.patient1 + '_' + req.body.doctor1 + '_' + req.body.appointmentnumber + '_' + datenow;
var document = {
    html: html,
    data: {
        users: users
    },
    path: "./public/uploads/" + pdfname + ".pdf"
};

pdf.create(document, options)
    .then(response => {
        console.log(response);
      const url = req.protocol + '://' + req.get('host')
  var pathfile =  'public/uploads/'+  pdfname + '.pdf';
   let testFile = fs.readFileSync(pathfile);
   let testBuffer = new Buffer(testFile);
  ipfs.files.add(testBuffer, function (err, file) {
    if (err) {
         console.log(err);
     }
    console.log(file)
    console.log(file[0].hash);
const newUserDoctorPrescription = new Userdoctorprescription({
        doctoremail: req.body.doctoremail,
        patientemail: req.body.patientemail,
        appointmentnumber : req.body.appointmentnumber,
        avatarname: pdfname + '.pdf',
        avatar: url + '/ws/public/uploads/' +  pdfname + '.pdf',
        avatarhash: file[0].hash
      });

          newUserDoctorPrescription
            .save()
            .then(doctorprescription  => {
	   const mailOptions = {
  		from: '"Testing uFirst" testingufirst@gmail.com', 
  		to:  'contact@ufirst.global', 
  	        subject: 'prescription hash  ' + file[0].hash, 
  	        html: '<p> Please download  your prescription from following link ' + ' ' +  '</p> <a class="" href="https://gateway.ipfs.io/ipfs/' + file[0].hash + '">Download Prescription</a> <p>  Thanks &amp; regards<br/> Ufirst-Global </p>'
              };
             transporter.sendMail(mailOptions, function (err, info) {
   		if(err)
     		 console.log(err);
   		else
     		 console.log(info);
             });
		res.json( doctorprescription );
          }).catch(err => console.log(err));
       
      const newUsertimeline = new Usertimeline({
        useremail: req.body.doctoremail,
        useractivity: "uploaded prescription at ufirst-global for " + req.body.patientemail,
	useractivitylink: "doctorprescriptionhistory"
     });
          newUsertimeline
            .save()
            .then(timel =>console.log(timel))
            .catch(err => console.log(err));

     const newUsertimeline1 = new Usertimeline({
        useremail: req.body.patientemail,
        useractivity: req.body.doctoremail+  " " + "uploaded prescription at ufirst-global",
	useractivitylink: "patientprescriptionhistory"
     });
          newUsertimeline1
            .save()
            .then(timel1 =>console.log(timel1))
            .catch(err => console.log(err));
    
    const newUsernotification = new Usernotification({
        useremail: req.body.doctoremail,
        usernotification: "uploaded prescription at ufirst-global for " + req.body.patientemail,
	usernotificationlink: "doctorprescriptionhistory"
     });
          newUsernotification
            .save()
            .then(notil =>console.log(notil))
            .catch(err => console.log(err));

        const newUsernotification1 = new Usernotification({
        useremail: req.body.patientemail,
        usernotification: 'prescription hash is :  ' + file[0].hash,
	usernotificationlink: "patientprescriptionhistory"
     });
          newUsernotification1
            .save()
            .then(notil1 =>console.log(notil1))
            .catch(err => console.log(err));

});

    })
    .catch(error => {
        console.error(error)
    });



});


module.exports = router;