const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require('cors');
const socket = require('socket.io');
const users = require("./routes/api/users");
const Userchatroom = require("./models/Userchatroom");


let count;
//let messagesArray = [];
let chatRooms;

const app = express();

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
app.use(cors());

app.use('/public', express.static('public'));
// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true, useUnifiedTopology: true }
  )
  .then((err, Database) => { 
       console.log("MongoDB successfully connected");
        }).catch(err => console.log(err));



// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

require('./routes.js')(app);

// Routes
app.use("/api/auth", users);

const port = process.env.PORT || 5000;

 const server = app.listen(port, () => console.log(`Server up and running on port ${port} !`));

const io = socket.listen(server);


io.sockets.on('connection', (socket) => {
        socket.on('join', (data) => {
            socket.join(data.room);
            console.log(data.room);
            Userchatroom.findOne({ name : data.room }).then(rooms => {
                
		if(!rooms) {
                    
                       const newchatRooms = new Userchatroom({
                           name: data.room, 
                           messages: []
                       });

                    newchatRooms
                    .save()
                    .then(chroom => console.log(chroom))
                    .catch(err => console.log(err));

                } else {
                console.log("hi");
                console.log(rooms);
                 console.log("hello");
                count = 0;
                rooms.forEach((room) => {
                    if(room.name == data.room){
                        count++;
                    }
                });
                console.log(count);
                if(count == 0) {
                    
                       const newchatRooms = new Userchatroom({
                           name: data.room, 
                           messages: []
                       });

                    newchatRooms
                    .save()
                    .then(chroom => console.log(chroom))
                    .catch(err => console.log(err));

                }
              }
            });
        });
        socket.on('message', (data) => {
            io.in(data.room).emit('new message', {user: data.user, message: data.message});
            Userchatroom.updateOne({name: data.room}, { $push: { messages:[ { user: data.user, message: data.message }] } }, (err, res) => {
                if(err) {
                    console.log(err);
                    return false;
                }
                console.log(res);
                console.log("Document updated");
            });
        });
        socket.on('typing', (data) => {
            socket.broadcast.in(data.room).emit('typing', {data: data, isTyping: true});
        });

	socket.on('room_join_request', payload => {
          socket.join(payload.roomName, err => {
            if (!err) {
                io.in(payload.roomName).clients((err, clients) => {
                    if (!err) {
                        io.in(payload.roomName).emit('room_users', clients)
                    }
                });
            }
        })
    })

    socket.on('offer_signal', payload => {
        io.to(payload.calleeId).emit('offer', { signalData: payload.signalData, callerId: payload.callerId });
    });

    socket.on('answer_signal', payload => {
        io.to(payload.callerId).emit('answer', { signalData: payload.signalData, calleeId: socket.id });
    });

    socket.on('disconnect', () => {
        io.emit('room_left', { type: 'disconnected', socketId: socket.id })
    });

});
