var mongoose	= require( 'mongoose' ),
	photosController = require( '../controllers/photosController'),
	Schema 		= mongoose.Schema,
	http        = require('http');


// creates an image

	PhotoSchema = new Schema({
		title: {type: String, require: true},
		caption: {type: String, require: true},
		subject: String,
		user: String,
		location: String,
		datetaken: Date,
		url: String,
		pricehistory: [],
		startingprice: {type: Number, require: true},
		currentprice: {type: Number, require: true},
		created_at: Date

	})

PhotoSchema.methods.counterStart = function() {
	var photo = this
	if (photo.currentprice > photo.startingprice){
			setInterval(function(){
				if (photo.currentprice <= photo.startingprice) {
					return true;
				} else {
				photo.currentprice = (photo.currentprice - 1) 

				console.log("set interval working")
				console.log( photo.currentprice )

				photo.pricehistory.push(photo.currentprice)

				photo.save( function( err, photo ) {
				
				if( err ) res.send( err )			
			 		console.log("photo price saved")
				})		
				}
			},
				1000)
	};
	return true;
}

//grab the uploaded photo info and append it to the twitter api get request
// PhotoSchema.pre('save', function( next ) {
// 	var photo   = this
// 	var options = {
// 		hostname: 'https://api.twitter.com/',
// 		path: '1.1/search/tweets.json?q=%23' + photo.title,
// 		headers: {
// 			Authorization: 'Bearer ' + 'AAAAAAAAAAAAAAAAAAAAABWEiQAAAAAAz4Ao8FFUzeFIfGYEclqaSiaXQ3c%3DgEvMMJxJ0xpl5lZspVbEXMoQXEjjXaobFdXpG4XddfWBmkYKNr'
// 		}


// 	}

// 	http.get( options, function( res ) {
// 			console.log("Get Response");
// 			console.log(res.statuses[0].created_at)
// 			console.log(res.statuses[14].created_at)
// 		} ).on('error',  function(e) {
// 			console.log("got error");
// 	});
// })


//grab the tweet mentions 

// PhotoSchema.method.tweetMention = function( http ) {
// 	var vm = this
// 	vm.tweets = [];
// 	var mentions = [];

		
		// .then(function countMentions (response){
		// 	var mentions = response.data;
		// 	console.log(mentions.length)
			//for(var i = 0; i < mentions.length; i++) {
				//var numberOfMentions = i.length
				//i.length.push.mentions
				//append the name of the picture to the api link in order to get the right celeb

			//}
		//}

// PhotoSchema.method.tweetPrice = function() {
// 	var m = (mentions.length/created_at)  
// 	if( m > .10){
// 		 m = m * .10
// 	}else{
// 		return m;
// 	}
// }
//tweetPrice();


//}

	


module.exports = mongoose.model( 'Photo', PhotoSchema )
