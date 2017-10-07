$(document).ready(function(){
    // document.getElementById("dashTab").addEventListener('click', function(){
    //     $('#fundraiser').fadeOut('fast');
    //     $('#snack-dash').fadeIn('fast');
    // });

    // document.getElementById("fundraiserTab").addEventListener('click', function(){
    //     $('#snack-dash').fadeOut('fast');
    //     $('#fundraiser').fadeIn('fast');
    // });
    
    var u_email = $('#user-email').val();

    var r_url = "http://ec2-54-186-192-209.us-west-2.compute.amazonaws.com:9000/info/" + u_email + "/"
    $.get( r_url, function( data ) {

        console.log('here');

    	d = data['data'];
    	
    	lunch1 = d['lunch1'];
    	lunch2 = d['lunch2'];
    	dinner = d['dinner'];
    	msnack = d['midnightSnack'];
    	breakfast = d['breakfast']

    	var ctx = document.getElementById("myChart");
    	var myChart = new Chart(ctx, {
    		type: 'horizontalBar',
    		data: {
    			labels: ["Sat Lunch", "Sat Dinner", "Midnight Snack", "Sun Breakfast", "Sun Lunch"],
    			datasets: [{
    				label: '# of Helpings',
    				data: [lunch1, dinner, msnack, breakfast, lunch2],
    				backgroundColor: [
    				'rgba(255, 99, 132, 0.2)',
    				'rgba(54, 162, 235, 0.2)',
    				'rgba(255, 206, 86, 0.2)',
    				'rgba(75, 192, 192, 0.2)',
    				'rgba(153, 102, 255, 0.2)'
    			// 'rgba(255, 159, 64, 0.2)'
    			],
    			borderColor: [
    			'rgba(255,99,132,1)',
    			'rgba(54, 162, 235, 1)',
    			'rgba(255, 206, 86, 1)',
    			'rgba(75, 192, 192, 1)',
    			'rgba(153, 102, 255, 1)'
    			// 'rgba(255, 159, 64, 1)'
    			],
    			borderWidth: 1
    		}]
    	},
    	options: {
    		scales: {
    			yAxes: [{
    				ticks: {
    					beginAtZero:true
    				}
    			}],
    			xAxes: [{
    				ticks: {
    					beginAtZero:true
    				}
    			}]
    		}
    	}
    });

    	var scaleSettings = {
    		startValue: -50,
    		endValue: 50,
    		majorTick: {
    			color: 'black',
    			tickInterval: 10
    		},
    		minorTick: {
    			visible: true,
    			color: 'black',
    			tickInterval: 1
    		}
    	};

    	var rangesArray =  [{
    		startValue: -50,
    		endValue: 0,
    		color: 'blue'
    	}, {
    		startValue: 0,
    		endValue: 50,
    		color: 'red'
    	}];


    }).fail(function() {
    	console.log( "error: wrong email or api down..." );
    	$('.foodstats').hide();
    });



    
});


$(function(){
	$('.text-box').keyup(function(){
		if ($('.text-box').val() == '') {
			$('.circle-inner, .gauge-copy').css({
				'transform' : 'rotate(-45deg)' 
			});
			$('.gauge-copy').css({
				'transform' : 'translate(-50%, -50%) rotate(0deg)'
			});
			$('.percentage').text('0 %');
		} else if($('.text-box').val() >= 0 && $('.text-box').val() <= 2000) {
			var dVal = $(this).val();
			var newVal = dVal * 1.8 - 45;
			$('.circle-inner, .gauge-copy').css({
				'transform' : 'rotate(' + newVal + 'deg)' 
			});
			$('.gauge-copy').css({
				'transform' : 'translate(-50%, -50%) rotate(' + dVal * 1.8 + 'deg)'
			});
			$('.percentage').text(dVal + ' %');
		} else {
			$('.percentage').text('Invalid input value');
		}
	});
});
