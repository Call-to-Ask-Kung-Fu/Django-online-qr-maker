function makeqr()
{	            // e.preventDefault();
	var url = $("#new").attr("action");
    var values={};
    $.each
    	(
    		$("#new").serializeArray(),function(i,field)
    		{
        		values[field.name]=field.value;
        	}
        );
            if (values['input']==''){alert('Type Something');;retun;}
 if ($("#id_icon")[0].files[0]) {         
            if ($.browser.msie) {
 //before making an object of ActiveXObject, 
 //please make sure ActiveX is enabled in your IE browser
 var objFSO = new ActiveXObject("Scripting.FileSystemObject"); var filePath = $("#id_icon")[0].value;
 var objFile = objFSO.getFile(filePath);
 var fileSize = objFile.size; //size in kb
 fileSize = fileSize / 1024; //size in mb 
 }
 //for FF, Safari, Opeara and Others
 else {
 fileSize = $("#id_icon")[0].files[0].size; //size in kb
 fileSize = fileSize / 1024; //size in mb 
 }
 if (fileSize>100){alert('icon size must be < 100 kb');;retun;}
  }           
            var data = new FormData($('#new').get(0));
            $("#qrsubmit").hide();
            $("#prog").show();
            $.ajax({
               url: url,
               // dataType:"JSON",
               type: "POST",
               cache: false,
    		processData: false,
    			contentType: false,
               data: data
            }).done(function(d){
                   $("#myqr").html(d);
                   $("#qrform").hide();
                   $("#myqr").show();
                   $("#prog").hide();
                   $("#qrsubmit").show();
            		
            });
};

function more () {
	$("#id_input").val('');
	$("#id_icon").val('');
	$("#myqr").hide();
  $("#qrform").show();                   
}


function closelist()
{	       
	$("#listall").hide();
                   $("#leftpanel").show();
};

function ajax_get_update()
    {
       $.ajax({
               url: url,
               dataType:"html",
               type: "GET",
            }).done(function(d){   
               	   $('#ajax_table_result').html(d);

                   $("#leftpanel").hide();
        		   $("#listall").show();
            });
    }
 
//bind the corresponding links in your document to the ajax get function
$( document ).ready(function(){
	$('a.listall').on('click', function(e)
	{	 var url = $(this).attr('href');
	 e.preventDefault();
	
           $.ajax({
               url: url,
               dataType:"html",
               type: "GET",
            }).done(function(d){   
               	   $('#ajax_table_result').html(d);

                   $("#leftpanel").hide();
        		   $("#listall").show();
            });
});

// $('.detail').on('click', function(e)
	// {	  
		// var url = $(this).attr('href');     
	 // e.preventDefault();
            // $.ajax({
               // url: url,
               // dataType:"html",
               // type: "GET",
            // }).done(function(d){
                   // $('#myqr').html(d);
                   // $("#qrform").hide();
                   // $("#myqr").show();
            // });
// });
// 
// $('.hide').on('click', function(e)
	// {	  
		// var url = $(this).attr('href');     
	 // e.preventDefault();
            // $.ajax({
               // url: url,
               // // dataType:"JSON",
               // type: "GET",
            // }).done(function(d){
                   // $("#hide"+d.id).hide();
                   // $("#show"+d.id).show();
            // });
// });
// 
// $('.show').on('click', function(e)
	// {	  
		// var url = $(this).attr('href');     
	 // e.preventDefault();
            // $.ajax({
               // url: url,
               // // dataType:"JSON",
               // type: "GET",
            // }).done(function(d){
                   // $("#show"+d.id).hide();
                   // $("#hide"+d.id).show();
//  
            // });
// });
// 
// $('.delete').on('click', function(e)
	// {	  
		// var url = $(this).attr('href');     
	 // e.preventDefault();
            // $.ajax({
               // url: url,
               // // dataType:"JSON",
               // type: "GET",
            // }).done(function(d){
                   // $("#tr"+d.id).remove();
// 
            // });
// });
// 
// 
    // $('.prev' ).on("click",function(e) {
        // e.preventDefault();
        // url = $('.prev').attr("href");
        // ajax_get_update();
    // });
    // $('.next' ).on("click",function(e) {
        // e.preventDefault();
        // url = $('.next').attr("href");
        // ajax_get_update();
// 
    // });
   
});

//since the links are reloaded we have to bind the links again
//to the actions
$( document ).ajaxStop(function(){
	$('a.listall').off("click").on('click', function(e)
	{	 var url = $(this).attr('href');
	 e.preventDefault();	
           $.ajax({
               url: url,
               dataType:"html",
               type: "GET",
            }).done(function(d){   
               	   $('#ajax_table_result').html(d);

                   $("#leftpanel").hide();
        		   $("#listall").show();
            });
	});

	$('a.detail').off("click").on('click', function(e)
	{	  
		var url = $(this).attr('href');     
	 e.preventDefault();	
            $.ajax({
               url: url,
               dataType:"html",
               type: "GET",
            }).done(function(d){
                   $("#myqr").html(d);
                   $("#qrform").hide();
                   $("#myqr").show();
            });
	});
    $('.prev' ).off("click").on("click",function(e) {
        e.preventDefault();
        url = $('.prev').attr("href");
        ajax_get_update();
    });
    $('.next' ).off("click").on("click",function(e) {
        e.preventDefault();
       url = $('.next').attr("href");
        ajax_get_update();
    });
    
  $('.hid').off("click").click(function(e)
	{	  
		var url = $(this).attr('href');     
	 e.preventDefault();
            $.ajax({
               url: url,
               type: "GET",
            }).done(function(d){
                   $("#hide"+d.id).hide();
                   $("#show"+d.id).show();
 
            });
	});

$('.show').off("click").click(function(e)
	{	  
		var url = $(this).attr('href');     
	 e.preventDefault();
            $.ajax({
               url: url,
               // dataType:"JSON",
               type: "GET",
            }).done(function(d){
                   $("#show"+d.id).hide();
                   $("#hide"+d.id).show();
 
            });
	});

	$('.delete').off("click").on('click', function(e)
	{	  
		var url = $(this).attr('href');     
	 e.preventDefault();
            $.ajax({
               url: url,
               // dataType:"JSON",
               type: "GET",
            }).done(function(d){
                   $("#tr"+d.id).remove();

            });
	});
});
