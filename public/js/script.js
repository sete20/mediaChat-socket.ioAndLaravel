function status_user(class1,class2)
{
	var status_user = ['online','offline','dnd','bys'];
	$.each(status_user,function(k,v){
		$('.'+class1).removeClass(v);
	});
		$('.'+class1).addClass(class2);

}


$(document).ready(function () {
    var mylist = [];
   var arr = [];
     $('.user').each(function(){
		var uid = $(this).attr('uid');
		mylist.push(uid);
     });
    ///
    var user_status = $('.status').filter('input[name="status"]:checked').val();
    var socket = io.connect('http://localhost:5000',
        {
            query:'user_id='+user_id+'&username='+username+'&mylist='+mylist.join(',')+'&status='+user_status
        });
    socket.on('is_online',function(data){
   			status_user(data.user_id,data.status);
   	});
   	socket.on('iam_online',function(data){
	   		status_user(data.user_id,data.status);
   	});
   	socket.on('iam_offline',function(data){
	   		 status_user(data.user_id,data.status);
   	});
    socket.on('new_status', function (data) {
        console.log(data);
	   		 status_user(data.user_id,data.status);
   	});
	socket.on('connect',function(data){
			$('.user').each(function(){
                var uid = $(this).attr('uid');
				socket.emit('check_online',{
					user_id:'user_'+uid
				});
			});
    });

    $(document).on('change', 'input[name="status"]', function () {
        var user_status = $('.status').filter('input[name="status"]:checked').val();
        socket.emit('change_status',  {
            status:user_status
        });
    });
	$(document).on('click', '.msg_head', function() {
		var chatbox = $(this).parents().attr("rel") ;
		$('[rel="'+chatbox+'"] .msg_wrap').slideToggle('slow');
		return false;
	});


	$(document).on('click', '.close', function() {
		var chatbox = $(this).parents().parents().attr("rel") ;
		$('[rel="'+chatbox+'"]').hide();
		arr.splice($.inArray(chatbox, arr), 1);
		displayChatBox();
		return false;
	});

	$(document).on('click', '#sidebar-user-box', function() {

	 var userID = $(this).attr("class");
	 var username = $(this).children().text() ;

	 if ($.inArray(userID, arr) != -1)
	 {
      arr.splice($.inArray(userID, arr), 1);
     }

	 arr.unshift(userID);
	 chatPopup =  '<div class="msg_box" style="right:270px" rel="'+ userID+'">'+
					'<div class="msg_head">'+username +
					'<div class="close">x</div> </div>'+
					'<div class="msg_wrap"> <div class="msg_body">	<div class="msg_push"></div> </div>'+
					'<div class="msg_footer"><textarea class="msg_input" rows="4"></textarea></div> 	</div> 	</div>' ;

     $("body").append(  chatPopup  );
	 displayChatBox();
	});


	$(document).on('keypress', 'textarea' , function(e) {
        if (e.keyCode == 13 ) {
            var msg = $(this).val();
			$(this).val('');
			if(msg.trim().length != 0){
			var chatbox = $(this).parents().parents().parents().attr("rel") ;
			$('<div class="msg-right">'+msg+'</div>').insertBefore('[rel="'+chatbox+'"] .msg_push');
			$('.msg_body').scrollTop($('.msg_body')[0].scrollHeight);
			}
        }
    });



	function displayChatBox(){
	    i = 270 ; // start position
		j = 260;  //next position

		$.each( arr, function( index, value ) {
		   if(index < 4){
	         $('[rel="'+value+'"]').css("right",i);
			 $('[rel="'+value+'"]').show();
		     i = i+j;
		   }
		   else{
			 $('[rel="'+value+'"]').hide();
		   }
        });
	}




});
