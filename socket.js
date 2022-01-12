'use strict';

class Socket{
	constructor(socket)
	{
        this.io = socket;
        this.online_users = [];
        this.status = '';
	}

	ioConfig()
	{
		this.io.use((socket,next)=>{
            socket['id'] = 'user_' + socket.handshake.query.user_id;
            if (socket.handshake.query.mylist !='' || socket.handshake.query.mylist != 'undefined') {
                socket['my_friend'] = socket.handshake.query.mylist.split(',');
            }

            if (this.status != '') {
                socket['status'] = this.status;
            } else if(socket.handshake.query.status !='' || socket.handshake.query.status != 'undefined'){
                socket['status'] = socket.handshake.query.status;
            }
			next();
		});
    }

    check_online(socket) {
        socket.on('check_online', (data) => {
             	if ( this.online_users.indexOf(socket.id) == -1) {
                    this.online_users.push(socket.id);
                  }
                if (this.online_users.indexOf(data.user_id)  != -1) {
                var status = 'online';
                this.io.to(data.user_id).emit('iam_online',{
                        user_id:socket.id,
                        status:status
                });
                } else {
                    var status = 'offline';
                }
              this.io.to(socket.id).emit('is_online',{
 					user_id:data.user_id,
 					status:this.status
              });


            });
    }
    user_status(socket)
    {
        socket.on('change_status', (data) => {
            this.status = data.status;
            var myfreind = socket.my_friend;
                myfreind.forEach(user => {
                    var uid = 'user_' + user;
                        if (this.online_users.indexOf(uid) != -1) {
                            this.io.to(uid).emit('new_status',{
                                user_id:socket.id,
                                status:data.status
                            });
                        }
                });
            // console.log('visitor with session id =>',socket.id,'disconnected');
        });
    }

	socketConnection()
	{

 		 this.ioConfig();

        this.io.on('connection', (socket) => {
            console.log(socket.status);
            this.check_online(socket);
            this.user_status(socket);
			this.socketDisconnect(socket); // DisConnect User List
		});
    }


    socketDisconnect(socket) {
        socket.on('disconnect', (data) => {
                    //  console.log(socket.my_friend);
            var myfreind = socket.my_friend;
                myfreind.forEach(data => {
                    var uid = 'user_' + data;
                        if (this.online_users.indexOf(uid) != -1) {
                            this.io.to(uid).emit('iam_offline',{
                                user_id:socket.id,
                                status:'offline'
                            });
                        }
                });
            // console.log('visitor with session id =>',socket.id,'disconnected');
        });
    }

}
module.exports = Socket;

